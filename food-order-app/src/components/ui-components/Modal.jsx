import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  open,
  close,
  className = "",
  onClose = () => {},
}) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    const handleClose = () => onClose();

    modal.addEventListener("close", handleClose);

    // Cleanup the event listener when the component unmounts or dependencies change
    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [open, onClose]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={close}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
