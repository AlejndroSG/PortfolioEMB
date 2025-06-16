"use client";

import { useState, useEffect, useCallback } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowPowerDevice: boolean;
  isTouch: boolean;
  browserName: string;
  osName: string;
  isIOS: boolean;
  isAndroid: boolean;
  isHighResolution: boolean;
  orientation: 'portrait' | 'landscape' | 'unknown';
  connectionType?: string;
  connectionSpeed?: 'slow' | 'medium' | 'fast' | 'unknown';
}

export default function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowPowerDevice: false,
    isTouch: false,
    browserName: 'unknown',
    osName: 'unknown',
    isIOS: false,
    isAndroid: false,
    isHighResolution: false,
    orientation: 'unknown',
    connectionSpeed: 'unknown'
  });

  // Detector de navegador y sistema operativo
  const detectBrowserAndOS = useCallback((): { browserName: string; osName: string; isIOS: boolean; isAndroid: boolean } => {
    if (typeof window === 'undefined' || !navigator) {
      return { browserName: 'unknown', osName: 'unknown', isIOS: false, isAndroid: false };
    }
    
    const ua = navigator.userAgent;
    let browserName = 'unknown';
    let osName = 'unknown';
    
    // Detectar navegador
    if (ua.indexOf('Firefox') > -1) {
      browserName = 'Firefox';
    } else if (ua.indexOf('SamsungBrowser') > -1) {
      browserName = 'Samsung Browser';
    } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
      browserName = 'Opera';
    } else if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) {
      browserName = 'Edge';
    } else if (ua.indexOf('Chrome') > -1) {
      browserName = 'Chrome';
    } else if (ua.indexOf('Safari') > -1) {
      browserName = 'Safari';
    } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) {
      browserName = 'Internet Explorer';
    }
    
    // Detectar sistema operativo
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/.test(ua);
    
    if (isIOS) {
      osName = 'iOS';
    } else if (isAndroid) {
      osName = 'Android';
    } else if (/Windows/.test(ua)) {
      osName = 'Windows';
    } else if (/Mac OS/.test(ua)) {
      osName = 'macOS';
    } else if (/Linux/.test(ua)) {
      osName = 'Linux';
    }
    
    return { browserName, osName, isIOS, isAndroid };
  }, []);

  // Detectar tipo de conexión
  const detectConnectionSpeed = useCallback((): { connectionType?: string; connectionSpeed: 'slow' | 'medium' | 'fast' | 'unknown' } => {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) {
      return { connectionSpeed: 'unknown' };
    }
    
    // @ts-ignore - El tipo de conexión no está en todos los navegadores
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (!connection) {
      return { connectionSpeed: 'unknown' };
    }
    
    let speed: 'slow' | 'medium' | 'fast' | 'unknown' = 'unknown';
    
    // Detectar velocidad basada en el tipo de conexión
    if (connection.effectiveType === '4g') {
      speed = 'fast';
    } else if (connection.effectiveType === '3g') {
      speed = 'medium';
    } else if (['2g', 'slow-2g'].includes(connection.effectiveType)) {
      speed = 'slow';
    }
    
    return {
      connectionType: connection.effectiveType,
      connectionSpeed: speed
    };
  }, []);

  useEffect(() => {
    // Solo se ejecuta en el cliente
    if (typeof window === 'undefined') return;
    
    const updateDeviceInfo = () => {
      const ua = navigator.userAgent;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Detectar si es móvil por user agent
      const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const tabletRegex = /iPad|tablet|Tablet/i;
      const isMobileByUA = mobileRegex.test(ua) && !tabletRegex.test(ua);
      const isTabletByUA = tabletRegex.test(ua);
      
      // Detectar por tamaño de pantalla
      const isMobileBySize = width < 768;
      const isTablet = (width >= 768 && width < 1024) || isTabletByUA;
      const isDesktop = width >= 1024 && !isTabletByUA;
      
      // Detectar si el dispositivo es táctil
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Determinar si es un dispositivo de baja potencia
      const isLowPower = isMobileByUA || 
                         (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || 
                         // @ts-ignore - deviceMemory no está en todos los navegadores pero es estándar W3C
                         (('deviceMemory' in navigator) && (navigator as any).deviceMemory < 4);
      
      // Detectar alta resolución (Retina o similar)
      const isHighResolution = window.devicePixelRatio > 1.5;
      
      // Detectar orientación del dispositivo
      let orientation: 'portrait' | 'landscape' | 'unknown' = 'unknown';
      if (typeof window.orientation !== 'undefined') {
        orientation = Math.abs(window.orientation as number) === 90 ? 'landscape' : 'portrait';
      } else {
        orientation = height > width ? 'portrait' : 'landscape';
      }
      
      // Obtener información del navegador y sistema operativo
      const { browserName, osName, isIOS, isAndroid } = detectBrowserAndOS();
      
      // Obtener información de conexión
      const { connectionType, connectionSpeed } = detectConnectionSpeed();
      
      setDeviceInfo({
        isMobile: isMobileBySize || isMobileByUA,
        isTablet,
        isDesktop,
        isLowPowerDevice: isLowPower,
        isTouch,
        browserName,
        osName,
        isIOS,
        isAndroid,
        isHighResolution,
        orientation,
        connectionType,
        connectionSpeed
      });
    };
    
    // Detectar inicialmente
    updateDeviceInfo();
    
    // Actualizar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', updateDeviceInfo);
    
    // Actualizar cuando cambia la orientación del dispositivo
    window.addEventListener('orientationchange', updateDeviceInfo);
    
    // Actualizar cuando cambia el tipo de conexión
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      // @ts-ignore - El evento change no está en todos los navegadores
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        connection.addEventListener('change', updateDeviceInfo);
      }
    }
    
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
      
      if (typeof navigator !== 'undefined' && 'connection' in navigator) {
        // @ts-ignore
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          connection.removeEventListener('change', updateDeviceInfo);
        }
      }
    };
  }, [detectBrowserAndOS, detectConnectionSpeed]);

  return deviceInfo;
}
