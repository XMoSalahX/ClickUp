import { useMemo } from "react";

import { useSelector } from "react-redux";
import TaskHanderler from "../TaskHandeler/TaskHanderler";
const TasksContainerHandeler = ({ status }) => {
  const currentStatues = useSelector(
    (state) => state.UserCollecions.collections[status]
  );

  const cloneStatusArray = useMemo(() => {
    return [...currentStatues];
  }, [currentStatues]);

  const renderHandeler = () => {
    return cloneStatusArray.map((el, index) => {
      return (
        <TaskHanderler
          key={el._id}
          id={el._id}
          title={el.title}
          priority={el.priority}
          status={status}
          elFromStore={cloneStatusArray[index]}
        />
      );
    });
  };
  return renderHandeler();
};

export default TasksContainerHandeler;
