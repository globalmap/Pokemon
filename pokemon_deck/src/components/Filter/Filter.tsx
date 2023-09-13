import { useState } from "react";
import s from "./Filter.module.scss";
import { PokemonType } from "../../types/pokemon.types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setFilter } from "../../store/slices/pokemonsSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const Filter = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  
  const types = useAppSelector((state) => state.pokemons.types);
  const activeFilter = useAppSelector((state) => state.pokemons.filter.type);
  
  const handleClickHeader = () => setOpen(!open)

  const handleFilter = (type: PokemonType) => {
    dispatch(setFilter({type: type}))
  }
  return (
    <div className={s.filter}>
      <div className={s.filter_header} onClick={handleClickHeader}>
        <p>Filter by Type</p>
      </div>
      <div className={s.filter_content}>
        <ul>
          {types.map((type) => (
            <li className={`${activeFilter === type.name && s.active}`} onClick={() => handleFilter(type.name)}>{type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filter;