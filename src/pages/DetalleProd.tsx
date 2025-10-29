// src/pages/DetalleProd.tsx
// (Basado en Captura de pantalla 2025-10-28 214046.png)

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react"; 
import {productos} from "../data/productos";
import { useCar } from "../context/CarContext"; // <-- Cambiado a useCar

// Mantenemos la exportación original
export const DetalleProd = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pid = id ? id : ""; 
    const producto = productos.find((p) => p.id === pid); 

    // Estado local para la cantidad
    const [cantidad, setCantidad] = useState<number>(1); 

    // 💡 Usa el hook useCar y la función addToCar
    const { addToCar } = useCar(); 

    // Funciones para aumentar/disminuir
    const handleSumar = () => setCantidad((prev) => prev + 1);
    const handleRestar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

    // Función para manejar el clic del botón "Agregar"
    const handleAddToCart = () => {
        if (producto && cantidad > 0) {
            // Llama a la función del Contexto
            addToCar(producto, cantidad); // <-- Cambiado a addToCar
            navigate('/carrito'); 
        }
    };

    // Botón "Volver"
    const handleVolver = () => navigate(-1);

    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <div className="card mt-5 mx-auto cuadroDP">
            <div className="row g-0">
                {/* ... (Tu JSX de visualización de producto) */}
                <div className="col-md-4 imagenDetallep">
                    <img src={producto.imagen} className="img-fluid rounded-start m-1" alt={producto.titulo} />
                </div>
                <div className="col-md-8">
                    <div className="cajaDetalle">
                        <div className="card-body">
                            {/* ... (Tu contenido H1, Span, H2, H5) ... */}
                            
                            <div className="d-flex flex-column justify-content-end align-items-end mx-4 py-3">
                                {/* Controles de Cantidad */}
                                <div className="input-group my-3" style={{ maxWidth: '200px' }}>
                                    <button className="btn btn-dn-btn-dark" onClick={handleRestar}>-</button>
                                    <input type="number" className="form-control text-center input-sin-flechas borde" value={cantidad} min={1} readOnly={true} />
                                    <button className="btn btn-dn-btn-dark" onClick={handleSumar}>+</button>
                                </div>

                                <div className="d-flex justify-content-center gap-3">
                                    <button id="btnVolver" type="button" className="btn btn-danger p-2" onClick={handleVolver}>Volver</button>
                                    {/* CONEXIÓN DEL BOTÓN: Llama a handleAddToCart */}
                                    <button id="btnagregarCarro" 
                                            type="button" 
                                            className="btn btn-success p-2" 
                                            onClick={handleAddToCart}
                                    >
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};