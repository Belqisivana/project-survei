// frontend/components/ProfileCard.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

interface ProfileCardProps {
  name: string;
}

export default function ProfileCard({ name }: ProfileCardProps) {
  const router = useRouter(); // Inisialisasi router

  // Fungsi untuk menangani proses Log Out
  const handleLogout = () => {
    // Di sini nanti bisa ditambahkan pembersihan token/session jika ada
    // Contoh: localStorage.removeItem('token');
    
    // Lempar kembali ke halaman login
    router.push('/login');
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 flex flex-col shadow-xl">
      
      {/* Header / Greeting */}
      <h2 className="text-2xl font-bold text-center text-[#000000] mt-2">
        Hai, {name}
      </h2>

      {/* Avatar Area */}
      <div className="mt-6 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
          <span className="text-6xl mt-4">👨‍🏫</span>
        </div>
        
        <button className="mt-5 bg-[#3366E3] hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm">
          Ubah Foto
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 space-y-4">
        <button className="w-full bg-white border border-[#3366E3] text-[#000000] font-semibold py-3.5 px-4 rounded-xl text-left hover:bg-blue-50 transition-colors">
          Change Nickname
        </button>
        
        <button className="w-full bg-white border border-[#3366E3] text-[#000000] font-semibold py-3.5 px-4 rounded-xl text-left hover:bg-blue-50 transition-colors">
          Forgot Password
        </button>
      </div>

      {/* Log Out Button yang sudah difungsikan */}
      <div className="mt-8">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-white border border-red-500 text-red-500 font-bold py-3.5 px-4 rounded-xl hover:bg-red-50 transition-colors"
        >
          <svg 
            className="w-6 h-6 text-red-500" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
          </svg>
          Log Out
        </button>
      </div>

    </div>
  );
}