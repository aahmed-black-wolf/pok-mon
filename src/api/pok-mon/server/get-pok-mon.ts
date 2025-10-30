import { serverFetch } from "@/src/utils/fetch/server";
import { TPokemonDataResponse, TPokmonId } from "../../@types/pok-mon";

const normalize = (
  response: TPokemonDataResponse[]
): TPokemonDataResponse[] => {
  return response as TPokemonDataResponse[];
};

export const getPokmonData = async ({ id }: { id: TPokmonId }) => {
  try {
    const response = await serverFetch.get(`pokemon/${id}`);

    const json = (await response?.json()) as TPokemonDataResponse[];

    return normalize(json);
  } catch (error) {
    console.log("error", error);
  }
};
