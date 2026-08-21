import { useMemo, useState } from 'react';
import {
  BookMarked, BookOpenText, ChevronLeft, ChevronRight, Feather,
  Search, X, ZoomIn, ZoomOut,
} from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getHeritage, getHeritageCategories } from '../../api';
import { merosArt } from '../../data/meros';
import { EntryDetail, FeaturedEntry } from '../../components/Encyclopedia';
import { TopBar, BottomNav } from '../../shell/Chrome';
import OnScreenKeyboard from '../../shell/OnScreenKeyboard';
import type { EncyclopediaEntry } from '../../api/types';
import '../../components/encyclopedia.css';
import './meros.css';

const ICONS = { BookOpenText, BookMarked, Feather };

/* Raqamli varaqlagich. Haqiqiy skanerlar backend bilan keladi;
   hozircha mavjud qo'lyozma tasvirlari aylanma tarzda ko'rsatiladi,
   shuning uchun varaqlash mexanikasi to'liq ishlaydi. */
const DEMO_PAGES = [merosArt.boburnoma, merosArt.pageLeft, merosArt.pageRight, merosArt.heroBook];

function Reader({ entry, onClose }: { entry: EncyclopediaEntry; onClose: () => void }) {
  const { s, tr } = useText();
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const pages = [entry.image, ...DEMO_PAGES];

  return (
    <div className="mr-reader">
      <div className="mr-reader-top">
        <b>{tr(entry.name)}</b>
        <button className="enc-arrow if-tap" onClick={() => setZoom((z) => Math.max(1, z - 0.25))} aria-label="-">
          <ZoomOut size={26} />
        </button>
        <button className="enc-arrow if-tap" onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))} aria-label="+">
          <ZoomIn size={26} />
        </button>
        <button className="enc-arrow if-tap" onClick={onClose} aria-label="Yopish">
          <X size={28} />
        </button>
      </div>

      <div className="mr-spread">
        <img src={pages[page]} alt="" style={{ transform: `scale(${zoom})` }} />
      </div>

      <div className="mr-reader-bar">
        <button
          className="enc-arrow if-tap"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Oldingi"
        >
          <ChevronLeft size={30} />
        </button>
        <b>{s('page')} {page + 1} / {pages.length}</b>
        <button
          className="enc-arrow if-tap"
          onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
          disabled={page >= pages.length - 1}
          aria-label="Keyingi"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
}

export default function MerosModule({ navigate }: { navigate: NavigateFn }) {
  const { s, tr, title, lang } = useText();
  const entries = useResource(getHeritage, [] as EncyclopediaEntry[]);
  const categories = useResource(getHeritageCategories, []);

  const [categoryId, setCategoryId] = useState<string | null>('qolyozma');
  const [openId, setOpenId] = useState<string | null>(null);
  const [readerId, setReaderId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [keyboard, setKeyboard] = useState(false);

  const featured = entries.data.find((e) => e.id === 'boburnoma') ?? entries.data[0];
  const opened = entries.data.find((e) => e.id === openId);
  const reading = entries.data.find((e) => e.id === readerId);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.data.filter((e) => {
      if (needle) {
        return (
          e.name[lang].toLowerCase().includes(needle) ||
          e.subtitle[lang].toLowerCase().includes(needle)
        );
      }
      return !categoryId || e.categoryId === categoryId;
    });
  }, [entries.data, categoryId, query, lang]);

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

      <div className="if-scroll">
        <section className="mr-arch">
          <img className="if-logo" src="/images/logo.png" alt="" />
          <h1>{title('meros')[0]}<br />{title('meros')[1]}</h1>
          <div className="mr-arch-sub">{title('merosSub')[0]}</div>
          <p>{s('merosLead')}</p>
        </section>

        <div className="mr-hero">
          <img src={merosArt.heroBook} alt="" />
        </div>

        <div className="mr-body">
          <div className="mr-tiles">
            {categories.data.map((c) => {
              const Icon = ICONS[c.icon as keyof typeof ICONS] ?? BookOpenText;
              return (
                <button
                  key={c.id}
                  className="mr-tile if-tap"
                  aria-pressed={c.id === categoryId && !query}
                  onClick={() => { setQuery(''); setCategoryId(c.id); }}
                >
                  <span className="mr-tile-icon"><Icon size={52} /></span>
                  <b>{tr(c.name)}</b>
                  <small>{c.count} {s('entries')}</small>
                </button>
              );
            })}
            <button className="mr-tile if-tap" aria-pressed={!!query} onClick={() => setKeyboard(true)}>
              <span className="mr-tile-icon"><Search size={52} /></span>
              <b>{s('search')}</b>
              <small>{query || '—'}</small>
            </button>
          </div>

          <div className="mr-grid">
            {visible.map((e) => (
              <button key={e.id} className="mr-item if-tap" onClick={() => setOpenId(e.id)}>
                <img src={e.image} alt="" />
                <span>
                  <b>{tr(e.name)}</b>
                  <small>{tr(e.subtitle)}</small>
                </span>
              </button>
            ))}
          </div>
          {visible.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', fontSize: 24, color: 'var(--m-muted)' }}>
              {s('nothingFound')}
            </div>
          )}

          {featured && (
            <>
              <FeaturedEntry
                entry={featured}
                flip
                badgeLabel={s('recommended')}
                actionLabel={s('view')}
                onOpen={() => setOpenId(featured.id)}
              />
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}>
                <button className="if-cta if-tap" onClick={() => setReaderId(featured.id)}>
                  <BookOpenText size={30} />
                  {s('openBook')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <BottomNav onHome={() => navigate('hub')} current="home" />

      {opened && (
        <EntryDetail entry={opened} factsLabel={s('facts')} onClose={() => setOpenId(null)} />
      )}
      {reading && <Reader entry={reading} onClose={() => setReaderId(null)} />}

      {keyboard && (
        <OnScreenKeyboard
          value={query}
          placeholder={s('searchPlaceholder')}
          onChange={setQuery}
          onSubmit={() => setKeyboard(false)}
          onClose={() => setKeyboard(false)}
        />
      )}
    </div>
  );
}
