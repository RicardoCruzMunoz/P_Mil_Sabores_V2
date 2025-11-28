import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { api } from "../api/client";

function Registro() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        password: "",
        password2: "",
        fechaNacimiento: "",
        codigo: "",
        tipoUsuario: "Usuario"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
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
                tipoUsuario: "Usuario"
            });
            alert("Usuario registrado con éxito");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Error al registrar el usuario");
        }
    }

    return (
        <>
            <div className="contenedorRegistro">
                <div id="cajaAcceso" className="contenido m-5 p-4">
                    <h2 className="tPrin">Registro</h2>
                    <div className="mx-3">
                        <div className="card-body p-4">
                            <div id="regAlert" className="alert d-none" role="alert"></div>
                            <form onSubmit={handleSubmit} id="formRegistro" noValidate>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="nombre"><h5 className="tPrin">Nombre completo</h5></label>
                                    <input name="nombre" id="nombre" className="form-control" type="text" placeholder="Ejemplo: Nicolas Perez" required onChange={handleChange} value={form.nombre} />
                                    <div className="invalid-feedback"><h6 className="tPrin">Sólo letras y espacios, máximo 80 caracteres.</h6></div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="correo"><h5 className="tPrin">Correo</h5></label>
                                    <input name="correo" id="correo" className="form-control" type="email" placeholder="usuario@duoc.cl" required onChange={handleChange} value={form.correo} />
                                    <div className="invalid-feedback"><h6 className="tPrin">Debe ser un correo válido y no estar registrado.</h6></div>
                                    <div className="form-text"><h6 className="tPrin">Si usas @duoc.cl recibirás una torta gratis en tu cumpleaños 🎂</h6></div>
                                </div>
                                <div className="row g-3">
                                    <div className="col-md-6 col-sm-12">
                                        <label className="form-label" htmlFor="password"><h5 className="tPrin">Contraseña</h5></label>
                                        <input name="password" id="password" className="form-control" type="password" required onChange={handleChange} value={form.password} />
                                        <div className="invalid-feedback"><h6 className="tPrin">La contraseña no cumple los requisitos.</h6></div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <label className="form-label" htmlFor="password2"><h5 className="tPrin">Repetir contraseña</h5></label>
                                        <input name="password2" id="password2" className="form-control" type="password" required onChange={handleChange} value={form.password2} />
                                        <div className="invalid-feedback"><h6 className="tPrin">Las contraseñas no coinciden.</h6></div>
                                    </div>
                                    <div className="form-text"><h6 className="tPrin">Mín. 8, con mayúscula, minúscula, número y símbolo.</h6></div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-6 col-sm-12">
                                        <label htmlFor="fechaNacimiento" className="form-label"><h5 className="tPrin">Fecha nacimiento</h5></label>
                                        <input name="fechaNacimiento" type="date" id="fechaNacimiento" className="form-control" required onChange={handleChange} value={form.fechaNacimiento} />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <label className="form-label" htmlFor="codigo"><h5 className="tPrin">Código (opcional)</h5></label>
                                        <input name="codigo" id="codigo" className="form-control" type="text" placeholder="Ingrese código" onChange={handleChange} value={form.codigo} />
                                        <div className="invalid-feedback"><h6 className="tPrin">Código no valido</h6></div>
                                    </div>
                                </div>
                                <div className="container d-flex justify-content-center gap-2 mt-4">
                                    <Link id="btnLogin" to="/login" className="btnAcc btn btn-dark">Ir al login</Link>
                                    <button type="submit" className="btnAcc btn btn-dark">Crear cuenta</button>
                                </div>
                            </form>
                        </div>        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registro;