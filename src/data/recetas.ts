export type Receta = {
    id: string;
    titulo: string;
    subtitulo: string;
    imagen: string;
    link: string;}

export const recetas: Receta[] = [
    {
        id: "R1",
        titulo: "Pie de limón",
        subtitulo: "Bajo costo, bien valorado y listo en aproximadamente 35 minutos",
        imagen: "public/img/comunidad/RecetaPieDeLimon.webp",
        link: "https://www.recetasnestle.cl/recetas/pie-de-limon"
    },
    {
        id: "R2",
        titulo: "Croquembouche",
        subtitulo: "Torre formada por profiteroles rellenos de crema y bañados en caramelo",
        imagen: "public/img/comunidad/RecetaCroquembouche.webp",
        link: "https://www.bonviveur.es/recetas/croquembouche"
    },
    {
        id: "R?",
        titulo: "Proximamente",
        subtitulo: "Buscando las recetas más deliciosas para ti",
        imagen: "public/img/comunidad/Prox.gif",
        link: ""
    }
]