export default function ModelDetails({
  params,
}: {
  params: { horizon_id: number; model_id: number };
}) {
  return <>{params.model_id}</>;
}
