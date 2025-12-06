// Cache the formatter to avoid creating it on every call
const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatarPreco = (valor: number) => {
  return priceFormatter.format(valor);
};
