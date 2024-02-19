import React from 'react';
import { SortableContext } from "@dnd-kit/core/Sortable";

const ShowTasks = ({tasks,handleShow }) => {
  return (
    <>
        {tasks.map((task) => (
        <div className="task" key={task.task}>
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              value={task.task}
              onChange={(e) => {
                handleShow(e,task);
              }}
              checked={false}
            />
            <label className="form-check-label taskLabel">{task.task}</label>
          </div>
        </div>
      ))}
    </>
  )
}

export default ShowTasks