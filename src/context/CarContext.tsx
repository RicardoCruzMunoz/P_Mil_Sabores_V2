// src/context/CarContext.tsx

import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react'; 
// La ruta es relativa a la carpeta 'context'
import type { Producto, CarItem } from '../data/productos'; 

// 1. Definir la forma del Contexto
interface CarContextType {
    carItems: CarItem[]; // Cambiado a carItems
    addToCar: (producto: Producto, cantidad: number) => void;
    removeFromCar: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCar: () => void;
}

// 2. Crear el Contexto
const CarContext = createContext<CarContextType | undefined>(undefined);

// 3. Crear el Proveedor (Provider) - Cambiado a CarProvider
export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // 💡 Aquí está el useState que almacena el estado global
    const [carItems, setCarItems] = useState<CarItem[]>([]); // Cambiado a setCarItems

    // Función para añadir/actualizar un producto
    const addToCar = (producto: Producto, cantidad: number) => {
        setCarItems(prevItems => {
            const existingItem = prevItems.find(item => item.producto.id === producto.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.producto.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {
                return [...prevItems, { producto, cantidad }];
            }
        });
    };

    // Función para eliminar un producto
    const removeFromCar = (productId: string) => {
        setCarItems(prevItems => prevItems.filter(item => item.producto.id !== productId));
    };

    // Función para actualizar la cantidad
    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCar(productId); 
            return;
        }

        setCarItems(prevItems =>
            prevItems.map(item =>
                item.producto.id === productId
                    ? { ...item, cantidad: newQuantity }
                    : item
            )
        );
    };

    // Función para vaciar el carrito
    const clearCar = () => {
        setCarItems([]);
    };

    return (
        <CarContext.Provider value={{ carItems, addToCar, removeFromCar, updateQuantity, clearCar }}>
            {children}
        </CarContext.Provider>
    );
};

// 4. Hook personalizado para usar el carrito
export const useCar = () => { // Cambiado a useCar
    const context = useContext(CarContext);
    if (context === undefined) {
        throw new Error('useCar debe ser usado dentro de un CarProvider');
    }
    return context;
};