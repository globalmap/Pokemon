import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./PokemonCard.module.scss";
import axiosInstance from "../../api/axiosInstance";
import Pokeboll from "../../assets/Pokeball.png";

interface PokemonCardType {
  name?: string;
}

const PokemonCard = ({name}: PokemonCardType) => {
  const navigate = useNavigate();

  const [art, setArt] = useState("");

  const isDetailPage = window.location.href.includes(`pokemon/${name}`)

  const handleClick = () => {
    navigate(`pokemon/${name}`)
  }
  
  useEffect(() => {
    setArt("")
    axiosInstance.get(`pokemon/art/${name}`).then((res) => setArt(res.data))
  }, [name])
  
  return (
    <div className={`${s.container} ${isDetailPage && s.detailPageCard}`} onClick={handleClick}>
      <div className={s.imageBlock}>
        <img src={art || Pokeboll} />
      </div>
      {!isDetailPage && (
        <div className={s.infoBlock}>
          <p>{name}</p>
        </div>
      )}
    </div>
  )
}

export default PokemonCard;