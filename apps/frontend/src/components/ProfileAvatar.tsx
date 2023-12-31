import { useState } from "react";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken, useGetProfileQuery } from "../store";

const ProfileAvatar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetProfileQuery();

  const handleLogout = () => {
    dispatch(removeToken());
  };

  const renderMenu = menu && (
    <ul
      className="absolute translate-x-1/2 right-20  bg-white shadow-elevation-2 rounded-xl overflow-hidden"
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => setMenu(false)}>
      <li>
        <button
          onClick={() => navigate("/profile")}
          className="hover:scale-110 w-full hover:bg-primary-300 duration-300 bg-primary-400 flex gap-1 items-center justify-center p-2 px-10">
          <CgProfile /> Profile
        </button>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="hover:scale-110 w-full hover:bg-red-300 duration-300 bg-red-500 flex gap-1 justify-center items-center p-2">
          <CgLogOut /> Logout
        </button>
      </li>
    </ul>
  );

  return (
    <div className="relative w-full h-full">
      <img
        src={data?.data?.picture ?? "https://placehold.co/400"}
        alt=""
        className="cursor-pointer w-16 h-16 object-cover rounded-[50%]"
        onMouseEnter={() => setMenu(true)}
        onMouseLeave={() => setMenu(false)}
      />
      {renderMenu}
    </div>
  );
};

export default ProfileAvatar;
