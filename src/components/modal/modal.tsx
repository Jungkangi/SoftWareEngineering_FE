import React from "react";
import ReactDOM from "react-dom";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  Contents,
} from "./modalStyled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Contents>{children}</Contents>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default Modal;
