import { useEffect, useState } from 'react';
import { Carrusel } from '../components/Carrusel';
import { CarruselDest } from '../components/CarruselDest';
import { SecNuestrosProd } from '../components/SecNuestrosProd';
import type { Producto } from '../interfaces/Producto';

export const Index = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/productos");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <>
      <Carrusel />

      <CarruselDest
        elementos={productos}
        ids={["TC001", "TT002", "TE001", "PT001", "PSA002"]}
      />

      <SecNuestrosProd />
    </>
  );
};
