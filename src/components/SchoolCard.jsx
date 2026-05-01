import React, { useState } from 'react';
import { Star, Heart, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SchoolIllustration from './SchoolIllustration';

const SchoolCard = ({ s }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-[32px] border border-[#F3E8E6] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(124,26,26,0.12)] transition-all duration-300 group">
      <div className="relative aspect-[16/10]">
        <SchoolIllustration />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
          <Star className="w-3 h-3 fill-[#7C1A1A] text-[#7C1A1A]" />
          <span className="text-[10px] font-bold text-[#7C1A1A] tracking-wider uppercase">TOP MATCH · {s.score}%</span>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }} 
          className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-[#7C1A1A] text-[#7C1A1A]' : 'text-stone-400'}`} />
        </button>
        <div className="absolute bottom-4 right-4 bg-stone-900/90 backdrop-blur-md text-white rounded-xl px-2.5 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-[12px] font-bold">{s.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-[18px] font-bold text-stone-900 leading-tight group-hover:text-[#7C1A1A] transition-colors">{s.name}</h3>
        <p className="text-stone-400 text-[12px] mt-1 font-medium">{s.location}</p>
        
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {s.tags?.slice(0, 3).map((t) => (
            <span key={t} className="px-2.5 py-0.5 rounded-lg bg-stone-50 text-stone-500 text-[10px] font-bold border border-stone-100 uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-stone-50 flex items-center justify-between">
          <div>
            <span className="text-stone-400 text-[11px] font-medium uppercase tracking-wider">Annual fee</span>
            <div className="text-stone-900 font-bold text-[14px]">{s.fee}</div>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/school/' + s.id); }}
            className="text-[#7C1A1A] font-bold text-[13px] flex items-center gap-1 hover:gap-2 transition-all"
          >
            Apply →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
