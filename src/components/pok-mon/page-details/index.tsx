"use client";
import { TPokemonDataResponse } from "@/src/api/@types/pok-mon";
import { usePokemonData } from "@/src/api/pok-mon/client/use-pok-mon";

type TPokemonDeatilsPageProps = {
  pokemonDataResponse?: TPokemonDataResponse;
};

export default function PokemonDeatilsPage({
  pokemonDataResponse,
}: TPokemonDeatilsPageProps) {
  const { data, isPending } = usePokemonData({
    initialValues: pokemonDataResponse,
  });

  return <div>PokemonDeatilsPage</div>;
}
