import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  [other: string]: any;
};

/**
 * Generates a text field component.
 *
 * @param {string} type - The type of the input field. Default is "text".
 * @param {string} className - The CSS class name for the component.
 * @param {string} label - The label text for the text field.
 * @param {object} register - The data register object.
 * @param {object} other - Additional props for the input field.
 * @return {JSX.Element} The text field component.
 */
const TextField = ({
  type = "text",
  className,
  label,
  register,
  ...other
}: Props) => {
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
