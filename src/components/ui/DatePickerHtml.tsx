import React, { useState } from "react";

export default function DatePickerHtml() {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="">
      <input
        type="date"
        id="meeting-date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full h-full p-2 bg-[#B1FF91] border border-[#092064] text-[#0F2976] rounded-tr-2xl rounded-br-2xl"
      />
    </div>
  );
}