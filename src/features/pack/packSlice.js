import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const openPack = createAsyncThunk('pack/open', async (_, { rejectWithValue }) => {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1
    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?page=${randomPage}&pageSize=10&orderBy=-set.releaseDate`
    )
    const data = await res.json()
    return data.data || []
  } catch (err) {
    return rejectWithValue('Failed to open pack')
  }
})

const packSlice = createSlice({
  name: 'pack',
  initialState: {
    cards: [],
    revealedIndex: -1,
    isOpening: false,
    isRevealing: false,
    error: null,
  },
  reducers: {
    revealNext: (state) => {
      if (state.revealedIndex < state.cards.length - 1) {
        state.revealedIndex++
      }
    },
    revealAll: (state) => {
      state.revealedIndex = state.cards.length - 1
      state.isRevealing = false
    },
    resetPack: (state) => {
      state.cards = []
      state.revealedIndex = -1
      state.isOpening = false
      state.isRevealing = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openPack.pending, (state) => {
        state.isOpening = true
        state.error = null
        state.cards = []
        state.revealedIndex = -1
        state.isRevealing = false
      })
      .addCase(openPack.fulfilled, (state, action) => {
        state.isOpening = false
        state.isRevealing = true
        state.cards = action.payload
        state.revealedIndex = -1
      })
      .addCase(openPack.rejected, (state, action) => {
        state.isOpening = false
        state.error = action.payload
      })
  },
})

export const { revealNext, revealAll, resetPack } = packSlice.actions
export default packSlice.reducer
