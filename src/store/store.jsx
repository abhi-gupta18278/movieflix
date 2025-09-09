import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice.js'
import tvReducer from './reducers/tvSlice.js'
import peopleReducer from './reducers/people.js'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    people: peopleReducer

  },
})