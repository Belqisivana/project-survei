// frontend/app/superadmin/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Fungsi penentu warna menu aktif (Gaya Ungu Elegan)
  const getMenuClass = (path: string) => {
    // Cek apakah URL sama persis dengan path (untuk dashboard), atau berawalan path (untuk sub-menu)
    const isActive = path === '/superadmin' ? pathname === '/superadmin' : pathname.startsWith(path); 
    
    return `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
      isActive 
        ? 'bg-[#3366E3] text-white shadow-sm' 
        : 'text-[#000000] hover:bg-yellow-100'
    }`;
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
      
      {/* OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col transform transition-transform duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        md:relative md:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-20 flex items-center justify-between px-8 border-b border-gray-50 md:border-none">
          <div className="flex items-center gap-2">
            {/* Icon Mahkota kecil penanda Superadmin */}
            {/* <span className="text-2xl"></span> */}
            <h1 className="text-xl font-bold text-[#000000]">Superadmin</h1>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-gray-800 text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
          
          {/* SECTION: MAIN SYSTEM */}
          <div className="space-y-2">
            <h3 className="px-4 text-[13px] font-bold text-gray-300 tracking-wider uppercase mb-3">
              Main System
            </h3>
            
            <Link href="/superadmin" onClick={() => setIsSidebarOpen(false)} className={getMenuClass('/superadmin')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 12a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm12-12a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V6z" />
              </svg>
              Dashboard Utama
            </Link>

            <Link href="/superadmin/surveys" onClick={() => setIsSidebarOpen(false)} className={getMenuClass('/superadmin/surveys')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Semua Survei Lokasi
            </Link>
          </div>

          {/* SECTION: ADMINISTRATION */}
          <div className="space-y-2">
            <h3 className="px-4 text-[13px] font-bold text-gray-300 tracking-wider uppercase mb-3 mt-6">
              Administration
            </h3>
            
            <Link href="/superadmin/users" onClick={() => setIsSidebarOpen(false)} className={getMenuClass('/superadmin/users')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Kelola Pengguna
            </Link>

            <Link href="/superadmin/settings" onClick={() => setIsSidebarOpen(false)} className={getMenuClass('/superadmin/settings')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pengaturan Sistem
            </Link>
          </div>

        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg text-xl"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
            <h2 className="text-xl font-bold text-[#000000] hidden md:block">Workspace Pusat</h2>
          </div>
          
          {/* Avatar Superadmin (S) */}
          <div className="w-10 h-10 rounded-full bg-[#3366E3] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            S
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 md:p-8">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}