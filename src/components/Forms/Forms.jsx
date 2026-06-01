'use client';
import styles from './Forms.module.css';
import { useState, useEffect } from 'react';

function FormSuccess({ dictSection, onNewRequest }) {
  return (
    <div className={styles.successBox}>
      <div className={styles.successIcon}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className={`h3 ${styles.successTitle}`}>{dictSection.successTitle}</h3>
      <p className={styles.successMessage}>{dictSection.successMessage}</p>
      <button type="button" className={`btn-secondary ${styles.submitBtn}`} onClick={onNewRequest}>
        {dictSection.newRequest}
      </button>
    </div>
  );
}

export function InstallationForm({ dict, lang }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'residential',
    plan: '',
    address: '',
    province: '',
    district: '',
    location: '',
    preferredDate: '',
    notes: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const plan = localStorage.getItem('selectedPlan');
      if (plan) {
        setForm((prev) => ({ ...prev, plan }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/installation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });

      if (!res.ok) throw new Error('submit_failed');

      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedPlan');
      }

      setStatus('success');
      setForm({
        name: '',
        phone: '',
        email: '',
        type: 'residential',
        plan: '',
        address: '',
        province: '',
        district: '',
        location: '',
        preferredDate: '',
        notes: '',
      });
    } catch {
      setStatus('error');
      setError(dict.forms.installation.errorMessage);
    }
  };

  if (status === 'success') {
    return (
      <div id="installation" className={styles.formContainer}>
        <FormSuccess
          dictSection={dict.forms.installation}
          onNewRequest={() => setStatus('idle')}
        />
      </div>
    );
  }

  return (
    <div id="installation" className={styles.formContainer}>
      <h3 className={`h3 ${styles.formTitle}`}>{dict.forms.installation.title}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.installation.name}</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              value={form.name}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.installation.phone}</label>
            <input
              type="tel"
              name="phone"
              className={styles.input}
              value={form.phone}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{dict.forms.installation.email}</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              value={form.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.installation.type}</label>
            <select
              name="type"
              className={styles.input}
              value={form.type}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            >
              <option value="residential">{dict.forms.installation.typeOptions.residential}</option>
              <option value="business">{dict.forms.installation.typeOptions.business}</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.installation.plan}</label>
            <input
              type="text"
              name="plan"
              className={styles.input}
              value={form.plan}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{dict.forms.installation.address}</label>
            <input
              type="text"
              name="address"
              className={styles.input}
              value={form.address}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.installation.province}</label>
            <input
              type="text"
              name="province"
              className={styles.input}
              value={form.province}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.installation.district}</label>
            <input
              type="text"
              name="district"
              className={styles.input}
              value={form.district}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{dict.forms.installation.location}</label>
            <input
              type="text"
              name="location"
              className={styles.input}
              value={form.location}
              onChange={handleChange}
              placeholder={dict.forms.installation.mapsPlaceholder}
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.installation.date}</label>
            <input
              type="date"
              name="preferredDate"
              className={styles.input}
              value={form.preferredDate}
              onChange={handleChange}
              disabled={status === 'submitting'}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{dict.forms.installation.notes}</label>
            <textarea
              name="notes"
              className={styles.textarea}
              value={form.notes}
              onChange={handleChange}
              disabled={status === 'submitting'}
            />
          </div>
        </div>
        {error && <p className={styles.formError}>{error}</p>}
        <button
          type="submit"
          className={`btn-primary ${styles.submitBtn}`}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? dict.forms.installation.submitting : dict.forms.installation.submit}
        </button>
      </form>
    </div>
  );
}

export function ITSupportForm({ dict, lang }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    description: '',
    contactMethod: 'phone',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/it-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });

      if (!res.ok) {
        throw new Error('submit_failed');
      }

      setStatus('success');
      setForm({
        name: '',
        company: '',
        phone: '',
        email: '',
        service: '',
        description: '',
        contactMethod: 'phone',
      });
    } catch {
      setStatus('error');
      setError(dict.forms.it.errorMessage);
    }
  };

  if (status === 'success') {
    return (
      <div id="it-support" className={styles.formContainer}>
        <FormSuccess dictSection={dict.forms.it} onNewRequest={() => setStatus('idle')} />
      </div>
    );
  }

  return (
    <div id="it-support" className={styles.formContainer}>
      <h3 className={`h3 ${styles.formTitle}`}>{dict.forms.it.title}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.it.name}</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              value={form.name}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.it.company}</label>
            <input
              type="text"
              name="company"
              className={styles.input}
              value={form.company}
              onChange={handleChange}
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.it.phone}</label>
            <input
              type="tel"
              name="phone"
              className={styles.input}
              value={form.phone}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{dict.forms.it.email}</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              value={form.email}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{dict.forms.it.service}</label>
            <select
              name="service"
              className={styles.input}
              value={form.service}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            >
              <option value="">--</option>
              {dict.forms.it.serviceOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{dict.forms.it.description}</label>
            <textarea
              name="description"
              className={styles.textarea}
              value={form.description}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>{dict.forms.it.contactMethod}</label>
            <select
              name="contactMethod"
              className={styles.input}
              value={form.contactMethod}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            >
              <option value="phone">{dict.forms.it.contactOptions.phone}</option>
              <option value="email">{dict.forms.it.contactOptions.email}</option>
              <option value="whatsapp">{dict.forms.it.contactOptions.whatsapp}</option>
            </select>
          </div>
        </div>
        {error && <p className={styles.formError}>{error}</p>}
        <button
          type="submit"
          className={`btn-secondary ${styles.submitBtn}`}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? dict.forms.it.submitting : dict.forms.it.submit}
        </button>
      </form>
    </div>
  );
}
