import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Star } from 'lucide-react';
import SchoolIllustration from '../components/SchoolIllustration';
import { getAiMatches } from '../services/api';
import { toast } from 'sonner';

const steps = [
  { key: 'city', title: 'Where do you live?', sub: 'We\'ll show you schools nearby.', type: 'choice', options: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Pune'] },
  { key: 'grade', title: 'What grade is your child entering?', sub: 'Different grades have different cutoffs.', type: 'choice', options: ['Pre-KG', 'KG', 'Class 1-3', 'Class 4-6', 'Class 7-9', 'Class 10-12'] },
  { key: 'board', title: 'Preferred board?', sub: 'Pick one or more.', type: 'multi', options: ['CBSE', 'ICSE', 'IB', 'State', 'IGCSE'] },
  { key: 'budget', title: "What's your annual budget?", sub: 'We will respect this when ranking.', type: 'choice', options: ['Under ₹1L', '₹1L - ₹2L', '₹2L - ₹4L', '₹4L - ₹7L', '₹7L+'] },
  { key: 'priority', title: 'What matters most?', sub: "Pick up to 4. We'll weigh these heavily.", type: 'multi', options: ['Academics', 'Sports', 'Arts & music', 'STEM/Robotics', 'Mental wellbeing', 'Discipline', 'Inclusivity', 'Affordability'] },
];

const AiMatchPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ranked, setRanked] = useState([]);

  const current = steps[step];
  const choose = (opt) => {
    if (current.type === 'multi') {
      const prev = answers[current.key] || [];
      const next = prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt];
      setAnswers({ ...answers, [current.key]: next });
    } else {
      setAnswers({ ...answers, [current.key]: opt });
      if (step < steps.length - 1) setTimeout(() => setStep(step + 1), 250);
    }
  };
  const isSelected = (opt) => {
    const v = answers[current.key];
    return Array.isArray(v) ? v.includes(opt) : v === opt;
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // Map frontend keys to backend prefs
      const prefs = {
        city: answers.city,
        grade: answers.grade,
        board: Array.isArray(answers.board) ? answers.board : [answers.board],
        budget: answers.budget,
        priority: Array.isArray(answers.priority) ? answers.priority : [answers.priority]
      };
      
      const results = await getAiMatches(prefs);
      setRanked(results);
      setDone(true);
    } catch (err) {
      toast.error("Failed to get AI matches. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    // const ranked = [...schools].sort((a, b) => b.score - a.score).slice(0, 6);
    return (
      <section className="bg-[#FBF7F0] min-h-screen pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200"><Sparkles className="w-4 h-4 text-[#b1040e]" /><span className="text-[11px] tracking-[0.18em] font-semibold text-stone-700">AI MATCH COMPLETE</span></div>
          <h1 className="mt-5 font-serif text-[48px] lg:text-[64px] font-semibold text-stone-900 leading-tight">Your <span className="italic text-[#b1040e]">top matches.</span></h1>
          <p className="text-stone-500 mt-3">Ranked 0-100 on fit for your child.</p>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ranked.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="aspect-[4/3]"><SchoolIllustration shade={s.shade || 'bg-stone-50'} /></div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#b1040e] font-semibold text-[13px]"><Star className="w-3.5 h-3.5 fill-[#b1040e]" /> MATCH {s.score}%</div>
                  <h3 className="font-serif text-[19px] font-semibold mt-2 text-stone-900">{s.name}</h3>
                  <p className="text-stone-500 text-[13px] mt-1">{s.address}, {s.city}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[13px] text-stone-900 font-semibold">{s.fee_range || 'N/A'}/yr</span>
                    <a href={`/school/${s.id}`} className="text-[#b1040e] font-medium text-[13px] hover:underline">Apply →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { setDone(false); setStep(0); setAnswers({}); }} className="mt-10 text-[#b1040e] font-medium hover:underline">← Retake the quiz</button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FBF7F0] min-h-screen pt-24 pb-16">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center">
          <h1 className="font-serif text-[44px] lg:text-[60px] font-semibold text-stone-900 leading-tight">
            Tell us about your child <span className="italic text-[#b1040e]">in 60 seconds.</span>
          </h1>
          <div className="mt-10 flex justify-center gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 w-16 rounded-full transition-colors ${i <= step ? 'bg-[#b1040e]' : 'bg-stone-200'}`} />
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-3xl border border-stone-200 p-8 lg:p-12">
          <h2 className="font-serif text-[32px] font-semibold text-stone-900">{current.title}</h2>
          <p className="text-stone-500 mt-2">{current.sub}</p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {current.options.map((opt) => (
              <button key={opt} onClick={() => choose(opt)} className={`py-4 px-5 rounded-xl border-2 font-medium transition-all text-[14.5px] ${isSelected(opt) ? 'border-[#b1040e] bg-[#b1040e]/5 text-[#b1040e]' : 'border-stone-200 text-stone-800 hover:border-stone-400'}`}>
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button disabled={step === 0} onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-stone-700 font-medium disabled:opacity-40">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="inline-flex items-center gap-2 bg-[#b1040e] hover:bg-[#651414] text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button disabled={loading} onClick={handleFinish} className="inline-flex items-center gap-2 bg-[#b1040e] hover:bg-[#651414] text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50">
                {loading ? 'Finding...' : 'Find my matches'} <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiMatchPage;
