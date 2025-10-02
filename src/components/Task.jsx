import { Check } from "lucide-react";
import { Trash } from "lucide-react";

export default function Task({ taskName, task, tasks, setTasks }) {
  const convertTaskToDone = (taskName) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => (task.taskName === taskName ? { ...task, done: true } : task));
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const deleteTask = (taskName) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.taskName !== taskName);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="task bg-[#15101C] p-[22px] rounded-[10px] w-full flex justify-between items-center mb-4">
      <h2 className={`${task.done ? "text-[#78CFB0] line-through" : "text-[#9E78CF]"} leading-[100%] tracking-normal`}>{taskName}</h2>
      <div className="task-actions flex gap-4 items-center">
        {!task.done && (
          <button onClick={() => convertTaskToDone(taskName)} className="cursor-pointer">
            <Check size={22} color="#9E78CF" />
          </button>
        )}
        <button onClick={() => deleteTask(taskName)} className="cursor-pointer">
          <Trash size={22} color={`${!task.done ? "#9E78CF" : "#78CFB0"}`} />
        </button>
      </div>
    </div>
  );
}
