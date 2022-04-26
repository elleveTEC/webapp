import { configureStore } from '@reduxjs/toolkit'
import openerReducer from '../features/opener/openerSlice'

export default configureStore({
  reducer: {
    opener: openerReducer,
  }
})
