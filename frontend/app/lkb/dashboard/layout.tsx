// frontend/app/balitar/dashboard/layout.tsx
import React from 'react';

export default function BalitarDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9F9F8] font-sans">
      
      {/* Sidebar Balitar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col items-center">
        <div className="h-20 mb-8 w-full flex justify-center">
          <img 
            src="/logo-lkb-hitam.png" 
            alt="Lapis Kukus Balitar" 
            className="max-h-full object-contain"
          />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-end px-8">
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