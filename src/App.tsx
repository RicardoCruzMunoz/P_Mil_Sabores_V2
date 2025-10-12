import { Route, Routes } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { Index } from "./pages/Index"
import { Catalogo } from "./pages/Catalogo"
import { Contacto } from "./pages/Contacto"
import { Comunidad } from "./pages/Comunidad"
import { Nosotros } from "./pages/Nosotros"
import { Login } from "./pages/Login"
import { DetalleProd } from "./pages/DetalleProd"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detalleproducto/:id" element={<DetalleProd />} />
      </Route>
    </Routes>
  )
}

export default App
