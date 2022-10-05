import { configureStore } from "@reduxjs/toolkit";

import Landing from "./LandingSlice";
import UserCollecions from "./UserCollecions";

export default configureStore({
  reducer: { Landing, UserCollecions },
});
