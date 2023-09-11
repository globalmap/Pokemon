import { Route, Routes } from "react-router-dom"
import PokemonList from "./components/PokemonList/PokemonList"
import Details from "./components/pages/Details/Details"

function App() {

  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:id" element={<Details />} />
    </Routes>
  )
}

export default App
