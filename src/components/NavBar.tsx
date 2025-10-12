import logo from '../assets/img/logo.png'

export const NavBar = () => {
  return (
    <>
        <header>
            <div className="banner p-1 p-lg-2 px-md-3">
                <div className="bannerLogin py-1">
                    <div className="iconTitle">
                        <span className="d-flex align-items-center">
                            <a href="/"><img id="logoMain" src={logo} alt="logo"/></a>
                            <h1 className="bloqueSolo tPrinTitle ms-3">Pastelería Mil Sabores</h1>
                        </span>
                    </div>
                    <div className="divNav m-2 p-lg-2 p-md-1 col-6">
                        <nav className="navbar navbar-expand-lg pt-1">
                            <div className="container-fluid">
                                <a className="navbar-brand active tPrin" href="/">Inicio</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                    <div className="container btnBanner">
                        <div id="loginContainer">
                            <a href="/login"><button className="btn btn-dark">Login</button></a>
                        </div>

                        <div id="userContainer" className="dropdown d-none">
                            <button className="btn btn-user dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-list"></i>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="perfilUsuario.html">Perfil</a></li>
                                <hr/>
                                <li><a className="dropdown-item" href="#" id="logoutBtn">Cerrar sesión</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}
