import React, { useRef } from "react";
import { CardProducto } from "./CardProducto";
import type { Producto } from "../interfaces/Producto";
import { base_url_img } from "../api/config";

interface Props {
  elementos: Producto[];
  ids?: string[];
}

export const CarruselDest: React.FC<Props> = ({ elementos, ids }) => {
  const contenedor = useRef<HTMLDivElement | null>(null);

  const productosFiltrados = ids
    ? elementos.filter((p) => ids.includes(p.upc))
    : elementos;

  const moverDerecha = () => {
    if (!contenedor.current) return;
    const ancho = contenedor.current.clientWidth / 3;
    contenedor.current.scrollLeft += ancho;
  };

  const moverIzquierda = () => {
    if (!contenedor.current) return;
    const ancho = contenedor.current.clientWidth / 3;
    contenedor.current.scrollLeft -= ancho;
  };

  const getImagenSrc = (ruta: string) => {
    if (!ruta) return "/img/placeholder.png";
    if (ruta.startsWith("http")) return ruta;
    return `${base_url_img}/img/${ruta}`;
  };

  return (
    <div className="container justify-content-center mt-4">
      <div className="container text-center mb-4 bloqueTexto p-3">
        <h2 className="tPrin">Productos Destacados</h2>
      </div>

      <div className="carrusel-ca2">
        <button className="carrusel-boton-ca2 izquierda" onClick={moverIzquierda}>
          <i className="bi bi-caret-left"></i>
        </button>

        <div className="carrusel-contenedor-ca2" ref={contenedor}>
          {productosFiltrados.map((item) => (
            <div className="carrusel-item-ca2" key={item.upc}>
              <CardProducto
                upc={item.upc}
                nombre={item.nombre}
                precio={item.precio}
                imagenUrl={getImagenSrc(item.imagenUrl)}
              />
            </div>
          ))}
        </div>

        <button className="carrusel-boton-ca2 derecha" onClick={moverDerecha}>
          <i className="bi bi-caret-right"></i>
        </button>
      </div>
    </div>
  );
};