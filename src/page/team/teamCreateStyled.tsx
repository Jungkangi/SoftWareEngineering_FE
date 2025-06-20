import styled from "styled-components";

export const PageWrapper = styled.div`
  position: relative;
  padding: 2rem 2rem;
  background-color: #f9fafb;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const Description = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
`;

export const StepWrapper = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const StepIndicator = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Step = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.875rem;
  overflow: auto;
  color: ${(props) => (props.active ? "#50586c" : "#9ca3af")};
  font-weight: ${(props) => (props.active ? "700" : "500")};

  & > div {
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background-color: ${(props) => (props.active ? "#50586c" : "#e5e7eb")};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.25rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  background-color: white;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  resize: vertical;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  background-color: white;
`;

export const AvatarUpload = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d1d5db;
  padding: 2rem;
  border-radius: 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const TipBox = styled.div`
  margin-top: 2rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #0c4a6e;
  font-size: 0.875rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const NextButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  background-color: #50586c;
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #383d4a;
  }
`;

export const PrevButton = styled(NextButton)`
  background-color: #e5e7eb;
  color: #1f2937;

  &:hover {
    background-color: #d1d5db;
  }
`;

export const SliderViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const SlidesContainer = styled.div<{ step: number }>`
  display: flex;
  transition: transform 0.4s ease;
  transform: translateX(${(props) => `-${props.step * 100}%`});
  width: fit-content;
`;

export const Slide = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 350px;
  overflow-y: auto;
`;
