
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  MessageSquare,
  FileText,
  Link as LinkIcon,
  Upload,
} from "lucide-react";

const Index = () => {
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [isOmbudsmanFormOpen, setIsOmbudsmanFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    connectionNumber: "",
    accountHolder: "",
    requesterName: "",
    contactPhone: "",
    description: "",
  });
  const [ombudsmanType, setOmbudsmanType] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const services = [
    "Nova Ligação de Água",
    "Nova Ligação de Esgoto",
    "Deslocamento de Cavalete",
    "Conserto de Cavalete",
    "Falta de Água/Pressão",
    "Transferência de Titularidade",
    "Outros Serviços",
  ];

  const handleServiceRequest = (service: string) => {
    setSelectedService(service);
    setIsServiceFormOpen(true);
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554335351579";
    const message = `*Solicitação de Serviço - SAMAE*
Serviço: ${selectedService}
Número da Ligação: ${formData.connectionNumber}
Titular: ${formData.accountHolder}
Solicitante: ${formData.requesterName}
Telefone: ${formData.contactPhone}
Descrição: ${formData.description}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsServiceFormOpen(false);
    setFormData({
      connectionNumber: "",
      accountHolder: "",
      requesterName: "",
      contactPhone: "",
      description: "",
    });
    toast({
      title: "Solicitação Enviada",
      description: "Sua mensagem será enviada via WhatsApp",
    });
  };

  const handleOmbudsmanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554338860160";
    const message = `*Ouvidoria SAMAE*
Tipo: ${ombudsmanType}
Nome: ${formData.requesterName}
Telefone: ${formData.contactPhone}
Relato: ${formData.description}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsOmbudsmanFormOpen(false);
    toast({
      title: "Manifestação Enviada",
      description: "Sua mensagem será enviada via WhatsApp",
    });
  };

  const openVirtualAgency = () => {
    window.open(
      "https://jaguariaiva.sfc.agenciavirtual.cwcsistemas.com.br/login",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          SAMAE Jaguariaíva - Atendimento Virtual
        </h1>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Solicitar Serviços
            </h2>
            <div className="space-y-2">
              {services.map((service) => (
                <Button
                  key={service}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleServiceRequest(service)}
                >
                  {service}
                </Button>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Agência Virtual
              </h2>
              <Button
                className="w-full"
                variant="default"
                onClick={openVirtualAgency}
              >
                Acessar Agência Virtual
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Ouvidoria
              </h2>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setIsOmbudsmanFormOpen(true)}
              >
                Registrar Manifestação
              </Button>
            </Card>
          </div>
        </div>

        {/* Service Request Form Dialog */}
        <Dialog
          open={isServiceFormOpen}
          onOpenChange={setIsServiceFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Solicitação de Serviço</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="connectionNumber">Número da Ligação</Label>
                <Input
                  id="connectionNumber"
                  value={formData.connectionNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, connectionNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Titular da Fatura</Label>
                <Input
                  id="accountHolder"
                  value={formData.accountHolder}
                  onChange={(e) =>
                    setFormData({ ...formData, accountHolder: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requesterName">Nome do Solicitante</Label>
                <Input
                  id="requesterName"
                  value={formData.requesterName}
                  onChange={(e) =>
                    setFormData({ ...formData, requesterName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Telefone de Contato</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Solicitação
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Ombudsman Form Dialog */}
        <Dialog
          open={isOmbudsmanFormOpen}
          onOpenChange={setIsOmbudsmanFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Ouvidoria</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleOmbudsmanSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Manifestação</Label>
                <Select
                  value={ombudsmanType}
                  onValueChange={setOmbudsmanType}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="denuncia">Denúncia</SelectItem>
                    <SelectItem value="critica">Crítica</SelectItem>
                    <SelectItem value="duvida">Dúvida</SelectItem>
                    <SelectItem value="sugestao">Sugestão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requesterName">Nome</Label>
                <Input
                  id="requesterName"
                  value={formData.requesterName}
                  onChange={(e) =>
                    setFormData({ ...formData, requesterName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Telefone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Relato</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="files">Anexos (até 3 arquivos)</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="cursor-pointer"
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Manifestação
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
