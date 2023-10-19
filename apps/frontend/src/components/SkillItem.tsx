import React from "react";

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
};

const SkillItem = ({ children, icon, onClick }: Props) => {
  const [showIcon, setShowIcon] = React.useState(false);
  return (
    <span
      className="relative border-4 flex items-center gap-2  rounded-xl p-1 cursor-pointer"
      onMouseEnter={() => setShowIcon(true)}
      onClick={onClick}
      onMouseLeave={() => setShowIcon(false)}>
      <div className="inner">{children}</div>
      <span
        className={`${
          showIcon ? "block" : "hidden"
        } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
        {icon}
      </span>
    </span>
  );
};

export default SkillItem;
