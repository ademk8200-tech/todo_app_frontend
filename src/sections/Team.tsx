import { useEffect, useRef } from 'react';
import { teamConfig } from '../config';

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up, .scale-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!teamConfig.members || teamConfig.members.length === 0) return null;

  return (
    <section
      id="team"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container-custom relative">
        <div className="fade-up text-center mb-16">
          <span className="font-script text-3xl text-gold-400 block mb-2">{teamConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {teamConfig.subtitle}
          </span>
          <h2 className="font-serif text-h2 text-white">{teamConfig.mainTitle}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {teamConfig.members.map((member, index) => (
            <div
              key={member.id}
              className="scale-in group"
              style={{ transitionDelay: `${0.1 + index * 0.2}s` }}
            >
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-6 border border-white/10 group-hover:border-gold-500/30 transition-colors duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-gold-400 transition-colors">{member.name}</h3>
                  <p className="text-gold-500/80 text-sm uppercase tracking-wider mb-3">{member.role}</p>
                </div>
              </div>
              
              <div className="px-2">
                <p className="text-white/70 leading-relaxed text-center group-hover:text-white/90 transition-colors">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
