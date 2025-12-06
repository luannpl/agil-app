// Cache the formatter to avoid creating it on every call
const kmFormatter = new Intl.NumberFormat("pt-BR");

export const formatarQuilometragem = (valor: number | string): string => {
  const numero =
    typeof valor === "string" ? parseFloat(valor.replace(/\./g, "")) : valor;
  if (isNaN(numero)) {
    return "";
  }
  return kmFormatter.format(numero);
};
