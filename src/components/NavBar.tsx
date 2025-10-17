import logo from '../assets/img/logo.png'

export const NavBar = () => {
    return (
        <>
            <div className="banner p-1 p-lg-2 px-md-3">
                <div className="bannerLogin py-1">
                    <div className="d-flex align-items-center gap-4">
                        <div className="iconTitle">
                            <span className="d-flex align-items-center">
                                <a href="/"><img id="logoMain" src={logo} alt="logo" /></a>
                            </span>
                        </div>
                        <div className="divNav">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid">
                                    <a className="navbar-brand tPrin" href="/">Pasteleria Mil Sabores</a>
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
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link tPrin" href="/catalogo">Catalogo</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link tPrin" href="/contacto">Contacto</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link tPrin" href="/comunidad">Comunidad</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link tPrin" href="/nosotros">Nosotros</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <nav id='btnDer' className="navbar nav-offcanvas btnPerfil me-2 my-2">
                        <div className="container-fluid">
                            <button className="navbar-toggler btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                <i className="bi bi-person-circle p-3"></i>
                            </button>
                            <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title tPrin" id="offcanvasNavbarLabel">Perfil</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li className="nav-item">
                                            <a className="nav-link tTer" href="/">D</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
