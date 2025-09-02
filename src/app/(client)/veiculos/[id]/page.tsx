import { Calendar, Fuel, Gauge, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - em um projeto real, isso viria de uma API ou banco de dados
const vehicleData = {
  name: "Corolla XEi",
  brand: "Toyota",
  year: 2022,
  price: 89900,
  mileage: 25000,
  fuel: "Flex",
  transmission: "Automático",
  color: "Prata",
  location: "São Paulo - SP",
  images: [
    "/jeep.jpeg",
  ],
  features: [
    "Ar condicionado",
    "Direção hidráulica",
    "Vidros elétricos",
    "Trava elétrica",
    "Airbag duplo",
    "ABS",
    "Som original",
    "Rodas de liga leve",
  ],
  description: "Veículo em excelente estado de conservação, revisões em dia, único dono. Aceito financiamento e troca.",
  seller: {
    name: "João Silva",
    phone: "(11) 99999-9999",
    email: "joao@agilveiculos.com.br",
  },
}

export default async function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
     <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna principal - Imagens e detalhes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria de imagens */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    key={id}
                    src={vehicleData.images[0] || "/placeholder.svg"}
                    alt={vehicleData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 p-4">
                  {vehicleData.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-200 rounded overflow-hidden cursor-pointer hover:opacity-80"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${vehicleData.name} - ${index + 2}`}
                        className="w-full h-full object-cover"
                      />

                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informações do veículo */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {vehicleData.brand} {vehicleData.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {vehicleData.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-yellow-600">
                      R$ {vehicleData.price.toLocaleString("pt-BR")}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {vehicleData.year}
                    </Badge>
                  </div>
                </div>

                {/* Especificações principais */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Ano</div>
                      <div className="font-semibold">{vehicleData.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Gauge className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">KM</div>
                      <div className="font-semibold">{vehicleData.mileage.toLocaleString("pt-BR")}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Fuel className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Combustível</div>
                      <div className="font-semibold">{vehicleData.fuel}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <div className="w-5 h-5 text-gray-500">⚙️</div>
                    <div>
                      <div className="text-sm text-gray-500">Câmbio</div>
                      <div className="font-semibold">{vehicleData.transmission}</div>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                  <p className="text-gray-600 leading-relaxed">{vehicleData.description}</p>
                </div>

                {/* Características */}
                {/* <div>
                  <h3 className="text-lg font-semibold mb-3">Características</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {vehicleData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contato */}
          <div className="space-y-6">
            <Card className="top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Entre em contato</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Telefone</div>
                      <div className="font-semibold">{vehicleData.seller.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">E-mail</div>
                      <div className="font-semibold text-sm">{vehicleData.seller.email}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar agora
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full "
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar e-mail
                  </Button>

                  <Button variant="outline" className="w-full font-semibold py-3 bg-transparent">
                    💬 WhatsApp
                  </Button>
                </div>

                {/* <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="text-sm text-yellow-800 font-medium mb-1">💡 Dica importante</div>
                  <div className="text-sm text-yellow-700">
                    Sempre verifique a documentação e faça uma vistoria antes de fechar negócio.
                  </div>
                </div> */}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Simule seu financiamento</h3>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-demo rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      R$ {Math.round(vehicleData.price * 0.15).toLocaleString("pt-BR")}
                    </div>
                    <div className="text-sm text-gray-500">Entrada sugerida (15%)</div>
                  </div>
                  <div className="text-center p-4 bg-demo rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      R$ {Math.round((vehicleData.price * 0.85) / 48).toLocaleString("pt-BR")}
                    </div>
                    <div className="text-sm text-gray-500">48x sem juros*</div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Simular financiamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}