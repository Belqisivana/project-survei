// frontend/app/superadmin/settings/page.tsx
import React from 'react';
import ProfileCard from '@/components/ProfileCard'; // Import komponennya

export default function SettingsPage() {
  return (
    <div className="flex justify-center md:justify-start">
      {/* Panggil komponennya dan masukkan nama Superadmin */}
      <ProfileCard name="Udean (Superadmin)" />
    </div>
  );
}