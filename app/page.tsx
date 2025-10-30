import { getPokmonList } from "@/src/api/pok-mon/server/get-list-pok-mon";
import PokmonPage from "@/src/components/pok-mon";

type THomeProps = {
  searchParams: Promise<Record<string, number | undefined>>;
};

export default async function Home({ searchParams }: THomeProps) {
  const { limit, offset } = await searchParams;
  const pokmonListData = await getPokmonList({ limit, offset });
  return <PokmonPage pokmonListResponse={pokmonListData} />;
}
