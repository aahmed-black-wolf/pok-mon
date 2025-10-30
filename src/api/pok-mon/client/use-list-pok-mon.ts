import { clientFetch } from "@/src/utils/fetch/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TPokemonListResponse } from "../../@types/pok-mon";
import { ReadonlyURLSearchParams } from "next/navigation";

type TUsePokemonList = {
  initialValues?: TPokemonListResponse;
  searchParams: ReadonlyURLSearchParams;
};

const getPokemonList = async (searchParams: ReadonlyURLSearchParams) => {
  const response = await clientFetch.get("pokemon", {
    searchParams: searchParams,
  });
  const json = (await response.json()) as TPokemonListResponse;
  return json;
};

export const usePokemonList = ({
  initialValues,
  searchParams,
}: TUsePokemonList) => {
  const queryInitialData = initialValues ? initialValues : undefined;

  const query = useQuery<TPokemonListResponse>({
    queryKey: ["POKMON-LIST", searchParams.toString()],
    initialData: queryInitialData,
    queryFn: () => getPokemonList(searchParams),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  return query;
};
