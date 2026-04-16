import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export function TestimonialCard({ name, role, company, content, rating, image }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative h-full p-8 bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden group"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-16 h-16 text-primary" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-gold text-gold' : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-foreground/90 leading-relaxed mb-6 relative z-10">
        "{content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-[var(--font-display)] font-bold text-white text-lg">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">
            {role} • {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
