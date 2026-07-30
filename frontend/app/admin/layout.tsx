// frontend/app/admin/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mengambil URL yang sedang aktif saat ini
  const pathname = usePathname();

  // Fungsi untuk warna menyala sesuai referensi gambar
  const getMenuClass = (path: string) => {
    // Mengecek apakah URL saat ini aktif di menu tersebut
    // Khusus untuk survey, kita cek apakah url berawalan /admin/surveys (agar detail survey juga nyala)
    const isActive = path === '/admin' ? pathname === '/admin' : pathname.startsWith(path); 
    
    return `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
      isActive 
        ? 'bg-[#3366E3] text-white shadow-sm' // Warna industries
        : 'text-[#000000] hover:bg-shadow-50'  // Ungu tua & hover lembut
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
        <div className="h-20 flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-[#000000]">Admin Panel</h1>
          <button 
            className="md:hidden text-gray-400 hover:text-gray-800 text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
          
          {/* SECTION: MAIN MENU */}
          <div className="space-y-2">
            <h3 className="px-4 text-[13px] font-bold text-gray-300 tracking-wider uppercase mb-3">
              Overview
            </h3>
            
            {/* KEMBALI KE FITUR ASLI: DASHBOARD */}
            <Link href="/admin" onClick={() => setIsSidebarOpen(false)} className={getMenuClass('/admin')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 12a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm12-12a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V6z" />
              </svg>
              Dashboard Analytics
            </Link>

            {/* KEMBALI KE FITUR ASLI: SURVEI LOKASI MAPS */}
            <Link href="/admin/surveys" onClick={() => setIsSidebarOpen(false)} className={getMenuClass('/admin/surveys')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Survei Lokasi Maps
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
            <h2 className="text-xl font-bold text-[#000000] hidden md:block">Workspace</h2>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-[#3366E3] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            A
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