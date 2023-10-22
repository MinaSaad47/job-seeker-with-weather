import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useGetProfileQuery, useUploadPictureMutation } from "../store";
import { ValidateProfile } from "../validations/profile.validation";
import AvatarPicker from "./AvatarPicker";
import Spinner from "./Spinner";
import TextField from "./TextField";

const PersnalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof ValidateProfile>>();

  const { data } = useGetProfileQuery();
  const [picture, setPicture] = useState<string | undefined>();

  useEffect(() => {
    if (data?.data?.picture) {
      setPicture(data?.data?.picture);
    }
  }, [data?.data?.picture]);

  const [uploadPicture, { isLoading }] = useUploadPictureMutation();

  const onAvatarChange = async (value: File) => {
    try {
      const response = await uploadPicture(value).unwrap();
      if (response.status === "success") {
        setPicture(response.data);
        toast.success(response.message, {
          position: "bottom-center",
        });
      }
    } catch (error: any) {
      if (
        error.status === 400 &&
        error.data.code === "upload/invalid-mimetype"
      ) {
        toast.error("only image files are allowed", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div className="h-fit bg-white rounded-xl p-4 flex flex-col">
      <div className="text-xl h-14">Personal Details</div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="w-1/4 flex justify-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <AvatarPicker
              src={picture}
              name="avatar"
              onChagne={onAvatarChange}
            />
          )}
        </div>
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
