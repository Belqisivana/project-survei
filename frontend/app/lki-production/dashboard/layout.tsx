// frontend/app/lki/dashboard/layout.tsx
import React from 'react';

export default function LKIDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9F9F8] font-sans">
      
      {/* Sidebar LKI */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="h-10 mb-8">
          <img 
            src="/logo-lkipro-formal2.png" 
            alt="LKI Production" 
            className="max-h-full object-contain"
          />
        </div>
        {/* Menu Sidebar bisa ditambahkan di sini nanti */}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8">
          {/* Avatar Bulat Hijau */}
          <div className="w-10 h-10 bg-[#00A651] text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-green-700 transition-colors">
            A
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