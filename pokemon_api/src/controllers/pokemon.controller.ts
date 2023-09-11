import { Request, Response } from "express";
import axiosInstance from "../axiosInstanceREST";


class pokemonController {
  getAllPokemon = async (req: Request, res: Response) => {
    const axiosResponse = await axiosInstance.get("pokemon");
    
    return res.status(200).json(axiosResponse.data.results.map((pokemon: any, index: number) => ({...pokemon, poster: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index+1}.png`})))
  }

}

export default new pokemonController()