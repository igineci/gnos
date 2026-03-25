import styles from './ContactPage.module.css';
import { SiBandcamp } from 'react-icons/si';
import { FaSoundcloud } from 'react-icons/fa6';
import { LuInstagram } from 'react-icons/lu';

const PROMO_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/gnosrecords', icon: <LuInstagram size={20} /> },
  { label: 'SoundCloud', href: 'https://soundcloud.com/gnos-records-502092091', icon: <FaSoundcloud size={20} /> },
  { label: 'Bandcamp', href: 'https://gnosrecords.bandcamp.com', icon: <SiBandcamp size={20} /> },
] as const;

const ContactPage = () => (
  <section className={styles.page}>
    {/* Pulsating heart — lives under both frames */}
    <div className={styles.heartWrap} aria-hidden>
      <img
        src="/svg/contact-decoration.svg"
        alt=""
        className={styles.heartSvg}
      />
    </div>

    <div className={styles.container}>
      {/* Frame 1: Demo & inquiries */}
      <div className={styles.frame}>
        <img
          src="/svg/frame-gnos2.svg"
          alt=""
          className={styles.frameSvg}
          aria-hidden
        />
        <div className={styles.frameContent}>
          <p className={styles.inquiryText}>
            Demo submission and general inquiries:
          </p>
          <a
            href="mailto:gnosrecords@gmail.com"
            className={styles.emailLink}
            rel="noopener noreferrer"
          >
            gnosrecords@gmail.com
          </a>
        </div>
      </div>

      {/* Frame 2: Promo links (mirrored) */}
      <div className={styles.frame}>
        <img
          src="/svg/frame-gnos2.svg"
          alt=""
          className={`${styles.frameSvg} ${styles.frameSvgMirrored}`}
          aria-hidden
        />
        <div className={styles.frameContent}>
          <ul className={styles.linksList}>
            {PROMO_LINKS.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.promoLink}
                  aria-label={label}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ContactPage;
