import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { productos } from "../data/productos";

export const DetalleProd = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pid = String(id);
  const producto = productos.find((p) => p.id === pid);

  // Estado para la cantidad
  const [cantidad, setCantidad] = useState<number>(1);

  // Funciones para aumentar/disminuir
  const handleSumar = () => setCantidad((prev) => prev + 1);
  const handleRestar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  // Botón "Volver" usa navigate(-1) para volver atrás
  const volver = () => navigate(-1);

  return (
    <>
      <div className="card m-5">
        <div className="row g-0">
          <div className="col-md-4 imgDetalleP">
            <img src={producto?.imagen} className="img-fluid rounded-start" alt={producto?.titulo}/>
          </div>
          <div id="cajaDetalle" className="col-md-8">
            <div className="card-body">
              <h1 className="card-title tTer p-2 mb-2">
                <strong>{producto?.titulo}</strong>
              </h1>
              <span className="badge rounded-pill text-bg-secondary mb-2 p-2">{producto?.categoria}</span>
              <div className="cajitaClara p-2">
                <h2 className="card-text tTer">${producto?.precio}</h2>
                <h5 className="card-text tTer">{producto?.descripcion}</h5>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-end align-items-end mx-4 py-3">
              <div className="input-group my-3" style={{ maxWidth: "200px" }}>
                <button className="btn btn-dark" onClick={handleRestar}>−</button>
                <input type="number" className="form-control text-center input-sin-flechas borde" value={cantidad} min={1} readOnly/>
                <button className="btn btn-dark" onClick={handleSumar}>+</button>
              </div>
              <div className="d-flex justify-content-end align-items-end gap-3">
                <button id="btnAgregarCarro" className="p-2" onClick={volver}>Volver</button>
                <button id="btnAgregarCarro" type="button" className="p-2">Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
