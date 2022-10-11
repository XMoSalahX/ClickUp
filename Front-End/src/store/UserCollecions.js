import * as toolkitRaw from "@reduxjs/toolkit";
import { Config } from "../config/config";

const { createSlice, createAsyncThunk } = toolkitRaw;
const config = new Config();

// Update Task location
export const updateTaskLocation = createAsyncThunk(
  "UserCollecions/updateTaskLocation",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const token = getState().UserCollecions.token;
      console.log(arg);
      fetch(`${config.api}/api/collecions/updatetask`, {
        method: "PUT",
        body: JSON.stringify({
          _id: arg.targetTask._id,
          status: arg.targetTask.status,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "bearer " + token,
        },
      });

      return arg;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

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
  extraReducers: {
    // Update the drop location of the selected task
    [updateTaskLocation.fulfilled]: (state, actions) => {
      state.collections[actions.payload.targetTask.status].splice(
        actions.payload.index,
        0,
        actions.payload.targetTask
      );
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
