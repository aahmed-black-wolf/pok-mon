import { clientFetch } from "@/src/utils/fetch/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TPokemonDataResponse, TPokmonId } from "../../@types/pok-mon";

type TUsePokmonData = {
  initialValues?: TPokemonDataResponse[];
  id?: TPokmonId;
};

const getPokmonData = async ({ id = 1 }: { id?: TPokmonId }) => {
  const response = await clientFetch.get(`pokemon/${id}`);
  const json = (await response.json()) as TPokemonDataResponse[];
  return json;
};

export const usePokmonData = ({ initialValues, id }: TUsePokmonData) => {
  const queryInitialData = initialValues ? initialValues : undefined;

  const query = useQuery<TPokemonDataResponse[]>({
    queryKey: ["POKMON", id],
    initialData: queryInitialData,
    queryFn: () => getPokmonData({ id }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  return query;
};
