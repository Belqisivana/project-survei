import React from 'react';

export default function SuperadminManageUserPage() {
  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Akun Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola hak akses, tambah, atau hapus akun admin untuk seluruh cabang.</p>
      </div>

      {/* Kartu Tabel */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
        
        {/* Header di dalam Kartu (Menyamakan dengan Master Dashboard) */}
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daftar Admin Cabang</h2>
            <p className="text-gray-500 text-sm mt-1">Daftar pengguna aktif yang memiliki akses ke sistem dashboard.</p>
          </div>
          <button className="bg-[#3366E3] hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm">
            <span className="text-lg leading-none">+</span> Tambah Admin Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-6 font-medium">Nama Pengguna</th>
                <th className="px-6 pb-4 font-medium">Email</th>
                <th className="px-6 pb-4 font-medium">Cabang Akses</th>
                <th className="px-6 pb-4 font-medium">Status</th>
                <th className="pl-6 pb-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-6 font-bold text-gray-900">Admin Ayana 1</td>
                <td className="px-6 py-5 text-gray-500">admin@ayana.com</td>
                <td className="px-6 py-5">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold">Ayana Printing</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-green-600 font-semibold">Aktif</span>
                </td>
                <td className="pl-6 py-5 text-right font-bold text-[13px]">
                  <button className="text-gray-900 hover:text-blue-600 transition-colors mr-4">Edit</button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">Nonaktifkan</button>
                </td>
              </tr>

              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-5 pr-6 font-bold text-gray-900">Admin LKB Pusat</td>
                <td className="px-6 py-5 text-gray-500">admin@lkb.com</td>
                <td className="px-6 py-5">
                  <span className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg text-xs font-bold">LKB</span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-green-600 font-semibold">Aktif</span>
                </td>
                <td className="pl-6 py-5 text-right font-bold text-[13px]">
                  <button className="text-gray-900 hover:text-blue-600 transition-colors mr-4">Edit</button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">Nonaktifkan</button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}