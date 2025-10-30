import React from "react";
import Card from "../../common/ui/card";
import { TPokemonResults } from "@/src/api/@types/pok-mon";

export default function PokemonList({ list }: { list?: TPokemonResults[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-4">
      {list?.map((item, index) => (
        <Card
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${++index}.png`}
          title={item.name}
          subTitle={`#00${++index}`}
          key={index}
        />
      ))}
    </div>
  );
}
