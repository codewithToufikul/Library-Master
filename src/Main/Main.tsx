import Footer from "@/components/ui/footer"
import Navbar from "@/components/ui/navbar"
import { Outlet } from "react-router"


const Main = () => {
  return (
    <div>
        <Navbar/>
        <div className=" max-w-[1200px] min-h-screen mx-auto">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Main