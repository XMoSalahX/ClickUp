import { useState, useRef, memo, Fragment } from "react";
import FormContent from "../FormContent/FormContent";
import { useDispatch, useSelector } from "react-redux";
import { setTask, removeTask, reset } from "../../store/UserCollecions";
import { useNavigate } from "react-router-dom";
import { Config } from "../../config/config";
import styles from "./TaskHanderler.module.css";

const config = new Config();

const TaskHanderler = memo(({ id, title, priority, status, elFromStore }) => {
  const [overContent, setOverContent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskData = useRef("");
  const token = useSelector((state) => state.UserCollecions.token);
  const el = { ...elFromStore };
  taskData.current = el;

  function taskOnDrag(e) {
    e.target.style.opacity = 0.5;
  }

  function taskOnDrop(e) {
    if (Window.dropLocation !== undefined) {
      dispatch(removeTask(el));
      el.status = Window.dropLocation;
      el.remove = true;

      dispatch(setTask(el));
      e.target.style.opacity = 1;

      fetch(`${config.api}/api/collecions/updatetask`, {
        method: "PUT",
        body: JSON.stringify({
          _id: el._id,
          status: Window.dropLocation,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error === true) {
            dispatch(reset());
            navigate("/auth");
          } else {
            setOverContent(false);
          }
        });
    } else {
      e.target.style.opacity = 1;
    }
  }

  const taskOnClick = (e) => {
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
      <div
        className={styles.TaskContainer}
        id={`${id}`}
        draggable={true}
        onDragStart={taskOnDrag}
        onDragEnd={taskOnDrop}
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
    </>
  );
});

export default TaskHanderler;
