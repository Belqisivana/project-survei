// frontend/app/admin/profile/page.tsx
import React from 'react';
import ProfileCard from '@/components/ProfileCard';

export default function AdminProfilePage() {
  return (
    <div className="flex justify-center md:justify-start">
      {/* Panggil komponennya dengan nama yang berbeda */}
      <ProfileCard name="Budi (Admin)" />
    </div>
  );
}