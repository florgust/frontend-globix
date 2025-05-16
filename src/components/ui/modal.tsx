import React from "react";

function Modal({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
    if (isOpen) {
        return (
            <div
                style={{ backgroundColor: "rgba(41, 45, 50, 0.5)" }}
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
            >
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-4xl shadow-2xl p-6 h-[25rem] w-[60rem] flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        );
    }
    return null;
}

export { Modal };