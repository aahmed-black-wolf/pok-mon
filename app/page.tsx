import { getPokemonList } from "@/src/api/pok-mon/server/get-list-pok-mon";
import PokemonPage from "@/src/components/pok-mon";

type THomeProps = {
  searchParams: Promise<Record<string, number | undefined>>;
};

export default async function Home({ searchParams }: THomeProps) {
  const query = await searchParams;
  const pokemonListData = await getPokemonList(query);
  return <PokemonPage pokemonListResponse={pokemonListData} />;
}
