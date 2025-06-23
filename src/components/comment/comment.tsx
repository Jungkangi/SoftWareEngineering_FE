import React, { useState } from "react";
import {
  CommentWrapper,
  Header,
  CommentList,
  InputArea,
  Input,
  SubmitButton,
} from "./commentStyled";

export type CommentType = {
  id: number;
  author: string;
  content: string;
  createdAt: string;
};

export function CommentBox({
  comments,
  onAdd,
  inputPlaceholder = "이 프로젝트에 댓글을 남겨보세요!",
}: {
  comments: CommentType[];
  onAdd: (content: string) => void;
  inputPlaceholder?: string;
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input);
      setInput("");
    }
  };

  return (
    <CommentWrapper>
      <Header>댓글</Header>
      <CommentList>
        {comments.length === 0
          ? "아직 댓글이 없습니다."
          : comments.map((c) => <div key={c.id}>{c.content}</div>)}
      </CommentList>
      <InputArea>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
        />
        <SubmitButton onClick={handleAdd} disabled={!input.trim()}>
          등록
        </SubmitButton>
      </InputArea>
    </CommentWrapper>
  );
}
