import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { NavBar } from "../components/NavBar"

export const Layout = () => {
  return (
    <>
        <NavBar />
        <main style={{ minHeight: "70vh" }}>
            <Outlet />
        </main>
        <Footer />
    </>
  )
}
