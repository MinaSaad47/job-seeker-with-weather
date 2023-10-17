import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { z } from "zod";

const ValidateRegister = z
  .object({
    name: z
      .string()
      .min(3, { message: "name must at least contains 3 characters" }),
    email: z.string().email({ message: "invalid email address" }),
    password: z
      .string()
      .min(8, { message: "password must at least contains 8 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "passwords do not match",
        code: "custom",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof ValidateRegister>>({
    resolver: zodResolver(ValidateRegister),
  });
  const formErrors = form.formState.errors;

  const handleSubmit = (_values: z.infer<typeof ValidateRegister>) => {};

  return (
    <section className="lg:p-20 p-10 h-screen w-screen bg-primary flex items-center justify-center">
      <div className="h-full w-full bg-white rounded-3xl flex overflow-hidden">
        <div className="lg:block hidden md:w-1/2 h-full relative">
          <img
            src="https://placehold.co/400"
            className="h-full w-full object-cover"
            alt=""
          />
          <div className="absolute top-5 left-5 text-6xl text-primary">
            Register
          </div>
        </div>
        <div className="lg:w-1/2 w-full px-10">
          <form
            className="h-full flex flex-col items-center justify-center  gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}>
            <input
              type="text"
              placeholder="name"
              {...form.register("name")}
              className="p-2 border-2 rounded-2xl w-full text-primary focus:border-primary outline-none hover:scale-[101%] duration-150"
            />
            {formErrors.name && (
              <p className="text-red-400 text-sm">{formErrors.name.message}</p>
            )}
            <input
              type="email"
              placeholder="email"
              {...form.register("email")}
              className="p-2 border-2 rounded-2xl w-full text-primary focus:border-primary outline-none hover:scale-[101%] duration-150"
            />
            {formErrors.email && (
              <p className="text-red-400 text-sm">{formErrors.email.message}</p>
            )}
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                {...form.register("password")}
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
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="confirm password"
                {...form.register("confirmPassword")}
                className="p-2 border-2 rounded-2xl w-full text-primary focus:border-primary outline-none hover:scale-[101%] duration-150"
              />
              <MdPassword
                className="absolute top-1/2 right-3 -translate-y-1/2 hover:cursor-pointer hover:text-gray-500 hover:scale-125 duration-150"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {formErrors.confirmPassword && (
              <p className="text-red-400 text-sm">
                {formErrors.confirmPassword.message}
              </p>
            )}

            <div className="flex mt-6 gap-4 w-full">
              <button
                type="button"
                className="flex gap-5  w-3/5 items-center justify-center p-2 rounded-md shadow-elevation-3 hover:scale-105 duration-300">
                <FcGoogle size={30} />
                Sign in with Google
              </button>
              <button
                type="submit"
                className="bg-primary flex-1 text-white p-2 rounded-md hover:bg-primary/80 hover:scale-105 duration-300">
                Register
              </button>
            </div>

            <div className="mt-10 text-center flex gap-2">
              <p className="text-gray-500">Already have an account?</p>
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 hover:scale-105 duration-300">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
