function Task({
  columnName,
  task,
  handleDragStart,
  removeTask,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  draggedItem
}) {

  return (
    <div
      key={task.id}
      className={`p-4 mb-3 bg-zinc-700 text-white
        rounded-lg shadow-md cursor-move flex items-center
        justify-between transform trasnsition-all duration-200
        hover:scale-105 hover:shadow-lg
        ${draggedItem?.item.id === task.id ? "opacity-30" : ""}`}
      draggable
      onDragStart={() => handleDragStart(columnName, task)}
      onTouchStart={(e) => handleTouchStart(columnName, task, e)}
      onTouchMove={handleTouchMove}
      onTouchEnd={(e) => handleTouchEnd(e)}
    >
      <span className="mr-2">{task.content}</span>
      <button
        onClick={() => removeTask(task.id)}
        className="text-zinc-400 hover:text-red-400
          transition-colors duration-200 w-6 h-6 flex
          items-center justify-center rounded-full
          hover:bg-zinc-600"
      >
        <span className="text-lg cursor-pointer">x</span>
      </button>
    </div>
  );
}

export default Task;
