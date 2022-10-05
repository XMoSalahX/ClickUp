import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice } = toolkitRaw;

const userCollecionsSlice = createSlice({
  name: "UserCollecions",
  initialState: {
    token: "",
    collections: {
      TODO: [],
      INprogress: [],
      UnderReview: [],
      Rework: [],
      Completed: [],
    },
    dropLocaion: "",
  },
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    getData: (state, actions) => {
      state.collections = actions.payload;
    },
    setTask: (state, actions) => {
      state.collections[actions.payload.status].push(actions.payload);
    },
    reset: (state) => {
      state.token = "";
      state.collections = {
        TODO: [],
        INprogress: [],
        UnderReview: [],
        Rework: [],
        Completed: [],
      };
      state.dropLocaion = "";
    },
    editTask: (state, actions) => {
      const indexOfTask = state.collections[actions.payload.status].findIndex(
        (task) => task._id === actions.payload._id
      );
      state.collections[actions.payload.status][indexOfTask] = actions.payload;
    },
    removeTask: (state, actions) => {
      const indexOfTask = state.collections[actions.payload.status].findIndex(
        (task) => task._id === actions.payload._id
      );
      state.collections[actions.payload.status].splice(indexOfTask, 1);
    },
    setDropLocation: (state, actions) => {
      state.dropLocaion = actions.payload;
    },
  },
});

export const {
  setToken,
  getData,
  setTask,
  reset,
  editTask,
  removeTask,
  setDropLocation,
} = userCollecionsSlice.actions;

export default userCollecionsSlice.reducer;
