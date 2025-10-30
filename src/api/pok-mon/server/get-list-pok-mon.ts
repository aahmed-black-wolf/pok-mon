import { serverFetch } from "@/src/utils/fetch/server";
import { TPokemonListResponse, TGetPokemonList } from "../../@types/pok-mon";

const normalize = (response: TPokemonListResponse): TPokemonListResponse => {
  return response as TPokemonListResponse;
};

export const getPokemonList = async ({
  offset = 0,
  limit = 20,
}: TGetPokemonList) => {
  try {
    const response = await serverFetch.get(
      `pokemon?limit=${limit}&offset=${offset}`
    );

    const json = (await response?.json()) as TPokemonListResponse;

    return normalize(json);
  } catch (error) {
    console.log("error", error);
  }
};
