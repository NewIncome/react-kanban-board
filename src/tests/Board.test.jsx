import { render, screen } from "@testing-library/react";
import Board from "../containers/Board";
import { expect, it } from "vitest";

describe("Board component", () => {

  const mockProps = {
    tasks: [],
    setTasks: () => {},
    loadTasks: () => {},
    error: null,
    draggedItem: null,
    setDraggedItem: () => {}
  };

  it("renders board title", () => {
    render(<Board {...mockProps} />);

    expect(screen.getByText("To Do Board")).toBeInTheDocument();
  });

  it("renders 3 column elements", () => {
    render(<Board {...mockProps} />);

    const columns = screen.getAllByRole("region");

    expect(columns.length).toEqual(3);
  });

  it("renders a textbox with a select dropdown", () => {
    render(<Board {...mockProps} />);

    const options = screen.getAllByRole("option");

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("TO_DO");
    expect(options).toHaveLength(3);
  });

});
