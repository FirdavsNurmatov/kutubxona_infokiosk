import { useMemo, useState } from 'react';
import {
  BookOpen, ChevronRight, Feather, Landmark, Music, Palette, Play,
  Search, Star, Trophy, Users,
} from 'lucide-react';
import type { ModuleProps } from '../../InterfaceApp';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getFigureCategories, getFigures } from '../../api';
import { CategoryTiles, EntryDetail, FeaturedEntry } from '../../components/Encyclopedia';
import { TopBar, BottomNav } from '../../shell/Chrome';
import OnScreenKeyboard from '../../../components/OnScreenKeyboard';
import type { EncyclopediaEntry } from '../../api/types';
import '../../components/encyclopedia.css';
import './siymolar.css';
import LibraryLogo from '../../../components/LibraryLogo';
import DataNotice from '../../components/DataNotice';

const ICONS = { BookOpen, Feather, Palette, Music, Landmark, Trophy, Star, Users };

type View = 'home' | 'list';

export default function SiymolarModule({ navigate, initialQuery }: ModuleProps) {
  const { s, tr, title, lang } = useText();
  const figures = useResource(getFigures, [] as EncyclopediaEntry[]);
  const categories = useResource(getFigureCategories, []);

  /* Bosh sahifadagi qidiruvdan kelingan bo'lsa, modul darhol o'sha
     so'z bo'yicha filtrlangan ro'yxat bilan ochiladi. */
  const [view, setView] = useState<View>(initialQuery ? 'list' : 'home');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery ?? '');
  const [keyboard, setKeyboard] = useState(false);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [onlyFavourites, setOnlyFavourites] = useState(false);

  const featured = figures.data.find((f) => f.id === 'qahhor') ?? figures.data[0];
  const opened = figures.data.find((f) => f.id === openId);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return figures.data.filter((f) => {
      if (onlyFavourites && !favourites.includes(f.id)) return false;
      if (categoryId && f.categoryId !== categoryId) return false;
      if (!needle) return true;
      return (
        f.name[lang].toLowerCase().includes(needle) ||
        f.summary[lang].toLowerCase().includes(needle)
      );
    });
  }, [figures.data, query, categoryId, onlyFavourites, favourites, lang]);

  function openList(catId: string | null, favouritesOnly = false) {
    setCategoryId(catId);
    setOnlyFavourites(favouritesOnly);
    setView('list');
  }

  function toggleFavourite(id: string) {
    setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const activeCategory = categories.data.find((c) => c.id === categoryId);

  return (
    <div className="if-screen">
      {view === 'list' ? (
        <>
          <TopBar
            title={
              onlyFavourites ? s('favourites')
                : activeCategory ? tr(activeCategory.name)
                : s('fullList')
            }
            onBack={() => setView('home')}
          />
          <div className="if-scroll">
          <DataNotice sources={[figures, categories]} />
            <div className="sy-listpage">
              <button
                className="sy-search if-tap"
                data-filled={query ? '1' : '0'}
                onClick={() => setKeyboard(true)}
              >
                <Search size={26} />
                <span>{query || s('searchPlaceholder')}</span>
              </button>

              {visible.length === 0 ? (
                <div className="sy-empty">{s('nothingFound')}</div>
              ) : (
                <div className="enc-list">
                  {visible.map((f) => (
                    <div key={f.id} style={{ position: 'relative' }}>
                      <button className="enc-list-item if-tap" onClick={() => setOpenId(f.id)}>
                        <img src={f.image} alt="" />
                        <span>
                          <b>{tr(f.name)}</b>
                          <small>{tr(f.subtitle)}</small>
                        </span>
                      </button>
                      <button
                        className="sy-fav if-tap"
                        aria-pressed={favourites.includes(f.id)}
                        aria-label={s('favourites')}
                        onClick={() => toggleFavourite(f.id)}
                      >
                        <Star size={26} fill={favourites.includes(f.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
        <TopBar
          title={tr({ uz: 'O‘zbekistonning 100 siymosi', ru: '100 личностей Узбекистана', en: '100 figures of Uzbekistan' })}
          onBack={() => navigate('hub')}
        current="siymolar"
        onNavigate={navigate}
        />
        <div className="if-scroll">
          <DataNotice sources={[figures, categories]} />
          <section className="sy-hero">
            <img className="sy-hero-bg" src="/interface/siymolar/hero.webp" alt="" />
            <div className="sy-hero-scrim" />
            <div className="sy-hero-top">
              <LibraryLogo variant="gold" className="if-logo" />
              <div className="sy-hero-motto">{title('siymolarMotto')[0]}</div>
            </div>
            <div className="sy-flag" />
            <h1 className="sy-title">
              {title('siymolar')[0]}<br />
              <em>{title('siymolar')[1]}</em> {title('siymolar')[2]}
            </h1>
            <div className="sy-tags">{title('siymolarTags')[0]}</div>
            <div className="sy-lead-row">
              <p>{s('siymolarLead')}</p>
              <button className="sy-start if-tap" onClick={() => openList(null)}>
                <i><Play size={30} fill="currentColor" /></i>
                <span>{s('startJourney')}<br />→</span>
              </button>
            </div>
          </section>

          <div className="sy-body">
            <button
              className="sy-search if-tap"
              data-filled={query ? '1' : '0'}
              onClick={() => { setKeyboard(true); setView('list'); setCategoryId(null); setOnlyFavourites(false); }}
            >
              <Search size={26} />
              <span>{query || s('searchPlaceholder')}</span>
            </button>

            <div className="sy-head">
              <h2>{s('mainDirections')}</h2>
              {/* Sevimlilar ro'yxati ilgari faqat pastki navigatsiyadagi
                  "Yordam" tugmasi orqali ochilardi — nomi mos emas edi. */}
              <button className="sy-pill if-tap" onClick={() => openList(null, true)}>
                <Star size={18} style={{ verticalAlign: -3 }} /> {s('favourites')}
              </button>
              <button className="sy-pill if-tap" onClick={() => openList(null)}>
                {s('seeAll')} <ChevronRight size={18} style={{ verticalAlign: -3 }} />
              </button>
            </div>

            <CategoryTiles
              categories={categories.data}
              icons={ICONS}
              columns={4}
              withPhoto
              countLabel={s('figures')}
              onSelect={(c) => openList(c.id)}
              trailing={
                <button className="sy-all if-tap" onClick={() => openList(null)}>
                  <Users size={40} />
                  <span>— {s('fullList')} —</span>
                  {/* Bazadagi haqiqiy son — ilgari bu yerda qotib qolgan 100 turardi */}
                  <b>{figures.data.length} {s('figures')}</b>
                  <small><ChevronRight size={20} /></small>
                </button>
              }
            />

            {featured && (
              <div style={{ marginTop: 30 }}>
                <FeaturedEntry
                  entry={featured}
                  flip
                  badgeLabel={s('recommended')}
                  actionLabel={s('more')}
                  onOpen={() => setOpenId(featured.id)}
                />
              </div>
            )}

            <div className="sy-quote">
              <img src="/interface/siymolar/quote-bg.webp" alt="" />
              <span>{title('siymolarQuote')[0]}</span>
            </div>
          </div>
        </div>
        </>
      )}

      <BottomNav
        onHome={() => (view === 'home' ? navigate('hub') : setView('home'))}
        current={view === 'home' ? 'home' : undefined}
      />

      {opened && (
        <EntryDetail entry={opened} factsLabel={s('facts')} onClose={() => setOpenId(null)} />
      )}

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
