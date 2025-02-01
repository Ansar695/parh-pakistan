'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getBoards: builder.mutation({
      query: () => ({
        url: '/board',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetBoardsMutation } = boardApi