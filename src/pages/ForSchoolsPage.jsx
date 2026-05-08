import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const ForSchoolsPage = () => {
  const { openModal } = useModal();
  return (
    <>
      <section className="bg-stone-900 text-white relative overflow-hidden pt-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#F48B9B]" />
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase">FOR SCHOOLS</span>
          </div>
          <h1 className="mt-5 font-serif text-[40px] lg:text-[56px] font-bold leading-[1.1] max-w-[900px]">
            One platform to <span className="italic text-[#F48B9B]">run, fill &</span> grow your school.
          </h1>
          <p className="mt-5 text-[16px] text-stone-400 max-w-[640px] leading-relaxed">
            ERP + marketplace listing + marketing analytics + lead pipeline – built specifically for Indian K-12 schools.
          </p>
          <Link to="/list-school" className="mt-7 inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-4 rounded-xl font-bold text-[16px] hover:bg-[#b1040e] hover:text-white transition-all shadow-lg shadow-black/20">
            List your school free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="bg-[#FBF7F0] py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Complete School ERP',
              items: ['Admissions pipeline', 'Student records', 'Online fee collection', 'Attendance tracking', 'Parent communication'],
            }, 
            {
              title: 'Built-in marketing',
              items: ['Verified PickMySchool listing', 'AI-driven lead matching', 'Meta & Google ads dashboard', 'Profile rank insights', 'Lead-to-admission funnel'],
            }
          ].map((b) => (
            <div key={b.title} className="bg-white border border-stone-200 rounded-2xl p-10">
              <Sparkles className="w-6 h-6 text-[#b1040e]" />
              <h3 className="mt-6 font-serif text-[28px] font-semibold text-stone-900">{b.title}</h3>
              <ul className="mt-6 space-y-3">
                {b.items.map((i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700"><Check className="w-4 h-4 text-[#b1040e]" /> {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ForSchoolsPage;
