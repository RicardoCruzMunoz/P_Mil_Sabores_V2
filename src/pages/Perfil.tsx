import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [cambiarPassword, setCambiarPassword] = useState(false);
    const [imagenFile, setImagenFile] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);

    
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        fechaNacimiento: "",
        codigo: "",
        passwordActual: "",
        passwordNueva: "",
        passwordNueva2: ""
    });

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (!usuarioGuardado) {
            alert("Debes iniciar sesión para ver tu perfil");
            navigate("/login");
            return;
        }

        const usuarioData = JSON.parse(usuarioGuardado);
        const usuarioFinal = usuarioData.usuario || usuarioData;
        
        setUsuario(usuarioFinal);
        setForm({
            nombre: usuarioFinal.nombre || "",
            correo: usuarioFinal.correo || "",
            fechaNacimiento: usuarioFinal.fechaNacimiento || "",
            codigo: usuarioFinal.codigo || "",
            passwordActual: "",
            passwordNueva: "",
            passwordNueva2: ""
        });
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleActualizarDatos = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!usuario?.id) {
            alert("Error: No se pudo identificar el usuario");
            return;
        }

        setLoading(true);

        try {
            // Preparar datos para actualizar (correo NO se puede cambiar)
            const datosActualizados: any = {
                nombre: form.nombre,
                correo: usuario.correo, // Usar el correo original del usuario
                fechaNacimiento: form.fechaNacimiento,
                codigo: form.codigo,
                tipoUsuario: usuario.tipoUsuario
            };

            // Si está cambiando la contraseña
            if (cambiarPassword) {
                if (!form.passwordActual) {
                    alert("Debes ingresar tu contraseña actual");
                    setLoading(false);
                    return;
                }
                
                if (form.passwordNueva !== form.passwordNueva2) {
                    alert("Las contraseñas nuevas no coinciden");
                    setLoading(false);
                    return;
                }

                if (form.passwordNueva.length < 8) {
                    alert("La contraseña debe tener al menos 8 caracteres");
                    setLoading(false);
                    return;
                }

                // Primero verificar la contraseña actual haciendo login
                try {
                    await api.post("/usuarios/login", {
                        correo: usuario.correo,
                        password: form.passwordActual
                    });
                    
                    // Si el login es exitoso, agregar la nueva contraseña
                    datosActualizados.password = form.passwordNueva;
                } catch (error) {
                    alert("La contraseña actual es incorrecta");
                    setLoading(false);
                    return;
                }
            }

            console.log("Enviando datos al servidor:", datosActualizados);

            // Actualizar usuario en el backend
            const response = await api.put(`/usuarios/${usuario.id}`, datosActualizados);
            
            console.log("Respuesta del servidor:", response.data);
            
            // Actualizar localStorage con los nuevos datos
            const usuarioActualizado = response.data;
            const token = localStorage.getItem("token");
            localStorage.setItem("usuario", JSON.stringify({ 
                usuario: usuarioActualizado,
                token: token 
            }));
            
            // Disparar evento para actualizar otros componentes
            window.dispatchEvent(new Event('usuarioActualizado'));
            
            alert("Perfil actualizado exitosamente");
            setModoEdicion(false);
            setCambiarPassword(false);
            
            // Recargar datos
            setUsuario(usuarioActualizado);
            setForm({
                nombre: usuarioActualizado.nombre,
                correo: usuarioActualizado.correo,
                fechaNacimiento: usuarioActualizado.fechaNacimiento,
                codigo: usuarioActualizado.codigo,
                passwordActual: "",
                passwordNueva: "",
                passwordNueva2: ""
            });

        } catch (error: any) {
            console.error("Error completo:", error);
            console.error("Response:", error.response);
            
            let mensajeError = "Error desconocido";
            
            if (error.response) {
                if (error.response.status === 404) {
                    mensajeError = "Usuario no encontrado en el servidor";
                } else if (error.response.status === 400) {
                    mensajeError = "Datos inválidos";
                } else if (error.response.status === 500) {
                    mensajeError = "Error interno del servidor";
                } else if (error.response.data) {
                    if (typeof error.response.data === 'string') {
                        mensajeError = error.response.data;
                    } else if (error.response.data.message) {
                        mensajeError = error.response.data.message;
                    }
                }
            } else if (error.request) {
                mensajeError = "No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:8080";
            } else {
                mensajeError = error.message || "Error al procesar la petición";
            }
            
            alert("Error al actualizar el perfil: " + mensajeError);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagenFile(file);
            setPreview(URL.createObjectURL(file)); // Previsualización
        }
    };

    const handleSubirImagen = async () => {
        if (!imagenFile) {
            alert("Selecciona una imagen primero");
            return;
        }

        const formData = new FormData();
        formData.append("imagen", imagenFile);

        try {
            const response = await api.post(
                `/usuarios/${usuario.id}/imagenPerfil`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const nuevaRuta = response.data;

            // Actualizar localStorage
            const datosGuardados = JSON.parse(localStorage.getItem("usuario") || "{}");
            const usuarioActualizado = {
                ...usuario,
                imagenPerfil: nuevaRuta
            };

            localStorage.setItem("usuario", JSON.stringify({
                usuario: usuarioActualizado,
                token: datosGuardados.token
            }));

            setUsuario(usuarioActualizado);
            setPreview(null);
            setImagenFile(null);

            alert("Imagen actualizada correctamente");

        } catch (error) {
            console.error(error);
            alert("Error al subir la imagen");
        }
    };



    const handleCancelar = () => {
        setModoEdicion(false);
        setCambiarPassword(false);
        // Restaurar valores originales
        if (usuario) {
            setForm({
                nombre: usuario.nombre || "",
                correo: usuario.correo || "",
                fechaNacimiento: usuario.fechaNacimiento || "",
                codigo: usuario.codigo || "",
                passwordActual: "",
                passwordNueva: "",
                passwordNueva2: ""
            });
        }
    };

    if (!usuario) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    <h4>Cargando perfil...</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white">
                            <h3 className="mb-0 tTer">
                                <i className="bi bi-person-circle me-2 tPrin"></i>
                                Mi Perfil
                            </h3>
                        </div>
                        <div className="card-body perfil p-4">
                            {/* Mover el form solo cuando está en modo edición */}
                            {!modoEdicion ? (
                                <>
                                    {/* Información del usuario - SOLO LECTURA */}
                                    <h5 className="border-bottom pb-2 tTer">Información Personal</h5>
                                    <div className="mb-4">
                                        <div className="row">
                                        <div className="text-center col-lg-4 mb-4">
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
                                                className="fotoPerfil rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mb-2"
                                                >
                                                {usuario?.usuario?.nombre?.charAt(0).toUpperCase() ||
                                                    usuario?.nombre?.charAt(0).toUpperCase() ||
                                                    "?"}
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                        
                                            <div className="mb-3 col-lg-4 col-md-6">
                                                <label className="form-label fw-bold tTer">Nombre Completo</label>
                                                <p className="form-control-plaintext tTer">{usuario.nombre}</p>
                                            </div>

                                            <div className="mb-3 col-lg-4 col-md-6">
                                                <label className="form-label fw-bold tTer">Tipo de Usuario</label>
                                                <p className="form-control-plaintext">
                                                    <span className={`badge ${usuario.tipoUsuario === 'Admin' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                                                        {usuario.tipoUsuario}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-lg-6">
                                                <label className="form-label fw-bold tTer">Correo Electrónico</label>
                                                <p className="form-control-plaintext tTer">{usuario.correo}</p>
                                            </div>

                                            <div className="mb-3 col-lg-6">
                                                <label className="form-label fw-bold tTer">Fecha de Nacimiento</label>
                                                <p className="form-control-plaintext">
                                                    {usuario.fechaNacimiento 
                                                        ? new Date(usuario.fechaNacimiento).toLocaleDateString('es-CL')
                                                        : "No especificado"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botones modo lectura */}
                                    <div className="d-flex gap-2 justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={() => navigate("/")}
                                        >
                                            <i className="bi bi-arrow-left me-2 tTer"></i>
                                            Volver
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={() => setModoEdicion(true)}
                                        >
                                            <i className="bi bi-pencil me-2 tTer"></i>
                                            Editar Perfil
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <form onSubmit={handleActualizarDatos}>
                                    {/* Información del usuario - MODO EDICIÓN */}
                                    <div className="mb-4">
                                        <h5 className="border-bottom pb-2 tTer">Información Personal</h5>
                                        
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold tTer">Nombre Completo</label>
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    className="form-control"
                                                    value={form.nombre}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold tTer">Tipo de Usuario</label>
                                                <p className="form-control-plaintext">
                                                    <span className={`badge ${usuario.tipoUsuario === 'Admin' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                                                        {usuario.tipoUsuario}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-bold tTer">Correo Electrónico</label>
                                            <p className="form-control-plaintext tTer">{usuario.correo}</p>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-bold tTer">Fecha de Nacimiento</label>
                                            <input
                                                type="date"
                                                name="fechaNacimiento"
                                                className="form-control"
                                                value={form.fechaNacimiento}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <h5 className="border-bottom pb-2 tTer">Imagen de Perfil</h5>

                                        <div className="text-center mb-3">
                                            <img
                                                src={
                                                    preview
                                                        ? preview
                                                        : usuario.imagenPerfil
                                                            ? `http://localhost:8080${usuario.imagenPerfil}`
                                                            : "https://via.placeholder.com/150?text=Sin+Imagen"
                                                }
                                                alt="preview"
                                                className="rounded-circle"
                                                width="150"
                                                height="150"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={handleImageChange}
                                        />

                                        {imagenFile && (
                                            <button
                                                type="button"
                                                className="btn btn-dark mt-2"
                                                onClick={handleSubirImagen}
                                            >
                                                Subir Imagen
                                            </button>
                                        )}
                                    </div>


                                    {/* Cambiar contraseña */}
                                    <div className="mb-4">
                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="cambiarPassword"
                                                checked={cambiarPassword}
                                                onChange={(e) => setCambiarPassword(e.target.checked)}
                                            />
                                            <label className="form-check-label fw-bold tTer" htmlFor="cambiarPassword">
                                                Cambiar contraseña
                                            </label>
                                        </div>

                                        {cambiarPassword && (
                                            <>
                                                <h5 className="border-bottom pb-2 tTer">Cambiar Contraseña</h5>
                                                
                                                <div className="mb-3">
                                                    <label className="form-label tTer">Contraseña Actual</label>
                                                    <input
                                                        type="password"
                                                        name="passwordActual"
                                                        className="form-control"
                                                        value={form.passwordActual}
                                                        onChange={handleChange}
                                                        required={cambiarPassword}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label tTer">Contraseña Nueva</label>
                                                    <input
                                                        type="password"
                                                        name="passwordNueva"
                                                        className="form-control"
                                                        value={form.passwordNueva}
                                                        onChange={handleChange}
                                                        required={cambiarPassword}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label tTer">Repetir Contraseña Nueva</label>
                                                    <input
                                                        type="password"
                                                        name="passwordNueva2"
                                                        className="form-control"
                                                        value={form.passwordNueva2}
                                                        onChange={handleChange}
                                                        required={cambiarPassword}
                                                    />
                                                    <small className="text-muted tTer">
                                                        Mín. 8 caracteres, con mayúscula, minúscula, número y símbolo
                                                    </small>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Botones modo edición */}
                                    <div className="d-flex gap-2 justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleCancelar}
                                            disabled={loading}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-check-circle me-2"></i>
                                                    Guardar Cambios
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;