import { useEffect, useState, type FormEvent } from "react";
import { base_url_img } from "../../api/config";
import { api } from "../../api/client";
// 💡 Asumimos que esta interfaz se importará desde un archivo central:
import type { Usuario } from "../../interfaces/Usuario"; 

export const AdminUsuarios = () => {
    const usuarioActualData = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioActual: Usuario = usuarioActualData.usuario || usuarioActualData;

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        password: "",
        password2: "",
        fechaNacimiento: "",
        codigo: "",
        tipoUsuario: "Usuario",
    });

    const getImagenSrc = (ruta: string): string | undefined => {
        if (!ruta) return undefined;
        const timestamp = Date.now(); 
        return `${base_url_img}/img/usuarios/${ruta}?v=${timestamp}`;
    };


    const cargarUsuarios = () => {
        fetch(`${base_url_img}/api/usuarios`)
            .then((response) => response.json())
            .then((data: Usuario[]) => { // Usamos la interfaz importada para tipar los datos
                setUsuarios(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleIniciarEdicion = (usuario: Usuario) => {
        setEditingUser(usuario);
        setMostrarFormulario(true);
        setConfirmDeleteId(null);

        let formattedDate = usuario.fechaNacimiento;
        if (usuario.fechaNacimiento && usuario.fechaNacimiento.includes('T')) {
            formattedDate = usuario.fechaNacimiento.split('T')[0];
        }

        setForm({
            nombre: usuario.nombre,
            correo: usuario.correo,
            password: "", 
            password2: "",
            fechaNacimiento: formattedDate || "",
            codigo: usuario.codigo || "",
            tipoUsuario: usuario.tipoUsuario,
        });
    };

    const handleCancelarFormulario = () => {
        setMostrarFormulario(false);
        setEditingUser(null);
        setConfirmDeleteId(null);
        setForm({
            nombre: "",
            correo: "",
            password: "",
            password2: "",
            fechaNacimiento: "",
            codigo: "",
            tipoUsuario: "Usuario",
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (form.password && form.password !== form.password2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const dataToSend: any = {
            nombre: form.nombre,
            correo: form.correo,
            fechaNacimiento: form.fechaNacimiento,
            tipoUsuario: form.tipoUsuario,
            codigo: null 
        };

        if (form.password) {
            dataToSend.password = form.password;
        }

        try {
            if (editingUser) {
                await api.put(`/usuarios/${editingUser.id}`, dataToSend);
                alert("Usuario actualizado con éxito");
            } else {
                await api.post("/usuarios", { ...dataToSend, password: form.password });
                alert("Usuario creado con éxito");
            }
            
            handleCancelarFormulario();
            cargarUsuarios();

        } catch (error) {
            console.error(error);
            alert(`Error al ${editingUser ? 'actualizar' : 'crear'} el usuario`);
        }
    };

    const handleEliminarUsuario = async (id: number) => {
        setLoading(true);
        try {
            await api.delete(`/usuarios/${id}`);
            alert("Usuario eliminado con éxito");
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el usuario");
        } finally {
            setLoading(false);
            setConfirmDeleteId(null);
        }
    };


    return (
        <div className="fade-in px-4">
            <div className="row align-items-center mb-4">
                <div className="col-md-10">
                    <h2 className="tTer mb-2">
                        <i className="bi bi-people-fill me-2"></i>
                        Gestión de Usuarios
                    </h2>
                </div>
                <div className="col-md-2 text-end">
                    {!mostrarFormulario && (
                        <button
                            className="btn-sm btn-outline-light p-2"
                            onClick={() => setMostrarFormulario(true)}
                        >
                            <i className="bi bi-plus-lg me-2"></i> Agregar
                        </button>
                    )}
                </div>
                <hr className="mt-2" />
            </div>

            {/* FORMULARIO DE CREACIÓN/EDICIÓN */}
            {mostrarFormulario && (
                <div className="card bg-light border-secondary p-4 mb-4">
                    <h4 className="tTer mb-3">{editingUser ? `Modificar Usuario` : "Agregar Nuevo Usuario"}</h4>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Nombre completo</label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                required
                                value={form.nombre}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            <input
                                type="email"
                                name="correo"
                                className="form-control"
                                required
                                value={form.correo}
                                onChange={handleChange}
                                disabled={!!editingUser} 
                            />
                        </div>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Contraseña {editingUser && <small className="text-muted">(Dejar vacío para no cambiar)</small>}</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    required={!editingUser} 
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Repetir contraseña</label>
                                <input
                                    type="password"
                                    name="password2"
                                    className="form-control"
                                    required={!editingUser}
                                    value={form.password2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3 mt-2">
                            <label className="form-label">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                className="form-control"
                                value={form.fechaNacimiento}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Tipo de usuario</label>
                            <select
                                name="tipoUsuario"
                                className="form-select"
                                value={form.tipoUsuario}
                                onChange={handleChange}
                                disabled={editingUser?.tipoUsuario === 'Admin'} 
                            >
                                {editingUser?.tipoUsuario === 'Admin' ? (
                                    <option value="Admin">Admin</option>
                                ) : (
                                    <>
                                        <option value="Usuario">Usuario</option>
                                        <option value="Admin">Admin</option>
                                    </>
                                )}
                            </select>
                            {editingUser?.tipoUsuario === 'Admin' && (
                                <small className="tTer">Advertencia: Los administradores no pueden ser degradados por seguridad.</small>
                            )}
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={handleCancelarFormulario}
                            >
                                Cancelar
                            </button>

                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {editingUser ? "Guardar Cambios" : "Crear Usuario"}
                            </button>
                        </div>

                    </form>
                </div>
            )}

            {/* TABLA DE USUARIOS */}
            {!mostrarFormulario && (
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
                                                <div className="spinner-border spinner-border-sm me-2"></div>
                                                Cargando usuarios...
                                            </td>
                                        </tr>
                                    ) : usuarios.length > 0 ? (
                                        usuarios.map((usuario) => {
                                            const isProtected = usuario.id === 1;
                                            const isSelf = usuario.id === usuarioActual.id;
                                            const disableDelete = isProtected || isSelf;

                                            return (
                                                <tr key={usuario.id}>
                                                    <td className="ps-4 fw-bold text-secondary">#{usuario.id}</td>

                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {usuario.imagenPerfil ? (
                                                                <img
                                                                    className="rounded-circle me-3"
                                                                    src={getImagenSrc(usuario.imagenPerfil)}
                                                                    alt={usuario.nombre}
                                                                    style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                                                                    style={{ width: "35px", height: "35px" }}
                                                                >
                                                                    {usuario.nombre.charAt(0).toUpperCase()}
                                                                </div>
                                                            )}
                                                            <span>{usuario.nombre}</span>
                                                        </div>
                                                    </td>

                                                    <td>{usuario.correo}</td>

                                                    <td>
                                                        {usuario.tipoUsuario === 'Admin' ? (
                                                            <span className="badge bg-primary text-white" style={{fontSize: '0.7rem'}}>Admin</span>
                                                        ) : (
                                                            <span className="badge bg-light text-dark border" style={{fontSize: '0.7rem'}}>Usuario</span>)
                                                        }
                                                    </td>

                                                    <td className="text-end pe-4">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            
                                                            <button 
                                                                className="btn btn-outline-light btn-sm"
                                                                onClick={() => handleIniciarEdicion(usuario)}
                                                            >
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>

                                                            {confirmDeleteId === usuario.id ? (
                                                                <div className="d-inline-flex gap-2">
                                                                    <button
                                                                        className="btn btn-sm btn-danger"
                                                                        onClick={() => handleEliminarUsuario(usuario.id)}
                                                                        disabled={loading}
                                                                    >
                                                                        <i className="bi bi-check"></i> Confirmar
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-outline-light"
                                                                        onClick={() => setConfirmDeleteId(null)}
                                                                    >
                                                                        <i className="bi bi-x"></i>
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    disabled={disableDelete || loading}
                                                                    className="btn btn-outline-danger btn-sm"
                                                                    onClick={() => setConfirmDeleteId(usuario.id)}
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center py-5">
                                                <i className="bi bi-people fs-1 d-block"></i>
                                                No hay usuarios registrados
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>

                    <div className="card-footer text-end">
                        <small>Total de usuarios: {usuarios.length}</small>
                    </div>
                </div>
            )}
        </div>
    );
};