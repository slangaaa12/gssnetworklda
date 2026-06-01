import Link from 'next/link';
import styles from './Services.module.css';

export default function Services({ dict, lang }) {
  return (
    <section id="services" className={`section ${styles.servicesSection}`}>
      <div className={`container`}>
        <h2 className={`h2 ${styles.title}`}>{dict.services.title}</h2>
        
        <div className={styles.grid}>
          {/* Internet Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <h3 className={`h3 ${styles.cardTitle}`}>{dict.services.internet.title}</h3>
            <p className={`body ${styles.cardDesc}`}>{dict.services.internet.description}</p>
            <ul className={styles.featureList}>
              {dict.services.internet.features.map((feature, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.cardFooter}>
              <Link href={`/${lang}#installation`} className="btn-primary" style={{ width: '100%' }}>
                {dict.services.internet.cta}
              </Link>
            </div>
          </div>

          {/* IT Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className={`h3 ${styles.cardTitle}`}>{dict.services.it.title}</h3>
            <p className={`body ${styles.cardDesc}`}>{dict.services.it.description}</p>
            <ul className={styles.featureList}>
              {dict.services.it.features.map((feature, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.cardFooter}>
              <Link href={`/${lang}#it-support`} className="btn-secondary" style={{ width: '100%' }}>
                {dict.services.it.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
