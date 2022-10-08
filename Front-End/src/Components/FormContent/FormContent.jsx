import { useMemo, createRef, useRef, useEffect, memo } from "react";
import styles from "./FormContent.module.css";
import Input from "../Input/Input";
import MainButton from "../MainButton/MainButton";
import OverLay from "../OverLay/Overlay";
import Form from "../Form/Form";
import AuthInputContainer from "../AuthInputContainer/AuthInputContainer";
import LableForm from "../LableForm/LableForm";
import InputImg from "../InputImg/InputImg";
import HeadAuth from "../HeadAuth/HeadAuth";
import CloseButton from "../CloseButton/CloseButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setTask,
  reset,
  editTask,
  removeTask,
} from "../../store/UserCollecions";
import { v4 as uuidv4 } from "uuid";
import { Config } from "../../config/config";
import { useNavigate } from "react-router-dom";

const config = new Config();

const FormContent = ({ setOverContent, status, taskContent }) => {
  const buttonData = useMemo(() => {
    return {
      width: "40%",
      height: "50px",
      backgroundColor: "#7b68ee",
      color: "white",
      id: 1,
      shadowColor: "rgba(124,104,238,.5)",
      margin: "20px 0 20px 0",
    };
  }, []);

  const removeData = useMemo(() => {
    return {
      width: "40%",
      height: "50px",
      backgroundColor: "#7b68ee",
      color: "white",
      id: 1,
      shadowColor: "rgba(124,104,238,.5)",
      margin: "20px 0 20px 0",
    };
  }, []);

  const title = createRef();
  const dispath = useDispatch();
  const description = useRef();
  const rad1 = useRef();
  const rad2 = useRef();
  const rad3 = useRef();
  const targetRadio = useRef("");
  const navigate = useNavigate();

  const token = useSelector((state) => state.UserCollecions.token);

  const submitHandeler = (e) => {
    e.preventDefault();

    if (title.current.value !== "") {
      if (rad1.current.checked) {
        targetRadio.current = rad1.current.id;
      } else if (rad2.current.checked) {
        targetRadio.current = rad2.current.id;
      } else {
        targetRadio.current = rad3.current.id;
      }
      const dataWillBeSend = {
        _id: `id-${uuidv4()}`,
        status: status.current,
        title: title.current.value,
        description: description.current.value,
        priority: targetRadio.current,
      };

      fetch(`${config.api}/api/collecions/inserttask`, {
        method: "POST",
        body: JSON.stringify(dataWillBeSend),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error === true) {
            dispath(reset());
            navigate("/auth");
          } else {
            setOverContent(false);
            dispath(setTask(dataWillBeSend));
          }
        });
    }
  };

  useEffect(() => {
    if (taskContent !== undefined) {
      if (!title.current.value) {
        title.current.value = taskContent.current.title;
        description.current.value = taskContent.current.description;
        if (taskContent.current.priority === "High") {
          rad1.current.checked = true;
        } else if (taskContent.current.priority === "Medium") {
          rad2.current.checked = true;
        } else {
          rad3.current.checked = true;
        }
      }
    }
  });

  const editHandler = (e) => {
    e.preventDefault();
    if (rad1.current.checked) {
      targetRadio.current = rad1.current.id;
    } else if (rad2.current.checked) {
      targetRadio.current = rad2.current.id;
    } else {
      targetRadio.current = rad3.current.id;
    }

    const data = {
      status,
      _id: taskContent.current._id,
      title: title.current.value,
      description: description.current.value,
      priority: targetRadio.current,
    };

    dispath(editTask(data));

    fetch(`${config.api}/api/collecions/updatetask`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error === true) {
          dispath(reset());
          navigate("/auth");
        } else {
          setOverContent(false);
        }
      });
  };

  const removeHandeler = (e) => {
    e.preventDefault();
    const dataWithRequest = {
      status,
      _id: taskContent.current._id,
    };

    console.log(taskContent.current);

    fetch(`${config.api}/api/collecions/delete`, {
      method: "DELETE",
      body: JSON.stringify({ _id: taskContent.current._id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error === true) {
          dispath(reset());
          navigate("/auth");
        } else {
          dispath(removeTask(dataWithRequest));
          setOverContent(false);
        }
      });
  };

  return (
    <>
      <OverLay />
      <div className={styles.taskCont}>
        <div className={styles.formContentContainer}>
          <div className={"formContainer"}>
            <HeadAuth>Task Controler!</HeadAuth>
            <Form>
              <AuthInputContainer>
                <LableForm>Title</LableForm>
                <Input
                  ref={title}
                  data={{
                    type: "text",
                    placeholder: "Fix user Endpoint",
                  }}
                  width={"100%"}
                  height={"25px"}
                  paddingLeft={"40px"}
                />
                <InputImg
                  src={
                    "https://cdn-icons-png.flaticon.com/512/2799/2799932.png"
                  }
                  alt={"User Logo"}
                />
              </AuthInputContainer>
              <AuthInputContainer>
                <LableForm>Description</LableForm>
                <textarea
                  ref={description}
                  name="description"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum?"
                  rows="10"
                ></textarea>
              </AuthInputContainer>
              <AuthInputContainer>
                <LableForm>Priority</LableForm>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <span className={styles.spanRad}>
                    <input
                      defaultChecked={true}
                      ref={rad1}
                      type="radio"
                      id="High"
                      name="priorty"
                      className={styles.radio}
                    />
                    <label htmlFor="High">High</label>
                  </span>
                  <span className={styles.spanRad}>
                    <input
                      ref={rad2}
                      type="radio"
                      id="Medium"
                      name="priorty"
                      className={styles.radio}
                    />
                    <label htmlFor="Medium">Medium</label>
                  </span>
                  <span className={styles.spanRad}>
                    <input
                      ref={rad3}
                      type="radio"
                      id="Low"
                      name="priorty"
                      className={styles.radio}
                    />
                    <label htmlFor="Low">Low</label>
                  </span>
                </div>
              </AuthInputContainer>
              {!taskContent ? (
                <MainButton
                  buttonData={buttonData}
                  stable={true}
                  onClick={submitHandeler}
                >
                  Submit Task
                </MainButton>
              ) : (
                <div className={styles.butnContainer}>
                  <MainButton
                    buttonData={buttonData}
                    stable={true}
                    onClick={editHandler}
                  >
                    Edit Your Task
                  </MainButton>
                  <MainButton
                    buttonData={removeData}
                    stable={true}
                    onClick={removeHandeler}
                  >
                    Remove Your Task
                  </MainButton>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
      <CloseButton setOverContent={setOverContent} />
    </>
  );
};

export default memo(FormContent);
