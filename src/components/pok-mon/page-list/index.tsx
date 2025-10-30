import React, { useCallback } from "react";
import Card from "../../common/ui/card";
import { TPokemonResults } from "@/src/api/@types/pok-mon";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function PokemonList({ list }: { list?: TPokemonResults[] }) {
  const searchParams = useSearchParams();
  const offset = searchParams.get("offset");
  const getOffset = useCallback(
    (index: number) =>
      offset ? (index + 1) * (Number(offset) + 1) : index + 1,
    [offset]
  );
  return (
    <motion.div
      key={offset || "0"}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-4"
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
      {list?.map((item, index) => (
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
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getOffset(
              index
            )}.png`}
            title={item.name}
            subTitle={index + 1 < 10 ? `#00${index + 1}` : `#0${index + 1}`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
