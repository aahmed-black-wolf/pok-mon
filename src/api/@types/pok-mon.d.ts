export type TPokemonResults = {
  name: string;
  url: string;
};
export type TPokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPokemonResults[];
};

export type TGetPokemonList = {
  offset?: number | string;
  limit?: number | string;
};

export type TPokemonId = number | string;

export type TPokemonDataResponse = {
  id: number;
  name: string;
  order: number;
  height: number;
  base_experience: number;
  is_default: boolean;
  location_area_encounters: string;

  abilities: TPokemonAbility[];
  moves: TPokemonMove[];
  game_indices: TGameIndex[];
  forms: TNamedAPIResource[];
  past_abilities: TPastAbility[];
  past_types: TPastType[];
  cries: TPokemonCries;
};

export type TPokemonAbility = {
  ability: TNamedAPIResource;
  is_hidden: boolean;
  slot: number;
};

export type TPokemonMove = {
  move: TNamedAPIResource;
  version_group_details: TVersionGroupDetail[];
};

export type TVersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: TNamedAPIResource;
  version_group: TNamedAPIResource;
  order: number | null;
};

export type TGameIndex = {
  game_index: number;
  version: TNamedAPIResource;
};

export type TPastAbility = {
  abilities: {
    ability: TNamedAPIResource | null;
    is_hidden: boolean;
    slot: number;
  }[];
  generation: TNamedAPIResource;
};

export type TPastType = {
  generation?: TNamedAPIResource;
  types?: {
    slot: number;
    type: TNamedAPIResource;
  }[];
};

export type TPokemonCries = {
  latest: string;
  legacy: string;
};

export type TNamedAPIResource = {
  name: string;
  url: string;
};
