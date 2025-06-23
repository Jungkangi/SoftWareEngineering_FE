import styled from "styled-components";

export const CommentWrapper = styled.div`
  border: 1px solid #e8eaee;
  box-shadow: 0 0 5px 0px #e5e7eb;
  border-radius: 8px;
  /* background-color: #fafafa; */
  padding: 16px;
  width: 100%;
  height: 30.1em;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 16px;
`;

export const CommentList = styled.div`
  text-align: center;
  color: #999;
  margin-bottom: 16px;
  max-height: 22em;
  overflow-y: auto;
`;

export const InputArea = styled.div`
  display: flex;
  gap: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  padding: 8px 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;
