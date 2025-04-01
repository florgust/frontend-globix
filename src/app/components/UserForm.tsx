import React from 'react';
import styles from './UserForm.module.css';

const UserForm: React.FC = () => {
    return (
        <form className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>Nome de Usuário:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Digite seu nome de usuário"
                    className={styles.input}
                />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu email"
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
            <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
    );
};

export default UserForm;