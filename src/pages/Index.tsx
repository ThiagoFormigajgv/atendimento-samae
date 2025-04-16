
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  Phone,
  Droplets,
  AlertTriangle,
  Star,
  SendHorizontal,
} from "lucide-react";
import ServiceNotice from "@/components/ServiceNotice";
import FooterInfo from "@/components/FooterInfo";

const Index = () => {
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);
  const [isOmbudsmanFormOpen, setIsOmbudsmanFormOpen] = useState(false);
  const [isProofUploadOpen, setIsProofUploadOpen] = useState(false);
  const [isRepresentativeFormOpen, setIsRepresentativeFormOpen] = useState(false);
  const [isWaterLeakFormOpen, setIsWaterLeakFormOpen] = useState(false);
  const [isSewageLeakFormOpen, setIsSewageLeakFormOpen] = useState(false);
  const [isWaterOutageFormOpen, setIsWaterOutageFormOpen] = useState(false);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [isPresentialNoticeOpen, setIsPresentialNoticeOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    connectionNumber: "",
    accountHolder: "",
    requesterName: "",
    contactPhone: "",
    description: "",
    returnForecast: "",
    outageReason: "",
  });
  const [ombudsmanType, setOmbudsmanType] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [feedbackRating, setFeedbackRating] = useState(0);

  const services = [
    "Nova Ligação de Água",
    "Nova Ligação de Esgoto",
    "Deslocamento de Cavalete",
    "Conserto de Cavalete",
    "Falta de Água/Pressão",
    "Transferência de Titularidade",
    "Outros Serviços",
  ];

  const presentialServices = ["Nova Ligação de Água", "Nova Ligação de Esgoto", "Transferência de Titularidade"];

  const handleServiceRequest = (service: string) => {
    setSelectedService(service);
    
    if (presentialServices.includes(service)) {
      setIsPresentialNoticeOpen(true);
    } else {
      setIsServiceFormOpen(true);
    }
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
      returnForecast: "",
      outageReason: "",
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

  const handleProofUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554335351579";
    const message = `*Envio de Comprovantes - SAMAE*
Número da Ligação: ${formData.connectionNumber}
Titular: ${formData.accountHolder}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsProofUploadOpen(false);
    toast({
      title: "Envio de Comprovantes",
      description: "Por favor, envie seus comprovantes pelo WhatsApp que será aberto",
    });
  };

  const handleRepresentativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554335351579";
    const message = `*Solicitação de Atendimento Presencial - SAMAE*
Nome: ${formData.requesterName}
Número da Ligação: ${formData.connectionNumber}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsRepresentativeFormOpen(false);
    toast({
      title: "Solicitação de Atendimento",
      description: "Você será atendido em até 20 minutos pelos nossos colaboradores",
    });
  };

  const handleWaterLeakSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554335351579";
    const message = `*Comunicação de Vazamento de Água - SAMAE*
Número da Ligação: ${formData.connectionNumber}
Solicitante: ${formData.requesterName}
Telefone: ${formData.contactPhone}
Endereço/Local: ${formData.description}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsWaterLeakFormOpen(false);
    toast({
      title: "Vazamento Comunicado",
      description: "Sua comunicação de vazamento foi enviada com sucesso",
    });
  };

  const handleSewageLeakSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554335351579";
    const message = `*Comunicação de Vazamento de Esgoto - SAMAE*
Número da Ligação: ${formData.connectionNumber}
Solicitante: ${formData.requesterName}
Telefone: ${formData.contactPhone}
Endereço/Local: ${formData.description}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsSewageLeakFormOpen(false);
    toast({
      title: "Vazamento Comunicado",
      description: "Sua comunicação de vazamento foi enviada com sucesso",
    });
  };

  const handleWaterOutageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554335351579";
    const message = `*Comunicação de Falta de Água - SAMAE*
Número da Ligação: ${formData.connectionNumber}
Solicitante: ${formData.requesterName}
Telefone: ${formData.contactPhone}
Endereço/Informações: ${formData.description}
Motivo (se conhecido): ${formData.outageReason}
Previsão de Retorno (se conhecida): ${formData.returnForecast}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsWaterOutageFormOpen(false);
    toast({
      title: "Falta de Água Comunicada",
      description: "Sua comunicação foi enviada com sucesso",
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "554335351579";
    const message = `*Avaliação do Atendimento Virtual - SAMAE*
Avaliação: ${feedbackRating}/5 estrelas
Nome: ${formData.requesterName}
Comentário: ${formData.description}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    );
    setIsFeedbackFormOpen(false);
    toast({
      title: "Avaliação Enviada",
      description: "Obrigado por avaliar nosso atendimento virtual!",
    });
  };

  const openVirtualAgency = () => {
    window.open(
      "https://jaguariaiva.sfc.agenciavirtual.cwcsistemas.com.br/login",
      "_blank"
    );
  };

  const resetFormData = () => {
    setFormData({
      connectionNumber: "",
      accountHolder: "",
      requesterName: "",
      contactPhone: "",
      description: "",
      returnForecast: "",
      outageReason: "",
    });
    setSelectedFiles(null);
    setFeedbackRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col items-center mb-8">
          <img 
            src="https://www.samaejgv.com.br/wp-content/uploads/2025/01/novo-logo-samae1.png" 
            alt="SAMAE Jaguariaíva" 
            className="h-24 mb-4"
          />
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
            SAMAE Jaguariaíva
          </h1>
          <p className="text-xl text-gray-600">Atendimento Virtual</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="p-6 shadow-md border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <MessageSquare className="w-5 h-5" />
              Solicitar Serviços
            </h2>
            <div className="space-y-2">
              {services.map((service) => (
                <Button
                  key={service}
                  variant="outline"
                  className="w-full justify-start hover:bg-blue-50 border-blue-200"
                  onClick={() => handleServiceRequest(service)}
                >
                  {service}
                </Button>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 shadow-md border-blue-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <LinkIcon className="w-5 h-5" />
                Agência Virtual
              </h2>
              <Button
                className="w-full bg-blue-700 hover:bg-blue-800"
                variant="default"
                onClick={openVirtualAgency}
              >
                Acessar Agência Virtual
              </Button>
            </Card>

            <Card className="p-6 shadow-md border-blue-100">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <FileText className="w-5 h-5" />
                Ouvidoria
              </h2>
              <Button
                className="w-full border-blue-200 hover:bg-blue-50"
                variant="outline"
                onClick={() => {
                  resetFormData();
                  setIsOmbudsmanFormOpen(true);
                }}
              >
                Registrar Manifestação
              </Button>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6 shadow-md border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <Upload className="w-5 h-5" />
              Comprovantes
            </h2>
            <Button
              className="w-full border-blue-200 hover:bg-blue-50"
              variant="outline"
              onClick={() => {
                resetFormData();
                setIsProofUploadOpen(true);
              }}
            >
              Enviar Comprovantes
            </Button>
          </Card>

          <Card className="p-6 shadow-md border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <Phone className="w-5 h-5" />
              Atendimento
            </h2>
            <Button
              className="w-full border-blue-200 hover:bg-blue-50"
              variant="outline"
              onClick={() => {
                resetFormData();
                setIsRepresentativeFormOpen(true);
              }}
            >
              Falar com Atendente
            </Button>
          </Card>

          <Card className="p-6 shadow-md border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <Star className="w-5 h-5" />
              Avaliação
            </h2>
            <Button
              className="w-full border-blue-200 hover:bg-blue-50"
              variant="outline"
              onClick={() => {
                resetFormData();
                setIsFeedbackFormOpen(true);
              }}
            >
              Avaliar Atendimento
            </Button>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6 shadow-md border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <Droplets className="w-5 h-5" />
              Vazamentos
            </h2>
            <div className="space-y-2">
              <Button
                className="w-full border-blue-200 hover:bg-blue-50"
                variant="outline"
                onClick={() => {
                  resetFormData();
                  setIsWaterLeakFormOpen(true);
                }}
              >
                Vazamento de Água
              </Button>
              <Button
                className="w-full border-blue-200 hover:bg-blue-50"
                variant="outline"
                onClick={() => {
                  resetFormData();
                  setIsSewageLeakFormOpen(true);
                }}
              >
                Vazamento de Esgoto
              </Button>
            </div>
          </Card>

          <Card className="p-6 shadow-md border-blue-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-800">
              <AlertTriangle className="w-5 h-5" />
              Comunicados
            </h2>
            <Button
              className="w-full border-blue-200 hover:bg-blue-50"
              variant="outline"
              onClick={() => {
                resetFormData();
                setIsWaterOutageFormOpen(true);
              }}
            >
              Falta de Água
            </Button>
          </Card>
        </div>

        {/* Footer */}
        <FooterInfo />

        {/* Service Request Form Dialog */}
        <Dialog
          open={isServiceFormOpen}
          onOpenChange={setIsServiceFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Solicitação de Serviço</DialogTitle>
              <DialogDescription>
                Preencha os dados para solicitar o serviço de {selectedService}
              </DialogDescription>
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
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
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
              <DialogDescription>
                Registre sua manifestação na ouvidoria do SAMAE
              </DialogDescription>
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
                  max={3}
                />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                Enviar Manifestação
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Proof Upload Form Dialog */}
        <Dialog
          open={isProofUploadOpen}
          onOpenChange={setIsProofUploadOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Envio de Comprovantes</DialogTitle>
              <DialogDescription>
                Envie seus comprovantes para o SAMAE
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProofUploadSubmit} className="space-y-4">
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
                <Label htmlFor="files">Comprovantes (até 3 arquivos)</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="cursor-pointer"
                  max={3}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                Enviar Comprovantes
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Representative Form Dialog */}
        <Dialog
          open={isRepresentativeFormOpen}
          onOpenChange={setIsRepresentativeFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Falar com um Atendente</DialogTitle>
              <DialogDescription>
                Você será atendido em até 20 minutos
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRepresentativeSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                Solicitar Atendimento
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Water Leak Form Dialog */}
        <Dialog
          open={isWaterLeakFormOpen}
          onOpenChange={setIsWaterLeakFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Comunicar Vazamento de Água</DialogTitle>
              <DialogDescription>
                Informe detalhes sobre o vazamento de água
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleWaterLeakSubmit} className="space-y-4">
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
                <Label htmlFor="description">Endereço/Local do Vazamento</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                Comunicar Vazamento
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Sewage Leak Form Dialog */}
        <Dialog
          open={isSewageLeakFormOpen}
          onOpenChange={setIsSewageLeakFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Comunicar Vazamento de Esgoto</DialogTitle>
              <DialogDescription>
                Informe detalhes sobre o vazamento de esgoto
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSewageLeakSubmit} className="space-y-4">
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
                <Label htmlFor="description">Endereço/Local do Vazamento</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                Comunicar Vazamento
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Water Outage Form Dialog */}
        <Dialog
          open={isWaterOutageFormOpen}
          onOpenChange={setIsWaterOutageFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Comunicar Falta de Água</DialogTitle>
              <DialogDescription>
                Informe detalhes sobre a falta de água
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleWaterOutageSubmit} className="space-y-4">
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
                <Label htmlFor="description">Endereço/Informações Adicionais</Label>
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
                <Label htmlFor="outageReason">Motivo da Falta de Água (se conhecido)</Label>
                <Input
                  id="outageReason"
                  value={formData.outageReason}
                  onChange={(e) =>
                    setFormData({ ...formData, outageReason: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnForecast">Previsão de Retorno (se conhecida)</Label>
                <Input
                  id="returnForecast"
                  value={formData.returnForecast}
                  onChange={(e) =>
                    setFormData({ ...formData, returnForecast: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                Comunicar Falta de Água
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Feedback Form Dialog */}
        <Dialog
          open={isFeedbackFormOpen}
          onOpenChange={setIsFeedbackFormOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Avaliação do Atendimento Virtual</DialogTitle>
              <DialogDescription>
                Avalie nosso atendimento virtual
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Sua Avaliação</Label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant={feedbackRating === rating ? "default" : "outline"}
                      className={`h-10 w-10 p-0 ${feedbackRating === rating ? 'bg-blue-700' : 'border-blue-200'}`}
                      onClick={() => setFeedbackRating(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requesterName">Nome (opcional)</Label>
                <Input
                  id="requesterName"
                  value={formData.requesterName}
                  onChange={(e) =>
                    setFormData({ ...formData, requesterName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Comentário (opcional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" disabled={feedbackRating === 0}>
                Enviar Avaliação
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Presential Service Notice */}
        <ServiceNotice
          isOpen={isPresentialNoticeOpen}
          onClose={() => setIsPresentialNoticeOpen(false)}
          title="Atendimento Presencial Necessário"
          message="Este serviço só pode ser solicitado presencialmente. Favor dirigir-se ao atendimento do SAMAE na Rua Porto Velho, 140, Jardim São Roque."
          documentInfo={true}
        />
      </div>
    </div>
  );
};

export default Index;
