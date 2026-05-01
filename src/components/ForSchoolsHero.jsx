import React from 'react';
import { Link } from 'react-router-dom';

const ForSchoolsHero = () => {
  return (
    <section className="pt-4 pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="bg-[#b1040e] rounded-[48px] p-12 lg:p-20 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="text-white/60 font-bold text-[10px] tracking-[0.2em] uppercase mb-6">FOR SCHOOLS</div>
              <h2 className="text-[44px] md:text-[56px] lg:text-[64px] font-serif font-bold text-white leading-[1.1]">
                Run your school. Fill seats. <br />
                <span className="italic text-[#F3E8E6]/80">All in one dashboard.</span>
              </h2>
              <p className="mt-8 text-white/70 text-[17px] max-w-[500px] leading-relaxed">
                Complete ERP — admissions, students, fees, attendance, communication — plus marketing analytics, lead pipeline and ad performance. Already trusted by 1,200+ schools.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link to="/for-schools" className="bg-white text-[#b1040e] px-8 py-4 rounded-[18px] font-bold text-[16px] hover:scale-[1.02] transition-all text-center">
                  List your school free
                </Link>
                <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-[18px] font-bold text-[16px] hover:bg-white/5 transition-all">
                  Tour the dashboard
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Profile views / mo", value: "3,824" },
                { label: "New leads / wk", value: "142" },
                { label: "Cost per lead", value: "₹284" },
                { label: "Listing rank", value: "#7" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[32px] text-center">
                  <div className="text-white font-serif font-bold text-[32px] mb-2">{stat.value}</div>
                  <div className="text-white/40 text-[13px] font-bold uppercase tracking-wider">{stat.label}</div>
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
