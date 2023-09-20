"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);


  const handleRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen()
  }, [loginModal, currentUser, rentModal]);


  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100"
        >
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full transition cursor-pointer hover:shadow-md flex flex-row items-center gap-3 "
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-12 right-0 overflow-hidden rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItems onClick={() => {}} label="My Trips" />

                <MenuItems onClick={() => {}} label="My Favorites" />

                <MenuItems onClick={() => {}} label="My Reservations" />

                <MenuItems onClick={() => {}} label="My Properties" />

                <MenuItems onClick={rentModal.onOpen} label="Airbnb My Home" />

                <MenuItems onClick={() => signOut()} label="Log Out" />
              </>
            ) : (
              <>
                <MenuItems onClick={loginModal.onOpen} label="Login" />
                <MenuItems onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
