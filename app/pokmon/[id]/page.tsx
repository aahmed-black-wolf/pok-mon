import { getPokemonData } from "@/src/api/pok-mon/server/get-pok-mon";
import PokemonDeatilsPage from "@/src/components/pok-mon/page-details";

type TPokemonPageProps = {
  params: Promise<{ id: string | number }>;
};
export default async function PokemonPage({ params }: TPokemonPageProps) {
  const { id } = await params;
  const pokemonDetails = await getPokemonData({ id });

  return <PokemonDeatilsPage pokemonDataResponse={pokemonDetails} />;
}
