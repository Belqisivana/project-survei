// frontend/app/lkb/dashboard/layout.tsx
'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function LKBDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk sidebar HP
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9F8] font-sans overflow-hidden">

      {/* ================= OVERLAY GELAP UNTUK MOBILE ================= */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 p-6 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Tombol Close (X) - Hanya muncul di HP */}
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Logo */}
        <div className="h-20 mb-5 w-full flex justify-center items-center mt-4 md:mt-0">
          <img 
            src="/logo-lkb-pusat.png" // Sesuaikan nama file logo LKB kamu
            alt="Lapis Kukus Balitar" 
            className="max-h-full object-contain"
          />
        </div>

        {/* Menu Navigasi Survei */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/lkb/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  pathname === '/lkb/dashboard' 
                    ? 'bg-yellow-50 text-yellow-700 font-bold' 
                    : 'text-gray-600 hover:bg-gray-50 font-medium'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Dashboard Survei
              </Link>
            </li>
            <li>
              <Link 
                href="/lkb/dashboard/pengunjung" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  pathname === '/lkb/dashboard/pengunjung' 
                    ? 'bg-yellow-50 text-yellow-700 font-bold' 
                    : 'text-gray-600 hover:bg-gray-50 font-medium'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Kelola Survey Pengunjung
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)] min-h-screen">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          
          {/* Tombol Hamburger (Kiri) - Hanya muncul di Mobile */}
          <button 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          {/* Spacer untuk Desktop */}
          <div className="hidden md:block"></div> 

          {/* Profil LKB (Kanan) */}
          <div className="relative">
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-yellow-600 transition-colors shadow-md select-none"
            >
              L
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-3xl p-5 shadow-2xl z-50 flex flex-col">
                <h3 className="text-xl font-bold text-center text-gray-900 mb-4">Admin LKB</h3>
                <hr className="my-4 border-gray-100" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-2.5 px-4 rounded-xl hover:bg-red-100 transition-colors text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
                  </svg>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Konten Halaman */}
        <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}