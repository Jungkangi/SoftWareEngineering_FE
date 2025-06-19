import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
  z-index: 100;
  transition: width ease 0.3s;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? "15%" : "60px")};
  height: 100%;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 4px #b9b9b9;
  color: white;
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin-top: 1rem;
  flex: 1;
  overflow-y: auto;
`;

export const SidebarMenuItem = styled.li<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  cursor: pointer;

  transition: all ease 0.3s;

  &:hover {
    background-color: #50586c;

    svg {
      color: white;
    }

    span {
      color: white;
    }
  }

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: ${({ isOpen }) => (isOpen ? "1rem" : "0")};
  }

  span {
    display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
    font-size: 0.875rem;
  }
`;

export const SidebarLink = styled(Link)<{ isOpen: boolean }>`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SidebarFooter = styled.div<{ isOpen: boolean }>`
  padding: 0.75rem 1rem;
  box-shadow: 0 -1px 4px #b9b9b9;
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  height: 60px;
  color: black;

  svg {
    width: 20px;
    height: 20px;
    margin-right: ${({ isOpen }) => (isOpen ? "1rem" : "0")};
  }

  span {
    display: ${({ isOpen }) => (isOpen ? "inline" : "none")};
    font-size: 0.875rem;
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
