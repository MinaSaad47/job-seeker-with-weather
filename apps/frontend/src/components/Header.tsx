import { TiHomeOutline, TiWeatherSunny } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";

const Header = () => {
  const { pathname } = useLocation();

  const pages = [
    {
      name: "Home",
      path: "/",
      icon: <TiHomeOutline className="text-xl" />,
    },
    {
      name: "Weather",
      path: "/weather",
      icon: <TiWeatherSunny className="text-xl" />,
    },
  ];

  return (
    <nav className="text-white sticky top-0 h-20 bg-primary flex  items-center px-4">
      <div></div>
      <div className="flex items-center ml-auto mr-10 gap-4">
        {pages.map((page) => (
          <Link
            key={page.name}
            to={page.path}
            className={`flex flex-col gap-2   items-center hover:text-white hover:scale-110 duration-300 ${
              pathname === page.path ? "text-white" : "text-white/50"
            }`}>
            {page.icon}
            {page.name}
          </Link>
        ))}
      </div>
      <div className="h-full p-2">
        <ProfileAvatar />
      </div>
    </nav>
  );
};

export default Header;
