import React from 'react';
import { CarouselSlide as SlideType, ThemeStyle } from '../types';

interface CarouselSlideProps {
  slide: SlideType;
  theme: ThemeStyle;
  totalSlides: number;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ slide, theme, totalSlides }) => {
  // Styles based on theme
  let containerClass = '';
  let textClass = '';
  let accentClass = '';
  let overlayClass = '';

  switch (theme) {
    case ThemeStyle.DARK:
      containerClass = 'bg-slate-900 border-slate-800';
      textClass = 'text-white';
      accentClass = 'text-amber-400';
      overlayClass = 'bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/60';
      break;
    case ThemeStyle.MEDIUM:
      containerClass = 'bg-blue-900 border-blue-800';
      textClass = 'text-white';
      accentClass = 'text-sky-300';
      overlayClass = 'bg-blue-900/80 mix-blend-multiply';
      break;
    case ThemeStyle.LIGHT:
    default:
      containerClass = 'bg-white border-slate-200';
      textClass = 'text-slate-900';
      accentClass = 'text-blue-600';
      overlayClass = 'bg-white/90';
      break;
  }

  // Deterministic fake image based on keyword to avoid broken links
  // In a real app, we might use Unsplash API properly. 
  // Here we use picsum with grayscale for a "professional" feel if Dark theme, or standard for others.
  const imageUrl = `https://picsum.photos/seed/${slide.imageKeyword + slide.id}/1080/1350`;

  return (
    <div 
      className={`relative w-[320px] h-[400px] sm:w-[360px] sm:h-[450px] flex-shrink-0 flex flex-col justify-end overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 hover:scale-[1.02] ${containerClass}`}
    >
      {/* Background Image */}
      <img 
        src={imageUrl} 
        alt={slide.imageKeyword} 
        className={`absolute inset-0 w-full h-full object-cover ${theme === ThemeStyle.LIGHT ? 'opacity-20' : 'opacity-40'} grayscale transition-opacity duration-700`}
      />

      {/* Overlay/Gradient */}
      <div className={`absolute inset-0 ${overlayClass}`}></div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        
        {/* Top Indicators */}
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex gap-1">
             {Array.from({ length: totalSlides }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all ${idx + 1 === slide.id ? `w-6 ${theme === ThemeStyle.LIGHT ? 'bg-blue-600' : 'bg-white'}` : `w-2 ${theme === ThemeStyle.LIGHT ? 'bg-slate-300' : 'bg-slate-600'}`}`}
                />
             ))}
          </div>
          <span className={`text-xs font-bold tracking-widest uppercase opacity-60 ${textClass}`}>
            Career Agent
          </span>
        </div>

        {/* Text Content */}
        <div className="mt-auto mb-8">
          <p className={`text-xs sm:text-sm font-bold tracking-wider uppercase mb-2 ${accentClass}`}>
            {slide.subtitle}
          </p>
          <h2 className={`text-2xl sm:text-3xl font-extrabold leading-tight mb-4 ${textClass}`}>
            {slide.headline}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed opacity-90 ${textClass}`}>
            {slide.body}
          </p>
        </div>

        {/* Footer / CTA */}
        {slide.cta ? (
           <div className={`mt-2 py-3 px-4 rounded-lg font-bold text-center text-sm shadow-lg ${theme === ThemeStyle.LIGHT ? 'bg-blue-600 text-white' : 'bg-amber-400 text-slate-900'}`}>
             {slide.cta}
           </div>
        ) : (
          <div className={`flex items-center gap-2 text-xs font-medium opacity-50 ${textClass}`}>
            <span>Swipe for more</span>
            <span>&rarr;</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselSlide;