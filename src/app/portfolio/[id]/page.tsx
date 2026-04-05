import PortfolioSingle from "@/app/portfolioSingle/page";

export default function PortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  return <PortfolioSingle id={id} />;
}
