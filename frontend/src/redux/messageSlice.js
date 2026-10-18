import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: []
  },
  reducers: {

    setMessages: (state, action) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
    },

    addMessage: (state, action) => {
      if (!Array.isArray(state.messages)) {
        state.messages = [];
      }
      if (
        action.payload &&
        !state.messages.some(
          m => String(m._id) === String(action.payload._id)
        )
      ) {
        state.messages.push(action.payload);
      }
    }

  }
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;