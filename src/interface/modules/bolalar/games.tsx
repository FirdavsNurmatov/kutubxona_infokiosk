import { useEffect, useMemo, useState } from 'react';
import { Delete, HelpCircle, RotateCcw, Sparkles, X } from 'lucide-react';
import { useText } from '../../i18n';
import type { Localized } from '../../api/types';

/* Bolalar bo'limidagi ikkita mustaqil o'yin: kartochka juftligini topish
   va harflardan so'z yig'ish. Ikkalasi ham to'liq ishlaydi va yulduz beradi. */

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ── Xotira o'yini ─────────────────────────────────── */

export interface MemoryGameProps {
  cards: { id: string; image: string; label: Localized }[];
  title: string;
  onExit: () => void;
  onWin: (stars: number) => void;
}

export function MemoryGame({ cards, title, onExit, onWin }: MemoryGameProps) {
  const { s } = useText();
  const [deck, setDeck] = useState(() => shuffle([...cards, ...cards].map((c, i) => ({ ...c, key: `${c.id}-${i}` }))));
  const [open, setOpen] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const pairs = cards.length;
  const won = done.length === pairs;

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open.map((k) => deck.find((c) => c.key === k));
    const timer = window.setTimeout(() => {
      if (a && b && a.id === b.id) setDone((d) => [...d, a.id]);
      setOpen([]);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [open, deck]);

  useEffect(() => {
    if (won) onWin(Math.max(10, 60 - moves * 2));
    // G'alaba bir marta xabar qilinadi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  function flip(key: string, id: string) {
    if (open.length === 2 || open.includes(key) || done.includes(id)) return;
    setOpen((o) => [...o, key]);
    if (open.length === 1) setMoves((m) => m + 1);
  }

  function restart() {
    setDeck(shuffle([...cards, ...cards].map((c, i) => ({ ...c, key: `${c.id}-${i}` }))));
    setOpen([]);
    setDone([]);
    setMoves(0);
  }

  return (
    <div className="bl-overlay">
      <div className="bl-ov-top">
        <button className="qz-ghost if-tap" style={{ minHeight: 68, padding: '0 24px' }} onClick={onExit}>
          <X size={24} />
        </button>
        <b>{title}</b>
        <span className="bl-ov-stat">{s('moves')}: {moves}</span>
        <span className="bl-ov-stat">{s('pairsFound')}: {done.length}/{pairs}</span>
        <button className="qz-ghost if-tap" style={{ minHeight: 68, padding: '0 24px' }} onClick={restart}>
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="bl-ov-body">
        <p className="bl-ov-hint">
          {won ? `🎉 ${s('wellDone')}` : s('memoryHint')}
        </p>
        <div className="bl-memory">
          {deck.map((c) => {
            const isOpen = open.includes(c.key) || done.includes(c.id);
            return (
              <button
                key={c.key}
                className="bl-mem-card if-tap"
                data-open={isOpen ? '1' : '0'}
                data-done={done.includes(c.id) ? '1' : '0'}
                onClick={() => flip(c.key, c.id)}
              >
                <img src={c.image} alt="" />
                <span className="bl-mem-back"><HelpCircle size={54} /></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── So'z yig'ish o'yini ───────────────────────────── */

export interface WordGameProps {
  puzzles: { id: string; answer: string; hint: Localized }[];
  title: string;
  onExit: () => void;
  onWin: (stars: number) => void;
}

export function WordGame({ puzzles, title, onExit, onWin }: WordGameProps) {
  const { s, tr } = useText();
  const [index, setIndex] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [used, setUsed] = useState<number[]>([]);

  const puzzle = puzzles[index];
  const letters = useMemo(
    () => (puzzle ? shuffle(puzzle.answer.split('')) : []),
    [puzzle],
  );

  useEffect(() => {
    if (!puzzle) return;
    setSlots(Array(puzzle.answer.length).fill(null));
    setUsed([]);
  }, [puzzle]);

  const filled = slots.join('');
  const solved = !!puzzle && filled === puzzle.answer;

  useEffect(() => {
    if (!solved) return;
    onWin(20);
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1 < puzzles.length ? i + 1 : 0));
    }, 1400);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  function place(letterIndex: number) {
    const slot = slots.findIndex((v) => v === null);
    if (slot === -1) return;
    setSlots((prev) => prev.map((v, i) => (i === slot ? letters[letterIndex] : v)));
    setUsed((u) => [...u, letterIndex]);
  }

  function backspace() {
    const lastFilled = [...slots].map((v, i) => (v ? i : -1)).filter((i) => i >= 0).pop();
    if (lastFilled === undefined) return;
    setSlots((prev) => prev.map((v, i) => (i === lastFilled ? null : v)));
    setUsed((u) => u.slice(0, -1));
  }

  if (!puzzle) return null;

  return (
    <div className="bl-overlay">
      <div className="bl-ov-top">
        <button className="qz-ghost if-tap" style={{ minHeight: 68, padding: '0 24px' }} onClick={onExit}>
          <X size={24} />
        </button>
        <b>{title}</b>
        <span className="bl-ov-stat">{index + 1} / {puzzles.length}</span>
      </div>

      <div className="bl-ov-body">
        <div className="bl-word">
          <p className="bl-ov-hint" style={{ margin: 0 }}>{s('wordHint')}</p>
          <div className="bl-word-hint">💡 {tr(puzzle.hint)}</div>

          <div className="bl-slots">
            {slots.map((v, i) => (
              <div className="bl-slot" data-filled={v ? '1' : '0'} key={i}>{v ?? ''}</div>
            ))}
          </div>

          <div className="bl-letters">
            {letters.map((l, i) => (
              <button
                key={i}
                className="bl-letter if-tap"
                disabled={used.includes(i)}
                onClick={() => place(i)}
              >
                {l}
              </button>
            ))}
            <button className="bl-letter if-tap" onClick={backspace} aria-label="O'chirish">
              <Delete size={40} />
            </button>
          </div>

          {solved && (
            <div className="bl-word-msg" style={{ color: '#37A24C' }}>
              <Sparkles size={30} style={{ verticalAlign: -5 }} /> {s('wellDone')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
