import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  status?: boolean;
  children: JSX.Element;
};

const RequireAuth = ({ children, status = true }: Props) => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      const page = location.pathname.split("/").reverse()[0];
      if (!["login", "register"].includes(page))
        toast.warn(`You must be logged in to access the ${page} page`, {
          position: "bottom-center",
        });
    } else if (!status) {
      toast.info("already logged in", { position: "bottom-center" });
    }
  }, [token]);

  if (!token && status) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  } else if (token && !status) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
