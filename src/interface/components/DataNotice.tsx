import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useText } from '../i18n';

interface ResourceState {
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

/**
 * Ma'lumot yuklanmayotganini tashrifchiga aytadi.
 *
 * Ilgari modullar `error` ni umuman o'qimasdi: mock ma'lumotda bu
 * bilinmasdi, lekin backend ulangach so'rov uzilsa, kiosk hech qanday
 * tushuntirishsiz bo'sh sahifa ko'rsatib turaverardi.
 *
 * Bir nechta manba berilsa, birinchi xato ko'rsatiladi; qayta urinish
 * hammasini birdan tiklaydi.
 */
export default function DataNotice({ sources }: { sources: ResourceState[] }) {
  const { s } = useText();
  const failed = sources.filter((r) => r.error);
  if (failed.length === 0) return null;

  return (
    <div className="if-notice" role="alert">
      <AlertTriangle size={30} />
      <div>
        <b>{s('loadFailed')}</b>
        <span>{s('loadFailedHint')}</span>
      </div>
      <button className="if-notice-retry if-tap" onClick={() => failed.forEach((r) => r.reload())}>
        <RotateCcw size={24} />
        {s('retry')}
      </button>
    </div>
  );
}
