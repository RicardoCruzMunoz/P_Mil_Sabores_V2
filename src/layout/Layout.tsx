import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { NavBar } from "../components/NavBar"

export const Layout = () => {
  return (
    <>
        <NavBar />
        <main className="main-layout">
            <Outlet />
        </main>
        <Footer />
    </>
  )
}
