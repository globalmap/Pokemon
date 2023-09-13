import { Route, Routes } from "react-router-dom"
import Details from "./pages/Details/Details"
import MainPage from "./pages/MainPage/MainPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/pokemon/:id" element={<Details />} />
    </Routes>
  )
}

export default App
