import { useState, useRef, memo } from "react";
import FormContent from "../FormContent/FormContent";
import styles from "./TaskHanderler.module.css";
import { Draggable } from "react-beautiful-dnd";

const TaskHanderler = memo(
  ({ id, title, priority, status, elFromStore, index }) => {
    const [overContent, setOverContent] = useState(false);
    const taskData = useRef("");
    const el = { ...elFromStore };

    taskData.current = el;

    const taskOnClick = () => {
      setOverContent(true);
    };
    return (
      <>
        {overContent ? (
          <FormContent
            setOverContent={setOverContent}
            status={status}
            taskContent={taskData}
          />
        ) : null}
        <Draggable draggableId={id} index={index}>
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={styles.TaskContainer}
              >
                <div className={styles.title} onClick={taskOnClick}>
                  {title}
                </div>
                <div
                  className={styles.priority}
                  style={{
                    color:
                      priority === "High"
                        ? "red"
                        : priority === "Medium"
                        ? "orange"
                        : "green",
                  }}
                >
                  {priority}
                </div>
              </div>
            );
          }}
        </Draggable>
      </>
    );
  }
);

export default TaskHanderler;
