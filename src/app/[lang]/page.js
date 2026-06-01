import { getDictionary } from '../get-dictionary';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import Plans from '@/components/Plans/Plans';
import SmartRecommendation from '@/components/SmartRecommendation/SmartRecommendation';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import { InstallationForm, ITSupportForm } from '@/components/Forms/Forms';
import WhyChoose from '@/components/WhyChoose/WhyChoose';
import About from '@/components/About/About';
import FinalCta from '@/components/FinalCta/FinalCta';
import Footer from '@/components/Footer/Footer';

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} lang={lang} />
        <Services dict={dict} lang={lang} />
        <Plans dict={dict} lang={lang} />
        <SmartRecommendation dict={dict} lang={lang} />
        <HowItWorks dict={dict} />
        
        {/* Forms Section */}
        <section className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
          <div className="container" style={{ display: 'grid', gap: '4rem' }}>
            <InstallationForm dict={dict} lang={lang} />
            <ITSupportForm dict={dict} lang={lang} />
          </div>
        </section>

        <WhyChoose dict={dict} />
        <About dict={dict} />
        <FinalCta dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
