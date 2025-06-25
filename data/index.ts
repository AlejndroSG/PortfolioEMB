export const navItems = [
  { name: "Nosotros", link: "#about" },
  { name: "Proyectos", link: "#projects" },
  { name: "Testimonios", link: "#testimonials" },
  { name: "Contacto", link: "/contacto" },
];

export const gridItems = [
  {
    id: 1,
    title: "Priorizamos la colaboración con el cliente, fomentando una comunicación abierta",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Somos flexibles con las comunicaciones en diferentes zonas horarias",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Nuestras tecnologías",
    description: "Constantemente buscamos mejorar",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Entusiastas de la tecnología con pasión por el desarrollo.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Comprometidos con la innovación tecnológica",
    description: "Explorando nuevas fronteras en desarrollo web",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "¿Quieres iniciar un proyecto juntos?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Peaky Blinders",
    des: "Plataforma interactiva desarrollada por EMB para la presentación oficial de la serie Peaky Blinders. Incluye biografías detalladas de personajes, líneas temporales interactivas y contenido exclusivo para fans. El sitio incorpora elementos visuales inspirados en la estética de la época, con animaciones sutiles que mejoran la experiencia del usuario sin comprometer el rendimiento.",
    img: "/p3.png",
    iconLists: ["/re.svg", "/tail.svg"],
    link: "https://github.com/agchdev/PeakyBlinders",
    client: "BBC Entertainment",
    year: "2023",
    category: "Entretenimiento",
    challenge: "Crear una experiencia inmersiva que capturara la esencia de la serie mientras se mantenía un alto rendimiento en todos los dispositivos.",
    solution: "EMB implementó una arquitectura React optimizada con lazy loading y una interfaz de usuario que refleja la estética de la época, manteniendo tiempos de carga mínimos y una experiencia fluida en dispositivos móviles y de escritorio."
  },
  {
    id: 2,
    title: "Dunkin Donuts",
    des: "Rediseño completo del sitio web corporativo de Dunkin Donuts realizado por EMB, con enfoque en mejorar la experiencia de usuario y optimizar las conversiones. La plataforma incluye un sistema de pedidos online, localización de tiendas mediante geolocalización, y un panel de administración personalizado para gestionar productos, promociones y análisis de ventas en tiempo real.",
    img: "/p2.png",
    iconLists: ["/next.svg", "/tail.svg"],
    link: "https://github.com/agchdev/DUNKIN.github.io",
    client: "Dunkin Brands International",
    year: "2024",
    category: "E-commerce / Alimentación",
    challenge: "Modernizar la presencia digital de la marca mientras se implementaba un sistema de pedidos eficiente y escalable que pudiera manejar picos de tráfico.",
    solution: "EMB desarrolló una arquitectura Next.js con SSR para optimizar SEO y rendimiento, integró pasarelas de pago seguras, y diseñó una interfaz intuitiva que refleja la personalidad de la marca mientras facilita la conversión."
  },
  {
    id: 3,
    title: "Learn IA",
    des: "Plataforma educativa innovadora desarrollada por EMB que utiliza inteligencia artificial para personalizar la experiencia de aprendizaje. El sistema analiza el progreso y estilo de aprendizaje de cada estudiante para adaptar el contenido, ejercicios y evaluaciones. Incluye herramientas de colaboración en tiempo real, sistema de gamificación, y análisis detallado del rendimiento para estudiantes y educadores.",
    img: "/p1.png",
    iconLists: ["/re.svg", "/tail.svg", "/new-php-logo.svg"],
    link: "https://github.com/agchdev/PeakyBlinders",
    client: "Instituto Tecnológico de Educación Digital",
    year: "2023",
    category: "Educación / Tecnología",
    challenge: "Desarrollar una plataforma educativa que utilizara IA para personalizar el aprendizaje mientras mantenía una alta escalabilidad y facilidad de uso para estudiantes y profesores.",
    solution: "EMB implementó un sistema híbrido con React en el frontend y PHP en el backend para procesamiento de datos de IA, creando algoritmos de aprendizaje adaptativo y una interfaz intuitiva que facilita tanto la enseñanza como el aprendizaje."
  },
  {
    id: 4,
    title: "Sitio Web 3D Animado de Apple iPhone",
    des: "Recreación premium del sitio web del iPhone 15 Pro desarrollada por EMB, que eleva la experiencia de usuario mediante animaciones avanzadas GSAP y efectos 3D inmersivos con Three.js. El sitio presenta el producto con transiciones fluidas, visualizaciones 3D interactivas del dispositivo, y una narrativa visual que destaca las características del producto de manera elegante y atractiva.",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "/ui.apple.com",
    client: "Apple Inc. (Proyecto de demostración)",
    year: "2024",
    category: "Tecnología / Showcase",
    challenge: "Recrear la experiencia premium de Apple con animaciones fluidas y modelos 3D detallados sin comprometer el rendimiento en dispositivos de gama media y baja.",
    solution: "EMB utilizó Next.js con TypeScript para una base sólida, implementó Three.js para renderizado 3D optimizado con nivel de detalle adaptativo, y empleó GSAP para animaciones fluidas con alta eficiencia de recursos."
  },
];

export const testimonials = [
  {
    quote:
      "Colaborar con el Equipo EMB fue un placer absoluto. Su profesionalismo, prontitud y dedicación para ofrecer resultados excepcionales fueron evidentes durante todo nuestro proyecto. El entusiasmo del Equipo EMB por cada faceta del desarrollo realmente destaca. Si buscas elevar tu sitio web y tu marca, el Equipo EMB es el socio ideal.",
    name: "Miguel Jiménez",
    title: "Director de AlphaStream Technologies",
  },
  {
    quote:
      "La capacidad técnica del Equipo EMB superó todas nuestras expectativas. Necesitábamos una plataforma e-commerce robusta y escalable, y nos entregaron una solución que no solo es técnicamente impecable sino también visualmente atractiva. Su enfoque en la experiencia del usuario ha transformado completamente nuestra presencia digital y ha impulsado nuestras ventas en un 45% en tan solo tres meses.",
    name: "Laura Martínez",
    title: "CEO de ModaEsencial",
  },
  {
    quote:
      "Como startup, necesitábamos un equipo que entendiera nuestra visión y pudiera transformarla en realidad con recursos limitados. El Equipo EMB no solo entendió perfectamente nuestros objetivos, sino que aportó ideas innovadoras que mejoraron significativamente nuestro producto final. Su dedicación y comunicación transparente durante todo el proceso hicieron que el desarrollo fuera fluido y sin complicaciones. Sin duda, son el mejor equipo con el que he trabajado.",
    name: "Carlos Rodríguez",
    title: "Fundador de TechLaunch Solutions",
  },
  {
    quote:
      "Después de dos experiencias decepcionantes con otros desarrolladores, encontrar al Equipo EMB fue un verdadero alivio. Su atención meticulosa a los detalles y su capacidad para traducir conceptos complejos a interfaces intuitivas es extraordinaria. Lo que más valoramos fue su proactividad para identificar posibles problemas y proponer soluciones antes de que surgieran. Han construido un sistema que no solo es visualmente impresionante, sino increíblemente funcional y fácil de mantener.",
    name: "Elena Vázquez",
    title: "Directora de Innovación Digital en HealthCare Plus",
  },
  {
    quote:
      "Nuestro proyecto educativo requería una plataforma interactiva que pudiera manejar contenido complejo de manera sencilla. El Equipo EMB no solo entregó una plataforma excepcional, sino que también nos guió a través de todo el proceso con paciencia y experticia. Su capacidad para transformar conceptos abstractos en interfaces interactivas y atractivas ha revolucionado la manera en que nuestros estudiantes interactúan con el material educativo. La calidad de su trabajo ha superado nuestras expectativas.",
    name: "Alejandro Moreno",
    title: "Coordinador de Innovación Educativa - Academia Global",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Desarrollo Web Full Stack",
    desc: "Especialistas en crear sitios web y aplicaciones web de alto rendimiento con React, Next.js y frameworks modernos que ofrecen experiencias excepcionales.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Aplicaciones Móviles Multiplataforma",
    desc: "Desarrollo de aplicaciones nativas para iOS y Android utilizando React Native y Flutter, garantizando experiencias fluidas en todos los dispositivos.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Diseño UX/UI Centrado en el Usuario",
    desc: "Creamos interfaces intuitivas y atractivas que priorizan la experiencia del usuario, combinando estética con funcionalidad para maximizar la satisfacción y conversión.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Desarrollo e Integración de APIs",
    desc: "Construimos arquitecturas backend robustas y escalables que conectan perfectamente su plataforma con servicios externos y fuentes de datos.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    name: "Instagram",
    img: "/instagram.svg",
    link: "#"
  },
  {
    id: 2,
    name: "Facebook",
    img: "/facebook.svg",
    link: "#"
  },
  {
    id: 3,
    name: "LinkedIn",
    img: "/linkedin.svg",
    link: "#"
  },
  {
    id: 4,
    name: "TikTok",
    img: "/tiktok.svg",
    link: "#"
  },
];
