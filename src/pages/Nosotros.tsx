import NuestraHistoria from "../components/NuestraHistoria"
import NuestroEquipo from "../components/NuestroEquipo"

export const Nosotros = () => {
  return (
    <>
    {/* Cartel De presentación de la sección */}
    <div className="cuadroPresComunidad container"> 
      <div id="tComunidad" className="cuadroComunidad p-3 my-5 mx-5">
        <h3 className="tPrin">¿Quienes Somos?</h3>
        <div className="cuadroContenido">
          <p className="tPrin">
              Somos Pastelería Mil Sabores siendo un referente en la repostería chilena por 50 años.        
              <br /> Famosos por nuestra participación en un récord Guinness en 1995, cuando colaboramos en la creación de la torta más grande del mundo
          </p>
        </div>
      </div>
    </div>

    <div className="container justify-content-center p-4 contenedorComunidad">
      <div className="row gap-4">
        {/* Mision */}
        <div id="tCont" className="cuadroComunidad p-3 col-md-6 col-sm-12">
          <h3 className="tPrin">Misión</h3>
          <div className="cuadroContenido">
            <p className="tPrin">Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos
                                de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces
                                históricas y fomentamos la creatividad en la repostería.</p>
            <img src="public/img/nosotrosImg/Mision2.png" alt="Vista previa"  width={350}/>
          </div>
        </div>
        {/* Vision */}
        <div id="tCont" className="cuadroComunidad p-3 col-md-6 col-sm-12">
          <h3 className="tPrin">Visión</h3>
          <div className="cuadroContenido">
            <p className="tPrin">Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra
                            innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos
                            talentos en gastronomía.</p>
            <img src="public/img/nosotrosImg/Visión.png" alt="Vista previa" width={350}/>
          </div>
        </div>
      </div>
    </div>
    {/* Historia */}
    <div className="container justify-content-center p-4 contenedorComunidad">
      <div className="row gap-4">
          <NuestraHistoria/>

          <NuestroEquipo/>

      </div>
    </div>
    </>
  )
}
