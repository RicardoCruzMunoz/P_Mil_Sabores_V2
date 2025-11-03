import React from "react";
import { Link } from "react-router";

interface Props {
  id: string;
  titulo: string;
  precio: number;
  imagen: string;
}

export const CardProducto: React.FC<Props> = ({
  id,
  titulo,
  precio,
  imagen
}) => {
  return (
    <div className="tarjeta-ca2">
      <div className="tarjeta-imagen-ca2">
        <img src={imagen} alt={titulo}/>
      </div>
      <div className="tarjeta-cuerpo-ca2">
        <h4 className="tarjeta-titulo-ca2 tTer">{titulo}</h4>
        <h4 className="tarjeta-texto-ca2 tTer">${precio}</h4>
        <Link className="btn btn-outline-light btn-sm tSec" to={`/detalleproducto/${id}`}>Ver Más</Link>
      </div>
    </div>
  );
};
