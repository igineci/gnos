import styles from './Footer.module.css';
import { SiBandcamp } from "react-icons/si";
import { FaSoundcloud } from "react-icons/fa6";
import { AiOutlineCopyright } from "react-icons/ai";
import { LuInstagram } from "react-icons/lu";

const FOOTER_LINKS = [
  { href: 'https://instagram.com/gnosrecords', label: 'Instagram', icon: <LuInstagram /> },
  { href: 'https://soundcloud.com/gnosrecords', label: 'SoundCloud', icon: <FaSoundcloud /> },
  { href: 'https://gnosrecords.bandcamp.com', label: 'Bandcamp', icon: <SiBandcamp /> },
];

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.footerWrap}>
      <button
        type="button"
        className={styles.scrollTopButton}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
      >
        <span className={styles.scrollTopIconWrap} aria-hidden>
          <img src="/svg/arrow.svg" alt="" className={styles.scrollTopIcon} />
        </span>
      </button>
      <footer className={styles.footer}>
        <div className={styles.frameInner}>
          <div className={styles.copyrightBlock}>
            <p className={styles.copyright}>
              <span className={styles.copyrightIcon} aria-hidden>
                <AiOutlineCopyright />
              </span>
              2026 Gnos Records
            </p>
            <p className={styles.location}>Belgrade, Serbia</p>
            <p className={styles.rights}>All rights reserved</p>
          </div>
          <div className={styles.decWrapper} aria-hidden>
            <img src="/svg/footer-dec.svg" alt="" className={styles.footerDec} />
          </div>
          <div className={styles.iconsBlock}>
            <div className={styles.iconsRow}>
              {FOOTER_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.iconLink}
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className={styles.demoSubmission}>
              Demo submission: <a href="mailto:gnosrecords@gmail.com" className={styles.demoLink}>gnosrecords@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
