import React from "react";
import Image from "next/image";

interface UserCardProps {
    name: string;
    image: string;
    actions?: React.ReactNode; // Para botões de aceitar/recusar ou outros
}

const UserCard: React.FC<UserCardProps> = ({ name, image, actions }) => {
    return (
        <div className="bg-white p-2 rounded-lg mb-2 flex items-center gap-4 w-[20rem]">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
                <Image src={image} alt={name} width={40} height={40} />
            </div>
            <span className="text-[#717130] text-[0.875rem]">{name}</span>
            {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
        </div>
    );
};

export default UserCard;