"use client";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Cars",
    icon: Car,
    href: "/admin/cars",
  },
  {
    label: "Test Drives",
    icon: Calendar,
    href: "/admin/test-drives",
  },
  {
    label: "Settings",
    icon: Cog,
    href: "/admin/settings",
  },
];
import { cn } from "@/lib/utils";
import { Car, Calendar, Cog, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default  function SideBar(){

  const pathname = usePathname();
  const isActive = (route) => pathname === route.href;

  return (
    <>
    {/* for laptop view */}
    <div className="hidden md:flex flex-col h-full shadow-2xl border-r border-t bg-background  md:z-50 pt-8 fixed inset-y-0 left-0 top-16 w-56">
      {
        routes.map((route)=>(
          <Link href={route.href} key={route.label} className={cn("flex items-center pl-8 gap-x-2 text-sm font-medium h-12 transition-all duration-200  text-subhead  ",isActive(route) ?"bg-white text-gray-900":"hover:bg-[#16223c]  hover:text-foreground")}>
            <route.icon className="h-5 w-5"/>
            <span>{route.label}</span>
          </Link>
        ))
      }
         
    </div>


    {/* for mobile view */}
    <div className="md:hidden flex items-center justify-around bg-background  h-16 z-50 fixed bottom-0 left-0 right-0 border-t">
    {
        routes.map((route)=>(
          <Link href={route.href} key={route.label} className={cn("flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 text-subhead hover:text-foreground   py-1",isActive(route) && "text-foreground font-semibold")}>
            <route.icon className="h-5 w-5"/>
            <span>{route.label}</span>
          </Link>
        ))
      }
    </div>
    
    </>
  )

}