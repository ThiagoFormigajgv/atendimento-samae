import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Droplets, Clock, MapPin, AlertTriangle, Info, Search, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import WaterSupplyToggle from "./WaterSupplyToggle";

// Sample outage announcements data (in a real application, this would come from an API)
const outageAnnouncements = [
  {
    id: 1,
    title: "Interrupção Programada - Jardim São Roque",
    date: "17/04/2025",
    time: "08:00 às 14:00",
    type: "Programada",
    severity: "Total",
    neighborhoods: ["Jardim São Roque", "Centro", "Jardim Primavera"],
    reason: "Manutenção preventiva na rede de distribuição",
    returnTime: "Retorno gradativo a partir das 14:00",
    affectedStreets: ["Rua Porto Velho", "Rua Aracaju", "Av. Jundiaí", "Rua Goiânia"],
    message: "Recomendamos que os moradores reservem água para o período. O abastecimento será normalizado gradativamente após a conclusão dos trabalhos."
  },
  {
    id: 2,
    title: "Interrupção Emergencial - Jardim Santa Cecília",
    date: "16/04/2025",
    time: "13:30 às 17:00",
    type: "Emergencial",
    severity: "Parcial",
    neighborhoods: ["Jardim Santa Cecília", "Vila Kennedy"],
    reason: "Rompimento de rede",
    returnTime: "Retorno gradativo a partir das 17:00",
    affectedStreets: ["Rua das Flores", "Rua Paraná", "Av. Principal"],
    message: "Equipes de manutenção já estão trabalhando no local para resolver o problema o mais rápido possível."
  },
  {
    id: 3,
    title: "Baixa Pressão - Região Oeste",
    date: "15/04/2025",
    time: "Durante o dia todo",
    type: "Informativo",
    severity: "Baixa Pressão",
    neighborhoods: ["Jardim Matarazzo", "Vila Maria"],
    reason: "Alta demanda no sistema",
    returnTime: "Normalização prevista para a manhã do dia 16/04",
    affectedStreets: ["Toda a região oeste"],
    message: "Devido à alta demanda, os bairros mais altos podem sofrer com baixa pressão durante o dia. Recomendamos economia de água."
  }
];

interface OutageAnnouncementCardProps {
  announcement: typeof outageAnnouncements[0];
  onViewDetails: (announcement: typeof outageAnnouncements[0]) => void;
}

const OutageAnnouncementCard: React.FC<OutageAnnouncementCardProps> = ({ announcement, onViewDetails }) => {
  return (
    <Card className="mb-4 border-l-4 hover:shadow-md transition-all duration-200 overflow-hidden" 
          style={{ borderLeftColor: announcement.type === "Programada" ? "#3b82f6" : 
                                   announcement.type === "Emergencial" ? "#ef4444" : "#f59e0b" }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{announcement.title}</CardTitle>
          <Badge variant={announcement.type === "Programada" ? "default" : 
                          announcement.type === "Emergencial" ? "destructive" : "outline"}>
            {announcement.type}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <Clock className="h-3.5 w-3.5" /> {announcement.date} | {announcement.time}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-700">
              {announcement.neighborhoods.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-gray-700">
              Interrupção {announcement.severity}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-700">
              {announcement.returnTime}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onViewDetails(announcement)}>
          <Info className="h-4 w-4 mr-2" /> Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

const LOCAL_STORAGE_KEY = "water-supply-status";

const WaterOutageAnnouncements: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof outageAnnouncements[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNormalSupply, setIsNormalSupply] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        const storedStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
        setIsNormalSupply(storedStatus === null ? true : storedStatus === "true");
      } catch (error) {
        console.error("Erro ao buscar status inicial:", error);
        setIsNormalSupply(true);
      } finally {
        setIsInitialized(true);
      }
    };

    fetchInitialStatus();

    const intervalId = setInterval(() => {
      const storedStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedStatus !== null) {
        const newStatus = storedStatus === "true";
        if (newStatus !== isNormalSupply) {
          setIsNormalSupply(newStatus);
        }
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isNormalSupply]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(LOCAL_STORAGE_KEY, isNormalSupply.toString());
    }
  }, [isNormalSupply, isInitialized]);

  const handleViewDetails = (announcement: typeof outageAnnouncements[0]) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };

  const filteredAnnouncements = outageAnnouncements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.neighborhoods.some(neighborhood => 
      neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (!isInitialized) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-full bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-96 w-full bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <WaterSupplyToggle 
        isNormalSupply={isNormalSupply} 
        onToggle={setIsNormalSupply} 
      />

      <Card className="border-blue-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-700" />
              <CardTitle className="text-xl font-bold text-blue-800">Comunicados de Falta de Água</CardTitle>
            </div>
            {!isNormalSupply && (
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por bairro..."
                  className="pl-9 w-full sm:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>
          <CardDescription className="text-blue-700 mt-1">
            Quadro de avisos sobre interrupções no abastecimento
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {isNormalSupply ? (
            <div className="text-center py-16 px-4">
              <div className="inline-flex rounded-full bg-green-100 p-6 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Abastecimento Normal</h3>
              <p className="text-gray-600 max-w-lg mx-auto mb-2">
                No momento, o abastecimento de água está funcionando normalmente em toda a cidade.
              </p>
              <p className="text-sm text-green-600 font-medium">
                Todas as áreas estão com fornecimento regular
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAnnouncements.length > 0 ? (
                <>
                  {filteredAnnouncements.slice(0, isExpanded ? filteredAnnouncements.length : 2).map(announcement => (
                    <OutageAnnouncementCard 
                      key={announcement.id} 
                      announcement={announcement} 
                      onViewDetails={handleViewDetails} 
                    />
                  ))}
                  
                  {filteredAnnouncements.length > 2 && (
                    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full text-blue-600">
                          {isExpanded ? "Mostrar menos" : `Ver mais ${filteredAnnouncements.length - 2} comunicados`}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2">
                        {filteredAnnouncements.slice(2).map(announcement => (
                          <OutageAnnouncementCard 
                            key={announcement.id} 
                            announcement={announcement} 
                            onViewDetails={handleViewDetails} 
                          />
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex rounded-full bg-blue-100 p-3 mb-4">
                    <Droplets className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Sem comunicados no momento</h3>
                  <p className="text-gray-500">
                    Não há interrupções de água programadas ou em andamento.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {selectedAnnouncement.type === "Programada" ? (
                    <Clock className="h-5 w-5 text-blue-600" />
                  ) : selectedAnnouncement.type === "Emergencial" ? (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  ) : (
                    <Info className="h-5 w-5 text-amber-600" />
                  )}
                  <DialogTitle>{selectedAnnouncement.title}</DialogTitle>
                </div>
                <DialogDescription>
                  {selectedAnnouncement.date} | {selectedAnnouncement.time}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-1">Informações Gerais</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span><span className="font-medium">Tipo:</span> {selectedAnnouncement.type} - {selectedAnnouncement.severity}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span><span className="font-medium">Bairros afetados:</span> {selectedAnnouncement.neighborhoods.join(", ")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-gray-600 mt-0.5" />
                      <span><span className="font-medium">Motivo:</span> {selectedAnnouncement.reason}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><span className="font-medium">Previsão:</span> {selectedAnnouncement.returnTime}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Ruas Afetadas</h4>
                  <p className="text-sm text-gray-700">{selectedAnnouncement.affectedStreets.join(", ")}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Observações</h4>
                  <p className="text-sm text-gray-700">{selectedAnnouncement.message}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => setIsDialogOpen(false)} className="w-full bg-blue-700 hover:bg-blue-800">
                  Entendi
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaterOutageAnnouncements;
