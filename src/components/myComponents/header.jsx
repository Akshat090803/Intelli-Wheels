
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

import Image from 'next/image';

import logogpt3 from '../../../public/logogpt3.png'

import { ArrowLeft, CarFront, Heart, Layout, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { checkUser } from '@/lib/checkUser';



const Header = async ({isAdminPage=false}) => {

  const user=await checkUser()

  const isAdmin=user?.role==="ADMIN"; // Replace with actual logic to determine if the user is an admin

  return (
    <>
   <header className='w-full  border-b shadow-lg fixed top-0 z-30 overflow-hidden bg-background backdrop-blur-md ' id='myHeader'>
    <nav className='flex items-center mx-auto py-3 md:px-6 px-2 justify-between'>
      <Link href={isAdminPage ? '/admin' : '/'} className='flex items-center gap-2'>
      <Image src={logogpt3}
      alt='IntelliWheels logo'
      width={200}
      height={60}
      className='h-10 w-auto object-contain'/>
      {
        isAdminPage && <span>Admin</span>
      }
      </Link>

      {
        isAdminPage ? (
           <div className='flex items-center gap-4'> 
             <Link href={'/'}>
        
        <Button variant="outline" className="cursor-pointer">
        <LogOut size={20} />
        <span className='hidden md:inline'>Back to App</span>
        </Button>
        </Link> 

        <SignedIn>
          <UserButton
          appearance={{
            elements:{
              avatarBox:{
                width:'2rem',
                height:'2rem',
                borderRadius:'50%',
                border:'2px solid white'
              }
            }
          }}/>
        </SignedIn>

        </div>
          
          
        
        
        ):(
          <div className='flex items-center gap-4'>
        <SignedIn>
          <Link href={'/saved-cars'}>
          <Button variant="outline" className="cursor-pointer">
            <Heart size={20}/>
            <span className='hidden md:inline'>Saved Cars</span>
          </Button>
          </Link>

          {
            !isAdmin ? (
              <Link href={'/reservations'}>
          <Button className="cursor-pointer">
            <CarFront size={20}/>
            <span className='hidden md:inline'>My Reservations</span>
          </Button>
          </Link>
            ):(
              <Link href={'/admin'}>
          <Button className="cursor-pointer">
            <Layout size={20}/>
            <span className='hidden md:inline'>Admin Portal</span>
          </Button>
          </Link>
            )
          }
        </SignedIn>

        <SignedOut>
            
           <Link href={'/sign-in'}>
           <Button variant="outline" className="cursor-pointer">Sign In</Button>
           </Link>
        </SignedOut>

        <SignedIn>
          <UserButton
          appearance={{
            elements:{
              avatarBox:{
                width:'2rem',
                height:'2rem',
                borderRadius:'50%',
                border:'2px solid white'
              }
            }
          }}/>
        </SignedIn>
      </div>
      
        )
        
        
      }
      
    </nav>
   </header>
    </>
    
  );
};

export default Header;