interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
  }
  
  export function Checkbox({ label, checked, onChange }: CheckboxProps) {
    return (
      <div className="flex items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#C8FFB2] rounded-full peer peer-checked:bg-[#C8FFB2] transition-all"
          ></div>
          <div
            className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"
          ></div>
        </label>
        <span className="text-white text-sm">{label}</span>
      </div>
    );
  }