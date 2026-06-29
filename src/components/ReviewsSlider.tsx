import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  name: string;
  org: string;
  text: string;
  stars: number;
  date: string;
}

const reviews: Review[] = [
  {
    name: 'Dr. Arthur Sterling',
    org: 'Oxbridge Bioscience Institute',
    text: 'We validated Alluvi Retatrutide vials via independent HPLC analysis and confirmed 99.8% purity. Excellent crystalline structure and near-instant dissolution properties make it highly recommended.',
    stars: 5,
    date: '14 May 2026'
  },
  {
    name: 'Prof. Helen Mercer',
    org: 'London Metabolic Lab',
    text: 'The thermal preservation during delivery was flawless. The vials arrived at a consistent 4 degrees Celsius inside their insulated courier envelopes. This level of logistic care is rare.',
    stars: 5,
    date: '28 May 2026'
  },
  {
    name: 'Julian Vance, PhD',
    org: 'UK Endocrinology Center',
    text: 'Extremely responsive customer support. Placing complex cryptocurrency bulk orders was handled quickly via their WhatsApp channel. High efficiency and guaranteed UK delivery.',
    stars: 5,
    date: '02 June 2026'
  },
  {
    name: 'Dr. Sarah Jenkins',
    org: 'Edinburgh Research Laboratories',
    text: 'Their Semaglutide 10mg vials demonstrated incredible consistency across our entire 12-week cell-line assay. Minimal batch variance simplifies our modeling immensely.',
    stars: 5,
    date: '10 June 2026'
  },
  {
    name: 'Prof. David Attenbury',
    org: 'Manchester Biotech Hub',
    text: 'Alluvi represents the pinnacle of research-grade chemical sourcing in the UK. Next-day tracking is accurate, and the packaging is exceptionally discrete and professional.',
    stars: 5,
    date: '15 June 2026'
  },
  {
    name: 'Dr. Elizabeth Ward',
    org: 'Clifton Clinical Science',
    text: 'We analyzed their BPC-157 and TB-500 lyophilized peptides under chromatography and verified high structural integrity, exceptional peptide bond strength, and no TFA residues.',
    stars: 5,
    date: '20 June 2026'
  },
  {
    name: 'Dr. Simon Fletcher',
    org: 'Cambridge Peptide Studies Group',
    text: 'Superb customer service and prompt responses on custom order request queries. Secure domestic UK shipping gives us total peace of mind for our continuous clinical projects.',
    stars: 5,
    date: '22 June 2026'
  },
  {
    name: 'Dr. Michael O’Connor',
    org: 'Belfast Biochemicals',
    text: 'Our laboratory strictly requires peptide reference standards with detailed molecular weight verification. Alluvi never fails to meet these rigorous standards across all batches.',
    stars: 5,
    date: '25 June 2026'
  },
  {
    name: 'Prof. Caroline Vance',
    org: 'Leeds Metabolic Pathways Lab',
    text: 'Very satisfied with the purity, stability, and fast logistics of Alluvi Tirzepatide vials. An indispensable resource for UK endocrinology research and metabolic trial protocols.',
    stars: 5,
    date: '27 June 2026'
  }
];

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const setIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Get active indices for 3 cards
  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + reviews.length) % reviews.length;
    const next = (currentIndex + 1) % reviews.length;
    return [prev, currentIndex, next];
  };

  const [prevIdx, currIdx, nextIdx] = getVisibleIndices();

  return (
    <div 
      className="space-y-10 relative select-none"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Testimonials Slider Track */}
      <div className="relative overflow-hidden px-1 py-4">
        {/* Mobile Layout (1 card) */}
        <div className="md:hidden block">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md relative min-h-[250px] flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-[#2e5b62]/5 pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(reviews[currentIndex].stars)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-[#d97706] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  "{reviews[currentIndex].text}"
                </p>
              </div>
              <div className="border-t border-gray-50 pt-4 mt-6 flex justify-between items-end">
                <div>
                  <strong className="block text-sm text-[#132c30]">{reviews[currentIndex].name}</strong>
                  <span className="text-[10px] text-gray-400 font-mono block uppercase tracking-wider">{reviews[currentIndex].org}</span>
                </div>
                <span className="text-[9px] text-gray-400 font-mono">{reviews[currentIndex].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Layout (3 cards slider/carousel) */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-stretch">
          {[prevIdx, currIdx, nextIdx].map((idx, index) => {
            const isCenter = index === 1;
            return (
              <motion.div
                key={idx}
                layout
                className={`bg-white p-8 rounded-3xl border transition-all duration-500 relative flex flex-col justify-between h-full ${
                  isCenter 
                    ? 'border-[#2e5b62]/30 shadow-xl shadow-slate-100 ring-2 ring-[#2e5b62]/5 scale-102 z-10' 
                    : 'border-gray-100 shadow-sm opacity-60 scale-95 hover:opacity-85'
                }`}
              >
                <Quote className="absolute top-6 right-8 w-12 h-12 text-[#2e5b62]/5 pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(reviews[idx].stars)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 text-[#d97706] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs italic leading-relaxed">
                    "{reviews[idx].text}"
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4 mt-6 flex justify-between items-end">
                  <div>
                    <strong className="block text-sm text-[#132c30]">{reviews[idx].name}</strong>
                    <span className="text-[10px] text-gray-400 font-mono block uppercase tracking-wider">{reviews[idx].org}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono">{reviews[idx].date}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="flex items-center justify-between max-w-xs mx-auto pt-2">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 text-gray-600 hover:text-[#132c30] transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Previous Review"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Navigation Dots */}
        <div className="flex space-x-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex 
                  ? 'w-6 bg-[#2e5b62]' 
                  : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 text-gray-600 hover:text-[#132c30] transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Next Review"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
