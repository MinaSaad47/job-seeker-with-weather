import { Outlet } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import { useGetProfileQuery } from "../store";
import Header from "./Header";

const Layout = () => {
  const { isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
