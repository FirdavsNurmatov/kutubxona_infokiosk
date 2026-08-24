import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, Lightbulb, RotateCcw, Timer, X } from 'lucide-react';
import type { Question } from '../api/types';
import { useText } from '../i18n';
import './quiz.css';

/* Bitta dvigatel ikkala bo'limga xizmat qiladi: kattalar viktorinasi va
   bolalar mini-o'yini. Farqi faqat mavzu ranglarida va savol bankida. */

export interface QuizEngineProps {
  questions: Question[];
  /** Butun test uchun vaqt, soniyada. 0 bo'lsa taymer ko'rsatilmaydi. */
  durationSec?: number;
  title: string;
  onExit: () => void;
  /** Har to'g'ri javob uchun beriladigan ball. */
  pointsPerAnswer?: number;
  onFinish?: (result: { correct: number; total: number; score: number }) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function QuizEngine({
  questions, durationSec = 0, title, onExit, pointsPerAnswer = 10, onFinish,
}: QuizEngineProps) {
  const { s, tr } = useText();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(durationSec);

  const question = questions[index];
  const total = questions.length;
  const score = correct * pointsPerAnswer;

  // Taymer. Vaqt tugasa test avtomatik yakunlanadi.
  useEffect(() => {
    if (!durationSec || done) return;
    const timer = window.setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          window.clearInterval(timer);
          setDone(true);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [durationSec, done]);

  useEffect(() => {
    if (done) onFinish?.({ correct, total, score });
    // Natija bir marta xabar qilinadi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const percent = useMemo(
    () => (total ? Math.round((correct / total) * 100) : 0),
    [correct, total],
  );

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === question.answer) setCorrect((c) => c + 1);
  }

  function next() {
    if (index + 1 >= total) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setDone(false);
    setLeft(durationSec);
  }

  if (!question && !done) {
    return (
      <div className="qz">
        <div className="if-loading">{s('nothingFound')}</div>
        <div className="qz-foot">
          <button className="qz-ghost if-tap" onClick={onExit}>{s('back')}</button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="qz">
        <div className="qz-result">
          <div className="qz-ring">
            <div>
              <b>{percent}%</b>
              <small>{s('correctAnswers')}</small>
            </div>
          </div>
          <h2>{percent >= 60 ? s('wellDone') : s('tryAgain')}</h2>
          <p>
            {correct} / {total} · {score} {s('totalScore').toLowerCase()}
          </p>
          <div className="qz-result-row">
            <button className="qz-ghost if-tap" onClick={onExit}>
              <X size={26} /> {s('back')}
            </button>
            <button className="if-cta if-tap" onClick={restart}>
              <RotateCcw size={26} /> {s('playAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qz">
      <div className="qz-top">
        <button className="qz-ghost if-tap" style={{ minHeight: 68, padding: '0 24px' }} onClick={onExit}>
          <X size={24} />
        </button>
        <div className="qz-count">
          {s('question')} {index + 1} <span>/ {total}</span>
        </div>
        {durationSec > 0 && (
          <div className="qz-timer" data-low={left < 60 ? '1' : '0'}>
            <Timer size={26} />
            {formatTime(left)}
          </div>
        )}
      </div>

      <div className="qz-progress">
        <i style={{ width: `${((index + (picked !== null ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <div className="qz-body">
        <h2 className="qz-question">{tr(question.text)}</h2>

        <div className="qz-options">
          {question.options.map((opt, i) => {
            const state =
              picked === null ? 'idle'
                : i === question.answer ? 'correct'
                : i === picked ? 'wrong'
                : 'idle';
            return (
              <button
                key={i}
                className="qz-option if-tap"
                data-state={state}
                disabled={picked !== null}
                onClick={() => choose(i)}
              >
                <i>{state === 'correct' ? <CheckCircle2 size={28} /> : LETTERS[i]}</i>
                <span>{tr(opt)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/*
         Izoh doimiy balandlikdagi dokda turadi va u HAR DOIM sahnada bo'ladi —
         javob tanlanganda faqat ichi to'ladi. Ilgari izoh `.qz-body` ning ichida
         edi: u `safe center` bilan markazlashgani uchun izoh chiqishi bilan
         savol va javoblar yuqoriga sakrardi, bosilgan tugma esa barmoq ostidan
         siljib ketardi. Dok balandligi o'zgarmasa, javoblar ham qimirlamaydi.
      */}
      <div className="qz-explain-dock">
        {picked !== null && (
          <div className="qz-explain">
            <Lightbulb size={30} style={{ flex: 'none', color: 'var(--m-accent)' }} />
            <div>
              <b>{picked === question.answer ? s('correct') : s('wrong')}</b>
              {tr(question.explanation)}
            </div>
          </div>
        )}
      </div>

      <div className="qz-foot">
        <div style={{ marginRight: 'auto', fontSize: 22, color: 'var(--m-muted)' }}>
          {title}
        </div>
        <button
          className="if-cta if-tap"
          onClick={next}
          style={{ opacity: picked === null ? 0.45 : 1, pointerEvents: picked === null ? 'none' : 'auto' }}
        >
          {index + 1 >= total ? s('finish') : s('next')}
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
