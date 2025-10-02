import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import Task from "./components/Task";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [tasksTodo, setTasksTodo] = useState([]);
  const taskInput = useRef();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    setTasksTodo(tasks.filter((task) => !task.done));
    setTasksDone(tasks.filter((task) => task.done));
  }, [tasks]);

  const showSuccess = (msg) => {
    toast.success(msg, { id: "global-toast" });
  };

  const showError = (msg) => {
    toast.error(msg, { id: "global-toast" });
  };

  const checkMatch = () => {
    const taskName = taskInput.current.value.trim();
    if (!taskName) {
      showError("Please enter content to add a task");
      return;
    }

    const isExists = tasks.some((task) => task.taskName.toLowerCase() === taskName.toLowerCase());

    if (isExists) {
      showError("Please enter a non-existent task");
    } else {
      addTask(taskName);
    }
  };

  const addTask = (taskName) => {
    const taskObject = { taskName, done: false };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, taskObject];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    taskInput.current.value = "";
    showSuccess("The task has been added");
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center bg-[#0D0714] p-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#333", color: "#fff" },
        }}
      />
      <div className="tasks-container container bg-[#1D1825] w-[600px] rounded-[20px] px-[65px] py-[50px]">
        <div className="top-actions flex gap-[15px] w-full">
          <input ref={taskInput} className="w-full border border-[#9E78CF] rounded-[10px] py-2.5 px-4 outline-0" type="search" placeholder="Add a new task" />
          <button onClick={checkMatch} className="bg-[#9E78CF] rounded-[10px] p-2 hover:bg-[#8a5fc2] transition-colors duration-200 cursor-pointer">
            <Plus size={30} />
          </button>
        </div>

        <div className="tasks mt-[60px] overflow-x-hidden overflow-y-scroll max-h-[600px]">
          {tasksTodo.length > 0 && (
            <div className={`tasks-todo ${tasksDone.length > 0 && "mb-[60px]"}`}>
              <h1 className="leading-[100%] tracking-normal mb-4">
                Tasks to do - <span>{tasksTodo.length}</span>
              </h1>
              {tasksTodo.map((task, index) => (
                <Task key={index} taskName={task.taskName} task={task} tasks={tasks} setTasks={setTasks} />
              ))}
            </div>
          )}

          {tasksDone.length > 0 && (
            <div className="tasks-done">
              <h1 className="leading-[100%] tracking-normal mb-4">
                Done - <span>{tasksDone.length}</span>
              </h1>
              {tasksDone.map((task, index) => (
                <Task key={index} taskName={task.taskName} task={task} tasks={tasks} setTasks={setTasks} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
