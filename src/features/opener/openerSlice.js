import { createSlice } from '@reduxjs/toolkit'

export const openerSlice = createSlice({
  name: 'opener',
  initialState: {
    active: false,
    correct: false,
    message: "No message",
  },
  reducers: {
    toggle: state => {
      state.active = !state.active;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.correct = action.payload.correct;
    }
  }
})

// Action creators are generated for each case reducer function
export const { toggle } = openerSlice.actions
export const { setMessage } = openerSlice.actions

export default openerSlice.reducer
