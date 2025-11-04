import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { productos } from "../data/productos";
import { useCart } from "../context/CartContext";

export const DetalleProd = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const producto = productos.find((p) => p.id === id);

  const [cantidad, setCantidad] = useState<number>(1);

  const handleSumar = () => setCantidad((prev) => prev + 1);
  const handleRestar = () =>
    setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const volver = () => navigate(-1);

  const handleAgregar = () => {
    if (!producto) return;

    addToCart({
      ...producto,
      cantidad,
    });
  };

  if (!producto) {
    return <h2 className="mt-5 text-center">Producto no encontrado</h2>;
  }

  return (
    <div className="card mt-5 mx-auto cuadroDP">
      <div className="row g-0">
        <div className="col-md-4 imgDetalleP">
          <img
            src={producto.imagen}
            className="img-fluid rounded-start m-1"
            alt={producto.titulo}
          />
        </div>

        <div id="cajaDetalle" className="col-md-8">
          <div className="card-body">
            <h1 className="card-title tTer p-2 mb-2">
              <strong>{producto.titulo}</strong>
            </h1>

            <span className="badge rounded-pill text-bg-secondary mb-2 p-2">
              {producto.categoria}
            </span>

            <div className="cajitaClara p-2">
              <h2 className="card-text tTer">${producto.precio}</h2>
              <h5 className="card-text tTer">{producto.descripcion}</h5>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-end align-items-end mx-4 py-3">
            <div className="input-group my-3" style={{ maxWidth: "200px" }}>
              <button className="btn btn-dark" onClick={handleRestar}>
                −
              </button>
              <input
                type="number"
                className="form-control text-center input-sin-flechas borde"
                value={cantidad}
                readOnly
              />
              <button className="btn btn-dark" onClick={handleSumar}>
                +
              </button>
            </div>

            <div className="d-flex justify-content-end align-items-end gap-3">
              <button id="btnAgregarCarro" className="p-2" onClick={volver}>
                Volver
              </button>

              <button
                id="btnAgregarCarro"
                type="button"
                className="p-2"
                onClick={handleAgregar}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
