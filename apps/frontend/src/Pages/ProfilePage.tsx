import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaSave, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import AddressDetails from "../components/AddressDetails";
import ContactDetails from "../components/ContactDetails";
import EducationDetails from "../components/EducationDetails";
import PersnalDetails from "../components/PersnalDetails";
import SkillsDetails from "../components/SkillsDetails";
import Spinner from "../components/Spinner";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadCvMutation,
} from "../store";
import { ValidateProfile } from "../validations/profile.validation";

const ProfilePage = () => {
  const form = useForm<z.infer<typeof ValidateProfile>>({
    resolver: zodResolver(ValidateProfile),
  });

  const { data, isLoading } = useGetProfileQuery();

  useEffect(() => {
    console.log(data);
    if (data && !isLoading) {
      form.reset(data.data);
    }
  }, [data?.data, isLoading]);

  const [updateProfile, { isLoading: isLoadingUpdating }] =
    useUpdateProfileMutation();
  const [uploadCv, { isLoading: isLoadingUploading }] = useUploadCvMutation();

  const handleSubmit = async (data: z.infer<typeof ValidateProfile>) => {
    const payload = await updateProfile(data).unwrap();
    if (payload.status === "success") {
      toast.success("You have successfully updated your profile", {
        position: "bottom-center",
      });
    } else {
      toast.error(payload.data.message, { position: "bottom-center" });
    }
  };

  const handleCVUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    data
  ) => {
    const file = data.target.files?.[0];
    if (file) {
      const payload = await uploadCv(file).unwrap();
      if (payload?.status === "success") {
        toast.success("You have successfully uploaded your CV", {
          position: "bottom-center",
        });
      } else {
        toast.error(payload.data.message, { position: "bottom-center" });
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-gray-500 min-w-screen min-h-screen bg-gray-300 p-2 md:p-10 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-4xl">Profile Details</h1>
          <div className="flex flex-col gap-1">
            <button
              type="submit"
              className="bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex justify-center">
              {isLoadingUpdating ? (
                <Spinner text="Updating Profile" />
              ) : (
                <span className="flex items-center gap-2">
                  <FaSave /> Save
                </span>
              )}
            </button>
            <label
              htmlFor="cv"
              className="bg-orange-500 text-white rounded px-10 hover:scale-105 hover:bg-orange-300 duration-300 flex justify-center p-2 cursor-pointer">
              {isLoadingUploading ? (
                <Spinner text="Uploading CV" />
              ) : (
                <span className="flex items-center gap-2">
                  <FaUpload /> Upload CV
                </span>
              )}
              <input
                type="file"
                onChange={handleCVUpload as any}
                id="cv"
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-fit flex flex-col xl:flex-row gap-4">
            <div className="h-full xl:w-1/2">
              <PersnalDetails />
            </div>
            <div className="xl:w-1/2">
              <AddressDetails />
            </div>
          </div>
          <EducationDetails />
          <ContactDetails />
          <SkillsDetails />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfilePage;
