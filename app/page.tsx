import { getPokemonList } from "@/src/api/pok-mon/server/get-list-pok-mon";
import PokemonPage from "@/src/components/pok-mon";

type THomeProps = {
  searchParams: Promise<Record<string, number | undefined>>;
};

export default async function Home({ searchParams }: THomeProps) {
  const { limit, offset } = await searchParams;
  const pokemonListData = await getPokemonList({ limit, offset });
  return <PokemonPage pokemonListResponse={pokemonListData} />;
}
