import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import logo2 from '../assets/logo2.png';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-6 lg:gap-8 pb-16 border-b border-white/5">
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="flex items-center shrink-0 mb-10">
              <img src={logo2} alt="PickMySchool.AI" className="h-12 md:h-14 w-auto object-contain" />
            </Link>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-[320px]">
              India's leading school marketplace and ERP platform. Helping parents find the right schools and schools find the right students.
            </p>
            <div className="mt-8 flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#b1040e] hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-white mb-8 text-[15px]">Marketplace</h4>
            <ul className="space-y-4">
              {[
                { label: 'Find Schools', to: '/find-schools' },
                { label: 'AI Match', to: '/ai-match' },
                { label: 'Compare Schools', to: '/compare' },
                { label: 'Find Teacher', to: '/find-teacher' }
              ].map((link) => (
                <li key={link.label}><Link to={link.to} className="text-white/40 hover:text-white text-[14px] transition-colors font-medium">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-bold text-white mb-8 text-[15px]">For Schools</h4>
            <ul className="space-y-4">
              {['List your school', 'School ERP', 'Lead Management', 'Marketplace Ads'].map((link) => (
                <li key={link}><Link to="/for-schools" className="text-white/40 hover:text-white text-[14px] transition-colors font-medium">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-4">
            <h4 className="font-bold text-white mb-8 text-[15px]">Stay updated</h4>
            <p className="text-white/40 text-[15px] mb-6">Join 10,000+ parents getting weekly education insights.</p>
            <div className="flex p-1 rounded-[16px] border border-white/10 bg-white/5">
              <input type="email" placeholder="Email address" className="flex-1 bg-transparent px-4 outline-none text-[14px] text-white" />
              <button className="bg-[#b1040e] text-white p-2.5 rounded-[12px] hover:bg-[#651414] transition-colors">
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/20 text-[13px] font-medium">
            © 2026 PickMySchool.AI · Made with ♥ in India
          </div>
          <div className="flex gap-8">
            <Link to="#" className="text-white/20 hover:text-white text-[13px] font-medium transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-white/20 hover:text-white text-[13px] font-medium transition-colors">Terms of Service</Link>
          </div>
          <div className="text-white/20 text-[13px] font-medium">
           Powered by <a href="https://thepatternscompany.com/" className="text-white/40 font-bold hover:text-[#7C1A1A] transition-colors">The Patterns Company</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
