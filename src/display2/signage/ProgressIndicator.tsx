interface ProgressIndicatorProps {
  count: number;
  index: number;
  /** Joriy bo'lim davomiyligi (ms). Berilmasa chiziq to'lmaydi — masalan video. */
  duration?: number;
}

/**
 * Pastdagi nozik ko'rsatkich: nechanchi bo'lim ketayotgani va u qancha
 * davom etishi.
 *
 * Ataylab "sayt karuseli" tugmalariga o'xshamaydi — bu boshqaruv emas, faqat
 * ritmni bildiruvchi ingichka chiziqlar. To'lish CSS animatsiyasi bilan
 * bajariladi, ya'ni har kadrda React qayta chizilmaydi.
 */
export default function ProgressIndicator({ count, index, duration }: ProgressIndicatorProps) {
  if (count < 2) return null;

  return (
    <div className="sg-progress" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`sg-progress-item${i === index ? ' is-active' : ''}`}>
          {i === index && duration ? (
            // key — indeks bilan birga o'zgaradi, shunda animatsiya qaytadan boshlanadi
            <span
              key={`${index}-${duration}`}
              className="sg-progress-fill"
              style={{ animationDuration: `${duration}ms` }}
            />
          ) : null}
        </span>
      ))}
    </div>
  );
}
