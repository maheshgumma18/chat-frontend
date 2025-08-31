// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch messages for a user
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://chat-backend-y218.onrender.com:5000/api/auth/allmsg",
        { userid: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { userId, messages: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messagesByUser: {}, // { userId: [messages...] }
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.messagesByUser[userId]) {
        state.messagesByUser[userId] = [];
      }
      state.messagesByUser[userId].push(message);
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesByUser[action.payload.userId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
