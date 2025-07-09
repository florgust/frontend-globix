import React, { useEffect, useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import Image from "next/image";
import api, { axios } from "@/utils/axios";
import Cookies from "js-cookie";
import { getDefaultImage } from "@/utils/imageUtils";

interface ModalProfileEditProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenPassword: () => void;
}

const ModalProfileEdit: React.FC<ModalProfileEditProps> = ({
    isOpen,
    onClose,
    onOpenPassword,
}) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    const [profileImage, setProfileImage] = useState<string>(
        getDefaultImage("user")
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            loadUserData();
        }
    }, [isOpen]);

    const handleCancel = () => {
        setNome("");
        setEmail("");
        setError("");
        handleCancelPhotoSelection();
        onClose();
    };

    const loadUserData = async () => {
        const usuarioCookie = Cookies.get("usuario");
        if (usuarioCookie) {
            try {
                const usuarioObj = JSON.parse(usuarioCookie);
                const id = usuarioObj.id;

                // Buscar usuário com foto
                const response = await api.get(`/foto/perfil/${id}`);
                const userData = response.data;

                setNome(userData.nome || "");
                setEmail(userData.email || "");

                if (userData.url) {
                    setProfileImage(userData.url);
                } else {
                    getDefaultImage("user");
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                getDefaultImage("user");
            }
        }
    };

    // ✨ Função para selecionar arquivo
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ];
            if (!allowedTypes.includes(file.type)) {
                setError("Por favor, selecione uma imagem válida (JPG, PNG ou WebP)");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError("A imagem deve ter no máximo 5MB");
                return;
            }

            setSelectedFile(file);
            setError("");

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancelPhotoSelection = () => {
        setSelectedFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handlePhotoUpload = async () => {
        if (!selectedFile) return;

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

        setUploadingPhoto(true);
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await api.post(`/foto/perfil/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Atualizar a imagem de perfil
            setProfileImage(response.data.url);
            setSelectedFile(null);
            setPreviewUrl("");

            // Limpar o input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            console.log("✅ Foto de perfil atualizada com sucesso!");
        } catch (err) {
            console.error("❌ Erro ao fazer upload:", err);
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Erro ao fazer upload da foto");
            } else {
                setError("Erro ao fazer upload da foto");
            }
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleRemovePhoto = async () => {
        if (!profileImage || profileImage === getDefaultImage("user")) {
            setError("Não há foto para remover");
            return;
        }

        const usuarioCookie = Cookies.get("usuario");
        if (usuarioCookie) {
            try {
                const usuarioObj = JSON.parse(usuarioCookie);
                const id = usuarioObj.id;

                setUploadingPhoto(true);

                // Buscar a foto atual
                const response = await api.get(`/foto/perfil/${id}`);
                if (response.data?.id) {
                    // Deletar a foto
                    await api.delete(`/foto/${response.data.id}`);

                    // Voltar para imagem padrão
                    setProfileImage(getDefaultImage("user"));
                    setError("");

                    console.log("✅ Foto removida com sucesso!");
                }
            } catch (err) {
                console.error("❌ Erro ao remover foto:", err);
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || "Erro ao remover foto");
                } else {
                    setError("Erro ao remover foto");
                }
            } finally {
                setUploadingPhoto(false);
            }
        }
    };

    const handleSave = async () => {
        setError("");

        // Se há uma foto selecionada, fazer upload primeiro
        if (selectedFile) {
            await handlePhotoUpload();
        }
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
                    <h1 className="font-bold text-4xl text-white text-center w-full">
                        Editar perfil
                    </h1>
                </div>

                <div className="flex items-center justify-center mb-6 relative">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden relative">
                            <Image
                                src={previewUrl || profileImage}
                                alt="Profile"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                                onError={() => setProfileImage(getDefaultImage("user"))}

                            />
                            {profileImage !== getDefaultImage("user") && !previewUrl && (
                                <button
                                    onClick={handleRemovePhoto}
                                    disabled={uploadingPhoto}
                                    className="absolute top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
                                    title="Remover foto"
                                >
                                    <X size={16} />
                                </button>
                            )}
                            {uploadingPhoto && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            {!selectedFile ? (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-[#D9D9D9] bg-opacity-20 rounded-lg font-bold cursor-pointer hover:scale-110 transition-transform text-white flex items-center gap-2"
                                    disabled={uploadingPhoto}
                                >
                                    <Camera size={16} />
                                    Editar foto
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePhotoUpload}
                                        className="px-3 py-1 bg-green-600 rounded-lg text-white text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                                        disabled={uploadingPhoto}
                                    >
                                        <Upload size={14} />
                                        Salvar foto
                                    </button>
                                    <button
                                        onClick={handleCancelPhotoSelection}
                                        className="px-3 py-1 bg-red-600 rounded-lg text-white text-sm hover:bg-red-700 transition-colors"
                                        disabled={uploadingPhoto}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>

                </div>

                <div className="flex flex-col gap-6 items-center">
                    <div className="w-full max-w-120">
                        <label className="block text-[#FFFFFD] mb-2 text-left">
                            Nome 👤
                        </label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            className="rounded-[0.5rem] w-full p-2 bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="w-full max-w-120">
                        <label className="block text-[#FFFFFD] mb-2 text-left">
                            Email ✉️
                        </label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            className="rounded-[0.5rem] w-full p-2 bg-[#F9F9F9] text-[#1E1E1E] border border-gray-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
