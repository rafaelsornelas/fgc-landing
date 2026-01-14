import React from 'react';
import HeroSection from '@/components/fgc/HeroSection';
import PainPointsSection from '@/components/fgc/PainPointsSection';
import ServicesSection from '@/components/fgc/ServicesSection';
import AboutSection from '@/components/fgc/AboutSection';
import MethodSection from '@/components/fgc/MethodSection';
import CTASection from '@/components/fgc/CTASection';
import Footer from '@/components/fgc/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PainPointsSection />
      <ServicesSection />
      <AboutSection />
      <MethodSection />
      <CTASection />
      <Footer />
    </div>
  );
}