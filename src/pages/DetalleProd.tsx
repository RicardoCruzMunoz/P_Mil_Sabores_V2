import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Producto } from "../interfaces/Producto";
import { getProductoByUPC } from "../api/producto";
import { useCart } from "../context/CartContext";

export const DetalleProd = () => {
  const { upc } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);

  useEffect(() => {
    if (!upc) return;

    const cargar = async () => {
      try {
        const data = await getProductoByUPC(upc);
        setProducto(data);
      } catch (error) {
        console.error("Error cargando producto:", error);
        setProducto(null);
      }
    };

    cargar();
  }, [upc]);

  const handleAgregar = () => {
    if (!producto) return;
    addToCart({ ...producto, cantidad });
  };

  if (!producto) {
    return <h2 className="mt-5 text-center">Producto no encontrado</h2>;
  }

  return (
    <div className="card mt-5 mx-auto cuadroDP">
      <div className="row g-0">

        <div className="col-md-4 imgDetalleP">
          <img
            src={producto.imagenUrl}
            className="img-fluid rounded-start m-1"
            alt={producto.nombre}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h1 className="card-title tTer p-2 mb-2">
              <strong>{producto.nombre}</strong>
            </h1>

            <span className="badge rounded-pill text-bg-secondary mb-2 p-2">
              {producto.categoria}
            </span>

            <div className="cajitaClara p-2">
              <h2 className="card-text tTer">${producto.precio}</h2>
              <h5 className="card-text tTer">{producto.descripcion}</h5>
            </div>
          </div>

          <div className="d-flex flex-column align-items-end mx-4 py-3">
            <div className="input-group my-3" style={{ maxWidth: "200px" }}>
              <button
                className="btn btn-dark"
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              >
                −
              </button>

              <input
                type="number"
                className="form-control text-center input-sin-flechas borde"
                value={cantidad}
                readOnly
              />

              <button
                className="btn btn-dark"
                onClick={() => setCantidad(cantidad + 1)}
              >
                +
              </button>
            </div>

            <div className="d-flex gap-3">
              <button className="p-2" id="btnAgregarCarro" onClick={() => navigate(-1)}>
                Volver
              </button>

              <button className="p-2" id="btnAgregarCarro" onClick={handleAgregar}>
                Agregar al carrito
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
