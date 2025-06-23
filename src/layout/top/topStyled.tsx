import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 5%;
  border-bottom: 1px solid #c8c8c8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1%;
  z-index: 200;
`;

export const FSubWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1em;

  h3 {
    margin: 0;
    padding: 0;
  }
`;

export const SideButton = styled.div`
  border-radius: 50%;
  height: 2.5em;
  width: 2.5em;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #e4e4e4;
  }
  svg {
    height: 1.5em;
    width: 1.5em;
  }
`;

export const TopRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  height: 100%;
`;

export const CreateButton = styled.button`
  background: white;
  border: 1px solid #dcdcdc;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  height: 100%;
  cursor: pointer;
`;

export const NotificationIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }

  div {
    position: absolute;
    top: -6px;
    right: -6px;
    background: black;
    color: white;
    font-size: 12px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  top: 36px;
  right: 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 240px;
  padding: 12px;
  z-index: 999;
  max-height: 300px;
  overflow-y: auto;

  div {
    padding: 8px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }

  div:last-child {
    border-bottom: none;
  }
`;
