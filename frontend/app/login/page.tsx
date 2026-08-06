// frontend/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UnifiedLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      if (!email || !password) {
        setErrorMsg('Email dan password tidak boleh kosong!');
        setIsLoading(false);
        return;
      }

      // --- LOGIKA SMART ROUTING (MEMILAH CABANG BERDASARKAN EMAIL) ---
      const userEmail = email.toLowerCase();

      if (userEmail.includes('@ayana')) {
        // 1. Cabang Ayana
        if (userEmail.includes('superadmin')) {
          router.push('/superadmin');
        } else {
          router.push('/admin');
        }
      } 
      else if (userEmail.includes('@lkiproduction') || userEmail.includes('pro')) {
        // 2. Cabang LKI Production
        router.push('/lki-production/dashboard');
      } 
      else if (userEmail.includes('@lkb') || userEmail.includes('lapis')) {
        // 3. Cabang Lapis Kukus Balitar
        router.push('/lkb/dashboard');
      } 
      else {
        // Jika email tidak dikenali
        setErrorMsg('Domain email tidak dikenali di sistem kami!');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        
        {/* LOGO PORTAL TERPUSAT */}
        <div className="text-center mb-8">
          <div className="h-16 mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {/* Sementara pakai logo utama, nanti bisa disesuaikan */}
            <img 
              src="/logo-lki-group2.png" 
              alt="Portal Login Terpusat" 
              className="max-h-full max-w-[180px] object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#000000]">Workspace Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Satu akses untuk semua cabang industri</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center font-medium">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@cabang.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3366E3] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3366E3] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-[#3366E3] focus:ring-[#3366E3]" />
              <span className="text-gray-600 font-medium">Remember me</span>
            </label>
            <Link href="/login/forgot-password" className="text-[#3366E3] hover:underline font-semibold">
              Lupa Password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#3366E3] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center shadow-md disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

      </div>
    </div>
  );
}