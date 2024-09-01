import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const refineGroup = (group) => ({
  _id: group?._id,
  title: group?.title,
  del: group?.del,
  parentId: group?.parentId,
});

export const makeTree = (group, groups, article) => {
  let nGroup = refineGroup(group);
  let Children = [];
  groups.forEach((item) => {
    if (item?.parentId === group._id)
      Children.push(makeTree(item, groups, article));
  });
  if (Children.length) nGroup.children = Children;
  return nGroup;
};

export const createFirstCat = createAsyncThunk(
  "/createFirstCategory",
  async (payload) => {
    const res = await axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/articlecat/first",
      { firstCat: payload }
    );
    return res.data.data;
  }
);

export const fetchArticleCategories = createAsyncThunk(
  "/article/signin",
  async (payload) => {
    let query = "";
    if (payload) query += `?view=${payload}`;
    const res = await axios.get(process.env.REACT_APP_API_BASE_URL + "/api/articlecat/getcategories", query);
    return res.data;
  }
);

export const actionArticleCategory = createAsyncThunk(
  "/actionArticleCategory",
  async (payload) => {
    const res = await axios.post(
      process.env.REACT_APP_API_BASE_URL +
        "/api/articlecat/actionArticleCategory",
      payload
    );
    return res.data;
  }
);

export const deleteArticleCategory = createAsyncThunk(
  "/deleteArticleCategory",
  async (payload) => {
    const res = await axios.delete(
      process.env.REACT_APP_API_BASE_URL +
        "/api/articlecat/deleteArticleCategory/" +
        payload.id
    );
    return res.data;
  }
);

export const articleCatSlice = createSlice({
  name: "articleCat",
  initialState: {
    articleCategories: [], //tree structure
    articleCategoriesForPath: [], // array that is in a before state of arrange
    articleLists: [],
    isLoading: false,
    isUpdated: true,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchArticleCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchArticleCategories.fulfilled]: (state, { payload }) => {
      payload?.data?.length
        ? (state.articleCategories = [
            makeTree(payload.data[0], payload.data, payload.article),
          ])
        : (state.articleCategories = []);

      payload?.data?.length
        ? (state.articleCategoriesForPath = payload.data)
        : (state.articleCategoriesForPath = []);
      payload?.article?.length
        ? (state.articleList = payload.article)
        : (state.articleList = []);
      state.isLoading = false;
      state.isUpdated = false;
    },
    [fetchArticleCategories.rejected]: (state) => {
      state.isLoading = false;
    },
    [actionArticleCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [actionArticleCategory.fulfilled]: (state, { payload }) => {
      state.isUpdated = true;
    },
    [actionArticleCategory.rejected]: (state, { payload }) => {
      state.isUpdated = true;
      state.error = payload;
      state.isLoading = false;
    },
    [createFirstCat.pending]: (state) => {
      state.isLoading = true;
    },
    [createFirstCat.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.articleCategories = [makeTree(payload, [payload])];

      state.isUpdated = false;
    },
    [createFirstCat.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [deleteArticleCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteArticleCategory.fulfilled]: (state, { payload }) => {
      state.isUpdated = true;
    },
    [deleteArticleCategory.rejected]: (state, { payload }) => {
      state.isUpdated = true;
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default articleCatSlice.reducer;
