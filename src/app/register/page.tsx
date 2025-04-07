import UserForm from '@/app/components/cadastro/UserForm';
import React from 'react';
import Image from 'next/image'; 
import styles from './styles.module.css';

const RegisterPage: React.FC = () => {
    return (
        <div className={`${styles.container}`}>
            {/* Seção do formulário */}
            <div className={styles.formSection}>
                <div className={styles.logo}>
                    <Image
                        src="/register/logo-globix.png" // Caminho relativo à pasta public
                        alt="Logo Globix"
                        width={300} // Largura da logo
                        height={250} // Altura da logo
                        priority
                        style={{
                            objectFit: 'contain', // Ajusta a imagem
                            clipPath: 'inset(10%)', // Opcional: corta o espaço em branco
                        }}
                    />
                </div>
                <h1 className={styles.title}>Bem-vindo! Cadastre-se para criar Viagens Incríveis!</h1>
                <UserForm />
            </div>

            {/* Seção da imagem */}
            <div className={styles.imageSection}>
                <Image
                    src="/register/register-image.png" // Caminho relativo à pasta public
                    alt="Imagem de cadastro"
                    className={styles.image}
                    fill // Ocupa o espaço disponível
                    priority
                />
            </div>
        </div>
    );
};

export default RegisterPage;