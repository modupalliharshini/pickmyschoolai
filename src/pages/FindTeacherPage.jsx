import React, { useState } from 'react';
import { MapPin, Star, Clock, Filter, ArrowRight, BookOpen, ExternalLink, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { teachers as ALL_TEACHERS, localities as LOCALITIES } from '../mock';
import { useModal } from '../context/ModalContext';

const SUBJECTS = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Computer Science', 'Social Studies'];
const CITIES = ['All', 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Pune'];

const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

const FindTeacherPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [subject, setSubject] = useState('All');
  const [city, setCity] = useState('All');
  const [locality, setLocality] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filtered = ALL_TEACHERS.filter((t) => {
    if (subject !== 'All' && t.subject !== subject) return false;
    if (city !== 'All' && t.city !== city) return false;
    if (city !== 'All' && locality !== 'All' && t.locality !== locality) return false;
    if (t.fee > maxPrice) return false;
    return true;
  });

  const FilterContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between lg:justify-start gap-2.5 text-stone-900 font-bold text-[17px]">
        <div className="flex items-center gap-2.5">
          <Filter className="w-4 h-4" /> Filters
        </div>
        {mobile && (
          <button onClick={() => setIsFilterOpen(false)} className="p-2 text-stone-400">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <FilterGroup label="SUBJECT" options={SUBJECTS} value={subject} onChange={setSubject} />
      <FilterGroup label="CITY" options={CITIES} value={city} onChange={(val) => { setCity(val); setLocality('All'); }} />
      
      {city !== 'All' && (
        <FilterGroup label="LOCALITY" options={LOCALITIES[city]} value={locality} onChange={setLocality} />
      )}
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3">
          <div className="text-[10px] tracking-[0.2em] font-bold text-stone-400 uppercase">MAX PRICE/HR</div>
          <span className="text-stone-900 font-bold text-[13px]">₹{maxPrice}</span>
        </div>
        <input 
          type="range" 
          min="200" 
          max="1500" 
          step="50" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(+e.target.value)} 
          className="w-full accent-[#7C1A1A] h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer" 
        />
        <div className="flex justify-between text-[11px] text-stone-400 font-bold mt-2">
          <span>₹200</span>
          <span>₹1500</span>
        </div>
      </div>

      <div className="mt-auto pt-8 flex flex-col gap-3">
        {mobile && (
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-[#7C1A1A] text-white py-4 rounded-2xl font-bold text-[15px] shadow-lg shadow-[#7C1A1A]/20 transition-all"
          >
            Apply Filters
          </button>
        )}
        <button 
          onClick={() => { setSubject('All'); setCity('All'); setLocality('All'); setMaxPrice(1500); if(mobile) setIsFilterOpen(false); }} 
          className="w-full bg-stone-50 hover:bg-stone-100 text-stone-600 py-3 rounded-xl font-bold text-[14px] transition-colors"
        >
          Reset filters
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-white min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="font-serif text-[40px] lg:text-[56px] font-bold text-stone-900 leading-tight">
              Find your <span className="italic text-[#7C1A1A]">teacher.</span>
            </h1>
            <p className="mt-3 text-stone-400 font-medium text-[16px]">Vetted tutors for every subject and grade. Online or at your home.</p>
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden p-3 bg-[#FBF7F0] text-stone-900 rounded-xl border border-[#F3E8E6] flex items-center gap-2 font-bold text-[14px] mt-2"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Filter sidebar */}
          <aside className="hidden lg:block bg-white border border-[#F3E8E6] rounded-[28px] p-6 h-fit shadow-sm sticky top-20">
            <FilterContent />
          </aside>

          {/* Mobile Filter Drawer */}
          <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
            <div className={`absolute bottom-0 left-0 right-0 h-[85vh] overflow-y-auto bg-white rounded-t-[40px] shadow-2xl p-8 transition-transform duration-300 ease-out transform ${isFilterOpen ? 'translate-y-0' : 'translate-y-full'}`}>
              <FilterContent mobile />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
            {filtered.map((t) => (
              <div key={t.id} className="bg-white border border-[#F3E8E6] rounded-[28px] p-6 hover:shadow-[0_15px_35px_-12px_rgba(124,26,26,0.12)] transition-all duration-300 group flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#7C1A1A] text-white font-serif font-bold flex items-center justify-center text-lg">{initials(t.name)}</div>
                    <div>
                      <h3 className="font-serif text-[18px] font-bold text-stone-900 group-hover:text-[#7C1A1A] transition-colors">{t.name}</h3>
                      <div className="flex items-center gap-1.5 text-[12px] text-stone-900 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#7C1A1A] text-[#7C1A1A]" /> {t.rating} · {t.exp} yrs exp
                      </div>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/teacher/${t.id}`)} className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:text-[#7C1A1A] hover:bg-[#FDF2F0] transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-stone-600 font-medium text-[13px]">
                    <BookOpen className="w-4 h-4 text-stone-400" /> {t.subject} · {t.grade}
                  </div>
                  <div className="flex items-center gap-2 text-stone-600 font-medium text-[13px]">
                    <MapPin className="w-4 h-4 text-stone-400" /> {t.locality}, {t.city}
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => navigate(`/teacher/${t.id}`)}
                    className="mt-6 w-full text-center text-stone-400 font-bold text-[13px] hover:text-[#7C1A1A] transition-colors"
                  >
                    View profile
                  </button>
                  <div className="mt-4 pt-5 border-t border-stone-50 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Starting at</div>
                      <div className="text-stone-900 font-bold text-[16px]">₹{t.fee}<span className="text-[12px] font-medium text-stone-400">/hr</span></div>
                    </div>
                    <button 
                      onClick={() => openModal('bookTrial', { teacherName: t.name })}
                      className="bg-[#7C1A1A] hover:bg-[#651414] text-white px-5 py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center gap-1.5"
                    >
                      Book trial <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-24 bg-[#FBF7F0] rounded-[32px] border border-dashed border-stone-200">
                <p className="text-stone-400 font-medium text-lg">No teachers match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FilterGroup = ({ label, options, value, onChange }) => (
  <div className="mt-8">
    <div className="text-[10px] tracking-[0.2em] font-bold text-stone-400 uppercase">{label}</div>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button 
          key={o} 
          onClick={() => onChange(o)} 
          className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${value === o ? 'bg-[#7C1A1A] text-white border-[#7C1A1A]' : 'bg-white border-stone-100 text-stone-500 hover:border-stone-200'}`}
        >
          {o}
        </button>
      ))}
    </div>
  </div>
);

export default FindTeacherPage;
