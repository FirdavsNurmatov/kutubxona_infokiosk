import { useState } from 'react';
import { CalendarCheck, Gamepad2, Play, Star, Trophy } from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import { formatLevel, useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import {
  getMemoryCards, getMiniGames, getQuestions, getQuizCategories, getWordPuzzles,
} from '../../api';
import { TopBar, BottomNav } from '../../shell/Chrome';
import QuizEngine from '../../components/QuizEngine';
import { MemoryGame, WordGame } from './games';
import type { Question, QuizCategory } from '../../api/types';
import type { MiniGame } from '../../api';
import './bolalar.css';

type Active =
  | { kind: 'quiz'; questions: Question[]; title: string }
  | { kind: 'memory'; title: string }
  | { kind: 'word'; title: string }
  | null;

/** So'zni beshta rangli bo'lakka bo'ladi (oxirgisiga qolgani qo'shiladi). */
function splitColoured(word: string): string[] {
  const size = Math.max(1, Math.ceil(word.length / 5));
  const parts: string[] = [];
  for (let i = 0; i < word.length; i += size) parts.push(word.slice(i, i + size));
  return parts;
}

export default function BolalarModule({ navigate }: { navigate: NavigateFn }) {
  const { s, tr, title, lang } = useText();
  const topics = useResource(() => getQuizCategories('kids'), [] as QuizCategory[]);
  const games = useResource(getMiniGames, [] as MiniGame[]);
  const memory = useResource(getMemoryCards, []);
  const words = useResource(getWordPuzzles, []);

  const [active, setActive] = useState<Active>(null);
  const [stars, setStars] = useState(320);

  const levels = title('bolalarLevels');
  const level = Math.min(levels.length, Math.floor(stars / 250) + 1);
  const nextAt = level * 250 + 250;
  const progress = Math.min(100, Math.round(((stars % 250) / 250) * 100));

  async function startTopic(categoryId: string, title: string) {
    const questions = await getQuestions(categoryId);
    setActive({ kind: 'quiz', questions, title });
  }

  async function startGame(game: MiniGame) {
    const title = tr(game.title);
    if (game.kind === 'memory' || game.kind === 'match') {
      setActive({ kind: 'memory', title });
      return;
    }
    if (game.kind === 'word') {
      setActive({ kind: 'word', title });
      return;
    }
    // quiz va picture — bolalar savol bankidan aralash to'plam
    const all = await Promise.all(topics.data.map((t) => getQuestions(t.id)));
    setActive({ kind: 'quiz', questions: all.flat(), title });
  }

  async function startAll() {
    const all = await Promise.all(topics.data.map((t) => getQuestions(t.id)));
    setActive({ kind: 'quiz', questions: all.flat(), title: s('startGame') });
  }

  return (
    <div className="if-screen">
      <TopBar title={tr({ uz: 'Bolalar bo‘limi', ru: 'Детский раздел', en: 'Kids’ section' })} onBack={() => navigate('hub')}
        current="bolalar"
        onNavigate={navigate} />

      <div className="if-scroll">
        <section className="bl-hero">
          <img className="bl-hero-img" src="/interface/bolalar/hero.webp" alt="" />
          <div>
            <h1 className="bl-title">
              {title('viktorina')[0]}
              <em>
                {/* Ikkinchi so'z bo'g'inlarga bo'linib, har biri o'z rangida
                    chiziladi — maketdagi rangli sarlavha shu tarzda tiklanadi. */}
                {splitColoured(title('viktorina')[1]).map((part, i) => (
                  <span key={i}>{part}</span>
                ))}
              </em>
            </h1>
            <p>{s('bolalarLead')}</p>
            <button className="bl-start if-tap" onClick={startAll}>
              <Gamepad2 size={34} />
              {s('startGame').toUpperCase()}
            </button>
          </div>
        </section>

        <div className="bl-body">
          <div className="bl-head">⭐ {s('topics')}</div>
          <div className="bl-topics">
            {topics.data.map((t) => (
              <button
                key={t.id}
                className="bl-topic if-tap"
                style={{ background: t.accent }}
                onClick={() => startTopic(t.id, tr(t.name))}
              >
                {t.image && <img src={t.image} alt="" />}
                <b>{tr(t.name)}</b>
                <small>{tr(t.description)}</small>
              </button>
            ))}
          </div>

          <div className="bl-two">
            <div className="bl-panel">
              <div className="bl-panel-head"><Trophy size={26} color="#F5B421" /> {s('myAchievements')}</div>
              <div className="bl-ach">
                <img src="/interface/bolalar/badge.webp" alt="" />
                <div className="bl-ach-col">
                  <small>{s('level')}</small>
                  <b>{levels[level - 1]}</b>
                  <b style={{ fontSize: 19 }}>{formatLevel(level, lang)}</b>
                </div>
                <div className="bl-ach-col" style={{ flex: 1 }}>
                  <small>{s('starsCollected')}</small>
                  <div className="bl-stars"><Star size={30} fill="currentColor" /> {stars}</div>
                  <div className="bl-bar"><i style={{ width: `${progress}%` }} /></div>
                  <small>{s('toNextLevel')}: {Math.max(0, nextAt - stars)}</small>
                </div>
              </div>
            </div>

            <div className="bl-panel">
              <div className="bl-panel-head"><CalendarCheck size={26} color="#4A9BE8" /> {s('dailyTask')}</div>
              <div className="bl-task">
                <img src="/interface/bolalar/trophy.webp" alt="" />
                <div className="bl-task-text">
                  {s('todayTask')}
                  <div>
                    <button className="bl-do if-tap" onClick={startAll}>
                      <Play size={22} fill="currentColor" />
                      {s('doIt').toUpperCase()}
                    </button>
                  </div>
                </div>
                <img src="/interface/bolalar/gift.webp" alt="" />
              </div>
            </div>
          </div>

          <div className="bl-head">🎮 {s('miniGames')}</div>
          <div className="bl-games">
            {games.data.map((g) => (
              <button
                key={g.id}
                className="bl-game if-tap"
                style={{ background: g.accent }}
                onClick={() => startGame(g)}
              >
                <b>{tr(g.title)}</b>
                <img src={g.image} alt="" />
                <span>{s('play').toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav onHome={() => navigate('hub')} current="home" />

      {active?.kind === 'quiz' && (
        <QuizEngine
          questions={active.questions}
          title={active.title}
          pointsPerAnswer={20}
          onExit={() => setActive(null)}
          onFinish={(r) => setStars((v) => v + r.score)}
        />
      )}
      {active?.kind === 'memory' && (
        <MemoryGame
          cards={memory.data}
          title={active.title}
          onExit={() => setActive(null)}
          onWin={(n) => setStars((v) => v + n)}
        />
      )}
      {active?.kind === 'word' && (
        <WordGame
          puzzles={words.data}
          title={active.title}
          onExit={() => setActive(null)}
          onWin={(n) => setStars((v) => v + n)}
        />
      )}
    </div>
  );
}
