import ClientAuthContainer from '@/components/ClientAuthContainer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Welcome to Salubritas Clinic Pro</h1>
      {/* This renders safely with zero hydration errors */}
      <ClientAuthContainer />
    </main>
  );
}
