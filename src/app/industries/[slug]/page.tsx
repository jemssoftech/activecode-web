import PortfolioSingle from "@/app/portfolioSingle/page";
import Industries from "./industries";

export default function PortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  return <Industries slug={slug} />;
}
