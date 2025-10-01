import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { DadosContrato } from "@/types/contrato";

export const gerarDocumentoContrato = async (dados: DadosContrato) => {
  try {
    const response = await fetch("/contrato/modeloContrato.docx");
    const blob = await response.arrayBuffer();

    const zip = new PizZip(blob);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "{{", end: "}}" },
    });

    doc.render(dados);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, `${dados.veiculoPlaca}_contrato.docx`);
  } catch (error) {
    console.error("Erro ao gerar contrato:", error);
    alert("Erro ao gerar contrato");
  }
};
