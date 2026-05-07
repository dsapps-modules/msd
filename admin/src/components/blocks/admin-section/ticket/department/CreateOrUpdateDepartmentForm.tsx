"use client";
import multiLang from "@/components/molecules/multiLang.json";
import {
  AppSelect,
} from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
import {
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  useDepartmentStoreMutation,
  useDepartmentUpdateMutation,
} from "@/modules/admin-section/ticket/department/department.action";
import {
  DepartmentFormData,
  departmentSchema,
} from "@/modules/admin-section/ticket/department/department.schema";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const StatusList = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" },
];
type LangKeys = keyof IntlMessages["lang"];
const CreateOrUpdateDepartmentForm = ({ data }: any) => {
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
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
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
  });
  useEffect(() => {
    if (editData) {
      setValue("name_df", editData?.name ?? "");
      setValue("status", String(editData?.status) ?? "");

      Object.keys(editData?.translation).forEach((language) => {
        const translation = editData?.translation[language];
        setValue(
          `name_${language}` as keyof DepartmentFormData,
          translation?.name ?? ""
        );
      });
    }
  }, [editData, setValue, editData?.translation]);

  const handleSelectItem = (value: any, inputType: string) => {
    setValue(inputType as any, value);
  };

  const { mutate: departmentStore, isPending: isPendingCreate } =
    useDepartmentStoreMutation();
  const { mutate: departmentUpdate, isPending: isPendingUpdate } =
    useDepartmentUpdateMutation();
  const onSubmit = async (values: DepartmentFormData) => {
    const defaultData = {
      name: values.name_df,
      status: values.status,
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`name_${lang.id}`])
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
      return departmentUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      return departmentStore(
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
          <Tabs defaultValue="df" className="">
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
            {multiLangData.map((lang) => {
              return (
                <TabsContent
                  key={lang.id}
                  value={lang.id}
                  className="lg:col-span-2"
                >
                  <div dir={dir} className="grid grid-cols-1 ">
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1 flex items-center gap-2">
                        <span>
                          {t("label.name")} (
                          {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                        </span>
                      </p>
                      <Input
                        id={`name_${lang.id}`}
                        {...register(
                          `name_${lang.id}` as keyof DepartmentFormData
                        )}
                        className="app-input"
                        placeholder={t("place_holder.enter_name")}
                      />
                      {errors[
                        `name_${lang.id}` as keyof DepartmentFormData
                      ] && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors as any)[`name_${lang.id}`]?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1 flex items-center gap-2">
                        <span>{t("label.status")}</span>
                      </p>
                      <Controller
                        control={control}
                        name="status"
                        defaultValue={String(data?.status) || ""}
                        render={({ field }) => (
                          <>
                            <AppSelect
                              value={field.value}
                              onSelect={(value) => {
                                field.onChange(value);
                                handleSelectItem(value, "status");
                              }}
                              groups={StatusList}
                            />
                          </>
                        )}
                      />
                      {errors.status && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.status.message}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
        <div className="mt-10">
          <SubmitButton
            UpdateData={data}
            IsLoading={editData ? isPendingUpdate : isPendingCreate}
            AddLabel={t("button.add_department")}
            UpdateLabel={t("button.update_department")}
          />
        </div>
      </form>
    </div>
  );
};
export default CreateOrUpdateDepartmentForm;
