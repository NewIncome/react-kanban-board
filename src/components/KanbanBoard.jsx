import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

export default function KanbanBoard() {
  //We'll have 2 stages in our KanbanBoard, ToDo & Done. 2 cols
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  

  return (
    <>
    <p>Testing text</p>
    <DragDropContext>
      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row"
        }}
      >

        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        {/* Column.id must be a string */}

      </div>
    </DragDropContext>
    </>
  )
}
