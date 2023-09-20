"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(()=>{
loginModal.onClose()
registerModal.onOpen()
  },[])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="login to your account" />
      <Input
        id="email"
        label="Email"
        errors={errors}
        disabled={isLoading}
        register={register}
        required
        type="text"
      />

      <Input
        id="password"
        label="Password"
        errors={errors}
        disabled={isLoading}
        register={register}
        required
        type="password"
      />
    </div>
  );

  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue With Google" icon={FcGoogle}  onClick={ ()=>signIn("google")}/>
      <Button outline label="Continue With Github" icon={AiFillGithub} onClick={()=>signIn("github")} />

      <div>
        <div className="flex flex-row justify-center gap-2">
          <div className="text-neutral-400">First time using Airbnb?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
           Create an account
          </div>
        </div>
      </div>
      
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  );
};

export default LoginModal;
