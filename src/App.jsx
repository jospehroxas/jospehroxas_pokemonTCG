import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DeckPanel from './components/DeckPanel'
import SearchPage from './pages/SearchPage'
import PackPage from './pages/PackPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/pack" element={<PackPage />} />
          </Routes>
        </main>
        <DeckPanel />
      </div>
    </BrowserRouter>
  )
}
