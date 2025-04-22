import React from "react";
import Image from "next/image";

interface ActionButtonProps {
    icon: string;
    label: string;
    onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => {
    return (
        <div className="flex flex-col items-center">
            <div
                className="hover:scale-110 transition-transform cursor-pointer w-[4.5rem] h-[4.5rem] bg-gradient-to-b from-[#0F2976] to-[#1C4CDC] rounded-[1rem] flex items-center justify-center text-white"
                onClick={onClick}
            >
                <Image src={icon} alt={label} width={36} height={36} />
            </div>
            <p className="text-[#292D32] mt-2 text-center text-[0.875rem]">{label}</p>
        </div>
    );
};

export default ActionButton;