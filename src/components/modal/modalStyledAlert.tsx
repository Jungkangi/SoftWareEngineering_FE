import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  padding-right: 2em;
  border-radius: 8px;
  width: fit-content;
  height: fit-content;
  max-width: 95%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 1em;
  top: 5em;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  z-index: 1001;

  &:hover {
    color: #000;
  }
`;

export const Contents = styled.div`
  z-index: 1000;
  display: flex;
  gap: 1em;
  flex-direction: column;
`;
