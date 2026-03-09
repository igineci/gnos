import { useParams, Link } from 'react-router-dom';
import { MDXContent } from '@content-collections/mdx/react';
import { allReleases } from 'content-collections';
import { ROUTE_PATHS } from '@/constants/routes';
import { Tracklist } from '@/components/Releases/Tracklist/Tracklist';
import { BandcampEmbed } from '@/components/Releases/BandcampEmbed/BandcampEmbed';
import { ExternalLinks } from '@/components/Releases/ExternalLinks/ExternalLinks';
import { Credits } from '@/components/Releases/Credits/Credits';
import { RelatedReleases } from '@/components/Releases/RelatedReleases/RelatedReleases';
import styles from './ReleasePage.module.css';

const ReleasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const release = allReleases.find((r) => r.slug === slug);

  if (!release) {
    return (
      <section className={styles.page}>
        <p className={styles.notFound}>Release not found.</p>
        <Link to={ROUTE_PATHS.RELEASES} className={styles.back}>
          ← Back to releases
        </Link>
      </section>
    );
  }

  const artistDisplay =
    release.type === 'album'
      ? release.artist
      : release.artists?.map((a) => a.name).join(', ') ?? '';

  return (
    <article className={styles.page}>
      <Link to={ROUTE_PATHS.RELEASES} className={styles.back}>
        ← Releases
      </Link>

      <header className={styles.hero}>
        <div className={styles.coverWrap}>
          <img
            src={release.coverArt}
            alt={`${release.title} cover`}
            className={styles.cover}
          />
        </div>
        <div className={styles.meta}>
          <span className={styles.catalog}>{release.catalogNumber}</span>
          <h1 className={styles.title}>{release.title}</h1>
          {artistDisplay && (
            <p className={styles.artist}>{artistDisplay}</p>
          )}
          <time className={styles.date} dateTime={release.releaseDate}>
            {release.releaseDate}
          </time>
        </div>
      </header>

      <div className={styles.body}>
        <Tracklist release={release} />
        <BandcampEmbed release={release} />

        {release.mdx && (
          <div className={styles.editorial}>
            <MDXContent code={release.mdx} />
          </div>
        )}

        <Credits release={release} />
        <ExternalLinks release={release} />
        <RelatedReleases currentSlug={release.slug} />
      </div>
    </article>
  );
};

export default ReleasePage;
