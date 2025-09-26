export const formatarQuilometragem = (valor: number | string): string => {
  const numero =
    typeof valor === "string" ? parseFloat(valor.replace(/\./g, "")) : valor;
  if (isNaN(numero)) {
    return "";
  }
  return numero.toLocaleString("pt-BR");
};
