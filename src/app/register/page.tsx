import UserForm from '@/app/components/UserForm';
import React from 'react';
import Image from 'next/image'; 
import styles from './styles.module.css';

const RegisterPage: React.FC = () => {
    return (
        <div className={`${styles.container}`}>
            {/* Seção da imagem */}
            <div className={styles.imageSection}>
            <Image
                    src="/register/register-image.png" // Caminho relativo à pasta public
                    alt="Imagem de cadastro"
                    className={styles.image}
                    width={500} // Largura da imagem
                    height={500} // Altura da imagem
                    priority // Carrega a imagem com prioridade
                />
            </div>

            {/* Seção do formulário */}
            <div className={styles.formSection}>
                <h1 className={styles.title}>Cadastro de Usuário</h1>
                <UserForm />
            </div>
        </div>
    );
};

export default RegisterPage;