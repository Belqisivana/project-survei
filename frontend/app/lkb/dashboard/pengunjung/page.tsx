// frontend/app/lkb/dashboard/pengunjung/page.tsx
'use client';

import React, { useState } from 'react';

export default function LKBPengunjungPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dataPembelian, setDataPembelian] = useState([
    {
      id: 1,
      nama: "Ibu Siska - 5 Box Original",
      lokasi: "Outlet Suhat",
      waktu: "10 Sep 2026",
      statusAcara: "selesai",
      keluhan: "Pelayanan di kasir agak lambat, antrean panjang tidak diatur.",
      sumber: "Input Manual (WhatsApp)",
      statusPenanganan: "ditinjau",
      terkunci: false
    },
    {
      id: 2,
      nama: "Kak Rio - Pre-order 10 Box Choco",
      lokasi: "Delivery Order",
      waktu: "09 Sep 2026",
      statusAcara: "selesai",
      keluhan: "",
      sumber: "",
      statusPenanganan: "belum",
      terkunci: false
    }
  ]);

  const [formNamaPembelian, setFormNamaPembelian] = useState("");
  const [formKeluhan, setFormKeluhan] = useState("");

  const handleSimpan = () => {
    if (!formNamaPembelian || !formKeluhan) {
      alert("Isi nama pelanggan/pembelian dan detail komplain terlebih dahulu!");
      return;
    }

    const pembelianBaru = {
      id: Date.now(), 
      nama: formNamaPembelian,
      lokasi: "-", 
      waktu: "-", 
      statusAcara: "selesai",
      keluhan: formKeluhan,
      sumber: "Input Manual (WhatsApp)",
      statusPenanganan: "ditinjau",
      terkunci: false
    };

    setDataPembelian([pembelianBaru, ...dataPembelian]); 
    setIsModalOpen(false);     
    setFormNamaPembelian("");
    setFormKeluhan("");
  };

  const handleDownloadLaporan = () => {
    alert("Laporan CSV Komplain LKB berhasil di-download! Data di dashboard akan dikosongkan.");
    setDataPembelian([]); 
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Data Pelanggan LKB</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau kepuasan pelanggan outlet dan tindak lanjuti komplain.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 overflow-hidden mt-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Daftar Evaluasi Layanan Outlet</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3">
            <button onClick={handleDownloadLaporan} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              Download Laporan CSV
            </button>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#E33333] hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              Input Respon Pelanggan
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-gray-500 text-sm border-b border-gray-200">
                <th className="pb-4 pr-4 font-medium w-1/4">Info Pembelian</th>
                <th className="px-4 pb-4 font-medium w-1/3">Detail Keluhan</th>
                <th className="px-4 pb-4 font-medium">Status Penanganan</th>
                <th className="pl-4 pb-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {dataPembelian.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-400 font-medium">Belum ada data evaluasi outlet baru.</td></tr>
              ) : (
                dataPembelian.map((beli) => (
                  <tr key={beli.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-5 pr-4 align-top">
                      <p className="font-bold text-gray-900 text-base">{beli.nama}</p>
                      <div className="text-xs text-gray-500 mt-1.5 space-y-1">
                        <p>📍 {beli.lokasi}</p>
                        <p>🕒 {beli.waktu}</p>
                      </div>
                    </td>
                    <td className="px-4 py-5 align-top">
                      {beli.keluhan === '' && <span className="inline-block bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold mb-2 border border-gray-200">Menunggu Respon</span>}
                      <p className="font-semibold text-gray-900">{beli.keluhan || "-"}</p>
                      {beli.sumber && <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Sumber: {beli.sumber}</p>}
                    </td>
                    <td className="px-4 py-5 align-top">
                      {beli.terkunci ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold block text-center w-full border border-green-200">Selesai (Tervalidasi SPV)</span>
                      ) : beli.keluhan ? (
                         <select className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-lg block w-full p-2 font-semibold">
                          <option value="ditinjau">Sedang Dicek Supervisor</option>
                        </select>
                      ) : <span className="text-gray-400 text-xs">-</span>}
                    </td>
                    <td className="pl-4 py-5 text-right align-top">
                      {beli.terkunci || !beli.keluhan ? (
                        <button className="text-gray-400 bg-gray-100 cursor-not-allowed font-semibold py-2 px-4 rounded-lg text-[13px]" disabled>Terkunci</button>
                      ) : (
                        <button className="bg-[#E33333] hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-[13px] shadow-sm">Validasi Penanganan</button>
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
                <h3 className="text-lg font-bold text-gray-900">Input Keluhan Pelanggan</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Pelanggan & Detail Order</label>
                <input type="text" value={formNamaPembelian} onChange={(e) => setFormNamaPembelian(e.target.value)} placeholder="Contoh: Ibu Siska - 2 Box..." className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-[#E33333]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Detail Keluhan Layanan</label>
                <textarea value={formKeluhan} onChange={(e) => setFormKeluhan(e.target.value)} rows={4} placeholder="Ketik komplain dari WhatsApp atau form CS..." className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-[#E33333]"></textarea>
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