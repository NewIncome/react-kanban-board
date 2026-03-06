import { render, screen } from "@testing-library/react";
import Column from "../containers/Column";

describe("Column component", () => {

  const tasks = [
    { id: "1", content: "Task A", column: "TO_DO" },
    { id: "2", content: "Task B", column: "IN_PROGRESS" }
  ];

  test("renders tasks belonging to the column", () => {

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

});
