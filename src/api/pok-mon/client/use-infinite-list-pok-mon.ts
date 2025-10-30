import { useInfiniteQuery } from "@tanstack/react-query";
import { clientFetch } from "@/src/utils/fetch/client";
import { TPokemonListResponse } from "../../@types/pok-mon";

const getPokemonList = async (page: number, limit: number = 20) => {
  const offset = page * limit;
  const response = await clientFetch.get("pokemon", {
    searchParams: {
      limit,
      offset,
    },
  });
  const json = (await response.json()) as TPokemonListResponse;
  return json;
};

export const useInfinitePokemonList = (limit: number = 20) => {
  const query = useInfiniteQuery<TPokemonListResponse>({
    queryKey: ["POKEMON-INFINITE-LIST", limit],
    queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam as number, limit),
    getNextPageParam: (lastPage, allPages) => {
      // If there's a next page URL, return the next page number
      if (lastPage.next) {
        return allPages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 5000,
  });

  return query;
};
