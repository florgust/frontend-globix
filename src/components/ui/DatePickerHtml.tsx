import React, { useState } from "react";

interface DatePickerHtmlProps {
  onChange: (date: string) => void; // Define o tipo da propriedade onChange
}

export default function DatePickerHtml({ onChange }: DatePickerHtmlProps) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    onChange(date); // Chama a função passada como propriedade
  };

  return (
    <div>
      <input
        type="date"
        id="meeting-date"
        value={selectedDate}
        onChange={handleDateChange}
        className="w-full h-full p-2 bg-[#B1FF91] border border-[#092064] text-[#0F2976] rounded-tr-2xl rounded-br-2xl"
      />
    </div>
  );
}