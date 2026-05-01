import React from 'react';
import { Link } from 'react-router-dom';
import { schools } from '../mock';
import SchoolCard from './SchoolCard';

const BOARDS = ['All schools', 'CBSE', 'ICSE', 'IB', 'State board', 'Pre-school', 'Boarding', 'International'];

const TopPicks = () => {
  const [activeBoard, setActiveBoard] = React.useState('All schools');

  return (
    <section id="top-picks" className="pt-8 pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-[36px] lg:text-[48px] font-serif font-bold text-stone-900 leading-tight">
              Top picks near you
            </h2>
            <p className="mt-2 text-stone-400 text-[15px] font-medium">Sorted by AI match score · Hyderabad</p>
          </div>
          <Link to="/find-schools" className="hidden md:flex items-center gap-2 text-[#b1040e] font-bold text-[15px] hover:gap-3 transition-all duration-200">
            View all 248 →
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {BOARDS.map((b) => (
            <button 
              key={b} 
              onClick={() => setActiveBoard(b)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-200 border ${activeBoard === b ? 'bg-[#b1040e] text-white border-[#b1040e]' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'}`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-6 md:gap-y-10">
          {[...schools, ...schools].slice(0, 8).map((s, idx) => (
            <SchoolCard key={`${s.id}-${idx}`} s={s} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/find-schools" className="inline-flex items-center gap-2 text-[#b1040e] font-bold text-[16px]">
            View all 248 →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopPicks;

