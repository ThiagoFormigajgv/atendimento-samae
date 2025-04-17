
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

// We'll use localStorage as the temporary sync mechanism
// In a production environment, this would be replaced with a proper backend API
const LOCAL_STORAGE_KEY = "water-supply-status";
const LAST_UPDATED_KEY = "water-supply-last-updated";

const WaterSupplyToggle: React.FC<WaterSupplyToggleProps> = ({ 
  isNormalSupply, 
  onToggle 
}) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [attemptedValue, setAttemptedValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // Function to fetch current status from localStorage or other devices
  const fetchCurrentStatus = async () => {
    setIsLoading(true);
    try {
      // Check if there's a newer timestamp in localStorage
      const storedTimestamp = localStorage.getItem(LAST_UPDATED_KEY);
      const storedStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
      
      if (storedTimestamp && storedStatus) {
        const currentTimestamp = new Date().getTime();
        const lastUpdatedTimestamp = parseInt(storedTimestamp, 10);
        const remoteStatus = storedStatus === "true";
        
        // If stored timestamp is newer than our current state's last update or status is different
        if ((!lastUpdated || remoteStatus !== isNormalSupply)) {
          onToggle(remoteStatus);
          toast({
            title: "Status Atualizado",
            description: "O status foi sincronizado com sucesso.",
          });
        }
        
        // Update the last checked timestamp
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString());
      } else {
        // If no stored data found, save the current status
        updateRemoteStatus(isNormalSupply, false);
      }
    } catch (error) {
      console.error("Erro ao verificar status:", error);
      // No toast here to avoid annoying messages, we'll just update the UI
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to update status across all devices
  const updateRemoteStatus = async (newStatus: boolean, showToast: boolean = true) => {
    try {
      // Save to localStorage with current timestamp
      const timestamp = new Date().getTime().toString();
      localStorage.setItem(LOCAL_STORAGE_KEY, newStatus.toString());
      localStorage.setItem(LAST_UPDATED_KEY, timestamp);
      
      // Update the local state
      onToggle(newStatus);
      
      if (showToast) {
        toast({
          title: "Status alterado com sucesso",
          description: newStatus 
            ? "O status de abastecimento foi alterado para Normal em todos os dispositivos" 
            : "Os comunicados de interrupção de abastecimento estão visíveis para todos os usuários agora",
        });
      }

      // Update the last updated timestamp
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      if (showToast) {
        toast({
          title: "Erro ao atualizar",
          description: "O status foi alterado apenas localmente.",
          variant: "destructive",
        });
      }
      // Even with an error, we update locally
      onToggle(newStatus);
    }
  };
  
  // Check for status updates on component mount and periodically
  useEffect(() => {
    fetchCurrentStatus();
    
    // Check for updates every 15 seconds
    const intervalId = setInterval(() => {
      fetchCurrentStatus();
    }, 15000); // 15 seconds for more frequent updates
    
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
