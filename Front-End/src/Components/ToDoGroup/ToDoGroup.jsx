import styles from "./ToDOGroup.module.css";
import { memo } from "react";
import TasksContainerHandeler from "../TasksContainerHandeler/TasksContainerHandeler";
import { Droppable } from "react-beautiful-dnd";

const ToDoGroup = ({ collections, setOverContent, status }) => {
  const insertTaskHandeler = (e) => {
    status.current = e.target.id;
    setOverContent(true);
  };

  return collections.map((item) => {
    return (
      <div key={item.name} className={styles.statusContainer}>
        <div className={styles.headStatus}>
          <div
            className={styles.status}
            style={{
              borderTop: `3px solid ${item.color}`,
            }}
          >
            {item.name}
          </div>
          <span
            className={styles.addTaskBtn}
            id={`${item.id}`}
            onClick={(e) => {
              insertTaskHandeler(e);
            }}
          ></span>
        </div>
        <Droppable droppableId={item.id}>
          {(provided) => {
            return (
              <div
                className={`${styles.tasksContainer}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <TasksContainerHandeler
                  status={item.id}
                  setOverContent={setOverContent}
                />
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    );
  });
};

export default memo(ToDoGroup);
