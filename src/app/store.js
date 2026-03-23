import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from '../features/cards/pokemonApi'
import deckReducer from '../features/deck/deckSlice'
import packReducer from '../features/pack/packSlice'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    deck: deckReducer,
    pack: packReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})
