"use client";
import multiLang from "@/components/molecules/multiLang.json";
import {
  AppSelect,
} from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
import {
  Card,
  CardContent,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@/components/ui";
import {
  useBlogCategoryStoreMutation,
  useBlogCategoryUpdateMutation,
} from "@/modules/admin-section/blog/blog-category/blog-category.action";
import {
  BlogCategoryFormData,
  blogCategorySchema,
} from "@/modules/admin-section/blog/blog-category/blog-category.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
type LangKeys = keyof IntlMessages["lang"];
export default function BlogCategoryForm({ data }: any) {
  const multiLangData = React.useMemo(() => multiLang, []);
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<BlogCategoryFormData>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: {
      status: data?.status ?? "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name_df", data.name ?? "");
      setValue("meta_title_df", data?.meta_title ?? "");
      setValue("meta_description_df", data?.meta_description ?? "");

      Object?.keys(data?.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(
          `meta_title_${language}` as keyof BlogCategoryFormData,
          translation?.meta_title ?? ""
        );
        setValue(
          `meta_description_${language}` as keyof BlogCategoryFormData,
          translation?.meta_description ?? ""
        );
        setValue(
          `name_${language}` as keyof BlogCategoryFormData,
          translation?.name ?? ""
        );
      });
    }
  }, [data, setValue, data?.translations]);

  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
  };

  const { mutate: blogCategoryStore, isPending } =
    useBlogCategoryStoreMutation();
  const { mutate: blogCategoryUpdate, isPending: isUpdating } =
    useBlogCategoryUpdateMutation();
  const onSubmit = async (values: BlogCategoryFormData) => {
    const defaultData = {
      name: values.name_df,
      meta_title: values.meta_title_df,
      meta_description: values.meta_description_df,
      status: values.status,
    };
    const translations = multiLangData
      ?.filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
        meta_title: (values as any)[`meta_title_${lang.id}`],
        meta_description: (values as any)[`meta_description_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: data?.id,
      translations: translations,
    };
    if (data) {
      return blogCategoryUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            dispatch(setRefetch(true));
            reset();
          },
        }
      );
    } else {
      return blogCategoryStore(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            dispatch(setRefetch(true));
            reset();
          },
        }
      );
    }
  };
  const statuslist = [
    { label: t("label.active"), value: 1 },
    { label: t("label.inactive"), value: 0 },
  ];
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="rounded-lg border-none mt-4 ">
          <CardContent className="p-2 md:p-6">
            <Tabs defaultValue="df" className="col-span-2">
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
              <div dir={dir}>
                {multiLangData.map((lang) => {
                  return (
                    <TabsContent key={lang.id} value={lang.id}>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>
                            {t("label.title")} (
                            {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                          </span>
                        </p>
                        <Input
                          id={`name_${lang.id}`}
                          {...register(
                            `name_${lang.id}` as keyof BlogCategoryFormData
                          )}
                          className="app-input"
                          placeholder="Enter value"
                        />
                        {errors[
                          `name_${lang.id}` as keyof BlogCategoryFormData
                        ] && (
                          <p className="text-red-500 text-sm mt-1">
                            {(errors as any)[`name_${lang.id}`]?.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>{t("label.status")}</span>
                        </p>
                        <Controller
                          control={control}
                          name="status"
                          render={({ field }) => (
                            <>
                              <AppSelect
                                value={field.value}
                                onSelect={(value) => {
                                  field.onChange(value);
                                  handleSelectItem(value, "status");
                                }}
                                groups={statuslist}
                                hideNone
                              />
                            </>
                          )}
                        />
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.meta_title")} (
                          {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                        </p>
                        <Input
                          id={`meta_title_${lang.id}`}
                          {...register(
                            `meta_title_${lang.id}` as keyof BlogCategoryFormData
                          )}
                          className="app-input"
                          placeholder={t("place_holder.enter_meta_title")}
                        />
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.meta_description")} (
                          {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                        </p>
                        <Textarea
                          id={`meta_description_${lang.id}`}
                          {...register(
                            `meta_description_${lang.id}` as keyof BlogCategoryFormData
                          )}
                          className="app-input"
                          placeholder={t("place_holder.enter_meta_description")}
                        />
                      </div>
                    </TabsContent>
                  );
                })}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-4 sticky bottom-0 w-full p-4">
          <SubmitButton
            UpdateData={data}
            IsLoading={isPending || isUpdating}
            AddLabel={t("button.add_blog_category")}
            UpdateLabel={t("button.update_blog_category")}
          />
        </Card>
      </form>
    </div>
  );
}
