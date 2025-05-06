'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  { src: '/images-login/imagem-dunas.jpg', alt: 'Imagem de dunas' },
  { src: '/images-login/imagem-maldivas.jpg', alt: 'Imagem de maldivas' },
  { src: '/images-login/imagem-mar.jpg', alt: 'Imagem de mar' },
  { src: '/images-login/imagem-paisagem.jpg', alt: 'Imagem de paisagem' },
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="w-1/2 relative h-full">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === currentIndex}
          />
        </div>
      ))}
    </div>
  );
}