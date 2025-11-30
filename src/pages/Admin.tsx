import { useEffect, useState } from "react";
import { AdminMenuPrin } from "../components/CompAdmin/AdminMenuPrin";
import { AdminProd } from "../components/CompAdmin/AdminProd";
import { AdminUsuarios } from "../components/CompAdmin/AdminUsuarios";

const MenuPrincipal = () => <AdminMenuPrin />;
const Productos = () => <AdminProd />;
const Usuarios = () => <AdminUsuarios />;

function Admin() {
  const [usuario, setUsuario] = useState<any>(null);
  
  // 2. Creamos un estado para saber qué vista mostrar. Por defecto 'menu'.
  const [vistaActual, setVistaActual] = useState("menu");

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
  }, []);

  const renderContenido = () => {
    switch (vistaActual) {
      case "menu":
        return <MenuPrincipal />;
      case "productos":
        return <Productos />;
      case "usuarios":
        return <Usuarios />;
      default:
        return <MenuPrincipal />;
    }
  };

  return (
    <>
      <div className="admin-layout">
        
        <div className="sidebar-custom p-3">
          <h2 className="sidebar-title tTer">
            <i className="bi bi-person-fill me-2"></i>
            {usuario ? usuario.nombre : "Admin"}
          </h2>

          <hr />

          <nav className="sidebar-menu">
            <a className={`sidebar-item ${vistaActual === 'menu' ? 'active' : ''}`} 
               onClick={(e) => { e.preventDefault(); setVistaActual("menu"); }}>
              <i className="bi bi-house"></i> Menu Principal
            </a>

            <a href="#" className={`sidebar-item ${vistaActual === 'productos' ? 'active' : ''}`} 
               onClick={(e) => { e.preventDefault(); setVistaActual("productos"); }}>
              <i className="bi bi-box-seam"></i> Productos
            </a>

            <a href="#" className={`sidebar-item ${vistaActual === 'usuarios' ? 'active' : ''}`} 
               onClick={(e) => { e.preventDefault(); setVistaActual("usuarios"); }}>
              <i className="bi bi-people"></i> Usuarios
            </a>

            <a href="#" className="sidebar-item disabled">
              <i className="bi bi-receipt"></i> Otros
            </a>
          </nav>
        </div>

        {/* CONTENIDO PRINCIPAL (derecha) */}
        <main className="admin-content m-4 p-3 rounded-3 shadow-sm">
          <h1 className="tPrin">Panel de Administración</h1>
          <hr />
          <div className="contenido-dinamico">
            {renderContenido()}
          </div>
        </main>

      </div>
    </>
  );
}

export default Admin;