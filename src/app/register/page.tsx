'use client';

import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { GoogleButton } from '../components/GoogleButton';
import { AuthCard } from '../components/AuthCard';
import { ImageCarousel } from '../components/ImageCarousel';
import { Alert } from '../components/Alert';
import { SuccessAlert } from '../components/SuccessAlert';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const [inputErrors, setInputErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para o SuccessAlert

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        setInputErrors({
            ...inputErrors,
            [name]: '', // Limpa o erro do campo correspondente
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação dos campos
        const newInputErrors = {
            username: !formData.username ? 'O nome não pode estar vazio.' : '',
            email: !formData.email ? 'O e-mail não pode estar vazio.' : '',
            password: !formData.password ? 'A senha não pode estar vazia.' : '',
            confirmPassword: !formData.confirmPassword ? 'A confirmação de senha não pode estar vazia.' : '',
        };

        setInputErrors(newInputErrors);

        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (!formData.terms) {
            setError('Você deve aceitar os Termos de Uso e a Política de Privacidade.');
            return;
        }

        setError('');

        const payload = {
            nome: formData.username,
            email: formData.email,
            senha: formData.password,
            tipo: 'participante',
        };

        try {
            const response = await axios.post('https://globix-afaea8fe15ce.herokuapp.com/usuario', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                setSuccessMessage('Conta criada com sucesso!'); // Exibe o SuccessAlert
                setFormData({ // Limpa o formulário
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    terms: false,
                });

                // Redireciona para a tela de login após 2 segundos
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const backendData = error.response?.data;

                // Verifica se o backend retornou um array de erros
                if (Array.isArray(backendData)) {
                    const firstError = backendData[0]?.message || 'Erro desconhecido.';
                    setError(firstError);
                } else {
                    setError(backendData?.message || 'Ocorreu um erro ao criar a conta. Tente novamente mais tarde.');
                }
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
        }
    };

    return (
        <main className="flex h-screen">
            {/* Card de registro */}
            <AuthCard>
                <Image
                    src="/register/logo-globix.png"
                    alt="Logo Globix"
                    width={220}
                    height={60}
                    className="mb-6"
                />

                <h1 className="text-white text-xl font-semibold mb-1">Crie sua conta!</h1>
                <p className="text-white text-base mb-6">Cadastre-se para criar viagens incríveis.</p>

                <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="text-white text-sm mb-1 block">Nome</label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Digite seu nome completo"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            errorMessage={inputErrors.username}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="text-white text-sm mb-1 block">E-mail</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            errorMessage={inputErrors.email}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="text-white text-sm mb-1 block">Senha</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            errorMessage={inputErrors.password}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="text-white text-sm mb-1 block">Confirmar Senha</label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirme sua senha"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            errorMessage={inputErrors.confirmPassword}
                        />
                    </div>

                    {error && (
                        <div className="mb-4">
                            <Alert message={error} type="error" />
                        </div>
                    )}

                    <div className="flex items-center mb-6">
                        <Checkbox
                            label="Aceito os termos e condições"
                            checked={formData.terms}
                            onChange={() =>
                                handleChange({
                                    target: {
                                        name: 'terms',
                                        type: 'checkbox',
                                        checked: !formData.terms,
                                    },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#96ABE9] text-white py-2 rounded-full font-semibold hover:bg-[#7485ec] transition cursor-pointer mb-2 w-3/4 mx-auto"
                    >
                        Cadastrar
                    </button>

                    <div className="border-t border-white w-3/4 mx-auto mb-2"></div>

                    <GoogleButton />

                    <p className="text-white text-sm text-center mt-4">
                        Já tem uma conta? <a href="/login" className="underline font-semibold cursor-pointer">Entrar</a>
                    </p>
                </form>
            </AuthCard>

            {/* Carrossel de imagens */}
            <ImageCarousel />

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