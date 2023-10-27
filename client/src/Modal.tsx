import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }: PropsWithChildren) =>
  ReactDOM.createPortal(
    <div className="screen">
      <div className="modal">{children}</div>
    </div>,
    document.getElementById("modal-root")!
  );

export default Modal;
