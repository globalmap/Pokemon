export type PokemonType = "normal" | "fighting" | "flying" | "poison" | "ground" | "rock" | "bug" | "ghost" | "steel" | "fire" | "water" | "grass" | "electric" | "psychic" | "ice" | "dragon" | "dark" | "fairy";

export interface BasicPokemonType {
  name: string;
  url: string;
  poster: string;
  types: {
    slot: number;
    type: {
      name: PokemonType,
      url: string
    }
  }
}

interface versionGroupDetailsType{
  level_learned_at: number,
  move_learn_method: {
    name: string;
    url: string
  },
  version_group: {
    name: string;
    url: string
  }
}

export interface PokemonDetailsData {
  id: number;
  name: string;
  moves: {
    move: {
      name: string;
      url: string;
    },
    version_group_details: versionGroupDetailsType[]
  }[],
  stats: {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
  }[],
  types: {
    slot: number,
    type: {
        name: PokemonType,
        url: string
    }
  }[];
  sprites: any;
  sprite: string
}