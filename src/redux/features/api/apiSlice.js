import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_TOKEN = import.meta.env.VITE_API_TOKEN

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5173/api/v1/',
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

    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `contact/${contactId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetContactsQuery, useGetContactQuery, useCreateContactMutation, useDeleteContactMutation } = apiSlice
