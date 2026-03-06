import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { getTasks, createTask, updateTask, deleteTask } from "../util/actions";

vi.mock("axios");

describe("API actions", () => {

  const mockTask = [
    { id: "1", content: "Task A", column: "TO_DO" }
  ];


  it("returns data from API", async () => {
    axios.get.mockResolvedValue({ data: mockTask });

    const result = await getTasks();

    expect(result).toEqual(mockTask);
  });

  it("calls API to create a task", async () => {
    axios.post.mockResolvedValue({ data: mockTask });

    const result = await createTask(mockTask);

    expect(axios.post).toHaveBeenCalledWith("/tasks", mockTask);
    expect(result).toEqual(mockTask);
  });

  it("calls API to update a task", async () => {
    const updatedTask = { id: "1", content: "Task A", column: "DONE" };
    
    axios.patch.mockResolvedValue({ data: updatedTask });

    const result = await updateTask("1", updatedTask);

    expect(axios.patch).toHaveBeenCalledWith("/tasks/1", updatedTask);
    expect(result).toEqual(updatedTask);
  });

  it("calls API to delete a task", async () => {
    axios.delete.mockResolvedValue({ data: { success: true } });

    const result = await deleteTask("123");

    expect(axios.delete).toHaveBeenCalledWith("/tasks/123");
    expect(result).toEqual({ success: true });
  });

  //Error handling tests
  it("returns empty array if API fails", async () => {
    axios.get.mockRejectedValue(new Error("API error"));

    const result = await getTasks();

    expect(result).toEqual([]);
  });

  it("handles API errors when creating a task", async () => {
    axios.post.mockRejectedValue(new Error("API error"));

    const result = await createTask({ content: "Task" });

    expect(result).toBeNull();
  });

  it("handles API errors when updating a task", async () => {
    axios.patch.mockRejectedValue(new Error("API error"));

    const result = await updateTask("0", { content: "Task" });

    expect(result).toBeNull();
  });

  it("handles API errors when deleting a task", async () => {
    axios.delete.mockRejectedValue(new Error("API error"));

    const result = await deleteTask("0");

    expect(result).toBeNull();
  });

});
