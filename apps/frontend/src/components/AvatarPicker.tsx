import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

type Props = {
  src?: string;
  name: string;
  onChagne: (file: File) => void;
};

/**
 * Renders an AvatarPicker component that allows the user to select and display an avatar image.
 *
 * @param {Props} src - The source URL of the avatar image.
 * @param {Props} name - The name of the avatar.
 * @param {Props} onChagne - A callback function that is called when the avatar image is changed.
 * @return {JSX.Element} The rendered AvatarPicker component.
 */
const AvatarPicker = ({ src, name, onChagne }: Props) => {
  const [avatar, setAvatar] = useState(src);

  useEffect(() => {
    setAvatar(src);
  }, [src]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      setAvatar(reader.result as string);
      onChagne(file);
    };
    reader.readAsDataURL(file);
  };

  const renderAvatar = (avatar && (
    <img src={avatar} className="h-24 w-24 rounded-full" alt="" />
  )) || <RxAvatar className="w-24 h-24" />;

  return (
    <div className="relative h-24 w-24">
      {renderAvatar}
      <div className="absolute group top-0 left-0 w-24 h-24">
        <label
          htmlFor="avatar"
          className="w-24 h-24 bg-white/50 text-white hidden  cursor-pointer group-hover:flex justify-center items-center ">
          <FaEdit className="text-primary" size={30} />
          <input
            type="file"
            accept="image/*"
            name={name}
            id="avatar"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default AvatarPicker;
