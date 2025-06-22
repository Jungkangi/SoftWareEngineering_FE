import React, { useState } from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  FormGrid,
  FormGroup,
  FormRow,
  Label,
  Input,
  Textarea,
  SelectContainer,
  SelectTriggerContainer,
  SelectValue,
  SelectContent,
  SelectItem,
  DialogFooter,
  Button,
} from "./projectStyled";

// api 호출
import { createProjectAsPM } from "../../hooks/project/newProjectData";

interface CreateProjectFormProps {
  onClose: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Web Development");
  const [Description, setDescription] = useState("");
  const [showPrioritySelect, setShowPrioritySelect] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create new project</DialogTitle>
        <DialogDescription>
          Fill in the details below to create a new project for your team.
        </DialogDescription>
      </DialogHeader>
      <FormGrid>
        <FormGroup>
          <Label htmlFor="project-name">Project name</Label>
          <Input
            id="project-name"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="project-description">Description</Label>
          <Textarea
            id="project-description"
            placeholder="Enter project description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormRow>
          <FormGroup>
            <Label htmlFor="priority">Priority</Label>
            <SelectContainer>
              <SelectTriggerContainer
                onClick={() => setShowPrioritySelect(!showPrioritySelect)}
              >
                <SelectValue>{priority}</SelectValue>
              </SelectTriggerContainer>
              {showPrioritySelect && (
                <SelectContent>
                  {["High", "Medium", "Low"].map((p) => (
                    <SelectItem
                      key={p}
                      onClick={() => {
                        setPriority(p);
                        setShowPrioritySelect(false);
                      }}
                    >
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </SelectContainer>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <SelectContainer>
              <SelectTriggerContainer
                onClick={() => setShowCategorySelect(!showCategorySelect)}
              >
                <SelectValue>{category}</SelectValue>
              </SelectTriggerContainer>
              {showCategorySelect && (
                <SelectContent>
                  {[
                    "Web Development",
                    "Mobile Development",
                    "Backend Development",
                    "Research",
                    "Infrastructure",
                  ].map((c) => (
                    <SelectItem
                      key={c}
                      onClick={() => {
                        setCategory(c);
                        setShowCategorySelect(false);
                      }}
                    >
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
            </SelectContainer>
          </FormGroup>
        </FormRow>
        <FormGroup>
          <Label htmlFor="due-date">Due date</Label>
          <Input type="date" id="due-date" />
        </FormGroup>
      </FormGrid>
      <DialogFooter>
        <Button
          type="button"
          onClick={async () => {
            try {
              const payload = {
                P_NAME: projectName,
                P_STATUS: "IN_PROGRESS",
                DISCRIPTION: Description || "",
                PRIORITY: priority,
                CATEGORY:
                  category && category.trim() !== ""
                    ? category
                    : "Uncategorized",
              };
              await createProjectAsPM(payload);
              onClose();
            } catch (error) {
              console.error("Failed to create project:", error);
            }
          }}
        >
          Create Project
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
};

export default CreateProjectForm;
