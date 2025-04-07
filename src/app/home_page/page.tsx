'use client'; // Adicione isso no topo do arquivo para garantir que o Swiper seja renderizado no cliente

import './styles.model.css';
import React from 'react';  
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { register } from 'swiper/element/bundle'

register();

const data = [
    { id: 1, image: '/home_page/rifaina-capa.svg', title: 'Viagem Rifaina' },       
    { id: 2, image: '/home_page/marco.jpg', title: 'Viagem 2' },
    { id: 3, image: '/home_page/carrossel.png', title: 'Viagem 3' },
];

const links = [
    { label: "Página Principal", href: "/", icon: <Image src="/home_page/Icone-maleta.png" alt="Home" width={24} height={24} /> },
    { label: "Minhas Viagens", href: "/travels", icon: <Image src="/icons/Icone-maleta.png" alt="Travel" width={24} height={24} /> },
];

export default function HomePage() {
    return (
        <div className="container">
            <div className="button-container">
                <button className="button blue">
                    <Image 
                        src="/home_page/Icone-maleta.png" 
                        alt="Criar Viagem" 
                        className="icon" 
                        width={50} 
                        height={50} 
                    />
                    Criar Viagem
                </button>

                <button className="button green">
                    <Image
                        src="/home_page/Icone-adc-user.png" 
                        alt="Participar de Viagem" 
                        className="icon" 
                        width={50} 
                        height={50} 
                    />
                    Participar de Viagem
                </button>
            </div>

            <h2 className="title">Viagens disponíveis para você</h2>

            <div className="swiper-container">
                <Swiper
                    slidesPerView={1}
                    pagination={{ clickable: true }}   
                    navigation={true}
                >
                {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="slide-content">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="slide-item" 
                                />
                            <div className="hover-info">
                                <h3>{item.title}</h3>
                                <p>Informações adicionais sobre a viagem.</p>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
            </div>
        </div>
    );
}