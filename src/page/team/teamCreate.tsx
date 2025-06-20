import {
  PageWrapper,
  Title,
  Description,
  StepWrapper,
  StepIndicator,
  Step,
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  AvatarUpload,
  TipBox,
  NextButton,
  PrevButton,
  Slide,
  SlidesContainer,
  SliderViewport,
} from "./teamCreateStyled";
import { Info } from "lucide-react";
import { useState } from "react";

const CreateTeamPage = () => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [step, setStep] = useState(0);

  const handleNextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleSubmit = () => {
    const payload = { teamName, description, department };
    console.log("Submitting:", payload);
    setStep(3);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <FormGroup>
              <Label>팀 이름</Label>
              <Input
                placeholder="팀 이름을 입력하세요"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>팀 설명</Label>
              <Textarea
                rows={3}
                placeholder="팀에 대한 간략한 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>부서</Label>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">부서 선택</option>
                <option value="engineering">엔지니어링</option>
                <option value="design">디자인</option>
                <option value="marketing">마케팅</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>팀 아바타</Label>
              <AvatarUpload>
                <span>이미지 업로드</span>
              </AvatarUpload>
            </FormGroup>

            <TipBox>
              <Info size={20} />
              <span>
                <strong>팀 정보 작성 팁</strong>
                <br />
                명확한 팀 이름과 설명은 팀원들이 팀의 목적을 이해하는 데 도움이
                됩니다. 부서를 선택하면 관련 템플릿과 권한이 자동으로
                설정됩니다.
              </span>
            </TipBox>
          </>
        );
      case 1:
        return <Description>팀원 초대 기능은 아직 준비 중입니다.</Description>;
      case 2:
        return (
          <Description>
            검토 및 확인 단계입니다. 입력한 정보를 확인하세요.
          </Description>
        );
      case 3:
        return <Description>팀 생성이 완료되었습니다! 축하합니다.</Description>;
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <Title>새 팀 생성</Title>
      <Description>
        팀 정보를 입력하고 팀원을 초대하여 새로운 팀을 만들어보세요.
      </Description>

      <StepWrapper>
        <StepIndicator>
          {["팀 정보", "팀원 초대", "검토 및 확인", "완료"].map(
            (label, idx) => (
              <Step
                key={idx}
                active={idx === step}
                onClick={() => setStep(idx)}
                style={{ cursor: "pointer" }}
              >
                <div>{idx + 1}</div>
                {label}
              </Step>
            )
          )}
        </StepIndicator>

        <SliderViewport>
          <SlidesContainer step={step}>
            {[0, 1, 2, 3].map((s) => (
              <Slide key={s}>{renderStepContent(s)}</Slide>
            ))}
          </SlidesContainer>
        </SliderViewport>

        {step < 3 && (
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            {step > 0 && (
              <PrevButton onClick={() => setStep((prev) => prev - 1)}>
                이전
              </PrevButton>
            )}
            <NextButton onClick={step === 2 ? handleSubmit : handleNextStep}>
              {step === 2 ? "제출" : "다음"}
            </NextButton>
          </div>
        )}
      </StepWrapper>
    </PageWrapper>
  );
};

export default CreateTeamPage;
