import { Request, Response } from "express";
import axiosInstance from "../axiosInstanceREST";


class pokemonController {
  async getAllPokemon(req: Request, res: Response) {
    const limit = req.query.limit;
    const offset = req.query.offset;
    
    const axiosResponse = await axiosInstance.get(`pokemon?limit=${limit}&offset=${offset}`);

    let nextLinkParams = "";

    if(axiosResponse.data.next) {
      nextLinkParams =  axiosResponse.data.next.split("https://pokeapi.co/api/v2/pokemon?")
    }

    return res.status(200).json({list: axiosResponse.data.results, total: axiosResponse.data.count, nextLinkParams: nextLinkParams[1]})
  }

  async getPokemonData(req: Request, res:Response) {
    const { name } = req.params;

    const axiosResponse = await axiosInstance.get(`pokemon/${name}`);

    return res.status(200).json({
      id: axiosResponse.data.id,
      name: axiosResponse.data.name,
      moves: axiosResponse.data.moves,
      stats: axiosResponse.data.stats,
      types: axiosResponse.data.types,
      sprites: axiosResponse.data.sprites
    })
  }

  async getPokemonArt(req: Request, res: Response) {
    const { name } = req.params;
    
    const axiosResponse = await axiosInstance.get(`pokemon/${name}`);

    return res.status(200).json(axiosResponse.data.sprites.other["official-artwork"].front_default)
  }
}

export default new pokemonController()