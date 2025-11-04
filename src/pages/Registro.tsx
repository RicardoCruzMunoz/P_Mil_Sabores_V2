import { Link } from "react-router-dom"

export const Registro = () => {
  return (
    <>
        <div className="contenedorRegistro">
            <div id="cajaAcceso" className="contenido m-5 p-4">
                <h2 className="tPrin">Registro</h2>
                <div className="mx-3">
                    <div className="card-body p-4">
                        <div id="regAlert" className="alert d-none" role="alert"></div>
                        <form id="formRegistro" noValidate>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="nombre"><h5 className="tPrin">Nombre completo</h5></label>
                                <input id="nombre" className="form-control" type="text" placeholder="Ejemplo: Nicolas Perez" required/>
                                <div className="invalid-feedback"><h6 className="tPrin">Sólo letras y espacios, máximo 80 caracteres.</h6></div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="correo"><h5 className="tPrin">Correo</h5></label>
                                <input id="correo" className="form-control" type="email" placeholder="usuario@duoc.cl" required/>
                                <div className="invalid-feedback"><h6 className="tPrin">Debe ser un correo válido y no estar registrado.</h6></div>
                                <div className="form-text"><h6 className="tPrin">Si usas @duoc.cl recibirás una torta gratis en tu cumpleaños 🎂</h6></div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6 col-sm-12">
                                    <label className="form-label" htmlFor="password"><h5 className="tPrin">Contraseña</h5></label>
                                    <input id="password" className="form-control" type="password" required/>
                                    <div className="invalid-feedback"><h6 className="tPrin">La contraseña no cumple los requisitos.</h6></div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label className="form-label" htmlFor="password2"><h5 className="tPrin">Repetir contraseña</h5></label>
                                    <input id="password2" className="form-control" type="password" required/>
                                    <div className="invalid-feedback"><h6 className="tPrin">Las contraseñas no coinciden.</h6></div>
                                </div>
                                <div className="form-text"><h6 className="tPrin">Mín. 8, con mayúscula, minúscula, número y símbolo.</h6></div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6 col-sm-12">
                                    <label className="form-label" htmlFor="codigo"><h5 className="tPrin">Código (opcional)</h5></label>
                                    <input id="codigo" className="form-control" type="tel" placeholder="Ingrese código"/>
                                    <div className="invalid-feedback"><h6 className="tPrin">Código no valido</h6></div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="fechaNacimiento" className="form-label"><h5 className="tPrin">Fecha nacimiento</h5></label>
                                    <input type="date" id="fechaNacimiento" className="form-control" required/>
                                </div>
                            </div>
                            <div className="container d-flex justify-content-center gap-2 mt-4">
                                <Link id="btnLogin" to="/login" className="btnAcc btn btn-dark">Ir al login</Link>
                                <button id="btnLogin" type="submit" className="btnAcc btn btn-dark">Crear cuenta</button>
                            </div>
                        </form>
                    </div>        
                </div>
            </div>
        </div>
    </>
  )
}
