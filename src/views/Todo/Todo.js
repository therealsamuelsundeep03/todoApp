import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import Nav from "../../components/Nav";
import ShowTasks from "../../components/ShowTasks";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/Modal";
import Chart from "../../components/Chart";
import "./Todo.css";

const Todo = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState("");
  const [deletetask, setDeleteTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [taskExists, setTaskExists] = useState(false);

  const navigate = useNavigate();
  // get the user from use auth hook
  const user = useAuth();

  const fetchData = async () => {
    try {
      if (user) {
        // fetching the tasks from the backend
        const { data } = await axios.get(`/todo/${user}`);
        setTasks(data.tasks);
      }
    } catch (error) {
      if (
        error?.response?.data?.message === "Please login again" ||
        error?.response?.status === 500
      ) {
        alert("please login again");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // handle the form input
  const handleChange = ({ target: { value, checked } }) => {
    setError("");
    setTask(value, checked);
  };

  // function to control modal
  const handleShow = (e, task) => {
    setShow((prev) => !prev);
    !show ? setDeleteTask(task) : setDeleteTask({});
  };

  // remove the task from the tasks 
  const handleCheck = async (task) => {
    try {
      const { data } = await axios.delete(`/todo/${user}/${task.task}`);
      if (data.status) {
        const removeTask = tasks.filter((list) => list.task !== task.task);
        setTasks(removeTask);
        setShow(!show);
      }
    } catch (error) {
      if (error?.response?.data.message === "Todo item not found") {
        setError("Todo item not found");
      } else if (error?.response?.data.message === "Please login again") {
        alert("Please login again");
        navigate("/login");
      } else {
        setError("Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // lastest tasks will be added to the top of the list
  // adding the tasks to the database
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!task?.length) return setError("Task is Required");
      const isTaskExists = tasks.some((t) => t.task === task);
      // if the task is not in the list add the task to the databse or display modal
      if (!isTaskExists) {
        const { data } = await axios.post("/todo", {
          task,
          user,
        });
        if (data.status) {
          const addTasks = tasks;
          addTasks.unshift({ task });
          setTasks(addTasks);
        }
      } else {
        setTaskExists(true);
      }
      setTask("");
    } catch (error) {
      if (error.response.data.message === "Task is Required") {
        setError("Task is required");
      } else if (error?.response?.data.message === "Please login again") {
        alert("Please login again");
        navigate("/login");
      } else {
        setError("Please try again");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
   <>
   <Nav />
    <div className="todo-container">
      <div className="todo">
        {/* form to add a task */}
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Task Name"
              onChange={handleChange}
              value={task}
            />
            <button
              className="input-group-text submit"
              type="submit"
              id="basic-addon2"
              disabled={loading}
            >
              Submit
            </button>
          </div>
          <div className="errorMessage">{error}</div>
        </form>

        {/* Component to display tasks */}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : tasks?.length ? (
          <div className="tasks">
            <ShowTasks
              setTasks={setTasks}
              tasks={tasks}
              handleShow={handleShow}
              setDeleteTask={setDeleteTask}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {/* modal to confirm that the task is completed */}
      <Modal
        show={show}
        modalHead={"Delete Message"}
        modalBody={"Have you completed the task?"}
        modalButton={"Yes"}
        handleShow={handleShow}
        handleCheck={handleCheck}
        deletetask={deletetask}
      />
      {/* modal to display that the user has already added the task to the task list */}
      {taskExists && (
        <Modal
          show={show}
          modalHead={"Alert Message"}
          modalBody={"Task already exists"}
          modalButton={"ok"}
          handleShow={handleShow}
          taskExists={taskExists}
          setTaskExists={setTaskExists}
        />
      )}
    </div>
    <Chart />
    </>
  );
};

export default Todo;
