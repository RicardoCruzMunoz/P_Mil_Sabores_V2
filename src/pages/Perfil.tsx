import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

const getProfileImageUrl = (user: any, previewUrl: string | null): string => {
    if (previewUrl) return previewUrl;

    const profilePath = user?.imagenPerfil || user?.usuario?.imagenPerfil;
    
    if (profilePath) {
        return `http://localhost:8080/img/usuarios/${profilePath}`;
    }

    return "https://via.placeholder.com/150?text=Sin+Imagen";
};


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
        
        let formattedDate = usuarioFinal.fechaNacimiento;
        if (usuarioFinal.fechaNacimiento && usuarioFinal.fechaNacimiento.includes('T')) {
            formattedDate = usuarioFinal.fechaNacimiento.split('T')[0];
        }

        setForm({
            nombre: usuarioFinal.nombre || "",
            correo: usuarioFinal.correo || "",
            fechaNacimiento: formattedDate || "", 
            codigo: usuarioFinal.codigo || "",
            passwordActual: "",
            passwordNueva: "",
            passwordNueva2: ""
        });
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagenFile(file);
            setPreview(URL.createObjectURL(file)); 
        }
    };
    
    const actualizarFotoPerfil = async (idUsuario: number, archivo: File) => {
        const formData = new FormData();
        formData.append('imagen', archivo);

        try {
            const response = await api.put(
                `/usuarios/${idUsuario}/imagenPerfil`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return response.data;
        } catch (error) {
            throw new Error("Error al subir la imagen. El perfil de texto fue guardado."); 
        }
    };

    const handleActualizarDatos = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!usuario?.id) {
            alert("Error: No se pudo identificar el usuario");
            return;
        }

        setLoading(true);
        let usuarioFinalActualizado = usuario;

        try {
            if (cambiarPassword) {
                if (!form.passwordActual || form.passwordNueva !== form.passwordNueva2 || form.passwordNueva.length < 8) {
                    alert("Verifica las contraseñas.");
                    setLoading(false);
                    return;
                }
                try {
                    await api.post("/usuarios/login", { correo: usuario.correo, password: form.passwordActual });
                } catch (error) {
                    alert("La contraseña actual es incorrecta");
                    setLoading(false);
                    return;
                }
            }

            const datosActualizados: any = {
                nombre: form.nombre,
                correo: usuario.correo, 
                fechaNacimiento: form.fechaNacimiento,
                codigo: form.codigo,
                tipoUsuario: usuario.tipoUsuario
            };
            if (cambiarPassword) {
                datosActualizados.password = form.passwordNueva;
            }

            const response = await api.put(`/usuarios/${usuario.id}`, datosActualizados);
            usuarioFinalActualizado = response.data;

            if (imagenFile) {
                const usuarioConFotoActualizada = await actualizarFotoPerfil(
                    usuarioFinalActualizado.id, 
                    imagenFile
                );
                usuarioFinalActualizado = usuarioConFotoActualizada;
            }

            const token = localStorage.getItem("token");
            localStorage.setItem("usuario", JSON.stringify({ 
                usuario: usuarioFinalActualizado,
                token: token 
            }));
            
            window.dispatchEvent(new Event('usuarioActualizado'));
            
            alert("Perfil y/o imagen actualizado(s) exitosamente.");
            setModoEdicion(false);
            setCambiarPassword(false);
            
            setUsuario(usuarioFinalActualizado);
            setForm({
                nombre: usuarioFinalActualizado.nombre,
                correo: usuarioFinalActualizado.correo,
                fechaNacimiento: usuarioFinalActualizado.fechaNacimiento,
                codigo: usuarioFinalActualizado.codigo,
                passwordActual: "",
                passwordNueva: "",
                passwordNueva2: ""
            });
            setPreview(null);
            setImagenFile(null);


        } catch (error: any) {
            let mensajeError = "Error al actualizar el perfil: ";
            if (error.response?.data) {
                mensajeError += typeof error.response.data === 'string' ? error.response.data : 'Error de validación o conexión.';
            } else if (error.message.includes("Error al subir la imagen")) {
                 mensajeError = error.message; 
            }
            
            alert(mensajeError);
            
        } finally {
            setLoading(false);
        }
    };

    const handleCancelar = () => {
        setModoEdicion(false);
        setCambiarPassword(false);
        setPreview(null);
        setImagenFile(null);

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
                            {!modoEdicion ? (
                                <>
                                    <h5 className="border-bottom pb-2 tTer">Información Personal</h5>
                                    <div className="mb-4">
                                        <div className="row">
                                            
                                            <div className="text-center col-lg-4 mb-4">
                                                <div className="d-flex justify-content-center">
                                                <img
                                                    src={getProfileImageUrl(usuario, null)}
                                                    alt="Foto de perfil"
                                                    className="fotoBtnPerfil mb-2 rounded-circle"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                </div>
                                            </div>
                                        
                                            {/* Columna de Datos de Perfil (Ocupa 8/12) */}
                                            <div className="col-lg-8">
                                                <div className="row">
                                                    
                                                    <div className="mb-3 col-lg-6 col-md-6">
                                                        <label className="form-label fw-bold tTer">Nombre Completo</label>
                                                        <p className="form-control-plaintext tTer">{usuario.nombre}</p>
                                                    </div>

                                                    <div className="mb-3 col-lg-6 col-md-6">
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
                                        </div>
                                    </div>

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
                                    <div className="mb-4">
                                        <h5 className="border-bottom pb-2 tTer">Información Personal</h5>
                                        
                                        <div className="row">
                                            <div className="col-md-4 text-center mb-4">
                                                <label className="form-label fw-bold tTer">Foto de Perfil</label>
                                                <div className="d-flex justify-content-center mb-2">
                                                    <img
                                                        src={getProfileImageUrl(usuario, preview)}
                                                        alt="preview"
                                                        className="rounded-circle border border-dark p-1"
                                                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="form-control form-control-sm"
                                                    onChange={handleImageChange}
                                                    aria-label="Seleccionar nueva foto de perfil"
                                                />
                                            </div>
                                            
                                            <div className="col-md-8">
                                                <div className="mb-3">
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
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold tTer">Tipo de Usuario</label>
                                                    <p className="form-control-plaintext">
                                                        <span className={`badge ${usuario.tipoUsuario === 'Admin' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                                                            {usuario.tipoUsuario}
                                                        </span>
                                                    </p>
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
                                        </div>
                                    </div>
                                    
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

                                    <div className="d-flex gap-2 justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={handleCancelar}
                                            disabled={loading}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-dark"
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