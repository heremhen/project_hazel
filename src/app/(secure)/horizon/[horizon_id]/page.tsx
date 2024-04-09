export default function ModelDetails({
  params,
}: {
  params: { horizon_id: number };
}) {
  return <>{params.horizon_id}</>;
}
