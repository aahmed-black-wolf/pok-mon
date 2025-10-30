import { serverFetch } from "@/src/utils/fetch/server";
import { TPokemonDataResponse, TPokemonId } from "../../@types/pok-mon";

const normalize = (response: TPokemonDataResponse): TPokemonDataResponse => {
  return response as TPokemonDataResponse;
};

export const getPokemonData = async ({
  id,
}: {
  id: TPokemonId;
}): Promise<TPokemonDataResponse> => {
  try {
    const response = await serverFetch.get(`pokemon/${id}`);

    const json = (await response?.json()) as TPokemonDataResponse;

    return normalize(json);
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
