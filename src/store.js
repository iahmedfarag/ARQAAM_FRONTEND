import { configureStore } from '@reduxjs/toolkit'
import teamNumbersSlice from './features/teamNumbersSlice'
import userSlice from './features/userSlice'


export const store = configureStore({
    reducer: {
        teamNumbersSlice: teamNumbersSlice,
        userSlice: userSlice,
    },
})