import React from 'react';
import GoogleAuthButton from '../ui/GoogleAuthButton';
import styles from './UserForm.module.css';

const UserForm: React.FC = () => {
    return (
        <form className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>Nome Completo:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Digite seu nome completo"
                    className={styles.input}
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
                />
            </div>
            <div className={styles.terms}>
                <input type="checkbox" id="terms" name="terms" />
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