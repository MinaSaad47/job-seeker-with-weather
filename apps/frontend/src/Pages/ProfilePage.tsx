import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { FaSave, FaUpload } from "react-icons/fa";
import { z } from "zod";
import AddressDetails from "../components/AddressDetails";
import ContactDetails from "../components/ContactDetails";
import EducationDetails from "../components/EducationDetails";
import PersnalDetails from "../components/PersnalDetails";
import SkillsDetails from "../components/SkillsDetails";
import { ValidateProfile } from "../validations/profile.validation";

const ProfilePage = () => {
  const form = useForm<z.infer<typeof ValidateProfile>>({
    resolver: zodResolver(ValidateProfile),
  });

  const handleSubmit = (data: z.infer<typeof ValidateProfile>) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-gray-500 min-w-screen min-h-screen bg-gray-200 p-2 md:p-10 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-4xl">Profile Details</h1>
          <div className="flex flex-col gap-1">
            <button
              type="submit"
              className="bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2">
              <FaSave /> Save
            </button>
            <button
              type="button"
              className="bg-orange-500 text-white rounded px-10 hover:scale-105 hover:bg-orange-300 duration-300 flex gap-2 items-center justify-center p-2">
              <FaUpload /> Upload Resume
            </button>
          </div>
        </div>
        <div className="grid grid-rows-6 grid-col-1 lg:grid-rows-3 lg:grid-cols-2 grid-flow-col gap-4">
          <PersnalDetails />
          <ContactDetails />
          <AddressDetails />
          <EducationDetails />
          <SkillsDetails />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfilePage;
