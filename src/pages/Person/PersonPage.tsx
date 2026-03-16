import { useParams, useLocation, Link } from 'react-router-dom';
import { FaBehance, FaGithub, FaLinkedinIn, FaSoundcloud, FaSpotify } from 'react-icons/fa6';
import { LuBookOpen, LuBoxes, LuGlobe, LuInstagram, LuLink, LuMail, LuMusic4, LuRadio, LuSlidersHorizontal } from 'react-icons/lu';
import { SiBandcamp, SiBeatport } from 'react-icons/si';
import { PiVinylRecordFill } from "react-icons/pi";
import {
  getArtistBySlug,
  getTeamMemberBySlug,
  type Person,
} from '@/data/gnos';
import { ROUTE_PATHS } from '@/constants/routes';
import { GnosFrame } from '@/components/Person/GnosFrame';
import styles from './PersonPage.module.css';

const getPromoIcon = (label: string, url: string) => {
  const key = `${label} ${url}`.toLowerCase();

  if (key.includes('instagram')) return <LuInstagram aria-hidden />;
  if (key.includes('soundcloud')) return <FaSoundcloud aria-hidden />;
  if (key.includes('linkedin')) return <FaLinkedinIn aria-hidden />;
  if (key.includes('github')) return <FaGithub aria-hidden />;
  if (key.includes('behance')) return <FaBehance aria-hidden />;
  if (key.includes('bandcamp')) return <SiBandcamp aria-hidden />;
  if (key.includes('spotify')) return <FaSpotify aria-hidden />;
  if (key.includes('beatport')) return <SiBeatport aria-hidden />;
  if (key.includes('resident advisor') || key.includes('ra.co')) return <LuRadio aria-hidden />;
  if (key.includes('bookings') || key.startsWith('mailto:')) return <LuMail aria-hidden />;
  if (key.includes('portfolio')) return <LuBookOpen aria-hidden />;
  if (key.includes('mastering')) return <PiVinylRecordFill aria-hidden />;
  if (key.includes('other projects')) return <LuBoxes aria-hidden />;
  if (key.includes('linktree') || key.includes('all links')) return <LuLink aria-hidden />;

  return <LuGlobe aria-hidden />;
};


const PersonPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isArtist = location.pathname.startsWith('/artist');
  const person: Person | undefined = slug
    ? isArtist
      ? getArtistBySlug(slug)
      : getTeamMemberBySlug(slug)
    : undefined;

  if (!person) {
    return (
      <section className={styles.page}>
        <p className={styles.notFound}>Person not found.</p>
        <Link to={ROUTE_PATHS.TEAM} className={styles.back}>
          ← {isArtist ? 'Back to artists' : 'Back to team'}
        </Link>
      </section>
    );
  }

  const backLabel = isArtist ? 'BACK TO ARTISTS' : 'BACK TO TEAM';

  return (
    <article className={styles.page}>
      <Link to={ROUTE_PATHS.TEAM} className={styles.back}>
        ← {backLabel}
      </Link>
      <div className={styles.scanlineOverlay} aria-hidden />

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.personName}>{person.name.toUpperCase()}</h1>
          {person.subtitle && (
            <p className={styles.subtitle}>{person.subtitle}</p>
          )}
        </header>

        <div className={`${styles.framesGrid} ${!isArtist ? styles.framesGridTeam : ''}`}>
          <div className={styles.frameCellImages}>
            <div className={styles.imageGallery}>
              <div className={styles.imageMain}>
                <div className={styles.personArtwork}>
                  <img
                    src="/svg/releases/cover-frame.svg"
                    alt=""
                    className={styles.coverFrame}
                    aria-hidden
                  />
                  {person.image ? (
                    <img
                      src={person.image}
                      alt=""
                      className={styles.personImage}
                      aria-hidden
                      decoding="async"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} aria-hidden />
                  )}
                </div>
              </div>
              <div className={styles.imageSecondary}>
                <div className={styles.personArtwork}>
                  <img
                    src="/svg/releases/cover-frame.svg"
                    alt=""
                    className={styles.coverFrame}
                    aria-hidden
                  />
                  {person.imageTopRight ?? person.image ? (
                    <img
                      src={person.imageTopRight ?? person.image}
                      alt=""
                      className={styles.personImage}
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} aria-hidden />
                  )}
                </div>
                <div className={styles.personArtwork}>
                  <img
                    src="/svg/releases/cover-frame.svg"
                    alt=""
                    className={styles.coverFrame}
                    aria-hidden
                  />
                  {person.imageBottomRight ?? person.image ? (
                    <img
                      src={person.imageBottomRight ?? person.image}
                      alt=""
                      className={styles.personImage}
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} aria-hidden />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Frame 2: Promo links */}
          <div className={styles.frameCellBio}>
            <GnosFrame>
              <h2 className={styles.frameTitle}>PROMO LINKS</h2>
              <div className={styles.frameInner}>
                <div className={styles.frameScroll}>
                  <ul className={styles.promoList}>
                    {person.promoLinks?.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.url}
                          className={styles.promoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className={styles.promoLead}>
                            <span className={styles.promoIcon}>{getPromoIcon(link.label, link.url)}</span>
                            <span className={styles.promoLabel}>{link.label}</span>
                          </span>
                          <span className={styles.promoArrow} aria-hidden>→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GnosFrame>
          </div>

          {/* Frame 3: Interview (artists) or Role (team members) — home frame.svg */}
          <div className={`${styles.frameCellInterview} ${!isArtist ? styles.frameCellRole : ''}`}>
            <GnosFrame variant="home">
              {isArtist && (
                <h2 className={styles.frameTitle}>INTERVIEW MODULE</h2>
              )}
              <div className={styles.frameInner}>
                <div className={`${styles.frameScroll} ${!isArtist ? styles.roleFrameScroll : ''}`}>
                  {isArtist ? (
                    <div className={styles.interviewList}>
                      {person.interview?.map((item, i) => (
                        <div key={i} className={styles.interviewItem}>
                          <p className={styles.interviewQuestion}>
                            <span className={styles.interviewQ}>Q:</span> {item.q}
                          </p>
                          <p className={styles.interviewAnswer}>
                            <span className={styles.interviewA}>A:</span> {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.roleText}>{person.role ?? '—'}</p>
                  )}
                </div>
              </div>
            </GnosFrame>
            {!isArtist && (
              <img
                src="/svg/personpage-dec.svg"
                alt=""
                className={styles.roleDecoration}
                aria-hidden
              />
            )}
          </div>

          {/* Frame 4: Biography */}
          <div className={`${styles.frameCellPromo} ${styles.frameCellBiography} ${!isArtist ? styles.frameCellPromoCompact : ''}`}>
            <GnosFrame>
              <h2 className={styles.frameTitle}>BIOGRAPHY</h2>
              <div className={styles.frameInner}>
                <div className={styles.frameScroll}>
                  <p className={styles.bioText}>{person.bio}</p>
                  {isArtist && (
                    <div className={styles.detailsPanel}>
                      <div className={styles.detailsRow}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>COUNTRY</span>
                          <span className={styles.detailValue}>{person.country}</span>
                        </div>
                        <div className={styles.detailDivider} aria-hidden />
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>ACTIVE SINCE</span>
                          <span className={styles.detailValue}>{person.activeSince}</span>
                        </div>
                        <div className={styles.detailDivider} aria-hidden />
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>LABELS</span>
                          <span className={styles.detailValue}>{person.labels}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GnosFrame>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PersonPage;
