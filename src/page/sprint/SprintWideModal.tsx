import React from "react";
import ReactDOM from "react-dom";

interface SprintWideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const contentStyle: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  width: "90vw",
  maxWidth: 900,
  minWidth: 600,
  minHeight: 350,
  maxHeight: "85vh",
  boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
  position: "relative",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
};

const closeBtnStyle: React.CSSProperties = {
  position: "absolute",
  top: 14,
  right: 18,
  background: "none",
  border: "none",
  fontSize: 28,
  cursor: "pointer",
  color: "#333",
  zIndex: 1,
};

const SprintWideModal: React.FC<SprintWideModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default SprintWideModal;
