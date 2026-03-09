import { ReleaseGallery } from '@/components/Releases/ReleaseGallery/ReleaseGallery';
import styles from './ReleasesPage.module.css';

const ReleasesPage = () => (
  <section className={styles.page}>
    <div className={styles.container}>
      <ReleaseGallery />
    </div>
  </section>
);

export default ReleasesPage;
