import React from 'react';

interface AlertProps {
    message: string;
    type?: 'error' | 'success' | 'info';
}

export const Alert: React.FC<AlertProps> = ({ message, type = 'error' }) => {
    const alertStyles = {
        error: 'bg-red-500 text-white',
        success: 'bg-green-500 text-white',
        info: 'bg-blue-500 text-white',
    };

    return (
        <div className={`p-4 rounded-md ${alertStyles[type]} shadow-md`}>
            {message}
        </div>
    );
};