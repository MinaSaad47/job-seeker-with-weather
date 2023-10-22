import { BiErrorCircle } from "react-icons/bi";
type Props = {
  children: React.ReactNode;
};

const ErrorWidget = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <BiErrorCircle className="text-9xl text-primary" />
      {children}
    </div>
  );
};

export default ErrorWidget;
