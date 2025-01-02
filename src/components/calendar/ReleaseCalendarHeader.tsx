import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const ReleaseCalendarHeader = ({ onMonthChange }: { onMonthChange: (date: Date) => void }) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onMonthChange(newDate);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Calendário | Planejamento de Releases</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Mês selecionado:</span>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border"
        />
      </div>
      <div className="flex gap-2">
        <div className="bg-blue-200 px-3 py-1 rounded-md text-sm">Em alpha</div>
        <div className="bg-green-200 px-3 py-1 rounded-md text-sm">Concluída</div>
        <div className="bg-red-200 px-3 py-1 rounded-md text-sm">Cancelada</div>
        <div className="bg-cyan-200 px-3 py-1 rounded-md text-sm">Em distribuição</div>
        <div className="bg-orange-200 px-3 py-1 rounded-md text-sm">Aguardando Aprovação na Loja</div>
      </div>
    </div>
  );
};