import React from 'react';
import { Link } from 'react-router-dom';

const ForSchoolsHero = () => {
  return (
    <section className="pt-2 pb-8 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="bg-[#b1040e] rounded-[40px] p-8 lg:p-10 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="text-white/60 font-bold text-[10px] tracking-[0.2em] uppercase mb-3">FOR SCHOOLS</div>
              <h2 className="text-[40px] md:text-[54px] lg:text-[60px] font-serif font-bold text-white leading-[1.1]">
                Run your school. Fill seats. <br />
                <span className="italic text-[#ffb2ab]">All in one dashboard.</span>
              </h2>
              <p className="mt-4 text-white/50 text-[15px] max-w-[480px] leading-relaxed">
                Complete ERP — admissions, students, fees, attendance, communication — plus marketing analytics, lead pipeline and ad performance. Already trusted by 1,200+ schools.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-4">
                <Link to="/for-schools" className="bg-white text-[#b1040e] px-8 py-3.5 rounded-[14px] font-bold text-[15px] hover:bg-stone-100 transition-all text-center">
                  List your school free
                </Link>
                <button className="bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-[14px] font-bold text-[15px] hover:bg-white/5 transition-all">
                  Tour the dashboard
                </button>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-[32px]">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Profile views / mo", value: "3,824" },
                  { label: "New leads / wk", value: "142" },
                  { label: "Cost per lead", value: "₹284" },
                  { label: "Listing rank", value: "#7" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/[0.04] border border-white/[0.05] p-5 rounded-[20px] text-center">
                    <div className="text-white font-serif font-bold text-[28px] mb-1">{stat.value}</div>
                    <div className="text-white/30 text-[11px] font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForSchoolsHero;
