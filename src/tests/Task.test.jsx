import { fireEvent, render, screen } from "@testing-library/react";
import Task from "../components/Task";
import { it, vi } from "vitest";

describe("Task component", () => {

  const mockTask = {
    id: "1",
    content: "Test task",
    column: "TO_DO"
  }

  it("renders task content", () => {
    render(
      <Task
        task={mockTask}
        columnName="TO_DO"
        handleDragStart={() => {}}
        removeTask={() => {}}
      />
    );

    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  it("calls removeTask when delete button is clicked", () => {
    const mockRemoveTask = vi.fn();

    render(
      <Task
        task={mockTask}
        columnName={"TO_DO"}
        handleDragStart={() => {}}
        removeTask={mockRemoveTask}
      />
    );

    const deleteButton = screen.getByRole("button", {name: /delete task/i});

    fireEvent.click(deleteButton);

    expect(mockRemoveTask).toHaveBeenCalledTimes(1);
    expect(mockRemoveTask).toHaveBeenCalledWith(mockTask.id);
  });

});