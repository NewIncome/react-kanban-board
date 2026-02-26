import { useState } from 'react';
import Column from './Column';
import InputNew from '../components/InputNew';
import { createTask, deleteTask, updateTask } from '../util/actions';


function Board({
  tasks,
  setTasks,
  loadTasks,
  error,
  draggedItem,
  setDraggedItem,
  loading
}) {
  const columns = ['TO_DO','IN_PROGRESS','DONE'];

  const [dragPosition, setDragPosition] = useState(null);


  console.log(' --- At beginning of Board, log tasks: ');
  console.log(tasks);

  //<-2-> create the rest of the state variables (3 (drag&drop, delete, add))
  const [newTask, setNewTask] = useState("");  //to keep track of new created tasks
  const [selectedColumn, setSelectedColumn] = useState("TO_DO");  //to save the decision in which box the task will be in

  /* Creating a task basically means
     creating an items[{}] object
     and pushing it to a Column/Box.Obj.item */

  //<-3-> create Functions. First add & remove Task
  const addNewTask = async () => {
    //base case
    if(newTask.trim() === "") return;

    console.log(' --- in addNewTask(), logprev- tasks: ');
    console.log(tasks);

    //push the newly created object + previousState/originalObjects
    const updatedTasks = [...tasks]; //to not deal with the original array

    const createdTask = await createTask({content: newTask, column: selectedColumn});
    updatedTasks.push(createdTask);
    setTasks(updatedTasks);  //after pushing the newTask to the column we Update the State
    
    setNewTask("");  //to clear the input
  }

  const removeTask = (taskId) => {
    var updatedTasks = [...tasks];

    deleteTask(taskId);
    
    loadTasks(); //to update the state
  }

  //<-4-> create Functions. second Drag&Drop functionality (3 funcs: handleDragStart, handleDragOver, handleDrop)
  const handleDragStart = (columnName, item) => {
    setDraggedItem({columnName, item});  //to keep track of which item is being dragged
  }

  const handleDragOver = (e) => {
    e.preventDefault();  //because by default html doesnt allow drag&drop of elements
  }

  const handleDrop = (e, columnName) => {
    e.preventDefault(); //to prevent the default html behaviour

    if(!draggedItem) return;  //Base Case: no draggedElem return nothing

    const {column: sourceColumnName, item} = draggedItem;  //extract the information of the draggedElement (like: original column, id)
    if(sourceColumnName === columnName) return;  //to not get a duplicate task if you drag&drop it in the same box

    moveTask(item, columnName);
    callUpdateTask(item.id, {content: item.content, column: columnName});

    setDraggedItem(null); //reset the state of draggedItem
  }

  const moveTask = (item, columnName) => {
    //Logic for dropping the item in a different box: means modifying the column value of the Task
    var updatedTasks = [...tasks];
    updatedTasks = updatedTasks.filter(i => i.id !== item.id);

    item.column = columnName;
    updatedTasks.push(item);

    setTasks(updatedTasks); //update the columns
  }

  async function callUpdateTask(id, data) {
    console.log(' - Inside callUpdateTask - data:');
    console.log(data);
    console.log(data.column);
    // snippet to avoid glitch like view in loading icon
    let timeoutId;
    timeoutId = setTimeout(() => {
      setLoading(true);
    }, 600); // delayed spinner

    try {
      await updateTask(id, {id: null, content: (data.content || ""), column: (data.column || "")});
    } catch(err) {
      console.log(' --- Failed updateTask() --- ');
      console.log(err);
      
      loadTasks(); // rollback
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  // *** Handle touch controls ***
  const handleTouchStart = (columnName, item, e) => {
    setDraggedItem({ columnName, item });
  };

  const handleTouchEnd = (e) => {
    if (!draggedItem) return;

    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );

    if (!element) return;

    const columnElement = element.closest("[data-column]");
    if (!columnElement) return;

    const targetColumn = columnElement.dataset.column;

    if (targetColumn) {
      handleDrop(e, targetColumn);
    }
  };

  // Add visual drag
  const handleTouchMove = (e) => {
    if (!draggedItem) return;

    const touch = e.touches[0];

    setDragPosition({
      x: touch.clientX,
      y: touch.clientY
    });
  };


  return (
    <>
      {loading && (
        
        <div className="Loading relative top-20 left-20 flex space-x-1">
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-gray-100 rounded-full animate-bounce" />
        </div>
        
      )}

      <div className="p-6 w-full min-h-screen bg-gradient-to-b
        from-zinc-900 to-zinc-800 flex items-center justify-center">

        {/* Container for the KanbanBoard */}
        <div className="flex items-center justify-center flex-col
          gap-4 w-full max-w-6xl mb-4">
          <h1 className="text-6xl font-bold mb-8 text-transparent
          bg-clip-text bg-gradient-to-r from-yellow-400
          via-amber-500 to-rose-400">To Do Board</h1>

          <InputNew
            newTask={newTask}
            setNewTask={setNewTask}
            addNewTask={addNewTask}
            columns={columns}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
          />
          
          {/* <div className="flex gap-6 overflow-x-auto pb-6 w-full"> */}
          <div className="w-full grid gap-6 pb- grid-cols-1 sm:grid-cols-2
                        lg:flex lg:overflow-x-auto">
            {columns.map(columnName => (

              <Column
                columnName={columnName}
                tasks={tasks}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                removeTask={removeTask}
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd}
                handleTouchMove={handleTouchMove}
                draggedItem={draggedItem}
              />

            ))}
          </div>

        </div>
      </div>

      {draggedItem && dragPosition && (
        <div
          className="fixed pointer-events-none z-50 bg-zinc-700 p-3 rounded shadow-xl"
          style={{
            top: dragPosition.y - 20,
            left: dragPosition.x - 50,
          }}
        >
          {draggedItem.item.content}
        </div>
      )}

    </>
  )
}

export default Board;
