import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <div className="sticky top-0 h-20 bg-primary flex items-center">
      <Link
        to="/weather"
        className={`ml-10 hover:text-white hover:scale-110 duration-300 ${
          pathname === "/weather" ? "text-white" : "text-white/70"
        }`}>
        Weather
      </Link>
    </div>
  );
};

export default Header;
