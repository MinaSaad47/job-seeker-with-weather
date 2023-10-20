import { useFieldArray, useFormContext } from "react-hook-form";
import { FaEnvelope, FaLink, FaPhone, FaTrash } from "react-icons/fa";
import { z } from "zod";
import { ValidateProfile } from "../validations/profile.validation";
import LinkIcon from "./LinkIcon";
import TextField from "./TextField";

const ContactDetails = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<z.infer<typeof ValidateProfile>>();
  const {
    fields: emails,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ name: "emails" });

  const {
    fields: phones,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ name: "phones" });
  const {
    fields: links,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ name: "socialLinks" });

  const renderEmails = emails.map((_item, index) => (
    <div className="flex flex-col gap-2" key={index}>
      <div className="relative">
        <TextField
          label={`Email ${index + 1}`}
          type="email"
          register={register(`emails.${index}`)}
        />
        <FaTrash
          className="absolute bottom-2 right-2 hover:cursor-pointer text-red-500 hover:text-red-300"
          size={20}
          onClick={() => removeEmail(index)}
        />
      </div>
      <div>
        {errors.emails?.[index] && (
          <span className="text-red-500">
            {errors.emails?.[index]?.message}
          </span>
        )}
      </div>
    </div>
  ));
  const renderPhones = phones.map((_item, index) => (
    <div className="flex flex-col gap-2" key={index}>
      <div className="relative">
        <TextField
          label={`Phone ${index + 1}`}
          type="text"
          register={register(`phones.${index}`)}
        />
        <FaTrash
          className="absolute bottom-2 right-2 hover:cursor-pointer text-red-500 hover:text-red-300"
          size={20}
          onClick={() => removePhone(index)}
        />
      </div>
      <div>
        {errors.phones?.[index] && (
          <span className="text-red-500">
            {errors.phones?.[index]?.message}
          </span>
        )}
      </div>
    </div>
  ));

  const renderLinks = links.map((_item, index) => (
    <div className="flex flex-col gap-2" key={index}>
      <div className="relative flex-1">
        <TextField
          label={`Link ${index + 1}`}
          type="text"
          register={register(`socialLinks.${index}`)}
        />
        <FaTrash
          className="absolute bottom-2 right-2 hover:cursor-pointer text-red-500 hover:text-red-300"
          size={20}
          onClick={() => removeLink(index)}
        />
        <div className="absolute top-1 left-[50%] -translate-x-1/2 text-xl">
          <LinkIcon link={getValues(`socialLinks.${index}`)} />
        </div>
      </div>
      <div>
        {errors.socialLinks?.[index] && (
          <span className="text-red-500">
            {errors.socialLinks?.[index]?.message}
          </span>
        )}
      </div>
    </div>
  ));

  return (
    <div className=" flex flex-col bg-white rounded-xl p-4">
      <div className="text-xl h-14">Contact Details</div>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex flex-col gap-4 xl:w-1/2">
          <fieldset className="w-full">
            {emails.length === 0 && (
              <p className="text-center text-red-500">
                {errors.emails?.root?.message}
              </p>
            )}
            {renderEmails}
          </fieldset>
          <div className="flex justify-center xl:justify-start">
            <button
              className="px-10 bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2"
              type="button"
              onClick={() => appendEmail(" ")}>
              <FaEnvelope /> add Email
            </button>
          </div>
        </div>
        <div className="invisible xl:visible xl:w-[2px] mx-[25%] xl:mx-0 border-dashed border-[2px] border-gray-500/40"></div>
        <div className="flex flex-col xl:w-1/2 gap-4">
          <fieldset>
            {phones.length === 0 && (
              <p className="text-center text-red-500">
                {errors.phones?.root?.message}
              </p>
            )}
            {renderPhones}
          </fieldset>
          <div className="flex justify-center xl:justify-end">
            <button
              className="px-10 bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2"
              type="button"
              onClick={() => appendPhone(" ")}>
              <FaPhone /> add Phone
            </button>
          </div>
        </div>
      </div>
      <div className="text-xl mt-10 h-14">Social Links</div>
      <div className="flex flex-col gap-2">
        <fieldset>{renderLinks}</fieldset>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              appendLink(" ");
            }}
            className="px-10 bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2">
            <FaLink /> Add Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;

// helper function
