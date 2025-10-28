import { Link } from 'react-router-dom';
import { Carrusel } from '../components/Carrusel';
import { productos } from '../data/productos';
import fondoCard from '../assets/img/bg_card_index/fondo1.png';
import fondoCard2 from '../assets/img/bg_card_index/fondo2.png';

export const Index = () => {
  return (
    <>
      <Carrusel />
      <div className="container justify-content-center mt-4">
        <div className='container text-center mb-4 bloqueTexto p-3'>
          <h2 className="tPrin">Nuestros Productos</h2>
        </div>
        <div className='row gx-3'>
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
              <div className="row g-0 align-items-stretch">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={productos[11].imagen}
                    className="img-fluid rounded-start producto-superpuesto p-3"
                    alt="Imgen de Postres Individuales"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title tTer">Productos sin Azúcar</h5>
                    <p className="card-text tTer">Pasteles ideales para quienes buscan algo más saludable.</p>
                    <Link
                      id='btnIndex'
                      to={`/catalogo?categoria=${encodeURIComponent('Productos sin Azúcar')}`}
                      className="btn"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <div className="row g-0 align-items-stretch">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={productos[7].imagen}
                    className="img-fluid rounded-start producto-superpuesto p-3"
                    alt="Imgen de Postres Individuales"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title tTer">Postres Individuales</h5>
                    <p className="card-text tTer">Exquisitos postres para disfrutar en cualquier ocasión.</p>
                    <Link
                      id='btnIndex'
                      to={`/catalogo?categoria=${encodeURIComponent('Postres Individuales')}`}
                      className="btn"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
