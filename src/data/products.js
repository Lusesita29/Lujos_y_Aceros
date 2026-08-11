// Catálogo de productos.

export const categorias = [
  { id: "todos", nombre: "Todos los Productos" },
  { id: "retrovisores y regletas", nombre: "Retrovisores y Regletas" },
  { id: "defensas", nombre: "Defensas" },
  { id: "guardabarros", nombre: "Guardabarros" },
  { id: "baberos", nombre: "Baberos" },
  { id: "mofles", nombre: "Mofles" },
  { id: "estribos", nombre: "Estribos" },
  { id: "tanques", nombre: "Tanques de Agua" },
  { id: "portalicuadora", nombre: "Porta Licuadoras" },
];

export const productos = [
  {
    id: 1,
    nombre: "Retrovisores Cromados",
    destacado: true,
    precio: 850000,
    img: "/retro.jpg",
    categoria: "retrovisores y regletas",

    descripcion:
      "Par de retrovisores cromados de alta resistencia, diseñados para brindar excelente visibilidad y complementar la apariencia premium del camión.",

    caracteristicas: [
      "Alta resistencia a la corrosión",
      "Diseño cromado premium",
      "Excelente visibilidad",
      "Construcción resistente",
      "Ajuste para diferentes posiciones"
    ],

    material: "Acero inoxidable 304",
    referencia: "RV-001",
    acabado: "Cromado de alto brillo",
    dimensiones: "Consultar según modelo",
    instalacion: "Instalación mediante soportes de fijación",
    garantia: "12 meses",

    vehiculos: [
      { marca: "Volvo", modelo: "FH" },
      { marca: "Scania", modelo: "R450" }
    ],
  },

  {
    id: 2,
    nombre: "Retrovisor 60 cm",
    destacado: true,
    precio: 380000,
    img: "/retro2.jpg",
    categoria: "retrovisores y regletas",

    descripcion:
      "Retrovisor plano de 60 cm diseñado para mejorar el campo de visión del conductor y facilitar las maniobras en carretera y ciudad.",

    caracteristicas: [
      "Longitud de 60 cm",
      "Diseño plano",
      "Alta resistencia",
      "Fácil instalación",
      "Uso universal"
    ],

    material: "Acero inoxidable",
    referencia: "RV-002",
    acabado: "Pulido",
    dimensiones: "60 cm",
    instalacion: "Sistema de fijación universal",
    garantia: "12 meses",

    vehiculos: [],
  },

  {
    id: 3,
    nombre: "Regleta LED Azul",
    destacado: true,
    precio: 450000,
    img: "/retro3.jpg",
    categoria: "retrovisores y regletas",

    descripcion:
      "Regleta LED azul de alta luminosidad, diseñada para mejorar la visibilidad del vehículo y darle una apariencia moderna y llamativa.",

    caracteristicas: [
      "Iluminación LED de alta intensidad",
      "Bajo consumo energético",
      "Resistente al agua",
      "Larga duración",
      "Diseño moderno"
    ],

    material: "Policarbonato / LED",
    referencia: "RG-003",
    acabado: "Azul",
    dimensiones: "Consultar referencia",
    instalacion: "Conexión eléctrica de 12V/24V",
    garantia: "12 meses",

    vehiculos: [],
  },

  {
    id: 4,
    nombre: "Defensa Delantera LED",
    destacado: true,
    precio: 1950000,
    img: "/defensa.jpg",
    categoria: "defensas",

    descripcion:
      "Defensa delantera reforzada con luces LED integradas, fabricada para brindar protección, resistencia y una apariencia premium al vehículo.",

    caracteristicas: [
      "Estructura reforzada",
      "Luces LED integradas",
      "Alta resistencia a impactos",
      "Protección frontal",
      "Diseño premium"
    ],

    material: "Acero inoxidable 304",
    referencia: "DF-004",
    acabado: "Pulido espejo",
    dimensiones: "Según modelo del vehículo",
    instalacion: "Instalación mediante soportes reforzados",
    garantia: "12 meses",

    vehiculos: [
      { marca: "Kenworth", modelo: "T800" }
    ],
  },

  {
    id: 5,
    nombre: "Defensa Trasera con Luces",
    precio: 1780000,
    img: "/defensa2.jpg",
    categoria: "defensas",

    descripcion:
      "Defensa trasera reforzada con sistema de iluminación, diseñada para mejorar la protección y visibilidad de la parte posterior del camión.",

    caracteristicas: [
      "Construcción reforzada",
      "Sistema de luces traseras",
      "Alta resistencia",
      "Acabado premium",
      "Protección trasera"
    ],

    material: "Acero inoxidable 304",
    referencia: "DF-005",
    acabado: "Pulido",
    dimensiones: "Según modelo",
    instalacion: "Sistema de fijación reforzado",
    garantia: "12 meses",

    vehiculos: [],
  },

  {
    id: 6,
    nombre: "Guardabarros Inox",
    precio: 680000,
    img: "/guarda.jpg",
    categoria: "guardabarros",

    descripcion:
      "Guardabarros fabricado en acero inoxidable pulido, diseñado para proteger el vehículo y proporcionar un acabado elegante y duradero.",

    caracteristicas: [
      "Acero inoxidable de alta calidad",
      "Acabado espejo",
      "Resistente a la corrosión",
      "Fácil mantenimiento",
      "Alta durabilidad"
    ],

    material: "Acero inoxidable",
    referencia: "GB-006",
    acabado: "Pulido espejo",
    dimensiones: "Consultar según modelo",
    instalacion: "Sistema de fijación para guardabarros",
    garantia: "12 meses",

    vehiculos: [],
  },

  {
    id: 7,
    nombre: "Babero Inox Personalizado",
    precio: 720000,
    img: "/babero.jpg",
    categoria: "baberos",

    descripcion:
      "Babero fabricado en acero inoxidable con posibilidad de personalización, ideal para darle un estilo exclusivo al vehículo.",

    caracteristicas: [
      "Diseño personalizable",
      "Alta resistencia",
      "Acabado inoxidable",
      "Resistente a la corrosión",
      "Diseño exclusivo"
    ],

    material: "Acero inoxidable",
    referencia: "BB-007",
    acabado: "Pulido",
    dimensiones: "Según diseño",
    instalacion: "Sistema de fijación personalizado",
    garantia: "12 meses",

    vehiculos: [],
  },

  {
    id: 8,
    nombre: "Mofle Escape Cromado 5 pulgadas",
    precio: 1350000,
    img: "/mofle.jpg",
    categoria: "mofles",

    descripcion:
      "Mofle cromado de 5 pulgadas diseñado para mejorar el sistema de escape y proporcionar una apariencia deportiva y elegante.",

    caracteristicas: [
      "Diámetro de 5 pulgadas",
      "Alta resistencia térmica",
      "Acabado cromado",
      "Excelente durabilidad",
      "Diseño deportivo"
    ],

    material: "Acero inoxidable cromado",
    referencia: "MF-008",
    acabado: "Cromado",
    dimensiones: "5 pulgadas",
    instalacion: "Sistema de instalación para escape",
    garantia: "12 meses",

    vehiculos: [
      { marca: "Scania", modelo: "R450" }
    ],
  },

  {
    id: 9,
    nombre: "Estribos Laterales Tubulares",
    precio: 1680000,
    img: "/estribo.jpg",
    categoria: "estribos",

    descripcion:
      "Estribos laterales tubulares fabricados para facilitar el acceso a la cabina y proporcionar resistencia y seguridad durante su utilización.",

    caracteristicas: [
      "Diseño tubular",
      "Superficie antideslizante",
      "Alta resistencia al peso",
      "Acero inoxidable",
      "Diseño premium"
    ],

    material: "Acero inoxidable",
    referencia: "ES-009",
    acabado: "Pulido",
    dimensiones: "Según modelo",
    instalacion: "Soportes laterales reforzados",
    garantia: "12 meses",

    vehiculos: [],
  },

  {
    id: 10,
    nombre: "Tanque de Agua 100 Litros Inox",
    precio: 980000,
    img: "/tanque.jpg",
    categoria: "tanques",

    descripcion:
      "Tanque de agua con capacidad de 100 litros, fabricado en acero inoxidable y diseñado para ofrecer resistencia, higiene y durabilidad.",

    caracteristicas: [
      "Capacidad de 100 litros",
      "Construcción soldada",
      "Alta resistencia",
      "Fácil limpieza",
      "Resistente a la corrosión"
    ],

    material: "Acero inoxidable 304",
    referencia: "TQ-010",
    acabado: "Pulido",
    dimensiones: "100 litros",
    instalacion: "Soportes de fijación",
    garantia: "12 meses",

    vehiculos: [],
  },

  {
    id: 11,
    nombre: "Porta Licuadora Inox c/ Cerradura",
    precio: 890000,
    img: "/portalic.jpg",
    categoria: "portalicuadora",

    descripcion:
      "Porta licuadora fabricado en acero inoxidable, equipado con cerradura de seguridad para proteger el equipo durante los desplazamientos.",

    caracteristicas: [
      "Cerradura de seguridad",
      "Estructura resistente",
      "Acero inoxidable",
      "Protección durante el transporte",
      "Diseño práctico"
    ],

    material: "Acero inoxidable",
    referencia: "PL-011",
    acabado: "Pulido",
    dimensiones: "Consultar referencia",
    instalacion: "Sistema de fijación reforzado",
    garantia: "12 meses",

    vehiculos: [],
  },
];