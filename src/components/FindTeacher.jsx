import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Star, ArrowRight, MessageSquare, Shield } from 'lucide-react';

const FindTeacher = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b1040e]/5 border border-[#b1040e]/10 text-[#b1040e] mb-8">
              <UserCheck className="w-4 h-4" />
              <span className="text-[11px] tracking-[0.2em] font-bold uppercase">Vetted Educators</span>
            </div>
            <h2 className="text-[48px] md:text-[64px] font-serif font-bold text-stone-900 leading-[1.1]">
              Need a <span className="italic text-[#b1040e]">tutor?</span> <br />
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
                    <item.icon className="w-6 h-6 text-[#b1040e]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">{item.title}</h4>
                    <p className="text-stone-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/find-teacher" className="mt-12 inline-flex items-center gap-2 bg-[#b1040e] hover:bg-[#651414] text-white px-10 py-5 rounded-[24px] font-bold text-[17px] transition-all duration-200">
              Pick your teacher <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
               {/* Mock Teacher Cards */}
               <div className="space-y-4 pt-12">
                  <TeacherMiniCard name="Ajay M." sub="Mathematics" rate="4.9" img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200" />
                  <TeacherMiniCard name="Paandu" sub="Physics" rate="4.8" img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" />
               </div>
               <div className="space-y-4">
                  <TeacherMiniCard name="Lokesh" sub="English" rate="4.9" img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" />
                  <TeacherMiniCard name="Rajesh" sub="Chemistry" rate="4.9" img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" />
               </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#b1040e]/5 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TeacherMiniCard = ({ name, sub, rate, img }) => (
  <div className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
    <div className="w-16 h-16 rounded-full bg-white border border-stone-100 shadow-sm flex items-center justify-center p-0.5 mb-4 shrink-0 overflow-hidden">
       <img src={img} alt={name} className="w-full h-full rounded-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
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
