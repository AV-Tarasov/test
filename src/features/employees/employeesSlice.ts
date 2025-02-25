import { createSlice } from "@reduxjs/toolkit"
import { Employee } from "../../app/types"
import { employeesApi } from "../../app/services/employeesApi"
import { RootState } from "../../app/store"

interface InitialState {
  employees: Employee[] | null
}

const initialState: InitialState = {
  employees: null,
}

const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      employeesApi.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.employees = action.payload
      },
    )
  },
})

export default slice.reducer

export const selectEmployees = (state: RootState) => state.employees
