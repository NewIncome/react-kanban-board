import { render, screen } from "@testing-library/react";
import Board from "../containers/Board";

describe("Board component", () => {

  const tasks = [
    { id: "1", content: "Task A", column: "TO_DO" },
    { id: "2", content: "Task B", column: "DONE" }
  ];

  test("renders kanban board title", () => {

    render(
      <Board
        tasks={tasks}
        setTasks={() => {}}
        loadTasks={() => {}}
        draggedItem={null}
        setDraggedItem={() => {}}
      />
    );

    expect(screen.getByText("To Do Board")).toBeInTheDocument();

  });

});
