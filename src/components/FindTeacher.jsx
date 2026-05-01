import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Star, ArrowRight, MessageSquare, Shield } from 'lucide-react';

const FindTeacher = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C1A1A]/5 border border-[#7C1A1A]/10 text-[#7C1A1A] mb-8">
              <UserCheck className="w-4 h-4" />
              <span className="text-[11px] tracking-[0.2em] font-bold uppercase">Vetted Educators</span>
            </div>
            <h2 className="text-[48px] md:text-[64px] font-serif font-bold text-stone-900 leading-[1.1]">
              Need a <span className="italic text-[#7C1A1A]">tutor?</span> <br />
              Find the best.
            </h2>
            <p className="mt-8 text-stone-500 text-lg max-w-[520px] leading-relaxed">
              Connect with India's top 1% teachers for home and online tuition. Every educator is background verified and subject-vetted.
            </p>

            <div className="mt-12 space-y-6">
              {[
                { icon: Shield, title: "Verified Profiles", desc: "Every teacher goes through a 3-step verification." },
                { icon: MessageSquare, title: "Direct Chat", desc: "Talk to teachers directly before booking a trial." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-[#7C1A1A]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">{item.title}</h4>
                    <p className="text-stone-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/find-teacher" className="mt-12 inline-flex items-center gap-2 bg-[#7C1A1A] hover:bg-[#651414] text-white px-10 py-5 rounded-[24px] font-bold text-[17px] transition-all duration-200">
              Browse teachers <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
               {/* Mock Teacher Cards */}
               <div className="space-y-4 pt-12">
                  <TeacherMiniCard name="Anjali S." sub="Mathematics" rate="4.9" img="bg-blue-100" />
                  <TeacherMiniCard name="Rahul V." sub="Physics" rate="4.8" img="bg-amber-100" />
               </div>
               <div className="space-y-4">
                  <TeacherMiniCard name="Priya N." sub="English" rate="4.9" img="bg-rose-100" />
                  <TeacherMiniCard name="Suresh K." sub="Chemistry" rate="4.9" img="bg-emerald-100" />
               </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#7C1A1A]/5 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TeacherMiniCard = ({ name, sub, rate, img }) => (
  <div className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
    <div className={`w-14 h-14 rounded-2xl ${img} flex items-center justify-center text-stone-900 font-bold mb-4`}>
       {name[0]}
    </div>
    <div className="flex items-center gap-1 mb-1">
      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      <span className="text-[11px] font-bold text-stone-900">{rate} Rating</span>
    </div>
    <h4 className="font-serif font-bold text-lg text-stone-900">{name}</h4>
    <p className="text-stone-400 text-[13px]">{sub}</p>
  </div>
);

export default FindTeacher;
