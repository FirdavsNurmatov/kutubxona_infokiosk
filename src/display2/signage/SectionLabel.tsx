interface SectionLabelProps {
  /** Bo'lim raqami: "01", "02", "03". */
  index: string;
  text: string;
}

/**
 * Maketdagi bo'lim sarlavhasi: oltin serif raqam + kichik harfli yozuv.
 *
 * Uchala sahifada ham bir xil ko'rinadi va kadrning yuqori chap burchagida
 * turadi — tomoshabin bir soniyada qaysi bo'lim ekanini tushunadi.
 */
export default function SectionLabel({ index, text }: SectionLabelProps) {
  return (
    <div className="sg-label">
      <span className="sg-label-index">{index}</span>
      <span className="sg-label-text">{text}</span>
    </div>
  );
}
