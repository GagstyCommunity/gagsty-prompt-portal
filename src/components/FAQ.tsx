
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I join the waitlist?',
      answer: 'Simply enter your email in any of the signup forms on this page. You\'ll receive confirmation and updates about early access to Gagsty.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes! Joining Gagsty is completely free. You can submit prompts, earn Gagsty Chips, and even get revenue share from successful games without any upfront costs.'
    },
    {
      question: 'What are Gagsty Chips?',
      answer: 'Gagsty Chips are our native currency that you earn through various activities like submitting prompts, playing games, and community participation. They can be used for in-game purchases and eventually converted to real value.'
    },
    {
      question: 'Can I submit multiple prompts?',
      answer: 'Absolutely! We encourage creativity. You can submit as many game prompts as you want. The more you participate, the more Gagsty Chips you can earn.'
    },
    {
      question: 'Do I need to know coding?',
      answer: 'Not at all! That\'s the beauty of Gagsty. Our AI and community developers handle all the technical work. You just need imagination and the ability to describe your game ideas clearly.'
    },
    {
      question: 'When will Gagsty launch?',
      answer: 'We\'re targeting early 2024 for our beta launch. Waitlist members will get first access to test the platform and start earning before the public release.'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about Gagsty
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl px-6 hover:border-gray-600 transition-colors"
            >
              <AccordionTrigger className="text-left text-white hover:text-blue-400 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
