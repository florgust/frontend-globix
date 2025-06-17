import React from "react";

interface DatePickerHtmlProps {
  date?: string;
  onChange: (date: string) => void;
}

export default function DatePickerHtml({ date, onChange }: DatePickerHtmlProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <input
        type="date"
        id="meeting-date"
        value={date}
        onChange={handleDateChange}
        className="w-full h-full p-2 bg-[#B1FF91] border border-[#092064] text-[#0F2976] rounded-tr-2xl rounded-br-2xl"
      />
    </div>
  );
}