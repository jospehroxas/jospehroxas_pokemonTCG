import { createSlice } from '@reduxjs/toolkit'

const MAX_DECK_SIZE = 60
const MAX_COPIES = 4

const loadDeck = () => {
  try {
    const saved = localStorage.getItem('pokemonDeck')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveDeck = (cards) => {
  try {
    localStorage.setItem('pokemonDeck', JSON.stringify(cards))
  } catch {}
}

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    cards: loadDeck(),
    isOpen: false,
  },
  reducers: {
    addCard: (state, action) => {
      const card = action.payload
      const totalCards = state.cards.length
      const copiesInDeck = state.cards.filter((c) => c.id === card.id).length
      const isBasicEnergy = card.supertype === 'Energy' && card.subtypes?.includes('Basic')

      if (totalCards >= MAX_DECK_SIZE) return
      if (!isBasicEnergy && copiesInDeck >= MAX_COPIES) return

      state.cards.push(card)
      saveDeck(state.cards)
    },
    removeCard: (state, action) => {
      const idx = state.cards.findLastIndex((c) => c.id === action.payload)
      if (idx !== -1) state.cards.splice(idx, 1)
      saveDeck(state.cards)
    },
    clearDeck: (state) => {
      state.cards = []
      saveDeck([])
    },
    toggleDeck: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { addCard, removeCard, clearDeck, toggleDeck } = deckSlice.actions
export default deckSlice.reducer

// Selectors
export const selectDeckCards = (state) => state.deck.cards
export const selectDeckCount = (state) => state.deck.cards.length
export const selectIsDeckOpen = (state) => state.deck.isOpen
export const selectCardCountInDeck = (cardId) => (state) =>
  state.deck.cards.filter((c) => c.id === cardId).length

export const selectDeckSummary = (state) => {
  const cards = state.deck.cards
  const unique = {}
  cards.forEach((card) => {
    if (!unique[card.id]) unique[card.id] = { card, count: 0 }
    unique[card.id].count++
  })
  return Object.values(unique)
}
