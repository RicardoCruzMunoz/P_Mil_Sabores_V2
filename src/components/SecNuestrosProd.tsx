import { useEffect, useState } from "react";
import fondoCard from '../assets/img/bg_card_index/fondo1.png';
import fondoCard2 from '../assets/img/bg_card_index/fondo2.png';
import { useNavigate } from 'react-router-dom';
import { getProducto } from "../api/producto";
import type { Producto } from "../interfaces/Producto";

export const SecNuestrosProd = () => {

  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducto();
        setProductos(data);
      } catch (err) {
        console.error("Error obteniendo productos:", err);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoria: string) => {
    navigate('/catalogo', { state: { categoria } });
  };

  // Buscar productos por categoría
  const productoSinAzucar = productos.find(p => p.categoria === "Productos sin Azúcar");
  const postreIndividual = productos.find(p => p.categoria === "Postres Individuales");

  return (
    <>
      <div className="container-fluid px-4 mt-4">
        <div className='text-center mb-4 bloqueTexto p-3'>
          <h2 className="tPrin">Nuestros Productos</h2>
        </div>

        <div className='row gx-3 gy-3'>
          
          {/* CARD 1 */}
          <div className='col-md-6 col-sm-12'>
            <div
              className="card mb-3 cuadroIndex"
              style={{
                backgroundImage: `url(${fondoCard})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="row g-0">
                <div className="col-4 d-flex align-items-center justify-content-center p-2">
                  <img
                    src={productoSinAzucar?.imagenUrl ?? ""}
                    className="img-fluid rounded-start producto-superpuesto"
                    style={{ maxWidth: '120px', height: 'auto', objectFit: 'contain' }}
                    alt="Productos Sin Azúcar"
                  />
                </div>

                <div className="col-8">
                  <div className="card-body h-100 d-flex flex-column justify-content-between py-3">
                    <div>
                      <h5 className="card-title tTer mb-2">Productos sin Azúcar</h5>
                      <p className="card-text tTer">
                        Pasteles ideales para quienes buscan algo más saludable.
                      </p>
                    </div>
                    <button
                      id='btnIndex'
                      onClick={() => handleCategoryClick('Productos sin Azúcar')}
                      className="btn mt-2"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className='col-md-6 col-sm-12'>
            <div
              className="card mb-3 cuadroIndex"
              style={{
                backgroundImage: `url(${fondoCard2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="row g-0">
                <div className="col-4 d-flex align-items-center justify-content-center p-2">
                  <img
                    src={postreIndividual?.imagenUrl ?? ""}
                    className="img-fluid rounded-start producto-superpuesto"
                    style={{ maxWidth: '120px', height: 'auto', objectFit: 'contain' }}
                    alt="Postres Individuales"
                  />
                </div>

                <div className="col-8">
                  <div className="card-body h-100 d-flex flex-column justify-content-between py-3">
                    <div>
                      <h5 className="card-title tTer mb-2">Postres Individuales</h5>
                      <p className="card-text tTer">
                        Exquisitos postres para disfrutar en cualquier ocasión.
                      </p>
                    </div>

                    <button
                      id='btnIndex'
                      onClick={() => handleCategoryClick('Postres Individuales')}
                      className="btn mt-2"
                    >
                      Ver más
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
