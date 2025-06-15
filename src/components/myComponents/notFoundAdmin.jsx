import Link from "next/link";
import { Button } from "../ui/button";


export default function NotFoundAdmin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center ">
      <h1 className="text-6xl font-bold gradient-title mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-8">
      You are not authorized to view this page.
      Only administrators can access this page.
      </p>
      <Link href="/">
        <Button className="cursor-pointer rounded-[8px]">Return Home</Button>
      </Link>
    </div>
  );
}