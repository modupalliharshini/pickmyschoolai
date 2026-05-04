import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const CITIES = [
  { name: 'Hyderabad', count: 248, img: 'bg-orange-50' },
  { name: 'Bengaluru', count: 312, img: 'bg-emerald-50' },
  { name: 'Mumbai', count: 415, img: 'bg-blue-50' },
  { name: 'Delhi NCR', count: 520, img: 'bg-rose-50' },
  { name: 'Chennai', count: 185, img: 'bg-indigo-50' },
  { name: 'Pune', count: 142, img: 'bg-teal-50' },
];

const BrowseByCity = () => {
  return (
    <section className="pt-8 pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-[36px] lg:text-[48px] font-serif font-bold text-stone-900 leading-tight">
            Browse schools by <span className="italic text-[#b1040e]">city.</span>
          </h2>
          <p className="mt-3 text-stone-400 text-[16px] font-medium">Find the best schools in your neighborhood.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CITIES.map((city) => (
            <Link 
              key={city.name} 
              to="/find-schools"
              className="group bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm hover:bg-[#b1040e] hover:border-[#b1040e] transition-all duration-300 text-center"
            >
              <div className={`w-14 h-14 rounded-[20px] ${city.img} mx-auto mb-5 flex items-center justify-center text-[#b1040e] group-hover:bg-white group-hover:scale-110 transition-all duration-300`}>
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-[18px] text-stone-900 mb-1 group-hover:text-white transition-colors">{city.name}</h4>
              <p className="text-stone-400 text-[12px] font-bold group-hover:text-white/60 transition-colors uppercase tracking-wider">{city.count} Schools</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCity;
