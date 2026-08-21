import { useState } from 'react';
import { BookOpen, FlaskConical, Globe, PlayCircle, ScrollText } from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getScholarSections, getScholars } from '../../api';
import { CategoryTiles, EntryCarousel, EntryDetail, FeaturedEntry } from '../../components/Encyclopedia';
import { TopBar, BottomNav } from '../../shell/Chrome';
import type { EncyclopediaEntry } from '../../api/types';
import './allomalar.css';

const ICONS = { BookOpen, ScrollText, Globe, FlaskConical, PlayCircle };

export default function AllomalarModule({ navigate }: { navigate: NavigateFn }) {
  const { s, title } = useText();
  const scholars = useResource(getScholars, [] as EncyclopediaEntry[]);
  const sections = useResource(getScholarSections, []);

  const [activeId, setActiveId] = useState<string | null>(null);
  /** Detal oynasi ochilganda qaysi bo'limdan boshlash kerakligi. */
  const [openId, setOpenId] = useState<string | null>(null);

  const active = scholars.data.find((e) => e.id === activeId) ?? scholars.data[0];
  const opened = scholars.data.find((e) => e.id === openId);

  return (
    <div className="if-screen">
      <TopBar
        title={s('greatScholars')}
        onBack={() => navigate('hub')}
        current="allomalar"
        onNavigate={navigate}
      />

      <div className="if-scroll">
        <section className="all-hero">
          <img className="all-hero-orn" data-side="l" src="/interface/allomalar/ornament-left.webp" alt="" />
          <img className="all-hero-orn" data-side="r" src="/interface/allomalar/ornament-right.webp" alt="" />
          <div className="all-hero-inner">
            <img className="all-logo if-logo" src="/images/logo.png" alt="" />
            <h1>{title('allomalar')[0]}<br />{title('allomalar')[1]}</h1>
            <div className="all-hero-sub">{title('allomalarSub')[0]}</div>
            <p>{s('allomalarLead')}</p>
          </div>
        </section>

        <div className="all-body">
          <div className="all-block all-panel">
            <div className="all-rule">◆ {s('greatScholars')} ◆</div>
            {active && (
              <EntryCarousel
                entries={scholars.data}
                activeId={active.id}
                onSelect={(e) => setActiveId(e.id)}
                perPage={5}
                variant="circle"
              />
            )}
          </div>

          <div className="all-block">
            <CategoryTiles
              categories={sections.data}
              icons={ICONS}
              columns={5}
              onSelect={() => active && setOpenId(active.id)}
            />
          </div>

          {active && (
            <div className="all-block">
              <FeaturedEntry
                entry={active}
                flip={false}
                badgeLabel={s('recommended')}
                actionLabel={s('moreView')}
                onOpen={() => setOpenId(active.id)}
              />
            </div>
          )}
        </div>
      </div>

      <BottomNav onHome={() => navigate('hub')} current="home" />

      {opened && (
        <EntryDetail
          entry={opened}
          factsLabel={s('facts')}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}
