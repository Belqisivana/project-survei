// frontend/app/admin/page.tsx
import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Ringkasan Sistem</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Download Laporan
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Survei Aktif</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% dari bulan lalu</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Responden</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,482</p>
          <p className="text-sm text-green-600 mt-2">↑ 5% dari bulan lalu</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Rata-rata Penyelesaian</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">86%</p>
          <p className="text-sm text-red-500 mt-2">↓ 2% dari bulan lalu</p>
        </div>
      </div>

      {/* Placeholder untuk Tabel atau Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold mb-4">Aktivitas Survei Terbaru</h4>
        <div className="h-64 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
          Area ini bisa diisi dengan Chart atau Tabel Data (Tarik data dari FastAPI Backend)
        </div>
      </div>
    </div>
  );
}