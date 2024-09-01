import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface CreatePayload {
  name: string;
  create_user: string;
  invite_users:Object[];
}

interface UpdatechannelPayload {
  name: string;
  create_user: string;
  invite_users:Object[];
}
interface ChannelState {
  isLoading: boolean;
  channel: object | null; // You might want to define a more specific type here
  channels: Array<object> | null; // Define a more specific type here if possible
  error: string;
}

export const createchannel = createAsyncThunk(
  "/channel/create",
  async (payload: CreatePayload) => {
    const { name, create_user,invite_users } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        'http://localhost:5000/api/channel/create',
        {
         name,
         create_user,
         invite_users
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

// export const createchannel = createAsyncThunk(
//   "/api/auth/login",
//   async (payload: GetPayload) => {
//     const { email, password } = payload;
//     try {
//       const res: AxiosResponse = await axios.post(
//         // `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
//         'http://localhost:5000/api/auth/login',
//         {
//           email,
//           password,
//         }
//       );
//       return res.data;
//     } catch (e: any) {
//       if (e.response) {
//         return { ...e.response.data, error: true };
//       }
//       return { error: true, message: "Server is not running correctly." };
//     }
//   }
// );

export const getchannel = createAsyncThunk("/tokenlogin", async () => {
  const res: AxiosResponse = await axios.get(
    `http://localhost:5000/api/auth/tokenlogin`
  );  
  return res.data;
});

export const getAllchannels = createAsyncThunk(
  "/channel/get",
  async () => {    
    try {
      
      const res: AxiosResponse = await axios.get(
        `http://localhost:5000/api/channel/get`
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

export const allowchannel = createAsyncThunk(
  "/api/auth/allowchannel",
  async (payload: AllowchannelPayload) => {
    const { permission, channelID } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/allowchannel`,
        {
          permission,
          channelID,
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

export const updatechannel = createAsyncThunk(
  "/api/channel/update",
  
  async (payload: UpdatechannelPayload) => {
    const { id, name, create_user,invite_users } = payload;
    try {
      const res: AxiosResponse = await axios.put(
        `http://localhost:5000/api/channel/update/`+id,
        {
          name,
          create_user,
          invite_users,
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

export const deletechannel = createAsyncThunk(
  "/api/auth/deletechannel",
  async (payload: string) => {
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/deletechannel`,
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

export const changechannelStore = createAsyncThunk(
  "/api/auth/changechannelStore",
  async (payload: ChangechannelStorePayload) => {
    const { storeID, id } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/changechannelStore`,
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

export const changechannelRole = createAsyncThunk(
  "/api/auth/changechannelRole",
  async (payload: ChangechannelRolePayload) => {
    const { channelRole, id } = payload;
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/changechannelRole`,
        {
          channelRole,
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

export const channelSlice = createSlice({
  name: "channel",
  initialState: {
    isLoading: false,
    channel: null,
    channels: null,
    error: "",
  } as ChannelState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(createchannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createchannel.fulfilled, (state, { payload }) => {
          state.channel = payload.channel;
        state.isLoading = false;
      })
      .addCase(createchannel.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      .addCase(getchannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getchannel.fulfilled, (state, { payload }) => {
          state.channel = payload.channel;
        state.isLoading = false;
      })
      .addCase(getchannel.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      .addCase(getAllchannels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllchannels.fulfilled, (state, { payload }) => {
        
        state.channels = payload.channels;
        state.isLoading = false;
      })
      .addCase(getAllchannels.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      })
      .addCase(updatechannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatechannel.fulfilled, (state, { payload }) => {
        state.error = payload?.message;
        state.isLoading = false;
      })
      .addCase(updatechannel.rejected, (state, { payload }) => {
        // state.error = payload?.message || "";
        state.isLoading = false;
      });
  },
});

export default channelSlice.reducer;
