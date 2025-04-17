
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface WaterSupplyToggleProps {
  isNormalSupply: boolean;
  onToggle: (value: boolean) => void;
}

const WaterSupplyToggle: React.FC<WaterSupplyToggleProps> = ({ 
  isNormalSupply, 
  onToggle 
}) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [attemptedValue, setAttemptedValue] = useState(false);
  
  const handleToggleClick = (newValue: boolean) => {
    setAttemptedValue(newValue);
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "gremio1903@") {
      onToggle(attemptedValue);
      setIsPasswordDialogOpen(false);
      setPassword("");
      toast({
        title: "Status alterado com sucesso",
        description: attemptedValue 
          ? "O status de abastecimento foi alterado para Normal" 
          : "Os comunicados de interrupção de abastecimento estão visíveis agora",
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, tente novamente com a senha correta",
        variant: "destructive",
      });
    }
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
          </div>
        </div>
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
