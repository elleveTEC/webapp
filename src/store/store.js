import { configureStore } from '@reduxjs/toolkit'
import openerReducer from '../features/opener/openerSlice'
import pageIndicatorReducer from '../features/pageIndicator/pageIndicatorSlice'

export default configureStore({
  reducer: {
    opener: openerReducer,
    pageIndicator: pageIndicatorReducer,
  }
})
