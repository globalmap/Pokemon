import s from "./Filter.module.scss";
import { PokemonType } from "../../types/pokemon.types";
import { setFilter } from "../../store/slices/pokemonsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

const Filter = () => {
  const dispatch = useAppDispatch();
  const types = useAppSelector((state) => state.pokemons.types);
  const activeFilter = useAppSelector((state) => state.pokemons.filter.type);

  const handleFilter = (type: PokemonType) => {
    dispatch(setFilter({ type }));
  };

  return (
    <div className={s.filter}>
      <div className={s.filter_header}>
        <p>Filter by Type</p>
      </div>
      <div className={s.filter_content}>
        <ul>
          {types.map((type) => (
            <li
              key={type.name} 
              className={activeFilter === type.name ? `${s.active}` : ''} 
              onClick={() => handleFilter(type.name)}
            >
              {type.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;