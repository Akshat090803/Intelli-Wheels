import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/myComponents/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'


const inter=Inter({subsets:["latin"]})

export const metadata = {
  title: "Intelli Wheels",
  description: "Find your dream car",
};

export default function RootLayout({ children }) {
  
  return (
  
   <ClerkProvider  appearance={{
        baseTheme: [dark],
        variables: {
          colorBackground: "#111827", 
          colorInputBackground: "#1e293b", 
        },
        elements: {
          
          userButtonPopoverCard: {
            background: "#1e293b", 
            border: "1px solid #334155", 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)", 
            borderRadius: "8px", 
          },
          userButtonPopoverListItem: {
            color: "#f0f0f0", 
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)", 
            },
          },
          userButtonPopoverFooter: {
            background: "#111827", 
            borderTop: "1px solid #334155", 
            padding: "10px",
          },
          userButtonPopoverActionButton: {
            color: "#f0f0f0", 
            "&:hover": {
              backgroundColor: "#33415", 
            },
          },
          userButtonAvatarBox: {
            border: "2px solid #62DAFB", 
          },

          userProfileCard: {
            background: "#111827",
            border: "1px solid #334155",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          },
          userProfileTabsTrigger: { 
            backgroundColor: "#1e293b", 
            color: "#a0a0a0", 
            "&[data-state='active']": { 
              backgroundColor: "#334155",
              color: "#f0f0f0",
            },
          },
          userProfileHeaderTitle: {
            color: "#f0f0f0",
          },
          userProfileHeaderSubtitle: {
            color: "#a0a0a0",
          },
         
        },
      }} >
     <html lang="en">
      <body
        className={`${inter.className} dark`}
      > 
        <Header />
        <main className="min-h-screen">
        {children}
        </main>
        <Toaster richColors/>

        <footer className="py-32 md:py-12 bg-footer ">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-white">
            <p>
              Crafted with ❤️ by Akshat.
            </p>
          </div>
        </footer>
      </body>
    </html>
   </ClerkProvider>
   
  );
}
