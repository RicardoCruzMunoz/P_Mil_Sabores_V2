export type Noticia = {
    id: string;
    titulo: string;
    resumen: string;
    imagen: string;
    link: string;
}

export const noticias: Noticia[] = [
    {
        id: "N1",
        titulo: "Un hombre crea un nuevo tipo de pasta",
        resumen: "Está diseñada para ser perfecta",
        imagen: "src/assets/img/comunidad/NoticiaPasta.avif",
        link: "https://www.infobae.com/espana/2025/08/20/un-hombre-crea-un-nuevo-tipo-de-pasta-esta-disenada-para-ser-perfecta/"
    },
    {
        id: "N2",
        titulo: "Kyochi abre su local más grande en Chile",
        resumen: "La cadena de comida coreana, inauguró su local más grande en Chile: ¿Dónde queda?",
        imagen: "src/assets/img/comunidad/NoticiaKoyshi.jpg",
        link: "https://www.latercera.com/tendencias/noticia/koychi-la-cadena-de-comida-coreana-inauguro-su-local-mas-grande-en-chile-donde-queda/"
    },
    {
        id: "N?",
        titulo: "Próximamente",
        resumen: "Estamos buscando las mejores noticias para ti",
        imagen: "src/assets/img/comunidad/Prox.gif",
        link: ""
    }
]