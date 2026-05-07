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
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [activeImg, setActiveImg] = React.useState(0);
  const { openModal } = useModal();

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200", title: "Main Campus Entrance" },
    { url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1200", title: "Smart Classrooms" },
    { url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200", title: "Central Library" },
    { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200", title: "Outdoor Courtyard" },
    { url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200", title: "Science Laboratories" },
    { url: "https://images.unsplash.com/photo-1546410531-bb4caa1b4227?auto=format&fit=crop&q=80&w=1200", title: "Sports Complex" },
  ];

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

  const openLightbox = (index) => {
    setActiveImg(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
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
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] overflow-hidden border border-[#F3E8E6] shadow-sm">
              <div className="aspect-[21/9] relative group">
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

            <div className="w-full max-w-full mb-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {galleryImages.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="relative w-full aspect-video rounded-xl overflow-hidden border border-white shadow-sm hover:scale-105 transition-transform bg-stone-100"
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
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

            <div>
              <Link 
                to={`/school/${id}/branches`}
                className="inline-flex items-center gap-3 bg-white border border-stone-200 hover:border-[#b1040e] hover:text-[#b1040e] px-8 py-4 rounded-full font-bold text-[15px] text-stone-800 transition-all duration-300 shadow-sm group"
              >
                <div className="bg-[#FDF2F0] p-2 rounded-full group-hover:bg-[#b1040e] transition-colors">
                  <MapPin className="w-4 h-4 text-[#b1040e] group-hover:text-white" />
                </div>
                View All Branches
              </Link>
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

            {/* Campus Life - Filled with images */}
            <div className="pt-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[28px] font-bold text-stone-900">Campus Life</h3>
                <span className="text-stone-400 font-medium">{galleryImages.length} Moments Captured</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, i) => (
                  <div key={i} className={`relative rounded-[32px] overflow-hidden group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`} onClick={() => openLightbox(i)}>
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="font-bold text-[18px]">{img.title}</p>
                    </div>
                  </div>
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

      {/* Image Modal (Simplified Lightbox) */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" onClick={closeLightbox} />
          
          <div className="relative w-full max-w-[700px] bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-300">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-900 hover:bg-[#b1040e] hover:text-white transition-all z-20 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-[4/3] bg-stone-100 flex items-center justify-center group">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg - 1 + galleryImages.length) % galleryImages.length); }}
                className="absolute left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-all z-10 shadow-sm opacity-0 group-hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <img 
                src={galleryImages[activeImg].url} 
                alt={galleryImages[activeImg].title} 
                className="w-full h-full object-cover"
              />

              <button 
                onClick={(e) => { e.stopPropagation(); setActiveImg((activeImg + 1) % galleryImages.length); }}
                className="absolute right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-stone-900 hover:bg-[#b1040e] hover:text-white transition-all z-10 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="p-5 flex items-center justify-between bg-white">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#b1040e] uppercase tracking-wider mb-0.5">Photo {activeImg + 1} of {galleryImages.length}</span>
                <h4 className="text-[16px] font-bold text-stone-900">{galleryImages[activeImg].title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolDetailPage;
