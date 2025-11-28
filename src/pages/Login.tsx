import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        correo: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await api.post("/usuarios/login", form);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        
        // Disparar evento para actualizar BtnPerfil
        window.dispatchEvent(new Event('usuarioActualizado'));
        
        alert("Login exitoso");
        navigate("/");
        window.location.reload(); // Recargar para actualizar todo
    } catch (error) {
        console.error(error);
        alert("Credenciales Incorrectas");
    }
}

    return (
        <form onSubmit={handleSubmit} id="formLogin" noValidate className="my-2 mx-5">
            <div id="cajaAcceso" className="contenido m-5 p-4">
                <h2 className="tPrin">Iniciar Sesión</h2>
                <div className="row mx-4">
                    <div className="col-12 my-4">
                        <label className="form-label tPrin" htmlFor="correo"><h5>Correo</h5></label>
                        <input name="correo" type="email" id="correoLogin" className="form-control" required onChange={handleChange} value={form.correo} />
                        <div className="invalid-feedback"><h6 className="tPrin">Debe ser un correo válido @duoc.cl</h6></div>
                    </div>
                    <div className="col-12 my-4">
                        <label className="form-label tPrin" htmlFor="password"><h5>Contraseña</h5></label>
                        <input name="password" type="password" id="passwordLogin" className="form-control" required onChange={handleChange} value={form.password} />
                        <div className="container d-flex justify-content-center">
                            <h6 className="tPrin mt-1">¿Olvidó su contraseña? Pulse <a href="#">aquí</a></h6>
                        </div> 
                    </div>
                    <div id="loginAlert" className="alert d-none mt-3"></div>
                    <div className="container d-flex justify-content-center mt-2">
                        <button type="submit" className="btnAcc btn btn-dark">Ingresar</button>
                    </div>
                    <div className="container d-flex justify-content-center mt-2">
                        <h6 className="tPrin">¿No tiene cuenta? <Link to="/registro">Regístrese</Link></h6>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;