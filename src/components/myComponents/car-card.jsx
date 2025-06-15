
"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import { Heart, Car as CarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { toggleSavedCar } from "@/actions/car-listing";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch-hook";


export const CarCard = ({ car }) => {
  const { isSignedIn} = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(car.wishlisted);
 


  // Use the useFetch hook
  const {
    loading: isToggling,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);





  // Handle toggle result with useEffect
  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isSaved) {
      setIsSaved(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isSaved]);

  // Handle errors with useEffect
  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);

  // Handle save/unsave car
  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (isToggling) return;

    // Call the toggleSavedCar function using our useFetch hook
    await toggleSavedCarFn(car.id);
  };

  return (
    <>
      <Card className="overflow-hidden  transition shadow-lg groupP duration-300 bg-backgorund cursor-pointer p-0  ">
        <div className="relative w-full h-48 ">
          {car.images && car.images.length > 0 ? (
            <div className="relative w-full min-h-full bg-[#16223c]">
              <Image
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover groupC transition duration-300"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center groupC">
              <CarIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}

          <Button
          onClick={handleToggleSave}
          disabled={isToggling}
            
            size="icon"
            // bg-[#ffe4e6]
            className={`absolute top-2 right-2  bg-[#C6E7FF] rounded-full p-1.5 ${
              isSaved
                ? "text-red-500 "
                : "text-black "
            } cursor-pointer transition duration-300 active:scale-90 `}
          >
              {isToggling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
           <Heart className={isSaved ? "fill-red-500" : "fill-white"} size={20} />
          )}
            
          </Button>
        </div>

        <CardContent className="p-4 ">
          <div className="flex flex-col mb-2">
            <h3 className="font-bold text-xl line-clamp-1">{`${car.make} ${car.model}`}</h3>
            <span className="font-semibold text-price">{`$${car.price.toLocaleString()}`}</span>
          </div>

          <div className="text-subhead mb-2 flex items-center">
            <span>{car.year}</span>
            <span className="mx-2">•</span>
            <span>{car.transmission}</span>
            <span className="mx-2">•</span>
            <span>{car.fuelType}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
          <Badge variant="outline" className="bg-badge-bg rounded-sm">
            {car.bodyType}
          </Badge>
          <Badge variant="outline" className="bg-badge-bg rounded-sm">
            {car.mileage.toLocaleString()} miles
          </Badge>
          <Badge variant="outline" className="bg-badge-bg rounded-sm">
            {car.color}
          </Badge>
        </div>

        <div>
          <Button onClick={() => router.push(`/cars/${car.id}`)} className="w-full cursor-pointer transition duration-200 focus:opacity-70">
            View Details
          </Button>
        </div>

        </CardContent>
      </Card>
    </>
  );
}

export default CarCard
