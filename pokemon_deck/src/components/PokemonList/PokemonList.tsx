import { useEffect } from 'react';

import { fetchPokemons } from '../../store/slices/pokemonsSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemons.list);
  const loading = useAppSelector((state) => state.pokemons.loading);
  const error = useAppSelector((state) => state.pokemons.error);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [loading, dispatch]);

  if (loading === 'pending') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {pokemons.map((pokemon, index) => (
        <li key={index}>{pokemon.name}</li>
      ))}
    </ul>
  );
};

export default PokemonList;