import { useFieldArray, useFormContext } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { z } from "zod";
import { ValidateProfile } from "../validations/profile.validation";
import TextField from "./TextField";

const ContactDetails = () => {
  const {
    register,
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

  return (
    <div className="flex flex-col  bg-white rounded-xl p-4">
      <div className="text-xl h-14">Contact Details</div>
      <fieldset className="flex flex-col xl:flex-row gap-4">
        <div className="flex flex-col gap-4 w-1/2">
          <fieldset>
            {errors.emails && (
              <div className="text-red-500">{errors.emails.message}</div>
            )}
            {renderEmails}
          </fieldset>
          <button
            className="mx-[25%] bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2"
            type="button"
            onClick={() => appendEmail(" ")}>
            add Email
          </button>
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <fieldset>
            {errors.phones && (
              <div className="text-red-500">{errors.phones.message}</div>
            )}
            {renderPhones}
          </fieldset>
          <button
            className="mx-[25%] bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2"
            type="button"
            onClick={() => appendPhone(" ")}>
            add Phone
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default ContactDetails;
