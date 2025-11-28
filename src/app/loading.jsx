// app/loading.tsx (or components/Loading.tsx)

import { Loader2 } from 'lucide-react';
import React from 'react';


export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-background z-1000">
    
<div class="clouds">
  <div class="cloud cloud1"></div>
  <div class="cloud cloud2"></div>
  <div class="cloud cloud3"></div>
  <div class="cloud cloud4"></div>
  <div class="cloud cloud5"></div>
</div>

<div class="loader">
  <span><span></span><span></span><span></span><span></span></span>
  <div class="base">
    <span ></span>
    <div class="face"></div>
  </div>
</div>

<div class="longfazers">
  <span></span><span></span><span></span><span></span>
</div>

    </div>
  );
}