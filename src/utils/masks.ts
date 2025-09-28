export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .slice(0, 14);
};

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

export const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export const maskPlaca = (valor: string): string => {
  const placaLimpa = valor.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (placaLimpa.length <= 3) {
    return placaLimpa;
  }
  return `${placaLimpa.slice(0, 3)}-${placaLimpa.slice(3, 7)}`;
};
