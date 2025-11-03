import { productos } from '../data/productos';
import fondoCard from '../assets/img/bg_card_index/fondo1.png';
import fondoCard2 from '../assets/img/bg_card_index/fondo2.png';
import { useNavigate } from 'react-router-dom';

export const SecNuestrosProd = () => {

    const navigate = useNavigate();
    
      const handleCategoryClick = (categoria: string) => {
        // Navegar al catálogo y pasar la categoría mediante state
        navigate('/catalogo', { state: { categoria } });
      };

  return (
    
    <>
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
                    <button
                      id='btnIndex'
                      onClick={() => handleCategoryClick('Productos sin Azúcar')}
                      className="btn"
                    >
                      Ver más
                    </button>
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
                    <button
                      id='btnIndex'
                      onClick={() => handleCategoryClick('Postres Individuales')}
                      className="btn"
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
  )
}
