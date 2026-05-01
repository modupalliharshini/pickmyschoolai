import React, { useState } from 'react';
import { Star, Heart, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SchoolIllustration from './SchoolIllustration';

const SchoolCard = ({ s }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate('/school/' + s.id)}
      className="bg-white rounded-[32px] border border-[#F3E8E6] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(124,26,26,0.12)] transition-all duration-300 group cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-[16/10] shrink-0">
        <SchoolIllustration />
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md rounded-full px-2 py-0.5 sm:px-3 sm:py-1 flex items-center gap-1 sm:gap-1.5 shadow-sm z-10">
          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#7C1A1A] text-[#7C1A1A]" />
          <span className="text-[8px] sm:text-[10px] font-bold text-[#7C1A1A] tracking-wider uppercase">TOP MATCH · {s.score}%</span>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }} 
          className="absolute top-2 right-2 sm:top-4 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm z-10"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${liked ? 'fill-[#7C1A1A] text-[#7C1A1A]' : 'text-stone-400'}`} />
        </button>
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-4 sm:right-4 bg-stone-900/90 backdrop-blur-md text-white rounded-lg sm:rounded-xl px-1.5 py-0.5 sm:px-2.5 sm:py-1 flex items-center gap-1 z-10 scale-90 sm:scale-100">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] sm:text-[12px] font-bold">{s.rating}</span>
        </div>
      </div>
      <div className="p-3 sm:p-5 flex-1 flex flex-col">
        <h3 className="font-serif text-[15px] sm:text-[18px] font-bold text-stone-900 leading-tight group-hover:text-[#7C1A1A] transition-colors line-clamp-2 min-h-[2.5em]">{s.name}</h3>
        <p className="text-stone-400 text-[11px] sm:text-[12px] mt-1 font-medium truncate">{s.location}</p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {s.tags?.slice(0, 2).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-lg bg-stone-50 text-stone-500 text-[9px] sm:text-[10px] font-bold border border-stone-100 uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-stone-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-stone-400 text-[10px] font-medium uppercase tracking-wider block">Fee/Yr</span>
            <div className="text-stone-900 font-bold text-[13px] sm:text-[14px]">{s.fee}</div>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/school/' + s.id); }}
            className="text-[#7C1A1A] font-bold text-[12px] sm:text-[13px] flex items-center gap-1 hover:gap-2 transition-all"
          >
            Apply →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
