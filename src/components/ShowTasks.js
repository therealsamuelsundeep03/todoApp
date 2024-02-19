import React, { useRef } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const ShowTasks = ({ tasks, handleShow, setTasks }) => {
  const user = useAuth();
  const dragTask = useRef(0);
  const dragAnotherTask = useRef(0);
  const handleSort = async() => {
    const tasksArr = [...tasks];
    const temp = tasksArr[dragTask.current];
    tasksArr[dragTask.current] = tasksArr[dragAnotherTask.current];
    tasksArr[dragAnotherTask.current] = temp;
    setTasks(tasksArr);
    const { data } = await axios.put('/todo/',{user, newTasks: tasksArr});
    console.log(data);
  }
  return (
    <>
      {tasks.map((task, index) => (
        <div
          className="task"
          key={task.task}
          draggable
          onDragStart={() => (dragTask.current = index)}
          onDragEnter={() => (dragAnotherTask.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              value={task.task}
              onChange={(e) => {
                handleShow(e, task);
              }}
              checked={false}
            />
            <label className="form-check-label taskLabel">{task.task}</label>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowTasks;
