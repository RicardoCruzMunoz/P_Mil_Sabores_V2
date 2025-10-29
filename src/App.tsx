// src/App.tsx

import { Route, Routes } from "react-router-dom";
import {Layout }from "./layout/Layout";
import {Index} from "./pages/Index";
import {Catalogo} from "./pages/Catalogo";
import {Contacto} from "./pages/Contacto";
import {Comunidad} from "./pages/Comunidad";
import {Nosotros} from "./pages/Nosotros";
import {Login} from "./pages/Login";
import {DetalleProd} from "./pages/DetalleProd";
import {Registro} from "./pages/Registro";
import Carrito from "./pages/Carrito"; // 💡 Importa el componente Carrito
import { CarProvider } from "./context/CarContext"; // 💡 Importa el CarProvider

function App() {
  return (
    // 💡 Envuelve las rutas con el CarProvider
    <CarProvider> 
      <Routes>
        {/* Usando Layout como ruta padre */}
        <Route element={<Layout />}>
          
          <Route index element={<Index />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="comunidad" element={<Comunidad />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />

          {/* Rutas del Carrito */}
          <Route path="detalleproducto/:id" element={<DetalleProd />} />
          <Route path="carrito" element={<Carrito />} /> 

        </Route>
      </Routes>
    </CarProvider>
  );
}

export default App;