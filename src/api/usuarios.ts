import type { Usuario } from "../interfaces/Usuario";
import { api } from "./client";

export const getUsuario = async (): Promise<Usuario[]> => {
    const res = await api.get<Usuario[]>("/usuarios");
    return res.data;
}