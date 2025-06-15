"use client";

import { useState } from "react";

export default function SkipToContent() {
  const [focused, setFocused] = useState(false);

  return (
    <a
      href="#skip-content"
      className={`
        fixed top-2 left-2 z-50 bg-primary text-primary-foreground
        px-4 py-2 rounded-md shadow-lg transform transition-transform
        ${focused ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0"}
        focus:translate-y-0 focus:opacity-100
      `}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label="Saltar al contenido principal"
    >
      Saltar al contenido
    </a>
  );
}
