import { noticias } from "../data/noticias"
import { recetas } from "../data/recetas"


export const Comunidad = () => {
  return (
    <>
      <main>
        <div className="cuadroPresComunidad container">
          <div id="tComunidad" className="cuadroComunidad divPrin p-5 my-5 mx-5">
            <h3 className="tPrin">Nuestra comunidad</h3>
            <p className="tPrin">Bienvenidos a la comunidad, un espacio para compartir noticias, recetas, consejos y experiencias que nos mantienen conectados e inspirados.</p>
          </div>
        </div>

        <div className="container justify-content-center p-4 contenedorComunidad">

          <div className="row gap-4">
            <div id="tCont" className="cuadroComunidad p-3 col-md-6 col-sm-12">
              <h3 className="tPrin">Noticias</h3>
              <div className="tPrin p-3">Sección con novedades, consejos y curiosidades del mundo culinario, ideal para quienes disfrutan aprender y compartir sobre gastronomía.</div>
              {noticias.map((n) => (
                <>
                  <div className="cuadroContenido row m-1">
                    <div className="tPrinTitle">{n.titulo}</div>
                    <div className="tTer">{n.resumen}</div>
                    <img src={n.imagen} alt="Vista previa" width="200" />
                    <a href={n.link}><button className="btn btn-dark">Ver noticia</button></a>
                  </div>
                  <br />
                </>
              ))}
              <br />
            </div>

            <div id="tCont" className="cuadroComunidad p-3 col-md-6 col-sm-12">
              <h3 className="tPrin">Recetas</h3>
              <div className="tPrin p-3">
                Sección con recetas variadas, consejos y curiosidades culinarias, pensada para inspirar y animarte a probar nuevas preparaciones.
              </div>
              {recetas.map((r) => (
                <>
                  <div className="cuadroContenido row m-1">
                    <div className="tPrinTitle">{r.titulo}</div>
                    <div className="tTer">{r.subtitulo}</div>
                    <img src={r.imagen} alt="Vista Previa" width="360" />
                    <a href={r.link}><button className="btn btn-dark">Ver Receta</button></a>
                  </div>
                  <br />
                </>
              ))}

            </div>

          </div>
        </div>
      </main>
    </>
  )
}
