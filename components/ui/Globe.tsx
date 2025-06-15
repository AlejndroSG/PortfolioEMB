"use client";
import React, { useEffect, useRef, useState, memo } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import countries from "@/data/globe.json";

// Tipo para los datos de un arco en el globo
interface GlobePoint {
  arcID: string;
  width?: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  label?: string;
}

// Tipo para la configuración del globo
interface GlobeConfig {
  globeColor?: string;
  ambientLight?: string;
  polygonColor?: string;
  glowColor?: string;
  autoRotate?: boolean;
  initialPosition?: { lat: number; lng: number };
}

// Tamaño del SVG
const SVG_SIZE = 600;

// Función para convertir lat/lng a coordenadas SVG
function latLngToSvgPosition(lat: number, lng: number, radius: number): [number, number] {
  // Convertir a radianes
  const latRad = (90 - lat) * (Math.PI / 180);
  const lngRad = (lng + 90) * (Math.PI / 180);
  
  // Calcular posición en el círculo
  const x = SVG_SIZE/2 + radius * Math.sin(latRad) * Math.cos(lngRad);
  const y = SVG_SIZE/2 + radius * Math.sin(latRad) * Math.sin(lngRad);
  
  return [x, y];
}

// Interfaz para los props del componente World
interface WorldProps {
  globeConfig: GlobeConfig;
  data: GlobePoint[];
}

// Componente para renderizar el globo con SVG (memoizado para mejor rendimiento)
const GlobeObject = memo(function GlobeObject({ globeConfig, data }: WorldProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [rotation, setRotation] = useState(0);
  
  // Efecto para la rotación automática del globo
  useEffect(() => {
    if (globeConfig.autoRotate) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [globeConfig.autoRotate]);
  
  // Calcular la posición inicial
  useEffect(() => {
    if (globeConfig.initialPosition) {
      const initialRot = (globeConfig.initialPosition.lng + 270) % 360;
      setRotation(initialRot);
    }
  }, [globeConfig.initialPosition]);
  
  // Calcular las posiciones de los puntos y arcos
  const radius = SVG_SIZE / 3;
  const points: Array<{x: number, y: number, color: string}> = [];
  const arcs: Array<{start: [number, number], end: [number, number], color: string}> = [];
  
  // Procesar datos para crear puntos y arcos
  data.forEach(point => {
    const startPos = latLngToSvgPosition(point.startLat, point.startLng, radius);
    const endPos = latLngToSvgPosition(point.endLat, point.endLng, radius);
    
    points.push({x: startPos[0], y: startPos[1], color: point.color});
    points.push({x: endPos[0], y: endPos[1], color: point.color});
    
    arcs.push({
      start: startPos,
      end: endPos,
      color: point.color
    });
  });
  
  // Color por defecto si no se especifica
  const globeColor = globeConfig.globeColor || "#062056";
  const outlineColor = globeConfig.polygonColor || "rgba(255,255,255,0.7)";
  const ambientLight = globeConfig.ambientLight || "#38bdf8";
  
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg
        ref={svgRef}
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        className="max-w-full max-h-full"
      >
        {/* Globo base */}
        <motion.g 
          animate={{ rotateY: rotation }}
          style={{ 
            transformOrigin: "center",
            transformBox: "fill-box"
          }}
        >
          {/* Círculo principal */}
          <circle
            cx={SVG_SIZE/2}
            cy={SVG_SIZE/2}
            r={radius}
            fill={globeColor}
            stroke={outlineColor}
            strokeWidth={1}
            opacity={0.9}
          />
          
          {/* Líneas de latitud */}
          {[15, 30, 45, 60, 75].map((lat) => (
            <ellipse
              key={`lat-${lat}`}
              cx={SVG_SIZE/2}
              cy={SVG_SIZE/2}
              rx={radius * Math.cos((lat * Math.PI) / 180)}
              ry={radius}
              fill="none"
              stroke={outlineColor}
              strokeWidth={0.5}
              opacity={0.3}
            />
          ))}
          
          {/* Líneas de longitud */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((lng) => (
            <line
              key={`lng-${lng}`}
              x1={SVG_SIZE/2}
              y1={SVG_SIZE/2 - radius}
              x2={SVG_SIZE/2}
              y2={SVG_SIZE/2 + radius}
              stroke={outlineColor}
              strokeWidth={0.5}
              opacity={0.3}
              transform={`rotate(${lng}, ${SVG_SIZE/2}, ${SVG_SIZE/2})`}
            />
          ))}
          
          {/* Arcos entre puntos */}
          {arcs.map((arc, i) => {
            // Calcular punto de control para curva
            const dx = arc.end[0] - arc.start[0];
            const dy = arc.end[1] - arc.start[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Punto medio elevado para crear un arco
            const midX = (arc.start[0] + arc.end[0]) / 2;
            const midY = (arc.start[1] + arc.end[1]) / 2;
            const elevation = dist * 0.2;
            
            const controlX = midX;
            const controlY = midY - elevation;
            
            return (
              <motion.path
                key={`arc-${i}`}
                d={`M ${arc.start[0]},${arc.start[1]} Q ${controlX},${controlY} ${arc.end[0]},${arc.end[1]}`}
                fill="none"
                stroke={arc.color}
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 0.7,
                  transition: { 
                    duration: 2, 
                    delay: i * 0.1 % 1 
                  } 
                }}
              />
            );
          })}
          
          {/* Puntos en el globo */}
          {points.map((point, i) => (
            <motion.circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r={3}
              fill={point.color}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                transition: { 
                  duration: 0.5, 
                  delay: (i * 0.1) % 2 
                } 
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
})

// Componente World exportable que solo se renderiza cuando está en la vista
export function World(props: WorldProps) {
  return (
    <div className="world-container w-full h-full">
      <GlobeObject {...props} />
    </div>
  );
}

export type { GlobePoint, GlobeConfig };
