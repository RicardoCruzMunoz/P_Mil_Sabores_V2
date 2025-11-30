import { useEffect, useState } from "react";
import { base_url_img } from "../../api/config";

// Definimos la estructura del Usuario (según tu modelo Java)
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipoUsuario: string;
  fechaNacimiento?: string;
}

export const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetch(`${base_url_img}/api/usuarios`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener usuarios");
        return response.json();
      })
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-in px-4">
        
        {/* ENCABEZADO */}
        <div className="row align-items-center mb-4">
            <div className="col-12">
                <h2 className="tTer mb-2">
                    <i className="bi bi-people-fill me-2"></i>
                    Gestión de Usuarios
                </h2>
            </div>
        </div>

        {/* TABLA DE USUARIOS */}
        <div className="card border-secondary shadow-sm">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4 py-3">ID</th>
                                <th>Nombre</th>
                                <th>Correo Electrónico</th>
                                <th>Tipo de Usuario</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-5 text-secondary">
                                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                        Cargando usuarios...
                                    </td>
                                </tr>
                            ) : usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td className="ps-4 fw-bold text-secondary">#{usuario.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" 
                                                     style={{width: '35px', height: '35px', fontSize: '0.9rem'}}>
                                                    {usuario.nombre.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="fw-medium">{usuario.nombre}</span>
                                            </div>
                                        </td>
                                        <td>{usuario.correo}</td>
                                        <td>
                                            <span className={`badge ${usuario.tipoUsuario === 'Admin' ? 'bg-primary' : 'bg-info text-dark'} border`}>
                                                {usuario.tipoUsuario}
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button className="btn btn-outline-secondary btn-sm me-2" title="Editar">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            
                                            {/* PROTECCIÓN: Desactivamos el botón si el ID es 1 */}
                                            <button 
                                                className="btn btn-outline-danger btn-sm" 
                                                title={usuario.id === 1 ? "No se puede eliminar al administrador principal" : "Eliminar"}
                                                disabled={usuario.id === 1}
                                                onClick={() => {
                                                    // Aquí iría tu lógica futura de eliminar
                                                    if(usuario.id !== 1) console.log("Eliminar usuario", usuario.id);
                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-5">
                                        <div className="text-muted">
                                            <i className="bi bi-people fs-1 d-block mb-2"></i>
                                            No se encontraron usuarios registrados.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer bg-white text-end py-3">
                <small className="text-muted">Total de usuarios: <strong>{usuarios.length}</strong></small>
            </div>
        </div>
    </div>
  );
};