function gerarParcelas(
  totalParcelas: number,
  valorParcela: string,
  dataPrimeiroVenc: string
) {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parcelas: any[] = [];
  const data = new Date(dataPrimeiroVenc);

  for (let i = 1; i <= totalParcelas; i++) {
    const venc = new Date(data);
    venc.setMonth(venc.getMonth() + (i - 1));

    parcelas.push({
      numero: i,
      valor: valorParcela,
      vencimento: venc.toLocaleDateString("pt-BR"),
    });
  }

  return parcelas;
}
export { gerarParcelas };
