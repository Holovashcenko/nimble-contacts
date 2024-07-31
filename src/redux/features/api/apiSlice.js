import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_TOKEN = import.meta.env.VITE_API_TOKEN

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '', // Empty because the proxy is handling the base URL
    prepareHeaders: (headers) => {
      if (API_TOKEN) {
        headers.set('Authorization', `Bearer ${API_TOKEN}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => 'api/v1/contacts', // Path after proxy
      transformResponse: (response) => response.resources, // Extract only the resources array
    }),
  }),
})

export const { useGetContactsQuery } = apiSlice
