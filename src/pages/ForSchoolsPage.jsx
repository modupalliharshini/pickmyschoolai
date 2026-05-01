import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const ForSchoolsPage = () => {
  const { openModal } = useModal();
  return (
    <>
      <section className="bg-[#7C1A1A] text-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20">
            <span className="text-[11px] tracking-[0.2em] font-semibold">FOR SCHOOLS</span>
          </div>
          <h1 className="mt-8 font-serif text-[56px] lg:text-[96px] font-semibold leading-[0.95] max-w-[1100px]">
            One platform to <span className="italic">run, fill &</span> grow your school.
          </h1>
          <p className="mt-8 text-[18px] text-stone-200 max-w-[680px]">
            ERP + marketplace listing + marketing analytics + lead pipeline – built specifically for Indian K-12 schools.
          </p>
          <button onClick={() => openModal('list')} className="mt-10 inline-flex items-center gap-2 bg-white text-[#7C1A1A] px-8 py-4 rounded-xl font-medium hover:bg-stone-100 transition-colors">
            List your school free <ArrowRight className="w-4 h-4" />
          </button>
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
              <Sparkles className="w-6 h-6 text-[#7C1A1A]" />
              <h3 className="mt-6 font-serif text-[28px] font-semibold text-stone-900">{b.title}</h3>
              <ul className="mt-6 space-y-3">
                {b.items.map((i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700"><Check className="w-4 h-4 text-[#7C1A1A]" /> {i}</li>
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
