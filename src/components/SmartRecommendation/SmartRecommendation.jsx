'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './SmartRecommendation.module.css';

export default function SmartRecommendation({ dict, lang }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = dict.recommendation.questions;

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setIsComplete(true), 300);
    }
  };

  const getRecommendation = () => {
    // Scoring logic
    let score = 0;
    
    // People: [0] 1-2, [1] 3-4, [2] 5+
    score += answers.people * 2;
    
    // Streaming: [0] occ, [1] freq, [2] no
    if (answers.streaming === 0) score += 1;
    if (answers.streaming === 1) score += 3;
    
    // Gaming: [0] Yes, [1] No
    if (answers.gaming === 0) score += 3;
    
    // Remote: [0] Yes, [1] No
    if (answers.remoteWork === 0) score += 2;
    
    // Devices: [0] 1-3, [1] 4-7, [2] 8+
    score += answers.devices * 2;

    const plans = dict.plans.residential;
    
    if (score <= 3) return plans[0]; // 10 Mbps
    if (score <= 6) return plans[1]; // 15 Mbps
    if (score <= 9) return plans[2]; // 20 Mbps
    return plans[3]; // 30 Mbps
  };

  const restart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsComplete(false);
  };

  return (
    <section className={`section ${styles.recSection}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className="h2">{dict.recommendation.title}</h2>
          <p className="subtitle">{dict.recommendation.subtitle}</p>
        </div>

        <div className={styles.card}>
          {!isComplete ? (
            <div className={styles.questionContainer}>
              <div className={styles.progress}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${((currentStep) / questions.length) * 100}%` }}
                ></div>
              </div>
              <h3 className={`h3 ${styles.questionText}`}>
                {questions[currentStep].question}
              </h3>
              <div className={styles.optionsGrid}>
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`${styles.optionBtn} ${answers[questions[currentStep].id] === idx ? styles.selected : ''}`}
                    onClick={() => handleAnswer(questions[currentStep].id, idx)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.resultContainer}>
              <div className={styles.successIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="h3" style={{ marginBottom: '0.5rem' }}>
                {dict.recommendation.result}
              </h3>
              
              {(() => {
                const recPlan = getRecommendation();
                return (
                  <div className={styles.recommendedPlan}>
                    {recPlan.name && <div className={styles.recName}>{recPlan.name}</div>}
                    <div className={styles.recSpeed}>{recPlan.speed}</div>
                    <div className={styles.recPrice}>
                      {recPlan.price} {dict.plans.perMonth}
                    </div>
                    <Link 
                      href={`/${lang}#installation`} 
                      className="btn-primary"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          const label = recPlan.name ? `${recPlan.name} - ${recPlan.speed}` : recPlan.speed;
                          localStorage.setItem('selectedPlan', label);
                        }
                      }}
                      style={{ marginTop: '1.5rem', display: 'inline-block' }}
                    >
                      {dict.plans.choosePlan}
                    </Link>
                  </div>
                );
              })()}

              <button className={styles.restartBtn} onClick={restart}>
                {dict.recommendation.restart}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
