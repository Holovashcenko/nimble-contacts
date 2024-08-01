import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_TOKEN = import.meta.env.VITE_API_TOKEN

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      if (API_TOKEN) {
        headers.set('Authorization', `Bearer ${API_TOKEN}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ sort }) => ({
        url: 'api/v1/contacts',
        params: {
          sort,
        },
      }),
      transformResponse: (response) => response.resources,
    }),
  }),
})

export const { useGetContactsQuery } = apiSlice
