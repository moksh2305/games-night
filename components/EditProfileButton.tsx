'use client';

import { useState } from 'react';
import EditProfileModal from './EditProfileModal';

export default function EditProfileButton({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="btn btn-secondary" 
        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
      >
        Edit Profile
      </button>

      {isOpen && <EditProfileModal user={user} onClose={() => setIsOpen(false)} />}
    </>
  );
}
