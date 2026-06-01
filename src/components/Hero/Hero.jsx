import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero({ dict, lang }) {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <h1 className={`h1 ${styles.title}`}>
            {dict.hero.headline}
          </h1>
          <p className={`subtitle ${styles.subtitle}`}>
            {dict.hero.subheadline}
          </p>
          <div className={styles.buttonGroup}>
            <Link href={`/${lang}#installation`} className="btn-primary">
              {dict.hero.primaryBtn}
            </Link>
            <Link href={`/${lang}#it-support`} className="btn-secondary">
              {dict.hero.secondaryBtn}
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/hero.png"
              alt={dict.hero.imageAlt}
              fill
              sizes="(max-width: 992px) 100vw, 540px"
              className={styles.image}
              priority
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
