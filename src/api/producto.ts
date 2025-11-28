import type { Producto } from "../interfaces/Producto";
import { api } from "./client";

export const getProducto = async (): Promise<Producto[]> => {
    const res = await api.get<Producto[]>("/productos");
    return res.data;
}