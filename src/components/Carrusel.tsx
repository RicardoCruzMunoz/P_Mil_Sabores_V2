import Imagen1 from '../assets/img/pasteles/cuadrada_chocolate.jpg'
import Imagen2 from '../assets/img/comunidad/NoticiaKoyshi.jpg'
import Imagen3 from '../assets/img/pasteles/especial_cumpleaños.png'
import { Link } from 'react-router-dom'

export const Carrusel = () => {
  return (
    <>
        <div id="carruselMain" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={Imagen1} className="d-block w-100" alt="Imagen 1"/>
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
                    <img src={Imagen2} className="d-block w-100" alt="Imagen 2"/>
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
                    <img src={Imagen3} className="d-block w-100" alt="Imagen 3"/>
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