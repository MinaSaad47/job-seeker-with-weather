import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  [other: string]: any;
};

const TextField = ({
  type = "text",
  className,
  label,
  register,
  ...other
}: Props) => {
  console.log(register);
  return (
    <label className="flex flex-col gap-2">
      <span>{label}</span>
      <input
        className="rounded border-2 border-gray-300 p-1"
        type={type}
        placeholder={label}
        {...register}
        {...other}
      />
    </label>
  );
};

export default TextField;
