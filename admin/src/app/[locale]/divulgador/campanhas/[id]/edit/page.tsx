"use client";

import { Card, CardContent } from "@/components/ui";
import { DivulgadorCampaignForm } from "@/components/blocks/divulgador-section/DivulgadorCampaignForm";
import { useDivulgadorCampaignQuery } from "@/modules/divulgador-section/divulgador.action";

type Props = {
  params: { id: string };
};

export default function DivulgadorCampaignEditPage({ params }: Props) {
  const { id } = params;
  const { divulgadorCampaign, isPending, error } = useDivulgadorCampaignQuery(id);

  if (isPending) {
    return (
      <Card className="rounded-3xl border border-white/70 bg-white/80">
        <CardContent className="p-8 text-slate-500">Carregando campanha...</CardContent>
      </Card>
    );
  }

  if (error || !divulgadorCampaign) {
    return (
      <Card className="rounded-3xl border border-dashed border-slate-300 bg-white/80">
        <CardContent className="p-8 text-slate-500">Campanha não encontrada.</CardContent>
      </Card>
    );
  }

  return <DivulgadorCampaignForm data={divulgadorCampaign} />;
}
