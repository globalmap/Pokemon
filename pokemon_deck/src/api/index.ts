import axiosInstance from "./axiosInstance"

export const getPokemonData = async (name: string) => {
  const {data} = await axiosInstance.get(`pokemon/${name}`);

  return data;
}

export const searchPokemon = async (name: string, pokemonCount: number) => {
  const {data: {pokemons}} = await axiosInstance.get(`pokemon/search?name=${name}&pokemonCount=${pokemonCount}`);

  return pokemons;
}