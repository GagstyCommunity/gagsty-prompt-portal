
import React from 'react';
import { Star, Award, Users, Zap } from 'lucide-react';

const SocialProofBand = () => {
  const testimonials = [
    {
      quote: "This AI created a better game concept in 30 seconds than my team did in 3 months.",
      author: "Sarah Chen",
      role: "Indie Game Developer",
      avatar: "🎮"
    },
    {
      quote: "Finally, a platform where creativity meets technology. My prompt got 2,000 votes!",
      author: "Mike Rodriguez",
      role: "Creative Director",
      avatar: "🚀"
    },
    {
      quote: "From prompt to playable prototype in minutes. The future of game development is here.",
      author: "Alex Kim",
      role: "Gaming Entrepreneur",
      avatar: "⭐"
    }
  ];

  const pressLogos = [
    "TechCrunch", "Product Hunt", "VentureBeat", "GameIndustry.biz"
  ];

  return (
    <section className="py-12 border-t border-[#262A34]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Press Mentions */}
        <div className="text-center mb-8">
          <p className="text-gagsty-secondary text-sm mb-4">As Featured In</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60">
            {pressLogos.map((logo, index) => (
              <div key={index} className="text-gagsty-secondary font-medium">
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="gagsty-card p-6 gagsty-lift-hover">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div className="flex-1">
                  <p className="text-gagsty-secondary text-sm mb-3 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="text-gagsty-primary font-medium text-sm">{testimonial.author}</p>
                    <p className="text-gagsty-muted text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="text-[#FFB800] fill-current" size={16} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Top Prompt Showcase */}
        <div className="gagsty-card-featured p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Award className="text-[#FFB800] mr-2" size={24} />
            <h3 className="text-xl font-bold text-gagsty-primary">Today's Top Prompt</h3>
          </div>
          <div className="max-w-2xl mx-auto">
            <p className="text-gagsty-secondary mb-4">
              "A cyberpunk detective cat solving mysteries in a neon-lit city where every building tells a story through holographic memories."
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Users className="text-[#00C6FB] mr-1" size={16} />
                <span className="text-gagsty-secondary">1,247 votes</span>
              </div>
              <div className="flex items-center">
                <Zap className="text-[#A084FF] mr-1" size={16} />
                <span className="text-gagsty-secondary">98% viral score</span>
              </div>
              <div className="flex items-center">
                <Award className="text-[#16FF6F] mr-1" size={16} />
                <span className="text-gagsty-secondary">Community choice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBand;
