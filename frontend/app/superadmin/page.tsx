// frontend/app/superadmin/page.tsx
'use client'; // <-- Tambahkan ini agar bisa buka-tutup dropdown

import React, { useState } from 'react';

export default function SuperAdminDashboard() {
  // State untuk melacak baris mana yang dropdown-nya sedang terbuka
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Data dummy lokasi disesuaikan dengan gambarmu
  const lokasiSurvei = [
    {
      id: 1,
      nama: 'Ayanan Digital Printing',
      alamat: 'Jl. Ps. Kesamben, Kesamben, Kec. Kesamben, Kabupat...',
      admin: 'Andi (Admin)',
      status: 'Dipantau',
      statusColor: 'bg-green-100 text-green-700',
      rating: 4.8,
      keluhan: [
        'Warna cetakan banner sedikit pudar di bagian ujung.',
        'Pengiriman dokumen telat 1 jam dari estimasi klien.'
      ]
    },
    {
      id: 2,
      nama: 'Lki Productions',
      alamat: 'Jl. Sebeng No.1945, Plampangan, Jugo, Kec. Kesambe...',
      admin: 'Budi (Admin)',
      status: 'Menunggu Verifikasi',
      statusColor: 'bg-yellow-100 text-yellow-700',
      rating: 4.2,
      keluhan: [
        'Akses loading dock terlalu sempit untuk truk fuso.',
        'Kabel power utama kurang panjang di venue lapangan.'
      ]
    },
    {
      id: 3,
      nama: 'Lapis Kukus Balitar',
      alamat: 'Jl. Sebeng No.1945, Plampangan, Jugo, Kec. Kesambe...',
      admin: 'Budi (Admin)',
      status: 'Menunggu Verifikasi',
      statusColor: 'bg-yellow-100 text-yellow-700',
      rating: 4.2,
      keluhan: [
        'Kemasan kue sedikit penyok saat diterima agen.',
        'Stok varian original sering kosong di etalase depan.'
      ]
    }
  ];

  const toggleRow = (id: number) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Tutup jika diklik lagi
    } else {
      setExpandedRow(id); // Buka dropdown
    }
  };

  return (
    <div className="space-y-8">
      
      {/* ================= HEADER & KARTU STATISTIK ================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Master Dashboard Survei</h1>
        <p className="text-gray-500 text-sm mt-1">Pemantauan hasil survei seluruh cabang (LKB, LKI Production, & Ayana).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kartu Cabang LKB */}
        <div className="bg-white p-6 rounded-2xl border-l-4 border-l-yellow-400 border-y border-r border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-bold text-gray-800">Lapis Kukus Balitar</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">142 <span className="text-sm text-gray-500 font-medium">Titik Survei</span></span>
          <span className="text-xs text-green-600 font-medium mt-2">▲ 12 titik baru minggu ini</span>
        </div>
        
        {/* Kartu Cabang LKI */}
        <div className="bg-white p-6 rounded-2xl border-l-4 border-l-red-500 border-y border-r border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-bold text-gray-800">LKI Production</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">86 <span className="text-sm text-gray-500 font-medium">Survei Venue</span></span>
          <span className="text-xs text-red-500 font-medium mt-2">▼ 3 laporan kendala akses</span>
        </div>

        {/* Kartu Cabang Ayana */}
        <div className="bg-white p-6 rounded-2xl border-l-4 border-l-blue-500 border-y border-r border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-bold text-gray-800">Ayana Digital Printing</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">210 <span className="text-sm text-gray-500 font-medium">Feedback Klien</span></span>
          <span className="text-xs text-green-600 font-medium mt-2">▲ Rating rata-rata 4.9/5.0</span>
        </div>
      </div>

      {/* ================= TABEL SEMUA SURVEI LOKASI ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
        
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Semua Survei Lokasi</h2>
            <p className="text-gray-500 text-sm mt-1">Pantau seluruh data lokasi dari semua Admin beserta keluhan surveinya.</p>
          </div>
          <button className="bg-[#3366E3] hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm">
            <span className="text-lg leading-none">+</span> Tambah Lokasi Global
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-6 font-medium">Nama Lokasi & Alamat</th>
                <th className="px-6 pb-4 font-medium">Admin PIC</th>
                <th className="px-6 pb-4 font-medium">Status</th>
                <th className="px-6 pb-4 font-medium">Rating</th>
                <th className="pl-6 pb-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              {lokasiSurvei.map((loc) => (
                <React.Fragment key={loc.id}>
                  {/* Baris Utama */}
                  <tr 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${expandedRow === loc.id ? 'bg-gray-50' : ''}`}
                    onClick={() => toggleRow(loc.id)}
                  >
                    <td className="py-5 pr-6">
                      <div className="flex items-center gap-3">
                        {/* Ikon Panah Dropdown */}
                        <div className="text-gray-400">
                          <svg className={`w-5 h-5 transform transition-transform duration-200 ${expandedRow === loc.id ? 'rotate-90 text-blue-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{loc.nama}</p>
                          <p className="text-gray-500 text-xs mt-1 truncate max-w-md">{loc.alamat}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-blue-500 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg text-xs">{loc.admin}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`${loc.statusColor} px-3 py-1.5 rounded-lg text-xs font-bold`}>{loc.status}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-yellow-400 text-lg leading-none">★</span> 
                        <span className="font-semibold text-gray-900">{loc.rating}</span>
                      </div>
                    </td>
                    <td className="pl-6 py-5 text-right font-bold text-[13px]">
                      <button className="text-gray-900 hover:text-blue-600 transition-colors mr-4" onClick={(e) => { e.stopPropagation(); /* Aksi detail */ }}>Detail</button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors" onClick={(e) => { e.stopPropagation(); /* Aksi hapus */ }}>Hapus</button>
                    </td>
                  </tr>

                  {/* Baris Dropdown (Keluhan) */}
                  {expandedRow === loc.id && (
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td colSpan={5} className="px-10 py-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Daftar Keluhan Survei
                          </h4>
                          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                            {loc.keluhan.map((keluhanText, index) => (
                              <li key={index}>{keluhanText}</li>
                            ))}
                          </ul>
                          <div className="mt-4 flex gap-3">
                             <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-1.5 px-4 rounded-lg text-xs transition-colors">Teruskan ke Admin</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}