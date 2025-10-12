export const Login = () => {
  return (
    <>
    <div className="container d-flex justify-content-center mt-3">
        <form id="formLogin" noValidate>
            <div className="contenedor">
                <div id="cajaLogin" className="contenido m-3 p-2">
                    <h2 className="tPrin">Acceso</h2>
                    <div className="mx-3">
                        {/* Campo correo */}
                        <div className="col-12 my-4">
                        <label className="form-label tPrin" htmlFor="correoLogin">
                            <h5>Correo</h5>
                        </label>
                        <input
                            type="email"
                            id="correoLogin"
                            className="form-control"
                            required
                        />
                        <div className="invalid-feedback">
                            <h6 className="tPrin">Debe ser un correo válido @duoc.cl</h6>
                        </div>
                        </div>
                        {/* Campo contraseña */}
                        <div className="col-12 my-4">
                        <label className="form-label tPrin" htmlFor="passwordLogin">
                            <h5>Contraseña</h5>
                        </label>
                        <input
                            type="password"
                            id="passwordLogin"
                            className="form-control"
                            required
                        />
                        <div className="container d-flex justify-content-center">
                            <h6 className="tPrin mt-1">
                            ¿Olvidó su contraseña? Pulse <a href="#">aquí</a>
                            </h6>
                        </div>
                        </div>

                        {/* Div de alertas */}
                        <div id="loginAlert" className="alert d-none mt-3"></div>

                        {/* Botón */}
                        <div className="container d-flex justify-content-center mt-4">
                        <button type="submit" className="btnAcc btn btn-dark">
                            Iniciar Sesión
                        </button>
                        </div>

                        {/* Enlace de registro */}
                        <div className="container d-flex justify-content-center mt-2">
                        <h6 className="tPrin">
                            ¿No tiene cuenta?{" "}
                            <a href="/registro">Regístrese</a>
                        </h6>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  );
};
