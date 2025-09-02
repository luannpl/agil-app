import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex items-start justify-center min-h-screen pt-32">
      <Image
        src="/agil-logo.png"
        width={400}
        height={200}
        alt="Float UI logo"
      />
    </div>
  );
}
