export type Equipo = {
    id: string;
    nombre: string;
    rol: string;
    descripcion: string;
}

export const equipo: Equipo[] = [
    {
        id: "E1",
        nombre: "Amelia Megaña (55 años)",
        rol: "Maestra Pastelera",
        descripcion: "El corazón y alma de Mil Sabores. Amelia es quien guarda las recetas originales y secretas de la familia. Con su experiencia, asegura que cada bizcocho, cada crema y cada merengue tenga el sabor auténtico que los ha hecho famosos por 50 años. Su calidez se refleja en cada dulce que prepara."
    },
    {
        id: "E2",
        nombre: "Juan González (60 años)",
        rol: "Gerente",
        descripcion: "El pilar de la operación. Roberto, esposo de Amelia, se encarga de que todo funcione a la perfección detrás de escena: desde la logística de ingredientes hasta la eficiencia en la producción. Su sonrisa transmite la confianza y el buen ambiente que se vive en la pastelería."
    },
    {
        id: "E3",
        nombre: "Diego González (28 años)",
        rol: "Jefe de Repostería Creativa y Nuevos Productos",
        descripcion: "La nueva generación de la pastelería. Diego es el encargado de experimentar con nuevos sabores, técnicas y presentaciones, fusionando la tradición familiar con las tendencias modernas. Es un artista con el fondant y la decoración, siempre buscando sorprender a los clientes."
    },
    {
        id: "E4",
        nombre: "Sofía Rojas (25 años)",
        rol: "Atención al Cliente y Redes Sociales",
        descripcion: "Con su energía y simpatía, Sofía es el rostro de la pastelería para los clientes. Se encarga de tomar pedidos especiales, resolver dudas y, sobre todo, de conectar con la comunidad a través de las redes sociales, mostrando el día a día y las delicias de Mil Sabores"
    }

]