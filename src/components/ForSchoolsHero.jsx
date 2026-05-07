import React from 'react';
import { Link } from 'react-router-dom';

const ForSchoolsHero = () => {
  return (
    <section className="bg-white">
      <div className="bg-[#b1040e] w-full py-10 lg:py-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-white/60 font-bold text-[10px] tracking-[0.2em] uppercase mb-5">FOR SCHOOLS</div>
              <h2 className="text-[30px] md:text-[38px] lg:text-[48px] font-serif font-bold text-white leading-[1.1]">
                Run your school. Fill seats. <br />
                <span className="italic text-[#ffb2ab]">All in one dashboard.</span>
              </h2>
              <p className="mt-4 text-white/70 text-[15px] max-w-[500px] leading-relaxed">
                Complete ERP — admissions, students, fees, attendance, communication — plus marketing analytics, lead pipeline and ad performance. Already trusted by 1,200+ schools.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-4">
                <Link to="/for-schools" className="bg-white text-[#b1040e] px-8 py-4 rounded-[18px] font-bold text-[16px] hover:scale-[1.02] transition-all text-center shadow-xl shadow-black/20">
                  List your school free
                </Link>
                <button className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-[18px] font-bold text-[16px] hover:bg-white/5 transition-all">
                  Tour the dashboard
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {[
                { label: "Profile views / mo", value: "3,824" },
                { label: "New leads / wk", value: "142" },
                { label: "Cost per lead", value: "₹284" },
                { label: "Listing rank", value: "#7" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[28px] text-center backdrop-blur-sm group hover:bg-white/10 transition-all">
                  <div className="text-white font-serif font-bold text-[28px] mb-1">{stat.value}</div>
                  <div className="text-white/40 text-[11px] font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForSchoolsHero;
