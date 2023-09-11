import { useEffect } from "react";
import s from "./Details.module.scss";
import { useParams, Link } from "react-router-dom";
import { fetchPokemonData } from "../../../store/slices/pokemonsSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import PokemonCard from "../../PokemonCard/PokemonCard";

const Details = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.pokemons.details);

  const { id } = useParams();

  useEffect(() => {
    if(id) {
      dispatch(fetchPokemonData(id));
    }
  }, [])

  if(!data) {
    return <></>
  }

  return (
    <div className={s.details}>
      <Link to="/" className={s.details_back}>Back</Link>
      <div className={s.details_container}>
        <PokemonCard name={id} />
        <div className={s.information}>
          <h1 className={s.information_name}>{data.name}</h1>
          <hr />
          <div className={s.information_stats_moves}>
            <div className={s.information_stats}>
              <h2>STATS</h2>
              {data.stats.map((stat) => (
                <p><b>{stat.stat.name}</b>: {stat.base_stat}</p>
              ))}
            </div>
            <hr />
            <div className={s.information_moves}>
              <h2>MOVES</h2>
              <div>
                {data.moves.map(({move}) => (
                  <p><span>{move.name}</span></p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;