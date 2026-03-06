import { render, screen } from "@testing-library/react";
import Column from "../containers/Column";
import { it } from "vitest";

describe("Column component", () => {

  const tasks = [
    { id: "1", content: "Task A", column: "TO_DO" },
    { id: "2", content: "Task B", column: "IN_PROGRESS" }
  ];

  it("renders tasks belonging to the column", () => {
    render(
      <Column
        columnName="TO_DO"
        tasks={tasks}
        handleDragStart={() => {}}
        handleDragOver={() => {}}
        handleDrop={() => {}}
        removeTask={() => {}}
      />
    );

    expect(screen.getByText("Task A")).toBeInTheDocument();
  });

  it("renders the count of tasks in the column", () => {
    render(
      <Column
        columnName="TO_DO"
        tasks={tasks}
        handleDragStart={() => {}}
        handleDragOver={() => {}}
        handleDrop={() => {}}
        removeTask={() => {}}
      />
    );

    const taskCounter = screen.getByLabelText("Column count");

    expect(taskCounter).toBeInTheDocument();
    expect(taskCounter).toHaveTextContent(1);
  });

});
