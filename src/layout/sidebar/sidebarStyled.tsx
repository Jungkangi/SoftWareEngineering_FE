import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
  transition: all ease 0.3s;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? "15%" : "3em")};
  height: 100%;
  overflow: hidden;
  background: #d8d7d7;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #c8c8c8;
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  width: 100%;
  height: 40%;
  padding: 0;
  margin-top: 10em;
  display: flex;
  justify-content: space-between;
  align-items: left;
  flex-direction: column;
`;

export const SidebarMenuItem = styled.li<{ isOpen: boolean }>`
  padding: ${({ isOpen }) => (isOpen ? "1rem 1rem 1rem 2rem" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3a3a3a;
  font-weight: 500;
  width: 100%;
  height: 15%;
  cursor: pointer;
  transition: background-color ease 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    margin-right: ${({ isOpen }) => (isOpen ? "1em" : "0")};
  }

  span {
    display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
  }
`;

export const SidebarLink = styled(Link)<{ isOpen: boolean }>`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "left" : "center")};
`;

export const SidebarFooter = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  padding: ${({ isOpen }) => (isOpen ? "1rem 1rem 1rem 2rem" : "0")};
  border-top: 1px solid #c8c8c8;
  display: flex;
  width: 100%;
  height: 5rem;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "left" : "center")};
  svg {
    background-color: #eeeeee;
    border-radius: 50%;
    margin-right: ${({ isOpen }) => (isOpen ? "1em" : "0")};
    height: 1.5em;
    width: 1.5em;
  }
  span {
    display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
  }
`;

export const SidebarIcon = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.75rem;
`;
