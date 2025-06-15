// app/loading.tsx (or components/Loading.tsx)

import { Loader2 } from 'lucide-react';
import React from 'react';


export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-background z-1000">
      <div className="text-2xl font-bold flex gap-4">
        <Loader2 className='animate-spin h-8 w-8'/>
        Loading...


        </div>
    </div>
  );
}