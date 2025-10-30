import { clientFetch } from "@/src/utils/fetch/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TPokemonDataResponse, TPokemonId } from "../../@types/pok-mon";

type TUsePokemonData = {
  initialValues?: TPokemonDataResponse;
  id?: TPokemonId;
};

const getPokemonData = async ({ id = 1 }: { id?: TPokemonId }) => {
  const response = await clientFetch.get(`pokemon/${id}`);
  const json = (await response.json()) as TPokemonDataResponse;
  return json;
};

export const usePokemonData = ({ initialValues, id }: TUsePokemonData) => {
  const queryInitialData = initialValues ? initialValues : undefined;

  const query = useQuery<TPokemonDataResponse>({
    queryKey: ["POKMON", id],
    initialData: queryInitialData,
    queryFn: () => getPokemonData({ id }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  return query;
};
