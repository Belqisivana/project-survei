// frontend/app/balitar/dashboard/page.tsx
import React from 'react';

export default function BalitarDashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Penjualan</h1>
        <p className="text-gray-500 text-sm mt-1">Ringkasan operasional outlet Lapis Kukus Tugu Balitar hari ini.</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kartu 1: Penjualan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Box Terjual Hari Ini</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">124 <span className="text-sm text-green-500 font-medium">Box</span></span>
        </div>
        
        {/* Kartu 2: Pendapatan */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Pendapatan Kotor</span>
          <span className="text-3xl font-bold text-gray-900 mt-2">Rp 4.3M</span>
        </div>

        {/* Kartu 3: Stok Gudang */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Sisa Stok (Display)</span>
          <span className="text-3xl font-bold text-orange-500 mt-2">28 <span className="text-sm text-gray-500 font-medium">Box</span></span>
        </div>

        {/* Kartu 4: Pre-order */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Pesanan Diambil Nanti</span>
          <span className="text-3xl font-bold text-[#3366E3] mt-2">12 <span className="text-sm text-gray-500 font-medium">Nota</span></span>
        </div>
      </div>

      {/* Tabel Transaksi Terakhir */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Transaksi Terakhir</h2>
          <button className="text-sm text-[#3366E3] font-semibold hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="px-6 py-4 font-medium">ID Pesanan</th>
                <th className="px-6 py-4 font-medium">Varian Lapis Kukus</th>
                <th className="px-6 py-4 font-medium">Jumlah</th>
                <th className="px-6 py-4 font-medium">Total Harga</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">#TRX-0822</td>
                <td className="px-6 py-4">Original Choco Pandan</td>
                <td className="px-6 py-4">2 Box</td>
                <td className="px-6 py-4">Rp 70.000</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Selesai</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">#TRX-0823</td>
                <td className="px-6 py-4">Brownies Keju</td>
                <td className="px-6 py-4">1 Box</td>
                <td className="px-6 py-4">Rp 40.000</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Selesai</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">#TRX-0824</td>
                <td className="px-6 py-4">Paket Mix 3 Varian</td>
                <td className="px-6 py-4">3 Box</td>
                <td className="px-6 py-4">Rp 105.000</td>
                <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Menunggu Diambil</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}