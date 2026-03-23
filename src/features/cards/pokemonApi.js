import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pokemontcg.io/v2/',
  }),
  endpoints: (builder) => ({
    searchCards: builder.query({
      query: ({ name = '', type = '', rarity = '', page = 1, pageSize = 20 }) => {
        const queries = []
        if (name) queries.push(`name:"${name}*"`)
        if (type) queries.push(`types:${type}`)
        if (rarity) queries.push(`rarity:"${rarity}"`)
        const q = queries.length ? `q=${encodeURIComponent(queries.join(' '))}` : ''
        return `cards?${q}&page=${page}&pageSize=${pageSize}&orderBy=-set.releaseDate`
      },
    }),
    getCardById: builder.query({
      query: (id) => `cards/${id}`,
    }),
    getSets: builder.query({
      query: () => 'sets?orderBy=-releaseDate&pageSize=30',
    }),
    getCardsBySet: builder.query({
      query: ({ setId, pageSize = 200 }) =>
        `cards?q=${encodeURIComponent(`set.id:${setId}`)}&pageSize=${pageSize}`,
    }),
    getRandomCards: builder.query({
      query: ({ page, pageSize = 10 }) =>
        `cards?page=${page}&pageSize=${pageSize}`,
    }),
  }),
})

export const {
  useSearchCardsQuery,
  useGetCardByIdQuery,
  useGetSetsQuery,
  useGetCardsBySetQuery,
  useGetRandomCardsQuery,
} = pokemonApi
