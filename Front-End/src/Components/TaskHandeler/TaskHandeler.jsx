import styles from "./TaskHandeler.module.css";
import { useState, useRef, memo } from "react";
import FormContent from "../FormContent/FormContent";
import { useSelector, useDispatch } from "react-redux";
import { setTask, removeTask, reset } from "../../store/UserCollecions";
import { Config } from "../../config/config";
import { useNavigate } from "react-router-dom";

const config = new Config();

const TaskHandeler = ({ collecionsFromStore, status }) => {
  const [overContent, setOverContent] = useState(false);
  const taskData = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentStatues = useSelector(
    (state) => state.UserCollecions.collections[status]
  );

  const userCollections = useSelector((state) => state.UserCollecions);

  const targetStatus = useSelector((state) => state.UserCollecions.dropLocaion);

  const taskOnDrag = (e) => {
    e.target.style.opacity = 0.5;
  };

  const taskOnDrop = (e) => {
    const taskIndex = currentStatues.findIndex(
      (state) => state._id === e.target.id
    );

    let curentTask = { ...currentStatues[taskIndex] };
    if (targetStatus !== undefined) {
      dispatch(removeTask(currentStatues[taskIndex]));
      curentTask.status = targetStatus;
      curentTask.remove = true;

      dispatch(setTask(curentTask));
      e.target.style.opacity = 1;

      fetch(`${config.api}/api/collecions/updatetask`, {
        method: "PUT",
        body: JSON.stringify({ _id: curentTask._id, status: targetStatus }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "bearer " + userCollections.token,
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
  };

  const taskOnClick = (e) => {
    taskData.current = collecionsFromStore.filter((c) => {
      return c._id === e.target.parentElement.id;
    })[0];

    setOverContent(true);
  };

  const renderHandeler = () => {
    return collecionsFromStore.map((el) => {
      return (
        <div
          className={styles.TaskContainer}
          id={`${el._id}`}
          key={el._id}
          draggable={true}
          onDragStart={taskOnDrag}
          onDragEnd={taskOnDrop}
        >
          <div className={styles.title} onClick={taskOnClick}>
            {el.title}
          </div>
          <div
            className={styles.priority}
            style={{
              color:
                el.priority === "High"
                  ? "red"
                  : el.priority === "Medium"
                  ? "orange"
                  : "green",
            }}
          >
            {el.priority}
          </div>
        </div>
      );
    });
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
      {renderHandeler()}
    </>
  );
};

export default memo(TaskHandeler);
