import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import openerReducer from '../features/opener/openerSlice'
import pageIndicatorReducer from '../features/pageIndicator/pageIndicatorSlice'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

export default configureStore({
  reducer: {
    opener: openerReducer,
    pageIndicator: pageIndicatorReducer,
  },
  middleware: customizedMiddleware,
})
