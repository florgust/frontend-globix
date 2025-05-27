import { ReactNode } from 'react';

interface AuthCardProps {
    children: ReactNode;
}

export function AuthCard({ children }: Readonly<AuthCardProps>) {
    return (
        <div className="w-1/2 bg-[#0F2976] flex flex-col justify-center items-center px-16">
            {children}
        </div>
    );
}
