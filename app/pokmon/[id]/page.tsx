import { getPokmonData } from "@/src/api/pok-mon/server/get-pok-mon";
import PokmonDeatilsPage from "@/src/components/pok-mon/page-details";

type TPokmonPageProps = {
  params: Promise<{ id: string | number }>;
};
export default async function PokmonPage({ params }: TPokmonPageProps) {
  const { id } = await params;
  const pokmonDetails = await getPokmonData({ id });

  return <PokmonDeatilsPage pokemonDataResponse={pokmonDetails} />;
}
