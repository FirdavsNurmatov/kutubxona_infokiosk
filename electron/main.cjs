'use strict';

/*
 * ═══════════════════════════════════════════════════════════════
 *  Milliy kutubxona — /ekran2 signage pleyeri (Electron, Windows)
 * ═══════════════════════════════════════════════════════════════
 *
 * Bu ilova brauzerdagi `/ekran2` sahifasining o'rnini bosadi. Nega kerak:
 *
 *   • OVOZ. Brauzer foydalanuvchi bosmaguncha ovozli videoni ijro etmaydi.
 *     Zaldagi ekranda bosadigan odam yo'q, shuning uchun Chrome maxsus flag
 *     bilan ochilishi kerak bo'lardi. Bu yerda flag ilovaning o'zida.
 *   • BARQARORLIK. Ekran haftalab uzluksiz ishlaydi. Brauzer yopilib qolsa
 *     yoki sahifa qotsa, uni qayta ochadigan odam yo'q. Quyida watchdog,
 *     avtomatik tiklanish va kunlik qayta ishga tushirish bor.
 *   • BOSHQARUV. Qaysi monitor, qaysi API manzil — `config.json` da,
 *     ilovani qayta yig'masdan.
 *
 * Chiqish: Ctrl+Alt+Q · qayta yuklash: Ctrl+Alt+R
 */

const { app, BrowserWindow, Menu, globalShortcut, ipcMain, powerSaveBlocker, screen } = require('electron');
const path = require('node:path');

const log = require('./logger.cjs');
const { loadConfig, readState, writeState } = require('./config.cjs');
const { ORIGIN, registerScheme, serveRenderer } = require('./protocol.cjs');

/** Paketlanmagan holat: kiosk qulfi va konsol logi shu bayroqqa bog'liq. */
const isDev = !app.isPackaged;

/**
 * Vite dev serveri FAQAT shu o'zgaruvchi berilganda ishlatiladi
 * (`npm run electron:dev` uni o'zi qo'yadi).
 *
 * Nega `app.isPackaged` ga bog'lamadik: `npm run electron:start` — yig'ilgan
 * sahifani paketlamasdan sinash usuli. U ham "paketlanmagan", lekin dev
 * server ko'tarilmagan bo'ladi. Shart aniq bo'lgani ma'qul.
 */
const DEV_URL = process.env.VITE_DEV_SERVER_URL ?? null;
const useDevServer = Boolean(DEV_URL);

/** Yig'ilgan renderer papkasi (`vite build --mode electron` chiqishi). */
const RENDERER_DIR = path.join(app.getAppPath(), 'dist-electron');

/* ── Watchdog o'lchamlari ──────────────────────────────────────
   Preload har 5 sekundda signal yuboradi. 45 sekund jim bo'lsa sahifa
   qotgan deb hisoblanadi: bu oddiy sekinlashuv emas, chunki eng og'ir
   slayd almashuvi ham bir sekunddan kam. */
const HEARTBEAT_STALL_MS = 45_000;
const WATCHDOG_TICK_MS = 10_000;
/** Shuncha vaqt ichida shuncha tiklanish bo'lsa — ilova butunlay qayta ochiladi. */
const RECOVERY_WINDOW_MS = 5 * 60_000;
const RECOVERY_LIMIT = 3;
/** Sahifa yuklanmasa qayta urinishgacha kutish. */
const RELOAD_DELAY_MS = 3000;

let win = null;
let config = null;
let userDataDir = null;
let powerBlockerId = null;

let lastBeat = Date.now();
let watchdogTimer = null;
let recoveries = [];
let gpuCrashes = 0;
let restartTimer = null;
/** Oyna ataylab yopilyaptimi (tiklanish) — `window-all-closed` shunga qaraydi. */
let recreating = false;

/* ═══ 1. Ishga tushishdan oldingi sozlamalar ═══════════════════
   Buyruq qatori kalitlari `app.whenReady()` dan OLDIN qo'yilishi shart —
   keyin Chromium ularni o'qib bo'lgan bo'ladi. */

function bootstrap() {
  userDataDir = app.getPath('userData');
  log.init(path.join(userDataDir, 'logs'), { console: isDev });

  /* Portativ nusxada exe vaqtinchalik papkaga ochiladi, shuning uchun
     `config.json` ni haqiqiy exe turgan joydan qidiramiz — electron-builder
     uni `PORTABLE_EXECUTABLE_DIR` da beradi. */
  const exeDir = isDev
    ? app.getAppPath()
    : process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(app.getPath('exe'));
  config = loadConfig({ exeDir, userDataDir });

  log.info(`─── ishga tushdi (v${app.getVersion()}, electron ${process.versions.electron}) ───`);
  log.info(config.source ? `sozlama: ${config.source}` : 'sozlama: standart qiymatlar');

  /* OVOZLI VIDEO. Butun ilovaning asosiy sababi shu qatorda:
     bu kalitsiz `<video>` faqat ovozsiz avtomatik ijro etiladi. */
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

  /* Ekran doim ko'rinib turadi, lekin Windows uni "band emas" deb hisoblab,
     taymerlarni sekinlashtirishi mumkin — karusel sekinlashadi. */
  app.commandLine.appendSwitch('disable-renderer-backgrounding');
  app.commandLine.appendSwitch('disable-background-timer-throttling');
  app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');

  /* CalculateNativeWinOcclusion — Windows'ning "oyna berkitilganmi?"
     tekshiruvi. Kiosk oynasini xato "berkitilgan" deb belgilaganda ekran
     qotib qoladi: Electron'dagi mashhur muammo. O'chiramiz. */
  app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion,HardwareMediaKeyHandling');

  /* Sensorli panelga tegib ketilsa sahifa kattalashmasin. */
  app.commandLine.appendSwitch('disable-pinch');

  /* Windows displey masshtabi (125% / 150%) maketni buzmasin — kiosk
     panelida piksel-aniq chiqishi kerak. */
  if (config.forceScaleFactor) {
    app.commandLine.appendSwitch('force-device-scale-factor', String(config.forceScaleFactor));
  }

  /* Grafik tezlatkich: sozlamada yoki oldingi ishdagi GPU qulashi tufayli.
     Ikkinchisi `state.json` da — foydalanuvchi sozlamasiga tegmaymiz. */
  const state = readState(userDataDir);
  if (config.disableHardwareAcceleration || state.disableHardwareAcceleration) {
    app.disableHardwareAcceleration();
    log.warn(
      "grafik tezlatkich o'chirilgan",
      state.disableHardwareAcceleration ? '(GPU qulagani uchun)' : '(sozlamada)',
    );
  }

  registerScheme();
}

/* ═══ 2. Oyna ═════════════════════════════════════════════════ */

/** Sozlamada ko'rsatilgan monitor. Yo'q bo'lsa — asosiysi. */
function targetDisplay() {
  const all = screen.getAllDisplays();
  const wanted = all[config.displayIndex];
  if (!wanted) {
    log.warn(`monitor #${config.displayIndex} topilmadi (jami ${all.length} ta) — asosiysi olinadi`);
    return screen.getPrimaryDisplay();
  }
  return wanted;
}

function rendererUrl() {
  const base = useDevServer ? DEV_URL : `${ORIGIN}/index.html`;
  /* `?slide=` — pleyerni bitta bo'limda qotirib qo'yadi (useSignagePlayer).
     Sozlamadan kelgani uchun panelni sozlayotgan xodim ilovani qayta
     yig'masdan kerakli bo'limni ekranga chiqara oladi. */
  const pinned = String(config.pinnedSlide ?? '').trim();
  if (!pinned) return base;
  return `${base}${base.includes('?') ? '&' : '?'}slide=${encodeURIComponent(pinned)}`;
}

function loadRenderer(target) {
  if (!target || target.isDestroyed()) return;
  const url = rendererUrl();
  log.info('sahifa yuklanmoqda:', url);
  lastBeat = Date.now();
  target.loadURL(url).catch((error) => {
    log.error('sahifa yuklanmadi:', error.message);
    setTimeout(() => loadRenderer(target), RELOAD_DELAY_MS);
  });
}

/**
 * Oyna o'lchami.
 *
 * Ishlab chiqishda to'liq ekran ataylab yoqilmaydi: dasturchining butun
 * ekranini egallab olgan, ustidan chiqib bo'lmaydigan oyna qulay emas.
 * `--fullscreen` argumenti bilan yoki paketlangan holda — haqiqiy kiosk.
 */
function windowBounds() {
  const display = targetDisplay();
  const forced = process.argv.includes('--fullscreen');
  const wanted = config.fullscreen !== false && !isDev;
  if (forced || wanted) return { bounds: display.bounds, full: true };

  const { x, y, width, height } = display.bounds;
  const w = Math.min(1280, width - 80);
  const h = Math.min(720, height - 80);
  return {
    bounds: { x: x + Math.round((width - w) / 2), y: y + Math.round((height - h) / 2), width: w, height: h },
    full: false,
  };
}

function createWindow() {
  const { bounds, full } = windowBounds();
  const kiosk = full && config.kiosk;

  win = new BrowserWindow({
    ...bounds,
    show: false,
    frame: !full,
    // Sahifa chizilguncha ko'rinadigan rang — oq chaqnash bo'lmasin
    backgroundColor: '#04111f',
    fullscreen: full,
    kiosk,
    alwaysOnTop: full && config.alwaysOnTop,
    autoHideMenuBar: true,
    title: 'Milliy kutubxona — Ekran',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      // Oyna ko'rinmay qolsa ham taymerlar to'liq tezlikda ishlasin
      backgroundThrottling: false,
      // Preload sozlamani shu argumentdan o'qiydi
      additionalArguments: [`--kiosk-config=${encodeURIComponent(JSON.stringify(rendererConfig()))}`],
    },
  });

  win.setMenuBarVisibility(false);
  /* 'screen-saver' darajasi — Windows'da boshqa hamma narsadan yuqori.
     Antivirus yoki yangilanish bildirishnomasi ekranni to'sib qo'ymasin. */
  if (full && config.alwaysOnTop) win.setAlwaysOnTop(true, 'screen-saver');

  win.once('ready-to-show', () => {
    win.show();
    win.focus();
    log.info(`oyna ochildi: monitor #${config.displayIndex} ${bounds.width}×${bounds.height}`);
  });

  win.webContents.on('did-finish-load', () => {
    lastBeat = Date.now();
    win.webContents.setZoomFactor(config.zoomFactor || 1);
    // Sensorli ekranda ikki barmoq bilan kattalashtirib bo'lmasin
    win.webContents.setVisualZoomLevelLimits(1, 1).catch(() => {});
    if (config.hideCursor) {
      win.webContents.insertCSS('*, *::before, *::after { cursor: none !important; }').catch(() => {});
    }
    log.info('sahifa yuklandi');
  });

  attachGuards(win);
  attachRecovery(win);
  loadRenderer(win);
}

/** Rendererga uzatiladigan sozlama — faqat sahifaga keraklilari. */
function rendererConfig() {
  return {
    apiUrl: config.apiUrl,
    apiRefreshSeconds: config.apiRefreshSeconds,
    apiTimeoutMs: config.apiTimeoutMs,
    videoSound: config.videoSound,
    debug: config.debug,
    version: app.getVersion(),
  };
}

/* ═══ 3. Cheklovlar ═══════════════════════════════════════════
   Kiosk ekrani — yopiq tizim. Sahifa boshqa manzilga o'tolmaydi, yangi
   oyna ocholmaydi, kamera yoki joylashuvga so'rov yubora olmaydi. */

function allowedOrigin() {
  return useDevServer ? new URL(DEV_URL).origin : ORIGIN;
}

function attachGuards(target) {
  const contents = target.webContents;

  contents.on('will-navigate', (event, url) => {
    if (url.startsWith(allowedOrigin())) return;
    event.preventDefault();
    log.warn("navigatsiya to'xtatildi:", url);
  });

  contents.setWindowOpenHandler(({ url }) => {
    log.warn('yangi oyna so\'rovi rad etildi:', url);
    return { action: 'deny' };
  });

  contents.session.setPermissionRequestHandler((_wc, permission, callback) => {
    // Ekranga hech qanday ruxsat kerak emas
    log.warn("ruxsat so'rovi rad etildi:", permission);
    callback(false);
  });

  contents.on('context-menu', (event) => {
    if (!config.debug) event.preventDefault();
  });
}

/* ═══ 4. Tiklanish ════════════════════════════════════════════ */

/**
 * Nechta tiklanish bo'lganini sanaydi va chegaradan oshsa `true` qaytaradi.
 * Oshgan bo'lsa ilovaning o'zi qaytadan ishga tushadi: GPU drayveri,
 * xotira va ovoz qurilmasi faqat shunda to'liq tiklanadi.
 */
function tooManyRecoveries(reason) {
  const now = Date.now();
  recoveries = recoveries.filter((time) => now - time < RECOVERY_WINDOW_MS);
  recoveries.push(now);

  if (recoveries.length >= RECOVERY_LIMIT) {
    log.error(`tiklanish ${recoveries.length} marta takrorlandi (${reason}) — ilova qaytadan ishga tushadi`);
    relaunch();
    return true;
  }
  log.warn(`tiklanish (${reason}), urinish ${recoveries.length}/${RECOVERY_LIMIT}`);
  return false;
}

/** Yengil tiklanish: sahifa qaytadan yuklanadi, oyna joyida qoladi. */
function reloadPage(reason) {
  if (tooManyRecoveries(reason)) return;
  loadRenderer(win);
}

/**
 * Og'ir tiklanish: oyna yopilib, yangisi ochiladi.
 *
 * Sahifa qotib qolganda (`unresponsive`, watchdog) yoki monitor
 * o'zgarganda kerak — bunda `loadURL` ning o'zi yordam bermaydi.
 */
function recreateWindow(reason) {
  if (tooManyRecoveries(reason)) return;

  recreating = true;
  const old = win;
  win = null;
  if (old && !old.isDestroyed()) old.destroy();

  setTimeout(() => {
    createWindow();
    recreating = false;
  }, RELOAD_DELAY_MS);
}

function relaunch() {
  recreating = true; // yopilish jarayonida `window-all-closed` ishlamasin
  app.relaunch();
  app.exit(0);
}

function attachRecovery(target) {
  const contents = target.webContents;

  contents.on('render-process-gone', (_event, details) => {
    log.error("renderer to'xtadi:", details.reason, details.exitCode ?? '');
    // Jarayon o'lgan, lekin oyna tirik — sahifani qayta yuklash kifoya
    reloadPage(`render-process-gone: ${details.reason}`);
  });

  contents.on('unresponsive', () => {
    log.error('sahifa javob bermayapti');
    recreateWindow('unresponsive');
  });

  contents.on('did-fail-load', (_event, code, description, url, isMainFrame) => {
    // -3 = ABORTED: navigatsiya bekor qilindi, bu xato emas
    if (!isMainFrame || code === -3) return;
    log.error(`sahifa ochilmadi (${code} ${description}): ${url}`);
    setTimeout(() => loadRenderer(target), RELOAD_DELAY_MS);
  });

  target.on('closed', () => {
    if (win === target) win = null;
  });
}

/**
 * Watchdog: preload'dan kelayotgan signal to'xtasa sahifa qotgan.
 *
 * `unresponsive` hodisasi hamma holatni ushlamaydi — masalan React cheksiz
 * siklga tushsa yoki WebGL konteksti yo'qolib chizish to'xtasa, Chromium
 * uchun sahifa hamon "javob beradigan" bo'lib qolaveradi.
 */
function startWatchdog() {
  clearInterval(watchdogTimer);
  watchdogTimer = setInterval(() => {
    if (recreating || !win || win.isDestroyed()) return;
    const silence = Date.now() - lastBeat;
    if (silence > HEARTBEAT_STALL_MS) {
      log.error(`signal ${Math.round(silence / 1000)} sekund kelmadi`);
      recreateWindow('watchdog');
    }
  }, WATCHDOG_TICK_MS);
}

/**
 * GPU jarayoni qulasa Chromium odatda o'zi tiklanadi, lekin ba'zi Windows
 * drayverlarida bu takrorlanaveradi va ekran qora bo'lib qoladi. Ikkinchi
 * qulashdan keyin grafik tezlatkichsiz ishga tushamiz: sekinroq, lekin
 * ishlaydi. Bu qaror `state.json` da saqlanadi va keyingi safar ham amal qiladi.
 */
function watchGpu() {
  app.on('child-process-gone', (_event, details) => {
    log.error(`jarayon to'xtadi: ${details.type} (${details.reason})`);
    if (details.type !== 'GPU') return;

    gpuCrashes += 1;
    if (gpuCrashes >= 2) {
      writeState(userDataDir, {
        disableHardwareAcceleration: true,
        gpuCrashAt: new Date().toISOString(),
      });
      log.error("GPU takroran qulayapti — grafik tezlatkichsiz qayta ishga tushamiz");
      relaunch();
    }
  });
}

/* ═══ 5. Kunlik qayta ishga tushirish ═════════════════════════ */

function scheduleDailyRestart() {
  const hour = Number(config.dailyRestartHour);
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return;

  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);

  const delay = next.getTime() - now.getTime();
  log.info(`kunlik qayta ishga tushirish: ${next.toLocaleString()} (${config.dailyRestartMode})`);

  clearTimeout(restartTimer);
  restartTimer = setTimeout(() => {
    if (config.dailyRestartMode === 'reload') {
      log.info('kunlik yangilanish — sahifa qayta yuklanmoqda');
      loadRenderer(win);
      scheduleDailyRestart();
    } else {
      log.info('kunlik yangilanish — ilova qaytadan ishga tushmoqda');
      relaunch();
    }
  }, delay);
}

/* ═══ 6. IPC ══════════════════════════════════════════════════ */

function attachIpc() {
  ipcMain.on('kiosk:heartbeat', () => {
    lastBeat = Date.now();
  });

  ipcMain.on('kiosk:log', (_event, level, message) => {
    const write = log[level] ?? log.info;
    write(message);
  });

  ipcMain.on('kiosk:reload', () => {
    log.info("sahifa qayta yuklanmoqda (renderer so'radi)");
    loadRenderer(win);
  });

  ipcMain.handle('kiosk:versions', () => ({
    app: app.getVersion(),
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  }));
}

/* ═══ 7. Tugmalar ═════════════════════════════════════════════
   Kiosk oynasidan chiqishning yagona yo'li — xodim biladigan birikma.
   Alt+F4 va Windows tugmasi kiosk rejimida ishlamaydi. */

function registerShortcuts() {
  globalShortcut.register('Control+Alt+Q', () => {
    log.info('Ctrl+Alt+Q — ilova yopilmoqda');
    recreating = true;
    app.exit(0);
  });

  globalShortcut.register('Control+Alt+R', () => {
    log.info('Ctrl+Alt+R — sahifa qayta yuklanmoqda');
    loadRenderer(win);
  });

  globalShortcut.register('Control+Alt+D', () => {
    if (!config.debug && !isDev) return;
    if (win && !win.isDestroyed()) win.webContents.toggleDevTools();
  });
}

/* ═══ 8. Ishga tushirish ══════════════════════════════════════ */

// Ikkinchi nusxa ochilmasin: ikkita pleyer bir ekranda urishib qoladi
if (!app.requestSingleInstanceLock()) {
  app.exit(0);
} else {
  app.on('second-instance', () => {
    log.warn("ikkinchi nusxa ochilmoqchi bo'ldi — mavjud oyna faollashtirildi");
    if (win && !win.isDestroyed()) {
      win.show();
      win.focus();
    }
  });

  bootstrap();

  app.on('ready', () => {
    app.setAppUserModelId('uz.natlib.ekran');
    Menu.setApplicationMenu(null);

    if (!useDevServer) serveRenderer(RENDERER_DIR);

    attachIpc();
    watchGpu();
    createWindow();
    startWatchdog();
    scheduleDailyRestart();
    registerShortcuts();

    // Ekran o'chib qolmasin: Windows quvvat sxemasidan qat'i nazar
    powerBlockerId = powerSaveBlocker.start('prevent-display-sleep');

    if (process.platform === 'win32' && app.isPackaged) {
      app.setLoginItemSettings({ openAtLogin: Boolean(config.autoLaunch), path: process.execPath });
    }

    /* Monitor uzilib-ulansa (kabel, quvvat, LED panel uyqudan uyg'onsa)
       oyna eski, endi mavjud bo'lmagan koordinatalarda qolib ketmasin. */
    screen.on('display-added', () => recreateWindow("monitor qo'shildi"));
    screen.on('display-removed', () => recreateWindow('monitor uzildi'));
  });

  // Kutubxonaning ichki serveri o'z-o'zidan imzolangan sertifikat bilan bo'lishi mumkin
  app.on('certificate-error', (event, _wc, url, error, _cert, callback) => {
    if (!config?.allowInsecureTls) {
      callback(false);
      return;
    }
    event.preventDefault();
    callback(true);
    log.warn('ishonchsiz sertifikatga ruxsat berildi:', url, error);
  });

  app.on('window-all-closed', () => {
    // Tiklanish paytida oyna ataylab yopiladi — bu ilovaning tugashi emas
    if (recreating) return;
    app.quit();
  });

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
    clearInterval(watchdogTimer);
    clearTimeout(restartTimer);
    if (powerBlockerId !== null && powerSaveBlocker.isStarted(powerBlockerId)) {
      powerSaveBlocker.stop(powerBlockerId);
    }
    log.info('─── ilova yopildi ───');
  });
}
