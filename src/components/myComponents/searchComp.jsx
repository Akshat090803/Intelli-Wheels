"use client";

import { Camera, Loader2, Search, Sparkles, UploadIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch-hook";
import { processImageSearch } from "@/actions/home";


export default function HomeSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(true);
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);



  //!this will handle drop fle
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; //get the file
    if(file){
          //check size of file
      if(file.size > 5*1024*1024){
        toast.error("Image size must be less than 5MB");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);
//use FileReader to read the file
      const reader=new FileReader()

      //after completing the reading
      reader.onloadend=()=>{
        setImagePreview(reader.result);
        setIsUploading(false)
        toast.success("Image uploaded successfully");
      }

      //if error reading the file
      reader.onerror=()=>{
        setIsUploading(false);
        toast.error("Failed to read the image")
      }

      //call reader to read the file
      reader.readAsDataURL(file)
    }
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });


  const handleTextSearch = (e) => {
    e.preventDefault();
    if(!searchTerm.trim()){
      toast.error("Please enter a search term");
      return
    }

    //redirect to search page
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`)

    
  };

  
  // ! for image based search
    const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error: processError,
  } = useFetch(processImageSearch);

  //! Handle process result and errors with useEffect
  useEffect(() => {
    if (processResult?.success) {
      const params = new URLSearchParams();

      // Add extracted params to the search
      if (processResult.data.make) params.set("make", processResult.data.make);
      if (processResult.data.bodyType)
        params.set("bodyType", processResult.data.bodyType);
      if (processResult.data.color)
        params.set("color", processResult.data.color);

      // Redirect to search results
      router.push(`/cars?${params.toString()}`);
    }
  }, [processResult, router]);

  useEffect(() => {
    if (processError) {
      toast.error(
        "Failed to analyze image: " + (processError.message || "Unknown error")
      );
    }
  }, [processError]);

  const handleImageSearch = async(e) => {
    e.preventDefault();
    if(!searchImage){
      toast.error("Please uplaod an imagr first");
      return
    }

    //ai logic here
     // Use the processImageFn from useFetch hook
    await processImageFn(searchImage);
  };

  return (
    <>
      <form onSubmit={handleTextSearch}>
        <div className="relative flex items-center">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search cars, brands, make, or use AI Image Search"
            className="w-full pl-10 pr-36 py-6 heroInput rounded-full placeholder:text-subhead focus:outline-none focus-visible:ring-0 backdrop-blur-2xl text-lg hidden sm:block"
          />
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search cars..."
            className="w-full pl-10 pr-24 py-6 heroInput rounded-full placeholder:text-subhead focus:outline-none focus-visible:ring-0 backdrop-blur-2xl text-lg sm:hidden "
          />

          <div className="absolute right-[60px]  sm:right-[100px]">
            <Camera
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              size={35}
              className={`cursor-pointer rounded-xl p-1 sm:p-1.5  transition-all duration-200  ${
                isImageSearchActive && "text-background bg-primary"
              }`}
            />
          </div>

          <div className="absolute right-2">
            <Button
              type="submit"
              className="bg-primary text-background cursor-pointer rounded-full font-semibold transition duration-300 active:scale-95"
            >
              <span className="hidden sm:block">Search</span>
              <Search size={20} className="sm:hidden" />
            </Button>
          </div>
        </div>
      </form>

      {isImageSearchActive && (
        <div className="mt-5">
          <form onSubmit={handleImageSearch}>
            {imagePreview ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-white rounded-xl p-4 ">
                <img
                  src={imagePreview}
                  alt="preview"
                  
                  className=" h-64 object-cover rounded-xl mb-4"
                />
                <div className="flex flex-col md:flex-row md:gap-7 gap-2 items-center">
                  <Button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setSearchImage(null);
                      
                    }}
                    className="bg-red-600 hover:opacity-90 hover:bg-red-600 text-white cursor-pointer  font-semibold transition duration-300  w-full md:w-auto"
                  >
                    Remove Image
                  </Button>
                  {
                    imagePreview && <Button
                     disabled={isUploading || isProcessing }
                    type="submit"
                    className="bg-primary text-background cursor-pointer  font-semibold transition duration-300  w-full md:w-auto"
                    
                  >
                    {isUploading ? <>
                      <Loader2 className="h-4 w-4 -mr-1 animate-spin" />
                      Uploading...
                    </>:isProcessing? <>
                      <Loader2 className="h-4 w-4 -mr-1 animate-spin" />
                      Analyzing Image...
                    </>    :"Search with this image"
                    }
                    
                  </Button>
                  }
                </div>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-4 flex items-center justify-center ${
                  isDragActive ? " border-green-400" : "border-gray-300"
                } transition duration-200 cursor-pointer`}
              >
                <input
                  {...getInputProps()}
                  accept="image/*"
                  className="hidden"
                />
                
                  <div className="flex flex-col items-center justify-center">
                    <UploadIcon
                      size={60}
                      className={` mx-auto ${isDragActive && !isDragReject ?"text-white":"text-muted-foreground"} `}
                    />

                    {isDragActive && !isDragReject ? (
                      <p className="text-white mt-2">
                        Leave the file here to upload
                      </p>
                    ) : (
                      <p className="text-subhead mt-2">
                        Drag and drop an image here, or click to select a file
                      </p>
                    )}
                    {isDragReject && !isDragAccept && (
                      <p className="text-red-500 mt-2">Unsupported file type</p>
                    )}
                    <p className="text-subhead mt-1 text-xs">
                      Supports: JPG, PNG (max 5MB)
                    </p>
                  </div>
                
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
