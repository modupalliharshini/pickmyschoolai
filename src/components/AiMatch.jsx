import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Target, ShieldCheck } from 'lucide-react';

const AiMatch = () => {
  return (
    <section className="pt-4 pb-6 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="bg-[#141010] rounded-[48px] p-6 lg:p-10 relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#b1040e]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase">AI MATCH ENGINE</span>
            </div>

            <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-serif font-bold text-white leading-[1.1] max-w-[900px]">
              Stop scrolling 200 schools. <span className="italic text-[#F3E8E6]/80">Tell us about your child.</span>
            </h2>

            <p className="mt-4 text-white/50 text-[16px] max-w-[640px] leading-relaxed">
              Our AI considers 40+ factors — board, fees, distance, teaching style, peer culture, parent ratings, board results, alumni outcomes — and ranks the best matches for your child specifically.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: "01", title: "Take the 2-min quiz", desc: "Your child's age, your priorities, your budget" },
                { num: "02", title: "Get a ranked list", desc: "Top 10 schools, scored 0-100 on fit" },
                { num: "03", title: "Apply in 1 click", desc: "One profile, multiple applications" }
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-[32px] group hover:bg-white/[0.06] transition-all duration-300">
                  <div className="text-[#b1040e] font-bold text-[18px] mb-6">{item.num}</div>
                  <h3 className="text-white font-bold text-[22px] mb-3">{item.title}</h3>
                  <p className="text-white/40 text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/ai-match" className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-10 py-5 rounded-[24px] font-bold text-[17px] hover:scale-[1.02] transition-all shadow-xl shadow-black/40">
                Start AI match – free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiMatch;
