import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const overlayStyles = `fixed inset-0 bg-black opacity-50 ${
    isOpen ? "block" : "hidden"
  }`;
  const modalStyles = `fixed inset-0 flex items-center justify-center  ${
    isOpen ? "block" : "hidden"
  }`;

  return (
    <>
      <div className={overlayStyles} onClick={onClose}></div>
      <div className={modalStyles}>
        <div className="bg-zinc-900 p-4 rounded shadow-lg relative">
          <div
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            <svg
              className="fill-current h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
