import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
// import sideReducer from "./sideSlice";
import channelReducer from "./channelSlice";
// import articleCatReducer from "./articleCatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    // side: sideReducer,
    // articleCat: articleCatReducer,
  },
});

export default store;

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
