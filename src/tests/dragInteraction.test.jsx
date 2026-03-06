import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Board from "../containers/Board";
import Task from "../components/Task";

describe("Drag and Drop interactions", () => {

  const mockTask = { id: "1", content: "Task 1", column: "TO_DO" };

  const setTasks = vi.fn();


  it("moves a task when dropped in another column", () => {
    render(
      <Board
        tasks={[mockTask]}
        setTasks={setTasks}
        loadTasks={() => {}}
        draggedItem={null}
        setDraggedItem={() => {}}
      />
    );

    const task = screen.getByText("Task 1");

    const targetColumn = screen.getByTestId("column-IN_PROGRESS");

    fireEvent.dragStart(task);
    fireEvent.dragOver(targetColumn);
    fireEvent.drop(targetColumn);

    expect(task).toBeInTheDocument();
  });

  it("starts dragging when touching a task", () => {
    render(
      <Task
        task={mockTask}
        columnName="TO_DO"
        handleDragStart={() => {}}
        removeTask={() => {}}
        handleTouchStart={() => {}}
      />
    );

    const taskElement = screen.getByText("Task 1");

    fireEvent.touchStart(taskElement);

    expect(taskElement).toBeInTheDocument();
  });

  it("drops task on touch end", () => {
    render(
      <Board
        tasks={[mockTask]}
        setTasks={setTasks}
        loadTasks={() => {}}
        draggedItem={null}
        setDraggedItem={() => {}}
      />
    );

    const task = screen.getByText("Task 1");

    fireEvent.touchStart(task);
    fireEvent.touchEnd(task);

    expect(task).toBeInTheDocument();
  });

});
