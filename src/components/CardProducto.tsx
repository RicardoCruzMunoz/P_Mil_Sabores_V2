import React from "react";
import { Link } from "react-router-dom";

interface Props {
  upc: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
}

export const CardProducto: React.FC<Props> = ({
  upc,
  nombre,
  precio,
  imagenUrl
}) => {
  return (
    <div className="tarjeta-ca2">
      <div className="tarjeta-imagen-ca2">
        <img src={imagenUrl} alt={nombre} />
      </div>
      <div className="tarjeta-cuerpo-ca2">
        <h4 className="tarjeta-titulo-ca2 tTer">{nombre}</h4>
        <h4 className="tarjeta-texto-ca2 tTer">${precio}</h4>

        <Link
          className="btn btn-outline-light btn-sm tSec"
          to={`/detalleproducto/${upc}`}
        >
          Ver Más
        </Link>
      </div>
    </div>
  );
};
