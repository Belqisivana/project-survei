// // frontend/app/lki-production/dashboard/acara-mendatang/page.tsx
// 'use client';

// import React, { useState } from 'react';

// export default function LKIAcaraMendatangPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // 1. STATE UNTUK DATA TABEL
//   const [jadwalAcara, setJadwalAcara] = useState([
//     {
//       id: 1,
//       namaAcara: "Konser Musik Indie Lokal",
//       klien: "BEM Universitas Brawijaya",
//       tanggal: "15 Sep 2026",
//       waktu: "15:00 - 23:00 WIB",
//       lokasi: "Lapangan Rampal, Malang",
//       kebutuhan: "Sound System 15kW, Rigging, Lighting",
//       status: "Loading H-1",
//       statusColor: "bg-blue-100 text-blue-800 border-blue-200"
//     },
//     {
//       id: 2,
//       namaAcara: "Pernikahan Amanda & Reza",
//       klien: "Amanda Wedding Organizer",
//       tanggal: "20 Sep 2026",
//       waktu: "08:00 - 14:00 WIB",
//       lokasi: "Gedung Kartini, Malang",
//       kebutuhan: "Paket Wedding Standard, 4 Mic Wireless",
//       status: "Persiapan Alat",
//       statusColor: "bg-yellow-100 text-yellow-800 border-yellow-200"
//     },
//     {
//       id: 3,
//       namaAcara: "Seminar Nasional Tech Future",
//       klien: "TechDev Malang",
//       tanggal: "28 Sep 2026",
//       waktu: "09:00 - 15:00 WIB",
//       lokasi: "Hotel Savana Ballroom",
//       kebutuhan: "Sound Indoor, Screen, Proyektor",
//       status: "Menunggu DP",
//       statusColor: "bg-orange-100 text-orange-800 border-orange-200"
//     }
//   ]);

//   // 2. STATE UNTUK FORM INPUT
//   const [form, setForm] = useState({
//     namaAcara: "",
//     klien: "",
//     tanggal: "",
//     waktu: "",
//     lokasi: "",
//     kebutuhan: "",
//     status: "Menunggu DP"
//   });

//   // Fungsi untuk update nilai form
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 3. FUNGSI MENYIMPAN DATA BARU
//   const handleSimpan = () => {
//     // Validasi sederhana, pastikan semua diisi
//     if (!form.namaAcara || !form.klien || !form.tanggal || !form.lokasi) {
//       alert("Harap lengkapi Nama Acara, Klien, Tanggal, dan Lokasi!");
//       return;
//     }

//     // Tentukan warna berdasarkan status yang dipilih
//     let warnaStatus = "bg-gray-100 text-gray-800 border-gray-200";
//     if (form.status === "Menunggu DP") warnaStatus = "bg-orange-100 text-orange-800 border-orange-200";
//     if (form.status === "Persiapan Alat") warnaStatus = "bg-yellow-100 text-yellow-800 border-yellow-200";
//     if (form.status === "Loading H-1") warnaStatus = "bg-blue-100 text-blue-800 border-blue-200";
//     if (form.status === "Siap Eksekusi") warnaStatus = "bg-green-100 text-green-800 border-green-200";

//     // Format tanggal statis untuk contoh (bisa disesuaikan formatnya jika pakai type="date")
//     // Misal: "2026-10-15" menjadi "15 Okt 2026" bisa diformat, tapi kita pakai input text saja biar mudah
    
//     const acaraBaru = {
//       id: Date.now(), // Generate ID unik sementara
//       namaAcara: form.namaAcara,
//       klien: form.klien,
//       tanggal: form.tanggal,
//       waktu: form.waktu || "-",
//       lokasi: form.lokasi,
//       kebutuhan: form.kebutuhan || "-",
//       status: form.status,
//       statusColor: warnaStatus
//     };

//     // Masukkan data baru ke paling atas tabel
//     setJadwalAcara([acaraBaru, ...jadwalAcara]);
    
//     // Tutup modal dan reset form
//     setIsModalOpen(false);
//     setForm({
//       namaAcara: "",
//       klien: "",
//       tanggal: "",
//       waktu: "",
//       lokasi: "",
//       kebutuhan: "",
//       status: "Menunggu DP"
//     });
//   };

//   return (
//     <div className="space-y-6 relative">
      
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Jadwal Acara Mendatang</h1>
//           <p className="text-gray-500 text-sm mt-1">Pantau jadwal event, lokasi loading, dan kesiapan alat tim lapangan LKI.</p>
//         </div>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-[#E33333] hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center gap-2 shadow-sm whitespace-nowrap"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
//           Tambah Jadwal Baru
//         </button>
//       </div>

//       {/* ================= TABEL JADWAL ACARA ================= */}
//       <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mt-6">
//         <div className="px-6 py-5 border-b border-gray-100 bg-white">
//           <h2 className="text-lg font-bold text-gray-900">Daftar Event Mendatang</h2>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[1000px]">
//             <thead>
//               <tr className="text-gray-500 text-sm border-b border-gray-200 bg-gray-50">
//                 <th className="px-6 py-4 font-medium w-1/4">Nama Acara & Klien</th>
//                 <th className="px-6 py-4 font-medium">Tanggal & Waktu</th>
//                 <th className="px-6 py-4 font-medium w-1/4">Lokasi Venue</th>
//                 <th className="px-6 py-4 font-medium">Kebutuhan Alat</th>
//                 <th className="px-6 py-4 font-medium">Status Persiapan</th>
//                 <th className="px-6 py-4 font-medium text-right">Aksi</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm text-gray-700">
              
//               {jadwalAcara.map((acara) => (
//                 <tr key={acara.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-5 align-top">
//                     <p className="font-bold text-gray-900 text-base">{acara.namaAcara}</p>
//                     <p className="text-gray-500 text-xs mt-1">Klien: {acara.klien}</p>
//                   </td>
//                   <td className="px-6 py-5 align-top">
//                     <p className="font-semibold text-gray-900 flex items-center gap-1.5">
//                       <span className="text-red-500">📅</span> {acara.tanggal}
//                     </p>
//                     <p className="text-gray-500 text-xs mt-1 flex items-center gap-1.5">
//                       <span className="text-blue-500">🕒</span> {acara.waktu}
//                     </p>
//                   </td>
//                   <td className="px-6 py-5 align-top font-medium text-gray-800">
//                     <span className="flex items-start gap-1.5">
//                       <span className="text-green-600 mt-0.5">📍</span> {acara.lokasi}
//                     </span>
//                   </td>
//                   <td className="px-6 py-5 align-top text-gray-600">{acara.kebutuhan}</td>
//                   <td className="px-6 py-5 align-top">
//                     <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${acara.statusColor} whitespace-nowrap`}>
//                       {acara.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-5 text-right align-top">
//                     <button className="text-gray-500 hover:text-[#E33333] font-semibold transition-colors text-[13px] mr-3">Edit</button>
//                     <button className="text-[#E33333] hover:underline font-semibold transition-colors text-[13px]">Detail</button>
//                   </td>
//                 </tr>
//               ))}

//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ================= MODAL TAMBAH JADWAL ================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
//             {/* Header Modal */}
//             <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Tambah Jadwal Event Baru</h3>
//                 <p className="text-xs text-gray-500 mt-1">Masukkan data acara dan kebutuhan alat ke dalam sistem.</p>
//               </div>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//               </button>
//             </div>

//             {/* Body Form */}
//             <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Acara</label>
//                   <input type="text" name="namaAcara" value={form.namaAcara} onChange={handleChange} placeholder="Contoh: Konser Musik Indie" className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-[#E33333] focus:border-[#E33333]" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Klien / Instansi</label>
//                   <input type="text" name="klien" value={form.klien} onChange={handleChange} placeholder="Contoh: BEM UB" className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-[#E33333] focus:border-[#E33333]" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tanggal Acara</label>
//                   <input type="text" name="tanggal" value={form.tanggal} onChange={handleChange} placeholder="Contoh: 15 Okt 2026" className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-[#E33333] focus:border-[#E33333]" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">Waktu Pelaksanaan</label>
//                   <input type="text" name="waktu" value={form.waktu} onChange={handleChange} placeholder="Contoh: 15:00 - 23:00 WIB" className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-[#E33333] focus:border-[#E33333]" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lokasi / Venue</label>
//                 <input type="text" name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Contoh: Lapangan Rampal, Malang" className="w-full border border-gray-300 rounded-xl p-2.5 text-sm focus:ring-[#E33333] focus:border-[#E33333]" />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kebutuhan Alat / Sound</label>
//                 <textarea name="kebutuhan" value={form.kebutuhan} onChange={handleChange} rows={2} placeholder="Sebutkan ringkasan alat yang disewa..." className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-[#E33333] focus:border-[#E33333]"></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status Persiapan Saat Ini</label>
//                 <select name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-2.5 text-sm font-medium focus:ring-[#E33333] focus:border-[#E33333]">
//                   <option value="Menunggu DP">Menunggu DP</option>
//                   <option value="Persiapan Alat">Persiapan Alat</option>
//                   <option value="Loading H-1">Loading H-1</option>
//                   <option value="Siap Eksekusi">Siap Eksekusi</option>
//                 </select>
//               </div>

//             </div>

//             {/* Footer Modal */}
//             <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
//               <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
//                 Batal
//               </button>
//               <button onClick={handleSimpan} className="px-5 py-2.5 text-sm font-bold text-white bg-[#E33333] rounded-xl hover:bg-red-700 shadow-sm transition-colors">
//                 Simpan Jadwal
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }