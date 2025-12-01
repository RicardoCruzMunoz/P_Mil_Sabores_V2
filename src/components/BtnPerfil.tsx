import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const BtnPerfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<any>(null);

  // Función para cargar usuario
  const cargarUsuario = () => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  };

  useEffect(() => {
    cargarUsuario();
    
    // Escuchar cambios en el storage (cuando se hace login en otra pestaña o componente)
    window.addEventListener('storage', cargarUsuario);
    
    // Escuchar evento personalizado para actualizar
    window.addEventListener('usuarioActualizado', cargarUsuario);
    
    return () => {
      window.removeEventListener('storage', cargarUsuario);
      window.removeEventListener('usuarioActualizado', cargarUsuario);
    };
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    alert("Sesión cerrada exitosamente");
    
    // Disparar evento para actualizar otros componentes
    window.dispatchEvent(new Event('usuarioActualizado'));
    
    // Redirigir y recargar
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Función para manejar navegación y cerrar offcanvas
  const handleNavegar = (ruta: string) => {
    navigate(ruta);
  };

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
          <h5 className="offcanvas-title tSec" id="offcanvasPerfilLabel">
            {usuario ? `Hola, ${usuario.usuario?.nombre || usuario.nombre}` : "Mi Cuenta"}
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {!usuario && (
            <div className='row gap-3 m-5'>
              <button 
                className='btn btn-dark col-12' 
                onClick={() => handleNavegar('/login')}
                data-bs-dismiss="offcanvas"
              >
                Iniciar Sesión
              </button>
              <button 
                className='btn btn-dark col-12' 
                onClick={() => handleNavegar('/registro')}
                data-bs-dismiss="offcanvas"
              >
                Registrarse
              </button>
            </div>
          )}

          {usuario && (
            <div className='row gap-3 m-5'>
              <div className="d-flex justify-content-center">
                {usuario?.usuario?.imagenPerfil || usuario?.imagenPerfil ? (
                  <img
                    src={
                      usuario?.usuario?.imagenPerfil
                        ? `http://localhost:8080${usuario.usuario.imagenPerfil}`
                        : `http://localhost:8080${usuario.imagenPerfil}`
                    }
                    alt="Foto de perfil"
                    className="fotoBtnPerfil mb-2"
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mb-2"
                    style={{ width: "150px", height: "150px", fontSize: "4rem" }}
                  >
                    {usuario?.usuario?.nombre?.charAt(0).toUpperCase() ||
                      usuario?.nombre?.charAt(0).toUpperCase() ||
                      "?"}
                  </div>
                )}
              </div>


              {(usuario.usuario?.tipoUsuario === "Admin" || usuario.tipoUsuario === "Admin") && (
                <button 
                  className='btn btn-dark col-12' 
                  onClick={() => handleNavegar('/admin')}
                  data-bs-dismiss="offcanvas"
                >
                  <i className="bi bi-gear-fill me-2"></i>
                  Panel de Administrador
                </button>
              )}

              <button 
                className='btn btn-dark col-12' 
                onClick={() => handleNavegar('/perfil')}
                data-bs-dismiss="offcanvas"
              >
                <i className="bi bi-person-fill me-2"></i>
                Editar Perfil
              </button>
              
              <button 
                className='btn btn-dark col-12' 
                onClick={handleCerrarSesion}
                data-bs-dismiss="offcanvas"
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}