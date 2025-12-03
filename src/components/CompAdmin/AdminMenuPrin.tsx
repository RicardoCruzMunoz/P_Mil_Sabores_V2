import { useEffect, useState } from "react";
import { getProducto } from "../../api/producto";
import type { Producto } from "../../interfaces/Producto";
import { base_url_img } from "../../api/config";
import type { Usuario } from "../../interfaces/Usuario";

export const AdminMenuPrin = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

    const getImagenSrc = (ruta: string, tipo: 'producto' | 'usuario') => {
        if (!ruta) return "/img/placeholder.png";
        if (ruta.startsWith("http")) return ruta;
        
        const timestamp = Date.now();
        
        if (tipo === 'usuario') {
            return `${base_url_img}/img/usuarios/${ruta}?v=${timestamp}`;
        }
        
        return `${base_url_img}/img/${ruta}?v=${timestamp}`;
    };

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const prodData = await getProducto();
                setProductos(prodData);

                const userRes = await fetch(`${base_url_img}/api/usuarios`); 
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUsuarios(userData);
                }
            } catch (err) {
                console.error("Error cargando dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    const ultimosProductos = [...productos].reverse().slice(0, 10);
    const ultimosUsuarios = [...usuarios].reverse().slice(0, 10);

    const totalAdmins = usuarios.filter(u => u.tipoUsuario === 'Admin').length;
    const totalUsuarios = usuarios.length; 

    return (
        <div className="fade-in">
            
            <div className="row mb-4 g-3">
                
                <div className="col-md-4">
                    <div className="card text-white bg-dark border-secondary shadow-sm h-100">
                        <div className="card-body p-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="card-title text-dark-50 text-uppercase m-0" style={{fontSize: '0.8rem'}}>Productos</h6>
                                <h3 className="fw-bold text-dark-50 mb-0">{loading ? "-" : productos.length}</h3>
                            </div>
                            <div className="bg-secondary bg-opacity-25 p-2 rounded">
                                <i className="bi bi-box-seam fs-4 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-white border-secondary text-dark shadow-sm h-100">
                        <div className="card-body p-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="card-title text-muted text-uppercase m-0" style={{fontSize: '0.8rem'}}>Usuarios Totales</h6>
                                <h3 className="fw-bold mb-0">{loading ? "-" : totalUsuarios}</h3>
                            </div>
                            <div className="bg-light border p-2 rounded">
                                <i className="bi bi-people fs-4 text-dark"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-white bg-primary bg-gradient border-0 shadow-sm h-100">
                        <div className="card-body p-3 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="card-title text-white-50 text-uppercase m-0" style={{fontSize: '0.8rem'}}>Administradores</h6>
                                <h3 className="fw-bold mb-0">{loading ? "-" : totalAdmins}</h3>
                            </div>
                            <div className="bg-white bg-opacity-25 p-2 rounded">
                                <i className="bi bi-shield-lock fs-4 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                
                <div className="col-xl-6 col-12">
                    <div className="card border-secondary shadow-sm h-100">
                        <div className="card-header bg-white py-2 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="tSec mb-0 text-dark fw-bold">
                                <i className="bi bi-bag-plus me-2 text-primary"></i>
                                Últimos 10 Productos
                            </h6>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover table-sm mb-0 align-middle" style={{fontSize: '0.9rem'}}>
                                    <thead className="table-light">
                                        <tr>
                                            <th className="ps-3">Img</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th className="text-end pe-3">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan={4} className="text-center py-3">Cargando...</td></tr>
                                        ) : ultimosProductos.length > 0 ? (
                                            ultimosProductos.map((p) => (
                                                <tr key={p.upc}>
                                                    <td className="ps-3" style={{width: '50px'}}>
                                                        <img 
                                                            src={getImagenSrc(p.imagenUrl, 'producto')}
                                                            alt={p.nombre} 
                                                            className="rounded border"
                                                            style={{width:'30px', height:'30px', objectFit:'contain'}}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="fw-bold text-truncate" style={{maxWidth: '150px'}}>{p.nombre}</div>
                                                        <div className="text-muted small" style={{fontSize: '0.75rem'}}>{p.upc}</div>
                                                    </td>
                                                    <td>${p.precio.toLocaleString('es-CL')}</td>
                                                    <td className="text-end pe-3">
                                                        <span className="badge bg-success bg-opacity-10 text-success border border-success">Nuevo</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={4} className="text-center py-3 text-muted">Sin datos.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-12">
                    <div className="card border-secondary shadow-sm h-100">
                        <div className="card-header bg-white py-2 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="tSec mb-0 text-dark fw-bold">
                                <i className="bi bi-person-plus me-2 text-info"></i>
                                Últimos 10 Usuarios
                            </h6>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover table-sm mb-0 align-middle" style={{fontSize: '0.9rem'}}>
                                    <thead className="table-light">
                                        <tr>
                                            <th className="ps-3">ID</th>
                                            <th>Usuario</th>
                                            <th>Rol</th>
                                            <th className="text-end pe-3">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr><td colSpan={4} className="text-center py-3">Cargando...</td></tr>
                                        ) : ultimosUsuarios.length > 0 ? (
                                            ultimosUsuarios.map((u) => (
                                                <tr key={u.id}>
                                                    <td className="ps-3 text-muted small">#{u.id}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {u.imagenPerfil ? (
                                                                <div className="me-2">
                                                                <img
                                                                    className="rounded-circle"
                                                                    src={getImagenSrc(u.imagenPerfil, 'usuario')}
                                                                    alt={u.nombre}
                                                                    style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                                                                />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                                                                    style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}
                                                                >
                                                                    {u.nombre.charAt(0).toUpperCase()}
                                                                </div>
                                                            )}
                                                            <div className="d-flex flex-column">
                                                                <span className="fw-medium">{u.nombre}</span>
                                                                <span className="text-muted small" style={{fontSize: '0.7rem'}}>{u.correo}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {u.tipoUsuario === 'Admin' ? (
                                                            <span className="badge bg-primary text-white" style={{fontSize: '0.7rem'}}>Admin</span>
                                                        ) : (
                                                            <span className="badge bg-light text-dark border" style={{fontSize: '0.7rem'}}>Usuario</span>)
                                                        }
                                                    </td>
                                                    <td className="text-end pe-3">
                                                        <span className="badge bg-info bg-opacity-10 text-info border border-info">Registrado</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={4} className="text-center py-3 text-muted">Sin datos.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};