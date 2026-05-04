import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { schools } from '../mock';

const ATTRS = [
  { key: 'fee', label: 'Annual fee' },
  { key: 'boards', label: 'Board' },
  { key: 'tags', label: 'Type' },
  { key: 'rating', label: 'Rating' },
  { key: 'established', label: 'Established' },
  { key: 'students', label: 'Students' },
];

const extra = {
  1: { established: 2001, students: 2400 },
  2: { established: 1959, students: 3100 },
  3: { established: 1988, students: 1800 },
  4: { established: 2003, students: 1200 },
  5: { established: 1969, students: 2200 },
  6: { established: 2011, students: 1400 },
  7: { established: 1998, students: 1100 },
  8: { established: 2005, students: 900 },
};

const ComparePage = () => {
  const [slots, setSlots] = useState([null, null, null]);
  const [picker, setPicker] = useState(-1);

  const pick = (i, school) => {
    const next = [...slots]; next[i] = school; setSlots(next); setPicker(-1);
  };

  return (
    <section className="bg-[#FBF7F0] min-h-screen py-14">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-[48px] lg:text-[60px] font-semibold text-stone-900 leading-tight">Compare schools</h1>
        <p className="text-stone-500 mt-3">Pick up to 3 schools and compare side-by-side.</p>

        <div className="mt-10 bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-4">
            <div className="p-6"></div>
            {slots.map((s, i) => (
              <div key={i} className="p-6 border-l border-stone-100">
                {s ? (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-[18px] font-semibold text-stone-900 leading-tight">{s.name}</h3>
                        <p className="text-[12.5px] text-stone-500 mt-1">{s.location}</p>
                      </div>
                      <button onClick={() => pick(i, null)} className="text-stone-400 hover:text-[#b1040e]"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setPicker(i)} className="w-full min-h-[120px] border-2 border-dashed border-stone-300 rounded-xl flex items-center justify-center gap-2 text-stone-500 hover:border-[#b1040e] hover:text-[#b1040e] transition-colors">
                    <Plus className="w-4 h-4" /> Add school
                  </button>
                )}
              </div>
            ))}
          </div>

          {ATTRS.map((attr) => (
            <div key={attr.key} className="grid grid-cols-4 border-t border-stone-100">
              <div className="p-5 text-stone-700 font-medium text-[14px]">{attr.label}</div>
              {slots.map((s, i) => (
                <div key={i} className="p-5 border-l border-stone-100 text-stone-900 text-[14px]">
                  {s ? renderVal(s, attr.key) : <span className="text-stone-300">—</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        {picker !== -1 && (
          <div className="fixed inset-0 z-50 bg-stone-900/40 flex items-center justify-center p-6" onClick={() => setPicker(-1)}>
            <div className="bg-white rounded-2xl max-w-[640px] w-full max-h-[80vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-serif text-[24px] font-semibold text-stone-900">Select a school</h3>
              <div className="mt-4 space-y-2">
                {schools.map((s) => (
                  <button key={s.id} onClick={() => pick(picker, s)} className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-[#b1040e] transition-colors">
                    <div className="font-medium text-stone-900">{s.name}</div>
                    <div className="text-[13px] text-stone-500">{s.location} · {s.fee}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const renderVal = (s, key) => {
  if (key === 'fee') return s.fee + '/yr';
  if (key === 'boards') return s.boards.join(', ');
  if (key === 'tags') return s.tags.slice(1, 3).join(' · ');
  if (key === 'rating') return s.rating + ' ★';
  return (extra[s.id] || {})[key] || '—';
};

export default ComparePage;
