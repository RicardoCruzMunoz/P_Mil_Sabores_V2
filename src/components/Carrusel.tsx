import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducto } from '../api/producto';
import type { Producto } from '../interfaces/Producto';
import { base_url_img } from "../api/config";



export const Carrusel = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    getProducto().then(setProductos).catch(console.error);
  }, []);

  const producto1 = productos.find(p => p.nombre === "Torta Cuadrada de Chocolate");
  const producto3 = productos.find(p => p.nombre === "Torta Especial de Cumpleaños");

  const getImgUrl = (path: string | undefined) => {
    return path ? `${base_url_img}/img/${path}` : '';
  };

  return (
    <>
        <div id="carruselMain" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                
                <div className="carousel-item active">
                    <img 
                        src={getImgUrl(producto1?.imagenUrl)} 
                        className="d-block w-100" 
                        alt={producto1?.nombre || "Cargando..."}
                    />
                    <div className="carousel-caption-wrapper">
                        <div className="carousel-caption">
                            <h3 className="tSec">Deliciosos Pasteles Artesanales</h3>
                            <p className="tSec">Productos de todo tipo para todos los gustos</p>
                            <Link to="/catalogo" className="btn btn-dark mt-2">
                                Catálogo
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src="/img/comunidad/NoticiaKoyshi.jpg" className="d-block w-100" alt="Noticia Comunidad"/>
                    <div className="carousel-caption-wrapper reverse">
                        <div className="carousel-caption">
                            <h3 className="tSec">Revise las Ultimas Novedades</h3>
                            <p className="tSec">Noticias y Recetas de cada dia</p>
                            <Link to="/comunidad" className="btn btn-dark mt-2">
                                Comunidad
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="carousel-item">
                    <img 
                        src={getImgUrl(producto3?.imagenUrl)} 
                        className="d-block w-100" 
                        alt={producto3?.nombre || "Cargando..."}
                    />
                    <div className="carousel-caption-wrapper">
                        <div className="carousel-caption">
                            <h3 className="tSec">Pedidos Personalizados</h3>
                            <p className="tSec">Crea el pastel de tus sueños</p>
                            <Link to="/contacto" className="btn btn-dark mt-2">
                                Contáctanos
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carruselMain" data-bs-slide="prev">
                <i className="bi bi-caret-left-fill" aria-hidden="true"></i>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carruselMain" data-bs-slide="next">
                <i className="bi bi-caret-right-fill" aria-hidden="true"></i>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </>
  )
}