'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Logo from '@/components/Logo/Logo';
import styles from './Header.module.css';

export default function Header({ dict, lang }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (newLang) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    let newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    if (!newPath.startsWith(`/${newLang}`)) {
        newPath = `/${newLang}${pathname}`;
    }
    router.push(newPath);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Logo lang={lang} variant="header" />
        <nav className={styles.nav}>
          <Link href={`/${lang}#services`} className={styles.navLink}>{dict.nav.services}</Link>
          <Link href={`/${lang}#plans`} className={styles.navLink}>{dict.nav.plans}</Link>
          <Link href={`/${lang}#contact`} className={styles.navLink}>{dict.nav.contact}</Link>
        </nav>
        <div className={styles.actions}>
          <div className={styles.langSelector}>
            <button 
              className={`${styles.langBtn} ${lang === 'pt' ? styles.active : ''}`}
              onClick={() => switchLanguage('pt')}
            >
              PT
            </button>
            <span className={styles.langDivider}>|</span>
            <button 
              className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}
              onClick={() => switchLanguage('en')}
            >
              EN
            </button>
          </div>
          <Link href={`/${lang}#contact`} className={`btn-primary ${styles.ctaBtn}`}>
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
