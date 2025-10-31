"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type TViewMode = "list" | "infinite";

const INFINITE_LOADED_COUNT_KEY = "pokemon_infinite_loaded_count";
const LIMIT_PER_PAGE = 20;

export default function PokemonHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMode = (searchParams.get("mode") as TViewMode) || "list";

  const handleModeChange = (mode: TViewMode) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", mode);
    
    if (mode === "infinite") {
      params.delete("offset");
    } else if (mode === "list") {
      const loadedCount = sessionStorage.getItem(INFINITE_LOADED_COUNT_KEY);
      if (loadedCount) {
        const loadedCountNum = parseInt(loadedCount, 10);
        const offset = Math.floor((loadedCountNum - 1) / LIMIT_PER_PAGE);
        params.set("offset", offset.toString());
        params.set("limit", LIMIT_PER_PAGE.toString());
      }
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-6 flex-col">
      <h1 className="text-4xl font-bold flex items-end gap-2">
        <span className="text-3xl">⚡</span>
        Pokédex
      </h1>
      <p>
        {currentMode === "list"
          ? "Discover and explore pokemon with page controls"
          : "Discover and explore pokemon with infinite scroll"}
      </p>
      <div className="flex gap-4">
        <Button
          color="default"
          variant="solid"
          onClick={() => handleModeChange("list")}
          className={
            currentMode === "list"
              ? "bg-foreground text-background"
              : "bg-white ease-in transition-all text-black hover:text-white"
          }
        >
          Pokemon List
        </Button>
        <Button
          className={
            currentMode === "infinite"
              ? "bg-foreground text-background"
              : "bg-white ease-in transition-all text-black hover:text-white"
          }
          color="default"
          variant="solid"
          onClick={() => handleModeChange("infinite")}
        >
          Pokemon Infinite Scroll
        </Button>
      </div>
    </div>
  );
}
