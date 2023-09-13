import { BasicPokemonType, PokemonDetailsData, PokemonType } from "../../types/pokemon.types";
import { loadingType } from "../../types/basicTypes";

export interface basicType {
  name: PokemonType,
  url: string,
  pokemons: BasicPokemonType[]
}

export interface PokemonInitialStateType {
  list: BasicPokemonType[],
  loading: loadingType;
  error: string;
  details: PokemonDetailsData | undefined;
  total: number;
  nextLinkParams: string;
  types: basicType[];
  filter: {
    type: PokemonType | ""
  }
}