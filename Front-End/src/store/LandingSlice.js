import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice } = toolkitRaw;

const LandingSlice = createSlice({
  name: "landing",
  initialState: { signUpValue: "" },
  reducers: {
    setvalue: (state, actions) => {
      state.signUpValue = actions.payload;
    },
  },
});

export const { setvalue } = LandingSlice.actions;

export default LandingSlice.reducer;
