import { useEffect } from 'react';
import s from "./PokemonList.module.scss";
import { clearDetails, fetchPokemonTypes, fetchPokemons } from '../../store/slices/pokemonsSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import PokemonCard from '../PokemonCard/PokemonCard';
import { loadingType } from '../../types/basicTypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectPokemons } from '../../store/selectors/pokemons.selector';

const INITIAL_LIMIT = 60;

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemons);
  const totalPokemons = useAppSelector((state) => state.pokemons.total);
  const loading = useAppSelector((state) => state.pokemons.loading);

  useEffect(() => {
    if (loading === loadingType.IDLE) {
      dispatch(fetchPokemons(`limit=${INITIAL_LIMIT}`));
      dispatch(fetchPokemonTypes());
      dispatch(clearDetails());
    }
  }, [loading, dispatch]);

  return (
    <div className={s.list_container}>
      <InfiniteScroll
        dataLength={pokemons.length}
        next={() => dispatch(fetchPokemons(`limit=${INITIAL_LIMIT}&offset=${pokemons.length}`))}
        hasMore={pokemons.length !== totalPokemons}
        loader={<h4>Loading...</h4>}
        className={s.infiniteScroll} 
        endMessage={<p className={s.endMessage}><b>Yay! You've seen it all!</b></p>}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;