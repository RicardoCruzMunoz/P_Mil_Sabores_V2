import { Link } from 'react-router-dom'
import { productos } from '../data/productos'

export const Carrusel = () => {
  return (
    <div className="w-100 px-0">
        <div id="carouselExampleCaptions" className="carousel slide custom-carousel" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={productos[0].imagen} className="d-block h-100" alt="..."/>
                    <div id='tituloCarrusel' className="carousel-caption d-block mx-auto">
                        <h5 className='tSec'>{productos[0].titulo}</h5>
                        <h5 className="tSec">${productos[0].precio}</h5>
                        <Link className='btn btn-dark btnDetCarrusel mb-3' to={`/detalleproducto/${productos[0].id}`}>Ver Detalle</Link>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={productos[10].imagen} className="d-block h-100" alt="..."/>
                    <div id='tituloCarrusel' className="carousel-caption d-block mx-auto">
                        <h5 className='tSec'>{productos[10].titulo}</h5>
                        <h5 className="tSec">${productos[10].precio}</h5>
                        <Link className='btn btn-dark btnDetCarrusel mb-3' to={`/detalleproducto/${productos[10].id}`}>Ver Detalle</Link>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={productos[6].imagen} className="d-block h-100" alt="..."/>
                    <div id='tituloCarrusel' className="carousel-caption d-block mx-auto">
                        <h5 className='tSec'>{productos[6].titulo}</h5>
                        <h5 className="tSec">${productos[6].precio}</h5>
                        <Link className='btn btn-dark btnDetCarrusel mb-3' to={`/detalleproducto/${productos[6].id}`}>Ver Detalle</Link>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Atras</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Adelante</span>
            </button>
        </div>
    </div>
  )
}