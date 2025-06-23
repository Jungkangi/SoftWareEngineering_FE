import axios from "axios";

type UpdateSprintPayload = {
  STAT: "TODO" | "PROCESSING" | "REVIEW" | "DONE";
};

export async function putSprint(issueId: number, data: UpdateSprintPayload) {
  try {
    const response = await axios.put(`/sprints/${issueId}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update sprint issue status", error);
    throw error;
  }
}
