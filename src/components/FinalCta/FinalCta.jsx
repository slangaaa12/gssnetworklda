import Link from 'next/link';
import styles from './FinalCta.module.css';

export default function FinalCta({ dict, lang }) {
  return (
    <section className={`section ${styles.ctaSection}`}>
      <div className={`container ${styles.container}`}>
        <h2 className={`h1 ${styles.title}`}>{dict.finalCta.headline}</h2>
        <p className={`subtitle ${styles.subtitle}`}>{dict.finalCta.subheadline}</p>
        <div className={styles.buttonGroup}>
          <Link href={`/${lang}#installation`} className={`btn-primary ${styles.btnLarge}`}>
            {dict.finalCta.primaryBtn}
          </Link>
          <Link href={`/${lang}#it-support`} className={`btn-secondary ${styles.btnLarge}`}>
            {dict.finalCta.secondaryBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
