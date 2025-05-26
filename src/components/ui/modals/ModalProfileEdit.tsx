import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import api, { axios } from "@/utils/axios";
import Cookies from "js-cookie";

interface ModalProfileEditProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenPassword: () => void;
}

const ModalProfileEdit: React.FC<ModalProfileEditProps> = ({ isOpen, onClose, onOpenPassword }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {
        setNome("");
        setEmail("");
        setError("");
        onClose();
    };

    const handleSave = async () => {
        setError("");
        // Se ambos os campos estiverem vazios, apenas fecha o modal
        if (!nome && !email) {
            handleCancel();
            return;
        }

        // Pega o id do usuário do cookie
        const usuarioCookie = Cookies.get("usuario");
        let id;
        let usuarioObj;
        if (usuarioCookie) {
            try {
                usuarioObj = JSON.parse(usuarioCookie);
                id = usuarioObj.id;
            } catch {
                setError("Erro ao obter usuário.");
                return;
            }
        } else {
            setError("Usuário não autenticado.");
            return;
        }

        const body: { nome?: string; email?: string } = {};
        if (nome) body.nome = nome;
        if (email) body.email = email;

        setLoading(true);
        try {
            await api.put(`/usuario/${id}`, body);
            // Atualiza o cookie com os novos dados
            const updatedUser = {
                ...usuarioObj,
                ...body,
            };
            Cookies.set("usuario", JSON.stringify(updatedUser), { expires: 7 });
            handleCancel();
            window.location.reload(); // <-- Força o reload da página
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                    "Erro ao atualizar perfil. Tente novamente."
                );
            } else {
                setError("Erro ao atualizar perfil. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="relative w-4/12 bg-[#0F2976] rounded-lg shadow-lg p-8 mt-12 border border-[#FFFFFF]">
                {/* Botão X */}
                <button
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors cursor-pointer"
                    aria-label="Fechar"
                >
                    <X size={24} />
                </button>

                <div className="flex justify-center mb-4">
                    <h1 className="font-bold text-4xl text-white text-center w-full">Editar perfil</h1>
                </div>

                <div className="flex items-center justify-center mb-6 relative">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden relative">
                            <Image
                                src="/images-profile/mauro.svg"
                                alt="Profile"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="mt-4 p-2 bg-[#D9D9D9] bg-opacity-10 rounded-[0.5rem] font-bold cursor-pointer hover:scale-110 transition-transform text-[#0F2976]">
                            Editar foto
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6 items-center">
                    <div className="w-full max-w-120">
                        <label className="block text-[#FFFFFD] mb-2 text-left">Nome 👤</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            className="rounded-[0.5rem] w-full p-2 bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </div>
                    <div className="w-full max-w-120">
                        <label className="block text-[#FFFFFD] mb-2 text-left">Email ✉️</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            className="rounded-[0.5rem] w-full p-2 bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6 w-full max-w-120 mx-auto">
                    <h3 className="text-[#FFFFFD] font-bold">Senha</h3>
                    <div className="flex items-center justify-between bg-transparent mt-2">
                        <div className="flex items-center ml-0">
                            <div className="w-8 h-8 rounded-full bg-[#FFFFFF] mr-2 flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/images-profile_edit/senha.svg"
                                    alt="Senha"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                />
                            </div>
                            <button
                                className="ml-1 px-4 py-1 bg-[#163a9c] text-[#4182F9] rounded transition-colors text-sm hover:scale-110 transition-transform cursor-pointer"
                                onClick={onOpenPassword}
                            >
                                Alterar senha
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="w-full text-red-400 text-sm text-center font-bold mt-4">
                        {error}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <div className="flex w-full max-w-120 gap-4 font-bold">
                        <button
                            className="flex-1 px-6 py-2 bg-[#FFFFFF] text-[#0F2976] rounded cursor-pointer hover:scale-110 transition-transform disabled:opacity-60"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            Salvar alterações
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 px-6 py-2 text-[#FFFFFF] rounded cursor-pointer hover:scale-110 transition-transform border border-white"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProfileEdit;