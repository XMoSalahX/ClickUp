import styles from "./WorkSpace.module.css";
import BrandLogo from "../../Components/Brand Logo/BrandLogo";
import MainButton from "../../Components/MainButton/MainButton";
import ToDoGroup from "../../Components/ToDoGroup/ToDoGroup";
import { useEffect, useState, useMemo, useRef } from "react";
import { Config } from "../../config/config";
import FormContent from "../../Components/FormContent/FormContent";
import { useSelector, useDispatch } from "react-redux";
import { getData, reset } from "../../store/UserCollecions";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { removeTask, updateTaskLocation } from "../../store/UserCollecions";

const config = new Config();

const WorkSpace = () => {
  const [overContent, setOverContent] = useState(false);
  const status = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonData = useMemo(() => {
    return {
      width: "100px",
      height: "40px",
      backgroundColor: "#7b68ee",
      color: "white",
      shadowColor: "rgb(10 10 51 / 10%)",
      margin: "20px 0 20px 0",
    };
  }, []);

  const token = useSelector((state) => state.UserCollecions.token);

  const FirstLunch = useRef(true);

  useEffect(() => {
    if (FirstLunch.current === true) {
      fetch(`${config.api}/api/collecions/gettasks`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "bearer " + token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            dispatch(reset());
            navigate("/auth");
          }
          return res.json();
        })
        .then((data) => {
          if (
            data.data[0].collections.Completed.length > 0 ||
            data.data[0].collections.INprogress.length > 0 ||
            data.data[0].collections.Rework.length > 0 ||
            data.data[0].collections.TODO.length > 0 ||
            data.data[0].collections.UnderReview.length > 0
          ) {
            console.log(data);
            dispatch(getData(data.data[0].collections));
          }
          FirstLunch.current = false;
        });
    }
  }, [dispatch, navigate, token]);

  const collections = useMemo(() => {
    return [
      { name: "TO DO", color: "#b5bcc2", id: "TODO" },
      { name: "INPROGRESS", color: "#04a9f4", id: "INprogress" },
      { name: "UNDER REVIEW", color: "#dfd07c", id: "UnderReview" },
      { name: "REWORK", color: "#cf3c50", id: "Rework" },
      { name: "COMPLETED", color: "#2ecd6f", id: "Completed" },
    ];
  }, []);

  const logOutHandeler = useCallback(() => {
    dispatch(reset());
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  const Collections = useSelector((state) => state.UserCollecions.collections);

  const onDragEnd = ({ destination, source }) => {
    if (
      !destination ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    ) {
      return;
    }

    const targetTask = { ...Collections[source.droppableId][source.index] };
    targetTask.status = destination.droppableId;
    const index = destination.index;
    dispatch(removeTask(Collections[source.droppableId][source.index]));
    dispatch(updateTaskLocation({ targetTask, index })).then((res) => {
      if (res.meta.requestStatus !== "fulfilled") {
        navigate("/auth");
      }
    });
  };

  return (
    <>
      {overContent && status.current !== "" && (
        <FormContent setOverContent={setOverContent} status={status} />
      )}

      <div className={styles.workSpaceContainer}>
        <header className={styles.workSpaceHeader}>
          <BrandLogo />
          <MainButton
            buttonData={buttonData}
            stable={true}
            onClick={logOutHandeler}
          >
            Logout
          </MainButton>
        </header>
        <div className={styles.contentContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <ToDoGroup
              collections={collections}
              setOverContent={setOverContent}
              status={status}
            />
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default WorkSpace;
