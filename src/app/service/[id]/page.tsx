
import ServiceSingalpage from "./ServiceSingalpage";

export default function PortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  return <ServiceSingalpage id={id} />;
}
