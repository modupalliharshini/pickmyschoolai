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
      email: "jh.campus@school.edu"
    },
    {
      name: `${school.name} - Gachibowli`,
      address: "Financial District, Nanakramguda, Gachibowli, Hyderabad 500032",
      distance: "5.8 km",
      phone: "+91 40 6789 5678",
      email: "gb.campus@school.edu"
    },
    {
      name: `${school.name} - Madhapur`,
      address: "Hitech City, Madhapur, Hyderabad, Telangana 500081",
      distance: "4.1 km",
      phone: "+91 40 4567 8901",
      email: "mp.campus@school.edu"
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

        <div className="space-y-6">
          {branches.map((branch, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#FDF2F0] p-2.5 rounded-xl">
                      <MapPin className="w-6 h-6 text-[#b1040e]" />
                    </div>
                    <h2 className="text-[24px] font-bold text-stone-900">{branch.name}</h2>
                  </div>
                  
                  <div className="space-y-2 text-stone-600">
                    <p className="flex items-start gap-2">
                      <span className="font-bold text-stone-900">Address:</span> {branch.address}
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-stone-400" /> {branch.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-stone-400" /> {branch.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[160px]">
                  <div className="text-[14px] font-bold text-[#b1040e] bg-[#FDF2F0] px-4 py-1.5 rounded-full border border-[#F3E8E6]">
                    {branch.distance} away
                  </div>
                  <button className="w-full md:w-auto bg-stone-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2">
                    View Campus <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
