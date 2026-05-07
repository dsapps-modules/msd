"use client";
import { SubmitButton } from "@/components/blocks/shared";
import multiLang from "@/components/molecules/multiLang.json";
import {
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  useDynamicFieldStoreMutation,
  useDynamicFieldUpdateMutation,
} from "@/modules/admin-section/dynamic-fields/dynamic-fields.action";
import {
  DynamicFieldFormData,
  dynamicFieldSchema,
} from "@/modules/admin-section/dynamic-fields/dynamic-fields.schema";
import { useStoreTypeQuery } from "@/modules/common/store-type/store-type.action";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppSelect } from "../../common";
type ToggleState = {
  is_required: boolean;
};
type LangKeys = keyof IntlMessages["lang"];
export default function CreateOrUpdateDynamicFieldForm({ data }: any) {
  const fieldTypes = [
    { label: "Text", value: "text" },
    { label: "Text Area", value: "textarea" },
    { label: "Select", value: "select" },
    { label: "Multi Select", value: "multiselect" },
    { label: "Number", value: "number" },
    { label: "URL", value: "url" },
    { label: "Time", value: "time" },
    { label: "Color", value: "color" },
    { label: "Boolean", value: "boolean" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Date", value: "date" },
    { label: "Date Time", value: "datetime" },
    { label: "Date Range", value: "daterange" },
  ];
  const StatusList = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Archived", value: "archived" },
  ];

  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const editData = data;
  const selectedStoreType =
    editData && editData?.store_type ? editData?.store_type : "";
  const selectedType = editData && editData?.type ? editData?.type : "";
  const selectedStatus = editData && editData?.status ? editData?.status : "";
  const filteredStatusList =
    selectedStatus === "archived"
      ? StatusList.filter(
          (s) => s.value === "inactive" || s.value === "archived"
        )
      : StatusList.filter(
          (s) => s.value === "active" || s.value === "inactive"
        );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset,
  } = useForm<DynamicFieldFormData>({
    resolver: zodResolver(dynamicFieldSchema),
    defaultValues: {
      store_type: selectedStoreType,
      type: selectedType,
      status: selectedStatus,
    },
  });
  const [toggles, setToggles] = useState<ToggleState>({
    is_required: false,
  });
  const { storeType } = useStoreTypeQuery({});
  let StoreTypeData = (storeType as any) || [];
  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
  };
  const generateSlug = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  useEffect(() => {
    if (editData) {
      setValue("name_df", editData.name ?? "");
      setValue("slug", editData.slug ?? "");
      setValue("type", editData.type ?? "");
      setValue("store_type", editData.store_type ?? "");
      setValue("status", editData.status ?? "");
      Object.keys(editData?.translations).forEach((language) => {
        const translation = editData?.translations[language];
        setValue(
          `name_${language}` as keyof DynamicFieldFormData,
          translation?.name ?? ""
        );
      });
      setToggles({
        is_required: editData.is_required,
      });
    }
  }, [editData, setValue]);

  const handleToggle = (field: keyof ToggleState) => {
    setToggles((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const { mutate: brandStore, isPending } = useDynamicFieldStoreMutation();
  const { mutate: brandUpdate, isPending: isUpdating } =
    useDynamicFieldUpdateMutation();
  const onSubmit = async (values: DynamicFieldFormData) => {
    const defaultData = {
      name: values.name_df,
      slug: values.slug,
      type: values.type,
      store_type: values.store_type,
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
      is_required: toggles?.is_required,
      translations: translations,
    };
    return data
      ? brandUpdate(
          { ...(submissionData as any) },
          {
            onSuccess: () => {
              dispatch(setRefetch(true));
              reset();
            },
          }
        )
      : brandStore(
          { ...(submissionData as any) },
          {
            onSuccess: () => {
              dispatch(setRefetch(true));
              reset();
            },
          }
        );
  };
  useEffect(() => {
    multiLangData.forEach((lang) => {
      const nameValue = watch(`name_df`);
      if (nameValue) {
        const slug = nameValue
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        setValue(`slug`, slug);
      }
    });
  }, [multiLangData, watch, setValue]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
            <div dir={dir} className="">
              {multiLangData.map((lang) => {
                return (
                  <TabsContent key={lang.id} value={lang.id}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>
                            {t("label.name")} (
                            {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                          </span>
                        </p>
                        <Input
                          id={`name_${lang.id}`}
                          {...register(
                            `name_${lang.id}` as keyof DynamicFieldFormData
                          )}
                          onChange={(e) => {
                            const value = e.target.value;
                            setValue(
                              `name_${lang.id}` as keyof DynamicFieldFormData,
                              value
                            );

                            if (lang.id === "df") {
                              setValue(
                                `name_df` as keyof DynamicFieldFormData,
                                value
                              );
                              setValue(
                                `slug` as keyof DynamicFieldFormData,
                                generateSlug(value)
                              );
                            }
                          }}
                          className="app-input"
                          placeholder={t("place_holder.enter_name")}
                        />

                        {errors[
                          `name_${lang.id}` as keyof DynamicFieldFormData
                        ] && (
                          <p className="text-red-500 text-sm mt-1">
                            {(errors as any)[`name_${lang.id}`]?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">
                          {t("label.type")}
                        </p>
                        <Controller
                          control={control}
                          name="type"
                          render={({ field }) => (
                            <AppSelect
                              value={field.value}
                              onSelect={(value) => {
                                field.onChange(value);
                                handleSelectItem(value, "type");
                              }}
                              groups={fieldTypes}
                              placeholder="Select Type"
                            />
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">
                          {t("label.store_type")}
                        </p>
                        <Controller
                          control={control}
                          name="store_type"
                          render={({ field }) => (
                            <AppSelect
                              value={field.value}
                              onSelect={(value) => {
                                field.onChange(value);
                                handleSelectItem(value, "store_type");
                              }}
                              groups={StoreTypeData}
                              placeholder="Select Store Type"
                            />
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">
                          {t("label.status")}
                        </p>
                        <Controller
                          control={control}
                          name="status"
                          render={({ field }) => (
                            <AppSelect
                            disabled={data && editData?.status =="archived"}
                              value={field.value}
                              onSelect={(value) => {
                                field.onChange(value);
                                handleSelectItem(value, "status");
                              }}
                              groups={filteredStatusList}
                              placeholder="Select Status"
                            />
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-8">
                        <p className=" font-medium text-gray-700 dark:text-white">Required</p>
                        <div className="flex flex-col items-start">
                          <Switch
                            dir="ltr"
                            checked={toggles.is_required}
                            onCheckedChange={() => handleToggle("is_required")}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>

        <div className="col-span-2 mt-10">
          <SubmitButton
            UpdateData={data}
            IsLoading={isPending || isUpdating}
            AddLabel="Add Field"
            UpdateLabel="Update Field"
          />
        </div>
      </form>
    </div>
  );
}
