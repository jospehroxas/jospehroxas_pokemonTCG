import { useDispatch, useSelector } from 'react-redux'
import {
  selectDeckSummary,
  selectDeckCount,
  selectIsDeckOpen,
  addCard,
  removeCard,
  clearDeck,
  toggleDeck,
} from '../features/deck/deckSlice'

const typeColors = {
  Fire: '#FF6B35', Water: '#4FC3F7', Grass: '#81C784',
  Lightning: '#FFD54F', Psychic: '#CE93D8', Fighting: '#A1887F',
  Darkness: '#7986CB', Metal: '#90A4AE', Dragon: '#4DB6AC',
  Colorless: '#BDBDBD', Fairy: '#F48FB1',
}

export default function DeckPanel() {
  const dispatch = useDispatch()
  const summary = useSelector(selectDeckSummary)
  const deckCount = useSelector(selectDeckCount)
  const isOpen = useSelector(selectIsDeckOpen)

  if (!isOpen) return null

  const pokemonCards = summary.filter((e) => e.card.supertype === 'Pokémon')
  const trainerCards = summary.filter((e) => e.card.supertype === 'Trainer')
  const energyCards = summary.filter((e) => e.card.supertype === 'Energy')

  const exportDeck = () => {
    const text = summary
      .map(({ card, count }) => `${count}x ${card.name} (${card.set?.name || 'Unknown'})`)
      .join('\n')
    const blob = new Blob([`Deck (${deckCount}/60)\n\n${text}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-deck.txt'
    a.click()
  }

  const Section = ({ title, entries }) =>
    entries.length > 0 ? (
      <div className="deck-section">
        <h4 className="deck-section-title">{title} ({entries.reduce((s, e) => s + e.count, 0)})</h4>
        {entries.map(({ card, count }) => (
          <div key={card.id} className="deck-entry">
            <img src={card.images?.small} alt={card.name} className="deck-thumb" />
            <span className="deck-entry-name">{card.name}</span>
            <div className="deck-entry-controls">
              <button onClick={() => dispatch(removeCard(card.id))}>−</button>
              <span className="deck-entry-count">{count}</span>
              <button onClick={() => dispatch(addCard(card))}>+</button>
            </div>
          </div>
        ))}
      </div>
    ) : null

  const progress = (deckCount / 60) * 100

  return (
    <>
      <div className="deck-overlay" onClick={() => dispatch(toggleDeck())} />
      <aside className="deck-panel">
        <div className="deck-header">
          <h2 className="deck-title">🗂 My Deck</h2>
          <button className="deck-close" onClick={() => dispatch(toggleDeck())}>✕</button>
        </div>

        <div className="deck-progress-wrap">
          <div className="deck-progress-bar">
            <div
              className="deck-progress-fill"
              style={{ width: `${progress}%`, background: progress === 100 ? '#81C784' : '#FFD700' }}
            />
          </div>
          <span className="deck-count-label">{deckCount} / 60 cards</span>
        </div>

        {deckCount === 0 ? (
          <p className="deck-empty">No cards yet!{'\n'}Search and add cards to build your deck.</p>
        ) : (
          <div className="deck-entries">
            <Section title="Pokémon" entries={pokemonCards} />
            <Section title="Trainers" entries={trainerCards} />
            <Section title="Energy" entries={energyCards} />
          </div>
        )}

        <div className="deck-footer">
          <button className="btn-export" onClick={exportDeck} disabled={deckCount === 0}>
            📥 Export Deck
          </button>
          <button className="btn-clear" onClick={() => dispatch(clearDeck())} disabled={deckCount === 0}>
            🗑 Clear
          </button>
        </div>
      </aside>
    </>
  )
}
