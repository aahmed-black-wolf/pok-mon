import { serverFetch } from "@/src/utils/fetch/server";
import { TPokemonListResponse, TGetPokemonList } from "../../@types/pok-mon";

const normalize = (response: TPokemonListResponse): TPokemonListResponse => {
  return response as TPokemonListResponse;
};

export const getPokemonList = async (searchParams: TGetPokemonList) => {
  try {
    const response = await serverFetch.get("pokemon", {
      searchParams: searchParams,
    });
    const json = (await response?.json()) as TPokemonListResponse;

    console.log(json);

    return normalize(json);
  } catch (error) {
    console.log("error", error);
  }
};
