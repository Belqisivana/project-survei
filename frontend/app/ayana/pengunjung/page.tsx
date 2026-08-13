// frontend/app/ayana/pengunjung/page.tsx
import React from 'react';

export default function KelolaPengunjungPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kelola Data Pengunjung & Komplain</h1>
        <p className="text-gray-500 text-sm mt-1">Tindak lanjuti kasus komplain pengunjung dan unggah bukti penanganan.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-6 font-medium w-1/3">Kasus Komplain</th>
                <th className="px-6 pb-4 font-medium">Status Kasus</th>
                <th className="px-6 pb-4 font-medium">Input Bukti Penanganan</th>
                <th className="pl-6 pb-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              {/* Kasus 1: Belum Selesai (Bisa ditinjau Admin) */}
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-6">
                  <p className="font-bold text-gray-900">Hasil cetak banner warna pudar</p>
                  <p className="text-gray-500 text-xs mt-1">Pengirim: PT. Maju Mundur (10 Ags 2026)</p>
                </td>
                <td className="px-6 py-5">
                  <select className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 font-semibold">
                    <option value="ditinjau">Sedang Ditinjau</option>
                    <option value="selesai" disabled>Selesai (Menunggu Validasi Pusat)</option>
                  </select>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-2">
                    <input type="text" placeholder="Catatan penanganan..." className="w-full border border-gray-300 rounded-lg p-2 text-xs" />
                    <input type="file" multiple accept="image/*" className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                  </div>
                </td>
                <td className="pl-6 py-5 text-right font-bold text-[13px]">
                  <button className="bg-[#3366E3] hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">Kirim Bukti</button>
                </td>
              </tr>

              {/* Kasus 2: Sudah Divalidasi Superadmin (Selesai & Terkunci) */}
              <tr className="border-b border-gray-100 bg-green-50/30 transition-colors">
                <td className="py-5 pr-6">
                  <p className="font-bold text-gray-900">Salah potong ukuran ID Card</p>
                  <p className="text-gray-500 text-xs mt-1">Pengirim: Event Organizer Jatim (08 Ags 2026)</p>
                </td>
                <td className="px-6 py-5">
                  <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold block text-center w-full">Selesai (Tervalidasi)</span>
                </td>
                <td className="px-6 py-5 text-gray-500 text-xs italic">
                  Bukti telah disetujui oleh Superadmin.
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