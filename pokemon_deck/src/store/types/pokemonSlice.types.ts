import { BasicPokemonType, PokemonDetailsData, PokemonType } from "../../types/pokemon.types";
import { loadingType } from "../../types/basicTypes";

export interface PokemonInitialStateType {
  list: BasicPokemonType[],
  loading: loadingType;
  error: string;
  details: PokemonDetailsData | undefined;
  total: number;
  nextLinkParams: string;
  types: {
    name: PokemonType,
    url: string,
    pokemons: {name: string}[]
  }[];
  filter: {
    type: PokemonType | ""
  }
}