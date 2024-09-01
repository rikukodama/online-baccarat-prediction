import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sideSlice = createSlice({
        name: "side",
        initialState: {
                showSide: true,
                isLayout: false,
                expandedSide: null,
        },
        reducers: {

                changeShowSide: (state) => {
                        state.showSide = !state.showSide;
                },
                changeShowSideState: (state, {payload}) => {
                        state.showSide = payload;
                },
                changeShowLayout: (state, { payload }) => {
                        const { layout } = payload;
                        state.isLayout = layout;
                },
                changeExpandedSide: (state, { payload }) => {
                        const {id} = payload;
                        state.expandedSide = id
                }
        },
});
export const { changeShowSide,changeShowSideState, changeShowLayout, changeExpandedSide } =
  sideSlice.actions;
export default sideSlice.reducer;
