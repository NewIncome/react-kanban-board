import { describe, test, expect, vi } from "vitest";
import axios from "axios";
import { getTasks } from "../util/actions";

vi.mock("axios");

describe("API actions", () => {

  test("getTasks returns data from API", async () => {
    const mockTasks = [
      { id: "1", content: "Task A", column: "TO_DO" }
    ];

    axios.get.mockResolvedValue({ data: mockTasks });

    const result = await getTasks();

    expect(result).toEqual(mockTasks);
  });

});
