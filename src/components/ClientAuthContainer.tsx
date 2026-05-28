'use client';

import dynamic from 'next/dynamic';

const AuthStatus = dynamic(() => import('./AuthStatus'), {
  ssr: false,
  loading: () => <div className="h-10 w-32 animate-pulse bg-gray-200 rounded-lg" />
});

export default function ClientAuthContainer() {
  return <AuthStatus />;
}
