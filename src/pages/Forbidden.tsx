import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Forbidden() {
    const navigate = useNavigate();
    const [contador, setContador] = useState(3);

    useEffect(() => {
        // Si el contador llega a 0, redirigir
        if (contador === 0) {
            navigate("/");
            return;
        }

        // Decrementar el contador cada segundo
        const timer = setInterval(() => {
            setContador((prev) => prev - 1);
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(timer);
    }, [contador, navigate]);

    return (
        <>
            <div className="container text-center mt-5">
                <div className="cuadroNoAdmin p-5 mx-auto">
                    <div className="circulo text-center mx-auto mb-4">
                        <img className="access-denied p-4" src="../public/access-denied.png" alt="imagen_access-denied" />
                    </div>
                    <h2 className="tTer">Acceso NO autorizado</h2>
                    <p className="tTer">No tienes los permisos necesarios para acceder a esta página.</p>
                    <p className="tTer mt-3">
                        Serás redirigido a la página principal en <strong className="tTer fs-4">{contador}</strong> segundo{contador !== 1 ? 's' : ''}...
                    </p>
                </div>
            </div>
        </>
    );
}

export default Forbidden;