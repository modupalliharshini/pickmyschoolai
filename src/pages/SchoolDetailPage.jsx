import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { schools } from '../mock';
import { MapPin, Star, ArrowLeft, Share2, Heart, CheckCircle2 } from 'lucide-react';
import SchoolIllustration from '../components/SchoolIllustration';
import { useModal } from '../context/ModalContext';

const SchoolDetailPage = () => {
  const { id } = useParams();
  const school = schools.find((s) => s.id === parseInt(id)) || schools[0];
  const [liked, setLiked] = React.useState(false);
  const { openModal } = useModal();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: school.name,
        text: `Check out ${school.name} on PickMySchool.AI`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#FBF7F0] min-h-screen pt-24">
      {/* Header / Nav */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <Link to="/find-schools" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          
          {/* Left Column */}
          <div className="space-y-12">
            <div className="bg-white rounded-[40px] overflow-hidden border border-[#F3E8E6] shadow-sm">
              <div className="aspect-[21/9] relative">
                <SchoolIllustration />
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex gap-2 sm:gap-3 z-10">
                  <button 
                    onClick={handleShare}
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-900 shadow-sm hover:bg-[#b1040e] hover:text-white transition-all"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setLiked(!liked)}
                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 transition-all"
                  >
                    <Heart className={`w-4 h-4 sm:w-5 h-5 ${liked ? 'fill-[#b1040e] text-[#b1040e]' : 'text-stone-900'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#FDF2F0] text-[#b1040e] text-[11px] font-bold px-3 py-1 rounded-full border border-[#F3E8E6] uppercase tracking-wider">TOP MATCH</span>
                <span className="text-stone-400 text-[11px] font-bold uppercase tracking-wider">Est. 1996</span>
              </div>
              <h1 className="font-serif text-[48px] lg:text-[64px] font-bold text-stone-900 leading-tight">
                {school.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-stone-500 font-medium">
                  <MapPin className="w-5 h-5 text-[#b1040e]" /> {school.location}
                </div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold">
                  <Star className="w-5 h-5 fill-[#b1040e] text-[#b1040e]" /> {school.rating} <span className="text-stone-400 font-medium ml-1">(412 reviews)</span>
                </div>
              </div>
              <p className="mt-8 text-stone-500 text-[18px] leading-relaxed max-w-[700px]">
                Premier CBSE school known for academic excellence and holistic development. Our mission is to provide an environment that encourages students to discover their full potential.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'BOARD', val: 'CBSE' },
                { label: 'STUDENTS', val: '3,200+' },
                { label: 'ESTABLISHED', val: '1996' },
                { label: 'ANNUAL FEE', val: school.fee },
              ].map((h) => (
                <div key={h.label} className="bg-white border border-[#F3E8E6] p-6 rounded-[28px] text-center md:text-left">
                  <div className="text-[10px] font-bold text-[#b1040e] uppercase tracking-[0.15em] mb-2">{h.label}</div>
                  <div className="text-[20px] font-bold text-stone-900">{h.val}</div>
                </div>
              ))}
            </div>

            {/* More Details */}
            <div>
              <h3 className="text-[24px] font-bold text-stone-900 mb-6">Highlights</h3>
              <div className="flex flex-wrap gap-3">
                {['Co-ed', 'Bus available', 'Sports', 'Smart classrooms', 'Transport', 'Library', 'Music', 'Labs'].map((tag) => (
                  <span key={tag} className="px-5 py-2.5 rounded-2xl bg-white border border-stone-100 text-stone-600 font-medium text-[15px] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b1040e]" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Application Card */}
          <div className="sticky top-24">
            <div className="bg-white border border-[#F3E8E6] rounded-[40px] p-8 shadow-xl shadow-stone-200/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">ANNUAL FEE</div>
                  <div className="text-[36px] font-serif font-bold text-stone-900 leading-none">{school.fee}</div>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">
                  Open admissions
                </div>
              </div>

              <div className="bg-[#FDF2F0] border border-[#F3E8E6] rounded-2xl p-4 mb-8">
                <div className="flex gap-2 text-[#b1040e]">
                  <span className="font-bold text-[13px] whitespace-nowrap">AI match · 96%</span>
                  <span className="text-stone-600 text-[13px]">· This school fits your child profile well.</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => openModal('apply', { schoolName: school.name })}
                  className="w-full bg-[#b1040e] hover:bg-[#651414] text-white py-5 rounded-[24px] font-bold text-[17px] shadow-lg shadow-[#b1040e]/20 transition-all duration-200"
                >
                  Apply now — free
                </button>
                <button className="w-full bg-white border border-stone-200 hover:border-stone-400 py-5 rounded-[24px] font-bold text-[17px] transition-all duration-200">
                  Schedule visit
                </button>
              </div>

              <p className="mt-6 text-center text-stone-400 text-[13px] font-medium">
                No obligation · Hear back within 24 hours
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SchoolDetailPage;
