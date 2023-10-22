import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import Spinner from "../components/Spinner";
import { loginWithGoogle } from "../services/googlelogin.service";
import { useRegisterMutation } from "../store";
import { setToken } from "../store/slices/tokenSlide";
import { ValidateRegister } from "../validations/auth.validation";

import registrationBackground from "../assets/registration-background.jpg";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof ValidateRegister>>({
    resolver: zodResolver(ValidateRegister),
  });
  const formErrors = form.formState.errors;
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (formData: z.infer<typeof ValidateRegister>) => {
    await register(formData).unwrap();
    form.reset();
    toast.success("You have successfully registered", {
      position: "bottom-center",
    });
    navigate("/login", { replace: true });
  };

  const handleGoogleLogin = async () => {
    const token = await loginWithGoogle();
    dispatch(setToken(token));

    toast.success("You have successfully logged in", {
      position: "bottom-center",
    });

    navigate("/", { replace: true });
  };

  return (
    <div
      className="text-xs lg:text-sm h-screen w-screen flex items-center justify-center"
      style={{ background: `url(${registrationBackground})` }}>
      <div className="p-5 lg:p-20 w-full h-full backdrop-blur-3xl backdrop-brightness-75">
      <div className="h-full w-full bg-white rounded-3xl flex flex-col lg:flex-row overflow-scroll">
        <div className="lg:block md:w-1/2 h-2/5 lg:h-full relative">
          <img
            src={registrationBackground}
            className="h-full w-full object-cover"
            alt=""
          />
          <div className="absolute top-5 left-5 text-6xl text-white">
            Register
          </div>
        </div>
        <div className="lg:w-1/2 w-full px-2 py-8 lg:py-0 lg:px-10">
          <form
            className="h-full flex flex-col items-center justify-center  gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}>
            <input
              type="email"
              placeholder="email"
              autoComplete="email"
              {...form.register("email")}
              className="p-2 border-2 rounded-2xl w-full text-primary focus:border-primary outline-none hover:scale-[101%] duration-150"
            />
            {formErrors.email && (
              <p className="text-red-400 text-xs">{formErrors.email.message}</p>
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
              <p className="text-red-400 text-xs">
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
              <p className="text-red-400 text-xs">
                {formErrors.confirmPassword.message}
              </p>
            )}

            <div className="flex mt-6 gap-4 w-full">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex gap-5  w-3/5 items-center justify-center p-2 rounded-md shadow-elevation-3 hover:scale-105 duration-300">
                <FcGoogle size={30} />
                Sign in with Google
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-primary flex-1 flex justify-center items-center text-white p-2 rounded-md ${
                  isLoading
                    ? "bg-primary/60"
                    : "hover:bg-primary-400 hover:scale-105"
                } duration-300`}>
                {isLoading ? <Spinner text="Registering" /> : "Register"}
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
</div>
    </div>
  );
};

export default RegisterPage;
