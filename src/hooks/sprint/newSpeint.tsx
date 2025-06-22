import axios from "axios";

interface CreateSprintParams {
  title: string;
  contents: string;
  projectId: number;
  stat?: "PROCESSING" | "COMPLETED" | "PLANNING"; // 기본값: PROCESSING
}

export const createSprint = async ({
  title,
  contents,
  projectId,
  stat = "PROCESSING",
}: CreateSprintParams) => {
  try {
    const response = await axios.post("/sprints/create", {
      TITLE: title,
      CONTENTS: contents,
      P_ID: projectId,
      STAT: stat,
    });

    return response.data;
  } catch (error) {
    console.error("스프린트 생성 실패:", error);
    throw error;
  }
};
