import { BasicPokemonType, PokemonDetailsData } from "../../types/pokemon.types";
import { loadingType } from "../../types/basicTypes";

export interface PokemonInitialStateType {
  list: BasicPokemonType[],
  loading: loadingType;
  error: string;
  details: PokemonDetailsData | undefined;
  total: number;
  nextLinkParams: string
}