import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import logo2 from '../assets/logo2.png';

const navItems = [
  { label: 'Find schools', to: '/find-schools' },
  { label: 'AI Match', to: '/ai-match' },
  { label: 'Compare', to: '/compare' },
  { label: 'For schools', to: '/for-schools' },
  { label: 'Pick teacher', to: '/find-teacher' },
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#b1040e] shadow-md overflow-hidden">
      <nav className="w-full h-16 flex items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
          <img src={logo2} alt="PickMySchool.AI" className="h-12 md:h-14 w-auto object-contain" />
        </Link>

        <ul className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.label}>
                <Link to={item.to} className={`text-[14px] font-bold tracking-wide transition-colors duration-150 ${active ? 'text-white' : 'text-white/80 hover:text-white'}`}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-6">
          <button onClick={() => openModal('signin')} className="text-[14px] text-white/80 font-bold hover:text-white transition-colors">Sign in</button>
          <Link to="/for-schools" className="bg-white text-[#b1040e] hover:bg-stone-50 px-6 py-2.5 rounded-xl text-[14px] font-bold shadow-sm transition-all duration-200 active:scale-95">List your school</Link>
        </div>
        <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(true)} aria-label="Toggle menu">
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
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-[#b1040e]">
              <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <img src={logo2} alt="PickMySchool.AI" className="h-8 sm:h-9 w-auto object-contain" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-white/70 hover:text-white">
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
