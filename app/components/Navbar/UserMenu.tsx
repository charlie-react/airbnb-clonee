// "use client";
// import { AiOutlineMenu } from "react-icons/ai";
// import Avatar from "../Avatar";
// import { useState, useCallback } from "react";
// import MenuItems from "./MenuItems";
// import useRegisterModal from "@/app/hooks/useRegisterModal";
// import useLoginModal from "@/app/hooks/useLoginModal";

// import { signOut } from "next-auth/react";
// import { SafeUser } from "@/app/types";
// import useRentModal from "@/app/hooks/useRentModal";
 
// import { useRouter } from "next/navigation";

// interface UserMenuProps {
//   currentUser?: SafeUser | null;
// }

// const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
//   const registerModal = useRegisterModal();
//   const loginModal = useLoginModal();
//   const rentModal = useRentModal();
//   const [isOpen, setIsOpen] = useState(false);

//   const router = useRouter()

//   const handleRent = useCallback(() => {
//     if (!currentUser) {
//       return loginModal.onOpen();
//     }

//     rentModal.onOpen()
//   }, [loginModal, currentUser, rentModal]);


//   const toggleOpen = useCallback(() => {
//     setIsOpen((value) => !value);
//   }, []);


//   return (
//     <div className="relative">
//       <div className="flex flex-row items-center gap-3">
//         <div
//           onClick={handleRent}
//           className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100"
//         >
//           Airbnb your home
//         </div>
//         <div
//           className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full transition cursor-pointer hover:shadow-md flex flex-row items-center gap-3 "
//           onClick={toggleOpen}
//         >
//           <AiOutlineMenu />
//           <div className="hidden md:block">
//             <Avatar src={currentUser?.image} />
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="absolute top-12 right-0 overflow-hidden rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white text-sm">
//           <div className="flex flex-col cursor-pointer">
//             {currentUser ? (
//               <>
//                 <MenuItems onClick={() => router.push("/trips")} label="My Trips" />

//                 <MenuItems onClick={() => router.push("/favorites")} label="My Favorites" />

//                 <MenuItems onClick={() => router.push("/reservations")} label="My Reservations" />

//                 <MenuItems onClick={() =>  router.push("/properties")} label="My Properties" />

//                 <MenuItems onClick={rentModal.onOpen} label="Airbnb My Home" />

//                 <MenuItems onClick={() => signOut()} label="Log Out" />
//               </>
//             ) : (
//               <>
//                 <MenuItems onClick={loginModal.onOpen} label="Login" />
//                 <MenuItems onClick={registerModal.onOpen} label="Sign up" />
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserMenu;

'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItems";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="My trips" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Airbnb your home" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;