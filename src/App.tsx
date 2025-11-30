import { Route, Routes } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { Index } from "./pages/Index"
import { Catalogo } from "./pages/Catalogo"
import { Contacto } from "./pages/Contacto"
import { Comunidad } from "./pages/Comunidad"
import { Nosotros } from "./pages/Nosotros"
import Login from "./pages/Login"
import { DetalleProd } from "./pages/DetalleProd"
import Registro from "./pages/Registro"
import { Carrito } from "./pages/Carrito"
import Forbidden from "./pages/Forbidden"
import AdminRoute from "./components/AdminRoute"
import Admin from "./pages/Admin"
import Perfil from "./pages/Perfil"
import GuestRoute from "./components/GuestRoute"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/403" element={<Forbidden />} />

        <Route 
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route 
          path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/registro" element={
            <GuestRoute>
              <Registro />
            </GuestRoute>
          }
        />

        <Route path="/" element={<Index />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/detalleproducto/:upc" element={<DetalleProd />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>
    </Routes>
  )
}

export default App
