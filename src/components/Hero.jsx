import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Heart, Star, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SchoolIllustration from './SchoolIllustration';

const Hero = () => {
  const navigate = useNavigate();

  const topSchools = [
    {
      id: 1,
      name: "Delhi Public School Nacharam",
      location: "Nacharam · Hyderabad",
      tags: ['CBSE', 'Co-ed', 'Bus available'],
      fee: "₹1.4L",
      match: "96%"
    },
    {
      id: 2,
      name: "Oakridge International School",
      location: "Gachibowli · Hyderabad",
      tags: ['IB', 'Co-ed', 'Premium'],
      fee: "₹3.5L",
      match: "94%"
    },
    {
      id: 3,
      name: "Chirec International School",
      location: "Kondapur · Hyderabad",
      tags: ['CBSE/IB', 'Co-ed', 'Sports'],
      fee: "₹2.8L",
      match: "92%"
    },
    {
      id: 4,
      name: "Global Indian International School",
      location: "Uppal · Hyderabad",
      tags: ['CBSE', 'Co-ed', 'Modern'],
      fee: "₹1.6L",
      match: "91%"
    },
    {
      id: 5,
      name: "The Hyderabad Public School",
      location: "Begumpet · Hyderabad",
      tags: ['ICSE', 'Heritage', 'Elite'],
      fee: "₹1.2L",
      match: "90%"
    }
  ];

  const [schoolIndex, setSchoolIndex] = useState(0);

  const nextSchool = () => {
    setSchoolIndex((prev) => (prev + 1) % topSchools.length);
  };

  const handleSearch = () => {
    navigate('/find-schools');
  };

  return (
    <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-[#FDF2F0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          
          {/* Left Column */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#F3E8E6] mb-6">
              <Sparkles className="w-3 h-3 text-[#b1040e]" />
              <span className="text-[10px] tracking-[0.1em] font-bold text-stone-600 uppercase">AI-MATCHED · 12,000+ VERIFIED SCHOOLS</span>
            </div>

            <h1 className="font-serif text-[44px] md:text-[60px] lg:text-[72px] font-bold leading-[1.1] text-stone-900">
              The right school for your child <span className="italic text-[#b1040e]">in 60 seconds.</span>
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
                className="bg-[#b1040e] hover:bg-[#651414] text-white px-8 py-4 rounded-[20px] font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] text-[15px]"
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

          {/* Right Column - Top Match Card Slider */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 lg:pl-6 group/hero max-w-[420px] mx-auto lg:mx-0">
            {/* Hanging Card Background Layers */}
            <div className="absolute inset-0 bg-[#e5d5d2] rounded-[32px] transform rotate-[-2deg] translate-y-2 opacity-40 animate-hanging-bg-1" />
            <div className="absolute inset-0 bg-white/40 rounded-[32px] transform rotate-[1deg] translate-x-1 translate-y-1 animate-hanging-bg-2" />
            
            <div className="relative bg-[#F3E8E6] p-5 rounded-[32px] border border-white/60 shadow-xl shadow-stone-200/40 overflow-hidden animate-hanging-card">
              <div className="flex items-center gap-2 text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-4">
                <span className="w-1.2 h-1.2 rounded-full bg-[#b1040e] animate-pulse" /> YOUR TOP MATCH · TODAY
              </div>

              <div className="relative w-full overflow-hidden">
                {/* Carousel Container */}
                <div 
                  className="flex transition-transform duration-500 ease-out w-full"
                  style={{ transform: `translateX(-${schoolIndex * 100}%)` }}
                >
                  {topSchools.map((school, idx) => (
                    <div 
                      key={school.id}
                      className="w-full flex-shrink-0"
                    >
                      <div className="bg-white rounded-[24px] overflow-hidden border border-white shadow-[0_15px_35px_-10px_rgba(124,26,26,0.08)] group relative">
                        <div className="relative aspect-[16/9] scale-[0.96] mt-1 mx-1 rounded-[20px] overflow-hidden">
                          <SchoolIllustration />
                          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
                            <Star className="w-2.5 h-2.5 fill-[#b1040e] text-[#b1040e]" />
                            <span className="text-[8px] font-bold text-[#b1040e] tracking-wider uppercase">TOP MATCH · {school.match}</span>
                          </div>
                          <button className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                            <Heart className="w-3 h-3 text-stone-400 hover:text-[#b1040e] transition-colors" />
                          </button>
                          <div className="absolute bottom-2.5 right-2.5 bg-stone-900/90 backdrop-blur-md text-white rounded-lg px-2 py-0.5 flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-[10px] font-bold">4.8</span>
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-serif text-[18px] font-bold text-stone-900 leading-tight">{school.name}</h3>
                          <p className="text-stone-400 text-[12px] mt-0.5 font-medium">{school.location}</p>
                          
                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {school.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 rounded-lg bg-stone-50 text-stone-600 text-[10px] font-semibold border border-stone-100/60">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-6 pt-4 border-t border-stone-50 flex items-center justify-between">
                            <div>
                              <span className="text-stone-400 text-[11px] font-medium block mb-0.5">Annual fee</span>
                              <span className="text-stone-900 font-bold text-[16px]">{school.fee}</span>
                            </div>
                            
                            <div className="flex flex-col items-center gap-1.5">
                              <button 
                                onClick={(e) => { e.stopPropagation(); nextSchool(); }}
                                className="w-7 h-7 rounded-full bg-[#b1040e] text-white flex items-center justify-center shadow-md shadow-[#b1040e]/20 hover:bg-[#8e030b] hover:scale-110 active:scale-95 transition-all group/btn z-10"
                              >
                                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                              </button>
                              
                              <button 
                                onClick={() => navigate(`/school/${school.id}`)}
                                className="text-[#b1040e] font-bold text-[11px] flex items-center gap-1 hover:gap-2 transition-all"
                              >
                                Apply →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-[11px]">
                <span className="text-stone-500 font-medium">+ {247 + topSchools.length} more in Hyderabad</span>
                <button 
                  onClick={handleSearch}
                  className="text-[#b1040e] font-bold flex items-center gap-1 hover:underline"
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
