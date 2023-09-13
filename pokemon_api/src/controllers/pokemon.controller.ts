import { Request, Response } from "express";
import axiosInstance from "../axiosInstanceREST";

class PokemonController {
  getAllPokemon = async (req: Request, res: Response) => {
    const limit = req.query.limit;
    const offset = req.query.offset;

    const axiosResponse = await axiosInstance.get(`pokemon?limit=${limit}&offset=${offset}`);

    let nextLinkParams = "";

    if(axiosResponse.data.next) {
      nextLinkParams = axiosResponse.data.next.split("https://pokeapi.co/api/v2/pokemon?")[1];
    }

    const mappingList = await Promise.all(axiosResponse.data.results.map(async (result: any) => {
        const details = await axiosInstance.get(`pokemon/${result.name}`);
        return {
          ...result,
          types: details.data.types
        };
      }));

    res.status(200).json({
      list: mappingList,
      total: axiosResponse.data.count,
      nextLinkParams: nextLinkParams
    });
  }

  getPokemonData = async (req: Request, res: Response) => {
    const { name } = req.params;

    const axiosResponse = await axiosInstance.get(`pokemon/${name}`);

    res.status(200).json({
      id: axiosResponse.data.id,
      name: axiosResponse.data.name,
      moves: axiosResponse.data.moves,
      stats: axiosResponse.data.stats,
      types: axiosResponse.data.types,
      sprites: axiosResponse.data.sprites
    });
  }

  getPokemonArt = async (req: Request, res: Response) => {
    const { name } = req.params;
    const axiosResponse = await axiosInstance.get(`pokemon/${name}`);

    res.status(200).json(axiosResponse.data.sprites.other["official-artwork"].front_default);
  }

  searchPokemon = async (req: Request, res: Response) => {
    const { name, pokemonCount } = req.query;

    if (!name) {
      return res.status(404).json({
        type: "Not Found",
        text: "Query Params \"Name\" Not Found"
      });
    }

    try {
      const { data: { results: pokemons } } = await axiosInstance.get(`pokemon?limit=${pokemonCount}`);
      const findPokemons = pokemons.filter((pokemon: any) => pokemon.name.toLowerCase().includes(String(name).toLowerCase()));

      const mappingList = await Promise.all(findPokemons.map(async (result: any) => {
        const details = await axiosInstance.get(`pokemon/${result.name}`);
        return {
          ...result,
          types: details.data.types,
          sprite: details.data.sprites.front_default
        };
      }));

      res.status(200).json({ pokemons: mappingList });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  getType = async (req: Request, res: Response) => {
    try {
      const { data: { results } } = await axiosInstance.get("type");

      const mappingList = await Promise.all(results.map(async (result: any) => {
        const details = await axiosInstance.get(`type/${result.name}`);
        return {
          ...result,
          pokemons: details.data.pokemon.map((pkmn: any) => ({ name: pkmn.pokemon.name }))
        };
      }));

      res.status(200).json({ types: mappingList });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new PokemonController();
