import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import PageShell from '../components/PageShell';
import { useI18n } from '../i18n/context';
import { SITE_URL, contact, socialLinks } from '../data/mockData';

interface ContactViewProps {
  onBack: () => void;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{ width: '38px', height: '38px', background: 'rgba(34,195,230,0.12)' }}
      >
        <Icon size={20} className="text-paper-200" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <div className="text-paper-400 text-xs font-semibold uppercase tracking-wide">{label}</div>
        <div className="text-white text-[15px] font-medium break-words">{value}</div>
      </div>
    </div>
  );
}

export default function ContactView({ onBack }: ContactViewProps) {
  const { t, tr } = useI18n();

  return (
    <PageShell title={t.page.contact} onBack={onBack}>
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div
          className="rounded-2xl bg-ink-600 p-5 flex flex-col gap-4"
          style={{ border: '1px solid rgba(34,195,230,0.25)' }}
        >
          <InfoRow icon={MapPin} label={t.contactInfo.address} value={tr(contact.address)} />
          <InfoRow icon={Phone} label={t.contactInfo.phone} value={contact.phone} />
          <InfoRow icon={Mail} label={t.contactInfo.email} value={contact.email} />
          <InfoRow icon={Globe} label={t.contactInfo.website} value={contact.website} />
        </div>

        <div
          className="rounded-2xl bg-ink-600 p-5"
          style={{ border: '1px solid rgba(34,195,230,0.25)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock size={18} className="text-paper-200" strokeWidth={1.8} />
            <h3 className="text-white font-bold text-base">{t.contactInfo.schedule}</h3>
          </div>
          <div className="flex flex-col">
            {contact.schedule.map((row, idx) => (
              <div
                key={tr(row.days)}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
                style={idx > 0 ? { borderTop: '1px solid rgba(34,195,230,0.25)' } : undefined}
              >
                <span className="text-paper-200 font-medium">{tr(row.days)}</span>
                <span className="text-white font-semibold tabular-nums">{tr(row.hours)}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-4 text-center"
          style={{
            background: 'linear-gradient(135deg, #06437A 0%, #0E5270 100%)',
            border: '1.5px solid #22C3E6',
          }}
        >
          <div className="rounded-xl bg-ink-600 p-3">
            <QRCodeSVG value={SITE_URL} size={140} bgColor="#ffffff" fgColor="#0D1B4B" level="M" />
          </div>
          <p className="text-white text-sm leading-relaxed" style={{ maxWidth: '220px' }}>
            {t.contactInfo.qrHint}
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 text-sm font-semibold underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
