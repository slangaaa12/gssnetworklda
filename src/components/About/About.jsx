import styles from './About.module.css';

export default function About({ dict }) {
  return (
    <section className={`section ${styles.aboutSection}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2 className={`h2 ${styles.title}`}>{dict.about.title}</h2>
          <p className={`body ${styles.text}`}>{dict.about.text}</p>
          <p className={`body ${styles.mission}`}><strong>{dict.about.mission}</strong></p>
        </div>
      </div>
    </section>
  );
}
