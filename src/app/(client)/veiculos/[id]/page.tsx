export default async function VeiculoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
      <h1 className="text-2xl font-bold mb-4">Veículo ID: {id}</h1>
    </div>
  );
}
