"use client";

import { TPokemonListResponse } from "@/src/api/@types/pok-mon";
import { usePokmonList } from "@/src/api/pok-mon/client/use-list-pok-mon";

type TPokmonPageProps = {
  pokmonListResponse?: TPokemonListResponse;
};

export default function PokmonPage({ pokmonListResponse }: TPokmonPageProps) {
  const { data, isPending } = usePokmonList({
    initialValues: pokmonListResponse,
  });

  console.log(data);

  return <div>PokmonPage</div>;
}
