"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Card from "../../common/ui/card";
import { TPokemonResults } from "@/src/api/@types/pok-mon";
import { motion, AnimatePresence } from "framer-motion";
import { useInfinitePokemonList } from "@/src/api/pok-mon/client/use-infinite-list-pok-mon";
import { Button } from "../../common/ui/button";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

const INFINITE_LOADED_COUNT_KEY = "pokemon_infinite_loaded_count";

export default function PokemonInfiniteList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePokemonList(20);

  const allPokemon: TPokemonResults[] =
    data?.pages.flatMap((page) => page.results) || [];

  const [animatedUpTo, setAnimatedUpTo] = useState(0);
  const initializedRef = useRef(false);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const topMarkerRef = useRef<HTMLDivElement>(null);
  const bottomMarkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (allPokemon.length > 0) {
      sessionStorage.setItem(
        INFINITE_LOADED_COUNT_KEY,
        allPokemon.length.toString()
      );
    }
  }, [allPokemon.length]);

  useEffect(() => {
    const currentLength = allPokemon.length;

    if (!initializedRef.current && currentLength > 0) {
      setAnimatedUpTo(currentLength);
      initializedRef.current = true;
    } else if (currentLength > animatedUpTo) {
      const timer = setTimeout(() => {
        setAnimatedUpTo(currentLength);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [allPokemon.length, animatedUpTo]);

  const getPokemonId = useCallback((index: number) => {
    return index + 1;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      setShowTopButton(scrollTop > windowHeight * 0.3);

      setShowBottomButton(scrollTop <= 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProgrammaticScroll]);

  const scrollToBottom = useCallback(() => {
    setIsProgrammaticScroll(true);

    setTimeout(() => {
      bottomMarkerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });

      setTimeout(() => {
        setIsProgrammaticScroll(false);
      }, 1500);
    }, 300);
  }, []);

  const scrollToTop = useCallback(() => {
    setIsProgrammaticScroll(true);

    setTimeout(() => {
      topMarkerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        setIsProgrammaticScroll(false);
      }, 1500);
    }, 300);
  }, []);

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
      <div ref={topMarkerRef} className="h-0" />

      <AnimatePresence>
        {showBottomButton && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToBottom}
              className="bg-accent text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              aria-label="Scroll to bottom"
            >
              <MdArrowDownward className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef}>
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
          {allPokemon.map((item, index) => {
            const isNewItem = index >= animatedUpTo;

            return (
              <motion.div
                key={`${item.name}-${index}`}
                initial={isNewItem ? "hidden" : false}
                animate="visible"
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
                  id={getPokemonId(index)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div ref={bottomMarkerRef} className="h-0" />

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

      <AnimatePresence>
        {showTopButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="bg-accent text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              aria-label="Scroll to top"
            >
              <MdArrowUpward className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
