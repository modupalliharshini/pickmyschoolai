import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

const navItems = [
  { label: 'Find schools', to: '/find-schools' },
  { label: 'AI Match', to: '/ai-match' },
  { label: 'Compare', to: '/compare' },
  { label: 'For schools', to: '/for-schools' },
  { label: 'Find teacher', to: '/find-teacher' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header className={`sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b ${scrolled ? 'border-stone-100' : 'border-transparent'} transition-colors duration-200`}>
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#b1040e] flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-[20px] font-bold tracking-tight text-stone-900">
              PickMySchool.AI
            </div>
            <div className="text-[9px] tracking-[0.2em] text-stone-400 font-bold uppercase">MARKETPLACE · ERP</div>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.label}>
                <Link to={item.to} className={`text-[14px] font-medium transition-colors duration-150 ${active ? 'text-[#b1040e]' : 'text-stone-800 hover:text-[#b1040e]'}`}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-6">
          <button onClick={() => openModal('signin')} className="text-[14px] text-stone-800 font-medium hover:text-[#b1040e] transition-colors">Sign in</button>
          <Link to="/for-schools" className="bg-[#b1040e] hover:bg-[#651414] text-white px-5 py-2.5 rounded-xl text-[14px] font-medium shadow-sm transition-colors duration-200">List your school</Link>
        </div>
        <button className="lg:hidden p-2 text-stone-800" onClick={() => setMobileOpen(true)} aria-label="Toggle menu">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[100] lg:hidden ${mobileOpen ? 'block' : 'hidden'}`}>
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm" 
          onClick={() => setMobileOpen(false)} 
        />
        
        {/* White Drawer */}
        <div className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-screen bg-white">
            {/* Header - Fixed at top */}
            <div className="flex items-center justify-between p-6 border-b border-stone-100 shrink-0">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <div className="w-9 h-9 rounded-xl bg-[#b1040e] flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-serif text-[18px] font-bold text-stone-900">PickMySchool</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-stone-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Links Area */}
            <div className="flex-1 overflow-y-auto">
              <ul className="px-6 py-4 divide-y divide-stone-50">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.to} 
                      onClick={() => setMobileOpen(false)}
                      className="block py-5 text-[17px] font-bold text-stone-900 hover:text-[#b1040e] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Actions - Fixed at bottom */}
            <div className="p-6 border-t border-stone-100 bg-stone-50 shrink-0">
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setMobileOpen(false); openModal('signin'); }}
                  className="w-full py-4 text-[16px] font-bold text-stone-900 bg-white border border-stone-200 rounded-2xl shadow-sm active:scale-95 transition-all"
                >
                  Sign in
                </button>
                <button 
                  onClick={() => { setMobileOpen(false); openModal('list'); }}
                  className="w-full py-4 text-[16px] font-bold text-white bg-[#b1040e] rounded-2xl shadow-lg shadow-[#b1040e]/20 active:scale-95 transition-all"
                >
                  List your school
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
