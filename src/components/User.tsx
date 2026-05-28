"use client";

import React, { useState } from 'react';
import { useAuth } from '@/config/AuthContext';

// 1. Define the interface for the medical data you expect from NestJS
interface User {
  _id: string;
  name: string;
  dni: string;
  authId: string;
}

export function UserComponent() {
  const { token, loading } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (): Promise<void> => {
    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 2. Attach the token securely in the Authorization header
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data: User = await response.json();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (loading) return <p>Loading authorization...</p>;

  return (
    <div className="p-4 border rounded shadow-sm">
      <button 
        onClick={fetchProfile}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Fetch Patient Profile
      </button>

      {error && <p className="text-red-500 mt-2">Error: {error}</p>}

      {profile && (
        <div className="mt-4">
          <h3 className="font-bold text-lg">Patient Data (Protected)</h3>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>MRN:</strong> {profile.dni}</p>
          <p><strong>Next Visit:</strong> {profile.authId}</p>
        </div>
      )}
    </div>
  );
}
