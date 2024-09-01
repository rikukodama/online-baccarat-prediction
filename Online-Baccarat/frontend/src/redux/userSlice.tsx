import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface SignupPayload {
  company: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface SigninPayload {
  email: string;
  password: string;
}

interface GetAllUsersPayload {
  perpage: number;
  page: number;
}

interface AllowUserPayload {
  permission: string;
  userID: string;
}

interface UpdateUserProfilePayload {
  company: string;
  username: string;
  email: string;
  birthday: string;
  phone: string;
  money: number;
  bio: string;
  files: File[];
}

interface ChangeUserStorePayload {
  storeID: string;
  id: string;
}

interface ChangeUserRolePayload {
  userRole: string;
  id: string;
}

interface UserState {
  isLoading: boolean;
  user: object | null; // You might want to define a more specific type here
  users: Array<object> | null; // Define a more specific type here if possible
  error: string;
  token: string | null;
}

export const signup = createAsyncThunk(
  "/register",
  async (payload: SignupPayload) => {
    const { company, username, email, password, role } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        // `${process.env.REACT_APP_API_BASE_URL}/api/auth/register`,
        'http://localhost:5000/api/auth/register',
        {
          company,
          username,
          email,
          password,
          role,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const signin = createAsyncThunk(
  "/api/auth/login",
  async (payload: SigninPayload) => {
    const { email, password } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        // `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly." };
    }
  }
);

export const getUser = createAsyncThunk("/tokenlogin", async () => {
  const res: AxiosResponse = await axios.get(
    `http://localhost:5000/api/auth/tokenlogin`
  );  
  return res.data;
});

export const getAllUsers = createAsyncThunk(
  "/api/auth/getAllUser",
  async (payload: GetAllUsersPayload) => {    
    // const { perpage, page } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `http://localhost:5000/api/auth/getAllUser`
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const allowUser = createAsyncThunk(
  "/api/auth/allowUser",
  async (payload: AllowUserPayload) => {
    const { permission, userID } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/allowUser`,
        {
          permission,
          userID,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "/api/auth/updateUserProfile",
  async (payload: UpdateUserProfilePayload) => {
    const {
      company,
      username,
      email,
      money,
      birthday,
      phone,
      bio,
      files,
    } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/updateUserProfile`,
        {
          company,
          username,
          email,
          birthday,
          phone,
          money,
          bio,
          files,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/api/auth/deleteUser",
  async (payload: string) => {
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/deleteUser`,
        {
          payload,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const changeUserStore = createAsyncThunk(
  "/api/auth/changeUserStore",
  async (payload: ChangeUserStorePayload) => {
    const { storeID, id } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/changeUserStore`,
        {
          storeID,
          id,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const changeUserRole = createAsyncThunk(
  "/api/auth/changeUserRole",
  async (payload: ChangeUserRolePayload) => {
    const { userRole, id } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/changeUserRole`,
        {
          userRole,
          id,
        }
      );
      return res.data;
    } catch (e: any) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly" };
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: null,
    users: null,
    error: "",
    token: localStorage.getItem("token"),
  } as UserState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.user = [];
    },
    setUserCoin: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        if (payload.token) {
          axios.defaults.headers.common["Authorization"] = payload.token;
          localStorage.setItem("token", payload.token);
          state.user = payload.user;
          state.token = payload.token;
        }
        state.isLoading = false;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        if (payload.token) {
          axios.defaults.headers.common["Authorization"] = payload.token;
          localStorage.setItem("token", payload.token);
          state.user = payload.user;
          state.token = payload.token;
        }
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        
        state.users = payload.userList;
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      });
  },
});

export const { logOut, resetError, setUserCoin } = userSlice.actions;
export default userSlice.reducer;
