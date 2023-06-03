import type { NextPage } from "next";
import Image from 'next/image'
import { useRouter } from "next/router";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../lib/auth_client";
import { useState } from "react";
import Loading from "../../components/Loading";
import LogoHCMIU from "../../assets/images/logo.png";
interface LoginInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const router = useRouter();
  const { signInWithPassword } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      setLoading(true);
      await signInWithPassword(data.email, data.password).then(() => {
        setLoading(false);
        router.push("/personal-information");
      });
    } catch (error) {
      setLoading(false);
      console.error("error11", error);
    }
  };

  return (
    <div className="mx-auto mt-32 w-1/2 text-center ">
      {loading && <Loading />}
      <div className="flex flex-col w-full justify-center items-center">
        <Image src={LogoHCMIU} alt="logo" width={80} height={80} />
        <p className="mt-4 text-2xl	font-black">
          Learning Management System
        </p>
      </div>
      <form
        className="flex flex-col justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="my-4 rounded-md border p-4"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}
        <input
          className="my-4 rounded-md border p-4"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <input
          className="cursor-pointer rounded-md border bg-sky-500 p-2 text-white hover:bg-sky-700"
          type="submit"
        />
      </form>
    </div>
  );
}
Login.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};
