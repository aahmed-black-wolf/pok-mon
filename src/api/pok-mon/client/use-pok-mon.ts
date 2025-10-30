import { clientFetch } from "@/src/utils/fetch/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TPokemonResponse, TPokmonId } from "../../@types/pok-mon";

type TUsePokmonData = {
  initialValues?: TPokemonResponse[];
  id?: TPokmonId;
};

const getPokmonData = async ({ id = 1 }: { id?: TPokmonId }) => {
  const response = await clientFetch.get(`pokemon/${id}`);
  const json = (await response.json()) as TPokemonResponse[];
  return json;
};

export const usePokmonData = ({ initialValues, id }: TUsePokmonData) => {
  const queryInitialData = initialValues ? initialValues : undefined;

  const query = useQuery<TPokemonResponse[]>({
    queryKey: ["POKMON", id],
    initialData: queryInitialData,
    queryFn: () => getPokmonData({ id }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  return query;
};
