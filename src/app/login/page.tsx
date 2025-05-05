'use client';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/Checkbox';
import { GoogleButton } from '@/components/ui/GoogleButton';
import { AuthCard } from '@/components/ui/AuthCard';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { SuccessAlert } from '@/components/ui/SuccessAlert';

import { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [inputErrors, setInputErrors] = useState({
        email: '',
        password: '',
    });

    const [remember, setRemember] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Limpa o erro do campo correspondente ao digitar
        setInputErrors({
            ...inputErrors,
            [name]: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação dos campos
        const newInputErrors = {
            email: !formData.email ? 'O e-mail não pode estar vazio.' : '',
            password: !formData.password ? 'A senha não pode estar vazia.' : '',
        };

        setInputErrors(newInputErrors);

        // Verifica se há erros
        if (Object.values(newInputErrors).some((error) => error !== '')) {
            return; // Interrompe o envio se houver erros
        }

        // Simulação de login bem-sucedido
        setSuccessMessage('Login realizado com sucesso!');

        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 2000);
    };

    return (
        <main className="flex h-screen">
            {/* Carrossel de imagens */}
            <ImageCarousel />

            {/* Card de login */}
            <AuthCard>
                <Image
                    src="/images-login/globix-logo.png"
                    alt="Logo Globix"
                    width={220}
                    height={60}
                    className="mb-6"
                />

                <h1 className="text-white text-xl font-semibold mb-1">Bem-vindo!</h1>
                <p className="text-white text-base mb-6">Faça login para continuar.</p>

                <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-white text-sm mb-1 block">E-mail</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            errorMessage={inputErrors.email} // Passa a mensagem de erro
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="text-white text-sm mb-1 block">Senha</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={formData.password}
                            onChange={handleChange}
                            errorMessage={inputErrors.password} // Passa a mensagem de erro
                        />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <Checkbox label="Lembrar conta" checked={remember} onChange={() => setRemember(!remember)} />
                        <a href="/initial" className="text-white text-xs hover:text-gray-300">Esqueceu a senha?</a>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#96ABE9] text-white py-2 rounded-full font-semibold hover:bg-[#7485ec] transition cursor-pointer mb-2 w-3/4 mx-auto"
                    >
                        Entrar
                    </button>

                    <div className="border-t border-white w-3/4 mx-auto mb-2"></div>

                    <GoogleButton />

                    <p className="text-white text-sm text-center mt-4">
                        Não tem uma conta? <a href="/register" className="underline font-semibold cursor-pointer">Cadastrar</a>
                    </p>
                </form>
            </AuthCard>

            {/* SuccessAlert */}
            {successMessage && (
                <SuccessAlert
                    message={successMessage}
                    onClose={() => setSuccessMessage('')}
                />
            )}
        </main>
    );
}