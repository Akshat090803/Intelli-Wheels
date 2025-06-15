import AddCarForm from "../_component/addCarForm"


export const metadata={
  title: "Add New Car | Intelli-Wheels Admin",
  description: "Create a new car in your marketplace",
  keywords: "admin, cars, create, add car, marketplace",
 
}
export default function AddCarPage(){
  return (
    <>
     <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
          
          <AddCarForm/>
        </div>
    </>
  )
}