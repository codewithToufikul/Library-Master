import Navbar from "@/components/ui/navbar"
import { Outlet } from "react-router"


const Main = () => {
  return (
    <div>
        <Navbar/>
        <div className=" max-w-[1200px] mx-auto">
            <Outlet/>
        </div>
    </div>
  )
}

export default Main