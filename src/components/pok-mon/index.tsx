"use client";

import type { TPokemonListResponse } from "@/src/api/@types/pok-mon";
import { usePokemonList } from "@/src/api/pok-mon/client/use-list-pok-mon";
import PokemonList from "./page-list";
import PokemonInfiniteList from "./page-infinite-list";
import PokemonHeader from "../common/layout/pokmon-header";
import { Pagination } from "../common/ui/pagination";
import { useSearchParams } from "next/navigation";

type TPokemonPageProps = {
  pokemonListResponse?: TPokemonListResponse;
};

export default function PokemonPage({
  pokemonListResponse,
}: TPokemonPageProps) {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit");
  const mode = (searchParams.get("mode") as "list" | "infinite") || "list";

  const { data, isPending } = usePokemonList({
    initialValues: pokemonListResponse,
    searchParams,
  });

  return (
    <div className="gap-8 min-h-screen flex flex-col  bg-background-light items-center py-8">
      <PokemonHeader />
      {mode === "infinite" ? (
        <PokemonInfiniteList />
      ) : (
        <>
          <PokemonList list={data?.results} />
          <Pagination
            count={data?.count || 1320}
            countPerPage={limit ? Number(limit) : 20}
          />
        </>
      )}
    </div>
  );
}
