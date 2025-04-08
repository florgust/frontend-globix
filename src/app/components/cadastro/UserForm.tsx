"use client";

import React, { useState } from 'react';
import axios from 'axios';
import GoogleAuthButton from '../ui/GoogleAuthButton';
import styles from './UserForm.module.css';

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        terms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.terms) {
            alert('Você deve aceitar os Termos de Uso e a Política de Privacidade.');
            return;
        }

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
                alert('Conta criada com sucesso!');
                // Redirecionar ou limpar o formulário, se necessário
            }
        } catch (error: any) {
            console.error('Erro ao enviar os dados:', error);
            alert(error.response?.data?.message || 'Ocorreu um erro ao criar a conta. Tente novamente mais tarde.');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>Nome Completo:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Digite seu nome completo"
                    className={styles.input}
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>E-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu email principal"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    className={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.terms}>
                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                />
                <label htmlFor="terms">
                    Ao criar uma conta, você concorda com nossas <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>.
                </label>
            </div>
            <button type="submit" className={styles.button}>Criar Conta</button>
            <div className={styles.divider}>ou</div>
            <GoogleAuthButton />
            <p className={styles.loginLink}>
                Já tem uma conta? <a href="/login">Entrar</a>
            </p>
        </form>
    );
};

export default UserForm;