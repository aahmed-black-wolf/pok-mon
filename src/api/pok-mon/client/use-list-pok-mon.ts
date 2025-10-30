import { clientFetch } from "@/src/utils/fetch/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TPokemonListResponse, TGetPokemonList } from "../../@types/pok-mon";

type TUsePokemonList = {
  initialValues?: TPokemonListResponse;
  limit?: number;
  offset?: number;
};

const getPokemonList = async ({ offset = 0, limit = 20 }: TGetPokemonList) => {
  const response = await clientFetch.get(
    `pokemon?limit=${limit}&offset=${offset}`
  );
  const json = (await response.json()) as TPokemonListResponse;
  return json;
};

export const usePokemonList = ({
  initialValues,
  limit,
  offset,
}: TUsePokemonList) => {
  const queryInitialData = initialValues ? initialValues : undefined;

  const query = useQuery<TPokemonListResponse>({
    queryKey: ["POKMON-LIST"],
    initialData: queryInitialData,
    queryFn: () => getPokemonList({ limit, offset }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  return query;
};
