export interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    password: string;
    fechaNacimiento: string;
    codigo?: string;
    tipoUsuario: string;
}