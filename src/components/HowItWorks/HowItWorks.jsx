import styles from './HowItWorks.module.css';

export default function HowItWorks({ dict }) {
  return (
    <section className={`section ${styles.howSection}`}>
      <div className="container">
        <h2 className={`h2 ${styles.title}`}>{dict.howItWorks.title}</h2>
        <div className={styles.stepsGrid}>
          {dict.howItWorks.steps.map((step, idx) => (
            <div key={idx} className={styles.stepWrapper}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>0{idx + 1}</div>
                <h4 className={styles.stepText}>{step}</h4>
              </div>
              {idx < dict.howItWorks.steps.length - 1 && (
                <div className={styles.connector}>
                  <svg className={styles.arrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
