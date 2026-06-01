import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.css';

const LOGO_WIDTH = 924;
const LOGO_HEIGHT = 323;

export default function Logo({ lang, variant = 'header', className = '' }) {
  const logo = (
    <Image
      src="/logo-horizontal.png"
      alt="GSS Network Limitada"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={`${styles.logoImage} ${styles[variant]}`}
      priority={variant === 'header'}
      sizes="(max-width: 768px) 140px, 180px"
    />
  );

  if (lang) {
    return (
      <Link href={`/${lang}`} className={`${styles.logoLink} ${className}`} aria-label="GSS Network Limitada">
        {logo}
      </Link>
    );
  }

  return <div className={`${styles.logoLink} ${className}`}>{logo}</div>;
}
