"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import CardVeiculos from "@/components/client/cardVeiculos/cardVeiculos";
import { useVeiculos } from "@/hooks/useVeiculos";

export default function Veiculos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const {data: veiculos} = useVeiculos();

  const vehicleOptions: Option[] = [
    { label: "Carro", value: "carro" },
    { label: "Moto", value: "moto" },
    { label: "Caminhão", value: "caminhao" },
    { label: "Ônibus", value: "onibus" },
    { label: "Bicicleta", value: "bicicleta" },
  ];

  const colorOptions: Option[] = [
    { label: "Vermelho", value: "vermelho" },
    { label: "Azul", value: "azul" },
    { label: "Preto", value: "preto" },
    { label: "Branco", value: "branco" },
    { label: "Cinza", value: "cinza" },
    { label: "Prata", value: "prata" },
    { label: "Verde", value: "verde" },
    { label: "Amarelo", value: "amarelo" },
    { label: "Laranja", value: "laranja" },
    { label: "Roxo", value: "roxo" },
    { label: "Marrom", value: "marrom" },
    { label: "Dourado", value: "dourado" },
  ];

  const colorOrder = colorOptions.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const brandOptions: Option[] = [
    { label: "Ford", value: "ford" },
    { label: "Chevrolet", value: "chevrolet" },
    { label: "Toyota", value: "toyota" },
    { label: "Honda", value: "honda" },
    { label: "Nissan", value: "nissan" },
    { label: "Jeep", value: "jeep" },
  ];

  const brandOrder = brandOptions.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const filteredVeiculos = useMemo(() => {
    if (!veiculos) return [];
    return veiculos.filter((veiculo) => {
      const matchesSearch =
        searchTerm === "" ||
        veiculo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        veiculo.descricao?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 ||
        (veiculo.tipo && selectedTypes.includes(veiculo.tipo));

      const matchesColor =
        selectedColors.length === 0 ||
        (veiculo.cor && selectedColors.includes(veiculo.cor));

      const matchesBrand =
        selectedBrands.length === 0 ||
        (veiculo.marca && selectedBrands.includes(veiculo.marca));

      return matchesSearch && matchesType && matchesColor && matchesBrand;
    });
  }, [veiculos, searchTerm, selectedTypes, selectedColors, selectedBrands]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-6">
        <Input
          placeholder="Buscar veículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MultiSelect
          options={colorOrder}
          selected={selectedColors}
          onChange={setSelectedColors}
          placeholder="Cor"
          className="w-full"
        />
        <MultiSelect
          options={brandOrder}
          selected={selectedBrands}
          onChange={setSelectedBrands}
          placeholder="Marca"
          className="w-full"
        />
        <MultiSelect
          options={vehicleOptions}
          selected={selectedTypes}
          onChange={setSelectedTypes}
          placeholder="Tipo de veículo"
          className="w-full"
        />
      </div>

      {/* Resultados */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 pb-14">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredVeiculos.length} veículo
            {filteredVeiculos.length !== 1 ? "s" : ""} encontrado
            {filteredVeiculos.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredVeiculos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum veículo encontrado com os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredVeiculos.map((veiculo) => (
              <CardVeiculos key={veiculo.id} {...veiculo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
