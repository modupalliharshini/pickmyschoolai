import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { schools } from '../mock';
import { MapPin, ArrowLeft, Phone, Mail, Globe, ExternalLink } from 'lucide-react';

const BranchesPage = () => {
  const { id } = useParams();
  const school = schools.find((s) => s.id === parseInt(id)) || schools[0];

  const branches = [
    {
      name: `${school.name} - Jubilee Hills`,
      address: "Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
      distance: "2.4 km",
      phone: "+91 40 2354 1234",
      email: "jh.campus@school.edu",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: `${school.name} - Gachibowli`,
      address: "Financial District, Nanakramguda, Gachibowli, Hyderabad 500032",
      distance: "5.8 km",
      phone: "+91 40 6789 5678",
      email: "gb.campus@school.edu",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: `${school.name} - Madhapur`,
      address: "Hitech City, Madhapur, Hyderabad, Telangana 500081",
      distance: "4.1 km",
      phone: "+91 40 4567 8901",
      email: "mp.campus@school.edu",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-[#FBF7F0] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
        <Link to={`/school/${id}`} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to {school.name}
        </Link>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 pb-24">
        <div className="mb-12">
          <h1 className="font-serif text-[40px] md:text-[56px] font-bold text-stone-900 leading-tight">
            Our Branches
          </h1>
          <p className="text-stone-500 text-[18px] mt-4">
            Explore {school.name} campuses across the city. Each branch maintains our high standards of academic excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {branches.map((branch, i) => (
            <div key={i} className="bg-white rounded-[40px] overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="aspect-[16/10] relative overflow-hidden">
                <img src={branch.image} alt={branch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 text-[12px] font-bold text-[#b1040e] bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                  {branch.distance}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#FDF2F0] p-2 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#b1040e]" />
                  </div>
                  <h2 className="text-[22px] font-bold text-stone-900 leading-tight">{branch.name}</h2>
                </div>
                
                <p className="text-stone-500 text-[14px] leading-relaxed mb-6">
                  {branch.address}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-stone-600 text-[14px]">
                    <Phone className="w-4 h-4 text-stone-400" /> {branch.phone}
                  </div>
                  <div className="flex items-center gap-3 text-stone-600 text-[14px]">
                    <Mail className="w-4 h-4 text-stone-400" /> {branch.email}
                  </div>
                </div>

                <button className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-[#b1040e] transition-all flex items-center justify-center gap-2 group/btn">
                  View Campus <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
