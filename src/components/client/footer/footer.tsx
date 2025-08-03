export default function Footer() {
  return (
    <>
      <footer className="text-gray-400 py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Ágil Veículos. Todos os direitos
          reservados.
        </p>
        <p className="text-sm">Feito com ❤️ por sua equipe</p>
      </footer>
    </>
  );
}
