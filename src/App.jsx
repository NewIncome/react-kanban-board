import { useState } from 'react'
import './App.css'
import Column from './containers/Column'
import InputNew from './components/InputNew';


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
      name: "In Progress",
      items: [
        {id: "3", content: "Design UI mockups"}
      ]
    },
    done: {
      name: "Done",
      items: [
        {id: "4", content: "Set up repository"}
      ]
    }
  });

  //<-2-> create the rest of the state variables (3 (drag&drop, delete, add))
  const [newTask, setNewTask] = useState("");  //to keep track of new created tasks
  
  const [activeColumns, setActiveColumns] = useState("todo");  //to save the decision in which box the task will be in
  
  const [draggedItem, setDraggedItem] = useState(null);  //to keep track of which task is currently being dragged over

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

    setColumns(updatedColumns);  //after pushing the newTask to the column we Update the State
    
    setNewTask("");  //to clear the input
  }

  const removeTask = (columnId, taskId) => {
    const updatedColumns = {...columns};

    //to remove an item we'll filter the columns stateVar
    updatedColumns[columnId].items = updatedColumns[columnId].items.
      filter(item => item.id !== taskId); //to get all except the one to delete
    
    setColumns(updatedColumns); //to update the state
  }

  //<-4-> create Functions. second Drag&Drop functionality (3 funcs: handleDragStart, handleDragOver, handleDrop)
  const handleDragStart = (columnId, item) => {
    setDraggedItem({columnId, item});  //to keep track of which item is being dragged
  }

  const handleDragOver = (e) => {
    e.preventDefault();  //because by default html doesnt allow drag&drop of elements
  }

  const handleDrop = (e, columnId) => {
    e.preventDefault(); //to prevent the default html behaviour

    if(!draggedItem) return;  //Base Case: no draggedElem return nothing

    const {columnId: sourceColumnId, item} = draggedItem;  //extract the information of the draggedElement (like: original column, id)
    
    if(sourceColumnId === columnId) return;  //to not get a duplicate task if you drag&drop it in the same box

    //Logic for dropping the item in a different box: means removing from one box and adding it to another
    const updatedColumns = {...columns};
    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId]
                                              .items.filter(i => i.id !== item.id);

    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns); //update the columns
    setDraggedItem(null); //reset the state of draggedItem
  }


  return (
    <>
      <div className="p-6 w-full min-h-screen bg-gradient-to-b
        from-zinc-900 to-zinc-800 flex items-center justify-center">

        {/* Container for the KanbanBoard */}
        <div className="flex items-center justify-center flex-col
          gap-4 w-full max-w-6xl">
          <h1 className="text-6xl font-bold mb-8 text-transparent
          bg-clip-text bg-gradient-to-r from-yellow-400
          via-amber-500 to-rose-400">React Kanban Board</h1>

          <InputNew
            newTask={newTask}
            setNewTask={setNewTask}
            addNewTask={addNewTask}
            columns={columns}
            activeColumns={activeColumns}
            setActiveColumns={setActiveColumns}
          />
          
          <div className="flex gap-6 overflow-x-auto pb-6 w-full">
            {Object.keys(columns).map(columnId => (

              <Column
                columnId={columnId}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                columns={columns}
                handleDragStart={handleDragStart}
                removeTask={removeTask}
              />

            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
