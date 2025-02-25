import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { Employee } from "../types"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const employeesApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    getEmployee: builder.query<Employee, string>({
      query: id => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
    editEmployee: builder.mutation<string, Employee>({
      query: employee => ({
        url: `/employees/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
    }),
    removeEmployee: builder.mutation<string, string>({
      query: id => ({
        url: `/employees/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: employee => ({
        url: `/employees`,
        method: "POST",
        body: employee,
      }),
    }),
  }),
})

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useEditEmployeeMutation,
  useRemoveEmployeeMutation,
  useAddEmployeeMutation,
} = employeesApi

export const {
  endpoints: {
    addEmployee,
    editEmployee,
    getAllEmployees,
    getEmployee,
    removeEmployee,
  },
} = employeesApi
