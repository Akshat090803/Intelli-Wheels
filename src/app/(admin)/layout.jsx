import { getAdmin } from "@/actions/admin";
import Header from "@/components/myComponents/header";
import NotFoundAdmin from "@/components/myComponents/notFoundAdmin";
import SideBar from "./admin/_components/sideBar";




export default async function AdminLayout({children}){
  const admin=await getAdmin()

  if(!admin.authorized){
    return <NotFoundAdmin/>
  }

  return(
    <div className="container mx-auto mb-20 mt-24   ">
   
     <Header isAdminPage={true}   />
     <div className="flex flex-col w-56 h-full">
      <SideBar/>
     </div>
     <main className="md:ml-56  h-full ">{children}</main>
    
    
    </div>
  )

}