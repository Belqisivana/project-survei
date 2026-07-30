// frontend/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Otomatis melempar siapa saja yang mengakses '/' langsung ke '/login'
  redirect('/login');
}