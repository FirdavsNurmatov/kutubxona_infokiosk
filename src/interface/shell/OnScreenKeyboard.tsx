import { useState } from 'react';
import { CornerDownLeft, Delete, Globe, Search, X } from 'lucide-react';

/* Kiosk mashinasida fizik klaviatura yo'q, shuning uchun qidiruv
   maydoni bosilganda shu panel ochiladi. Uch xil yozuv qo'llab-quvvatlanadi:
   o'zbek lotin (apostrofli harflar bilan), rus kirill va ingliz. */

type Layout = 'uz' | 'ru' | 'en';

const LAYOUTS: Record<Layout, string[][]> = {
  uz: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'oʻ'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'gʻ', 'ʼ'],
  ],
  ru: [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ъ'],
  ],
  en: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ],
};

const NEXT_LAYOUT: Record<Layout, Layout> = { uz: 'ru', ru: 'en', en: 'uz' };

export interface OnScreenKeyboardProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  initialLayout?: Layout;
}

export default function OnScreenKeyboard({
  value, placeholder, onChange, onSubmit, onClose, initialLayout = 'uz',
}: OnScreenKeyboardProps) {
  const [layout, setLayout] = useState<Layout>(initialLayout);

  return (
    <div className="if-kb" role="group" aria-label={placeholder}>
      <div className="if-kb-preview">
        <Search size={26} />
        {value ? <span>{value}</span> : <em>{placeholder}</em>}
        <button className="if-tap" onClick={onClose} aria-label="Yopish">
          <X size={30} />
        </button>
      </div>

      {LAYOUTS[layout].map((row, i) => (
        <div className="if-kb-row" key={i}>
          {row.map((key) => (
            <button
              key={key}
              className="if-kb-key if-tap"
              onClick={() => onChange(value + key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}

      <div className="if-kb-row">
        <button
          className="if-kb-key if-tap"
          data-wide="1"
          onClick={() => setLayout(NEXT_LAYOUT[layout])}
        >
          <Globe size={24} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          {layout.toUpperCase()}
        </button>
        <button className="if-kb-key if-tap" data-wide="1" onClick={() => onChange(value + ' ')}>
          ␣
        </button>
        <button
          className="if-kb-key if-tap"
          onClick={() => onChange(value.slice(0, -1))}
          aria-label="O'chirish"
        >
          <Delete size={28} />
        </button>
        <button
          className="if-kb-key if-tap"
          data-wide="1"
          data-accent="1"
          onClick={onSubmit}
        >
          <CornerDownLeft size={24} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          Qidirish
        </button>
      </div>
    </div>
  );
}
