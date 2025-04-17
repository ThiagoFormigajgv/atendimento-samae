
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface WaterSupplyToggleProps {
  isNormalSupply: boolean;
  onToggle: (value: boolean) => void;
}

// Simulando um endpoint remoto (em uma aplicação real, isso seria um endpoint de API)
const STATUS_ENDPOINT = "https://api.jsonbin.io/v3/b/6610c217c60649328eeceb02";
const STATUS_API_KEY = "$2a$10$VmRUPIvgk0DZCRURQBItbeQy3jkpZvxVCyj5gkCrOK3aXGnpk1n6i";

const WaterSupplyToggle: React.FC<WaterSupplyToggleProps> = ({ 
  isNormalSupply, 
  onToggle 
}) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [attemptedValue, setAttemptedValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // Função para buscar o status atual do servidor
  const fetchCurrentStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(STATUS_ENDPOINT, {
        headers: {
          "X-Master-Key": STATUS_API_KEY
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const remoteStatus = data.record.isNormalSupply;
        
        // Só atualiza se o status for diferente do atual
        if (remoteStatus !== isNormalSupply) {
          onToggle(remoteStatus);
          toast({
            title: "Status Atualizado",
            description: `O status foi sincronizado com o servidor.`,
          });
        }
        
        // Atualiza o timestamp da última verificação
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString());
      } else {
        console.error("Erro ao buscar status:", response.statusText);
        toast({
          title: "Erro ao sincronizar",
          description: "Não foi possível buscar o status atual do servidor.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast({
        title: "Erro de conexão",
        description: "Verifique sua conexão com a internet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função para atualizar o status no servidor
  const updateRemoteStatus = async (newStatus: boolean) => {
    try {
      const response = await fetch(`${STATUS_ENDPOINT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": STATUS_API_KEY
        },
        body: JSON.stringify({ isNormalSupply: newStatus })
      });
      
      if (!response.ok) {
        throw new Error("Falha ao atualizar o status no servidor");
      }
      
      // Atualiza o estado local
      onToggle(newStatus);
      
      toast({
        title: "Status alterado com sucesso",
        description: newStatus 
          ? "O status de abastecimento foi alterado para Normal em todos os dispositivos" 
          : "Os comunicados de interrupção de abastecimento estão visíveis para todos os usuários agora",
      });
    } catch (error) {
      console.error("Erro ao atualizar status remoto:", error);
      toast({
        title: "Erro ao atualizar",
        description: "O status foi alterado apenas localmente. Tente novamente mais tarde.",
        variant: "destructive",
      });
      // Mesmo com erro, atualizamos localmente
      onToggle(newStatus);
    }
  };
  
  // Busca o status atual ao carregar o componente e a cada minuto
  useEffect(() => {
    fetchCurrentStatus();
    
    // Configura um intervalo para verificar atualizações a cada minuto
    const intervalId = setInterval(() => {
      fetchCurrentStatus();
    }, 60000); // 60000ms = 1 minuto
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isNormalSupply]);

  const handleToggleClick = (newValue: boolean) => {
    setAttemptedValue(newValue);
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "gremio1903@") {
      updateRemoteStatus(attemptedValue);
      setIsPasswordDialogOpen(false);
      setPassword("");
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, tente novamente com a senha correta",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    fetchCurrentStatus();
    toast({
      title: "Sincronizando",
      description: "Verificando atualizações do status de abastecimento...",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-blue-100 mb-4">
        <div className="flex items-center gap-3">
          {isNormalSupply ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          )}
          <div>
            <h3 className="font-medium">Status do Abastecimento</h3>
            <p className="text-sm text-gray-500">
              {isNormalSupply 
                ? "Abastecimento normal em toda a cidade" 
                : "Há interrupções no abastecimento"
              }
            </p>
            {lastUpdated && (
              <p className="text-xs text-gray-400">
                Última verificação: {lastUpdated}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7 rounded-full" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="sr-only">Atualizar status</span>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Interrupções</span>
            <Switch 
              checked={isNormalSupply} 
              onCheckedChange={handleToggleClick}
              className={isNormalSupply ? "bg-green-600" : "bg-amber-500"}
            />
            <span className="text-xs text-gray-500">Normal</span>
          </div>
        </div>
      </div>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Senha Administrativa</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Digite a senha para alterar o status</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Esta alteração será aplicada para todos os usuários do sistema.
              </p>
            </div>
            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
              Confirmar Alteração
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WaterSupplyToggle;
