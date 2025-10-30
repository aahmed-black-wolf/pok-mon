import React from "react";
import { Button } from "../ui/button";

export default function PokemonHeader() {
  return (
    <div className="flex items-center gap-6 flex-col">
      <h1 className="text-4xl font-bold flex items-end gap-2">
        <span className="text-3xl">⚡</span>
        Pokédex
      </h1>
      <p>Discover and explore pokemon with page controls</p>
      <div className="flex gap-4">
        <Button color="default" variant="solid">
          Pokemon List
        </Button>
        <Button
          className="bg-white ease-in transition-all text-black hover:text-white"
          color="default"
          variant="solid"
        >
          Pokemon Infinit Scroll
        </Button>
      </div>
    </div>
  );
}
