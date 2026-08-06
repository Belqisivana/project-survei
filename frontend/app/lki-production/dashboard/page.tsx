// frontend/app/lki/dashboard/page.tsx
import React from 'react';

export default function LKIDashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Rental Production</h1>
        <p className="text-gray-500 text-sm mt-1">Sistem manajemen jadwal penyewaan dan inventaris alat LKI Production.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kartu 1: Event Berjalan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Event Hari Ini</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">3 <span className="text-sm text-gray-500 font-medium">Titik Lokasi</span></span>
        </div>
        
        {/* Kartu 2: Alat Disewa */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Unit Sound Keluar</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">12 <span className="text-sm text-gray-500 font-medium">Set</span></span>
        </div>

        {/* Kartu 3: Jadwal Mendatang */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Booking Minggu Ini</span>
          <span className="text-3xl font-bold text-[#3366E3] mt-2">8 <span className="text-sm text-gray-500 font-medium">Klien</span></span>
        </div>

        {/* Kartu 4: Tagihan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Menunggu Pelunasan</span>
          <span className="text-3xl font-bold text-red-500 mt-2">4 <span className="text-sm text-gray-500 font-medium">Invoice</span></span>
        </div>
      </div>

      {/* Tabel Jadwal Event Terdekat */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Jadwal Event Terdekat</h2>
          <button className="text-sm text-[#3366E3] font-semibold hover:underline">Kalender Event</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-4 font-medium">Nama Klien / Acara</th>
                <th className="px-6 py-4 font-medium">Tanggal Sewa</th>
                <th className="px-6 py-4 font-medium">Paket Sound System</th>
                <th className="px-6 py-4 font-medium">Lokasi</th>
                <th className="px-6 py-4 font-medium">Status Operasional</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Pernikahan Bpk. Budi</td>
                <td className="px-6 py-4">8 Agustus 2026</td>
                <td className="px-6 py-4">Paket Wedding 5000W + Mic Wireless</td>
                <td className="px-6 py-4">Gedung Graha Cakrawala</td>
                <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Persiapan Alat</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Pensi SMAN 1</td>
                <td className="px-6 py-4">10 Agustus 2026</td>
                <td className="px-6 py-4">Paket Full Band 10000W + Line Array</td>
                <td className="px-6 py-4">Lapangan SMAN 1</td>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Sudah DP</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">Pengajian Akbar</td>
                <td className="px-6 py-4">6 Agustus 2026</td>
                <td className="px-6 py-4">Paket Standar 2000W</td>
                <td className="px-6 py-4">Masjid Jami'</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Sedang Berjalan</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}