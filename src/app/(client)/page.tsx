import Link from "next/link";

export default function HomeClient() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <h1>Home Cliente</h1>
      <Link href={"/admin"} className="text-blue-500 hover:underline">
        Ir para Admin
      </Link>
    </div>
  );
}
