import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f0f2f5;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LinkWraper = styled(Link)`
  width: fit-content;
  margin-left: 10%;
  margin-bottom: 1em;
  align-self: flex-start;

  svg {
    scale: 1.5;
  }
`;
export const Container = styled.div`
  position: relative;
  display: flex;
  width: 80%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: fit-content;
`;

export const ZeroLeft = styled.div<{ authMode: string }>`
  width: ${({ authMode }) => (authMode === "login" ? "0" : "50%")};
  transition: width 0.3s ease, padding 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ authMode }) => (authMode === "login" ? "0" : "4rem 3rem")};

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-top: 5%;
  }
`;

export const Left = styled.div<{ authMode: string }>`
  flex: 1;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  transition: margin-left 0.3s ease;
`;

export const Right = styled.div<{ authMode: string }>`
  width: ${({ authMode }) => (authMode === "login" ? "50%" : "0")};
  transition: width 0.3s ease, padding 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ authMode }) => (authMode === "login" ? "4rem 3rem" : "0")};

  overflow: hidden;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const SocialButton = styled.button<{ provider: "google" | "apple" }>`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

export const Separator = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  color: #999;
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #e0e0e0;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const ForgotPasswordWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 0.5rem;
  gap: 1rem;
`;

export const ForgotLink = styled.button`
  align-self: flex-end;
  font-size: 0.85rem;
  color: #6c63ff;
  text-decoration: none;
  margin-bottom: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  background: linear-gradient(90deg, #6c63ff 0%, #4a47f5 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  &:hover {
    opacity: 0.9;
  }
`;
