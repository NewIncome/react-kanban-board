import Task from '../components/Task';


function Column({
  columnId,
  columns,
  handleDragStart,
  handleDragOver,
  handleDrop,
  removeTask
}) {

  //<-5-> Create the UI. Create the column styles
  /* to switch for each box when you move the task between boxes */
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
  };


  return (
    <div
      id="Column"
      key={columnId}
      className={`flex-shrink-0 w-80 bg-zinc-800 rounded-lg
        shadow-xl border-t-4 ${columnStyles[columnId].border}`}//for Dynamic Styling
      onDragOver={e => handleDragOver(e, columnId)}
      onDrop={e => handleDrop(e, columnId)}
    >
      {/* div for the COLumnHeader */}
      <div
        className={`p-4 text-white font-bold text-xl
          rounded-t-m ${columnStyles[columnId].header}`}
      >
        {columns[columnId].name}
        <span className="ml-2 px-2 py-1 bg-zinc-800
        bg-opacity-30 rounded-full text-sm">
          {columns[columnId].items.length}
        </span>
      </div>

        {/* Div to yield Tasks */}
      <div id="TasksContainer" className="p-3 min-h-64">
        {columns[columnId].items.length === 0 ? (
            /* div for empty-col/no-tasks */
            <div className="text-center py-10 text-zinc-500
              italic text-sm">Drop tasks here</div>
          ) : (
            /* to map-create the Tasks */
            columns[columnId].items.map(item => (

              <Task
                columnId={columnId}
                item={item}
                handleDragStart={handleDragStart}
                removeTask={removeTask}
              />
            
            ))
          )
        }

      </div>

    </div>      
  );
}

export default Column;

/*
 State:
 + columns  { todo:
                {name:"", items: [{id:"", content:""}]},
              inProgress, done }
 + newTask
 + activeColumns
 + draggedItem
 
 + columnStyles
*/