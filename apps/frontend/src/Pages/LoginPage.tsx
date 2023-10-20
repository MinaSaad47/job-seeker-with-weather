import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useLoginMutation } from "../store";
import { ValidateLogin } from "../validations/auth.validation";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof ValidateLogin>>({
    resolver: zodResolver(ValidateLogin),
  });
  const formErrors = form.formState.errors;

  const handleSubmit = async (formData: z.infer<typeof ValidateLogin>) => {
    const payload = await login(formData).unwrap();
    form.reset();
    localStorage.setItem("token", payload.data);
    toast.success("You have successfully logged in", {
      position: "bottom-center",
    });
    navigate("/", { replace: true });
  };

  return (
    <section className="p-5 lg:p-20 text-xs lg:text-sm h-screen w-screen bg-primary-400 flex items-center justify-center">
      <div className="h-full w-full bg-white rounded-3xl flex flex-col lg:flex-row overflow-scroll">
        <div className="lg:block md:w-1/2 h-2/5 lg:h-full relative">
          <img
            src="https://placehold.co/400"
            className="h-full w-full object-cover"
            alt=""
          />
          <div className="absolute top-5 left-5 text-6xl text-primary">
            Login
          </div>
        </div>
        <div className="lg:w-1/2 w-full px-2 py-8 lg:py-0 lg:px-10">
          <form
            className="h-full flex flex-col items-center justify-center  gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}>
            <input
              {...form.register("email")}
              type="email"
              placeholder="email"
              className="p-2 border-2 rounded-2xl w-full text-primaryfocus:border-primary outline-none hover:scale-[101%] duration-150"
            />
            {formErrors.email && (
              <p className="text-red-400 text-sm">{formErrors.email.message}</p>
            )}
            <div className="w-full relative">
              <input
                {...form.register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="p-2 border-2 rounded-2xl w-full text-primary focus:border-primary outline-none hover:scale-[101%] duration-150"
              />
              <MdPassword
                className="absolute top-1/2 right-3 -translate-y-1/2 hover:cursor-pointer hover:text-gray-500 hover:scale-125 duration-150"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {formErrors.password && (
              <p className="text-red-400 text-sm">
                {formErrors.password.message}
              </p>
            )}

            <div className="ml-auto  hover:scale-105 duration-300">
              <a href="/" className="text-primary hover:text-primary-400">
                Forgot Password?
              </a>
            </div>

            <div className="flex gap-4 w-full">
              <button
                type="button"
                className="flex gap-5  w-3/5 items-center justify-center p-2 rounded-md shadow-elevation-3 hover:scale-105 duration-300">
                <FcGoogle size={30} />
                Sign in with Google
              </button>
              <button
                type="submit"
                className="bg-primary flex-1 text-white p-2 rounded-md hover:bg-primary/80 hover:scale-105 duration-300 flex justify-center items-center">
                {isLoading ? <Spinner text="Signing In" /> : "Sign In"}
              </button>
            </div>

            <div className="mt-10 text-center flex gap-2">
              <p className="text-gray-500">Don't have an account?</p>
              <Link
                to="/register"
                className="text-primary hover:text-primary-400 hover:scale-105 duration-300">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
