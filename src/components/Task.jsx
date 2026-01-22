function Task({
  columnId,
  item,
  handleDragStart,
  removeTask
}) {

  return (
    <div
      key={item.id}
      className="p-4 mb-3 bg-zinc-700 text-white
        rounded-lg shadow-md cursor-move flex items-center
        justify-between transform trasnsition-all duration-200
        hover:scale-105 hover:shadow-lg"
      draggable
      onDragStart={() => handleDragStart(columnId, item)}
    >
      <span className="mr-2">{item.content}</span>
      <button
        onClick={() => removeTask(columnId, item.id)}
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
