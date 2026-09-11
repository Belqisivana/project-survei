// frontend/app/ayana/dashboard/pengunjung/page.tsx
'use client';

import React, { useState } from 'react';

export default function AyanaPengunjungPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataPesanan, setDataPesanan] = useState([
    {
      id: 1,
      nama: "Bpk. Andi - Spanduk 3x4m",
      lokasi: "Outlet Cabang Utama",
      waktu: "10 Sep 2026",
      statusAcara: "selesai",
      keluhan: "Warna cetakan merahnya agak pudar, tidak sesuai file desain.",
      sumber: "Input Manual (WhatsApp)",
      statusPenanganan: "ditinjau",
      terkunci: false
    },
    {
      id: 2,
      nama: "PT. Maju Jaya - 500 Lembar Brosur",
      lokasi: "Pemesanan Online",
      waktu: "08 Sep 2026",
      statusAcara: "selesai",
      keluhan: "",
      sumber: "",
      statusPenanganan: "belum",
      terkunci: false
    }
  ]);

  const [formNamaPesanan, setFormNamaPesanan] = useState("");
  const [formKeluhan, setFormKeluhan] = useState("");

  const handleSimpan = () => {
    if (!formNamaPesanan || !formKeluhan) {
      alert("Isi nama pelanggan/pesanan dan detail komplain terlebih dahulu!");
      return;
    }

    const pesananBaru = {
      id: Date.now(), 
      nama: formNamaPesanan,
      lokasi: "-", 
      waktu: "-", 
      statusAcara: "selesai",
      keluhan: formKeluhan,
      sumber: "Input Manual (WhatsApp)",
      statusPenanganan: "ditinjau",
      terkunci: false
    };

    setDataPesanan([pesananBaru, ...dataPesanan]); 
    setIsModalOpen(false);     
    setFormNamaPesanan("");
    setFormKeluhan("");
  };

  // const handleDownloadLaporan = () => {
  //   alert("Laporan PDF Komplain Ayana berhasil di-download! Data di dashboard akan dikosongkan.");
  //   setDataPesanan([]); 
  // };

  // FUNGSI BARU UNTUK DOWNLOAD CSV
  const handleDownloadCSV = () => {
    alert("Data berhasil diekspor ke format CSV! Siap dibuka di Excel.");
    // CSV biasanya cuma export, jadi aku nggak bikin reset data di sini. 
    // Kalau mau reset, admin tinggal pakai tombol Download PDF aja.
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Komplain Pelanggan Ayana</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau kualitas cetakan dan tindak lanjuti komplain pelanggan.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 overflow-hidden mt-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Daftar Evaluasi Pesanan Cetak</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3">
            {/* TOMBOL DOWNLOAD CSV BARU */}
            <button onClick={handleDownloadCSV} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download CSV
            </button>
            
            {/* <button onClick={handleDownloadLaporan} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download PDF
            </button> */}
            
            <button onClick={() => setIsModalOpen(true)} className="bg-[#E33333] hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              Input Komplain (Manual)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-4 font-medium w-1/4">Info Pelanggan & Pesanan</th>
                <th className="px-4 pb-4 font-medium w-1/3">Detail Keluhan Klien</th>
                <th className="px-4 pb-4 font-medium">Status Penanganan</th>
                <th className="pl-4 pb-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {dataPesanan.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-400 font-medium">Belum ada data komplain cetakan untuk periode ini.</td></tr>
              ) : (
                dataPesanan.map((pesanan) => (
                  <tr key={pesanan.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-5 pr-4 align-top">
                      <p className="font-bold text-gray-900 text-base">{pesanan.nama}</p>
                      <div className="text-xs text-gray-500 mt-1.5 space-y-1">
                        <p>📍 {pesanan.lokasi}</p>
                        <p>🕒 {pesanan.waktu}</p>
                      </div>
                    </td>
                    <td className="px-4 py-5 align-top">
                      {pesanan.keluhan === '' && <span className="inline-block bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold mb-2 border border-gray-200">Menunggu Respon</span>}
                      <p className="font-semibold text-gray-900">{pesanan.keluhan || "-"}</p>
                      {pesanan.sumber && <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Sumber: {pesanan.sumber}</p>}
                    </td>
                    <td className="px-4 py-5 align-top">
                      {pesanan.terkunci ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold block text-center w-full border border-green-200">Selesai Dicetak Ulang</span>
                      ) : pesanan.keluhan ? (
                         <select className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-lg block w-full p-2 font-semibold">
                          <option value="ditinjau">Sedang Diperiksa Tim Cetak</option>
                        </select>
                      ) : <span className="text-gray-400 text-xs">-</span>}
                    </td>
                    <td className="pl-4 py-5 text-right align-top">
                      {pesanan.terkunci || !pesanan.keluhan ? (
                        <button className="text-gray-400 bg-gray-100 cursor-not-allowed font-semibold py-2 px-4 rounded-lg text-[13px]" disabled>Terkunci</button>
                      ) : (
                        <button className="bg-[#E33333] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-[13px] shadow-sm">Kirim Bukti Revisi</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Input Komplain Manual</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Pelanggan & Pesanan</label>
                <input type="text" value={formNamaPesanan} onChange={(e) => setFormNamaPesanan(e.target.value)} placeholder="Contoh: Bpk. Budi - Spanduk..." className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-[#E33333]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Detail Keluhan Cetakan</label>
                <textarea value={formKeluhan} onChange={(e) => setFormKeluhan(e.target.value)} rows={4} placeholder="Ketik komplain dari WhatsApp..." className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-[#E33333]"></textarea>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100">Batal</button>
              <button onClick={handleSimpan} className="px-5 py-2.5 text-sm font-bold text-white bg-[#E33333] rounded-xl hover:bg-red-700">Simpan ke Dashboard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}