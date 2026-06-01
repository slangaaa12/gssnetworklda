'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './AdminPanel.module.css';

function InstallationCard({ item, dict, formatDate }) {
  const typeLabel =
    item.type === 'business'
      ? dict.forms?.installation?.typeOptions?.business || item.type
      : dict.forms?.installation?.typeOptions?.residential || item.type;

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <span className={styles.badge}>{dict.admin.tabInstallation}</span>
          <h3>{item.name}</h3>
        </div>
        <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
      </div>
      <dl className={styles.details}>
        <div>
          <dt>{dict.admin.fields.phone}</dt>
          <dd><a href={`tel:${item.phone}`}>{item.phone}</a></dd>
        </div>
        {item.email && (
          <div>
            <dt>{dict.admin.fields.email}</dt>
            <dd><a href={`mailto:${item.email}`}>{item.email}</a></dd>
          </div>
        )}
        <div>
          <dt>{dict.admin.fields.type}</dt>
          <dd>{typeLabel}</dd>
        </div>
        <div>
          <dt>{dict.admin.fields.plan}</dt>
          <dd>{item.plan}</dd>
        </div>
        <div className={styles.fullRow}>
          <dt>{dict.admin.fields.address}</dt>
          <dd>{item.address}</dd>
        </div>
        <div>
          <dt>{dict.admin.fields.province}</dt>
          <dd>{item.province}</dd>
        </div>
        <div>
          <dt>{dict.admin.fields.district}</dt>
          <dd>{item.district}</dd>
        </div>
        {item.location && (
          <div className={styles.fullRow}>
            <dt>{dict.admin.fields.location}</dt>
            <dd>{item.location}</dd>
          </div>
        )}
        {item.preferredDate && (
          <div>
            <dt>{dict.admin.fields.preferredDate}</dt>
            <dd>{item.preferredDate}</dd>
          </div>
        )}
        {item.notes && (
          <div className={styles.fullRow}>
            <dt>{dict.admin.fields.notes}</dt>
            <dd>{item.notes}</dd>
          </div>
        )}
        <div>
          <dt>{dict.admin.fields.lang}</dt>
          <dd>{item.lang?.toUpperCase()}</dd>
        </div>
      </dl>
    </article>
  );
}

function ItSupportCard({ item, dict, formatDate }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <span className={`${styles.badge} ${styles.badgeIt}`}>{dict.admin.tabItSupport}</span>
          <h3>{item.name}</h3>
        </div>
        <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
      </div>
      <dl className={styles.details}>
        <div>
          <dt>{dict.admin.fields.phone}</dt>
          <dd><a href={`tel:${item.phone}`}>{item.phone}</a></dd>
        </div>
        <div>
          <dt>{dict.admin.fields.email}</dt>
          <dd><a href={`mailto:${item.email}`}>{item.email}</a></dd>
        </div>
        {item.company && (
          <div>
            <dt>{dict.admin.fields.company}</dt>
            <dd>{item.company}</dd>
          </div>
        )}
        <div>
          <dt>{dict.admin.fields.service}</dt>
          <dd>{item.service}</dd>
        </div>
        <div>
          <dt>{dict.admin.fields.contactMethod}</dt>
          <dd>{item.contactMethod}</dd>
        </div>
        <div className={styles.fullRow}>
          <dt>{dict.admin.fields.description}</dt>
          <dd>{item.description}</dd>
        </div>
        <div>
          <dt>{dict.admin.fields.lang}</dt>
          <dd>{item.lang?.toUpperCase()}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function AdminPanel({ dict, lang }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [installation, setInstallation] = useState([]);
  const [itSupport, setItSupport] = useState([]);
  const [activeTab, setActiveTab] = useState('installation');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const loadSubmissions = useCallback(async () => {
    const res = await fetch('/api/admin/submissions');
    if (res.status === 401) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }
    if (!res.ok) {
      setError(dict.admin.loadError);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setInstallation(data.installation);
    setItSupport(data.itSupport);
    setAuthenticated(true);
    setLoading(false);
  }, [dict.admin.loadError]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || dict.admin.loginError);
      setLoginLoading(false);
      return;
    }

    setPassword('');
    setLoginLoading(false);
    setLoading(true);
    await loadSubmissions();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
    setInstallation([]);
    setItSupport([]);
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString(lang === 'pt' ? 'pt-MZ' : 'en-GB');
    } catch {
      return iso;
    }
  };

  const currentList = activeTab === 'installation' ? installation : itSupport;
  const emptyMessage =
    activeTab === 'installation' ? dict.admin.emptyInstallation : dict.admin.emptyItSupport;

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <p className={styles.loading}>{dict.admin.loading}</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className={styles.page}>
        <div className={`container ${styles.loginBox}`}>
          <h1 className="h2">{dict.admin.title}</h1>
          <p className={styles.subtitle}>{dict.admin.subtitle}</p>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <label className={styles.label}>{dict.admin.password}</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className="btn-primary" disabled={loginLoading}>
              {loginLoading ? dict.admin.loggingIn : dict.admin.login}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className="h2">{dict.admin.dashboardTitle}</h1>
            <p className={styles.subtitle}>
              {dict.admin.tabInstallation}: <strong>{installation.length}</strong>
              {' · '}
              {dict.admin.tabItSupport}: <strong>{itSupport.length}</strong>
            </p>
          </div>
          <button type="button" className="btn-secondary" onClick={handleLogout}>
            {dict.admin.logout}
          </button>
        </div>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'installation' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('installation')}
          >
            {dict.admin.tabInstallation} ({installation.length})
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'itSupport' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('itSupport')}
          >
            {dict.admin.tabItSupport} ({itSupport.length})
          </button>
        </div>

        {currentList.length === 0 ? (
          <p className={styles.empty}>{emptyMessage}</p>
        ) : (
          <div className={styles.list}>
            {activeTab === 'installation'
              ? installation.map((item) => (
                  <InstallationCard
                    key={item.id}
                    item={item}
                    dict={dict}
                    formatDate={formatDate}
                  />
                ))
              : itSupport.map((item) => (
                  <ItSupportCard
                    key={item.id}
                    item={item}
                    dict={dict}
                    formatDate={formatDate}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
