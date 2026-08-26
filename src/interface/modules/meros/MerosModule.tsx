import { useMemo, useState } from 'react';
import { BookMarked, BookOpenText, Feather, Layers } from 'lucide-react';
import type { ModuleProps } from '../../InterfaceApp';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getHeritage, getHeritageCategories } from '../../api';
import { merosArt } from '../../data/meros';
import { EntryDetail, FeaturedEntry } from '../../components/Encyclopedia';
import { TopBar, BottomNav } from '../../shell/Chrome';
import BookReader from './BookReader';
import '../../components/encyclopedia.css';
import './meros.css';
import LibraryLogo from '../../../components/LibraryLogo';
import DataNotice from '../../components/DataNotice';

const ICONS = { BookOpenText, BookMarked, Feather };

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
          <DataNotice sources={[entries, categories]} />
        <section className="mr-arch">
          <LibraryLogo variant="gold" className="if-logo" />
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
                  aria-pressed={c.id === categoryId}
                  onClick={() => setCategoryId(c.id)}
                >
                  <span className="mr-tile-icon"><Icon size={52} /></span>
                  <b>{tr(c.name)}</b>
                  <small>{c.count} {s('entries')}</small>
                </button>
              );
            })}
          </div>

          {category && (
            <div className="mr-section">
              <div>
                <h2>{tr(category.name)}</h2>
                <p>{tr(category.description)}</p>
              </div>
              <span className="mr-section-count">{visible.length}</span>
            </div>
          )}

          <div className="mr-grid">
            {visible.map((e) => (
              <button key={e.id} className="mr-item if-tap" onClick={() => setOpenId(e.id)}>
                {/* Muqova kitob qiyofasida: cheti oltin, chap yoni — jild. */}
                <span className="mr-item-cover">
                  <img src={e.image} alt="" loading="lazy" />
                  <span className="mr-item-spine" />
                  <span className="mr-item-glare" />
                  {e.pages && e.pages.length > 0 && (
                    <span className="mr-item-pages">
                      <Layers size={17} />
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
              {featured.pages && featured.pages.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}>
                  <button className="if-cta if-tap" onClick={() => setReaderId(featured.id)}>
                    <BookOpenText size={30} />
                    {s('openBook')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <BottomNav onHome={() => navigate('hub')} current="home" />

      {opened && (
        <EntryDetail
          entry={opened}
          factsLabel={s('facts')}
          onClose={() => setOpenId(null)}
          /* Har bir nashrning o'z skanerlari bor — varaqlagich shu yerdan ochiladi. */
          action={opened.pages && opened.pages.length > 0 ? (
            <button className="if-cta if-tap" onClick={() => setReaderId(opened.id)}>
              <BookOpenText size={30} />
              {s('openBook')}
            </button>
          ) : undefined}
        />
      )}
      {reading && <BookReader entry={reading} onClose={() => setReaderId(null)} />}
    </div>
  );
}
