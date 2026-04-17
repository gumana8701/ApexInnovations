import { Hero } from '@/components/marketing/Hero';
import { ServicesGrid } from '@/components/marketing/ServicesGrid';
import { DemoWidget } from '@/components/marketing/DemoWidget';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { SocialProof } from '@/components/marketing/SocialProof';
import { LeadCapture } from '@/components/marketing/LeadCapture';
import { CTASection } from '@/components/marketing/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <DemoWidget />
      <ServicesGrid />
      <HowItWorks />
      <SocialProof />
      <LeadCapture />
      <CTASection />
    </>
  );
}
