"use client";
import { TPokemonDataResponse } from "@/src/api/@types/pok-mon";
import { usePokmonData } from "@/src/api/pok-mon/client/use-pok-mon";

type TPokmonDeatilsPageProps = {
  pokemonDataResponse?: TPokemonDataResponse[];
};

export default function PokmonDeatilsPage({
  pokemonDataResponse,
}: TPokmonDeatilsPageProps) {
  const { data, isPending } = usePokmonData({
    initialValues: pokemonDataResponse,
  });

  return <div>PokmonDeatilsPage</div>;
}
