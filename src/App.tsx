import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessSteps from './components/ProcessSteps';
import Services from './components/Services';
import PricingCalculator from './components/PricingCalculator';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPresets, setBookingPresets] = useState<{
    serviceId?: string;
    days?: number;
    extras?: string[];
  }>({});

  const handleBookNow = (serviceId?: string, days?: number, extras?: string[]) => {
    setBookingPresets({ serviceId, days, extras });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookNow={() => handleBookNow()} />

      <Hero onBookNow={() => handleBookNow()} />

      <div id="process">
        <ProcessSteps />
      </div>

      <Services />

      <PricingCalculator onBookNow={handleBookNow} />

      <Gallery />

      <Testimonials />

      <About />

      <FAQ />

      <Contact />

      <Footer />

      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={bookingPresets.serviceId}
        preselectedDays={bookingPresets.days}
        preselectedExtras={bookingPresets.extras}
      />
    </div>
  );
}

export default App;
