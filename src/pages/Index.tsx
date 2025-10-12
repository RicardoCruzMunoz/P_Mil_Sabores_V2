import banner_vertical from '../assets/img/banner_vertical.png';
import banner_horizontal from '../assets/img/banner_horizontal.png';
import { Carrusel } from '../components/Carrusel';


export const Index = () => {
  return (
    <>
        <Carrusel />
        <div className="container justify-content-center mt-4">
            <div className="row">
                <div className="col-md-12 col-lg-5">
                    <div className="cuadroVisMis p-4">
                        <h3 className="tPrin">Vision</h3>
                        <p className="tPrin">Convertirnos en la tienda online líder de productos de repostería en Chile,
                            conocida por nuestra
                            innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de
                            nuevos
                            talentos en gastronomía.</p>
                    </div>
                    <br/>
                    <div className="cuadroVisMis p-4">
                        <h3 className="tPrin">Mision</h3>
                        <p className="tPrin">Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando
                            tortas y productos
                            de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces
                            históricas y fomentamos la creatividad en la repostería.</p>
                    </div>
                </div>
                <div className="col-md-12 col-lg-2"><br/></div>
                <div className="col-md-12 col-lg-5">
                    <img id="bannerVert" src={banner_vertical} alt="imagen_pasteles"/>
                    <img id="bannerHori" src={banner_horizontal} alt="imagen_pasteles"/>
                </div>
            </div>
        </div>
    </>
  )
}
