import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPack, revealNext, revealAll, resetPack } from '../features/pack/packSlice'
import { addCard } from '../features/deck/deckSlice'

const rarityGlow = {
  Common: 'none',
  Uncommon: '0 0 12px #81C784',
  Rare: '0 0 20px #FFD700',
  'Rare Holo': '0 0 30px #FFD700, 0 0 60px #FFD70066',
  'Rare Ultra': '0 0 30px #CE93D8, 0 0 60px #CE93D866',
  'Rare Secret': '0 0 40px #4FC3F7, 0 0 80px #4FC3F766',
}

export default function PackPage() {
  const dispatch = useDispatch()
  const { cards, revealedIndex, isOpening, isRevealing, error } = useSelector((s) => s.pack)
  const autoRef = useRef(null)

  // Auto-reveal one card every 600ms
  useEffect(() => {
    if (!isRevealing) return
    autoRef.current = setInterval(() => {
      dispatch(revealNext())
    }, 600)
    return () => clearInterval(autoRef.current)
  }, [isRevealing, dispatch])

  // Stop when all revealed
  useEffect(() => {
    if (isRevealing && revealedIndex >= cards.length - 1) {
      clearInterval(autoRef.current)
      dispatch(revealAll())
    }
  }, [revealedIndex, cards.length, isRevealing, dispatch])

  const handleOpen = () => {
    dispatch(openPack())
  }

  const isDone = !isRevealing && cards.length > 0

  return (
    <div className="page pack-page">
      <div className="pack-hero">
        <h1 className="page-title">Pack Opening</h1>
        <p className="page-subtitle">10-Card Pack Opening</p>
      </div>

      {error && <div className="error-msg">⚠ {error}</div>}

      {/* Initial / Reset state */}
      {!isOpening && cards.length === 0 && (
        <div className="pack-start">
          <div className="pack-visual">
            <img src="/card.png" alt="Card Pack" className="pack-card-anim" />
            <p className="pack-flavor">What's inside? Only one way to find out...</p>
          </div>
          <button className="btn-open-pack" onClick={handleOpen}>
            Open a Pack
          </button>
        </div>
      )}

      {/* Loading */}
      {isOpening && (
        <div className="pack-loading">
          <img src="/card.png" alt="Card Pack" className="pack-shimmer" />
          <p className="pack-loading-text">Opening pack...</p>
        </div>
      )}

      {/* Reveal */}
      {!isOpening && cards.length > 0 && (
        <>
          <div className="pack-reveal-grid">
            {cards.map((card, i) => {
              const revealed = i <= revealedIndex
              const glow = rarityGlow[card.rarity] || 'none'
              return (
                <div
                  key={card.id + i}
                  className={`pack-card ${revealed ? 'pack-card--revealed' : 'pack-card--hidden'}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {revealed ? (
                    <div className="pack-card-inner" style={{ filter: 'drop-shadow(' + (glow === 'none' ? 'none' : glow) + ')' }}>
                      <img src={card.images?.small} alt={card.name} className="pack-card-img" />
                      <div className="pack-card-label">
                        <span className="pack-card-name">{card.name}</span>
                        <span className="pack-card-rarity">{card.rarity}</span>
                      </div>
                      <button
                        className="pack-add-btn"
                        onClick={() => dispatch(addCard(card))}
                        title="Add to deck"
                      >
                        + Deck
                      </button>
                    </div>
                  ) : (
                    <div className="pack-card-back">
                      <span>?</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {isDone && (
            <div className="pack-done-actions">
              <button className="btn-open-pack" onClick={handleOpen}>
                Open Another Pack
              </button>
              <button className="btn-secondary" onClick={() => dispatch(resetPack())}>
                ✕ Close
              </button>
            </div>
          )}

          {isRevealing && (
            <div className="pack-skip">
              <button className="btn-skip" onClick={() => dispatch(revealAll())}>
                Skip → Reveal All
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
