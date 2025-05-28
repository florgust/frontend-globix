import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import api, { axios } from "@/utils/axios";
import Cookies from "js-cookie";
import ModalEditProfileSucess from "./ModalEditProfileSucess";

interface ModalPasswordEditProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPasswordEdit: React.FC<ModalPasswordEditProps> = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleCancel = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        onClose();
    };

    // Fecha o modal de sucesso automaticamente após 1 segundo
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, onClose]);

    if (!isOpen && !showSuccess) return null;

    const handleSave = async () => {
        setError("");
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Preencha todos os campos.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("As senhas novas não coincidem.");
            return;
        }
        if (newPassword.length < 6) {
            setError("A nova senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Pega o id do usuário do cookie
        const usuarioCookie = Cookies.get("usuario");
        let id;
        if (usuarioCookie) {
            try {
                const usuarioObj = JSON.parse(usuarioCookie);
                id = usuarioObj.id;
            } catch {
                setError("Erro ao obter usuário.");
                return;
            }
        } else {
            setError("Usuário não autenticado.");
            return;
        }

        try {
            await api.put(`/usuario/senha/${id}`, {
                senhaAtual: currentPassword,
                senhaNova: newPassword,
            });
            setShowSuccess(true); // Mostra o modal de sucesso
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError("");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                    "Erro ao alterar senha. Tente novamente."
                );
            } else {
                setError("Erro ao alterar senha. Tente novamente.");
            }
        }
    };

    return (
        <>
            <ModalEditProfileSucess
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                message="Senha alterada com sucesso!"
            />
            {isOpen && !showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[#0F2976] hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Fechar"
                        >
                            <X size={24} />
                        </button>
                        <div className="flex flex-col items-center mb-6">
                            <h2 className="font-bold text-3xl text-[#0F2976] text-center w-full">Alterar senha</h2>
                        </div>
                        <div className="flex flex-col gap-6 items-center">
                            <div className="w-full">
                                <label className="block text-[#0F2976] mb-2 text-left font-semibold">Senha atual</label>
                                <input
                                    type="password"
                                    placeholder="Digite sua senha atual"
                                    className="rounded-lg w-full p-3 bg-[#0F2976] text-white border-none focus:outline-none text-lg"
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-[#0F2976] mb-2 text-left font-semibold">Nova senha</label>
                                <input
                                    type="password"
                                    placeholder="Digite a nova senha"
                                    className="rounded-lg w-full p-3 bg-[#0F2976] text-white border-none focus:outline-none text-lg"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-[#0F2976] mb-2 text-left font-semibold">Confirmar nova senha</label>
                                <input
                                    type="password"
                                    placeholder="Confirme a nova senha"
                                    className="rounded-lg w-full p-3 bg-[#0F2976] text-white border-none focus:outline-none text-lg"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {error && (
                                <div className="w-full text-red-500 text-sm text-center font-bold">
                                    {error}
                                </div>
                            )}
                        </div>
                        <div className="mt-8 flex flex-col items-center gap-4">
                            <button
                                className="w-full px-6 py-3 bg-[#6FFF6F] text-[#0F2976] rounded-lg font-bold text-lg hover:scale-105 transition-transform cursor-pointer"
                                onClick={handleSave}
                            >
                                Salvar nova senha
                            </button>
                            <button
                                onClick={handleCancel}
                                className="w-full px-6 py-3 text-[#0F2976] rounded-lg font-bold text-lg border border-[#0F2976] hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalPasswordEdit;