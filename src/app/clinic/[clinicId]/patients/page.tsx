type Props = {
  params: Promise<{ clinicId: string }>;
};

export default async function PatientsPage({ params }: Props) {
  const { clinicId } = await params;

  return (
    <div className="relative z-50 min-h-screen bg-white p-8 text-black">
      <h1 className="text-2xl font-bold">Clinic ID: {clinicId}</h1>
      <p className="mt-2 text-lg">Patient List</p>
    </div>
  );
}