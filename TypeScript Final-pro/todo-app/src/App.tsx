import { useState, useEffect } from "react";
import QuoteBox from "./components/QuoteBox";
import TaskItem from "./components/TaskItem";
import { Task } from "./types";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-2xl border border-gray-200">
      <QuoteBox />
      <h1 className="text-3xl font-extrabold my-6 text-center text-gray-800">📌 To-Do List</h1>
      <div className="flex mb-6 gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
          className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
          ➕ Add
        </button>
      </div>
      <div className="flex justify-around my-6">
        <button onClick={() => setFilter("all")} className="p-3 text-gray-700 hover:text-gray-900 bg-gray-200 rounded-lg">📋 כל המשימות</button>
        <button onClick={() => setFilter("completed")} className="p-3 text-green-700 hover:text-green-900 bg-green-200 rounded-lg">✅ משימות שבוצעו</button>
        <button onClick={() => setFilter("incomplete")} className="p-3 text-yellow-700 hover:text-yellow-900 bg-yellow-200 rounded-lg">⏳ משימות שלא הושלמו</button>
      </div>
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))
        ) : (
          <p className="text-center text-gray-500">📭 אין משימות להצגה</p>
        )}
      </div>
    </div>
  );
};

export default App;