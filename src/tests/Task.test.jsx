import { render, screen } from "@testing-library/react";
import Task from "../components/Task";

describe("Task component", () => {

  const mockTask = {
    id: "1",
    content: "Test task",
    column: "TO_DO"
  }

  test("renders task content", () => {
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

});