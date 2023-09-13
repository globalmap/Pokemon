import { useEffect, useState, useCallback } from "react";
import s from "./SearchBar.module.scss";
import { searchPokemon } from "../../api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import Pokeball from "../../assets/Pokeball.png";
import { PokemonDetailsData } from "../../types/pokemon.types";

const SearchBar = () => {
  const navigate = useNavigate();
  const total = useAppSelector((state) => state.pokemons.total);

  const [value, setValue] = useState("");
  const [results, setResult] = useState<PokemonDetailsData[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const pokemonRequest = useCallback(async () => {
    try {
      const pokemons = await searchPokemon(value, total);
      setResult(pokemons);
    } catch (err) {
      console.error("Error fetching pokemons:", err);
    }
  }, [value, total]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.length >= 3) {
        pokemonRequest();
      }
      if (value.length === 0) {
        setResult([]);
      }
    }, 300); // Debounce time

    return () => clearTimeout(timer); // Cleanup on unmount or value change
  }, [value, pokemonRequest]);

  return (
    <div className={s.searchBar_container}>
      <div className={s.textField}>
        <input 
          placeholder="Choose your pokemon" 
          value={value} 
          onChange={handleChange} 
          className={results.length > 0 ? s.active : ''}
        />
      </div>
      <div className={s.result}>
        <ul>
          {results.map(pokemon => (
            <li key={pokemon.name} onClick={() => navigate(`pokemon/${pokemon.name}`)}>
              <div className={`${s.nameSprite} ${!pokemon.sprite && s.spriteNotFound}`}>
                <img src={pokemon.sprite || Pokeball} alt={pokemon.name} />
                <span>{pokemon.name}</span>
              </div>
              <div className={s.types}>
                {pokemon.types.map(({ type, slot }) => (
                  <span key={slot}>{type.name}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;