import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, BookOpen, GraduationCap, Clock, ArrowLeft, ShieldCheck, Heart, Share2 } from 'lucide-react';
import { teachers } from '../mock';
import { useModal } from '../context/ModalContext';

const TeacherProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  
  const teacher = teachers.find(t => t.id === parseInt(id));

  if (!teacher) return <div className="p-20 text-center">Teacher not found</div>;

  const initials = teacher.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <main className="bg-[#FDF2F0]/30 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-500 font-bold text-[14px] hover:text-[#7C1A1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to search
          </button>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-50 transition-all">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          
          {/* Main Content */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-stone-100">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-[32px] bg-[#7C1A1A] text-white flex items-center justify-center text-3xl lg:text-4xl font-serif font-bold shadow-xl shadow-[#7C1A1A]/20">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-serif text-[32px] lg:text-[44px] font-bold text-stone-900 leading-tight">
                      {teacher.name}
                    </h1>
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
                    <div className="flex items-center gap-1.5 text-stone-900 font-bold text-[15px]">
                      <Star className="w-4 h-4 fill-[#7C1A1A] text-[#7C1A1A]" /> {teacher.rating} 
                      <span className="text-stone-400 font-medium ml-1">(42 reviews)</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-200" />
                    <div className="flex items-center gap-1.5 text-stone-600 font-medium text-[15px]">
                      <Clock className="w-4 h-4 text-stone-400" /> {teacher.exp} years experience
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-stone-50">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">SUBJECT</div>
                  <div className="text-stone-900 font-bold text-[15px]">{teacher.subject}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">GRADES</div>
                  <div className="text-stone-900 font-bold text-[15px]">{teacher.grade}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">LOCATION</div>
                  <div className="text-stone-900 font-bold text-[15px]">{teacher.locality}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">MODE</div>
                  <div className="text-stone-900 font-bold text-[15px]">{teacher.mode}</div>
                </div>
              </div>
            </div>

            {/* About & Education */}
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-8 lg:p-10 border border-stone-100">
                <h3 className="font-serif text-[24px] font-bold text-stone-900 mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#7C1A1A]" /> About the teacher
                </h3>
                <p className="text-stone-600 leading-relaxed text-[17px]">
                  {teacher.bio} I believe in a student-centered approach where we focus on building strong foundations before moving to complex problem-solving. My sessions are interactive, goal-oriented, and tailored to each student's learning pace.
                </p>
              </div>

              <div className="bg-white rounded-[32px] p-8 lg:p-10 border border-stone-100">
                <h3 className="font-serif text-[24px] font-bold text-stone-900 mb-6 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#7C1A1A]" /> Education & Credentials
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-stone-400" />
                    </div>
                    <div>
                      <div className="text-stone-900 font-bold text-[16px]">{teacher.education}</div>
                      <div className="text-stone-400 text-[14px] mt-1">Master's Degree</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-stone-400" />
                    </div>
                    <div>
                      <div className="text-stone-900 font-bold text-[16px]">Certified Educator License</div>
                      <div className="text-stone-400 text-[14px] mt-1">Professional Teaching Certification</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="sticky top-28 space-y-6">
            <div className="bg-[#7C1A1A] rounded-[40px] p-8 text-white shadow-xl shadow-[#7C1A1A]/20">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-1">Starting from</div>
                  <div className="text-[32px] font-serif font-bold">₹{teacher.fee}<span className="text-[16px] font-sans font-medium text-white/50 ml-1">/hr</span></div>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                  <span className="text-[13px] font-bold">30 min free trial</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => openModal('bookTrial', { teacherName: teacher.name })}
                  className="w-full bg-white text-[#7C1A1A] py-4 rounded-2xl font-bold text-[16px] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Book a free trial
                </button>
                <button className="w-full bg-white/10 border border-white/20 text-white py-4 rounded-2xl font-bold text-[16px] hover:bg-white/15 transition-all">
                  Chat with teacher
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-3 text-[13px] font-medium text-white/70">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure payments through PickMySchool
                </div>
                <div className="flex items-center gap-3 text-[13px] font-medium text-white/70">
                  <Clock className="w-4 h-4 text-white/50" /> Reschedule/Cancel up to 24h before
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-stone-100">
              <h4 className="text-stone-900 font-bold text-[16px] mb-4">Availability</h4>
              <div className="space-y-3">
                {['Mon - Fri: 4 PM - 9 PM', 'Sat - Sun: 10 AM - 6 PM'].map((time, i) => (
                  <div key={i} className="flex items-center justify-between text-[14px]">
                    <span className="text-stone-400">{time.split(': ')[0]}</span>
                    <span className="text-stone-900 font-bold">{time.split(': ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default TeacherProfilePage;
