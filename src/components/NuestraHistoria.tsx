import { useState } from "react"

export default function NuestraHistoria(){
    const [verMas, setVerMas] = useState(false)

    const fullTexto = ["Hace ya cinco décadas nació Pastelería 1000 Sabores, un pequeño taller familiar con un gran sueño: endulzar la vida de los chilenos con recetas llenas de tradición, cariño y creatividad. Desde sus inicios en 1975, la pastelería se ha convertido en un verdadero referente dentro del mundo de la repostería nacional, siendo reconocida por la calidad artesanal de sus productos y la innovación constante en sus preparaciones.",
        "A lo largo de los años, 1000 Sabores ha sido testigo de incontables celebraciones: cumpleaños, matrimonios, aniversarios y momentos inolvidables compartidos alrededor de una torta. Cada creación refleja el compromiso con la excelencia, el uso de ingredientes seleccionados y el amor por los detalles que caracteriza a nuestra marca.",
        "Uno de los hitos más recordados en nuestra historia ocurrió en 1995, cuando fuimos parte de un evento que marcó a todo Chile: la elaboración de la torta más grande del mundo, hazaña que quedó registrada en el Récord Guinness y que demostró no solo nuestra pasión por la repostería, sino también el espíritu colaborativo de todo nuestro equipo.",
        "Hoy, al celebrar nuestro 50 aniversario, seguimos manteniendo viva la misma esencia que nos vio nacer: combinar tradición y vanguardia para ofrecer experiencias dulces e inolvidables. En Pastelería 1000 Sabores, creemos que cada sabor cuenta una historia… y nos enorgullece ser parte de la tuya."
    ]
    const cutTexto = verMas ? fullTexto :fullTexto.slice(0,1);

    return (
            <div id="tComunidad" className="cuadroComunidad p-3 col-md-6 col-sm-12">
                <h3 className="tPrinTitle">Nuestra Historia</h3>
                <div className="cuadroContenido" >
                    {cutTexto.map((p,i) => (
                        <p key={i} className="tPrin">{p}</p>
                        
                    ))}
                    <img src="public/img/nosotrosImg/Historia.png" alt="Vista previa" width={350}/>
                </div>
                
                <button onClick={() => setVerMas(!verMas)} className="btn btn-dark m-3">
                    {verMas ? "Ver Menos ▲" : "Ver Más ▼"}
                </button>
                
            </div>
    );
}
