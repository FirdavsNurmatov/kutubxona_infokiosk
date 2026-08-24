import { useEffect, useRef, useState } from 'react';
import { ChevronDown, CornerDownLeft, Delete, Globe, Search, X } from 'lucide-react';
import { useI18n } from '../i18n/context';
import './on-screen-keyboard.css';

/*
 * Sensorli ekran uchun klaviatura.
 *
 * Kiosk mashinalarida fizik klaviatura yo'q — na infokioskda, na bino
 * xaritasi terminalida. Shuning uchun bu komponent umumiy: /interface,
 * asosiy kiosk va xarita bo'limi bitta klaviaturadan foydalanadi.
 *
 * Uch xil yozuv qo'llab-quvvatlanadi: o'zbek lotin (apostrofli harflar
 * bilan), rus kirill va ingliz. Ochilganda tanlangan interfeys tilining
 * yozuvi ko'rsatiladi.
 */

type Layout = 'uz' | 'ru' | 'en';

/* Raqamlar barcha yozuv turlarida bir xil — yil, inventar yoki ISBN
   bo'yicha qidirish uchun kerak. */
const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

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

/* Eng uzun qator nechta tugmadan iborat — barcha qatorlar shu ritmda
   tekislanadi, shunda tugmalar ustun bo'lib tizilib turadi. */
const COLUMNS: Record<Layout, number> = { uz: 10, ru: 11, en: 10 };

export interface OnScreenKeyboardProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  /** "Qidirish" bosilganda. */
  onSubmit: () => void;
  onClose: () => void;
  /** Ochilganda ko'rsatiladigan yozuv turi. Berilmasa — interfeys tili. */
  initialLayout?: Layout;
}

export default function OnScreenKeyboard({
  value, placeholder, onChange, onSubmit, onClose, initialLayout,
}: OnScreenKeyboardProps) {
  const { t, lang } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>(initialLayout ?? lang);

  /*
     Klaviatura balandligi yozuv turiga qarab o'zgaradi (kirillda qator
     uzunroq). Ustidagi panel — masalan qidiruv natijalari — uning tagiga
     kirib ketmasligi uchun balandlik o'lchanadi va CSS o'zgaruvchisiga
     yoziladi.
  */
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const publish = () => {
      document.documentElement.style.setProperty(
        '--kb-height', `${Math.ceil(el.getBoundingClientRect().height)}px`,
      );
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty('--kb-height');
    };
  }, []);

  const rows = LAYOUTS[layout];

  return (
    <div
      className="kb"
      ref={root}
      role="group"
      aria-label={placeholder}
      style={{ ['--kb-cols' as string]: COLUMNS[layout] }}
    >
      <div className="kb-field">
        <Search size={26} className="kb-field-icon" />
        <span className="kb-field-value">
          {value ? <>{value}<i className="kb-caret" /></> : <em>{placeholder}</em>}
        </span>
        {value && (
          <button
            type="button"
            className="kb-field-clear"
            onClick={() => onChange('')}
            aria-label={t.aria.clearSearch}
          >
            <X size={24} />
          </button>
        )}
        {/* Yopish — "klaviaturani tushirish": tozalash tugmasi bilan
            adashtirmaslik uchun ataylab boshqa belgi. */}
        <button type="button" className="kb-field-close" onClick={onClose} aria-label={t.aria.close}>
          <ChevronDown size={30} />
        </button>
      </div>

      <div className="kb-keys">
        <div className="kb-row">
          {DIGITS.map((key) => (
            <button type="button" key={key} className="kb-key" onClick={() => onChange(value + key)}>
              {key}
            </button>
          ))}
        </div>

        {rows.map((row, i) => (
          <div className="kb-row" key={i}>
            {row.map((key) => (
              <button type="button" key={key} className="kb-key" onClick={() => onChange(value + key)}>
                {key}
              </button>
            ))}
          </div>
        ))}

        <div className="kb-row kb-row-tools">
          <button
            type="button"
            className="kb-key kb-key-tool"
            style={{ flexGrow: 2 }}
            onClick={() => setLayout(NEXT_LAYOUT[layout])}
            aria-label={t.aria.keyboardLayout}
          >
            <Globe size={24} />
            <span>{layout.toUpperCase()}</span>
          </button>

          <button
            type="button"
            className="kb-key kb-key-space"
            style={{ flexGrow: 7 }}
            onClick={() => onChange(`${value} `)}
            aria-label={t.aria.keyboardSpace}
          >
            <i />
          </button>

          {/* O'chirish tugmasi qizil: sensorli ekranda u eng ko'p qidiriladigan
              tugma, shuning uchun bir qarashda ajralib turishi kerak. */}
          <button
            type="button"
            className="kb-key kb-key-tool kb-key-back"
            style={{ flexGrow: 2 }}
            onClick={() => onChange(value.slice(0, -1))}
            aria-label={t.aria.keyboardBackspace}
          >
            <Delete size={28} />
          </button>

          <button
            type="button"
            className="kb-key kb-key-submit"
            style={{ flexGrow: 4 }}
            onClick={onSubmit}
          >
            <CornerDownLeft size={24} />
            <span>{t.kiosk.searchButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
