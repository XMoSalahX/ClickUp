import styles from "./ToDOGroup.module.css";
import { memo } from "react";
import TasksContainerHandeler from "../TasksContainerHandeler/TasksContainerHandeler";

const ToDoGroup = ({ collections, setOverContent, status }) => {
  const insertTaskHandeler = (e) => {
    status.current = e.target.id;
    setOverContent(true);
  };

  const dropHolderHandeler = (e) => {
    if (Window.dropLocation !== undefined) {
      if (Window.dropLocation !== e.target.className.split(" ")[1]) {
        Window.dropLocation = e.target.className.split(" ")[1];
      }
    } else {
      Window.dropLocation = e.target.className.split(" ")[1];
    }
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
        <div
          className={`${styles.tasksContainer} ${item.id}`}
          onDragOver={dropHolderHandeler}
        >
          <TasksContainerHandeler
            status={item.id}
            setOverContent={setOverContent}
          />
        </div>
      </div>
    );
  });
};

export default memo(ToDoGroup);
