export const Contacto = () => {
  return (
    <div className="container form-container p-5">
      <h1 className="tTer">Contacto</h1>
      <form>
        <div className="form-group">
          <label className="tTer">Correo electrónico</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="nombre@correo.com" />
        </div>
        <div className="form-group">
          <label className="tTer">Teléfono</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="+56912345678" />
        </div>
        <div className="form-group">
          <label className="tTer">Motivo de contacto</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option>Seleccione...</option>
            <option>Devoluciones</option>
            <option>Trabaja con nosotros</option>
            <option>Torta personalizada</option>
          </select>
        </div>

        <div className="form-group">
          <label className="tTer">Mensaje</label>
          <textarea className="form-control" placeholder="Mensaje..."></textarea>
        </div>
      </form>
      <button className="btn-dark btn">Enviar</button>
    </div>
  )
}

