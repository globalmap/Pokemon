import { RootState } from "../types/store.types";

export const selectPokemons = (state: RootState) => {
  let list = state.pokemons.list;
  const filter = state.pokemons.filter.type;

  if (filter) {
    const typeObject = state.pokemons.types.find((type) => type.name === filter);
    if (typeObject) {
      list = typeObject.pokemons;
    }
  }

  return list;
};