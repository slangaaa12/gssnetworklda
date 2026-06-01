import Link from 'next/link';
import Logo from '@/components/Logo/Logo';
import styles from './Footer.module.css';

export default function Footer({ dict, lang }) {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.brand}>
          <Logo lang={lang} variant="footer" className={styles.logo} />
          <p className={styles.tagline}>{dict.about.mission}</p>
        </div>
        
        <div className={styles.links}>
          <h4 className={styles.title}>{dict.footer.quickLinks}</h4>
          <nav className={styles.nav}>
            <Link href={`/${lang}#plans`}>{dict.nav.plans}</Link>
            <Link href={`/${lang}#services`}>{dict.nav.services}</Link>
          </nav>
        </div>

        <div className={styles.contact}>
          <h4 className={styles.title}>{dict.footer.contactInfo}</h4>
          <div className={styles.contactInfo}>
            <p><strong>{dict.footer.phone}:</strong> {dict.footer.phoneNumber}</p>
            <p><strong>{dict.footer.email}:</strong> {dict.footer.emailAddress}</p>
            <p><strong>{dict.footer.address}:</strong> {dict.footer.officeLocation}</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>{dict.footer.copyrightLine}</p>
        </div>
      </div>
    </footer>
  );
}
