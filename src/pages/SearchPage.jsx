import { useState, useEffect } from 'react'
import { useSearchCardsQuery } from '../features/cards/pokemonApi'
import CardItem from '../components/CardItem'

const TYPES = ['', 'Fire', 'Water', 'Grass', 'Lightning', 'Psychic', 'Fighting', 'Darkness', 'Metal', 'Dragon', 'Colorless', 'Fairy']
const RARITIES = ['', 'Common', 'Uncommon', 'Rare', 'Rare Holo', 'Rare Ultra', 'Rare Secret']

export default function SearchPage() {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [rarity, setRarity] = useState('')
  const [page, setPage] = useState(1)
  const [inputValue, setInputValue] = useState('')

  const { data, isLoading, isFetching, isError } = useSearchCardsQuery(
    { name, type, rarity, page, pageSize: 20 },
    { skip: false }
  )

  const handleSearch = (e) => {
    e.preventDefault()
    setName(inputValue)
    setPage(1)
  }

  useEffect(() => {
    if (!inputValue) {
      setName('')
      setPage(1)
    }
  }, [inputValue])

  const totalCount = data?.totalCount || 0
  const totalPages = Math.ceil(totalCount / 20)

  return (
    <div className="page search-page">
      <div className="search-hero">
        <h1 className="page-title">Card Explorer</h1>
        <p className="page-subtitle">Search over 15,000+ Pokémon TCG cards</p>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrap">
            <input
              type="text"
              placeholder="Search by name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">🔍</button>
          </div>

          <div className="filter-row">
            <select value={type} onChange={(e) => { setType(e.target.value); setPage(1) }} className="filter-select">
              <option value="">All Types</option>
              {TYPES.filter(Boolean).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select value={rarity} onChange={(e) => { setRarity(e.target.value); setPage(1) }} className="filter-select">
              <option value="">All Rarities</option>
              {RARITIES.filter(Boolean).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {isError && (
        <div className="error-msg">⚠ Failed to load cards. Check your connection.</div>
      )}

      {(isLoading || isFetching) && (
        <div className="loading-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="card-skeleton" style={{ animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      )}

      {!isLoading && !isFetching && data?.data?.length === 0 && (
        <div className="empty-msg">No cards found. Try a different search!</div>
      )}

      {!isLoading && !isFetching && data?.data?.length > 0 && (
        <>
          <p className="results-count">{totalCount.toLocaleString()} cards found</p>
          <div className="card-grid">
            {data.data.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ◀ Prev
              </button>
              <span className="page-info">Page {page} / {totalPages}</span>
              <button
                className="page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
