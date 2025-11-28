import { useEffect, useState } from "react";
import type { Usuario } from "../interfaces/Usuario";
import { getUsuario } from "../api/usuarios";

export const ListaDeUsuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        getUsuario().then(setUsuarios).catch(console.error);
    },[]);

    return (
        <>
            {usuarios.map(u => (
                <div key={u.id} className="usuario-card">
                    <div className="column">
                        <strong>Nombre:</strong> {u.nombre}
                    </div>
                    <div className="column">
                        <strong>Correo:</strong> {u.correo}
                    </div>
                    <div className="column">
                        <strong>Password: </strong> {u.password}
                    </div>
                    <div className="column">
                        <strong>Fecha de Nacimiento:</strong> {" "}
                        {new Date(u.fechaNacimiento).toLocaleDateString()}
                    </div>
                    <div className="column">
                        <strong>Código:</strong> {u.codigo ? u.codigo : "N/A"}
                    </div>
                    <div className="column">
                        <strong>Tipo de Usuario:</strong> {u.tipoUsuario}
                    </div>
                </div>
            ))}
        </>
    );
};