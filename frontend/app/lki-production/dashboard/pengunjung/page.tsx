// frontend/app/lki-production/dashboard/pengunjung/page.tsx
'use client';

import React, { useState } from 'react';

export default function LKIPengunjungPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. STATE UNTUK DATA TABEL
  const [dataAcara, setDataAcara] = useState([
    {
      id: 1,
      nama: "Pernikahan Bpk. Budi",
      lokasi: "Graha Cakrawala",
      waktu: "10 Ags 2026 (08:00 - 15:00)",
      statusAcara: "selesai",
      rating: "negatif",
      keluhan: "Kabel mic sering terputus (kresek-kresek) saat acara inti.",
      sumber: "Input Manual (WhatsApp)",
      terkunci: false
    },
    {
      id: 2,
      nama: "Konser Pensi SMAN 1",
      lokasi: "Lapangan Utama SMAN 1",
      waktu: "28 Ags 2026 (18:00 - 23:00)",
      statusAcara: "berlangsung",
      rating: "positif",
      keluhan: "Secara umum memuaskan, namun tim loading alat sedikit terlambat datang.",
      sumber: "Input Manual (WhatsApp)",
      terkunci: true
    },
    {
      id: 3,
      nama: "Seminar Nasional Tech 2026",
      lokasi: "Hotel Harris",
      waktu: "25 Ags 2026 (09:00 - 12:00)",
      statusAcara: "selesai",
      rating: "", 
      keluhan: "",
      sumber: "",
      terkunci: false
    }
  ]);

  // 2. STATE UNTUK MENAMPUNG INPUT FORM MODAL (Rating dihapus)
  const [formNamaAcara, setFormNamaAcara] = useState("");
  const [formKeluhan, setFormKeluhan] = useState("");

  // 3. FUNGSI UNTUK MENYIMPAN DATA BARU
  const handleSimpan = () => {
    // Validasi rating dihapus, cukup cek nama acara dan keluhan
    if (!formNamaAcara || !formKeluhan) {
      alert("Isi nama acara dan detail pesan terlebih dahulu!");
      return;
    }

    const acaraBaru = {
      id: Date.now(), 
      nama: formNamaAcara,
      lokasi: "-", 
      waktu: "-", 
      statusAcara: "selesai",
      rating: "", // Kosongkan karena tidak diinput
      keluhan: formKeluhan,
      sumber: "Input Manual (WhatsApp)",
      terkunci: false
    };

    setDataAcara([acaraBaru, ...dataAcara]); 
    setIsModalOpen(false);     
    
    // Reset state form
    setFormNamaAcara("");
    setFormKeluhan("");
  };

  // 4. FUNGSI DOWNLOAD & RESET LAPORAN
  const handleDownloadLaporan = () => {
    alert("Laporan PDF Kelola Data Pengunjung & Komplain berhasil di-download! Data di dashboard akan dikosongkan.");
    setDataAcara([]); 
  };

  return (
    <div className="space-y-6 relative">
      
      {/* ================= HEADER UTAMA ================= */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Data Pengunjung & Komplain LKI</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau status acara, rating klien, serta tindak lanjuti kasus komplain lapangan.</p>
        </div>
      </div>

      {/* ================= TABEL UTAMA ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 overflow-hidden mt-6">
        
        {/* Header Tabel & Kumpulan Tombol */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Daftar Evaluasi Acara</h2>
            <p className="text-gray-500 text-sm">Data masuk dari sistem dan input manual (via WhatsApp).</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3">
            <button 
              onClick={handleDownloadLaporan}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Laporan PDF
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#E33333] hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Input Respon Klien (Manual)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-4 font-medium w-1/4">Info & Status Acara</th>
                <th className="px-4 pb-4 font-medium w-1/3">Rating & Keluhan Klien</th>
                {/* Kolom Status Penanganan Dihapus */}
                <th className="px-4 pb-4 font-medium w-64">Input Bukti Lapangan</th>
                <th className="pl-4 pb-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              
              {dataAcara.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400 font-medium">
                    Belum ada data evaluasi atau komplain baru untuk periode ini.
                  </td>
                </tr>
              ) : (
                dataAcara.map((acara) => (
                  <tr key={acara.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-5 pr-4 align-top">
                      <p className="font-bold text-gray-900 text-base">{acara.nama}</p>
                      <div className="text-xs text-gray-500 mt-1.5 space-y-1">
                        <p className="flex items-center gap-1.5"><span className="text-red-500">📍</span> {acara.lokasi}</p>
                        <p className="flex items-center gap-1.5"><span className="text-blue-500">🕒</span> {acara.waktu}</p>
                      </div>
                      {acara.statusAcara === 'selesai' ? (
                        <span className="inline-block mt-3 bg-green-100 text-green-800 px-2.5 py-1 rounded-md text-[11px] font-bold border border-green-200">
                          ✓ Acara Selesai
                        </span>
                      ) : (
                        <span className="inline-block mt-3 bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-md text-[11px] font-bold border border-yellow-200 animate-pulse">
                          ⏳ Sedang Berlangsung
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-5 align-top">
                      {/* {acara.rating === 'positif' && (
                        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold mb-2 border border-blue-100">👍 Respon Positif</span>
                      )}
                      {acara.rating === 'negatif' && (
                        <span className="inline-block bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-bold mb-2 border border-red-100">👎 Respon Negatif</span>
                      )} */}
                      {/* Badge "Menunggu Respon" kita munculkan jika tidak ada keluhan dan tidak ada rating */}
                      {acara.rating === '' && acara.keluhan === '' && (
                        <span className="inline-block bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold mb-2 border border-gray-200">Menunggu Respon</span>
                      )}
                      <p className="font-semibold text-gray-900">{acara.keluhan || "-"}</p>
                      {acara.sumber && <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Sumber: {acara.sumber}</p>}
                    </td>
                    
                    {/* TD Status Penanganan Dihapus */}

                    <td className="px-4 py-5 align-top">
                      {acara.terkunci ? (
                        <span className="text-gray-500 text-xs italic">Bukti telah diunggah dan disetujui.</span>
                      ) : (acara.rating || acara.keluhan) ? (
                        <div className="flex flex-col gap-2">
                          <input type="text" placeholder="Catatan perbaikan..." className="w-full border border-gray-300 rounded-lg p-2 text-xs focus:ring-[#E33333] focus:border-[#E33333]" />
                          <input type="file" className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer" />
                        </div>
                      ) : (
                         <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="pl-4 py-5 text-right align-top">
                      {/* Tombol aksi akan menyala jika ada keluhan ATAU rating, dan tidak terkunci */}
                      {acara.terkunci || (!acara.rating && !acara.keluhan) ? (
                        <button className="text-gray-400 bg-gray-100 cursor-not-allowed font-semibold py-2 px-4 rounded-lg text-[13px]" disabled>
                          Terkunci
                        </button>
                      ) : (
                        <button className="bg-[#E33333] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-[13px] shadow-sm">
                          Kirim Bukti
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL INPUT MANUAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Input Respon Klien</h3>
                <p className="text-xs text-gray-500 mt-1">Masukkan hasil wawancara via WhatsApp / Chat</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Acara Selesai</label>
                <input 
                  type="text"
                  value={formNamaAcara}
                  onChange={(e) => setFormNamaAcara(e.target.value)}
                  placeholder="Ketik nama acara secara manual..."
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-[#E33333] focus:border-[#E33333]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Detail Pesan dari Klien</label>
                <textarea 
                  value={formKeluhan}
                  onChange={(e) => setFormKeluhan(e.target.value)}
                  rows={4} 
                  placeholder="Ketik persis seperti yang disampaikan klien di WhatsApp..."
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-[#E33333] focus:border-[#E33333]"
                ></textarea>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSimpan} 
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#E33333] rounded-xl hover:bg-red-700 shadow-sm transition-colors"
              >
                Simpan ke Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}