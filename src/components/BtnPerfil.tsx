import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const BtnPerfil = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<any>(null);

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
        
        window.addEventListener('storage', cargarUsuario);
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
        
        window.dispatchEvent(new Event('usuarioActualizado'));
        
        navigate("/");
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    const handleNavegar = (ruta: string) => {
        navigate(ruta);
    };
    
    // --- FUNCIÓN HELPER PARA CONSTRUIR LA URL DE IMAGEN EN BtnPerfil ---
    const getOffcanvasImageUrl = () => {
        // Asegúrate de extraer el objeto usuario principal si está anidado
        const userData = usuario?.usuario || usuario; 
        
        const profilePath = userData?.imagenPerfil;
        
        if (profilePath) {
            // AÑADE EL PATH COMPLETO NECESARIO PARA SERVIR LA IMAGEN
            return `http://localhost:8080/img/usuarios/${profilePath}`;
        }
        return undefined;
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
                                {/* LÓGICA CORREGIDA PARA CONSTRUIR LA URL COMPLETA */}
                                {getOffcanvasImageUrl() ? (
                                    <img
                                        src={getOffcanvasImageUrl()}
                                        alt="Foto de perfil"
                                        className="fotoBtnPerfil mb-2 rounded-circle" // Añadí rounded-circle para consistencia
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }} // Añadí estilos para visualización
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