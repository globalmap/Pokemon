import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';


import s from "./PokemonList.module.scss";
import { fetchPokemons } from '../../store/slices/pokemonsSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import PokemonCard from '../PokemonCard/PokemonCard';
import { loadingType } from '../../types/basicTypes';

const PokemonList = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemons.list);
  const loading = useAppSelector((state) => state.pokemons.loading);
  const error = useAppSelector((state) => state.pokemons.error);
  const totalPokemons = useAppSelector((state) => state.pokemons.total);
  
  const [activePage, setActivePage] = useState(1);

  const pageCount = Math.ceil(totalPokemons / 60)

  useEffect(() => {
    if (loading === loadingType.IDLE) {
      dispatch(fetchPokemons("limit=60"));
    }
  }, [loading, dispatch]);

  if (loading === loadingType.PENDING) {
    return <p>Loading...</p>;
  }

  if (loading === loadingType.ERROR) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className={s.list_container}>
        {pokemons.map((pokemon, index) => (
          <Link to={`pokemon/${pokemon.name}`}>
            <PokemonCard key={index} name={pokemon.name} />
          </Link>
        ))}
      </div>
      <hr />
      <ReactPaginate
        containerClassName={s.paginationContainer}
        pageClassName={s.paginationPage}
        previousClassName={s.paginationPage}
        nextClassName={s.paginationPage}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={({selected}) => {
          dispatch(fetchPokemons(`limit=60&offset=${selected*60}`));
        }}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default PokemonList;