'use client';

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Digite um e-mail válido");
            setSuccessMessage("");
            setTimeout(() => setError(""), 4000);
        } else {
            setError("");
            setSuccessMessage("E-mail cadastrado com sucesso!");
            setEmail("");
            setTimeout(() => setSuccessMessage(""), 4000);
        }
    };

    return (
        <footer className="bg-[#102976] text-white px-4 sm:px-8 md:px-16 lg:px-24 py-8 relative w-full">
            <div className="flex flex-wrap justify-between w-full gap-y-12 gap-x-8 max-w-7xl mx-auto">
                {/* Logo + Back to Top */}
                <div className="flex flex-col items-center md:items-start gap-4 min-w-[200px] flex-1 cursor-pointer">
                    <Image src={"/images-login/globix-logo.png"} alt="Globix Logo" width={160} height={40} />
                    <div className="flex justify-center items-center w-full">
                        <button
                            onClick={scrollToTop}
                            className="bg-white text-[#0A2C82] p-2 rounded-full hover:scale-110 transition"
                            aria-label="Voltar ao topo"
                        >
                            <ArrowUp size={20} />
                        </button>
                    </div>
                </div>

                {/* Saiba Mais */}
                <div className="space-y-4 min-w-[180px] flex-1">
                    <h3 className="font-semibold">Saiba Mais</h3>
                    <ul className="text-sm text-gray-200">
                        <li className="my-3"><a href="#">Sobre Nós</a></li>
                        <li className="mb-3"><a href="#">Termos de Uso</a></li>
                        <li className="mb-3"><a href="#">Trabalhe Conosco</a></li>
                        <li className="mb-3"><a href="#">Política de Privacidade</a></li>
                    </ul>
                </div>

                {/* Entre em Contato */}
                <div className="space-y-4 min-w-[200px] flex-1">
                    <h3 className="font-semibold">Entre em Contato</h3>
                    <ul className="text-sm text-gray-200">
                        <li className="my-3"><span className="font-medium">E-mail:</span> suporte@globix.com</li>
                        <li className="mb-3"><span className="font-medium">Telefone:</span> 123-456-7890</li>
                        <li className="mb-3"><span className="font-medium">Endereço:</span> Manoel Mendes</li>
                    </ul>
                </div>

                {/* Redes Sociais */}
                <div className="space-y-4 min-w-[180px] flex-1">
                    <h3 className="font-semibold">Redes Sociais</h3>
                    <div className="flex gap-4 text-xl text-white my-3 flex-wrap">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaYoutube /></a>
                    </div>
                </div>

                {/* Atualizações */}
                <div className="space-y-4 w-full md:w-auto flex-1 min-w-[220px] max-w-sm">
                    <h3 className="font-semibold">Atualizações</h3>
                    <div className={`flex border rounded-md overflow-hidden mt-3 ${error ? 'border-red-500' : 'border-white'}`}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu endereço de email"
                            className="bg-transparent px-3 py-2 w-full placeholder-gray placeholder:text-sm text-white outline-none"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-white text-[#0A2C82] px-4 hover:bg-gray-100 transition"
                            aria-label="Enviar email"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 bg-red-100 text-red-600 border border-red-400 rounded-md p-2 mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h10m0 0l-4-4m4 4l-4 4" />
                            </svg>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                    {successMessage && (
                        <div className="flex items-center gap-2 bg-green-100 text-green-600 border border-green-400 rounded-md p-2 mt-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-sm">{successMessage}</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Linha inferior */}
            <hr className="border-gray-500 mt-4" />
            <p className="text-center text-sm text-gray-300 mt-8 mb-0">© 2025 Globix | Todos os direitos reservados</p>
        </footer>
    );
};

export default Footer;