import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  onCTAClick?: () => void;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  highlighted = false,
  ctaText,
  onCTAClick,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative h-full p-8 rounded-3xl overflow-hidden ${
        highlighted
          ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary'
          : 'bg-card/50 backdrop-blur-xl border border-border'
      }`}
    >
      {highlighted && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold rounded-full">
          Popular
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="font-[var(--font-display)] font-bold text-2xl mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className={`font-[var(--font-display)] font-bold text-5xl ${highlighted ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent' : ''}`}>
            {price}
          </span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
              highlighted ? 'bg-gradient-to-br from-primary to-accent' : 'bg-muted'
            }`}>
              <Check className={`w-3 h-3 ${highlighted ? 'text-white' : 'text-foreground'}`} />
            </div>
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onCTAClick}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          highlighted
            ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transform hover:scale-105'
            : 'bg-muted text-foreground hover:bg-muted/80'
        }`}
      >
        {ctaText}
      </button>
    </motion.div>
  );
}
