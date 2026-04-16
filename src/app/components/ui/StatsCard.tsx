import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  suffix?: string;
  animated?: boolean;
}

export function StatsCard({ icon: Icon, value, label, suffix = '', animated = true }: StatsCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    if (animated && isInView && targetValue) {
      let start = 0;
      const duration = 2000;
      const increment = targetValue / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    } else if (!animated) {
      setCount(targetValue);
    }
  }, [isInView, targetValue, animated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative p-8 bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Icon */}
      <div className="relative w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Value */}
      <div className="relative">
        <h3 className="font-[var(--font-display)] font-bold text-4xl lg:text-5xl mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {animated ? count.toLocaleString() : value}{suffix}
        </h3>
        <p className="text-muted-foreground font-medium">{label}</p>
      </div>
    </motion.div>
  );
}
