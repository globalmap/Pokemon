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

    const mappingList = await Promise.all(axiosResponse.data.results.map(async (result: any) => {
        const details = await axiosInstance.get(`pokemon/${result.name}`);
        return {
          ...result,
          types: details.data.types
        }
      }))

    return res.status(200).json({
      list: mappingList, 
      total: axiosResponse.data.count, 
      nextLinkParams: nextLinkParams[1]
    })
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

  async serchPokemon(req:Request, res: Response) {
    const { name, pokemonCount } = req.query;

    if(!name) return res.status(404).json({
                        type: "Not Fount",
                        text: "Query Params \"Name\" Not Found"
                      })

    try {

      const {data: {results: pokemons}} = await axiosInstance.get(`pokemon?limit=${pokemonCount}`);
      
      const findPokemons = pokemons.filter((pokemon: any) => pokemon.name.toLowerCase().includes(String(name).toLowerCase()));

      const mappingList = await Promise.all(findPokemons.map(async (result: any) => {
        const details = await axiosInstance.get(`pokemon/${result.name}`);
        return {
          ...result,
          types: details.data.types,
          sprite: details.data.sprites.front_default
        }
      }))

      return res.status(200).json({pokemons: mappingList})
    } catch (err) {
      return res.status(500).json(err)

    }
  }

  async getType(req: Request, res: Response) {
    try {
      const {data: {results}} = await axiosInstance.get("type");

      const mappingList = await Promise.all(results.map(async (result: any) => {
        const details = await axiosInstance.get(`type/${result.name}`);

        return {
          ...result,
          pokemons: details.data.pokemon.map((pkmn: any) => ({name: pkmn.pokemon.name}))
        }
      }))

      return res.status(200).json({types: mappingList})
    } catch (err) {
      console.log(err)
    }
  }
}

export default new pokemonController()