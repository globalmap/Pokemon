import { useEffect, useState } from "react";
import s from "./PokemonCard.module.scss";
import axiosInstance from "../../api/axiosInstance";

interface PokemonCardType {
  name?: string;
}

const PokemonCard = ({name}: PokemonCardType) => {
  const [art, setArt] = useState("");

  const isDetailPage = window.location.href.includes(`pokemon/${name}`)

  useEffect(() => {
    axiosInstance.get(`pokemon/art/${name}`).then((res) => setArt(res.data))
  }, [name])
  
  return (
    <div className={`${s.container} ${isDetailPage && s.detailPageCard}`}>
      <div className={s.imageBlock}>
        <img src={art} />
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