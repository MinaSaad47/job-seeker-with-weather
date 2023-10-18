import { ImSpinner2 } from "react-icons/im";

const Spinner = ({ text }: { text?: string }) => {
  return (
    <span className="flex items-center justify-center w-fit">
      <ImSpinner2 className={`animate-spin ${text ? "mr-2" : ""}`} size={30} />
      {text}
    </span>
  );
};

export default Spinner;
