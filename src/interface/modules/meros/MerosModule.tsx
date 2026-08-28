import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { BookMarked, BookOpenText, ChevronRight, Feather, Layers } from 'lucide-react';
import type { ModuleProps } from '../../InterfaceApp';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getHeritage, getHeritageCategories } from '../../api';
import { merosArt } from '../../data/meros';
import { EntryDetail } from '../../components/Encyclopedia';
import { TopBar, BottomNav } from '../../shell/Chrome';
import BookReader from './BookReader';
import '../../components/encyclopedia.css';
import './meros.css';
import DataNotice from '../../components/DataNotice';

const ICONS = { BookOpenText, BookMarked, Feather };

/** Detal sahifasida ko'rsatiladigan varaqlar soni — qolgani "+N" bo'lib chiqadi. */
const SCAN_PREVIEW = 6;

export default function MerosModule({ navigate }: ModuleProps) {
  const { s, tr, title } = useText();
  const entries = useResource(getHeritage, []);
  const categories = useResource(getHeritageCategories, []);

  const [categoryId, setCategoryId] = useState<string | null>('qolyozma');
  const [openId, setOpenId] = useState<string | null>(null);
  const [readerId, setReaderId] = useState<string | null>(null);

  const featured = entries.data.find((e) => e.id === 'boburnoma') ?? entries.data[0];
  const opened = entries.data.find((e) => e.id === openId);
  const reading = entries.data.find((e) => e.id === readerId);
  const category = categories.data.find((c) => c.id === categoryId);

  /* Bo'limda qidiruv yo'q: tashrifchi kategoriyani tanlaydi, xolos. */
  const visible = useMemo(
    () => entries.data.filter((e) => !categoryId || e.categoryId === categoryId),
    [entries.data, categoryId],
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  /* Kategoriya plitalari yopishqoq: tashrifchi ro'yxatning o'rtasida turib
     ham ularga yetadi. Shu holatda tanlov natijasi ekrandan tashqarida
     qolmasligi uchun ro'yxat boshiga qaytariladi — sahifa tepasida
     turganda esa hech narsa surilmaydi, aks holda ravoq behuda yo'qoladi. */
  const wantScroll = useRef(false);

  const pickCategory = (id: string) => {
    wantScroll.current = (scrollRef.current?.scrollTop ?? 0) > 40;
    setCategoryId(id);
  };

  useEffect(() => {
    if (!wantScroll.current) return;
    wantScroll.current = false;
    const sc = scrollRef.current;
    const head = headRef.current;
    if (!sc || !head) return;
    /* `scrollIntoView` bu yerda yaramaydi: sahna `scale()` bilan
       kichraytirilgan, u esa element chekkasini ekran piksellarida o'lchaydi.
       Shuning uchun masofa qo'lda hisoblanadi va koeffitsiyentga bo'linadi. */
    const scRect = sc.getBoundingClientRect();
    const scale = sc.clientHeight ? scRect.height / sc.clientHeight : 1;
    const sticky = tilesRef.current?.offsetHeight ?? 0;
    const delta = (head.getBoundingClientRect().top - scRect.top) / (scale || 1);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sc.scrollTo({ top: sc.scrollTop + delta - sticky, behavior: reduce ? 'auto' : 'smooth' });
  }, [categoryId]);

  const featuredPages = featured?.pages?.length ?? 0;

  return (
    <div className="if-screen">
      <div className="mr-bg" />
      <img className="mr-page" data-side="l" src={merosArt.pageLeft} alt="" />
      <img className="mr-page" data-side="r" src={merosArt.pageRight} alt="" />

      <TopBar
        title={tr({ uz: 'Nodir meros', ru: 'Редкое наследие', en: 'Rare heritage' })}
        onBack={() => navigate('hub')}
        current="meros"
        onNavigate={navigate}
      />

      <div className="if-scroll" ref={scrollRef}>
        <DataNotice sources={[entries, categories]} />

        <section className="mr-arch">
          {/* Logotip vaqtincha olib tashlandi — yangisi tayyor bo'lganda shu joyga qo'yiladi. */}
          <h1>{title('meros')[0]}<br />{title('meros')[1]}</h1>
          <div className="mr-arch-sub">{title('merosSub')[0]}</div>
          <p>{s('merosLead')}</p>
        </section>

        <div className="mr-body">
          {/* Tavsiya etilgan nashr — birinchi ekranning o'zida, chunki
              varaqlagich shu bo'limdagi eng qimmatli amal. Ilgari u
              ro'yxatdan keyin, sahifaning eng pastida turardi. */}
          {featured && (
            <div className="mr-feature">
              <img className="mr-feature-art" src={merosArt.heroBook} alt="" />
              <span className="mr-feature-media">
                <img src={featured.image} alt="" />
              </span>
              <div className="mr-feature-text">
                <span className="mr-feature-badge">{s('recommended')}</span>
                <h2>{tr(featured.name)}</h2>
                <div className="mr-feature-sub">{tr(featured.subtitle)}</div>
                <p>{tr(featured.summary)}</p>
                <div className="mr-feature-actions">
                  {featuredPages > 0 && (
                    <button className="if-cta if-tap" onClick={() => setReaderId(featured.id)}>
                      <BookOpenText size={30} />
                      {s('openBook')}
                    </button>
                  )}
                  <button className="mr-ghost if-tap" onClick={() => setOpenId(featured.id)}>
                    {s('more')}
                    <ChevronRight size={26} />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mr-tiles" ref={tilesRef}>
            {categories.data.map((c) => {
              const Icon = ICONS[c.icon as keyof typeof ICONS] ?? BookOpenText;
              return (
                <button
                  key={c.id}
                  className="mr-tile if-tap"
                  aria-pressed={c.id === categoryId}
                  onClick={() => pickCategory(c.id)}
                >
                  <span className="mr-tile-icon"><Icon size={40} /></span>
                  <span className="mr-tile-text">
                    <b>{tr(c.name)}</b>
                    <small>{c.count} {s('entries')}</small>
                  </span>
                </button>
              );
            })}
          </div>

          {category && (
            <div className="mr-section" ref={headRef}>
              <div>
                <h2>{tr(category.name)}</h2>
                <p>{tr(category.description)}</p>
              </div>
              <span className="mr-section-count">{visible.length}</span>
            </div>
          )}

          <div className="mr-grid">
            {visible.map((e, i) => (
              <button
                key={e.id}
                className="mr-item if-tap"
                style={{ '--i': i } as CSSProperties}
                onClick={() => setOpenId(e.id)}
              >
                {/* Muqova kitob qiyofasida: cheti oltin, chap yoni — jild. */}
                <span className="mr-item-cover">
                  <img src={e.image} alt="" loading="lazy" />
                  <span className="mr-item-spine" />
                  <span className="mr-item-glare" />
                  {e.pages && e.pages.length > 0 && (
                    <span className="mr-item-pages">
                      <Layers size={18} />
                      {e.pages.length} {s('sheets')}
                    </span>
                  )}
                </span>
                <span className="mr-item-text">
                  <b>{tr(e.name)}</b>
                  <small>{tr(e.subtitle)}</small>
                </span>
              </button>
            ))}
          </div>
          {visible.length === 0 && <div className="mr-empty">{s('nothingFound')}</div>}
        </div>
      </div>

      <BottomNav onHome={() => navigate('hub')} current="home" />

      {opened && (
        <EntryDetail
          entry={opened}
          factsLabel={s('facts')}
          onClose={() => setOpenId(null)}
          /* Har bir nashrning o'z skanerlari bor — varaqlagich shu yerdan
             ochiladi. Yoniga birinchi varaqlar ko'rsatiladi: matn qisqa
             bo'lgani uchun ekranning pastki qismi bo'sh qolardi, endi u
             yerda tashrifchi nimani ochishini oldindan ko'radi. */
          action={opened.pages && opened.pages.length > 0 ? (
            <div className="mr-scans">
              <h3>{s('scannedPages')}</h3>
              <div className="mr-scans-row">
                {opened.pages.slice(0, SCAN_PREVIEW).map((src) => (
                  <span className="mr-scans-leaf" key={src}>
                    <img src={src} alt="" loading="lazy" />
                  </span>
                ))}
                {opened.pages.length > SCAN_PREVIEW && (
                  <span className="mr-scans-more">+{opened.pages.length - SCAN_PREVIEW}</span>
                )}
              </div>
              <button className="if-cta if-tap" onClick={() => setReaderId(opened.id)}>
                <BookOpenText size={30} />
                {s('openBook')}
              </button>
            </div>
          ) : undefined}
        />
      )}
      {reading && <BookReader entry={reading} onClose={() => setReaderId(null)} />}
    </div>
  );
}
