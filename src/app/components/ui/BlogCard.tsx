import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export function BlogCard({ title, excerpt, image, category, date, readTime, slug }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link to={`/blog/${slug}`} className="block h-full bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-[var(--font-display)] font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-primary transform group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
