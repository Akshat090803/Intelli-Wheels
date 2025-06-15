"use client";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Loader2, Sparkles, UploadIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch-hook";
import { addCar, processImageWithAi } from "@/actions/cars";
import { useRouter } from "next/navigation";




// Predefined options
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
const transmissions = ["Automatic", "Manual", "Semi-Automatic"];
const bodyTypes = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Convertible",
  "Coupe",
  "Wagon",
  "Pickup",
];
const carStatuses = ["AVAILABLE", "UNAVAILABLE", "SOLD"];


// Define form schema with Zod
const carFormSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().refine((val) => {
    const year = parseInt(val);
    return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1;
  }, "Valid year required"),
  price: z.string().min(1, "Price is required"),
  mileage: z.string().min(1, "Mileage is required"),
  color: z.string().min(1, "Color is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  bodyType: z.string().min(1, "Body type is required"),
  seats: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["AVAILABLE", "UNAVAILABLE", "SOLD"]),
  featured: z.boolean().default(false),
  // Images are handled separately
});

//!we will ocnvert price mileage ,year in Int and Float later in formSubmit func

export default function AddCarForm(){
   
  const router=useRouter()
  const [activeTab,setActiveTab]=useState("ai")
  const [uploadedImages,setUploadedImages]=useState([])
  const [imageError,setImageError]=useState("")

  // !For Ai upload tab
  const [aiImagePreview,setAiImagePreview]=useState(null)
  const [aiImageError,setAiImageError]=useState("")
  const [aiUplaodedImage,setAiUploadedImage]=useState(false)

   // Initialize form with react-hook-form and zod
   const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      price: "",
      mileage: "",
      color: "",
      fuelType: "",
      transmission: "",
      bodyType: "",
      seats: "",
      description: "",
      status: "AVAILABLE",
      featured: false,
    },
  });



  
   //!this will handle drop fle
   const onMultiImagesDrop = (acceptedFiles) => {
     
         const validFiles =acceptedFiles.filter((file)=>{
            if(file.size > 5 * 1024 * 1024){
              toast.error(`${file.name} exceeds 5MB size limit and will be skipped.`)
              return false;
            }
            return true
         })

         

         if(validFiles.length === 0){
          toast.error("No valid files to upload")
          return
         }
         
         //reading the files
        const newImages = [];

        validFiles.forEach((file) => {
          const reader = new FileReader(); // Create a new FileReader for each file
        
          reader.onload = (e) => {
            newImages.push(e.target.result);
        
            if (newImages.length === validFiles.length) {
              setUploadedImages((prev) => [...prev, ...newImages]);
              setImageError("");
              toast.success(`Successfully uploaded ${validFiles.length} images`);
             
            }
          };
        
          reader.onerror = (error) => {
            setImageError("Error reading one or more files."); // Update error state
          };
        
          // Call reader to read the file
          reader.readAsDataURL(file);
        });
  };

  

  const {
    getRootProps:getMultiImagesRootProp,
    getInputProps:getMultiImagesInputProp,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop:onMultiImagesDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg",".webp"] },
    multiple: true,
  });





  // ! uploadImage remove fn
  function handleRemoveImage(index) {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    toast.success("Image removed successfully");
  }
 
  // !UseFetch Custom hook for manual upload
  const {data:addCarResult,
    loading:addCarLoading,
    fn:addCarFn
  } = useFetch(addCar)


    //!OnSubmit fn
    async function onSubmit(data) {
      if(uploadedImages.length === 0){
        setImageError("Please upload at least one image")
        return
      }
     
      const carData={
        ...data,
        price:parseFloat(data.price),
        year:parseInt(data.year),
        mileage:parseInt(data.mileage),
        seats:data.seats ? parseInt(data.seats) : null,
      }
  
      await addCarFn({carData,images:uploadedImages})
    }


    useEffect(()=>{
      if(addCarResult?.success){
              toast.success("Car added successfully")
            
              router.push("/admin/cars")
              

      }
  },[addCarResult,addCarLoading])



  // !For Ai Uplaod TAb
  //!this will handle drop fle
  const onAiImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; //get the file
    if(file){
          //check size of file
      if(file.size > 5*1024*1024){
        toast.error("Image size must be less than 5MB");
        return;
      }


      setAiUploadedImage(file);
//use FileReader to read the file
      const reader=new FileReader()

      //after completing the reading
      reader.onload=(e)=>{
        setAiImagePreview(e.target.result);
    
        toast.success("Image uploaded successfully");
      }

      //if error reading the file
      reader.onerror=()=>{
        
        toast.error("Failed to read the image")
      }

      //call reader to read the file
      reader.readAsDataURL(file)
    }
  };

const {
getRootProps:getAiImagesRootProp,
getInputProps:getAiImagesInputProp,
isDragActive:isAiDragActive,
isDragReject:isAiDragReject,
isDragAccept:isAiDragAccept,
} = useDropzone({
onDrop:onAiImageDrop,
accept: { "image/*": [".png", ".jpg", ".jpeg",".webp"] },
maxFiles:1,
multiple: false,
});


//! Ai Image Upload 
const {data:aiCarResult,
  loading:aiCarLoading,
  fn:aiCarFn,
  error:aiCarError
} = useFetch(processImageWithAi)


async function aiCarProccess(){
      if(!aiUplaodedImage){
        toast.error("Please upload an image")
        return
      }

      setUploadedImages([])
      await aiCarFn(aiUplaodedImage)
}

useEffect(() => {
  if (aiCarError) {
    toast.error(aiCarError.message || "Failed to upload car");
  }
}, [aiCarError]);


useEffect(()=>{

 if(aiCarResult?.success){
  const carDetails=aiCarResult.data

  setValue("make", carDetails.make);
  setValue("model", carDetails.model);
  setValue("year", carDetails.year.toString());
  setValue("color", carDetails.color);
  setValue("bodyType", carDetails.bodyType);
  setValue("fuelType", carDetails.fuelType);
  setValue("price", carDetails.price);
  setValue("mileage", carDetails.mileage);
  setValue("transmission", carDetails.transmission);
  setValue("description", carDetails.description);

   // Add the image to the uploaded images
  //  const reader = new FileReader();
  //  reader.onload = (e) => {
     setUploadedImages((prev) => [...prev, aiImagePreview]);
  //  };
  //  reader.readAsDataURL(aiUplaodedImage);

   toast.success("Successfully extracted car details", {
     description: `Detected ${carDetails.year} ${carDetails.make} ${
       carDetails.model
     } with ${Math.round(carDetails.confidence * 100)}% confidence`,
   });

   // Switch to manual tab for the user to review and fill in missing details
   setActiveTab("manual");
 }

},[aiCarResult,setValue])




    

  return (
    <>
       <div>
       <Tabs defaultValue="ai" className="mt-6 "  value={activeTab}
        onValueChange={setActiveTab}>
  <TabsList className="grid grid-cols-2 w-full bg-footer  cursor-pointer">
    <TabsTrigger className="cursor-pointer " value="manual">Manual Entry</TabsTrigger>
    <TabsTrigger className="cursor-pointer " value="ai">AI Upload</TabsTrigger>
  </TabsList>

  <TabsContent value="manual" className="mt-6 ">
  <Card className="bg-background shadow-2xl">
  <CardHeader>
    <CardTitle>Car Details</CardTitle>
    <CardDescription>Enter the details of the car you want to add</CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Make */}
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Input placeholder="e.g. Toyota"
          id="make"
          {...register("make")}
          className={`${errors.make ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 `}/>

          {
            errors.make && (
              <p className="text-xs text-red-500 ">{errors.make.message}</p>
            )
          }
        </div>
        {/* Model */}
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input placeholder="e.g. Camry"
          id="model"
          {...register("model")}
          className={`${errors.model ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 `}/>

          {
            errors.model && (
              <p className="text-xs text-red-500 ">{errors.model.message}</p>
            )
          }
        </div>
        {/* Year */}
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input placeholder="e.g. 2004"
          id="year"
          {...register("year")}
          className={`${errors.year ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 `}/>

          {
            errors.year && (
              <p className="text-xs text-red-500 ">{errors.year.message}</p>
            )
          }
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price">Price{" "}
          <span className="text-subhead">($)</span>
          </Label>
          <Input placeholder="e.g. 25000"
          id="price"
          {...register("price")}
          className={`${errors.price ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 `}/>

          {
            errors.price && (
              <p className="text-xs text-red-500 ">{errors.price.message}</p>
            )
          }
        </div>

        {/* Mileage */}
        <div className="space-y-2">
          <Label htmlFor="mileage">Mileage</Label>
          <Input placeholder="e.g. 15"
          id="mileage"
          {...register("mileage")}
          className={`${errors.mileage ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 `}/>

          {
            errors.mileage && (
              <p className="text-xs text-red-500 ">{errors.mileage.message}</p>
            )
          }
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input placeholder="e.g. White"
          id="color"
          {...register("color")}
          className={`${errors.color ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 `}/>

          {
            errors.color && (
              <p className="text-xs text-red-500 ">{errors.color.message}</p>
            )
          }
        </div>

        {/* Fuel Type */}
        <div className="space-y-2 ">
          <Label htmlFor="fuel">Fuel Type</Label>
          <Select id="fuel" onValueChange={(value) => setValue("fuelType", value)} defaultValue={getValues("fuelType")}>
          <SelectTrigger className={`${errors.fuelType ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 w-full`}>
          <SelectValue  placeholder="Select Fuel Type" />
          </SelectTrigger>
          <SelectContent className="bg-footer/85 shadow-2xl backdrop-blur-2xl ">
          {
             fuelTypes.map((type)=>{
             return <SelectItem value={type} key={type} className="transition-all duration-75 focus:bg-[#16223c] " >{type}</SelectItem>
             })
        }
    
          </SelectContent>
          </Select>
          {
            errors.fuelType && (
              <p className="text-xs text-red-500 ">{errors.fuelType.message}</p>
            )
          }
        </div>

        {/* Transmission */}
        <div className="space-y-2 ">
          <Label htmlFor="transmission">Transmission</Label>
          <Select id="transmission" onValueChange={(value) => setValue("transmission", value)} defaultValue={getValues("transmission")}>
          <SelectTrigger className={`${errors.transmission ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 w-full`}>
          <SelectValue  placeholder="Select Transmission" />
          </SelectTrigger>
          <SelectContent className="bg-footer/85 shadow-2xl backdrop-blur-2xl">
          {
             transmissions.map((type)=>{
             return <SelectItem value={type} key={type} className="transition-all duration-75 focus:bg-[#16223c] " >{type}</SelectItem>
             })
        }
    
          </SelectContent>
          </Select>
          {
            errors.transmission && (
              <p className="text-xs text-red-500 ">{errors.transmission.message}</p>
            )
          }
        </div>

        {/* BodyType */}
        <div className="space-y-2 ">
          <Label htmlFor="body">Body Type</Label>
          <Select id="body" onValueChange={(value) => setValue("bodyType", value)} defaultValue={getValues("bodyType")}>
          <SelectTrigger className={`${errors.bodyType ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 w-full`}>
          <SelectValue  placeholder="Select Body Type" />
          </SelectTrigger>
          <SelectContent className="bg-footer/85 shadow-2xl backdrop-blur-2xl ">
          {
             bodyTypes.map((type)=>{
             return <SelectItem value={type} key={type} className="transition-all duration-75 focus:bg-[#16223c] " >{type}</SelectItem>
             })
        }
    
          </SelectContent>
          </Select>
          {
            errors.bodyType && (
              <p className="text-xs text-red-500 ">{errors.bodyType.message}</p>
            )
          }
        </div>

        {/* Seats */}
        <div className="space-y-2">
          <Label htmlFor="seats">Number of Seats{" "}
            <span className="text-subhead">(Optional)</span>
          </Label>
          <Input placeholder="e.g. 5"
          id="seats"
          {...register("seats")}
          className={`${errors.seats ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 `}/>

          {
            errors.seats && (
              <p className="text-xs text-red-500 ">{errors.seats.message}</p>
            )
          }
        </div>

       

        {/* Status */}
        <div className="space-y-2 ">
          <Label htmlFor="status">Status</Label>
          <Select id="status" onValueChange={(value) => setValue("status", value)} defaultValue={getValues("status")}>
          <SelectTrigger className={`${errors.status ? "border-red-500" : ""} focus:outline-none focus-visible:ring-0 w-full`}>
          <SelectValue  placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-footer/85 shadow-2xl backdrop-blur-2xl ">
          {
             carStatuses.map((type)=>{
             return <SelectItem value={type} key={type} className="transition-all duration-75 focus:bg-[#16223c] " >{type}</SelectItem>
             })
        }
    
          </SelectContent>
          </Select>
          {
            errors.status && (
              <p className="text-xs text-red-500 ">{errors.status.message}</p>
            )
          }
        </div>

      </div>

       {/* Description */}
       <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea placeholder="Enter a detailed description of the car..."
          id="description"
          {...register("description")}
          className={`${errors.description ? "border-red-500" : ""} focus:outline-none  focus-visible:ring-0 min-h-32 `}/>

          {
            errors.description && (
              <p className="text-xs text-red-500 ">{errors.description.message}</p>
            )
          }
        </div>

        {/* CheckBox */}
        <div className="space-y-2 flex items-center space-x-4 p-4 bg-footer/50 rounded-md shadow-md backdrop-blur-2xl">
         <Checkbox id="featured" checked={watch("featured")}
         onCheckedChange={(isChecked) => setValue("featured", isChecked)}  
         />

         <div>
          <Label htmlFor="featured" className="flex flex-col items-start gap-0.5">Feature this Car
          <p className="text-xs text-subhead">Featured Cars appear on the homepage.</p>
          </Label>

               
         </div>    
        </div>

{/* Dropzone */}
        <div className="space-y-2">
          <Label htmlFor="images" className={imageError ? "text-red-500" : ""}>
            Images{" "}
            {imageError && <span className="text-red-500">*</span>}
          </Label>

          <div>
            <div>
            <div
                {...getMultiImagesRootProp()}
                className={`border-2 border-dashed  rounded-xl p-4 flex items-center justify-center ${
                  isDragActive? " border-gray-300" : "border-gray-700" 
                } ${imageError && "border-red-500"} transition-all duration-200 cursor-pointer`}
              >
                <input
                  {...getMultiImagesInputProp()}
                  accept="image/*"
                  className="hidden"
                />
                
                  <div  className="flex flex-col items-center justify-center">
                    <UploadIcon
                      size={60}
                      className={` mx-auto transition-all duration-200 ${isDragActive ?"text-gray-300":"text-gray-700"} `}
                    />
                      <p className={`text-subhead mt-2 transition-all duration-200 ${isDragActive ?"text-white":""}`}>
                        Drag & drop or click to upload images
                      </p>

                    <p className="text-subhead mt-1 text-xs ">
                      Supports: JPG, PNG, Webp (max 5MB each)
                    </p>
                  </div>
                
              </div>
            </div>
            {
              imageError && (
                <p className="text-xs text-red-500 mt-1">{imageError}</p>
              )
            }
          </div>
        </div>

   {/* Image Previews */}
        {
         uploadedImages.length >0 && (
            <div className="">
              <h2 className=" font-medium mb-2">Uploaded Images ({uploadedImages.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {uploadedImages.map((image,index)=>{
                  return (
                    <div className="relative group" key={index+image}>
                      <Image
                       src={image}
                      alt={`Car image ${index+1}`}
                      height={50}
                      width={50}
                      className="h-28 w-full object-cover rounded-md"
                      priority
                      />

                      <Button onClick={()=>handleRemoveImage(index)} type="button" className="bg-red-600 opacity-0 text-white h-7 w-7 absolute hover:bg-red-700 top-0 right-0 rounded-tl-none rounded-br-none group-hover:opacity-100 transition-all duration-200"
                     >
                        <X className="h-3 w-3"/>
                      </Button>
                    </div>
                  )
                 })}
              </div>
            </div>
          )
        }
        
        <Button type="submit" className="w-full md:w-auto   text-sm cursor-pointer " disabled={addCarLoading}>
          {
            addCarLoading ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Adding Car...
            </>
            ):(
              "Add Car"
            )
          }
        </Button>
    </form>
  </CardContent>
 
</Card>
  </TabsContent>
  {/* AI Uplaod Tab content */}
  <TabsContent value="ai" className="mt-6">

 <Card className="bg-background shadow-2xl">
  <CardHeader>
    <CardTitle>AI-Powered Car Details Extraction</CardTitle>
    <CardDescription>Upload an image of a car and let AI extract its details.</CardDescription>
  </CardHeader>
  <CardContent>
  <div className="space-y-6">
    
    <div>
    {
       aiImagePreview ? (
         <div className="flex flex-col items-center justify-center border-2  border-white rounded-xl p-4">
                 <img
                  src={aiImagePreview}
                  alt="preview"
                 
                  className="max-h-64 max-w-full object-contain rounded-md mb-4"
                  />

<div className="flex flex-col md:flex-row md:gap-7 gap-2 items-center">
                  <Button
                    type="button"
                    disabled={aiCarLoading}
                    onClick={() => {
                      setAiImagePreview("");
                      setAiUploadedImage(null);
                      
                    }}
                    className="bg-red-600 hover:opacity-90 hover:bg-red-600 text-white cursor-pointer font-semibold transition duration-300  w-full md:w-auto"
                  >
                    Remove Image
                  </Button>
                  <Button
                  onClick={aiCarProccess}
                     disabled={aiCarLoading }
                    type="submit"
                    className="bg-primary text-background cursor-pointer  font-semibold transition duration-300  w-full md:w-auto"
                    
                  >
                    {aiCarLoading ? <>
                      <Loader2 className="h-4 w-4 -mr-1 animate-spin" />
                      Processing...
                    </>:<>
                    <Sparkles className="h-4 w-4 -mr-1" />
                      Extract Details
                    </>
                    }
                    
                  </Button>
                </div>
         </div>
       ):(
        <div> 
         <div
        {...getAiImagesRootProp()}
        className={`border-2 border-dashed  rounded-xl p-4 flex items-center justify-center ${
          isAiDragActive? " border-gray-300" : "border-gray-700" 
        } ${aiImageError && "border-red-500"} transition-all duration-200 cursor-pointer`}
      >
        <input
          {...getAiImagesInputProp()}
          accept="image/*"
          className="hidden"
        />
        
          <div  className="flex flex-col items-center justify-center">
            <UploadIcon
              size={60}
              className={` mx-auto transition-all duration-200 ${isAiDragActive ?"text-gray-300":"text-gray-700"} `}
            />
              <p className={`text-subhead mt-2 transition-all duration-200 ${isAiDragActive ?"text-white":""}`}>
                Drag & drop or click to upload image
              </p>
 
            <p className="text-subhead mt-1 text-xs ">
              Supports: JPG, PNG, Webp (max 5MB each)
            </p>
          </div>
        
      </div>
      </div>
       )
     }
    </div>

    <div className="bg-footer p-4 rounded-md">
                  <h3 className="font-medium mb-2">How it works</h3>
                  <ol className="space-y-2 text-sm text-subhead list-decimal pl-4">
                    <li>Upload a clear image of the car</li>
                    <li>Click "Extract Details" to analyze with Gemini AI</li>
                    <li>Review the extracted information</li>
                    <li>Fill in any missing details manually</li>
                    <li>Add the car to your inventory</li>
                  </ol>
                </div>

                <div className="bg-footer p-4 rounded-md">
                  <h3 className="font-medium mb-1">
                    Tips for best results
                  </h3>
                  <ul className="space-y-1 text-sm text-subhead">
                    <li>• Use clear, well-lit images</li>
                    <li>• Try to capture the entire vehicle</li>
                    <li>• For difficult models, use multiple views</li>
                    <li>• Always verify AI-extracted information</li>
                  </ul>
                </div>

                
   </div>
   
  </CardContent>
  
</Card>
 

  </TabsContent>
</Tabs>
       </div>
    </>
  )
}