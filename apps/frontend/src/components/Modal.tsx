import React from "react";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const Modal = ({ children, open, onClose }: Props) => {
  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visable bg-black/20" : "invisible"
      }`}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`relative bg-white rounded-xl shadow p-6 transition-all max-w-[100vw] max-h-[100vh] ${
          open ? "scall-100 opacity-100" : "scale-125 opacity-0"
        }`}>
        <button
          onClick={onClose}
          type="button"
          className=" absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-200 hover:text-gray-600 ">
          <CgClose size={25} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal") as any
  );
};

export default Modal;
