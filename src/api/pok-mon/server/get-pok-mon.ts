import { serverFetch } from "@/src/utils/fetch/server";
import { TPokemonResponse, TPokmonId } from "../../@types/pok-mon";

const normalize = (response: TPokemonResponse[]): TPokemonResponse[] => {
  return response as TPokemonResponse[];
};

export const getPokmonData = async ({ id }: { id: TPokmonId }) => {
  try {
    const response = await serverFetch.get(`pokemon/${id}`);

    const json = (await response?.json()) as TPokemonResponse[];

    return normalize(json);
  } catch (error) {
    console.log("error", error);
  }
};
