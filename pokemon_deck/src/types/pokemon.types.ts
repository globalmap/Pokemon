export interface BasicPokemonType {
  name: string;
  url: string;
  poster: string;
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
        name: string,
        url: string
    }
  }[];
  sprites: any;
}