'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  ctaText = 'Get Started',
}) => {
  return (
    <div
      className={`rounded-xl border p-6 md:p-8 h-full flex flex-col ${highlighted
        ? 'border-primary shadow-lg bg-card/60 relative z-10 scale-105'
        : 'border-border bg-card/30'
        }`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">{name}</h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-3xl md:text-4xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button
        className={`w-full mt-8 ${highlighted ? '' : 'variant-outline'}`}
        variant={highlighted ? 'default' : 'outline'}
      >
        {ctaText}
      </Button>
    </div>
  );
};

const PricingSection: React.FC = () => {
  return (
    <>
    <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-2">PRICING</h1>
    <h2 className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Choose Your Plan</h2>
    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
      Flexible options to suit your needs. Start with our free tier and upgrade as you grow.
    </p>
  </div>
    <div className="relative py-24 overflow-hidden">
      {/* Coming Soon Overlay */}
      
      <div className="absolute inset-0 backdrop-blur-md z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-full text-lg md:text-xl font-bold shadow-lg opacity-50">
          Coming Soon
        </div>
      </div>

      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 relative">

          <PricingTier
            name="Starter"
            price="Free"
            description="Perfect for individuals and small projects"
            features={[
              'Up to 3 projects',
              'Basic analytics',
              'Community support',
              '1GB storage'
            ]}
          />

          <PricingTier
            name="Professional"
            price="$29"
            description="For growing teams and businesses"
            features={[
              'Unlimited projects',
              'Advanced analytics',
              'Priority support',
              '20GB storage',
              'Team collaboration',
              'Custom integrations'
            ]}
            highlighted
          />

          <PricingTier
            name="Enterprise"
            price="Custom"
            description="For large organizations with complex needs"
            features={[
              'Everything in Professional',
              'Dedicated account manager',
              'Custom SLA',
              'Unlimited storage',
              'Advanced security',
              'Custom onboarding'
            ]}
            ctaText="Contact Sales"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default PricingSection; 