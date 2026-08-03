// frontend/app/login/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword || !confirmPassword) {
      setErrorMsg('Semua kolom password harus diisi!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Konfirmasi password tidak cocok!');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password baru minimal harus 6 karakter!');
      return;
    }

    setIsLoading(true);

    // Simulasi pengiriman data password baru ke backend FastAPI
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        
        {/* Header / Logo Industri */}
        <div className="text-center mb-8">
          <div className="h-16 mx-auto mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src="/logo-ayn-blt.png" // Sesuaikan dengan nama file gambar logomu di folder public
              alt="Logo Industri" 
              className="max-h-full max-w-[180px] object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#000000]">Buat Password Baru</h1>
          <p className="text-gray-500 text-sm mt-1">
            Silakan masukkan password baru untuk akunmu di bawah ini.
          </p>
        </div>

        {/* Kondisi Jika Password Berhasil Diubah */}
        {isSuccess ? (
          <div className="space-y-6 text-center">
            <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm font-medium">
              ✅ Password baru berhasil disimpan! Silakan login kembali menggunakan password barumu.
            </div>
            
            <button 
              onClick={() => router.push('/login')}
              className="w-full bg-[#3366E3] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md"
            >
              Menuju Halaman Login
            </button>
          </div>
        ) : (
          /* Form Input Password Baru */
          <form onSubmit={handleResetPassword} className="space-y-5">
            
            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                Password Baru
              </label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3366E3] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                Konfirmasi Password Baru
              </label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3366E3] focus:border-transparent transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#3366E3] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                'Simpan Password Baru'
              )}
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="text-sm text-gray-500 hover:text-[#3366E3] font-semibold transition-colors">
                ← Kembali ke halaman Login
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}