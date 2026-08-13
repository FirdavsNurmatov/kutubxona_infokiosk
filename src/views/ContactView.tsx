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
        style={{ width: '38px', height: '38px', background: 'rgba(13,27,75,0.06)' }}
      >
        <Icon size={18} className="text-navy-700" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <div className="text-navy-400 text-[11px] font-semibold uppercase tracking-wide">{label}</div>
        <div className="text-navy-900 text-sm font-medium break-words">{value}</div>
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
          className="rounded-2xl bg-white p-5 flex flex-col gap-4"
          style={{ border: '1px solid rgba(201,168,76,0.35)' }}
        >
          <InfoRow icon={MapPin} label={t.contactInfo.address} value={tr(contact.address)} />
          <InfoRow icon={Phone} label={t.contactInfo.phone} value={contact.phone} />
          <InfoRow icon={Mail} label={t.contactInfo.email} value={contact.email} />
          <InfoRow icon={Globe} label={t.contactInfo.website} value={contact.website} />
        </div>

        <div
          className="rounded-2xl bg-white p-5"
          style={{ border: '1px solid rgba(201,168,76,0.35)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock size={18} className="text-navy-700" strokeWidth={1.8} />
            <h3 className="text-navy-900 font-bold text-sm">{t.contactInfo.schedule}</h3>
          </div>
          <div className="flex flex-col">
            {contact.schedule.map((row, idx) => (
              <div
                key={tr(row.days)}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
                style={idx > 0 ? { borderTop: '1px solid rgba(201,168,76,0.2)' } : undefined}
              >
                <span className="text-navy-700 font-medium">{tr(row.days)}</span>
                <span className="text-navy-900 font-semibold tabular-nums">{tr(row.hours)}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-5 flex flex-col items-center justify-center gap-4 text-center"
          style={{
            background: 'linear-gradient(135deg, #0D1B4B 0%, #1a2f6e 100%)',
            border: '1.5px solid #C9A84C',
          }}
        >
          <div className="rounded-xl bg-white p-3">
            <QRCodeSVG value={SITE_URL} size={140} bgColor="#ffffff" fgColor="#0D1B4B" level="M" />
          </div>
          <p className="text-white text-xs leading-relaxed" style={{ maxWidth: '220px' }}>
            {t.contactInfo.qrHint}
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 text-xs font-semibold underline underline-offset-2"
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
