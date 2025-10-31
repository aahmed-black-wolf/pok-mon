"use client";

import { TPokemonDataResponse } from "@/src/api/@types/pok-mon";
import { usePokemonData } from "@/src/api/pok-mon/client/use-pok-mon";
import Image from "next/legacy/image";
import { useRouter, useParams } from "next/navigation";
import { Button } from "../../common/ui/button";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import { BiRuler, BiDumbbell } from "react-icons/bi";

type TPokemonDeatilsPageProps = {
  pokemonDataResponse?: TPokemonDataResponse;
  id?: string | number;
};

const getTypeColor = (typeName: string): string => {
  const typeColors: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    ice: "bg-cyan-300",
    fighting: "bg-red-700",
    poison: "bg-purple-600",
    ground: "bg-amber-700",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-stone-600",
    ghost: "bg-purple-800",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-400",
    fairy: "bg-pink-300",
    normal: "bg-gray-400",
  };
  return typeColors[typeName.toLowerCase()] || "bg-gray-500";
};

const getStatName = (statName: string): string => {
  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
  };
  return statNames[statName.toLowerCase()] || statName;
};

export default function PokemonDeatilsPage({
  pokemonDataResponse,
  id: propId,
}: TPokemonDeatilsPageProps) {
  const router = useRouter();
  const params = useParams();
  const id = propId || params?.id || pokemonDataResponse?.id;
  
  const { data, isPending } = usePokemonData({
    initialValues: pokemonDataResponse,
    id: id as string | number,
  });

  if (isPending || !data) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const pokemonId = data.id;
  const pokemonName = data.name;
  const pokemonNumber = `#${String(pokemonId).padStart(3, "0")}`;
  const pokemonImage =
    data.sprites?.other?.["official-artwork"]?.front_default ||
    data.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const types = data.types || [];
  const primaryType = types[0]?.type?.name || "normal";
  const stats = data.stats || [];
  const abilities = data.abilities || [];
  const height = data.height / 10;
  const weight = data.weight / 10;
  const baseExperience = data.base_experience || 0;

  const maxStat = Math.max(...stats.map((stat) => stat.base_stat), 100);

  return (
    <div className="min-h-screen bg-background-light py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="flat"
          color="default"
          onClick={() => router.back()}
          className="mb-6 bg-white"
          startContent={<HiArrowLeft className="w-5 h-5" />}
        >
          Back to List
        </Button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#e94057] to-[#8a2387] px-6 py-8 text-white"
            style={{
              background: `linear-gradient(to right, var(--gradient-start), var(--gradient-end))`,
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">⚡</span>
              <h1 className="text-4xl font-bold capitalize">{pokemonName}</h1>
            </div>
            <p className="text-center mt-2 text-lg opacity-90">
              {pokemonNumber}
            </p>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-pagination-bg flex items-center justify-center p-6 md:p-8 shadow-inner">
                  <div className="relative w-full h-full">
                    <Image
                      src={pokemonImage}
                      alt={pokemonName}
                      layout="fill"
                      objectFit="contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {types.length > 0 && (
                <div className="flex gap-2 justify-center">
                  {types.map((type, index) => (
                    <span
                      key={index}
                      className={`${getTypeColor(
                        type.type.name
                      )} text-white px-4 py-1 rounded-full text-sm font-medium capitalize`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-md shadow-md p-4 border border-card-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 justify-center">
                    <BiRuler className="w-3.5 h-3.5 text-gray-400" strokeWidth="1.5" />
                    <span className="text-sm font-medium">Height</span>
                  </div>
                  <p className="font-bold text-lg text-center">{height} m</p>
                </div>
                <div className="bg-white rounded-md shadow-md p-4 border border-card-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2 justify-center">
                    <BiDumbbell className="w-3.5 h-3.5 text-gray-400" strokeWidth="1.5" />
                    <span className="text-sm font-medium">Weight</span>
                  </div>
                  <p className="font-bold text-lg text-center">{weight} kg</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Base Stats</h2>
                <div className="space-y-3">
                  {stats.map((stat, index) => {
                    const statName = getStatName(stat.stat.name);
                    const statValue = stat.base_stat;
                    const statPercentage = (statValue / maxStat) * 100;

                    return (
                      <motion.div
                        key={index}
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground w-24">
                            {statName}
                          </span>
                          <span className="text-sm font-semibold w-12 text-right">
                            {statValue}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-gray-800 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${statPercentage}%` }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.1 + 0.2,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {abilities.map((ability, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        ability.is_hidden ? "bg-purple-100 text-purple-800" : ""
                      }`}
                    >
                      {ability.ability.name}
                      {ability.is_hidden && (
                        <span className="text-xs opacity-75">(Hidden)</span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Base Experience</h2>
                <p className="text-accent font-semibold text-lg">
                  {baseExperience} XP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
