import { getPokemonData } from "@/src/api/pok-mon/server/get-pok-mon";
import PokemonDeatilsPage from "@/src/components/pok-mon/page-details";
import type { Metadata } from "next";

type TPokemonPageProps = {
  params: Promise<{ id: string | number }>;
};

export async function generateMetadata({
  params,
}: TPokemonPageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemonDetails = await getPokemonData({ id });

  const pokemonName =
    pokemonDetails?.name?.charAt(0).toUpperCase() +
    pokemonDetails?.name?.slice(1) || "Pokemon";
  const pokemonId = pokemonDetails?.id || id;
  const pokemonNumber = `#${String(pokemonId).padStart(3, "0")}`;
  const pokemonImage =
    pokemonDetails?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemonDetails?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  const types =
    pokemonDetails?.types
      ?.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1))
      .join(", ") || "Normal";

  const description = `${pokemonName} (${pokemonNumber}) - ${types} type Pokemon. Height: ${(pokemonDetails?.height || 0) / 10}m, Weight: ${(pokemonDetails?.weight || 0) / 10}kg. Base Experience: ${pokemonDetails?.base_experience || 0} XP. View detailed stats, abilities, and more information about ${pokemonName}.`;

  return {
    title: `${pokemonName} ${pokemonNumber} - Pokédex | Detailed Pokemon Information`,
    description,
    keywords: [
      pokemonName,
      pokemonNumber,
      "Pokemon",
      "Pokédex",
      types,
      "Pokemon Stats",
      "Pokemon Abilities",
    ],
    openGraph: {
      title: `${pokemonName} ${pokemonNumber} - Pokédex`,
      description: `${pokemonName} (${pokemonNumber}) - ${types} type Pokemon. View detailed stats and abilities.`,
      type: "website",
      images: [
        {
          url: pokemonImage,
          width: 512,
          height: 512,
          alt: `${pokemonName} official artwork`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pokemonName} ${pokemonNumber} - Pokédex`,
      description: `${pokemonName} (${pokemonNumber}) - ${types} type Pokemon.`,
      images: [pokemonImage],
    },
  };
}

export default async function PokemonPage({ params }: TPokemonPageProps) {
  const { id } = await params;
  const pokemonDetails = await getPokemonData({ id });

  return <PokemonDeatilsPage pokemonDataResponse={pokemonDetails} id={id} />;
}
