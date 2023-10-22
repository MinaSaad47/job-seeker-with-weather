import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  status?: boolean;
  children: JSX.Element;
};

/**
 * Component that checks if the user is authenticated and redirects accordingly.
 *
 * @param {React.ReactNode} children - The children components to render if the user is authenticated.
 * @param {boolean} status - The authentication status. Defaults to true (redirect to home if false and user is authenticated).
 * @returns {React.ReactNode} - The children components or a redirect component.
 */
const RequireAuth = ({ children, status = true }: Props) => {
  const token = useSelector((state: any) => state.token.token);

  const location = useLocation();

  // Check the authentication status and redirect accordingly
  if (!token && status) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  } else if (token && !status) {
    // Redirect to the home page if the user is authenticated but authentication is not required
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
