import { useMemo, useState } from 'react';
import {
  Atom, BarChart3, BookOpen, Building2, Clock, Globe, HelpCircle,
  Landmark, Medal, Palette, Play, Star, Target, Trophy,
} from 'lucide-react';
import type { NavigateFn } from '../../InterfaceApp';
import { useText } from '../../i18n';
import { useResource } from '../../api/useResource';
import { getQuestions, getQuizCategories, getQuizPresets } from '../../api';
import { TopBar, BottomNav } from '../../shell/Chrome';
import { useInfoSheet } from '../../shell/infoSheet';
import QuizEngine from '../../components/QuizEngine';
import type { Question, QuizCategory, QuizPreset } from '../../api/types';
import './viktorina.css';

const ICONS = { BookOpen, Landmark, Globe, Atom, Palette, Building2 };

interface Stats { played: number; score: number; correct: number; total: number; }

export default function ViktorinaModule({ navigate }: { navigate: NavigateFn }) {
  const { s, tr, title } = useText();
  const sheet = useInfoSheet();
  const categories = useResource(() => getQuizCategories('adult'), [] as QuizCategory[]);
  const presets = useResource(getQuizPresets, [] as QuizPreset[]);

  const [running, setRunning] = useState<{ questions: Question[]; title: string; duration: number } | null>(null);
  const [stats, setStats] = useState<Stats>({ played: 0, score: 0, correct: 0, total: 0 });

  const preset = presets.data[0];
  const percent = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;

  const difficultyLabel = useMemo(
    () => ({ easy: s('easy'), medium: s('medium'), hard: s('hard') }),
    [s],
  );

  async function start(categoryId: string, title: string, duration = 0) {
    const questions = await getQuestions(categoryId);
    setRunning({ questions, title, duration });
  }

  return (
    <div className="if-screen">
      <TopBar title={tr({ uz: 'Bilimingizni sinang', ru: 'Проверьте знания', en: 'Test your knowledge' })} onBack={() => navigate('hub')}
        current="viktorina"
        onNavigate={navigate} />

      <div className="if-scroll">
        <section className="vk-hero">
          <img className="vk-hero-img" src="/interface/viktorina/hero.webp" alt="" />
          <div>
            <h1>
              {title('viktorina')[0]}
              <em>{title('viktorina')[1]}</em>
            </h1>
            <div className="vk-hero-sub">{title('viktorinaSub')[0]}</div>
            <p>{s('viktorinaLead')}</p>
            <button
              className="vk-start if-tap"
              onClick={() => preset && start(preset.categoryId, tr(preset.title), preset.durationSec)}
            >
              <Play size={30} fill="currentColor" />
              {s('startGame').toUpperCase()}
            </button>
            <button className="vk-how if-tap" onClick={() => sheet.open('help')}>
              <HelpCircle size={24} />
              {s('howToPlay')}
            </button>
          </div>
        </section>

        <div className="vk-body">
          <div className="if-section-head">
            <h2 className="if-section-title" style={{ color: 'var(--m-text)' }}>{s('categories')}</h2>
          </div>
          <div className="vk-cats">
            {categories.data.map((c) => {
              const Icon = ICONS[c.icon as keyof typeof ICONS] ?? BookOpen;
              return (
                <button
                  key={c.id}
                  className="vk-cat if-tap"
                  style={{ borderColor: `${c.accent}55`, background: `linear-gradient(150deg, ${c.accent}18, rgba(255,255,255,0.02))` }}
                  onClick={() => start(c.id, tr(c.name))}
                >
                  <span className="vk-cat-icon" style={{ background: `${c.accent}26`, color: c.accent }}>
                    <Icon size={38} />
                  </span>
                  <span>
                    <b>{tr(c.name)}</b>
                    <p>{tr(c.description)}</p>
                    <span className="vk-badge" style={{ background: `${c.accent}26`, color: c.accent }}>
                      {c.questionCount} {s('questions')}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="if-section-head" style={{ marginTop: 30 }}>
            <h2 className="if-section-title" style={{ color: 'var(--m-text)' }}>{s('yourResults')}</h2>
          </div>
          <div className="vk-stats">
            <div className="vk-stat">
              <Trophy size={40} color="#F5B421" />
              <b>{stats.played}</b>
              <small>{s('gamesPlayed')}</small>
            </div>
            <div className="vk-stat">
              <Star size={40} color="#C084FC" />
              <b>{stats.score}</b>
              <small>{s('totalScore')}</small>
            </div>
            <div className="vk-stat">
              <Target size={40} color="#22C55E" />
              <b>{percent}%</b>
              <small>{s('correctAnswers')}</small>
            </div>
            <div className="vk-stat">
              <BarChart3 size={40} color="#FB923C" />
              <b>{stats.played ? Math.max(1, 4 - Math.floor(percent / 25)) : '—'}</b>
              <small>{s('bestPlace')}</small>
            </div>
          </div>

          {preset && (
            <>
              <div className="if-section-head" style={{ marginTop: 30 }}>
                <h2 className="if-section-title" style={{ color: 'var(--m-text)' }}>{s('recommendedGame')}</h2>
              </div>
              <div className="vk-featured">
                <img src={preset.image} alt="" />
                <div className="vk-featured-body">
                  <span className="vk-chip">
                    {tr(categories.data.find((c) => c.id === preset.categoryId)?.name ?? { uz: '', ru: '', en: '' })}
                  </span>
                  <h3>{tr(preset.title)}</h3>
                  <div className="vk-meta">
                    <span><HelpCircle size={22} />{preset.questionCount} {s('questions')}</span>
                    <span><Clock size={22} />{Math.round(preset.durationSec / 60)} {s('minutes')}</span>
                    <span><Medal size={22} />{difficultyLabel[preset.difficulty]}</span>
                  </div>
                  <p>{tr(preset.description)}</p>
                  <button
                    className="vk-play if-tap"
                    onClick={() => start(preset.categoryId, tr(preset.title), preset.durationSec)}
                  >
                    <Play size={28} fill="currentColor" />
                    {s('startGame').toUpperCase()}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* "Yordam" va qolgan tugmalar standart oynalarini ochadi (Chrome.tsx) */}
      <BottomNav onHome={() => navigate('hub')} current="home" />

      {running && (
        <QuizEngine
          questions={running.questions}
          durationSec={running.duration}
          title={running.title}
          onExit={() => setRunning(null)}
          onFinish={(r) =>
            setStats((prev) => ({
              played: prev.played + 1,
              score: prev.score + r.score,
              correct: prev.correct + r.correct,
              total: prev.total + r.total,
            }))
          }
        />
      )}
    </div>
  );
}
