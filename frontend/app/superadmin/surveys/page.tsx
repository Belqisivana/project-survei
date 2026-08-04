// frontend/app/superadmin/surveys/page.tsx
import React from 'react';

const dummyAllSurveys = [
  { id: 1, placeName: 'Ayanan Digital Printing', address: 'Jl. Ps. Kesamben, Kesamben, Kec. Kesamben, Kabupaten Blitar, Jawa Timur 66191', pic: 'Andi (Admin)', status: 'Dipantau', rating: 4.8 },
  { id: 2, placeName: 'Lki Productions', address: 'Jl. Sebeng No.1945, Plampangan, Jugo, Kec. Kesamben, Kabupaten Blitar, Jawa Timur 66191', pic: 'Budi (Admin)', status: 'Menunggu Verifikasi', rating: 4.2 },
  // { id: 3, placeName: 'Lki', address: 'Jl. Kesehatan No. 1, Bandung', pic: 'Siti (Admin)', status: 'Dipantau', rating: 4.5 },
  // { id: 4, placeName: 'Puskesmas Melati', address: 'Jl. Bunga No. 12, Surabaya', pic: 'Belum Ada', status: 'Draf', rating: 0 },
];

export default function SuperadminSurveysPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#000000]">Semua Survei Lokasi</h3>
          <p className="text-sm text-gray-500 mt-1">Pantau seluruh data lokasi dari semua Admin.</p>
        </div>
        <button className="bg-[#3366E3] hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          + Tambah Lokasi Global
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 font-semibold">Nama Lokasi & Alamat</th>
                <th className="px-6 py-4 font-semibold">Admin PIC</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Rating</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {dummyAllSurveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#000000]">{survey.placeName}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{survey.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${survey.pic === 'Belum Ada' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {survey.pic}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${survey.status === 'Dipantau' ? 'bg-green-100 text-green-700' : 
                        survey.status === 'Menunggu Verifikasi' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-gray-100 text-gray-600'}`}>
                      {survey.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-medium text-gray-700">{survey.rating || '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-[#000000] hover:text-blue-700 font-semibold transition-colors">
                      Detail
                    </button>
                    <button className="text-gray-400 hover:text-red-500 font-semibold transition-colors">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}