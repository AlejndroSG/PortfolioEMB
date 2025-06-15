"use client";

import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowPowerDevice: boolean;
}

export default function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowPowerDevice: false,
  });

  useEffect(() => {
    // Solo se ejecuta en el cliente
    if (typeof window === 'undefined') return;
    
    const updateDeviceInfo = () => {
      const ua = navigator.userAgent;
      const width = window.innerWidth;
      
      // Detectar si es móvil por user agent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileByUA = mobileRegex.test(ua);
      
      // Detectar por tamaño de pantalla
      const isMobileBySize = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      
      // Determinar si es un dispositivo de baja potencia
      // Esto es una heurística básica, podría mejorarse
      const isLowPower = isMobileByUA || navigator.hardwareConcurrency <= 4;
      
      setDeviceInfo({
        isMobile: isMobileBySize || isMobileByUA,
        isTablet,
        isDesktop,
        isLowPowerDevice: isLowPower,
      });
    };
    
    // Detectar inicialmente
    updateDeviceInfo();
    
    // Actualizar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', updateDeviceInfo);
    
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}
