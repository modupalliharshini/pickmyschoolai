import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Image as ImageIcon, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  Save,
  X,
  ChevronRight,
  Globe,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const STEPS = [
  { id: 'basic', label: 'Basic Info', icon: Building2, desc: 'School name, board & location' },
  { id: 'infra', label: 'Infrastructure', icon: LayoutDashboard, desc: 'Facilities & campus details' },
  { id: 'academics', label: 'Academics', icon: GraduationCap, desc: 'Grades & faculty information' },
  { id: 'media', label: 'Media & Photos', icon: ImageIcon, desc: 'Upload logo & campus photos' },
  { id: 'contact', label: 'Contact Details', icon: Phone, desc: 'Official contact information' },
];

const SchoolOnboardingPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    board: 'CBSE',
    category: 'Co-ed',
    city: '',
    locality: '',
    tagline: '',
    campusSize: '',
    labs: [],
    sports: [],
    gradesOffered: '',
    facultyCount: '',
    ratio: '',
    principal: '',
    phone: '',
    email: '',
    website: ''
  });

  const progress = ((activeStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (activeStep < STEPS.length - 1) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    } else {
      toast.success('Congratulations! Your school has been submitted for verification.');
      navigate('/for-schools');
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400 hover:text-stone-900"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="hidden sm:block w-px h-6 bg-stone-200" />
            <div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-stone-900">List Your School</h1>
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest hidden sm:block">Step {activeStep + 1} of {STEPS.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden md:flex flex-col items-end gap-1.5">
              <span className="text-[12px] font-bold text-stone-900">{Math.round(progress)}% Complete</span>
              <div className="w-32 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#b1040e] transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-stone-500 font-bold text-[14px] hover:text-stone-900 px-4 py-2 transition-colors">
              <Save className="w-4 h-4" /> Save as draft
            </button>
            <button 
              onClick={handleNext}
              className="bg-[#b1040e] text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-[14px] sm:text-[15px] hover:bg-[#651414] transition-all shadow-lg shadow-[#b1040e]/20"
            >
              {activeStep === STEPS.length - 1 ? 'Submit for Review' : 'Next Step'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-10 gap-6 sm:gap-10">
        {/* Mobile Step Indicator */}
        <div className="lg:hidden flex overflow-x-auto gap-4 pb-4 no-scrollbar border-b border-stone-200 mb-2">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  activeStep === idx 
                    ? 'bg-white border-[#b1040e] text-[#b1040e] shadow-sm' 
                    : idx < activeStep 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      : 'bg-stone-50 border-stone-100 text-stone-400'
                }`}
              >
                {idx < activeStep ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                <span className="text-[13px] font-bold whitespace-nowrap">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="bg-white rounded-[32px] border border-stone-200 p-6 sticky top-28 shadow-sm">
            <nav className="space-y-1">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left group flex items-start gap-4 p-4 rounded-2xl transition-all ${
                      activeStep === idx 
                        ? 'bg-[#b1040e]/5 text-[#b1040e]' 
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className={`mt-1 p-2 rounded-xl transition-colors ${
                      activeStep === idx 
                        ? 'bg-[#b1040e] text-white shadow-lg shadow-[#b1040e]/20' 
                        : idx < activeStep
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200'
                    }`}>
                      {idx < activeStep ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className={`font-bold text-[15px] ${activeStep === idx ? 'text-[#b1040e]' : 'text-stone-900'}`}>
                        {step.label}
                      </div>
                      <p className={`text-[12px] mt-0.5 ${activeStep === idx ? 'text-[#b1040e]/60' : 'text-stone-400'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-stone-100">
              <div className="bg-stone-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-[13px] mb-2">
                  <Sparkles className="w-4 h-4 text-[#b1040e]" /> Pro Tip
                </div>
                <p className="text-stone-500 text-[12px] leading-relaxed">
                  Schools with high-quality campus photos get 3x more admissions inquiries.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-[800px]">
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-stone-200 p-6 sm:p-10 lg:p-12 shadow-sm min-h-[600px] flex flex-col">
            <div className="mb-8 sm:mb-12">
              {(() => {
                const StepIcon = STEPS[activeStep].icon;
                return (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b1040e]/5 border border-[#b1040e]/10 text-[#b1040e] mb-4">
                    <StepIcon className="w-3.5 h-3.5" />
                    <span className="text-[10px] tracking-[0.2em] font-bold uppercase">{STEPS[activeStep].label}</span>
                  </div>
                );
              })()}
              <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-stone-900 leading-tight">
                {activeStep === 0 && <>Tell us about your <span className="italic text-[#b1040e]">school.</span></>}
                {activeStep === 1 && <>Campus & <span className="italic text-[#b1040e]">Infrastructure.</span></>}
                {activeStep === 2 && <>Academic <span className="italic text-[#b1040e]">Standards.</span></>}
                {activeStep === 3 && <>Visuals & <span className="italic text-[#b1040e]">Branding.</span></>}
                {activeStep === 4 && <>Final <span className="italic text-[#b1040e]">Contact.</span></>}
              </h2>
            </div>

            <div className="flex-1">
              {activeStep === 0 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormGroup label="OFFICIAL SCHOOL NAME" colSpan={2}>
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="e.g. The Global Edge School"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="EDUCATION BOARD">
                    <select 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium appearance-none"
                      value={formData.board}
                      onChange={(e) => updateForm('board', e.target.value)}
                    >
                      <option>CBSE</option>
                      <option>ICSE</option>
                      <option>IB</option>
                      <option>IGCSE</option>
                      <option>State Board</option>
                    </select>
                  </FormGroup>
                  <FormGroup label="CATEGORY">
                    <select 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium appearance-none"
                      value={formData.category}
                      onChange={(e) => updateForm('category', e.target.value)}
                    >
                      <option>Co-ed</option>
                      <option>Boys Only</option>
                      <option>Girls Only</option>
                    </select>
                  </FormGroup>
                  <FormGroup label="CITY">
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="e.g. Hyderabad"
                      value={formData.city}
                      onChange={(e) => updateForm('city', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="LOCALITY">
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="e.g. Madhapur"
                      value={formData.locality}
                      onChange={(e) => updateForm('locality', e.target.value)}
                    />
                  </FormGroup>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-8">
                  <FormGroup label="CAMPUS SIZE (ACRES)">
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="e.g. 5.5"
                      value={formData.campusSize}
                      onChange={(e) => updateForm('campusSize', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="KEY FACILITIES">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                      {['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Swimming Pool', 'Cricket Ground', 'Basketball Court', 'Smart Classes', 'Robotics Lab', 'Transport', 'Hostel'].map((f) => (
                        <label key={f} className="flex items-center gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100 cursor-pointer hover:bg-stone-100 transition-colors group">
                          <input type="checkbox" className="w-5 h-5 rounded border-stone-200 text-[#b1040e] focus:ring-[#b1040e]" />
                          <span className="text-[14px] font-medium text-stone-600">{f}</span>
                        </label>
                      ))}
                    </div>
                  </FormGroup>
                </div>
              )}

              {activeStep === 2 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormGroup label="GRADES OFFERED" colSpan={2}>
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="e.g. Nursery to Grade 10"
                      value={formData.gradesOffered}
                      onChange={(e) => updateForm('gradesOffered', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="TOTAL FACULTY">
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="e.g. 85"
                      value={formData.facultyCount}
                      onChange={(e) => updateForm('facultyCount', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="STUDENT-TEACHER RATIO">
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="e.g. 25:1"
                      value={formData.ratio}
                      onChange={(e) => updateForm('ratio', e.target.value)}
                    />
                  </FormGroup>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-10">
                  <div className="p-8 border-2 border-dashed border-stone-100 rounded-[32px] flex flex-col items-center justify-center text-center group hover:border-[#b1040e]/30 transition-colors">
                    <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center mb-4 group-hover:bg-[#b1040e]/5 transition-colors">
                      <Upload className="w-8 h-8 text-stone-400 group-hover:text-[#b1040e]" />
                    </div>
                    <h4 className="font-bold text-stone-900">Upload School Logo</h4>
                    <p className="text-[13px] text-stone-400 mt-1">PNG or SVG, max 5MB</p>
                    <button className="mt-6 px-6 py-2 rounded-xl bg-stone-900 text-white font-bold text-[13px] hover:bg-stone-800 transition-colors">Browse Files</button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-[4/3] rounded-2xl bg-stone-50 border border-stone-100 flex flex-col items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors cursor-pointer border-dashed">
                        <ImageIcon className="w-6 h-6 mb-2" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Photo {i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormGroup label="PRINCIPAL / DIRECTOR NAME" colSpan={2}>
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="Full Name"
                      value={formData.principal}
                      onChange={(e) => updateForm('principal', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="ADMISSIONS PHONE">
                    <div className="relative">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input 
                        className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl pl-14 pr-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                      />
                    </div>
                  </FormGroup>
                  <FormGroup label="OFFICIAL EMAIL">
                    <input 
                      className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl px-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                      placeholder="admin@school.edu"
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="WEBSITE URL" colSpan={2}>
                    <div className="relative">
                      <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input 
                        className="w-full h-14 bg-stone-50 border border-stone-100 rounded-2xl pl-14 pr-6 outline-none focus:ring-2 focus:ring-[#b1040e]/20 focus:border-[#b1040e] transition-all text-stone-900 font-medium"
                        placeholder="www.schoolname.com"
                        value={formData.website}
                        onChange={(e) => updateForm('website', e.target.value)}
                      />
                    </div>
                  </FormGroup>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between">
              <button 
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`flex items-center gap-2 font-bold text-[15px] px-6 py-3 rounded-xl transition-all ${
                  activeStep === 0 ? 'text-stone-300' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={handleNext}
                className="group flex items-center gap-2 bg-[#b1040e] text-white px-10 py-4 rounded-2xl font-bold text-[16px] hover:bg-[#651414] transition-all shadow-lg shadow-[#b1040e]/20"
              >
                {activeStep === STEPS.length - 1 ? 'Complete Setup' : 'Continue'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Footer (Optional for small screens) */}
      <footer className="lg:hidden bg-white border-t border-stone-200 p-4 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex gap-3">
          <button 
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`flex-1 flex items-center justify-center gap-2 font-bold text-[14px] py-3.5 rounded-xl border border-stone-100 ${
              activeStep === 0 ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            Back
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] bg-[#b1040e] text-white py-3.5 rounded-xl font-bold text-[14px] shadow-lg shadow-[#b1040e]/20"
          >
            {activeStep === STEPS.length - 1 ? 'Submit' : 'Next Step'}
          </button>
        </div>
      </footer>
      <div className="lg:hidden h-20" /> {/* Spacer for sticky footer */}
    </div>
  );
};

const FormGroup = ({ label, children, colSpan = 1 }) => (
  <div className={`space-y-3 ${colSpan === 2 ? 'sm:col-span-2' : ''}`}>
    <label className="text-[10px] tracking-[0.2em] font-bold text-stone-400 uppercase">
      {label}
    </label>
    {children}
  </div>
);

export default SchoolOnboardingPage;
