import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import s from "./PokemonCard.module.scss";
import axiosInstance from "../../api/axiosInstance";
import Pokeboll from "../../assets/Pokeball.png";

interface PokemonCardType {
  name?: string;
}

const PokemonCard = ({ name }: PokemonCardType) => {
  const navigate = useNavigate();
  const { pokemonName } = useParams<{ pokemonName?: string }>();

  const [art, setArt] = useState("");

  const isDetailPage = pokemonName === name;

  const handleClick = () => {
    navigate(`pokemon/${name}`)
  }

  useEffect(() => {
    setArt("");

    axiosInstance.get(`pokemon/art/${name}`)
      .then((res) => setArt(res.data))
      .catch((error) => {
        console.error("Error fetching pokemon art:", error);
      });

  }, [name]);
  
  return (
    <div className={`${s.container} ${isDetailPage ? s.detailPageCard : ''}`} onClick={handleClick}>
      <div className={s.imageBlock}>
        <img src={art || Pokeboll} alt={`Art of ${name}`} />
      </div>
      {!isDetailPage && (
        <div className={s.infoBlock}>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;