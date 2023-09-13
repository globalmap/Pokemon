import s from "./MainPage.module.scss";
import Filter from "../../components/Filter/Filter";
import PokemonList from "../../components/PokemonList/PokemonList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loadingType } from "../../types/basicTypes";
import Preloader from "../../assets/Prealoader.gif"


const MainPage = () => {
  const loading = useAppSelector((state) => state.pokemons.loading);

    if (loading === loadingType.PENDING) {
    return <div className={s.preloader}>
      <img src={Preloader} />
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