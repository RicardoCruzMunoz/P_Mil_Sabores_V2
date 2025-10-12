export type Producto = {
    id: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    precio: number;
    imagen: string;
}

export const productos: Producto[] = [
    {
        id: "TC001",
        titulo: "Torta Cuadrada de Chocolate",
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
        categoria: "Tortas Cuadradas",
        precio: 45000,
        imagen: "/pasteles/cuadrada_chocolate.jpg",
    },
    {
        id: "TC002",
        titulo: "Torta Cuadrada de Frutas",
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
        categoria: "Tortas Cuadradas",
        precio: 50000,
        imagen: "/pasteles/cuadrada_frutas.jpg",
    },
    {
        id: "TT001",
        titulo: "Torta Circular de Vainilla",
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
        categoria: "Tortas Circulares",
        precio: 40000,
        imagen: "/pasteles/circular_vainilla.png",
    },
    {
        id: "TT002",
        titulo: "Torta Circular de Manjar",
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
        categoria: "Tortas Circulares",
        precio: 42000,
        imagen: "/pasteles/circular_manjar.jpg",
    },
    {
        id: "TE001",
        titulo: "Torta Especial de Cumpleaños",
        descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
        categoria: "Tortas Especiales",
        precio: 55000,
        imagen: "/pasteles/especial_cumpleaños.png",
    },
    {
        id: "TE002",
        titulo: "Torta Especial de Boda",
        descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
        categoria: "Tortas Especiales",
        precio: 60000,
        imagen: "/pasteles/especial_boda.png",
    },
    {
        id: "PI001",
        titulo: "Mousse de Chocolate",
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
        categoria: "Postres Individuales",
        precio: 5000,
        imagen: "/pasteles/mousse_chocolate.jpg",
    },
    {
        id: "PI002",
        titulo: "Tiramisú Clásico",
        descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
        categoria: "Postres Individuales",
        precio: 5500,
        imagen: "/pasteles/tiramisu_clasico.jpg",
    },
    {
        id: "PT001",
        titulo: "Empanada de Manzana",
        descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
        categoria: "Pastelería Tradicional",
        precio: 3000,
        imagen: "/pasteles/empanada_manzana.webp",
    },
    {
        id: "PT002",
        titulo: "Tarta de Santiago",
        descripcion: "Tradicional tarta española hecha con almendras, azúcar y huevos, una delicia para los amantes de los postres clásicos.",
        categoria: "Pastelería Tradicional",
        precio: 6000,
        imagen: "/pasteles/tarta_de_santiago.jpg",
    },
    {
        id: "PSA001",
        titulo: "Torta Sin Azúcar de Naranja",
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
        categoria: "Productos sin Azúcar",
        precio: 48000,
        imagen: "/pasteles/naranja_sin_azucar.jpg",
    },
    {
        id: "PSA002",
        titulo: "Cheesecake Sin Azúcar",
        descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
        categoria: "Productos sin Azúcar",
        precio: 47000,
        imagen: "/pasteles/cheesecake.jpg",
    },
    {
        id: "PG001",
        titulo: "Brownie Sin Gluten",
        descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
        categoria: "Productos Sin Gluten",
        precio: 4000,
        imagen: "/pasteles/brownie_sin_gluten.jpg",
    },
    {
        id: "PG002",
        titulo: "Pan Sin Gluten",
        descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
        categoria: "Productos Sin Gluten",
        precio: 3500,
        imagen: "/pasteles/pan_sin_gluten.jpg",
    },
    {
        id: "PV001",
        titulo: "Torta Vegana de Chocolate",
        descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
        categoria: "Productos Veganos",
        precio: 50000,
        imagen: "/pasteles/vegana_chocolate.jpg",
    },
    {
        id: "PV002",
        titulo: "Galletas Veganas de Avena",
        descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
        categoria: "Productos Veganos",
        precio: 4500,
        imagen: "/pasteles/galleta_vegana_avena.jpg",
    },
];