import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDeck, selectDeckCount } from '../features/deck/deckSlice'

export default function Navbar() {
  const dispatch = useDispatch()
  const deckCount = useSelector(selectDeckCount)
  const location = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-pixel"></span>
        PokéTCG
      </Link>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          🔍 Search
        </Link>
        <Link to="/pack" className={`nav-link ${location.pathname === '/pack' ? 'active' : ''}`}>
          Open Pack
        </Link>
        <button className="deck-btn" onClick={() => dispatch(toggleDeck())}>
          Deck
          {deckCount > 0 && <span className="deck-badge">{deckCount}/60</span>}
        </button>
      </div>
    </nav>
  )
}
