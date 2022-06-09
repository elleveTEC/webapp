import { createSlice } from '@reduxjs/toolkit'

export const openerSlice = createSlice({
  name: 'opener',
  initialState: {
    active: false,
    children: "",
  },
  reducers: {
    toggle: state => {
      state.active = !state.active;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const {toggle, setChildren } = openerSlice.actions

export default openerSlice.reducer
