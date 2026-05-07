import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, Star, ChevronDown, X } from 'lucide-react';
import { schools } from '../mock';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SchoolCard from '../components/SchoolCard';

const CITIES = ['All', 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Pune', 'Kolkata'];
const BOARDS = ['All', 'CBSE', 'ICSE', 'IB', 'State', 'Pre-school'];

const FindSchoolsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFilters = location.state || {};

  const [city, setCity] = useState(initialFilters.city || 'All');
  const [board, setBoard] = useState(initialFilters.board || 'All');
  const [maxFee, setMaxFee] = useState(initialFilters.maxFee || 15);
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const extended = useMemo(() => {
    const base = [...schools];
    for (let i = 0; i < 18; i++) {
      const s = schools[i % schools.length];
      base.push({ ...s, id: 100 + i, name: s.name + (i > 0 ? ' Campus ' + (i + 1) : '') });
    }
    return base;
  }, []);

  const feeNum = (fee) => parseFloat(fee.replace(/[^0-9.]/g, ''));

  const filtered = extended.filter((s) => {
    if (city !== 'All' && !s.location.includes(city)) return false;
    if (board !== 'All' && !s.boards.some((b) => b.toLowerCase().includes(board.toLowerCase()))) return false;
    if (feeNum(s.fee) > maxFee) return false;
    if (query && !s.name.toLowerCase().includes(query.toLowerCase()) && !s.location.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const FilterContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between lg:justify-start gap-2.5 text-stone-900 font-bold text-[17px]">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </div>
        {mobile && (
          <button onClick={() => setIsFilterOpen(false)} className="p-2 text-stone-400">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="mt-6">
        <div className="text-[10px] tracking-[0.2em] font-bold text-stone-400 uppercase">CITY</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {CITIES.map((c) => (
            <button 
              key={c} 
              onClick={() => setCity(c)} 
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${city === c ? 'bg-[#b1040e] text-white border-[#b1040e]' : 'bg-white border-stone-100 text-stone-500 hover:border-stone-200'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[10px] tracking-[0.2em] font-bold text-stone-400 uppercase">BOARD</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {BOARDS.map((b) => (
            <button 
              key={b} 
              onClick={() => setBoard(b)} 
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${board === b ? 'bg-[#b1040e] text-white border-[#b1040e]' : 'bg-white border-stone-100 text-stone-500 hover:border-stone-200'}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <div className="text-[10px] tracking-[0.2em] font-bold text-stone-400 uppercase">MAX ANNUAL FEE</div>
          <span className="text-stone-900 font-bold text-[13px]">₹{maxFee.toFixed(1)}L</span>
        </div>
        <input 
          type="range" 
          min="0.5" 
          max="15" 
          step="0.5" 
          value={maxFee} 
          onChange={(e) => setMaxFee(parseFloat(e.target.value))} 
          className="w-full accent-[#b1040e] h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer" 
        />
        <div className="flex justify-between text-[11px] text-stone-400 font-bold mt-2">
          <span>₹0.5L</span>
          <span>₹15L</span>
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col gap-3">
        {mobile && (
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-[#b1040e] text-white py-4 rounded-2xl font-bold text-[15px] shadow-lg shadow-[#b1040e]/20 transition-all"
          >
            Apply Filters
          </button>
        )}
        <button 
          onClick={() => { setCity('All'); setBoard('All'); setMaxFee(15); setQuery(''); if(mobile) setIsFilterOpen(false); }} 
          className="w-full bg-stone-50 hover:bg-stone-100 text-stone-600 py-3 rounded-xl font-bold text-[14px] transition-colors"
        >
          Reset filters
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-white min-h-screen pt-24 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-start lg:items-end justify-between flex-col lg:flex-row gap-6 mb-8">
          <div className="w-full flex justify-between items-start">
            <div>
              <h1 className="font-serif text-[40px] lg:text-[56px] font-bold text-stone-900 leading-none">
                Schools in <span className="italic text-[#b1040e]">India</span>
              </h1>
              <p className="text-stone-400 font-medium mt-3 text-[16px]">{filtered.length} schools · sorted by AI match score</p>
            </div>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden p-3 bg-[#FBF7F0] text-stone-900 rounded-xl border border-[#F3E8E6] flex items-center gap-2 font-bold text-[14px]"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
          <div className="relative w-full lg:w-[400px]">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search by name or locality" 
              className="w-full bg-[#FBF7F0] border border-[#F3E8E6] rounded-full pl-11 pr-6 py-3.5 text-[15px] outline-none focus:border-[#b1040e] transition-colors" 
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Filter sidebar */}
          <aside className="hidden lg:block bg-white border border-[#F3E8E6] rounded-[28px] p-6 h-fit shadow-sm sticky top-20">
            <FilterContent />
          </aside>

          {/* Mobile Filter Drawer */}
          <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
            <div className={`absolute bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-[40px] shadow-2xl p-8 transition-transform duration-300 ease-out transform ${isFilterOpen ? 'translate-y-0' : 'translate-y-full'}`}>
              <FilterContent mobile />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 items-start">
            {filtered.map((s) => <SchoolCard key={s.id} s={s} />)}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-24 bg-[#FBF7F0] rounded-[32px] border border-dashed border-stone-200">
                <p className="text-stone-400 font-medium text-lg">No schools match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindSchoolsPage;


