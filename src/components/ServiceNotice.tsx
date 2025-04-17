
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ServiceNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  documentInfo?: boolean;
}

const ServiceNotice = ({ isOpen, onClose, title, message, documentInfo = false }: ServiceNoticeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-800 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 mb-4">
          <p className="text-sm text-gray-700">{message}</p>
          
          {documentInfo && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentos Necessários:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1.5">
                <li>RG</li>
                <li>CPF</li>
                <li>Matrícula do imóvel</li>
                <li>Contrato de compra e venda devidamente reconhecido em cartório (se aplicável)</li>
              </ul>
            </div>
          )}
        </div>
        <Button onClick={onClose} className="w-full bg-blue-700 hover:bg-blue-800">
          Entendi
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceNotice;
