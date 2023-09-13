import { useEffect, useState } from "react";
import s from "./SearchBar.module.scss";
import { searchPokemon } from "../../api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import Pokeball from "../../assets/Pokeball.png";

const SearchBar = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [results, setResult] = useState<any[]>([]);

  const total = useAppSelector((state) => state.pokemons.total);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  async function pokemonRequest() {
    try {
      const pokemons = await searchPokemon(value, total);

      setResult(pokemons)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(value.length >= 3) {
      pokemonRequest()
    }
    if(value.length === 0) {
      setResult([])
    }
  }, [value])


  return (
    <div className={s.searchBar_container}>
      <div className={s.textField}>
        <input 
          placeholder="Choose your pokemon" 
          value={value} 
          onChange={handleChange} 
          style={results.length > 0 ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : {}}
        />
      </div>
      <div className={s.result}>
        <ul>
          {results.map((pokemon, index) => {
            const spriteIsNotFound = !pokemon.sprite;

            return (
              <li key={index} onClick={() => navigate(`pokemon/${pokemon.name}`)}>
                <div className={`${s.nameSprite} ${spriteIsNotFound && s.spriteNotFound}`}>
                  <img src={pokemon.sprite || Pokeball} alt="" />
                  <span>{pokemon.name}</span>
                </div>
                <div className={s.types}>
                  {pokemon.types.map(({type, slot}: any) => (
                    <span key={slot}>{type.name}</span>
                  ))}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;