import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

export function Input({ type = 'text', errorMessage = '', ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <input
        type={type === 'password' && isPasswordVisible ? 'text' : type}
        {...props}
        className={`w-full py-2 px-4 pr-10 rounded-lg bg-white text-black placeholder:text-gray-400 focus:outline-none ${
          errorMessage ? 'border-red-500 border' : ''
        }`}
      />
      {type === 'email' && <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />}
      {type === 'password' && (
        <div
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <EyeOff /> : <Eye />}
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}