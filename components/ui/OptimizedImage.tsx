"use client";

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

/**
 * Componente de imagen optimizado que soluciona problemas comunes de Next.js Image:
 * - Añade automáticamente la propiedad sizes cuando se usa fill=true
 * - Mantiene la relación de aspecto correcta
 * - Proporciona un fallback para imágenes que fallan al cargar
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  fill, 
  width, 
  height,
  style,
  className,
  fallbackSrc = '/emb-logo.svg',
  ...rest 
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  // Si se usa fill pero no hay sizes, proporcionamos un valor predeterminado
  const sizes = rest.sizes || (fill ? '100vw' : undefined);
  
  // Si se modifica width o height pero no ambos, aseguramos que se mantenga la relación de aspecto
  const imageStyle = {
    ...style,
    ...(width && !height && !fill ? { height: 'auto' } : {}),
    ...(!width && height && !fill ? { width: 'auto' } : {}),
  };

  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc);
      setError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      style={imageStyle}
      className={className}
      sizes={sizes}
      onError={handleError}
      {...rest}
    />
  );
};

export default OptimizedImage;
