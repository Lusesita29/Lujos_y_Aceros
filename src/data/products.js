// Catálogo de productos.
// `vehiculos` permite filtrar por marca/modelo más adelante (ver VehicleSelector).
// Deja el array vacío [] si un producto aplica a cualquier camión ("universal").

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
    id: 1, nombre: "Retrovisores Cromados", precio: 850000, img: "/retro.jpg",
    categoria: "retrovisores y regletas",
    descripcion: "Par de retrovisores cromados de alta resistencia, ajuste universal.",
    material: "Acero inoxidable 304", referencia: "RV-001",
    vehiculos: [{ marca: "Volvo", modelo: "FH" }, { marca: "Scania", modelo: "R450" }],
  },
  {
    id: 2, nombre: "Retrovisor 60 cm", precio: 380000, img: "/retro2.jpg",
    categoria: "retrovisores y regletas",
    descripcion: "Retrovisor plano de 60 cm, ideal para maniobras en ciudad.",
    material: "Acero inoxidable", referencia: "RV-002",
    vehiculos: [],
  },
  {
    id: 3, nombre: "Regleta LED azul", precio: 450000, img: "/retro3.jpg",
    categoria: "retrovisores y regletas",
    descripcion: "Regleta LED azul de larga duración, resistente al agua.",
    material: "Policarbonato / LED", referencia: "RG-003",
    vehiculos: [],
  },
  {
    id: 4, nombre: "Defensa Delantera LED", precio: 1950000, img: "/defensa.jpg",
    categoria: "defensas",
    descripcion: "Defensa delantera con luces LED integradas, refuerzo estructural.",
    material: "Acero inoxidable 304", referencia: "DF-004",
    vehiculos: [{ marca: "Kenworth", modelo: "T800" }],
  },
  {
    id: 5, nombre: "Defensa Trasera con Luces", precio: 1780000, img: "/defensa2.jpg",
    categoria: "defensas",
    descripcion: "Defensa trasera reforzada con sistema de luces traseras.",
    material: "Acero inoxidable 304", referencia: "DF-005",
    vehiculos: [],
  },
  {
    id: 6, nombre: "Guardabarros Inox", precio: 680000, img: "/guarda.jpg",
    categoria: "guardabarros",
    descripcion: "Guardabarros en acero inoxidable pulido, acabado espejo.",
    material: "Acero inoxidable", referencia: "GB-006",
    vehiculos: [],
  },
  {
    id: 7, nombre: "Babero Inox Personalizado", precio: 720000, img: "/babero.jpg",
    categoria: "baberos",
    descripcion: "Babero inoxidable con posibilidad de grabado personalizado.",
    material: "Acero inoxidable", referencia: "BB-007",
    vehiculos: [],
  },
  {
    id: 8, nombre: "Mofle Escape Cromado 5 pulgadas", precio: 1350000, img: "/mofle.jpg",
    categoria: "mofles",
    descripcion: "Mofle cromado de 5 pulgadas, mayor flujo y mejor sonido.",
    material: "Acero inoxidable cromado", referencia: "MF-008",
    vehiculos: [{ marca: "Scania", modelo: "R450" }],
  },
  {
    id: 9, nombre: "Estribos Laterales Tubulares", precio: 1680000, img: "/estribo.jpg",
    categoria: "estribos",
    descripcion: "Estribos tubulares antideslizantes, alta resistencia al peso.",
    material: "Acero inoxidable", referencia: "ES-009",
    vehiculos: [],
  },
  {
    id: 10, nombre: "Tanque de Agua 100 Litros Inox", precio: 980000, img: "/tanque.jpg",
    categoria: "tanques",
    descripcion: "Tanque de agua de 100 litros en acero inoxidable soldado.",
    material: "Acero inoxidable 304", referencia: "TQ-010",
    vehiculos: [],
  },
  {
    id: 11, nombre: "Porta Licuadora Inox c/ Cerradura", precio: 890000, img: "/portalic.jpg",
    categoria: "portalicuadora",
    descripcion: "Porta licuadora con cerradura de seguridad, acabado inoxidable.",
    material: "Acero inoxidable", referencia: "PL-011",
    vehiculos: [],
  },
];

// Marcas/modelos disponibles para el selector de vehículo (independiente del stock)
export const marcasVehiculos = {
  Volvo: ["FH", "FH16", "FMX"],
  Scania: ["R450", "R500", "S650"],
  Kenworth: ["T800", "T680", "W900"],
  Freightliner: ["Cascadia", "Columbia"],
};
