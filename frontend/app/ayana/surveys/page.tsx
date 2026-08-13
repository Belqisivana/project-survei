// frontend/app/admin/surveys/page.tsx
import React from 'react';
import Link from 'next/link';

// Data dummy disesuaikan untuk konteks Google Maps
const dummyMapsSurveys = [
  { 
    id: 1, 
    placeName: 'Klinik Sehat Bersama', 
    address: 'Jl. Merdeka No. 45, Jakarta',
    rating: 4.8,
    totalReviews: 124,
    status: 'Dipantau', 
    lastUpdated: '29 Juli 2026' 
  },
  { 
    id: 2, 
    placeName: 'Apotek K24 Sudirman', 
    address: 'Jl. Jend. Sudirman Kav. 21',
    rating: 4.2,
    totalReviews: 89,
    status: 'Menunggu Verifikasi', 
    lastUpdated: '28 Juli 2026' 
  },
  { 
    id: 3, 
    placeName: 'RS Umum Daerah Pusat', 
    address: 'Jl. Kesehatan No. 1, Bandung',
    rating: 4.5,
    totalReviews: 532,
    status: 'Dipantau', 
    lastUpdated: '25 Juli 2026' 
  },
];

export default function SurveysPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Survei Lokasi Maps</h3>
          <p className="text-sm text-gray-500 mt-1">Kelola dan pantau data lokasi dari Google Maps.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Tambah Lokasi Baru
        </button>
      </div>

      {/* Tabel Data Lokasi Maps */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
              <th className="px-6 py-4 font-medium">Nama Lokasi & Alamat</th>
              <th className="px-6 py-4 font-medium">Rating / Ulasan</th>
              <th className="px-6 py-4 font-medium">Status Pemantauan</th>
              <th className="px-6 py-4 font-medium">Update Terakhir</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {dummyMapsSurveys.map((survey) => (
              <tr key={survey.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{survey.placeName}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{survey.address}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium text-gray-900">{survey.rating}</span>
                    <span className="text-gray-500 text-xs">({survey.totalReviews})</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${survey.status === 'Dipantau' ? 'bg-green-100 text-green-700' : 
                      survey.status === 'Menunggu Verifikasi' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'}`}>
                    {survey.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{survey.lastUpdated}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Detail
                  </button>
                  <a href="#" className="text-gray-500 hover:text-gray-700 font-medium" title="Buka di Google Maps">
                    G-Maps ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}