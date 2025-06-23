import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: #f8f9fa;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
  padding: 16px;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
`;

export const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ConversationItem = styled.div`
  padding: 8px 12px;
  background-color: #f1f3f5;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

export const ChatHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 12px;
`;

export const MessageItem = styled.div<{ isOwn: boolean }>`
  align-self: ${({ isOwn }) => (isOwn ? "flex-end" : "flex-start")};
  background-color: ${({ isOwn }) => (isOwn ? "#d0ebff" : "#dee2e6")};
  color: #212529;
  padding: 8px 12px;
  border-radius: 12px;
  margin-bottom: 6px;
  max-width: 70%;
  word-wrap: break-word;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const SendButton = styled.button`
  padding: 8px 16px;
  background-color: #228be6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #1c7ed6;
  }
`;
