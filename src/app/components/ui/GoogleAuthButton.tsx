import React from 'react';
import Image from 'next/image'; 
import styles from './GoogleAuthButton.module.css';

const GoogleAuthButton: React.FC = () => {
    return (
        <button className={styles.googleButton}>
            <Image
                src="/icons/google-icon.svg" // Adicione o ícone do Google na pasta public/icons
                alt="Google Icon"
                className={styles.googleIcon}
                width={20} // Largura do ícone
                height={20} // Altura do ícone
            />
            Cadastre-se com a conta do Google
        </button>
    );
};

export default GoogleAuthButton;