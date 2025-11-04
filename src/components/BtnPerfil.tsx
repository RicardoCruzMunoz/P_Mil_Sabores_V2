import { Link } from "react-router-dom"

export const BtnPerfil = () => {
  return (
    <>
      <button
        id="btnPerfil"
        className="navbar-toggler btn-dark"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasPerfil"
        aria-controls="offcanvasPerfil"
        aria-label="Toggle navigation">
        <i className="bi bi-person-circle"></i>
      </button>

      <div
        className="offcanvas offcanvas-end"
        id="offcanvasPerfil"
        aria-labelledby="offcanvasPerfilLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title tSec" id="offcanvasPerfilLabel">Mi Cuenta</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div className="offcanvas-body">
          <div className='row gap-3 m-5'>
            <Link className='btn btn-dark col-12' to='/login'>Iniciar Sesión</Link>
            <Link className='btn btn-dark col-12' to='/registro'>Registrarse</Link>
          </div>
        </div>
      </div>
    </>
  )
}
