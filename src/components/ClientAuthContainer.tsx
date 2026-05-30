'use client';

import dynamic from 'next/dynamic';

const AuthStatus = dynamic(() => import('./AuthStatus'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex justify-center py-2">
      <div className="h-10 w-32 animate-pulse bg-gray-200 rounded-lg" />
    </div>
  )
});

export default function ClientAuthContainer() {
  return <AuthStatus />;
}
