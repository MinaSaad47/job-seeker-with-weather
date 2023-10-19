import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { ValidateProfile } from "../validations/profile.validation";
import TextField from "./TextField";

const PersnalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof ValidateProfile>>();

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col">
      <div className="text-xl h-14">Personal Details</div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <img
          src="https://placehold.co/400"
          className="h-[150px] w-[150px] object-cover rounded-[50%]"
          alt=""
        />
        <fieldset className="flex flex-col flex-wrap flex-grow text-sm gap-2  w-full">
          <TextField label="First Name" register={register("firstName")} />
          {errors?.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
          <TextField label="Last Name" register={register("lastName")} />
          {errors?.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </fieldset>
      </div>
    </div>
  );
};

export default PersnalDetails;
