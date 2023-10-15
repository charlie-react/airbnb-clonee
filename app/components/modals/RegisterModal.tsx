"use client";

import axios from "axios";
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
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(()=>{
    registerModal.onClose()
    loginModal.onOpen()
      },[])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success")
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          toast("Sometin Went Wrong");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
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
        id="name"
        label="Name"
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
      <Button outline label="Continue With Google" icon={FcGoogle} onClick={()=>signIn("google")} />
      <Button outline label="Continue With Github" icon={AiFillGithub} onClick={()=>signIn("github")} />

      <div>
        <div className="flex flex-row justify-center gap-2">
          <div className="text-neutral-400">Registered User?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  );
};

export default RegisterModal;
