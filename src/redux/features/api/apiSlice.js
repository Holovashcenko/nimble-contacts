import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_TOKEN = import.meta.env.VITE_API_TOKEN
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api/v1/'
const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
        url: 'contacts',
        params: { sort },
      }),
      transformResponse: (response) => response.resources,
    }),

    getContact: builder.query({
      query: (id) => `contact/${id}`,
      transformResponse: (response) => response.resources[0],
    }),

    createContact: builder.mutation({
      query: (contact) => ({
        url: 'contact',
        method: 'POST',
        body: contact,
      }),
    }),

    updateContactTags: builder.mutation({
      query: ({ id, tags }) => ({
        url: `contacts/${id}/tags`,
        method: 'PUT',
        body: { tags },
      }),
    }),

    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `contact/${contactId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactTagsMutation,
  useDeleteContactMutation,
} = apiSlice
