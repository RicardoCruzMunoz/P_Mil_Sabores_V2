import { useState } from 'react';
import { equipo } from '../data/equipo';

export default function NuestroEquipo() {
    // 2. Crea el estado 'verMas', igual que en NuestraHistoria
    const [verMas, setVerMas] = useState(false);

    const equipoAMostrar = verMas ? equipo : equipo.slice(0, 1);

    return (
        <div className="cuadroComunidad p-3 col-md-6 col-sm-12 d-flex flex-column">
            <h3 className="tPrin">Nuestro Equipo</h3>
            <div className="cuadroContenido flex-grow-1">

                {equipoAMostrar.map((miembro) => (
                    <div className="tPrin" key={miembro.id}>
                        <h4 className="TPrin">
                            <strong>{miembro.nombre}</strong>
                        </h4>
                        <h5 className="TPrin" >{miembro.rol}</h5>
                        <p className="TPrin">{miembro.descripcion}</p>
                    </div>
                ))}
                <img src="src/assets/img/nosotrosImg/Equipo.png" alt="Vista previa" width={350}/>
            </div>
            <button
                    onClick={() => setVerMas(!verMas)}
                    className="btn btn-dark m-3"
                >
                    {verMas ? "Ver Menos ▲" : "Ver Más ▼"}
                </button>
        </div>
    );
}
