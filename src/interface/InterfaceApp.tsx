import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { MODULES, moduleFromPath, pathFor, type ModuleId } from './routes';
import { useIdleReset } from './shell/useIdleReset';
import { InfoSheetProvider } from './shell/InfoSheet';
import { EMPTY_QUIZ_STATS, SessionContext, type QuizStats } from './shell/session';
import { useI18n } from '../i18n/context';
import { DEFAULT_LANG } from '../i18n/translations';
import { useText } from './i18n';
import './interface.css';

/*
 * /interface — 1080×1920 infokiosk uchun maketlardan qurilgan bo'lim.
 *
 * Har bir modul alohida chunk: kioskda bir vaqtning o'zida faqat bittasi
 * ochiq turadi, shuning uchun hammasini bitta bundlega qo'shish yuklanishni
 * behuda sekinlashtiradi.
 */
const HubModule = lazy(() => import('./modules/hub/HubModule'));
const MerosModule = lazy(() => import('./modules/meros/MerosModule'));
const AllomalarModule = lazy(() => import('./modules/allomalar/AllomalarModule'));
const SiymolarModule = lazy(() => import('./modules/siymolar/SiymolarModule'));
const TarixModule = lazy(() => import('./modules/tarix/TarixModule'));
const KechaBugunModule = lazy(() => import('./modules/kechabugun/KechaBugunModule'));
const ViktorinaModule = lazy(() => import('./modules/viktorina/ViktorinaModule'));
const BolalarModule = lazy(() => import('./modules/bolalar/BolalarModule'));

/** Modul chunki yuklangunicha ko'rinadigan fon rangi. */
const FALLBACK_BG: Record<ModuleId, string> = {
  hub: '#061530',
  meros: '#071640',
  allomalar: '#08194A',
  siymolar: '#F2F5FA',
  tarix: '#04122B',
  kechabugun: '#F5F1E8',
  viktorina: '#07040F',
  bolalar: '#EAF6FF',
};

/** Bo'lim ochilayotganda unga uzatiladigan niyat. */
export interface NavigateOptions {
  /** Qidiruv natijasidan kelingan bo'lsa — o'sha so'z. */
  query?: string;
}

export interface NavigateFn {
  (id: ModuleId, options?: NavigateOptions): void;
}

/** Qidiruv so'zini qabul qiladigan modullar shu propslarni oladi. */
export interface ModuleProps {
  navigate: NavigateFn;
  initialQuery?: string;
}

/*
 * Maket 1080x1920 portret ekran uchun chizilgan, lekin sahna endi
 * o'sha o'lchamga qotib qolmaydi.
 *
 * Koeffitsiyent maketning qisqa o'qini (1080) ekranning qisqa o'qiga
 * bog'laydi: kioskda aynan 1 chiqadi, boshqa ekranlarda esa matn va
 * tugmalar nisbati saqlanadi. Sahnaning mantiqiy o'lchami esa oynadan
 * kelib chiqib hisoblanadi (`innerWidth / scale`), shuning uchun u
 * har doim oynani to'liq qoplaydi — chetlarda qora yo'l qolmaydi.
 */
const DESIGN_SHORT = 1080;
/** Juda kichik yoki juda katta ekranda ham sahna o'qiladigan bo'lib qolsin. */
const MIN_SCALE = 0.2;
const MAX_SCALE = 2.5;

export interface StageFit {
  scale: number;
  /** Sahnaning mantiqiy kengligi (CSS px, scale'gacha). */
  width: number;
  /** Sahnaning mantiqiy balandligi. */
  height: number;
}

function measure(): StageFit {
  // visualViewport — mobil brauzerlarda manzil paneli ochilib-yopilganda aniqroq
  const vv = window.visualViewport;
  const w = Math.round(vv?.width ?? window.innerWidth);
  const h = Math.round(vv?.height ?? window.innerHeight);
  const raw = Math.min(w, h) / DESIGN_SHORT;
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, raw));
  return { scale, width: w / scale, height: h / scale };
}

function renderModule(id: ModuleId, navigate: NavigateFn, query?: string) {
  switch (id) {
    case 'meros': return <MerosModule navigate={navigate} />;
    case 'allomalar': return <AllomalarModule navigate={navigate} />;
    case 'siymolar': return <SiymolarModule navigate={navigate} initialQuery={query} />;
    case 'tarix': return <TarixModule navigate={navigate} />;
    case 'kechabugun': return <KechaBugunModule navigate={navigate} />;
    case 'viktorina': return <ViktorinaModule navigate={navigate} />;
    case 'bolalar': return <BolalarModule navigate={navigate} />;
    default: return <HubModule navigate={navigate} />;
  }
}

export default function InterfaceApp() {
  const [mod, setMod] = useState(() => moduleFromPath(window.location.pathname));
  // Birinchi bo'yashdayoq to'g'ri bo'lishi uchun boshlang'ich qiymat ham hisoblanadi
  const [fit, setFit] = useState(measure);
  const { s } = useText();
  const { setLang } = useI18n();

  // Kiosk 1080×1920 da ishlaydi, lekin ishlab chiqishda oyna har xil bo'ladi
  useEffect(() => {
    function refit() {
      setFit((prev) => {
        const next = measure();
        // Bir xil qiymatda qayta bo'yash shart emas
        if (
          next.scale === prev.scale &&
          next.width === prev.width &&
          next.height === prev.height
        ) {
          return prev;
        }
        return next;
      });
    }
    refit();
    window.addEventListener('resize', refit);
    window.addEventListener('orientationchange', refit);
    window.visualViewport?.addEventListener('resize', refit);
    return () => {
      window.removeEventListener('resize', refit);
      window.removeEventListener('orientationchange', refit);
      window.visualViewport?.removeEventListener('resize', refit);
    };
  }, []);

  /* Bitta tashrifchining sessiyasi. `sessionKey` o'zgarganda butun modul
     daraxti qaytadan quriladi — ochiq oyna, terilgan matn, varaqlangan
     joy, hammasi tozalanadi. */
  const [sessionKey, setSessionKey] = useState(0);
  const [stars, setStars] = useState(0);
  const [quiz, setQuiz] = useState<QuizStats>(EMPTY_QUIZ_STATS);

  const session = useMemo(() => ({
    stars,
    addStars: (n: number) => setStars((v) => v + n),
    quiz,
    addQuizResult: (r: { score: number; correct: number; total: number }) =>
      setQuiz((v) => ({
        played: v.played + 1,
        score: v.score + r.score,
        correct: v.correct + r.correct,
        total: v.total + r.total,
      })),
  }), [stars, quiz]);

  /* Qidiruv natijasi bosilganda bo'lim shu so'z bilan ochiladi. */
  const [intent, setIntent] = useState<NavigateOptions | null>(null);

  const navigate = useCallback<NavigateFn>((id, options) => {
    const next = MODULES.find((m) => m.id === id) ?? MODULES[0];
    window.history.pushState(null, '', pathFor(id));
    setIntent(options ?? null);
    setMod(next);
    // Yangi modul har doim tepadan ochilsin
    document.querySelector('.if-stage > .if-screen > .if-scroll')?.scrollTo({ top: 0 });
  }, []);

  // Brauzerning "orqaga" tugmasi modullar orasida ham ishlashi uchun
  useEffect(() => {
    function onPopState() {
      setMod(moduleFromPath(window.location.pathname));
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  /* Kiosk egasiz qolganda keyingi tashrifchi toza ekran ko'rishi kerak:
     bosh sahifaga qaytiladi, til standartga tushadi, sessiya nolga qaytadi
     va modullar qayta quriladi. Ilgari bu faqat modul ichida turgan
     holatda ishlardi — bosh sahifada oldingi odamning izi qolib ketardi. */
  useIdleReset(
    useCallback(() => {
      navigate('hub');
      setLang(DEFAULT_LANG);
      setStars(0);
      setQuiz(EMPTY_QUIZ_STATS);
      setSessionKey((k) => k + 1);
    }, [navigate, setLang]),
  );

  return (
    <div className="if-viewport" data-module={mod.id}>
      <div
        key={sessionKey}
        className="if-stage"
        data-module={mod.id}
        style={{
          ['--if-scale' as string]: fit.scale,
          ['--if-w' as string]: fit.width,
          ['--if-h' as string]: fit.height,
        }}
      >
        {/* "Kutubxona haqida", "Yordam" va "Til" oynasi butun bo'lim uchun
            bitta nusxada — modul ustida chiziladi. */}
        <SessionContext.Provider value={session}>
        <InfoSheetProvider module={mod.id}>
          <Suspense
            fallback={
              <div
                className="if-loading"
                style={{ position: 'absolute', inset: 0, background: FALLBACK_BG[mod.id] }}
              >
                {s('loading')}
              </div>
            }
          >
            {renderModule(mod.id, navigate, intent?.query)}
          </Suspense>
        </InfoSheetProvider>
        </SessionContext.Provider>
      </div>
    </div>
  );
}
