import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../Pages/LoadingPage";
import { useGetProfileQuery } from "../store";
import Header from "./Header";
import { toast } from "react-toastify";

const Layout = () => {
  const navigate = useNavigate()

  const { isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingPage />;
  } else if (error && (error as any).status === 404) {
    toast.warning("you need to complete your profile before proceeding", { position: "bottom-center" });
    navigate("/profile");
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
