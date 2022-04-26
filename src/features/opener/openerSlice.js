import { createSlice } from '@reduxjs/toolkit'

export const openerSlice = createSlice({
  name: 'opener',
  initialState: {
    active: false
  },
  reducers: {
    toggle: state => {
      state.active = !state.active;
    },
  }
})

// Action creators are generated for each case reducer function
export const { toggle } = openerSlice.actions

export default openerSlice.reducer
