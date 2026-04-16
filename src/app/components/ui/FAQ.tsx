import { ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left font-[var(--font-display)] font-semibold text-lg hover:text-primary transition-colors group">
              <span>{item.question}</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-300" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
