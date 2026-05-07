"use client";
import multiLang from "@/components/molecules/multiLang.json";
import {
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "@/components/blocks/shared";
import {
  useTagStoreMutation,
  useTagUpdateMutation,
} from "@/modules/admin-section/tag/tag.action";
import { TagFormData, tagSchema } from "@/modules/admin-section/tag/tag.schema";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
type LangKeys = keyof IntlMessages["lang"];
export default function TagForm({ data }: any) {
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const editData = data?.data;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
  });
  useEffect(() => {
    if (editData) {
      setValue("name_df", editData?.name);
      setValue("order", String(editData?.order));

      Object.keys(editData?.translations).forEach((language) => {
        const translation = editData?.translations[language];
        setValue(`name_${language}` as keyof TagFormData, translation?.name);
      });
    }
  }, [editData, setValue, editData?.translations]);

  const { mutate: tagStore, isPending: isPendingCreate } =
    useTagStoreMutation();
  const { mutate: tagUpdate, isPending: isPendingUpdate } =
    useTagUpdateMutation();
  const onSubmit = async (values: TagFormData) => {
    let orderValue = values.order == "" ? values.order : Number(values.order);
    const defaultData = {
      name: values.name_df,
      order: orderValue,
    };
    const translations = multiLangData
      ?.filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: editData?.id,
      translations: translations,
    };
    if (editData?.id > 0) {
      return tagUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      return tagStore(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Tabs defaultValue="df" className="col-span-2">
            <TabsList dir={dir} className="flex justify-start bg-white dark:bg-[#1f2937]">
              {multiLangData.map((lang) => (
                <TabsTrigger key={lang.id} value={lang.id}>
                  {lang.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div dir={dir} className="grid grid-cols-1 ">
              <div>
                {multiLangData.map((lang) => {
                  return (
                    <TabsContent key={lang.id} value={lang.id}>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>{t("label.name")} (
                          {t(`lang.${lang.id}` as `lang.${LangKeys}`)})</span>
                        </p>
                        <Input
                          id={`name_${lang.id}`}
                          {...register(`name_${lang.id}` as keyof TagFormData)}
                          className="app-input"
                          placeholder="Enter value"
                        />
                        {errors[`name_${lang.id}` as keyof TagFormData] && (
                          <p className="text-red-500 text-sm mt-1">
                            {
                              (errors as any)[`name_${lang.id}`]?.message
                            }
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.order")}
                          
                        </p>
                        <Input
                          type="number"
                          id={"order"}
                          min={0}
                          {...register("order" as keyof TagFormData)}
                          className="app-input"
                          placeholder="Enter value"
                        />
                      </div>
                    </TabsContent>
                  );
                })}
              </div>
            </div>
          </Tabs>
        </div>
        <div className="mt-4">
          <SubmitButton
            UpdateData={data}
            IsLoading={editData ? isPendingUpdate : isPendingCreate}
            AddLabel={t("button.add_tag")}
            UpdateLabel={t("button.update_tag")}
          />
        </div>
      </form>
    </div>
  );
}
