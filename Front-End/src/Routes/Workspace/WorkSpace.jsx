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

  const collectionsFromStore = useSelector(
    (state) => state.UserCollecions.collections
  );

  const token = useSelector((state) => state.UserCollecions.token);

  useEffect(() => {
    if (
      collectionsFromStore.Completed.length === 0 &&
      collectionsFromStore.INprogress.length === 0 &&
      collectionsFromStore.Rework.length === 0 &&
      collectionsFromStore.TODO.length === 0 &&
      collectionsFromStore.UnderReview.length === 0
    ) {
      fetch(`${config.api}/api/collecions/gettasks`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => dispatch(getData(data.data[0].collections)));
    }
  }, [
    collectionsFromStore.Completed.length,
    collectionsFromStore.INprogress.length,
    collectionsFromStore.Rework.length,
    collectionsFromStore.TODO.length,
    collectionsFromStore.UnderReview.length,
    dispatch,
    token,
  ]);

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

  return (
    <>
      {overContent ? (
        <FormContent setOverContent={setOverContent} status={status} />
      ) : null}

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
          <ToDoGroup
            collections={collections}
            setOverContent={setOverContent}
            status={status}
          />
        </div>
      </div>
    </>
  );
};

export default WorkSpace;
