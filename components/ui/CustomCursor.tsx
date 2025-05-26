"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    // Mostrar el cursor personalizado cuando el mouse se mueve
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    // Detectar cuando el cursor está sobre enlaces
    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHover(true));
        el.addEventListener("mouseleave", () => setLinkHover(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  // Estilos para el cursor principal
  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    transform: `scale(${clicked ? 0.8 : linkHover ? 1.5 : 1})`,
    backgroundColor: linkHover ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.2)",
  };

  // Estilos para el cursor secundario (efecto de seguimiento)
  const secondaryCursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 0.5,
    transform: `scale(${clicked ? 1.2 : linkHover ? 2 : 1})`,
  };

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full mix-blend-difference transition-transform duration-150 ease-out"
        style={cursorStyle}
      />
      <div
        className="fixed pointer-events-none z-40 w-10 h-10 rounded-full border border-purple/30 transition-all duration-300 ease-out"
        style={secondaryCursorStyle}
      />
    </>
  );
};

export default CustomCursor;
