import {
  Accessibility,
  Armchair,
  BookOpen,
  Coffee,
  DoorOpen,
  Globe,
  Landmark,
  Laptop,
  Layers,
  Mail,
  MapPin,
  Monitor,
  Navigation,
  Phone,
  Printer,
  Quote,
  Scan,
  Sparkles,
  Users,
  Wifi,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useI18n } from '../../i18n/context';
import { aboutText, contact } from '../../data/mockData';
import { ROOM_TOTALS } from '../data/floors';
import type { MapText } from '../mapText';

/** Uch xonali guruhlarga ajratilgan raqam: 125000 → 125 000 */
function group(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/* To'rtta yo'nalish kartochkasi — belgi, rang va rasmi shu yerda bog'lanadi. */
const FEATURE_STYLE: { icon: LucideIcon; tone: string; image: string }[] = [
  { icon: Landmark, tone: '#B07A2B', image: '/images/books.jpg' },
  { icon: Laptop, tone: '#3F6BE8', image: '/images/stack.jpg' },
  { icon: BookOpen, tone: '#2E9E5B', image: '/images/hall.jpg' },
  { icon: Sparkles, tone: '#8B5CF6', image: '/images/open.jpg' },
];

/* Imkoniyatlar ro'yxati mapText dagi tartibda — belgilar ham shu tartibda. */
const AMENITY_ICONS: LucideIcon[] = [
  Laptop,
  Globe,
  Wifi,
  Monitor,
  Printer,
  Scan,
  Accessibility,
  Coffee,
  Navigation,
  Users,
];

interface AboutViewProps {
  text: MapText;
}

/** "Kutubxona haqida" — bino, raqamlar, imkoniyatlar va aloqa ma'lumotlari. */
export default function AboutView({ text }: AboutViewProps) {
  const { tr } = useI18n();

  const facts: { icon: LucideIcon; value: string; label: string; tone: string }[] = [
    { icon: BookOpen, value: `${group(1000000)}+`, label: text.about.factLabels.books, tone: '#3F6BE8' },
    { icon: Users, value: `${group(125000)}+`, label: text.about.factLabels.readers, tone: '#8B5CF6' },
    { icon: Layers, value: '2', label: text.about.factLabels.floors, tone: '#2E9E5B' },
    { icon: DoorOpen, value: String(ROOM_TOTALS.rooms), label: text.about.factLabels.rooms, tone: '#E08A1E' },
    { icon: Armchair, value: group(ROOM_TOTALS.seats), label: text.about.factLabels.seats, tone: '#DB4F98' },
    { icon: Monitor, value: '50+', label: text.about.factLabels.computers, tone: '#0E93A6' },
  ];

  return (
    <div className="m-about">
      {/* Sarlavha va bino surati */}
      <section className="m-about-hero">
        <div className="m-about-hero-text">
          <h1 className="m-rooms-title">{text.about.title}</h1>
          <div className="m-about-sub">{text.about.subtitle}</div>
          <p className="m-about-lead">{tr(aboutText)}</p>
        </div>
        <div className="m-about-hero-img">
          <img src="/images/map/kutubxona_background.jpg" alt="" />
        </div>
      </section>

      {/* Raqamlar tasmasi */}
      <section className="m-card m-about-facts">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="m-fact" style={{ ['--m-tone' as string]: fact.tone }}>
              <span className="m-fact-badge">
                <Icon size={21} strokeWidth={2} />
              </span>
              <div>
                <div className="m-fact-value">{fact.value}</div>
                <div className="m-fact-label">{fact.label}</div>
              </div>
            </div>
          );
        })}
      </section>

      {/* To'rtta yo'nalish */}
      <section className="m-about-features">
        {text.about.features.map((feature, i) => {
          const style = FEATURE_STYLE[i];
          const Icon = style.icon;
          return (
            <article
              key={feature.title}
              className="m-feature-card"
              style={{ ['--m-tone' as string]: style.tone }}
            >
              <div className="m-feature-media">
                <img src={style.image} alt="" />
              </div>
              <span className="m-feature-badge">
                <Icon size={20} strokeWidth={2} />
              </span>
              <h2 className="m-feature-title">{feature.title}</h2>
              <p className="m-feature-body">{feature.body}</p>
            </article>
          );
        })}
      </section>

      {/* Imkoniyatlar, ish vaqti va aloqa */}
      <section className="m-about-bottom">
        <div className="m-card m-amenities">
          <div className="m-card-head">
            <span className="m-head-badge">
              <Sparkles size={17} strokeWidth={2.2} />
            </span>
            {text.about.amenitiesTitle}
          </div>
          <div className="m-amenity-grid">
            {text.about.amenities.map((item, i) => {
              const Icon = AMENITY_ICONS[i] ?? Sparkles;
              return (
                <span key={item} className="m-amenity">
                  <Icon size={19} strokeWidth={1.9} />
                  {item}
                </span>
              );
            })}
          </div>
        </div>

        <div className="m-card m-hours">
          <div className="m-card-head">
            <span className="m-head-badge">
              <Landmark size={17} strokeWidth={2.2} />
            </span>
            {text.hours.title}
          </div>
          <div className="m-hours-row">
            <span>{text.hours.weekdaysLabel}</span>
            <strong>{text.hours.weekdays}</strong>
          </div>
          <div className="m-hours-row">
            <span>{text.hours.sundayLabel}</span>
            <strong>{text.hours.sunday}</strong>
          </div>
          <p className="m-hours-note">{text.hours.note}</p>
        </div>

        {/* Manzil va aloqa bitta kartochkada — alohida turganda ikkalasi
            ham juda siyrak ko'rinardi. */}
        <div className="m-card m-contact-card">
          <div className="m-card-head">
            <span className="m-head-badge">
              <Phone size={17} strokeWidth={2.2} />
            </span>
            {text.about.contactTitle}
          </div>
          <div className="m-contact-row">
            <MapPin size={17} strokeWidth={1.9} />
            {tr(contact.address)}
          </div>
          <a className="m-contact-row" href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
            <Phone size={17} strokeWidth={1.9} />
            {contact.phone}
          </a>
          <a className="m-contact-row" href={`mailto:${contact.email}`}>
            <Mail size={17} strokeWidth={1.9} />
            {contact.email}
          </a>
          <a
            className="m-contact-row"
            href={`https://${contact.website}`}
            target="_blank"
            rel="noreferrer"
          >
            <Globe size={17} strokeWidth={1.9} />
            {contact.website}
          </a>
          {/* Google Maps kioskning o'zida ochilmaydi: QR kod tashrifchining
              telefoniga manzilni beradi, ekran esa xarita bo'limida qoladi.
              Rasm sahifa ichida hosil qilinadi — internetsiz ham ishlaydi. */}
          <div className="m-qr m-push-bottom">
            <div className="m-qr-code">
              <QRCodeSVG
                value={`https://maps.google.com/?q=${encodeURIComponent(contact.address.en)}`}
                size={92}
                bgColor="transparent"
                fgColor="#0b1848"
                level="M"
              />
            </div>
            <div>
              <div className="m-qr-title">
                <Navigation size={15} strokeWidth={2.2} />
                {text.about.directions}
              </div>
              <p className="m-qr-hint">{text.about.qrHint}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alisher Navoiy so'zi */}
      <blockquote className="m-quote">
        <Quote size={22} strokeWidth={2} />
        <p>{text.about.quote}</p>
        <cite>{text.about.quoteAuthor}</cite>
      </blockquote>
    </div>
  );
}
