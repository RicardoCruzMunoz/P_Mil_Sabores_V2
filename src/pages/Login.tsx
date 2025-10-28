export const Login = () => {
  return (
    <>
      <form id="formLogin" noValidate className="my-2 mx-5">
            <div id="cajaAcceso" className="contenido m-5 p-4">
                <h2 className="tPrin">Iniciar Sesión</h2>
                <div className="row mx-4">
                    <div className="col-12 my-4">
                        <label className="form-label tPrin" htmlFor="correo"><h5>Correo</h5></label>
                        <input type="email" id="correoLogin" className="form-control" required/>
                        <div className="invalid-feedback"><h6 className="tPrin">Debe ser un correo válido @duoc.cl</h6>
                        </div>
                    </div>
                    <div className="col-12 my-4">
                        <label className="form-label tPrin" htmlFor="password"><h5>Contraseña</h5></label>
                        <input type="password" id="passwordLogin" className="form-control" required/>
                        <div className="container d-flex justify-content-center">
                            <h6 className="tPrin mt-1">¿Olvidó su contraseña? Pulse <a href="#">aquí</a></h6>
                        </div> 
                    </div>
                    <div id="loginAlert" className="alert d-none mt-3"></div>
                    <div className="container d-flex justify-content-center mt-2">
                        <button type="submit" className="btnAcc btn btn-dark">Iniciar Sesión</button>
                    </div>
                    <div className="container d-flex justify-content-center mt-2">
                        <h6 className="tPrin">¿No tiene cuenta? <a href="/registro">Regístrese</a></h6>
                    </div>
                </div>
            </div>
        </form>
    </>
  );
};
