// frontend/app/superadmin/users/page.tsx
import React from 'react';

const dummyUsers = [
  { id: 1, name: 'Bosse', email: 'bosse@superadmin.com', role: 'Superadmin', status: 'Aktif', lastLogin: 'Baru saja' },
  { id: 2, name: 'Andi Pratama', email: 'andi@admin.com', role: 'Admin', status: 'Aktif', lastLogin: '2 jam lalu' },
  // { id: 3, name: 'Budi Santoso', email: 'budi@admin.com', role: 'Admin', status: 'Aktif', lastLogin: '1 hari lalu' },
  // { id: 4, name: 'Siti Rahma', email: 'siti@admin.com', role: 'Admin', status: 'Nonaktif', lastLogin: '2 minggu lalu' },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#000000]">Kelola Pengguna</h3>
          <p className="text-sm text-gray-500 mt-1">Atur hak akses, tambah, atau hapus akun Admin.</p>
        </div>
        <button className="bg-[#3366E3] hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          + Tambah Pengguna
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 font-semibold">Nama & Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Login Terakhir</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {dummyUsers.map((user) => (
                <tr key={user.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-[#000000]">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                      ${user.role === 'Superadmin' ? 'bg-[#000000] text-white' : 'bg-blue-100 text-blue-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Aktif' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="font-medium text-gray-700">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button className="text-gray-400 hover:text-[#000000] font-semibold transition-colors" title="Edit Pengguna">
                      Edit
                    </button>
                    {/* Cegah superadmin menghapus dirinya sendiri */}
                    {user.role !== 'Superadmin' && (
                      <button className="text-gray-400 hover:text-red-500 font-semibold transition-colors" title="Blokir/Hapus">
                        Hapus
                      </button>
                    )}
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