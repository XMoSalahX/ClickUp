import * as toolkitRaw from "@reduxjs/toolkit";
import { Config } from "../config/config";

const { createSlice, createAsyncThunk } = toolkitRaw;
const config = new Config();

// Get All Data to WorkSpace
export const getData = createAsyncThunk(
  "UserCollecions/getData",
  async (_arg, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const token = getState().UserCollecions.token;
    try {
      var dataHolder;
      await fetch(`${config.api}/api/collecions/gettasks`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: "bearer " + token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            dispatch(reset());
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
            dataHolder = data.data[0].collections;
          }
        });

      return { ...dataHolder };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Update Task location
export const updateTaskLocation = createAsyncThunk(
  "UserCollecions/updateTaskLocation",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const token = getState().UserCollecions.token;

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
    firstLunch: true,
    loading: false,
  },
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    stopFetchAllData: (state) => {
      state.firstLunch = false;
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
      state.firstLunch = true;
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
    loadingControl: (state, actions) => {
      state.loading = actions.payload;
    },
  },
  extraReducers: {
    // Get All Data to WorkSpace
    [getData.pending]: (state) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, actions) => {
      if (actions.payload.TODO) {
        state.collections = actions.payload;
      }

      state.loading = false;
    },
    [getData.rejected]: (state) => {
      state.loading = false;
    },
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
  setTask,
  reset,
  editTask,
  removeTask,
  stopFetchAllData,
  loadingControl,
} = userCollecionsSlice.actions;

export default userCollecionsSlice.reducer;
