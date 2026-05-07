import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Target, ShieldCheck } from 'lucide-react';

const AiMatch = () => {
  return (
    <section className="pt-2 pb-8 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="bg-[#141010] rounded-[40px] p-8 lg:p-10 relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#b1040e]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase">AI MATCH ENGINE</span>
            </div>

            <h2 className="text-[40px] md:text-[54px] lg:text-[64px] font-serif font-bold text-white leading-[1.1] max-w-[900px]">
              Stop scrolling 200 schools. <span className="italic text-[#ffb2ab]">Tell us about your child.</span>
            </h2>

            <p className="mt-4 text-white/40 text-[15px] max-w-[600px] leading-relaxed">
              Our AI considers 40+ factors — board, fees, distance, teaching style, peer culture, parent ratings, board results, alumni outcomes — and ranks the best matches for your child specifically.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { num: "01", title: "Take the 2-min quiz", desc: "Your child's age, your priorities, your budget" },
                { num: "02", title: "Get a ranked list", desc: "Top 10 schools, scored 0-100 on fit" },
                { num: "03", title: "Apply in 1 click", desc: "One profile, multiple applications" }
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-[20px] group hover:bg-white/[0.04] transition-all duration-300">
                  <div className="text-[#ff4d4d] font-bold text-[14px] mb-4 tracking-wider">{item.num}</div>
                  <h3 className="text-white font-bold text-[20px] mb-2">{item.title}</h3>
                  <p className="text-white/30 text-[14px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-end">
              <Link to="/ai-match" className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-[16px] font-bold text-[16px] hover:bg-stone-100 transition-all shadow-xl shadow-black/40">
                Start AI match – free <ArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black text-white/40 text-[10px] font-bold">
                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">e</div>
                Made with Emergent
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiMatch;
