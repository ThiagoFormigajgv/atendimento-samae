
import React from "react";
import { AlertCircle, Clock } from "lucide-react";

const FooterInfo = () => {
  return (
    <footer className="bg-blue-50 text-gray-700 p-6 mt-8 rounded-lg border border-blue-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-blue-700 mt-0.5" />
            <div>
              <h3 className="font-semibold">Horário de Funcionamento:</h3>
              <p className="text-sm">
                De segunda a sexta: 08h às 12h e 13h30 às 17h30
              </p>
              <p className="text-sm">Inclusive em feriados</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-700 mt-0.5" />
            <div>
              <h3 className="font-semibold">Atendimento de Emergência:</h3>
              <p className="text-sm">
                Após o horário de expediente, finais de semana e feriados, o atendimento é 
                realizado através do plantão pelo telefone: <span className="font-medium">(43) 3535-9200</span>
              </p>
            </div>
          </div>
          
          <div className="text-center mt-4 text-sm text-gray-500">
            <p>Desenvolvido por Thiago Matheus Formiga</p>
            <p>SAMAE Jaguariaíva - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterInfo;
