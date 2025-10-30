import { clientFetch } from "@/src/utils/fetch/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TPokemonListResponse, TGetPokmonList } from "../../@types/pok-mon";

type TUsePokmonList = {
  initialValues?: TPokemonListResponse;
  limit?: number;
  offset?: number;
};

const getPokmonList = async ({ offset = 0, limit = 10 }: TGetPokmonList) => {
  const response = await clientFetch.get(
    `pokemon?limit=${limit}&offset=${offset}`
  );
  const json = (await response.json()) as TPokemonListResponse;
  return json;
};

export const usePokmonList = ({
  initialValues,
  limit,
  offset,
}: TUsePokmonList) => {
  const queryInitialData = initialValues ? initialValues : undefined;

  const query = useQuery<TPokemonListResponse>({
    queryKey: ["POKMON-LIST"],
    initialData: queryInitialData,
    queryFn: () => getPokmonList({ limit, offset }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  return query;
};
