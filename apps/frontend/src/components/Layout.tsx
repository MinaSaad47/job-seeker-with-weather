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
    <div className="w-screen h-screen flex flex-col">
      <div className="text-white sticky top-0 h-20">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
