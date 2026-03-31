import { Fragment, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { BsAppleMusic } from 'react-icons/bs';
import { FaBehance, FaGithub, FaLinkedinIn, FaSoundcloud, FaSpotify } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';
import { LuBookOpen, LuBoxes, LuGlobe, LuInstagram, LuLink, LuMail, LuMusic4, LuRadio, LuSlidersHorizontal } from 'react-icons/lu';
import { SiBandcamp, SiBeatport } from 'react-icons/si';
import { PiVinylRecordFill } from "react-icons/pi";
import {
  getArtistBySlug,
  getTeamMemberBySlug,
  type Person,
} from '@/data/gnos';
import type { InterviewAnswerParagraph, InterviewAnswerSegment } from '@/data/person';
import { ROUTE_PATHS } from '@/constants/routes';
import { ARTIST_INTERVIEW_GRID_TRACKS } from '@/constants/personLayout';
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
  if (key.includes('apple music') || key.includes('music.apple.com')) return <BsAppleMusic aria-hidden />;
  if (key.includes('beatport')) return <SiBeatport aria-hidden />;
  if (key.includes('resident advisor') || key.includes('ra.co')) return <LuRadio aria-hidden />;
  if (key.includes('bookings') || key.startsWith('mailto:')) return <LuMail aria-hidden />;
  if (key.includes('portfolio')) return <LuBookOpen aria-hidden />;
  if (key.includes('mastering')) return <PiVinylRecordFill aria-hidden />;
  if (key.includes('other projects')) return <LuBoxes aria-hidden />;
  if (key.includes('linktree') || key.includes('all links')) return <LuLink aria-hidden />;
  if (key.includes('email')) return <LuMail aria-hidden />;

  return <LuGlobe aria-hidden />;
};

function renderInterviewAnswerBlocks(
  a: string | InterviewAnswerParagraph[],
  slug: string,
  qaIndex: number
) {
  if (typeof a === 'string') {
    return splitBioIntoParagraphs(a).map((paragraph, pi) => (
      <p
        key={`${slug}-qa-${qaIndex}-a-${pi}`}
        className={styles.interviewAnswer}
      >
        {paragraph}
      </p>
    ));
  }
  return a.map((block, pi) => {
    const runs = 'parts' in block ? block.parts : undefined;
    if (runs?.length) {
      return (
        <p
          key={`${slug}-qa-${qaIndex}-a-${pi}`}
          className={styles.interviewAnswer}
        >
          {runs.map((seg: InterviewAnswerSegment, j) => (
            <span
              key={`${slug}-qa-${qaIndex}-a-${pi}-s-${j}`}
              className={seg.accent ? styles.interviewAnswerAccentInline : undefined}
            >
              {seg.text}
            </span>
          ))}
        </p>
      );
    }
    const simple = block as Extract<InterviewAnswerParagraph, { text: string }>;
    return (
      <p
        key={`${slug}-qa-${qaIndex}-a-${pi}`}
        className={simple.accent ? styles.interviewAnswerAccent : styles.interviewAnswer}
      >
        {simple.text}
      </p>
    );
  });
}

const splitBioIntoParagraphs = (bio: string | string[]) => {
  if (Array.isArray(bio)) {
    return bio.map((paragraph) => paragraph.trim()).filter(Boolean);
  }

  const normalizedBio = bio.replace(/\r\n/g, '\n').trim();
  const explicitParagraphs = normalizedBio
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (explicitParagraphs.length > 1) {
    return explicitParagraphs;
  }

  const sentences = normalizedBio.match(/[^.!?]+(?:[.!?]+|$)/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [normalizedBio];

  if (sentences.length <= 2) {
    return [normalizedBio];
  }

  const groupSize = Math.ceil(sentences.length / 3);
  const paragraphs: string[] = [];

  for (let index = 0; index < sentences.length; index += groupSize) {
    paragraphs.push(sentences.slice(index, index + groupSize).join(' '));
  }

  return paragraphs;
};

type ScrollableTextFrameProps = {
  children: ReactNode;
  className?: string;
  watchKey: string;
};

function ScrollableTextFrame({
  children,
  className,
  watchKey,
}: ScrollableTextFrameProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [scrollIndicator, setScrollIndicator] = useState({
    trackTop: 0,
    trackHeight: 0,
    thumbHeight: 0,
    thumbOffset: 0,
  });

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const node = scrollRef.current;
    if (!shell || !node) return;

    const syncOverflow = () => {
      const overflow = node.scrollHeight - node.clientHeight > 4;
      setHasOverflow(overflow);

      if (!overflow) {
        setScrollIndicator({
          trackTop: node.offsetTop,
          trackHeight: node.clientHeight,
          thumbHeight: 0,
          thumbOffset: 0,
        });
        return;
      }

      const trackTop = node.offsetTop;
      const trackHeight = node.clientHeight;
      const visibleRatio = node.clientHeight / node.scrollHeight;
      const thumbHeight = Math.max(28, trackHeight * visibleRatio);
      const travel = Math.max(0, trackHeight - thumbHeight);
      const progress = node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight);

      setScrollIndicator({
        trackTop,
        trackHeight,
        thumbHeight,
        thumbOffset: travel * progress,
      });
    };

    syncOverflow();
    window.addEventListener('resize', syncOverflow);
    node.addEventListener('scroll', syncOverflow, { passive: true });

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        window.removeEventListener('resize', syncOverflow);
        node.removeEventListener('scroll', syncOverflow);
      };
    }

    const observer = new ResizeObserver(syncOverflow);
    observer.observe(node);
    Array.from(node.children).forEach((child) => observer.observe(child));

    return () => {
      window.removeEventListener('resize', syncOverflow);
      node.removeEventListener('scroll', syncOverflow);
      observer.disconnect();
    };
  }, [watchKey]);

  return (
    <div
      ref={shellRef}
      className={`${styles.frameScrollShell} ${hasOverflow ? styles.frameScrollShellOverflow : ''}`}
    >
      <div ref={scrollRef} className={`${styles.frameScroll} ${className ?? ''}`}>
        {children}
      </div>
      {hasOverflow && (
        <span className={styles.frameScrollIndicator} aria-hidden>
          <span
            className={styles.frameScrollIndicatorThumb}
            style={
              {
                '--frame-scroll-track-top': `${scrollIndicator.trackTop}px`,
                '--frame-scroll-track-height': `${scrollIndicator.trackHeight}px`,
                '--frame-scroll-thumb-height': `${scrollIndicator.thumbHeight}px`,
                '--frame-scroll-thumb-offset': `${scrollIndicator.thumbOffset}px`,
              } as CSSProperties
            }
          />
        </span>
      )}
    </div>
  );
}


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
  const bioParagraphs = splitBioIntoParagraphs(person.bio ?? '');

  return (
    <article
      className={styles.page}
      style={
        isArtist
          ? ({
              '--person-artist-interview-tracks': ARTIST_INTERVIEW_GRID_TRACKS,
            } as CSSProperties)
          : undefined
      }
    >
      <Link to={ROUTE_PATHS.TEAM} className={styles.back}>
        ← {backLabel}
      </Link>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.personName}>{person.name.toUpperCase()}</h1>
        </header>

        <div className={`${styles.framesGrid} ${styles.framesGridTeam}`}>
          <div className={styles.frameCellImages}>
            <div className={styles.imagesListShell}>
            <div className={styles.imageGallery}>
              <div className={styles.imageMain}>
                <div className={styles.personArtwork}>
                  <img
                    src="/svg/releases/cover-frame.svg"
                    alt=""
                    className={styles.coverFrame}
                    aria-hidden
                    draggable={false}
                  />
                  {person.image ? (
                    <img
                      src={person.image}
                      alt=""
                      className={styles.personImage}
                      aria-hidden
                      decoding="async"
                      fetchPriority="high"
                      draggable={false}
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
                    draggable={false}
                  />
                  {person.imageTopRight ?? person.image ? (
                    <img
                      src={person.imageTopRight ?? person.image}
                      alt=""
                      className={styles.personImage}
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      draggable={false}
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
                    draggable={false}
                  />
                  {person.imageBottomRight ?? person.image ? (
                    <img
                      src={person.imageBottomRight ?? person.image}
                      alt=""
                      className={styles.personImage}
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} aria-hidden />
                  )}
                </div>
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
          <div
            className={`${styles.frameCellInterview} ${!isArtist ? styles.frameCellRole : ''}`}
          >
            <GnosFrame variant="home">
              {isArtist && (
                <h2 className={styles.frameTitle}>INTERVIEW MODULE</h2>
              )}
              <div className={styles.frameInner}>
                <ScrollableTextFrame
                  className={!isArtist ? styles.roleFrameScroll : undefined}
                  watchKey={`${person.slug}-${isArtist ? 'artist' : 'team'}-${person.interview?.length ?? 0}-${person.role ?? ''}`}
                >
                  {isArtist ? (
                    <div className={styles.interviewList}>
                      {person.interview?.map((item, i) => (
                          <Fragment key={`${person.slug}-qa-${i}`}>
                            {i > 0 && (
                              <div className={styles.interviewLineSeparator} aria-hidden>
                                <img
                                  src="/svg/line-separator.svg"
                                  alt=""
                                  className={styles.interviewLineSeparatorSvg}
                                  draggable={false}
                                />
                              </div>
                            )}
                            <div className={styles.interviewItem}>
                              <p className={styles.interviewQuestion}>
                                <span className={styles.interviewQuestionIcon} aria-hidden>
                                  <IoTriangle />
                                </span>
                                <span className={styles.interviewQuestionText}>{item.q}</span>
                              </p>
                              <div className={styles.interviewAnswerBlock}>
                                {renderInterviewAnswerBlocks(item.a, person.slug, i)}
                              </div>
                            </div>
                          </Fragment>
                        ))}
                    </div>
                  ) : (
                    <p className={styles.roleText}>{person.role ?? '—'}</p>
                  )}
                </ScrollableTextFrame>
              </div>
            </GnosFrame>
            {!isArtist && (
              <img
                src="/svg/personpage-dec.svg"
                alt=""
                className={styles.roleDecoration}
                aria-hidden
                draggable={false}
              />
            )}
          </div>

          {/* Frame 4: Biography */}
          <div className={`${styles.frameCellPromo} ${styles.frameCellBiography} ${!isArtist ? styles.frameCellPromoCompact : ''}`}>
            <GnosFrame>
              <h2 className={styles.frameTitle}>BIOGRAPHY</h2>
              <div className={styles.frameInner}>
                <ScrollableTextFrame watchKey={`${person.slug}-bio-${bioParagraphs.length}`}>
                  <div className={styles.bioText}>
                    {bioParagraphs.map((paragraph, index) => (
                      <p key={`${person.slug}-bio-${index}`} className={styles.bioParagraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </ScrollableTextFrame>
              </div>
            </GnosFrame>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PersonPage;
