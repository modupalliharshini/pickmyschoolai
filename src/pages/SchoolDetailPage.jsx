import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ArrowLeft, Share2, Heart, CheckCircle2 } from 'lucide-react';
import SchoolIllustration from '../components/SchoolIllustration';
import { useModal } from '../context/ModalContext';
import { fetchSchoolById } from '../services/api';

const SchoolDetailPage = () => {
  const { id } = useParams();
  const [school, setSchool] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [liked, setLiked] = React.useState(false);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [activeImg, setActiveImg] = React.useState(0);
  const { openModal } = useModal();

  React.useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSchoolById(id);
        setSchool(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

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
        title: school?.name,
        text: `Check out ${school?.name} on PickMySchool.AI`,
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

  if (loading) return <div className="min-h-screen pt-48 text-center text-stone-400 font-serif text-2xl animate-pulse">Loading school details...</div>;
  if (!school) return <div className="min-h-screen pt-48 text-center text-[#b1040e] font-serif text-2xl">School not found.</div>;

  const displayLocation = `${school.address}, ${school.city}`;

  return (
    <div className="bg-[#FBF7F0] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <Link to="/find-schools" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] overflow-hidden border border-[#F3E8E6] shadow-sm">
              <div className="aspect-[21/9] relative group">
                <SchoolIllustration />
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex gap-2 sm:gap-3 z-10">
                  <button onClick={handleShare} className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-900 shadow-sm hover:bg-[#b1040e] hover:text-white transition-all"><Share2 className="w-4 h-4 sm:w-5 h-5" /></button>
                  <button onClick={() => setLiked(!liked)} className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:scale-110 transition-all"><Heart className={`w-4 h-4 sm:w-5 h-5 ${liked ? 'fill-[#b1040e] text-[#b1040e]' : 'text-stone-900'}`} /></button>
                </div>
              </div>
            </div>

            <div className="w-full max-w-full mb-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {galleryImages.map((img, i) => (
                  <button key={i} onClick={() => openLightbox(i)} className="relative w-full aspect-video rounded-xl overflow-hidden border border-white shadow-sm hover:scale-105 transition-transform bg-stone-100">
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
              <h1 className="font-serif text-[48px] lg:text-[64px] font-bold text-stone-900 leading-tight">{school.name}</h1>
              <div className="flex flex-wrap items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-stone-500 font-medium"><MapPin className="w-5 h-5 text-[#b1040e]" /> {displayLocation}</div>
                <div className="flex items-center gap-1.5 text-stone-900 font-bold"><Star className="w-5 h-5 fill-[#b1040e] text-[#b1040e]" /> {school.rating || 4.5} <span className="text-stone-400 font-medium ml-1">(412 reviews)</span></div>
              </div>
              <p className="mt-8 text-stone-500 text-[18px] leading-relaxed max-w-[700px]">Premier {school.board} school known for academic excellence and holistic development.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'BOARD', val: school.board },
                { label: 'STUDENTS', val: '3,200+' },
                { label: 'ESTABLISHED', val: '1996' },
                { label: 'ANNUAL FEE', val: school.fee_range },
              ].map((h) => (
                <div key={h.label} className="bg-white border border-[#F3E8E6] p-6 rounded-[28px] text-center md:text-left">
                  <div className="text-[10px] font-bold text-[#b1040e] uppercase tracking-[0.15em] mb-2">{h.label}</div>
                  <div className="text-[20px] font-bold text-stone-900">{h.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-24">
            <div className="bg-white border border-[#F3E8E6] rounded-[40px] p-8 shadow-xl shadow-stone-200/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">ANNUAL FEE</div>
                  <div className="text-[36px] font-serif font-bold text-stone-900 leading-none">{school.fee_range}</div>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wider">Open admissions</div>
              </div>
              <div className="space-y-3">
                <button onClick={() => openModal('apply', { schoolName: school.name })} className="w-full bg-[#b1040e] hover:bg-[#651414] text-white py-5 rounded-[24px] font-bold text-[17px] shadow-lg shadow-[#b1040e]/20 transition-all duration-200">Apply now — free</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailPage;
