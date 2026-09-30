import React from 'react';
import { HeroSection } from './HeroSection';
import { ClassSelectionSection } from './ClassSelectionSection';
import { SubjectSelectionSection } from './SubjectSelectionSection';
import { WhyMedhaMathsSection } from './WhyMedhaMathsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <HeroSection />
      <ClassSelectionSection />
      <SubjectSelectionSection />
      <WhyMedhaMathsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};
