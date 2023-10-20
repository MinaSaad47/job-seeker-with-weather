import {
  FaFacebook,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const LinkIcon = ({ link }: { link: string }) => {
  const icons = {
    github: <FaGithub className="text-gray-800" />,
    linkedin: <FaLinkedin className="text-blue-500" />,
    twitter: <FaTwitter className="text-blue-300" />,
    facebook: <FaFacebook className="text-blue-800" />,
  };

  for (const [key, value] of Object.entries(icons)) {
    if (link.includes(key)) {
      return value;
    }
  }

  return <FaLink />;
};

export default LinkIcon;
