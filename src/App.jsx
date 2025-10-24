import { useState } from 'react'
import './App.css'

function App() {
  const [columns, setColumns] = useState({  //react Hook to add a state variable to your component
    //<-1-> to define the initial state for the Boxes
    todo: {
      name: "To Do",
      items: [
        {id: "1", content: "Market Research"},
        {id: "2", content: "Write Projects"}
      ]
    },
    inProgress: {
      name: "To Do",
      items: [
        {id: "3", content: "Design UI mockups"}
      ]
    },
    done: {
      name: "To Do",
      items: [
        {id: "4", content: "Set up repository"}
      ]
    }
  })
  //<-2-> create the rest of the state variables (3 (drag&drop, delete, add))
  //to keep track of new created tasks
  const [newTask, setNewTask] = useState("");
  //to save the decision in which box the task will be in
  const [activeColumns, setActiveColumns] = useState("todo");
  //to keep track of which task is currently being dragged over
  const [draggedItem, setDraggedItem] = useState(null);

  /* Creating a task basically means
     creating an items[{}] object
     and pushing it to a Column/Box.Obj.item */
  //<-3-> create Functions. First add & remove Task
  const addNewTask = () => {
    //base case
    if(newTask.trim() === "") return;

    //push the newly created object + previousState/originalObjects
    const updatedColumns = {...columns}; //to not deal with the original array
    updatedColumns[activeColumns].items.push({
      id: Date.now().toString(),
      content: newTask,
    });

    //after pushing the newTask to the column we Update the State
    setColumns(updatedColumns);
    //to clear the input
    setNewTask("");
  }

  const removeTask = (columnId, taskId) => {
    const updatedColumns = {...columns};

    //to remove an item we'll filter the columns stateVar
    updatedColumns[columnId].items = updatedColumns[columnId].items.
      filter(item => item.id !== taskId); //to get all except the one to delete
    
    setColumns(updatedColumns); //to update the state
  }

  //<-4-> create Functions. second Drag&Drop functionality (3 funcs: handleDragStart, handleDragOver, handleDrop)
  //to keep track of which item is being dragged
  const handleDragStart = (columnId, taskId) => {
    setDraggedItem({columnId, item});
  }
  const handleDragOver = (e) => {
    //because by default html doesnt allow drag&drop of elements
    e.preventDefault();
  }
  const handleDrop = (e, columnId) => {
    e.preventDefault(); //to prevent the default html behaviour

    if(!draggedItem) return;  //Base Case: no draggedElem return nothing

    //extract the information of the draggedElement (like: original column, id)
    const {columnId: sourceColumnId, item} = draggedItem;

    //to not get a duplicate task if you drag&drop it in the same box
    if(sourceColumnId === columnId) return;

    //Logic for dropping the item in a different box: means removing from one box and adding it to another
    const updatedColumns = {...columns};
    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId]
    .items.filter(i => i.id !== item.id);

    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns); //update the columns
    setDraggedItem(null); //reset the state of draggedItem
  }

  //<-5-> Create the UI. Create the column styles
  const columnStyles = {
    todo: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400",
      border: "border-blue-400",
    },
    inProgress: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      border: "border-yellow-400",
    },
    done: {
      header: "bg-gradient-to-r from-green-600 to-green-400",
      border: "border-green-400",
    }
  }


  return (
    <>
      <div className="p-6 w-full min-h-screen bg-gradient-to-b
        from-zinc-900 to-zinc-800 flex items-center justify-center">

        {/* Container for the KanbanBoard */}
        <div className="flex items-center justify-center flex-col
          gap-4 w-full mas-w-6xl">
          <h1 className="text-6xl font-bold mb-8 text-transparent
          bg-clip-text bg-gradient-to-r from-yellow-400
          via-amber-500 to-rose-400">React Kanban Board</h1>

          {/* Container for Input section */}
          <div className="mb-8 flex w-full max-w-lg shadow-lg
            rounded-lg overflow-hidden">
            <input
              type="text"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow p-3 bg-zinc-700 text-white"
              onKeyDown={e => e.key === "Enter" && addNewTask()} //personalFunc: add new task if hit 'Enter' on keyboard
            />

            <select
              value={activeColumns}
              onChange={e => setActiveColumns(e.target.value)}
              className="p-3 gb-zinc-700 text-white border-0 border-l
              border-zinc-600"
            >
              {Object.keys(columns).map(columnId => (
                <option value={columnId} key={columnId}>
                  {columns[columnId].name}
                </option>
              ))}
            </select>

            <button
              onClick={addNewTask}
              className="px-6 bg-gradient-to-r from-yellow-600 to-amber-500
                text-white font-medium hover:from-yellow-500 to-amber-400
                transition-all duration-200 cursor-pointer"
            >Add</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
