import { getFeaturedCars } from "@/actions/home";
import CarCard from "@/components/myComponents/car-card";
import HomeSearch from "@/components/myComponents/searchComp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems} from "@/lib/data";
import { SignedOut } from "@clerk/nextjs";
import { ArrowRight, Calendar, Car, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
   
   const featuredCars=await getFeaturedCars()

  return (
    <div className="pt-20 flex flex-col">
      {/* Hero  */}
      <section className="relative py-16  dottedBackground">
        <div className="max-w-4xl px-4 md:px-0 mx-auto  text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Find Your Dream Car With Intelli-Wheels
            </h1>
            <p className="text-xl  mb-8 max-w-2xl mx-auto  text-muted-foreground ">
             
              Advanced AI Car Search and test drives form thousands of vehicles.
            </p>
          </div>

          {/* search */}
          <HomeSearch />
        </div>
      </section>

{/* featured cars */}
      <section className="py-16 ">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className=" font-bold text-2xl md:text-3xl">Featured Cars</h2>
              <Link href={'/cars'}>
              <Button className="cursor-pointer flex items-center focus:opacity-70 transition duration-200">
                View All
                <ArrowRight size={20}/>
              </Button></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                featuredCars.map((car)=>{
                  return <CarCard key={car.id} car={car}/>
                })
              }
              </div>
          </div>
      </section>

      {/* Browse by make */}
      <section className="py-16  bg-muted/30">
          <div className="container mx-auto px-4 md:px-8 ">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Browse by Make</h2>
              <Link href={'/cars'}>
              <Button className="cursor-pointer flex items-center focus:opacity-70 transition duration-200">
                View All
                <ArrowRight size={20}/>
              </Button></Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {
                carMakes.map((make)=>{
                  return <Link key={make.id} href={`/cars?make=${make.name}`} className="text-center bg-[#16223c] rounded-lg shadow-md p-4  blocks transition duration-200">
                    <div className="h-16 w-auto mx-auto mb-3 relative">
                      <Image
                        src={make.image}
                        alt={make.name}
                        fill
                        className="object-contain "
                      />
                    </div>
                    <span className="text-center mt-2 ">{make.name}</span>
                  </Link>
                })
              }
              </div>
          </div>
      </section>


      {/* Why choose us */}
      <section className="py-16 ">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <h2 className=" font-bold text-2xl md:text-3xl">Why Choose Our Platform</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

           {/* 1st */}
              <div className="text-center  p-4  rounded-lg shadow-md">
                
                <div className="w-18 h-18 bg-[#16223c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car size={40} className="text-primary mx-auto "/>
                </div>
                <h3 className="text-lg font-bold mb-2 ">Wide Selection</h3>
                <p className="text-subhead">
                  Explore a vast range of vehicles from various makes and models.
                </p>
              </div>
              {/* 2nd */}
              <div className="text-center  p-4  rounded-lg shadow-md">
                <div className="w-18 h-18 bg-[#16223c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={40} className="text-primary mx-auto "/>
                </div>
                <h3 className="text-lg font-bold mb-2 ">AI-Powered Search</h3>
                <p className="text-subhead">
                  Our advanced AI technology helps you find the perfect car for your needs.
                </p>
                </div>

                {/* 3rd */}
                <div className="text-center  p-4  rounded-lg shadow-md">
                <div className="w-18 h-18 bg-[#16223c] rounded-full flex items-center justify-center mx-auto mb-4 ">
                  <Calendar size={40} className="text-primary mx-auto "/>
                </div>
                <h3 className="text-lg font-bold mb-2 ">Easy Test Drive</h3>
                <p className="text-subhead">
                  Schedule a test drive at your convenience and experience the car firsthand. 
                </p>
                </div>
            </div>  
          </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-16  bg-muted/30">
          <div className="container mx-auto px-4 md:px-8 ">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Browse by Body Type</h2>
              <Link href={'/cars'}>
              <Button className="cursor-pointer flex items-center focus:opacity-70 transition duration-200 ">
                View All
                <ArrowRight size={20}/>
              </Button></Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {
                bodyTypes.map((type)=>{
                  return <Link key={type.id} href={`/cars?bodyType=${type.name}`} className="text-center bg-[#16223c] rounded-lg shadow-md p-4  groupP transition duration-300 relative">
                    <div className="h-28 rounded-lg flex justify-end w-auto mx-auto mb-3 relative overflow-hidden">
                      <Image
                        src={type.image}
                        alt={type.name}
                        fill
                        className="object-contain groupC transition duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent rounded-lg flex items-end">
                  <h3 className="text-primary text-xl font-bold pl-4 pb-2 ">
                    {type.name}
                  </h3>
                </div>
                  </Link>
                })
              }
              </div>
          </div>
      </section>


      {/* Faq section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
              <h2 className=" font-bold text-2xl md:text-3xl">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible>
            {
              faqItems.map((item,index)=>{
                return(
                  <AccordionItem value={`item-${index}`} key={index}  >
                  <AccordionTrigger className={"cursor-pointer"}>{item.question}</AccordionTrigger>
                  <AccordionContent>
                   {item.answer}
                  </AccordionContent>
                </AccordionItem>
                )
              })
            }
</Accordion>
        </div>
        </section>

        {/* Last section */}
        <section className="py-16  bg-muted/30" >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
              <p className="text-xl font-medium max-w-2xl text-muted-foreground mx-auto">Join thousands of satisfied customers who found their perfect vehicle through our platform.</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href={'/cars'} className="w-full sm:w-fit">
                <Button className="cursor-pointer focus:opacity-70 transition duration-200 w-full ">
                  Start Your Search
                </Button>
              </Link>

              <SignedOut>
              <Link href={'/sign-up'} className="w-full sm:w-fit">
                <Button variant="outline" className="cursor-pointer focus:opacity-70 transition duration-200 w-full">
                  Sign Up Now
                </Button>
              </Link>
              </SignedOut>
            </div>


          </div>

          

        </section>



    </div>
  );
}
