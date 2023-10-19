import { ErrorMessage } from "@hookform/error-message";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { z } from "zod";
import { ValidateProfile } from "../validations/profile.validation";
import TextField from "./TextField";

const EducationDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<z.infer<typeof ValidateProfile>>();

  const {
    fields: education,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ name: "education" });

  const renderEducation = education.map((_item, index) => (
    <div className="relative w-full xl:w-1/2  p-4" key={index}>
      <div className="flex flex-col border-gray-300 border-2 rounded-xl p-2">
        <h5 className="text-center">Education {index + 1}</h5>
        <TextField
          label="Date"
          type="date"
          register={register(`education.${index}.date`)}
        />
        <ErrorMessage
          errors={errors}
          name={`education.${index}.date`}
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
        <TextField
          label="Major"
          type="text"
          register={register(`education.${index}.major`)}
        />
        <ErrorMessage
          errors={errors}
          name={`education.${index}.major`}
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
        <TextField
          label="Institution"
          type="text"
          register={register(`education.${index}.institution`)}
        />
        <ErrorMessage
          errors={errors}
          name={`education.${index}.institution`}
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
        <TextField
          label="GPA"
          type="number"
          register={register(`education.${index}.gpa`)}
        />
        <ErrorMessage
          errors={errors}
          name={`education.${index}.gpa`}
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
      </div>
      <FaTrash
        className="absolute top-6 right-6 hover:cursor-pointer text-red-500 hover:text-red-300"
        size={20}
        onClick={() => removeEducation(index)}
      />
    </div>
  ));

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
      <div className="text-xl h-14">Education Details</div>
      <fieldset className="flex flex-wrap">{renderEducation}</fieldset>
      <button
        type="button"
        onClick={() => appendEducation({ date: new Date() })}
        className="bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2 mx-[25%]">
        add Education
      </button>
    </div>
  );
};

export default EducationDetails;
