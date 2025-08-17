"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import CardVeiculos from "@/components/client/cardVeiculos/cardVeiculos";
import { CardVeiculosProps } from "@/types/veiculo";

export default function Veiculos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const veiculos: CardVeiculosProps[] = [
    {
      id: "1",
      nome: "Jeep Renegade Sport",
      descricao: "2.0 16V DIESEL LIMITED 4X4 AUTOMÁTICO",
      ano: 2020,
      preco: 80000,
      quilometragem: 54000,
      cambio: "Automático",
      localizacao: "Fortaleza - CE",
      imagem: "/jeep.jpeg",
      cor: "preto",
      marca: "jeep",
      tipo: "carro",
    },
    {
      id: "2",
      nome: "Honda Civic Touring",
      descricao: "1.5 TURBO 16V CVT",
      ano: 2022,
      preco: 120000,
      quilometragem: 25000,
      cambio: "CVT",
      localizacao: "São Paulo - SP",
      imagem: "/jeep.jpeg",
      cor: "branco",
      marca: "honda",
      tipo: "carro",
    },
    {
      id: "3",
      nome: "Toyota Corolla XEI",
      descricao: "2.0 16V FLEX AUTOMÁTICO",
      ano: 2021,
      preco: 95000,
      quilometragem: 35000,
      cambio: "Automático",
      localizacao: "Rio de Janeiro - RJ",
      imagem: "/jeep.jpeg",
      cor: "prata",
      marca: "toyota",
      tipo: "carro",
    },
    {
      id: "4",
      nome: "Ford Ka SE Plus",
      descricao: "1.0 12V FLEX MANUAL",
      ano: 2019,
      preco: 45000,
      quilometragem: 68000,
      cambio: "Manual",
      localizacao: "Belo Horizonte - MG",
      imagem: "/jeep.jpeg",
      cor: "vermelho",
      marca: "ford",
      tipo: "carro",
    },
    {
      id: "5",
      nome: "Chevrolet Onix LT",
      descricao: "1.0 12V FLEX MANUAL",
      ano: 2020,
      preco: 52000,
      quilometragem: 42000,
      cambio: "Manual",
      localizacao: "Salvador - BA",
      imagem: "/jeep.jpeg",
      cor: "azul",
      marca: "chevrolet",
      tipo: "carro",
    },
    {
      id: "6",
      nome: "Honda CB 600F Hornet",
      descricao: "600CC INJEÇÃO ELETRÔNICA",
      ano: 2018,
      preco: 32000,
      quilometragem: 15000,
      cambio: "Manual",
      localizacao: "Curitiba - PR",
      imagem: "/jeep.jpeg",
      cor: "amarelo",
      marca: "honda",
      tipo: "moto",
    },
    {
      id: "7",
      nome: "Nissan Versa SV",
      descricao: "1.6 16V FLEX CVT",
      ano: 2021,
      preco: 75000,
      quilometragem: 28000,
      cambio: "CVT",
      localizacao: "Recife - PE",
      imagem: "/jeep.jpeg",
      cor: "cinza",
      marca: "nissan",
      tipo: "carro",
    },
    {
      id: "8",
      nome: "Toyota Hilux SRX",
      descricao: "2.8 DIESEL 4X4 AUTOMÁTICO",
      ano: 2022,
      preco: 180000,
      quilometragem: 18000,
      cambio: "Automático",
      localizacao: "Brasília - DF",
      imagem: "/jeep.jpeg",
      cor: "branco",
      marca: "toyota",
      tipo: "caminhao",
    },
  ];

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
