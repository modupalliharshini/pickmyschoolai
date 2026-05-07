import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const CITIES = [
  { name: 'Hyderabad', count: '1,240' },
  { name: 'Bengaluru', count: '1,890' },
  { name: 'Mumbai', count: '2,140' },
  { name: 'Delhi NCR', count: '2,560' },
  { name: 'Chennai', count: '980' },
  { name: 'Pune', count: '820' },
  { name: 'Kolkata', count: '740' },
];

const BrowseByCity = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <h2 className="text-[32px] md:text-[42px] font-serif font-bold text-stone-900 leading-tight">
            Browse by city
          </h2>
          <p className="mt-2 text-stone-400 text-[16px]">12,400 schools across 180+ Indian cities</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CITIES.map((city) => (
            <Link 
              key={city.name} 
              to="/find-schools"
              className="group bg-white p-5 rounded-[20px] border border-stone-100 shadow-sm hover:bg-[#b1040e] hover:border-[#b1040e] transition-all duration-300"
            >
              <h4 className="font-serif font-bold text-[19px] text-stone-900 group-hover:text-white transition-colors">{city.name}</h4>
              <p className="text-stone-400 text-[13px] mt-0.5 group-hover:text-white/80 transition-colors">{city.count} schools</p>
            </Link>
          ))}
          
          <Link 
            to="/find-schools"
            className="group bg-white p-5 rounded-[20px] border border-stone-100 shadow-sm hover:bg-[#b1040e] hover:border-[#b1040e] transition-all duration-300"
          >
            <h4 className="font-serif font-bold text-[19px] text-stone-900 group-hover:text-white transition-colors">+ 173 more</h4>
            <p className="text-stone-400 text-[13px] mt-0.5 group-hover:text-white/80 transition-colors">Browse all →</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCity;
