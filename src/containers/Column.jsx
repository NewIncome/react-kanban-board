import Task from '../components/Task';
import { convertName } from '../util';


function Column({
  columnName,
  tasks,
  handleDragStart,
  handleDragOver,
  handleDrop,
  removeTask,
  handleTouchStart,
  handleTouchEnd,
  handleTouchMove,
  draggedItem
}) {

  //<-5-> Create the UI. Create the column styles
  /* to switch for each box when you move the task between boxes */
  const columnStyles = {
    TO_DO: {
      header: "bg-gradient-to-r from-blue-600 to-blue-400",
      border: "border-blue-400",
    },
    IN_PROGRESS: {
      header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
      border: "border-yellow-400",
    },
    DONE: {
      header: "bg-gradient-to-r from-green-600 to-green-400",
      border: "border-green-400",
    }
  };

  const columnItems = tasks.filter(e => e.column === columnName);
  

  return (
    <div
      role="region"
      key={columnName}
      /* //===---prev styles---=== className={`Column flex-shrink-0 w-80 bg-zinc-800 rounded-lg
        shadow-xl border-t-4 ${columnStyles[columnName].border}`}//for Dynamic Styling */
      className={`Column w-full sm:w-full lg:w-80 flex-shrink-0 bg-zinc-800
                  rounded-lg shadow-xl border-t-4 ${columnStyles[columnName].border}`}
      onDragOver={e => handleDragOver(e, columnName)}
      onDrop={e => handleDrop(e, columnName)}
      data-column={columnName}
    >
      {/* div for the COLumnHeader */}
      <div
        className={`p-4 text-white font-bold text-xl
          rounded-t-m ${columnStyles[columnName].header}`}
      >
        {convertName(columnName)}
        <span className="ml-2 px-2 py-1 bg-zinc-800
        bg-opacity-30 rounded-full text-sm" aria-label='Column count'>
          {columnItems.length}
        </span>
      </div>

        {/* Div to yield Tasks */}
      <div id="TasksContainer" className="p-3 min-h-64">
        {columnItems.length === 0 ? (
            // div for empty-col/no-tasks
            <div className="text-center py-10 text-zinc-500
              italic text-sm">Drop tasks here</div>
          ) : (
            // to map-create the Tasks
            columnItems.map(task => (

              <Task
                columnName={columnName}
                task={task}
                handleDragStart={handleDragStart}
                removeTask={removeTask}
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd}
                handleTouchMove={handleTouchMove}
                draggedItem={draggedItem}
              />
            
            ))
          )
        }

      </div>

    </div>      
  );
}

export default Column;
