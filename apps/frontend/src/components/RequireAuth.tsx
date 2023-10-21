import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  status?: boolean;
  children: JSX.Element;
};

const RequireAuth = ({ children, status = true }: Props) => {
  const token = useSelector((state: any) => state.token.token);

  const location = useLocation();

  if (!token && status) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  } else if (token && !status) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
