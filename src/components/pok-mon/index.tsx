"use client";

import { TPokemonListResponse } from "@/src/api/@types/pok-mon";
import { usePokemonList } from "@/src/api/pok-mon/client/use-list-pok-mon";
import PokemonList from "./page-list";
import PokemonHeader from "../common/layout/pokmon-header";

type TPokemonPageProps = {
  pokemonListResponse?: TPokemonListResponse;
};

export default function PokemonPage({
  pokemonListResponse,
}: TPokemonPageProps) {
  const { data, isPending } = usePokemonList({
    initialValues: pokemonListResponse,
  });

  return (
    <div className="gap-8 min-h-screen flex flex-col  bg-background-light items-center py-8">
      <PokemonHeader />
      <PokemonList list={data?.results} />
    </div>
  );
}
