import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Target, ShieldCheck } from 'lucide-react';

const AiMatch = () => {
  return (
    <section className="bg-white">
      <div className="bg-[#141010] bg-[radial-gradient(circle_at_top_right,_#1a1212_0%,_#141010_100%)] py-8 lg:py-12 relative overflow-hidden w-full">
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b1040e]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b1040e]/3 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#F1627E]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase">AI MATCH ENGINE</span>
          </div>

          <h2 className="text-[28px] md:text-[36px] lg:text-[52px] font-serif font-bold text-white leading-[1.1] max-w-[900px]">
            Stop scrolling 200 schools. <span className="italic bg-gradient-to-r from-[#F48B9B] to-[#F1627E] bg-clip-text text-transparent">Tell us about your child.</span>
          </h2>

          <p className="mt-4 text-white/50 text-[15px] max-w-[640px] leading-relaxed">
            Our AI considers 40+ factors — board, fees, distance, teaching style, peer culture, parent ratings, board results, alumni outcomes — and ranks the best matches for your child specifically.
          </p>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Take the 2-min quiz", desc: "Your child's age, your priorities, your budget" },
              { num: "02", title: "Get a ranked list", desc: "Top 10 schools, scored 0-100 on fit" },
              { num: "03", title: "Apply in 1 click", desc: "One profile, multiple applications" }
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.08] p-5 rounded-[24px] group hover:bg-white/[0.06] transition-all duration-300">
                <div className="text-[18px] mb-4 font-bold bg-gradient-to-r from-[#F48B9B] to-[#F1627E] bg-clip-text text-transparent">{item.num}</div>
                <h3 className="text-white font-bold text-[20px] mb-2">{item.title}</h3>
                <p className="text-white/40 text-[14px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/ai-match" className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-10 py-4 rounded-[20px] font-bold text-[16px] hover:scale-[1.02] transition-all shadow-xl shadow-black/40">
              Start AI match – free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiMatch;
