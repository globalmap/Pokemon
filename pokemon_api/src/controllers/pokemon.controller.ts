import { Request, Response } from "express";
import axiosInstance from "../axiosInstanceREST";

class PokemonController {
  async getAllPokemon(req: Request, res: Response) {
    try {
      const { limit, offset } = req.query;

      const axiosResponse = await axiosInstance.get(`pokemon?limit=${limit}&offset=${offset}`);
      const nextLinkParams = axiosResponse.data.next ? axiosResponse.data.next.split("https://pokeapi.co/api/v2/pokemon?")[1] : "";

      const mappingList = await this.mapPokemonDetails(axiosResponse.data.results);
      
      res.status(200).json({ list: mappingList, total: axiosResponse.data.count, nextLinkParams });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getPokemonData(req: Request, res: Response) {
    try {
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
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getPokemonArt(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const axiosResponse = await axiosInstance.get(`pokemon/${name}`);

      res.status(200).json(axiosResponse.data.sprites.other["official-artwork"].front_default);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async searchPokemon(req: Request, res: Response) {
    try {
      const { name, pokemonCount } = req.query;
      if (!name) return res.status(404).json({ type: "Not Found", text: "Query Params \"Name\" Not Found" });

      const { data: { results: pokemons } } = await axiosInstance.get(`pokemon?limit=${pokemonCount}`);
      const findPokemons = pokemons.filter((pokemon: any) => pokemon.name.toLowerCase().includes(String(name).toLowerCase()));

      const mappingList = await this.mapPokemonDetails(findPokemons);

      res.status(200).json({ pokemons: mappingList });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getType(req: Request, res: Response) {
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
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private async mapPokemonDetails(pokemonList: any[]) {
    return Promise.all(pokemonList.map(async (result: any) => {
      const details = await axiosInstance.get(`pokemon/${result.name}`);
      return {
        ...result,
        types: details.data.types,
        sprite: details.data.sprites.front_default
      };
    }));
  }

  private handleError(res: Response, error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Unknown error occurred" });
  }
}

export default new PokemonController();