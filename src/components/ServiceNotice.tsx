
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ServiceNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ServiceNotice = ({ isOpen, onClose, title, message }: ServiceNoticeProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2 mb-4">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <Button onClick={onClose} className="w-full">
          Entendi
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceNotice;
