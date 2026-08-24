import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen, Clapperboard, Clock, GitCompareArrows, Hourglass, Image as ImageIcon,
  MapPin, Mic, MoveHorizontal, PlayCircle, Share2, Archive, Map,
} from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import { formatYear, useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getArchiveKinds, getPlacePairs } from '../../api';
import { TopBar, BottomNav } from '../../shell/Chrome';
import type { PlacePair } from '../../api/types';
import './kechabugun.css';
import LibraryLogo from '../../../components/LibraryLogo';
import DataNotice from '../../components/DataNotice';

const ARCHIVE_ICONS = { Image: ImageIcon, Clapperboard, BookOpen, Mic };

/*
   Surilma solishtirgich. Kioskda sichqoncha yo'q, shuning uchun pointer
   hodisalari ishlatiladi — barmoq ham, sichqoncha ham bir xil yo'ldan o'tadi.

   Chegara holati (`split`) tashqarida — modulda — saqlanadi, chunki uni
   "OLDIN" va "HOZIR" tugmalari ham boshqaradi. Ilgari u shu komponentning
   ichida edi va tugmalar unga umuman yeta olmasdi: bosilganda faqat o'zlari
   bosilgan ko'rinishga o'tardi, surat esa joyida qolardi.
*/
interface CompareProps {
  pair: PlacePair;
  /** Chegaraning chapdan foizi. 0 — faqat "hozir", 100 — faqat "oldin". */
  split: number;
  onSplit: (value: number) => void;
}

function Compare({ pair, split, onSplit }: CompareProps) {
  const { lang } = useText();
  const boxRef = useRef<HTMLDivElement>(null);
  /* Surish paytida animatsiya o'chadi — aks holda chegara barmoq
     ortidan kechikib yuradi. */
  const [dragging, setDragging] = useState(false);

  const move = useCallback((clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    onSplit(Math.min(98, Math.max(2, pct)));
  }, [onSplit]);

  return (
    <div
      className="kb-compare"
      ref={boxRef}
      data-dragging={dragging ? '1' : '0'}
      style={{ ['--split' as string]: `${split}%` }}
      onPointerDown={(e) => {
        setDragging(true);
        /* Ba'zi muhitlarda (masalan avtomatlashtirilgan sinov) bu chaqiruv
           xato beradi — surish shu sababli to'xtab qolmasin. */
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* e'tiborsiz qoldiriladi */
        }
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging && move(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img src={pair.before} alt="" />
      <img className="kb-compare-after" src={pair.after} alt="" />

      {/* Chegara chekkaga borganda ko'rinmay qolgan tomonning yili ham so'nadi */}
      <span className="kb-year" data-side="l" data-off={split <= 6 ? '1' : '0'}>
        <Clock size={20} />{formatYear(pair.beforeYear, lang)}
      </span>
      <span className="kb-year" data-side="r" data-off={split >= 94 ? '1' : '0'}>
        <Clock size={20} />{formatYear(pair.afterYear, lang)}
      </span>

      <div className="kb-divider" />
      <div className="kb-handle" style={{ left: `${split}%` }}>
        <MoveHorizontal size={34} />
      </div>

      <PlaceLabel pair={pair} />
    </div>
  );
}

function PlaceLabel({ pair }: { pair: PlacePair }) {
  const { tr } = useText();
  return (
    <span className="kb-place">
      <MapPin size={22} />
      {tr(pair.city)}, {tr(pair.place)}
    </span>
  );
}

export default function KechaBugunModule({ navigate }: { navigate: NavigateFn }) {
  const { s, tr, title, lang } = useText();
  const places = useResource(getPlacePairs, [] as PlacePair[]);
  const archives = useResource(getArchiveKinds, []);
  const [placeId, setPlaceId] = useState('registon');
  /*
     Solishtirgich chegarasi: 0 — butunlay "hozir", 100 — butunlay "oldin".
     Uni ham surish, ham yuqoridagi ikki tugma boshqaradi.
  */
  const [split, setSplit] = useState(50);

  /* Chegara chekkaga yaqin bo'lsa — o'sha davr tanlangan hisoblanadi;
     o'rtada turganda ikkala tugma ham bosilmagan ko'rinadi. */
  const side = split >= 85 ? 'before' : split <= 15 ? 'after' : null;

  const pair = places.data.find((p) => p.id === placeId) ?? places.data[0];

  /* Boshqa shahar tanlansa solishtirgich markazdan boshlanadi. */
  useEffect(() => setSplit(50), [placeId]);

  const features = [
    { icon: GitCompareArrows, title: ['SOLISHTIRING', 'СРАВНИТЕ', 'COMPARE'], text: ['Oldin va hozir rasmlarni taqqoslab ko‘ring', 'Сравните снимки «раньше» и «сейчас»', 'Compare the before and after photographs'] },
    { icon: Archive, title: ['O‘RGANING', 'ИЗУЧАЙТЕ', 'LEARN'], text: ['Tarixiy ma’lumotlar va qiziqarli faktlar', 'Исторические сведения и интересные факты', 'Historical background and curious facts'] },
    { icon: PlayCircle, title: ['TOMOSHA QILING', 'СМОТРИТЕ', 'WATCH'], text: ['Video va audio arxivlar orqali sayohat qiling', 'Путешествуйте по видео- и аудиоархивам', 'Travel through the video and audio archives'] },
    { icon: Share2, title: ['ULASHING', 'ДЕЛИТЕСЬ', 'SHARE'], text: ['Sevimli joylaringizni boshqalar bilan ulashing', 'Делитесь любимыми местами с другими', 'Share your favourite places with others'] },
  ];

  const langIdx = { uz: 0, ru: 1, en: 2 }[lang];

  return (
    <div className="if-screen">
      <img className="kb-orn" data-side="l" src="/interface/kechabugun/orn-left.webp" alt="" />
      <img className="kb-orn" data-side="r" src="/interface/kechabugun/orn-right.webp" alt="" />

      <TopBar title={tr({ uz: 'Kecha va bugun', ru: 'Вчера и сегодня', en: 'Then and now' })} onBack={() => navigate('hub')}
        current="kechabugun"
        onNavigate={navigate} />

      <div className="if-scroll">
          <DataNotice sources={[places, archives]} />
        <section className="kb-arch">
          <LibraryLogo variant="dark" className="if-logo" />
          <h1>
            {title('kechabugun')[0]}
            <em>
              <b>{title('kechabugun')[1]}</b> <i>{title('kechabugun')[2]}</i>{' '}
              <b style={{ color: '#0F5C55' }}>{title('kechabugun')[3]}</b>
            </em>
          </h1>
          <p>{s('kechaBugunLead')}</p>
        </section>

        <div className="kb-body">
          <div className="kb-tabs">
            <button
              className="kb-tab if-tap"
              data-kind="before"
              aria-pressed={side === 'before'}
              onClick={() => setSplit(100)}
            >
              {s('before')} <Hourglass size={26} />
            </button>
            <button
              className="kb-tab if-tap"
              data-kind="after"
              aria-pressed={side === 'after'}
              onClick={() => setSplit(0)}
            >
              <Clock size={26} /> {s('after')}
            </button>
          </div>

          {pair && <Compare pair={pair} split={split} onSplit={setSplit} />}
          <p className="kb-hint">{s('dragToCompare')}</p>

          <div className="kb-rule">✦ {s('citiesPlaces')} ✦</div>
          <div className="kb-cities">
            {places.data.map((p) => (
              <button
                key={p.id}
                className="kb-city if-tap"
                aria-pressed={p.id === placeId}
                onClick={() => setPlaceId(p.id)}
              >
                <img src={p.thumb} alt="" />
                <span>{tr(p.city)}</span>
              </button>
            ))}
          </div>

          {pair && <div className="kb-story">{tr(pair.story)}</div>}

          <div className="kb-archive">
            <h3 className="kb-archive-title">{s('archives')}</h3>
            {archives.data.map((a) => {
              const Icon = ARCHIVE_ICONS[a.icon as keyof typeof ARCHIVE_ICONS] ?? ImageIcon;
              return (
                /* Bosilmaydi: hozircha ochiladigan arxiv sahifasi yo'q,
                   shuning uchun tugma emas, ma'lumot plitasi. Yozuvlar soni
                   ham faqat backenddan kelsa ko'rsatiladi. */
                <div key={a.id} className="kb-arch-item">
                  <i style={{ background: a.accent }}><Icon size={42} /></i>
                  <b>{tr(a.label)}</b>
                  {a.count !== undefined && <small>{a.count}</small>}
                </div>
              );
            })}
          </div>

          <div className="kb-features">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div className="kb-feature" key={i}>
                  <i><Icon size={38} /></i>
                  <b>{f.title[langIdx]}</b>
                  <small>{f.text[langIdx]}</small>
                </div>
              );
            })}
          </div>

          <div className="kb-cta-row">
            <button className="kb-cta if-tap" onClick={() => navigate('tarix')}>
              <Map size={32} />
              {tr({ uz: 'SAYOHATNI BOSHLASH', ru: 'НАЧАТЬ ПУТЕШЕСТВИЕ', en: 'START THE JOURNEY' })}
            </button>
          </div>
        </div>
      </div>

      <BottomNav onHome={() => navigate('hub')} current="home" />
    </div>
  );
}
