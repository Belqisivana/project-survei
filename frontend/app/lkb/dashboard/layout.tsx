// frontend/app/lkb/dashboard/layout.tsx
import React from 'react';
import Link from 'next/link';

export default function BalitarDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9F9F8] font-sans">
      
      {/* Sidebar Balitar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        {/* Logo */}
        <div className="h-20 mb-25 w-full flex justify-center items-center">
          <img 
            src="/logo-lkb-pusat.png" // Sesuaikan dengan nama file gambarmu
            alt="Lapis Kukus Balitar" 
            className="max-h-full object-contain"
          />
        </div>

        {/* Menu Navigasi Survei */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/lkb/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#3366E3] rounded-xl font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Dashboard Survei
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#3366E3] rounded-xl font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Hasil Ulasan
              </Link>
            </li>
            {/* <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#3366E3] rounded-xl font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                Hasil Kuesioner
              </Link>
            </li> */}
            {/* <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#3366E3] rounded-xl font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Tim Surveyor
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* Menu Pengaturan di Bawah */}
        <div className="mt-auto">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#3366E3] rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Pengaturan Sistem
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8">
          <div className="w-10 h-10 bg-[#3366E3] text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
            L
          </div>
        </header>

        {/* Konten Halaman */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}