import { Link } from 'react-router-dom';
import { BtnCarrito } from './BtnCarrito';
import { BtnPerfil } from './BtnPerfil';

export const NavBar = () => {

    

    return (
        <>
            <div className="banner p-1 p-lg-2 px-md-3">
                <div className="bannerLogin py-1">
                    <div className="d-flex align-items-center gap-4">
                        <div className="iconTitle">
                            <span className="d-flex align-items-center">
                                <Link to="/"><img id='logoMain' src="/img/logo.png" alt="Logo" /></Link>
                            </span>
                        </div>
                        <div className="divNav">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid">
                                    <Link className="navbar-brand tPrin" to="/">Pasteleria Mil Sabores</Link>
                                    <button
                                        className="navbar-toggler btn-dark"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarNav"
                                        aria-controls="navbarNav"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse px-3" id="navbarNav">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <Link className="nav-link tPrin" to="/catalogo">Catalogo</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link tPrin" to="/contacto">Contacto</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link tPrin" to="/comunidad">Comunidad</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link tPrin" to="/nosotros">Nosotros</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* ----------------------- BOTONES DERECHA ----------------------- */}
                    <nav id='btnDer' className="navbar nav-offcanvas btnPerfil me-2 my-2">
                        <div className="container-fluid d-flex align-items-center gap-3">
                            <BtnCarrito />
                            <BtnPerfil />
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
