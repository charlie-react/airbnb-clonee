// "use client"



// import Image from "next/image"
// import { useRouter } from "next/navigation"

 

// const Logo = () => {
//     const router = useRouter()
//   return (
//    <Image
//    onClick={()=>router.push("/")}
//    alt="Logo"
//    className="hidden md:block cursor-pointer"
//    width={"100"}
//    height={"100"}
//    src={"/images/logoair.png"}
//    />
//   )
// }

// export default Logo

'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/logoair.png" 
      height="100" 
      width="100" 
      alt="Logo" 
    />
   );
}
 
export default Logo;