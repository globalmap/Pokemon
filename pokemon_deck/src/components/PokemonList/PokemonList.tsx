//@ts-nocheck
import { useEffect } from 'react';
import s from "./PokemonList.module.scss";
import { fetchPokemonTypes, fetchPokemons } from '../../store/slices/pokemonsSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import PokemonCard from '../PokemonCard/PokemonCard';
import { loadingType } from '../../types/basicTypes';
import SearchBar from '../SearchBar/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Filter from '../Filter/Filter';
import Preloader from "../../assets/Prealoader.gif"

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => {
    let list = state.pokemons.list;
    const filter = state.pokemons.filter.type

    if(filter) {
      const typeObject = state.pokemons.types.find((type) => type.name === filter);

      if(typeObject) {
        list = typeObject.pokemons;
      }
    }

    return list;
  });
  const totalPokemons = useAppSelector((state) => state.pokemons.total);
  const loading = useAppSelector((state) => state.pokemons.loading);
  const error = useAppSelector((state) => state.pokemons.error);
  
  useEffect(() => {
    if (loading === loadingType.IDLE) {
      dispatch(fetchPokemons("limit=60"));
      dispatch(fetchPokemonTypes())
    }
  }, [loading, dispatch]);

  if (loading === loadingType.PENDING) {
    return <div className={s.preloader}>
      <img src={Preloader} />
    </div>;
  }

  if (loading === loadingType.ERROR) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{padding: "0 4rem"}}>
      <div>
        <SearchBar />
        <Filter />
      </div>
      <div className={s.list_container}>
        <InfiniteScroll
          dataLength={pokemons.length*10}
          next={() => {
              dispatch(fetchPokemons(`limit=60&offset=${pokemons.length}`))
          }}
          hasMore={pokemons.length !== totalPokemons}
          loader={<h4>Loading...</h4>}
          style={{display: "flex", flexWrap: "wrap"}}
          endMessage={<p style={{textAlign:'center'}}><b>Yay! You've seen it all!</b></p>}
        >
          {pokemons.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} />
          ))}
        </InfiniteScroll>
        
      </div>
      {/* <button className={s.showMoreButton} onClick={() => {
        dispatch(fetchPokemons(`limit=60&offset=${pokemons.length}`))
      }}>Show More</button> */}
    </div>
  );
};

export default PokemonList;