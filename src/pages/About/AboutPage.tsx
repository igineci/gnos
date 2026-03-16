import styles from './AboutPage.module.css';

const LABEL_CODEX_ITEMS = [
  { text: 'Sound begins with inner experience.', accent: false },
  { text: 'Originality requires honesty and courage.', accent: false },
  { text: 'Art must carry intention.', accent: false },
  { text: 'Inspiration reveals itself through attention.', accent: false },
  { text: 'Consistency shapes the identity of ', accent: false, accentSuffix: 'GNOS.' },
  { text: 'GNOS protects artistic integrity.', accent: true },
  { text: 'GNOS is a safe space for personal truth.', accent: true },
  { text: 'GNOS encourages difficult and necessary conversations.', accent: true },
  { text: 'GNOS opens space for independent voices.', accent: true },
];

const AboutPage = () => {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* Frame 1 SVG: two sections — About Gnos (top), Mission (bottom) */}
        <div className={styles.frameWrapper}>
          <img
            src="/svg/about/about-frame-1.svg"
            alt=""
            className={styles.frameSvg}
            aria-hidden
          />
          <div className={`${styles.frameContent} ${styles.frameContentTop} ${styles.aboutIntroPanel}`}>
            <div className={styles.aboutHeader}>
              <h2 className={`${styles.heading} ${styles.aboutHeading}`}>About Gnos</h2>
            </div>
            <div className={styles.aboutScroll}>
              <p className={`${styles.paragraph} ${styles.aboutParagraph}`}>
                GNOS Records is a techno label established in Belgrade, Serbia. We are dedicated to a sound that is both primal and visionary, driven by artistic integrity and creative necessity. GNOS gives artists a platform to express and extend the life of their work, while fostering deeper connections across the techno community, between artists, managers, organizers, and the ravers who live for the music.
              </p>
              <p className={`${styles.paragraph} ${styles.aboutParagraph}`}>
                Beyond releasing music, GNOS exists as a space for exploration. Inspired by the idea of gnosis, knowledge gained through experience and insight, we approach techno not only as a genre, but as a medium for expression, reflection, and discovery.
              </p>
              <p className={`${styles.paragraph} ${styles.aboutParagraph}`}>
                Through releases, reflections, and collaborations with artists from different disciplines, GNOS aims to create a platform where sound, thought, and visual culture intersect. Philosophy, psychology, mythology, religion and other forms of artistic inquiry serve as a natural backdrop for the music we release.
              </p>
              <p className={`${styles.paragraph} ${styles.aboutParagraph}`}>
                Within this framework, gnosis represents movement from not knowing toward deeper understanding. GNOS adopts this principle as a guiding thread for the project: each release, collaboration, and reflection becomes part of an ongoing exploration, where techno functions as both a physical experience and a space for insight.
              </p>
              <p className={`${styles.paragraph} ${styles.aboutParagraph}`}>
                In this sense, GNOS also reflects a collective process of awareness. Just as gnosis points toward knowledge discovered through direct experience, techno itself becomes a place where such experiences unfold. The label embraces this dynamic as a living dialogue between artists and listeners, where each release contributes another fragment to a broader exploration of sound, perception, and meaning.
              </p>
            </div>
          </div>
          <div className={`${styles.frameContent} ${styles.frameContentBottom} ${styles.missionVisionPanel}`}>
            <div className={styles.missionVisionRow}>
              <div className={`${styles.missionCol} ${styles.diagonalMission}`}>
                <h2 className={styles.heading}>Mission</h2>
                <p className={`${styles.paragraph} ${styles.missionVisionParagraph}`}>
                  GNOS Records is a label dedicated to techno music that comes from
                  the mind and the soul. Our mission is to provide space for artists
                  whose sound is an honest extension of their identity; music that
                  speaks, builds, and carries meaning. Beyond the music, GNOS exists
                  to open the door for artists who wish to speak, reflect, and
                  exchange thoughts about art, creation, the scene, and what often
                  remains unseen.
                </p>
              </div>
              <div className={styles.missionVisionSeparatorWrap} aria-hidden>
                <img
                  src="/svg/about/separator.svg"
                  alt=""
                  className={styles.missionVisionSeparator}
                />
              </div>
              <div className={`${styles.visionCol} ${styles.diagonalVision}`}>
                <h2 className={styles.heading}>Vision</h2>
                <p className={`${styles.paragraph} ${styles.missionVisionParagraph}`}>
                  GNOS Records envisions becoming the leading techno label in the
                  Balkans, a space that brings together artists, thinkers, and
                  innovators. We aim to build a label that offers more than just
                  sound, a platform for the exchange of ideas, dialogue, and support
                  for artists at every stage of their creative journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Frame 2 SVG: 3rd frame = Opportunities (top), 4th frame = Label Codex (bottom) */}
        <div className={styles.frameWrapper}>
          <img
            src="/svg/about/about-frame-2.svg"
            alt=""
            className={styles.frameSvg}
            aria-hidden
          />
          <div
            className={styles.aboutFrameTwoTopLayer}
            style={{
              top: '3%',
              bottom: '56%',
              left: '5%',
              right: '12%',
              zIndex: 3,
            }}
          >
            <div className={styles.opportunitiesBackdrop} aria-hidden>
              <img
                src="/svg/about/eye-dec.svg"
                alt=""
                className={styles.opportunitiesBackground}
                aria-hidden
              />
            </div>
            <div
              className={styles.opportunitiesInner}
            >
              <h2 className={styles.heading}>Opportunities</h2>
              <p className={styles.paragraphCenter}>
                GNOS aims to unite artists who live for music and those who seek to
                be heard, reaching every corner of the scene to highlight the beauty
                of creation and understanding.
              </p>
            </div>
          </div>
          <div className={`${styles.aboutFrameTwoBottomLayer} ${styles.codexPanel}`}>
            <h2 className={styles.heading}>Label Codex</h2>
            <ul className={styles.codexList}>
              {LABEL_CODEX_ITEMS.map((item, i) => (
                <li
                  key={i}
                  className={`${item.accent ? styles.codexAccent : styles.codexItem} ${styles.codexLine}`}
                >
                  {item.text}
                  {item.accentSuffix ? <span className={styles.codexAccent}>{item.accentSuffix}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
