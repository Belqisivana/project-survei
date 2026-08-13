import React from 'react';

export default function SuperadminManageKasusPage() {
  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Kasus Komplain Lintas Cabang</h1>
        <p className="text-gray-500 text-sm mt-1">Tinjau bukti penanganan dari Admin cabang dan berikan validasi akhir (Selesai).</p>
      </div>

      {/* Kartu Tabel */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
        
        {/* Header di dalam Kartu (Menyamakan dengan Master Dashboard) */}
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daftar Kasus Menunggu Validasi</h2>
            <p className="text-gray-500 text-sm mt-1">Data komplain pengunjung dari seluruh cabang secara real-time.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-6 font-medium">Asal Cabang</th>
                <th className="px-6 pb-4 font-medium w-1/3">Kasus Komplain</th>
                <th className="px-6 pb-4 font-medium">Status Saat Ini</th>
                <th className="pl-6 pb-4 font-medium text-right">Tinjau</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-6">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">AYANA</span>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-gray-900">Hasil cetak banner warna pudar</p>
                  <p className="text-gray-500 text-xs mt-1">Bukti diunggah 1 jam yang lalu oleh Admin.</p>
                </td>
                <td className="px-6 py-5">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg text-xs font-bold">Menunggu Validasi Pusat</span>
                </td>
                <td className="pl-6 py-5 text-right font-bold text-[13px]">
                  <button className="bg-gray-900 hover:bg-black text-white py-2 px-5 rounded-lg transition-colors flex items-center gap-2 ml-auto">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Tinjau (Edit)
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-100 bg-gray-50 transition-colors">
                <td className="py-5 pr-6">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">LKB</span>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-gray-900">Kue lapis rusak saat pengiriman</p>
                  <p className="text-gray-500 text-xs mt-1">Diselesaikan pada 09 Ags 2026.</p>
                </td>
                <td className="px-6 py-5">
                  <span className="text-green-600 font-semibold text-xs">Selesai (Tervalidasi)</span>
                </td>
                <td className="pl-6 py-5 text-right font-bold text-[13px]">
                  <button className="text-blue-600 hover:underline">Lihat Riwayat</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}