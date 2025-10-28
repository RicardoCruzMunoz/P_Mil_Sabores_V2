export const Contacto = () => {
  return (
    <div className="mx-5 my-3">
      <div id="cuadroContacto" className="container form-container p-5 my-5 cuadroVisMis">
        <h1 className="tPrin">Contacto</h1>
        <form className="container justify-content-center">
          <div className="form-group col-12">
            <label className="tTer">Correo electrónico</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="nombre@correo.com" />
          </div>
          <div className="row gx-4">
            <div className="form-group col-md-6 col-sm-12">
              <label className="tTer">Teléfono</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="+56912345678" />
            </div>
            <div className="form-group col-md-6 col-sm-12">
              <label className="tTer">Motivo de contacto</label>
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Seleccione...</option>
                <option>Devoluciones</option>
                <option>Trabaja con nosotros</option>
                <option>Torta personalizada</option>
              </select>
            </div>
          </div>
          <div className="form-group col-12">
            <label className="tTer">Mensaje</label>
            <textarea className="form-control pb-5" placeholder="Mensaje..."></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-dark">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}