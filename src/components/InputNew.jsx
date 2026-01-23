import { convertName } from '../util';


function InputNew({newTask, setNewTask, addNewTask, columns, activeColumns, setActiveColumns}) {
  return (
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
              className="p-3 bg-zinc-700 text-white border-0 border-l
              border-zinc-600"
            >
              {columns.map(colName => (
                <option value={colName} key={colName}>
                  {convertName(colName)}
                </option>
              ))}
            </select>

            <button
              onClick={addNewTask}
              className="px-6 bg-gradient-to-r from-yellow-600 to-amber-500
                text-white font-medium hover:from-yellow-500 hover:to-amber-500
                transition-all duration-200 cursor-pointer !rounded-l-none"
            >Add</button>
          </div>
  );
}

export default InputNew;
