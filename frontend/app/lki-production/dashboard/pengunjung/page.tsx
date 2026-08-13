// frontend/app/lki-production/dashboard/pengunjung/page.tsx
import React from 'react';

export default function LKIPengunjungPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kelola Data Pengunjung & Komplain LKI</h1>
        <p className="text-gray-500 text-sm mt-1">Tindak lanjuti kasus komplain klien event dan unggah bukti penanganan dari tim lapangan.</p>
      </div>

      {/* Tabel Komplain */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-6 font-medium w-1/3">Kasus Komplain Event</th>
                <th className="px-6 pb-4 font-medium">Status Kasus</th>
                <th className="px-6 pb-4 font-medium">Input Bukti Penanganan</th>
                <th className="pl-6 pb-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              {/* Kasus 1: Belum Selesai (Bisa ditinjau Admin LKI) */}
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-6">
                  <p className="font-bold text-gray-900">Kabel mic sering terputus (kresek-kresek)</p>
                  <p className="text-gray-500 text-xs mt-1">Klien: Pernikahan Bpk. Budi (10 Ags 2026)</p>
                </td>
                <td className="px-6 py-5">
                  <select className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 font-semibold">
                    <option value="ditinjau">Sedang Ditinjau</option>
                    <option value="selesai" disabled>Selesai (Menunggu Validasi Pusat)</option>
                  </select>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-2">
                    <input type="text" placeholder="Catatan pergantian alat..." className="w-full border border-gray-300 rounded-lg p-2 text-xs" />
                    <input type="file" multiple accept="image/*" className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
                  </div>
                </td>
                <td className="pl-6 py-5 text-right font-bold text-[13px]">
                  {/* Tombol pakai warna merah khas LKI */}
                  <button className="bg-[#E33333] hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">Kirim Bukti</button>
                </td>
              </tr>

              {/* Kasus 2: Sudah Divalidasi Superadmin (Selesai & Terkunci) */}
              <tr className="border-b border-gray-100 bg-green-50/30 transition-colors">
                <td className="py-5 pr-6">
                  <p className="font-bold text-gray-900">Tim loading alat telat datang 30 menit</p>
                  <p className="text-gray-500 text-xs mt-1">Klien: Pensi SMAN 1 (08 Ags 2026)</p>
                </td>
                <td className="px-6 py-5">
                  <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold block text-center w-full">Selesai (Tervalidasi)</span>
                </td>
                <td className="px-6 py-5 text-gray-500 text-xs italic">
                  Bukti perbaikan SOP telah disetujui oleh Superadmin.
                </td>
                <td className="pl-6 py-5 text-right font-bold text-[13px]">
                  <button className="text-gray-400 cursor-not-allowed py-2 px-4 rounded-lg" disabled>Terkunci</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}