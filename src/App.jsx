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


  return (
    <>
      <div className="App">
        Project starts here!

          (^_^)

      </div>
    </>
  )
}

export default App
