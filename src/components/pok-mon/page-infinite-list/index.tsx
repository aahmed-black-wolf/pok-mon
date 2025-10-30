"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Card from "../../common/ui/card";
import { TPokemonResults } from "@/src/api/@types/pok-mon";
import { motion } from "framer-motion";
import { useInfinitePokemonList } from "@/src/api/pok-mon/client/use-infinite-list-pok-mon";
import { Button } from "../../common/ui/button";

const INFINITE_LOADED_COUNT_KEY = "pokemon_infinite_loaded_count";

export default function PokemonInfiniteList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePokemonList(20);

  // Flatten all pages into a single array
  const allPokemon: TPokemonResults[] =
    data?.pages.flatMap((page) => page.results) || [];

  // Store loaded count in sessionStorage when it changes
  useEffect(() => {
    if (allPokemon.length > 0) {
      sessionStorage.setItem(INFINITE_LOADED_COUNT_KEY, allPokemon.length.toString());
    }
  }, [allPokemon.length]);

  // Calculate the Pokemon ID based on global index (across all pages)
  const getPokemonId = useCallback(
    (index: number) => {
      return index + 1;
    },
    []
  );

  // Intersection Observer for infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && allPokemon.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="h-64 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.02,
            },
          },
        }}
      >
        {allPokemon.map((item, index) => (
          <motion.div
            key={`${item.name}-${index}`}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <Card
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
                index
              )}.png`}
              title={item.name}
              subTitle={
                getPokemonId(index) < 10
                  ? `#00${getPokemonId(index)}`
                  : getPokemonId(index) < 100
                    ? `#0${getPokemonId(index)}`
                    : `#${getPokemonId(index)}`
              }
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Intersection observer target */}
      <div ref={observerTarget} className="h-10 w-full" />

      {/* Load more button as fallback */}
      <div className="flex justify-center items-center py-4">
        {isFetchingNextPage && (
          <div className="text-muted-foreground text-sm">Loading more...</div>
        )}
        {!hasNextPage && allPokemon.length > 0 && (
          <div className="text-muted-foreground text-sm">
            All Pokémon loaded ({allPokemon.length} total)
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <Button
            variant="flat"
            color="default"
            onClick={() => fetchNextPage()}
            className="bg-white"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}

