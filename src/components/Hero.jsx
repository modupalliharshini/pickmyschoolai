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

  const [city, setCity] = useState('Hyderabad');
  const [grade, setGrade] = useState('Class 1');
  const [board, setBoard] = useState('CBSE / ICSE');
  const [budget, setBudget] = useState('₹1L - ₹2L');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const cities = ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Pune'];
  const grades = ['Pre-school', 'Class 1', 'Class 5', 'Class 10'];
  const boards = ['CBSE', 'ICSE', 'IB', 'State'];
  const budgets = [
    { label: '< ₹1L', value: 1.0 },
    { label: '₹1L - ₹2L', value: 2.0 },
    { label: '₹2L - ₹5L', value: 5.0 },
    { label: '₹5L+', value: 15.0 }
  ];

  const handleSearch = () => {
    const selectedBudget = budgets.find(b => b.label === budget);
    navigate('/find-schools', { 
      state: { 
        city, 
        board: board === 'CBSE / ICSE' ? 'CBSE' : board, 
        maxFee: selectedBudget ? selectedBudget.value : 15,
        query: keyword
      } 
    });
  };

  const Dropdown = ({ label, value, options, onSelect, isOpen, onClose }) => (
    <div className="relative h-full flex flex-col justify-center">
      <div className="flex items-center gap-1 text-[8px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
        {label === 'CITY' && <MapPin className="w-2 h-2" />} {label}
      </div>
      <div 
        onClick={(e) => { e.stopPropagation(); isOpen ? onClose() : setActiveDropdown(label); }}
        className="flex items-center justify-between cursor-pointer group"
      >
        <span className="text-[13px] font-bold text-stone-800 group-hover:text-[#b1040e] transition-colors">{value}</span>
        <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-stone-100 rounded-2xl shadow-xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <div 
              key={typeof opt === 'string' ? opt : opt.label}
              onClick={() => {
                onSelect(typeof opt === 'string' ? opt : opt.label);
                onClose();
              }}
              className="px-4 py-2 text-[13px] font-medium text-stone-600 hover:bg-[#FDF2F0] hover:text-[#b1040e] cursor-pointer transition-colors"
            >
              {typeof opt === 'string' ? opt : opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const [schoolIndex, setSchoolIndex] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setSchoolIndex((prev) => (prev + 1) % topSchools.length);
    } else if (isRightSwipe) {
      setSchoolIndex((prev) => (prev - 1 + topSchools.length) % topSchools.length);
    }
  };

  const nextSchool = () => {
    setSchoolIndex((prev) => (prev + 1) % topSchools.length);
  };

  return (
    <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-[#FDF2F0]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center w-full overflow-hidden">
          
          {/* Left Column */}
          <div className="fade-in duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#F3E8E6] mb-6">
              <Sparkles className="w-3 h-3 text-[#b1040e]" />
              <span className="text-[10px] tracking-[0.1em] font-bold text-stone-600 uppercase">AI-MATCHED · 12,000+ VERIFIED SCHOOLS</span>
            </div>

            <h1 className="font-serif text-[32px] md:text-[60px] lg:text-[72px] font-bold leading-[1.2] text-stone-900">
              The right school for your child <span className="italic text-[#b1040e]">in 60 seconds.</span>
            </h1>
            
            <p className="mt-4 text-[15px] md:text-[18px] text-stone-500 max-w-[540px] leading-relaxed w-full">
              Tell us your child's age, your locality and budget. Our AI matches them with schools that actually fit.
            </p>

            {/* Filter Bar */}
            <div 
              className="mt-8 bg-white rounded-[24px] border border-[#F3E8E6] shadow-[0_15px_40px_-12px_rgba(124,26,26,0.06)] flex items-stretch p-1 w-full overflow-hidden"
              onClick={() => setActiveDropdown(null)}
            >
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4">
                <div className="px-4 py-3 border-r border-stone-100">
                  <Dropdown 
                    label="CITY" 
                    value={city} 
                    options={cities} 
                    onSelect={(val) => setCity(val)}
                    isOpen={activeDropdown === 'CITY'}
                    onClose={() => setActiveDropdown(null)}
                  />
                </div>
                <div className="px-4 py-3 border-r border-stone-100">
                  <Dropdown 
                    label="GRADE" 
                    value={grade} 
                    options={grades} 
                    onSelect={(val) => setGrade(val)}
                    isOpen={activeDropdown === 'GRADE'}
                    onClose={() => setActiveDropdown(null)}
                  />
                </div>
                <div className="px-4 py-3 border-r border-stone-100">
                  <Dropdown 
                    label="BOARD" 
                    value={board} 
                    options={boards} 
                    onSelect={(val) => setBoard(val)}
                    isOpen={activeDropdown === 'BOARD'}
                    onClose={() => setActiveDropdown(null)}
                  />
                </div>
                <div className="px-4 py-3">
                  <Dropdown 
                    label="BUDGET" 
                    value={budget} 
                    options={budgets} 
                    onSelect={(val) => setBudget(val)}
                    isOpen={activeDropdown === 'BUDGET'}
                    onClose={() => setActiveDropdown(null)}
                  />
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="bg-[#b1040e] hover:bg-[#651414] text-white w-14 md:w-16 rounded-[18px] flex items-center justify-center transition-all active:scale-[0.98]"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Keyword Search Bar */}
            <div className="mt-4 relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-stone-400 group-focus-within:text-[#b1040e] transition-colors" />
              </div>
              <input 
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder='Search "schools in Miyapur" or "schools near me"'
                className="w-full bg-white border border-[#F3E8E6] rounded-[24px] py-5 pl-14 pr-32 text-[16px] text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#b1040e] focus:ring-4 focus:ring-[#b1040e]/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] transition-all"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-2 bottom-2 bg-stone-900 hover:bg-stone-800 text-white px-8 rounded-[18px] font-bold text-[14px] transition-all"
              >
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 md:flex md:flex-wrap gap-x-4 md:gap-x-8 gap-y-4">
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[14px] md:text-[16px]">12,400</span>
                <span className="text-stone-400 text-[10px] md:text-[12px]">verified schools</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[14px] md:text-[16px]">2.8L</span>
                <span className="text-stone-400 text-[10px] md:text-[12px]">parent reviews</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[14px] md:text-[16px]">180+</span>
                <span className="text-stone-400 text-[10px] md:text-[12px]">cities covered</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold text-[14px] md:text-[16px]">4.7★</span>
                <span className="text-stone-400 text-[10px] md:text-[12px]">avg user rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Top Match Card Slider */}
          <div className="relative fade-in duration-1000 delay-200 lg:pl-6 group/hero max-w-[480px] mx-auto lg:mx-0 w-full">
            {/* Background Stacked Layers */}
            <div 
              className="absolute inset-0 bg-[#F3E8E6] rounded-[56px] opacity-40 animate-float-bg" 
              style={{ '--rot': '-3deg' }} 
            />
            <div 
              className="absolute inset-0 bg-white/40 rounded-[56px] opacity-60 animate-float-bg" 
              style={{ '--rot': '1.5deg' }} 
            />
            
            <div className="relative bg-white rounded-[56px] shadow-[0_60px_120px_-20px_rgba(124,26,26,0.15),0_30px_60px_-10px_rgba(124,26,26,0.1)] border border-white overflow-hidden animate-float-card aspect-square">
              <div className="h-full flex flex-col p-7">
                <div className="flex items-center gap-2.5 text-[11px] font-bold text-stone-400 uppercase tracking-[0.15em] mb-6 px-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b1040e]" /> YOUR TOP MATCH · TODAY
                </div>

                <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                  {/* Carousel Container */}
                  <div 
                    className="flex h-full transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) w-full"
                    style={{ transform: `translateX(-${schoolIndex * 100}%)` }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                  {topSchools.map((school, idx) => (
                    <div key={school.id} className="w-full h-full flex-shrink-0 px-1">
                      <div className="bg-white rounded-[32px] overflow-hidden group relative h-full flex flex-col border border-stone-50">
                        <div className="relative flex-[1.4] min-h-0 rounded-[24px] overflow-hidden m-1">
                          <SchoolIllustration />
                          <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-[#b1040e] text-[#b1040e]" />
                            <span className="text-[11px] font-bold text-[#b1040e] tracking-wider uppercase">TOP MATCH · {school.match}</span>
                          </div>
                          <button className="absolute top-5 right-5 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                            <Heart className="w-5 h-5 text-stone-400 hover:text-[#b1040e] transition-colors" />
                          </button>
                          <div className="absolute bottom-5 right-5 bg-stone-900/90 backdrop-blur-md text-white rounded-xl px-3 py-1.5 flex items-center gap-2">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-[13px] font-bold">4.8</span>
                          </div>
                        </div>

                        <div className="px-6 py-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-[20px] font-bold text-stone-900 leading-tight">{school.name}</h3>
                            <p className="text-stone-400 text-[13px] mt-0.5 font-medium">{school.location}</p>
                            
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {school.tags.map(tag => (
                                <span key={tag} className="px-2.5 py-1 rounded-xl bg-stone-50 text-stone-600 text-[10px] font-bold border border-stone-100/60">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-stone-50 flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-stone-400 text-[12px] font-medium">Annual fee</span>
                              <span className="text-stone-900 font-bold text-[18px]">{school.fee}</span>
                            </div>
                            
                            <div className="flex flex-col items-center gap-2">
                              <button 
                                onClick={(e) => { e.stopPropagation(); nextSchool(); }}
                                className="w-8 h-8 rounded-full bg-[#b1040e] text-white flex items-center justify-center shadow-lg shadow-[#b1040e]/20 hover:bg-[#8e030b] hover:scale-110 active:scale-95 transition-all group/btn z-10"
                              >
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                              </button>
                              
                              <button 
                                onClick={() => navigate(`/school/${school.id}`)}
                                className="text-[#b1040e] font-bold text-[13px] flex items-center gap-1.5 hover:gap-2 transition-all"
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

                <div className="mt-4 flex items-center justify-between text-[12px] px-1">
                  <span className="text-stone-400 font-medium">+ {247 + topSchools.length} more in Hyderabad</span>
                  <button 
                    onClick={handleSearch}
                    className="text-[#b1040e] font-bold flex items-center gap-1.5 hover:underline"
                  >
                    View all →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
