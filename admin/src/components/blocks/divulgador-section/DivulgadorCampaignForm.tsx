"use client";

import { Button, Card, CardContent, Input, Textarea } from "@/components/ui";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import {
  useDivulgadorCampaignStoreMutation,
  useDivulgadorCampaignUpdateMutation,
} from "@/modules/divulgador-section/divulgador.action";
import type { DivulgadorCampaign } from "@/modules/divulgador-section/divulgador.type";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type CampaignFormData = {
  titulo: string;
  objetivo: string;
  meta_financeira: string;
  data_inicio: string;
  data_fim: string;
};

type Props = {
  data?: DivulgadorCampaign;
};

export function DivulgadorCampaignForm({ data }: Props) {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data?.banner_url ?? null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>({
    defaultValues: {
      titulo: data?.titulo ?? "",
      objetivo: data?.objetivo ?? "",
      meta_financeira: data?.meta_financeira ? String(data.meta_financeira) : "",
      data_inicio: data?.data_inicio ?? "",
      data_fim: data?.data_fim ?? "",
    },
  });

  useEffect(() => {
    if (!bannerFile) {
      setPreviewUrl(data?.banner_url ?? null);
      return;
    }

    const objectUrl = URL.createObjectURL(bannerFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [bannerFile, data?.banner_url]);

  const { mutate: createCampaign, isPending: isCreating } =
    useDivulgadorCampaignStoreMutation();
  const { mutate: updateCampaign, isPending: isUpdating } =
    useDivulgadorCampaignUpdateMutation();

  const isEditing = Boolean(data?.id);
  const isBusy = isEditing ? isUpdating : isCreating;

  const submitLabel = useMemo(
    () => (isEditing ? "Atualizar campanha" : "Criar campanha"),
    [isEditing]
  );

  const onSubmit = async (values: CampaignFormData) => {
    const formData = new FormData();
    formData.append("titulo", values.titulo);
    formData.append("objetivo", values.objetivo);
    formData.append("meta_financeira", values.meta_financeira);
    formData.append("data_inicio", values.data_inicio);
    formData.append("data_fim", values.data_fim);

    if (bannerFile) {
      formData.append("banner", bannerFile);
    }

    if (isEditing && data?.id) {
      formData.append("id", String(data.id));
      updateCampaign(formData as any);
      return;
    }

    createCampaign(formData as any);
  };

  const bannerLabel = bannerFile ? bannerFile.name : "Selecionar banner";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Campanhas
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            {isEditing ? "Editar campanha" : "Nova campanha"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isEditing
              ? "Ajuste título, objetivo, meta financeira e banner."
              : "Crie uma campanha com banner e período de validade."}
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          <Link href={DivulgadorRoutes.campanhas}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        <CardContent className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Título
                  </label>
                  <Input
                    {...register("titulo", { required: "Título é obrigatório" })}
                    placeholder="Ex: Clareamento Solidário 2026"
                    className="rounded-2xl border-slate-200 bg-white px-4 py-3"
                  />
                  {errors.titulo ? (
                    <p className="mt-1 text-sm text-red-500">{errors.titulo.message}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Objetivo
                  </label>
                  <Textarea
                    {...register("objetivo", { required: "Objetivo é obrigatório" })}
                    placeholder="Descreva o objetivo da campanha"
                    className="min-h-36 rounded-2xl border-slate-200 bg-white px-4 py-3"
                  />
                  {errors.objetivo ? (
                    <p className="mt-1 text-sm text-red-500">{errors.objetivo.message}</p>
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Meta Financeira
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      {...register("meta_financeira", {
                        required: "Meta financeira é obrigatória",
                      })}
                      placeholder="0,00"
                      className="rounded-2xl border-slate-200 bg-white px-4 py-3"
                    />
                    {errors.meta_financeira ? (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.meta_financeira.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        De
                      </label>
                      <Input
                        type="date"
                        {...register("data_inicio", {
                          required: "Data inicial é obrigatória",
                        })}
                        className="rounded-2xl border-slate-200 bg-white px-4 py-3"
                      />
                      {errors.data_inicio ? (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.data_inicio.message}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Até
                      </label>
                      <Input
                        type="date"
                        {...register("data_fim", {
                          required: "Data final é obrigatória",
                        })}
                        className="rounded-2xl border-slate-200 bg-white px-4 py-3"
                      />
                      {errors.data_fim ? (
                        <p className="mt-1 text-sm text-red-500">{errors.data_fim.message}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Banner
                  </label>
                  <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition hover:border-slate-300 hover:bg-slate-100">
                    {previewUrl ? (
                      <div className="relative h-44 w-full overflow-hidden rounded-2xl">
                        <img
                          src={previewUrl}
                          alt={data?.titulo ?? "Banner da campanha"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-500">
                        <Upload className="h-6 w-6" />
                        <span className="text-sm font-medium">{bannerLabel}</span>
                        <span className="text-xs text-slate-400">
                          JPG, JPEG, PNG ou WEBP até 2MB
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        setBannerFile(file);
                      }}
                    />
                  </label>
                </div>

                {previewUrl ? (
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <p className="font-medium text-slate-900">Preview do banner</p>
                    <p className="mt-1 break-all text-xs text-slate-500">
                      {bannerFile?.name ?? "Banner atual mantido"}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <Button
                type="submit"
                className="h-11 rounded-2xl bg-slate-900 px-6 text-white hover:bg-slate-800"
                disabled={isBusy}
              >
                {isBusy ? "Salvando..." : submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
