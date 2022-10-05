import styles from "./ToDOGroup.module.css";
import { memo } from "react";
import TaskHandeler from "../TaskHandeler/TaskHandeler";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDropLocation } from "../../store/UserCollecions";

const ToDoGroup = ({ collections, setOverContent, status }) => {
  const dispatch = useDispatch();

  const collecionsFromStore = useSelector(
    (state) => state.UserCollecions.collections
  );

  const insertTaskHandeler = (e) => {
    status.current = e.target.id;
    setOverContent(true);
  };

  const dropHolderHandeler = (e) => {
    dispatch(setDropLocation(e.target.className.split(" ")[1]));
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
          <TaskHandeler
            collecionsFromStore={collecionsFromStore[item.id]}
            status={item.id}
            setOverContent={setOverContent}
          />
        </div>
      </div>
    );
  });
};

export default memo(ToDoGroup);
