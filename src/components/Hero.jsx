import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Heart, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SchoolIllustration from './SchoolIllustration';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/find-schools');
  };

  return (
    <section className="relative pt-4 pb-12 lg:pt-5 lg:pb-16 overflow-hidden bg-[#FDF2F0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          
          {/* Left Column */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#F3E8E6] mb-6">
              <Sparkles className="w-3 h-3 text-[#7C1A1A]" />
              <span className="text-[10px] tracking-[0.1em] font-bold text-stone-600 uppercase">AI-MATCHED · 12,000+ VERIFIED SCHOOLS</span>
            </div>

            <h1 className="font-serif text-[44px] md:text-[60px] lg:text-[72px] font-bold leading-[1.1] text-stone-900">
              The right school for your child <span className="italic text-[#7C1A1A]">in 60 seconds.</span>
            </h1>
            
            <p className="mt-6 text-[16px] md:text-[18px] text-stone-500 max-w-[540px] leading-relaxed">
              Tell us your child's age, your locality and budget. Our AI matches them with schools that actually fit — board, fees, distance, ethos, real parent reviews.
            </p>

            {/* Search Bar */}
            <div className="mt-10 bg-white rounded-[28px] border border-[#F3E8E6] shadow-[0_15px_40px_-12px_rgba(124,26,26,0.06)] flex flex-col md:flex-row items-stretch p-1.5">
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-100">
                <div className="px-5 py-3 flex flex-col justify-center">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                    <MapPin className="w-2.5 h-2.5" /> CITY
                  </div>
                  <div className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[14px] font-bold text-stone-800">Hyderabad</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors" />
                  </div>
                </div>
                <div className="px-5 py-3 flex flex-col justify-center">
                  <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">GRADE</div>
                  <div className="text-[14px] font-bold text-stone-800 cursor-pointer">Class 1</div>
                </div>
                <div className="px-5 py-3 flex flex-col justify-center">
                  <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">BOARD</div>
                  <div className="text-[14px] font-bold text-stone-800 cursor-pointer">CBSE / ICSE</div>
                </div>
                <div className="px-5 py-3 flex flex-col justify-center">
                  <div className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">BUDGET / YR</div>
                  <div className="text-[14px] font-bold text-stone-800 cursor-pointer">₹1L - ₹2L</div>
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="bg-[#7C1A1A] hover:bg-[#651414] text-white px-8 py-4 rounded-[20px] font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] text-[15px]"
              >
                Search <Search className="w-4.5 h-4.5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[16px]">12,400</span>
                <span className="text-stone-400 text-[12px]">verified schools</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[16px]">2.8L</span>
                <span className="text-stone-400 text-[12px]">parent reviews</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[16px]">180+</span>
                <span className="text-stone-400 text-[12px]">cities covered</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[16px]">4.7★</span>
                <span className="text-stone-400 text-[12px]">avg user rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Top Match Card */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="bg-[#F3E8E6] p-8 rounded-[40px]">
              <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C1A1A]" /> YOUR TOP MATCH · TODAY
              </div>

              <div className="bg-white rounded-[28px] overflow-hidden border border-white shadow-[0_20px_45px_-12px_rgba(124,26,26,0.12)] group">
                <div className="relative aspect-[16/10] scale-[0.98] mt-1 mx-1 rounded-[24px] overflow-hidden">
                  <SchoolIllustration />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-0.5 flex items-center gap-1 shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-[#7C1A1A] text-[#7C1A1A]" />
                    <span className="text-[9px] font-bold text-[#7C1A1A] tracking-wider uppercase">TOP MATCH · 96%</span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-md text-white rounded-lg px-2 py-0.5 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[11px] font-bold">4.8</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-[20px] font-bold text-stone-900 leading-tight">Delhi Public School Nacharam</h3>
                  <p className="text-stone-400 text-[13px] mt-1 font-medium">Nacharam · Hyderabad</p>
                  
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-stone-50 text-stone-600 text-[11px] font-medium border border-stone-100">CBSE</span>
                    <span className="px-2.5 py-1 rounded-lg bg-stone-50 text-stone-600 text-[11px] font-medium border border-stone-100">Co-ed</span>
                    <span className="px-2.5 py-1 rounded-lg bg-stone-50 text-stone-600 text-[11px] font-medium border border-stone-100">Bus available</span>
                  </div>

                  <div className="mt-6 pt-5 border-t border-stone-50 flex items-center justify-between">
                    <div>
                      <span className="text-stone-400 text-[12px] font-medium">Annual fee</span>
                      <span className="text-stone-900 font-bold text-[15px] ml-2">₹1.4L</span>
                    </div>
                    <button 
                      onClick={() => navigate('/school/1')}
                      className="text-[#7C1A1A] font-bold text-[13px] flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Apply →
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-[12px]">
                <span className="text-stone-500 font-medium">+ 247 more in Hyderabad</span>
                <button 
                  onClick={handleSearch}
                  className="text-[#7C1A1A] font-bold flex items-center gap-1 hover:underline"
                >
                  View all →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

