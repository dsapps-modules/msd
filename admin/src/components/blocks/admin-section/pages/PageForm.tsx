"use client";
import { AppSelect } from "@/components/blocks/common";
import TiptapEditor from "@/components/blocks/common/TiptapField";
import { SubmitButton } from "@/components/blocks/shared";
import multiLang from "@/components/molecules/multiLang.json";
import {
  Card,
  CardContent,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { TagsInput } from "@/components/ui/tags-input";
import {
  usePageStoreMutation,
  usePageUpdateMutation,
} from "@/modules/admin-section/pages/pages.action";
import {
  PagesFormData,
  pagesSchema,
} from "@/modules/admin-section/pages/pages.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
type LangKeys = keyof IntlMessages["lang"];
export default function PagesForm({ data }: any) {
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const t = useTranslations();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const editData = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    control,
  } = useForm<PagesFormData>({
    resolver: zodResolver(pagesSchema),
    defaultValues: {
      status: editData?.data?.status ?? "",
      theme_name: editData?.data?.theme_name ?? "",
    },
  });

  const Themelist = [
    { label: "Default", value: "default" },
    { label: "Theme One", value: "theme_one" },
    { label: "Theme Two", value: "theme_two" },
  ];

  useEffect(() => {
    if (editData) {
      setValue("title_df", editData?.data?.title ?? "");
      setValue("content_df", editData?.data?.content ?? "");
      setValue("meta_title_df", editData?.data?.meta_title ?? "");
      setValue("meta_description_df", editData?.data?.meta_description ?? "");
      const metaTagsArray = editData?.data?.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim());
      setValue("meta_keywords_df", metaTagsArray);
      setValue("status", editData?.data?.status ?? "");

      Object?.keys(editData?.data?.translations).forEach((language) => {
        const translation = editData?.data?.translations[language];
        const tagsArray = translation?.meta_keywords
          ? translation.meta_keywords
              .split(",")
              .map((tag: string) => tag.trim())
          : [];

        setValue(`meta_keywords_${language}` as keyof PagesFormData, tagsArray);
        setValue(
          `title_${language}` as keyof PagesFormData,
          translation.title ?? ""
        );
        setValue(
          `content_${language}` as keyof PagesFormData,
          translation.content ?? ""
        );
        setValue(
          `meta_title_${language}` as keyof PagesFormData,
          translation.meta_title ?? ""
        );
        setValue(
          `meta_description_${language}` as keyof PagesFormData,
          translation.meta_description ?? ""
        );
      });
    }
  }, [editData, setValue, editData?.translations]);

  const { mutate: pageStore, isPending: isPendingCreate } =
    usePageStoreMutation();
  const { mutate: pageUpdate, isPending: isPendingUpdate } =
    usePageUpdateMutation();
  const onSubmit = async (values: PagesFormData) => {
    const defaultData: any = {
      title: values.title_df,
      content: values.content_df,
      meta_title: values.meta_title_df,
      meta_description: values.meta_description_df,
      meta_keywords: (values.meta_keywords_df || []).join(", "),
    };
    if (values?.status !== "") {
      defaultData.status = values.status;
    }
    const translations = multiLangData
      ?.filter((lang) => (values as any)[`title_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        title: (values as any)[`title_${lang.id}`],
        content: (values as any)[`content_${lang.id}`],
        meta_title: (values as any)[`meta_title_${lang.id}`],
        meta_description: (values as any)[`meta_description_${lang.id}`],
        meta_keywords: ((values as any)[`meta_keywords_${lang.id}`] || []).join(
          ", "
        ),
      }));
    const submissionData = {
      ...defaultData,
      theme_name: values.theme_name,
      id: editData?.data?.id,
      translations: translations,
    };
    if (editData?.data?.id > 0) {
      return pageUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
          },
          onError: () => {},
        }
      );
    } else {
      return pageStore(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
  };
  const statuslist = [
    { label: t("label.draft"), value: "draft" },
    { label: t("label.publish"), value: "publish" },
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Tabs defaultValue="df" className="col-span-2">
            <Card>
              <CardContent className="mt-4 p-4">
                <TabsList
                  dir={dir}
                  className="flex justify-start bg-white dark:bg-[#1f2937]"
                >
                  {multiLangData.map((lang) => (
                    <TabsTrigger key={lang.id} value={lang.id}>
                      {lang.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardContent>
            </Card>
            <Card dir={dir}>
              <CardContent className="mt-4 p-4">
                {multiLangData.map((lang) => {
                  return (
                    <TabsContent key={lang.id} value={lang.id}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>Theme Name </span>
                            </p>
                            <Controller
                              control={control}
                              name="theme_name"
                              render={({ field }) => (
                                <>
                                  <AppSelect
                                    value={field.value}
                                    onSelect={(value) => {
                                      field.onChange(value);
                                    }}
                                    groups={Themelist}
                                    hideNone
                                  />
                                </>
                              )}
                            />
                          </div>
                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>
                                {t("label.title")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                            </p>
                            <Input
                              id={`title_${lang.id}`}
                              {...register(
                                `title_${lang.id}` as keyof PagesFormData
                              )}
                              className="app-input"
                              placeholder={t("place_holder.enter_title")}
                            />
                            {errors[
                              `title_${lang.id}` as keyof PagesFormData
                            ] && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  //@ts-ignore
                                  errors[`title_${lang.id}`]?.message
                                }
                              </p>
                            )}
                          </div>
                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>{t("label.status")} </span>
                            </p>
                            <Controller
                              control={control}
                              name="status"
                              defaultValue={
                                String(editData?.data?.status) ?? ""
                              }
                              render={({ field }) => (
                                <>
                                  <AppSelect
                                    value={field.value}
                                    onSelect={(value) => {
                                      field.onChange(value);
                                    }}
                                    groups={statuslist}
                                    hideNone
                                  />
                                </>
                              )}
                            />
                          </div>

                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>
                                {t("label.content")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                            </p>

                            <Controller
                              control={control}
                              name={`content_${lang.id}` as keyof PagesFormData}
                              render={({ field }) => (
                                <TiptapEditor
                                  //@ts-ignore
                                  value={field.value || ""}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors[
                              `content_${lang.id}` as keyof PagesFormData
                            ] && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  //@ts-ignore
                                  errors[`content_${lang.id}`]?.message
                                }
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>
                                {t("label.meta_title")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                            </p>
                            <Input
                              id={`meta_title_${lang.id}`}
                              {...register(
                                `meta_title_${lang.id}` as keyof PagesFormData
                              )}
                              className="app-input"
                              placeholder={t("place_holder.enter_meta_title")}
                            />
                            {errors[
                              `meta_title_${lang.id}` as keyof PagesFormData
                            ] && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  //@ts-ignore
                                  errors[`meta_title_${lang.id}`]?.message
                                }
                              </p>
                            )}
                          </div>

                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>
                                {t("label.meta_description")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                            </p>
                            <Input
                              id={`meta_description_${lang.id}`}
                              {...register(
                                `meta_description_${lang.id}` as keyof PagesFormData
                              )}
                              className="app-input"
                              placeholder={t(
                                "place_holder.enter_meta_description"
                              )}
                            />
                            {errors[
                              `meta_description_${lang.id}` as keyof PagesFormData
                            ] && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  //@ts-ignore
                                  errors[`meta_description_${lang.id}`]?.message
                                }
                              </p>
                            )}
                          </div>

                          <div>
                            <div className="text-sm font-medium flex items-center gap-2">
                              <span>
                                {t("label.meta_keywords")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                              <div>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      align="center"
                                      sideOffset={4}
                                      avoidCollisions={false}
                                      className="bg-custom-dark-blue dark:bg-white max-w-sm"
                                    >
                                      <p className="p-1 text-sm font-medium">
                                        {t("tooltip.enter_meta_key")}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Controller
                              name={
                                `meta_keywords_${lang.id}` as keyof PagesFormData
                              }
                              control={control}
                              render={({ field }) => (
                                <TagsInput
                                  value={(field.value as string[]) || []}
                                  onChange={(val) => field.onChange(val)}
                                  placeholder={`${t(
                                    "place_holder.enter_meta_key"
                                  )} ${t(
                                    `lang.${lang.id}` as `lang.${LangKeys}`
                                  )}`}
                                  label={t("meta.keywords_title")}
                                  className="app-input"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </CardContent>
            </Card>
          </Tabs>
        </div>
        <Card className="mt-4 sticky bottom-0 w-full p-4">
          <SubmitButton
            UpdateData={data}
            IsLoading={editData ? isPendingUpdate : isPendingCreate}
            AddLabel={t("button.add_page")}
            UpdateLabel={t("button.update_page")}
          />
        </Card>
      </form>
    </div>
  );
}
