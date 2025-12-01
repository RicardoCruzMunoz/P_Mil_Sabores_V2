import { useEffect, useState, type FormEvent } from "react";
import { base_url_img } from "../../api/config";
import { api } from "../../api/client";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipoUsuario: string;
  fechaNacimiento?: string;
  imagenPerfil?: string;
}

export const AdminUsuarios = () => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // 🔥 EL MISMO ESTADO DEL REGISTRO
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    password2: "",
    fechaNacimiento: "",
    codigo: "",
    tipoUsuario: "Usuario",
  });

  // ───────────────────────────────
  // Cargar usuarios
  // ───────────────────────────────
  const cargarUsuarios = () => {
    fetch(`${base_url_img}/api/usuarios`)
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ───────────────────────────────
  // handleChange (Misma lógica Registro.tsx)
  // ───────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ───────────────────────────────
  // handleSubmit (Misma API del Registro.tsx)
  // ───────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await api.post("/usuarios", {
        nombre: form.nombre,
        correo: form.correo,
        password: form.password,
        fechaNacimiento: form.fechaNacimiento,
        codigo: form.codigo,
        tipoUsuario: form.tipoUsuario,
      });

      alert("Usuario creado con éxito");
      setMostrarFormulario(false);
      cargarUsuarios();

      // limpiar formulario
      setForm({
        nombre: "",
        correo: "",
        password: "",
        password2: "",
        fechaNacimiento: "",
        codigo: "",
        tipoUsuario: "Usuario",
      });

    } catch (error) {
      console.error(error);
      alert("Error al crear el usuario");
    }
  };

  // ───────────────────────────────
  // Render
  // ───────────────────────────────
  return (
    <div className="fade-in px-4">
      <div className="row align-items-center mb-4">
        <div className="col-md-10">
          <h2 className="tTer mb-2">
            <i className="bi bi-people-fill me-2"></i>
            Gestión de Usuarios
          </h2>
        </div>
        <div className="col-md-2">
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

      {/* FORMULARIO */}
      {mostrarFormulario && (
        <div className="card bg-light border-secondary p-4 mb-4">
          <h4 className="tTer mb-3">Agregar Nuevo Usuario</h4>

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
              />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
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
                  required
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
              >
                <option value="Usuario">Usuario</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>

              <button type="submit" className="btn btn-primary">
                Guardar Usuario
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TABLA */}
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
                    usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td className="ps-4 fw-bold text-secondary">#{usuario.id}</td>

                        <td>
                          <div className="d-flex align-items-center">
                            {usuario.imagenPerfil ? (
                              <img
                                className="rounded-circle me-3"
                                src={`${base_url_img}${usuario.imagenPerfil}`}
                                alt=""
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
                          <span
                            className={`badge ${
                              usuario.tipoUsuario === "Admin"
                                ? "bg-primary"
                                : "bg-info text-dark"
                            }`}
                          >
                            {usuario.tipoUsuario}
                          </span>
                        </td>

                        <td className="text-end pe-4">
                          <button className="btn btn-outline-secondary btn-sm me-2">
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            disabled={usuario.id === 1 || usuario.id === usuarioActual?.id}
                            className="btn btn-outline-danger btn-sm"
                            >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
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
