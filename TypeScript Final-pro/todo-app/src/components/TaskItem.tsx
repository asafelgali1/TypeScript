import { Task } from "../types";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white rounded-lg shadow-md">
      <span
        className={`cursor-pointer text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}
        onClick={() => onToggle(task.id)}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 font-bold">X</button>
    </div>
  );
};

export default TaskItem;