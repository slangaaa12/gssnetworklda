'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Plans.module.css';

function PlanFeatures({ title, items }) {
  return (
    <div className={styles.featureBlock}>
      <span className={styles.idealTitle}>{title}</span>
      <ul className={styles.idealList}>
        {items.map((item, i) => (
          <li key={i} className={styles.idealItem}>
            <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Plans({ dict, lang }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('residential');

  const getPlanLabel = (plan) => {
    if (plan.name) return `${plan.name} - ${plan.speed}`;
    return plan.speed;
  };

  const handleChoosePlan = (plan) => {
    const planName = getPlanLabel(plan);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPlan', planName);
    }
    const formElement = document.getElementById('installation');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${lang}#installation`);
    }
  };

  return (
    <section id="plans" className={`section ${styles.plansSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="h2">{dict.plans.title}</h2>
          <p className="subtitle">{dict.plans.subtitle}</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'residential' ? styles.active : ''}`}
            onClick={() => setActiveTab('residential')}
          >
            {dict.plans.residentialTitle}
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'business' ? styles.active : ''}`}
            onClick={() => setActiveTab('business')}
          >
            {dict.plans.businessTitle}
          </button>
        </div>

        <div className={styles.grid}>
          {activeTab === 'residential' && dict.plans.residential.map((plan, idx) => (
            <div key={idx} className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.speed}>{plan.speed}</div>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.perMonth}> {dict.plans.perMonth}</span>
                </div>
              </div>
              <PlanFeatures title={dict.plans.idealFor} items={plan.ideal} />
              {plan.perfectFor && (
                <p className={styles.perfectFor}>
                  <strong>{dict.plans.perfectFor}</strong> {plan.perfectFor}
                </p>
              )}
              <div className={styles.cardFooter}>
                <button
                  className={`btn-secondary ${styles.chooseBtn}`}
                  onClick={() => handleChoosePlan(plan)}
                >
                  {dict.plans.choosePlan}
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'business' && dict.plans.business.map((plan, idx) => (
            <div key={idx} className={`${styles.planCard} ${plan.isQuote ? styles.corporateCard : ''}`}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.speed}>{plan.speed}</div>
                <div className={styles.priceContainer}>
                  {plan.isQuote ? (
                    <span className={styles.priceQuote}>{plan.price}</span>
                  ) : (
                    <>
                      <span className={styles.price}>{plan.price}</span>
                      <span className={styles.perMonth}> {dict.plans.perMonth}</span>
                    </>
                  )}
                </div>
              </div>
              <PlanFeatures title={dict.plans.idealFor} items={plan.ideal} />
              {plan.includes && (
                <PlanFeatures title={dict.plans.includes} items={plan.includes} />
              )}
              <div className={styles.cardFooter}>
                <button
                  className={`${plan.isQuote ? 'btn-primary' : 'btn-secondary'} ${styles.chooseBtn}`}
                  onClick={() => handleChoosePlan(plan)}
                >
                  {plan.isQuote ? dict.plans.requestQuote : dict.plans.choosePlan}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
