type Props = {
  params: Promise<{ clinicId: string }>;
};

export default async function AppointmentsPage({ params }: Props) {
  const { clinicId } = await params;

  return (
    <div>
      <h1>Clinic ID: {clinicId}</h1>
      <p>Appointments List</p>
    </div>
  );
}
