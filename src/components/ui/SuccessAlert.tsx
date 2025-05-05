import React from 'react';

interface SuccessAlertProps {
    message: string;
    onClose: () => void;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onClose }) => {
    return (
        <div className="fixed top-4 left-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
            <span>{message}</span>
            <button
                onClick={onClose}
                className="bg-white text-green-500 rounded-full px-2 py-1 font-bold hover:bg-gray-200 transition"
            >
                X
            </button>
        </div>
    );
};