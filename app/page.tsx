import { getPokemonList } from "@/src/api/pok-mon/server/get-list-pok-mon";
import PokemonPage from "@/src/components/pok-mon";
import type { Metadata } from "next";

type THomeProps = {
  searchParams: Promise<Record<string, number | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pokédex - Pokemon List | Discover All Pokémon",
    description: "Browse through the complete list of all Pokémon. Discover their stats, abilities, and detailed information. View Pokemon in list or infinite scroll mode.",
    keywords: ["Pokemon List", "Pokemon Index", "All Pokemon", "Pokemon Collection"],
    openGraph: {
      title: "Pokédex - Pokemon List",
      description: "Browse through the complete list of all Pokémon. Discover their stats, abilities, and detailed information.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Pokédex - Pokemon List",
      description: "Browse through the complete list of all Pokémon.",
    },
  };
}

export default async function Home({ searchParams }: THomeProps) {
  const query = await searchParams;
  const pokemonListData = await getPokemonList(query);
  return <PokemonPage pokemonListResponse={pokemonListData} />;
}
