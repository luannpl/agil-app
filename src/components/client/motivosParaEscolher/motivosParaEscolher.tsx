import { CardHoverEffectDemo } from "../cardHoverEffect/cardHoverEffect";

export default function MotivosParaEscolher() {
  return (
    <div className="w-full bg-yellow-500 mx-auto px-4 text-gray-600 md:px-8 pb-14 pt-4 my-4 hover:shadow-2xl hover:shadow-yellow-500/50 transition-shadow duration-300">
      <h3 className="text-background font-semibold text-3xl mb-8 text-center">
        Motivos para nos escolher
      </h3>
      <CardHoverEffectDemo />
    </div>
  );
}
