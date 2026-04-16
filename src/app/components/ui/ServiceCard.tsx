import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  gradient?: string;
}

export function ServiceCard({ icon: Icon, title, description, link, gradient = 'from-primary to-accent' }: ServiceCardProps) {
  const content = (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative h-full p-6 lg:p-8 bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden group cursor-pointer transition-all hover:border-primary/50"
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

      {/* Icon */}
      <div className={`relative w-14 h-14 lg:w-16 lg:h-16 mb-4 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
        <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="font-[var(--font-display)] font-semibold text-lg lg:text-xl mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Hover Arrow */}
      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-primary/0 group-hover:bg-primary flex items-center justify-center transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}
