// src/pages/Carrito.tsx

import React from 'react';
import { useCar } from '../context/CarContext'; // <-- Cambiado a useCar

const Carrito: React.FC = () => {
    // 💡 Obteniendo el estado (useState) y las funciones del Contexto
    const { carItems, removeFromCar, updateQuantity, clearCar } = useCar(); // Cambiado a carItems

    // Lógica de cálculos
    const calculateItemTotal = (price: number, quantity: number) => price * quantity;

    const calculateGrandTotal = () => {
        return carItems.reduce((total, item) => 
            total + calculateItemTotal(item.producto.precio, item.cantidad), 0
        );
    };

    if (carItems.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>🛍️ Carrito de Compras</h2>
                <p>Tu carrito está vacío. ¡Explora nuestro catálogo!</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>🛍️ Carrito de Compras</h2>
            
            <table className="table table-striped">
                {/* ... (Tu thead) ... */}
                <tbody>
                    {/* Mapea y renderiza cada ítem del estado carItems */}
                    {carItems.map((item) => (
                        <tr key={item.producto.id}>
                            <td>
                                <strong>{item.producto.titulo}</strong>
                            </td>
                            <td>${item.producto.precio.toFixed(2)}</td>
                            <td>
                                {/* Controles de Cantidad */}
                                <div className="d-flex align-items-center">
                                    <button 
                                        className="btn btn-sm btn-outline-secondary me-2" 
                                        onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                                        disabled={item.cantidad <= 1}
                                    >-</button>
                                    <span style={{ width: '40px', textAlign: 'center' }}>
                                        {item.cantidad}
                                    </span>
                                    <button 
                                        className="btn btn-sm btn-outline-secondary ms-2" 
                                        onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                                    >+</button>
                                </div>
                            </td>
                            <td>
                                **${calculateItemTotal(item.producto.precio, item.cantidad).toFixed(2)}**
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => removeFromCar(item.producto.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="d-flex justify-content-between align-items-center mt-4 p-3 border-top">
                <h4>Total General: **${calculateGrandTotal().toFixed(2)}**</h4>
                <div>
                    <button className="btn btn-warning me-2" onClick={clearCar}>
                        Vaciar Carrito
                    </button>
                    <button className="btn btn-success">
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carrito;