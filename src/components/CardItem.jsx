import { useDispatch, useSelector } from 'react-redux'
import { addCard, removeCard, selectCardCountInDeck } from '../features/deck/deckSlice'

const typeColors = {
  Fire: '#FF6B35',
  Water: '#4FC3F7',
  Grass: '#81C784',
  Lightning: '#FFD54F',
  Psychic: '#CE93D8',
  Fighting: '#A1887F',
  Darkness: '#7986CB',
  Metal: '#90A4AE',
  Dragon: '#4DB6AC',
  Colorless: '#BDBDBD',
  Fairy: '#F48FB1',
}

export default function CardItem({ card, showDeckControls = true }) {
  const dispatch = useDispatch()
  const countInDeck = useSelector(selectCardCountInDeck(card.id))

  const mainType = card.types?.[0]
  const accentColor = typeColors[mainType] || '#FFD700'

  const rarityStars = {
    Common: '●',
    Uncommon: '●●',
    Rare: '★',
    'Rare Holo': '★★',
    'Rare Ultra': '★★★',
    'Rare Secret': '✦',
  }

  return (
    <div
      className="card-item"
      style={{ '--accent': accentColor }}
    >
      <div className="card-img-wrap">
        <img
          src={card.images?.small}
          alt={card.name}
          loading="lazy"
          className="card-img"
        />
        {countInDeck > 0 && (
          <div className="deck-badge-overlay">×{countInDeck}</div>
        )}
      </div>

      <div className="card-info">
        <p className="card-name">{card.name}</p>
        <p className="card-meta">
          {card.supertype} {mainType ? `• ${mainType}` : ''}
        </p>
        <p className="card-rarity">{rarityStars[card.rarity] || ''} {card.rarity}</p>

        {card.cardmarket?.prices?.averageSellPrice && (
          <p className="card-price">
              ${card.cardmarket.prices.averageSellPrice.toFixed(2)}
          </p>
        )}
      </div>

      {showDeckControls && (
        <div className="card-actions">
          <button
            className="btn-add"
            onClick={() => dispatch(addCard(card))}
            title="Add to deck"
          >
            +
          </button>
          {countInDeck > 0 && (
            <button
              className="btn-remove"
              onClick={() => dispatch(removeCard(card.id))}
              title="Remove from deck"
            >
              −
            </button>
          )}
        </div>
      )}
    </div>
  )
}
