import s from "./MainPage.module.scss";
import Filter from "../../components/Filter/Filter";
import PokemonList from "../../components/PokemonList/PokemonList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loadingType } from "../../types/basicTypes";
import Preloader from "../../assets/Prealoader.gif"
import Error from "../../assets/Error.gif";


const MainPage = () => {
  const loading = useAppSelector((state) => state.pokemons.loading);
  const error = useAppSelector((state) => state.pokemons.error);

  if (loading === loadingType.PENDING) {
    return <div className={s.preloader}>
      <img src={Preloader} />
    </div>;
  }

  
  if (loading === loadingType.ERROR) {
    return <div className={s.error}>
      <img src={Error} alt="" />
      <p>Error: {error}</p>
    </div>;
  }
  return (
    <div className={s.mainPage}>
      <div >
        <SearchBar />
        <Filter />
      </div>
      <PokemonList />
    </div>
  )
}

export default MainPage;