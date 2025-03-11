import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
        <Header/>
        <main>
            <Outlet />
        </main>
        <footer>Haris Sabanovic - 2025</footer>
    </>
  )
}

export default Layout