// src/components/NavBar.tsx
import { useCar } from '../context/CarContext'; 
// Asegúrate de que estas rutas de imágenes sean correctas en tu entorno
import logo from '../assets/img/logo.png'; 
import userIconImage from '../assets/img/person-circle.svg'; // Tu icono de perfil (el círculo marrón)


export const NavBar = () => {
    const { carItems } = useCar();
    const totalItems = carItems.reduce((total, item) => total + item.cantidad, 0);

    return (
        // Contenedor del fondo rosa/rojo
        <div className="banner p-1 p-lg-2 px-md-3">
            
            {/* 💡 TU ESTRUCTURA ORIGINAL PARA EL LOGO Y BOTÓN DE PERFIL */}
            <div className="bannerLogin py-1 d-flex align-items-center justify-content-between">
                
                {/* === IZQUIERDA: LOGO === */}
                <div className="iconTitle d-flex align-items-center">
                    <span className="d-flex align-items-center">
                        <a href="/"><img id="logoMain" src={logo} alt="logo" /></a>
                    </span>
                </div>
                
                {/* === CENTRO: CONTENEDOR DE LA NAVEGACIÓN (DIVNAV) === */}
                {/* NOTA: En tu diseño, la navegación NO usa el divNav, sino que usa un div que envuelve la navegación. 
                           Añadiremos los estilos flotantes directamente al div contenedor. */}
                <div className="d-flex align-items-center mx-auto" style={{ position: 'relative', left: '0', right: '0' }}>
                    
                    <div className="divNav" style={{ maxWidth: 'unset' }}> {/* Usamos tu clase divNav */}
                        <nav className="navbar navbar-expand-lg p-0"> 
                            <div className="container-fluid p-0">
                                
                                <a className="navbar-brand tPrin me-4" href="/">Pasteleria Mil Sabores</a>

                                {/* Menú de enlaces */}
                                <div className="collapse navbar-collapse px-3" id="navbarNav">
                                    {/* 💡 APLICAMOS TU ESTILO DE CAJA AQUÍ */}
                                    <ul className="navbar-nav mb-2 mb-lg-0 p-2 rounded-pill" style={{ border: '1px solid #5D4037', backgroundColor: '#fcf3e3', whiteSpace: 'nowrap' }}>
                                        <li className="nav-item"><a className="nav-link px-2" href="/catalogo">Catálogo</a></li>
                                        <li className="nav-item"><a className="nav-link px-2" href="/contacto">Contacto</a></li>
                                        <li className="nav-item"><a className="nav-link px-2" href="/comunidad">Comunidad</a></li>
                                        <li className="nav-item"><a className="nav-link px-2" href="/nosotros">Nosotros</a></li>
                                        
                                        {/* 🛒 ENLACE DEL CARRITO CON CONTADOR Y TEXTO */}
                                        <li className="nav-item">
                                            <a className="nav-link d-flex align-items-center px-2" href="/carrito">
                                                Carrito 
                                                {totalItems > 0 && (
                                                    <span className="badge text-bg-warning ms-1 rounded-pill">
                                                        {totalItems}
                                                    </span>
                                                )}
                                                {/* 💡 ÍCONO DE CARRITO */}
                                                <i className="fa-solid fa-cart-shopping ms-1"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                
                {/* === DERECHA: BOTÓN DE PERFIL (Offcanvas) === */}
                <div className="d-flex align-items-center">
                    {/* Botón de perfil original (Círculo Marrón #btnperfill) */}
                    <button id="btnperfill" className="navbar-toggler btn-dark" type="button" 
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" 
                            aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
                            style={{ padding: '0', border: 'none', background: 'none' }}>
                        {/* El icono circular es definido por tu CSS #btnperfill */}
                        <img src={userIconImage} alt="Mi Cuenta" style={{width:'50px', height:'50px', borderRadius:'50%'}}/> 
                        
                    </button>
                </div>
            </div>
            
            {/* OFFCANVAS (MENÚ LATERAL) */}
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Mi Cuenta</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="d-flex btn-secundario col-12">
                        <a className="btn btn-secondary col-12" href="/login">Iniciar Sesión</a>
                    </div>
                    <div className="d-flex btn-secundario col-12">
                        <a className="btn btn-secondary col-12" href="/registro">Registrarse</a>
                    </div>
                </div>
            </div>
        </div>
    );
};