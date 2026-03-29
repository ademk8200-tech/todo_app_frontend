import { useState, useCallback } from 'react';
import { Navigation } from '../sections/Navigation';
import { Hero } from '../sections/Hero';
import { WineShowcase } from '../sections/WineShowcase';
import { Museum } from '../sections/Museum';
import { News } from '../sections/News';
import { Team } from '../sections/Team';
import { ContactForm } from '../sections/ContactForm';
import { Footer } from '../sections/Footer';
import { Preloader } from '../components/Preloader';
import { ScrollToTop } from '../components/ScrollToTop';

export function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`min-h-screen bg-[#141414] ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <Navigation />

        <main>
          <Hero isReady={!isLoading} />
          <WineShowcase />
          <Museum />
          <News />
          <Team />
          <ContactForm />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
