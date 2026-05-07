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
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useSellerStoreQuery } from "@/modules/admin-section/seller-store/seller-store.action";
import { useSellerQuery } from "@/modules/admin-section/seller/seller.action";
import {
  useNoticeStoreMutation,
  useNoticeUpdateMutation,
} from "@/modules/admin-section/store-notices/store-notices.action";
import {
  NoticeFormData,
  noticeSchema,
} from "@/modules/admin-section/store-notices/store-notices.schema";
import { toast } from "react-toastify";
import CustomSingleDatePicker from "../../common/CustomSingleDatePicker";
import { format, parse, startOfDay } from "date-fns";

const TypeList = [
  { label: "General", value: "general" },
  { label: "Specific Store", value: "specific_store" },
  { label: "Specific Seller", value: "specific_seller" },
];
const PriorityList = [
  { label: "Low", value: "low" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
];

const CreateOrUpdateStoreNoticesForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const MenuCustomizationData = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<NoticeFormData>({
    resolver: zodResolver(noticeSchema),
  });
  const checkedValue = watch();

  const { sellerList } = useSellerQuery({});
  const { sellerStoreList } = useSellerStoreQuery({
    seller_id: checkedValue.seller_id,
  });
  let sellerData = (sellerList as any) || [];
  let sellerStoreData = (sellerStoreList as any) || [];
const formatDate = (dateString: string) => {
  // Parse the date string as UTC
  const date = new Date(dateString + 'Z');
  return date.toISOString().split("T")[0];
};
  useEffect(() => {
    if (MenuCustomizationData) {
      setValue("title_df", MenuCustomizationData?.title ?? "");
      setValue("message_df", MenuCustomizationData?.message ?? "");
      setValue("type", MenuCustomizationData?.type ?? "");
      setValue("priority", MenuCustomizationData?.priority ?? "");
      setValue(
        "active_date",
        MenuCustomizationData?.active_date
          ? formatDate(MenuCustomizationData?.active_date)
          : ""
      );
      setValue(
        "expire_date",
        MenuCustomizationData?.expire_date
          ? formatDate(MenuCustomizationData?.expire_date)
          : ""
      );

      Object.keys(MenuCustomizationData?.translations).forEach((language) => {
        const translation = MenuCustomizationData.translations[language];
        setValue(
          `title_${language}` as keyof NoticeFormData,
          translation?.title ?? ""
        );
        setValue(
          `message_${language}` as keyof NoticeFormData,
          translation?.message ?? ""
        );
      });
    }
  }, [MenuCustomizationData, setValue, MenuCustomizationData?.translations]);

  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
    if (inputType === "type") {
      setValue("store_id", "");
      setValue("seller_id", "");
    }
  };

  const { mutate: SliderStore, isPending: isSliderPending } =
    useNoticeStoreMutation();
  const { mutate: SliderUpdate, isPending: isSliderUpdating } =
    useNoticeUpdateMutation();

  const onSubmit = async (values: NoticeFormData) => {
    const defaultData: any = {
      ...values,
      id: MenuCustomizationData ? MenuCustomizationData?.id : "",
      title: values.title_df,
      message: values.message_df,
    };

    if (values.type === "specific_store" && values.store_id === "") {
      return toast.error("Please Select Specific Store");
    }
    if (values.type === "specific_seller" && values.seller_id === "") {
      return toast.error("Please Select Specific Seller");
    }
    const translations = multiLangData
      .filter((lang) => (values as any)[`title_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        title: (values as any)[`title_${lang.id}`],
        message: (values as any)[`message_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      translations: translations,
    };

    if (MenuCustomizationData) {
      return SliderUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
            dispatch(setRefetch(true));
          },
        }
      );
    } else {
      return SliderStore(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
            dispatch(setRefetch(true));
          },
        }
      );
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
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
                  <div dir={dir}>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div className="">
                            <div className="grid grid-cols-2 gap-4 ">
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    {t("label.type")}
                                  </p>
                                  <Controller
                                    control={control}
                                    name="type"
                                    defaultValue={
                                      MenuCustomizationData?.type ?? ""
                                    }
                                    render={({ field }) => (
                                      <AppSelect
                                        value={field.value || ""}
                                        onSelect={(value) => {
                                          field.onChange(value);
                                          handleSelectItem(value, "type");
                                        }}
                                        groups={TypeList}
                                        hideNone
                                      />
                                    )}
                                  />
                                </div>

                                <div className="">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span>Title</span>
                                  </p>
                                  <Input
                                    id={`title_${lang.id}`}
                                    {...register(
                                      `title_${lang.id}` as keyof NoticeFormData
                                    )}
                                    className="app-input"
                                    placeholder="Entry title"
                                  />
                                  {errors[
                                    `title_${lang.id}` as keyof NoticeFormData
                                  ] && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {
                                        (errors as any)[`title_${lang.id}`]?.message
                                      }
                                    </p>
                                  )}
                                </div>
                                <div className="">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span>Message</span>
                                  </p>
                                  <Textarea
                                    id={`message_${lang.id}`}
                                    {...register(
                                      `message_${lang.id}` as keyof NoticeFormData
                                    )}
                                    className="app-input min-h-[120px]"
                                    placeholder="Entry message"
                                  />
                                  {errors[
                                    `message_${lang.id}` as keyof NoticeFormData
                                  ] && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {
                                       
                                        (errors as any)[`message_${lang.id}`]?.message
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-4">
                                {checkedValue.type == "specific_seller" && (
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      Seller
                                    </p>
                                    <Controller
                                      control={control}
                                      name="seller_id"
                                      defaultValue={
                                        String(
                                          MenuCustomizationData?.seller_id
                                        ) ?? ""
                                      }
                                      render={({ field }) => (
                                        <AppSelect
                                          value={field.value || ""}
                                          onSelect={(value) => {
                                            field.onChange(value);
                                            handleSelectItem(
                                              value,
                                              "seller_id"
                                            );
                                          }}
                                          groups={sellerData}
                                        />
                                      )}
                                    />
                                  </div>
                                )}
                                {checkedValue.type == "specific_store" && (
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      Store
                                    </p>
                                    <Controller
                                      control={control}
                                      name="store_id"
                                      defaultValue={
                                        String(
                                          MenuCustomizationData?.store_id
                                        ) ?? ""
                                      }
                                      render={({ field }) => (
                                        <AppSelect
                                          value={field.value || ""}
                                          onSelect={(value) => {
                                            field.onChange(value);
                                            handleSelectItem(value, "store_id");
                                          }}
                                          groups={sellerStoreData}
                                        />
                                      )}
                                    />
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    Priority
                                  </p>
                                  <Controller
                                    control={control}
                                    name="priority"
                                    defaultValue={
                                      MenuCustomizationData?.priority ?? ""
                                    }
                                    render={({ field }) => (
                                      <AppSelect
                                        value={field.value || ""}
                                        onSelect={(value) => {
                                          field.onChange(value);
                                          handleSelectItem(value, "priority");
                                        }}
                                        groups={PriorityList}
                                        hideNone
                                      />
                                    )}
                                  />
                                </div>

                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    {t("label.active_date")}
                                  </p>
                                  <Controller
                                    name="active_date"
                                    control={control}
                                    render={({ field }) => (
                                      <CustomSingleDatePicker
                                        label=""
                                        selectedDate={
                                          field.value
                                            ? parse(
                                                field.value,
                                                "yyyy-MM-dd",
                                                new Date()
                                              )
                                            : null
                                        }
                                        onChange={(date) => {
                                          if (date) {
                                            field.onChange(
                                              format(date, "yyyy-MM-dd")
                                            );
                                          } else {
                                            field.onChange("");
                                          }
                                        }}
                                      />
                                    )}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    {t("label.expire_date")}
                                  </p>
                                  <Controller
                                    name="expire_date"
                                    control={control}
                                    render={({ field }) => {
                                      const startDateValue =
                                        watch("active_date");
                                      const parsedStartDate = startDateValue
                                        ? startOfDay(
                                            parse(
                                              startDateValue,
                                              "yyyy-MM-dd",
                                              new Date()
                                            )
                                          )
                                        : null;

                                      const today = startOfDay(new Date());

                                      let minDate = today;
                                      if (
                                        parsedStartDate &&
                                        parsedStartDate > today
                                      ) {
                                        minDate = parsedStartDate;
                                      }
                                      return (
                                        <CustomSingleDatePicker
                                          label=""
                                          selectedDate={
                                            field.value
                                              ? parse(
                                                  field.value,
                                                  "yyyy-MM-dd",
                                                  new Date()
                                                )
                                              : null
                                          }
                                          onChange={(date) => {
                                            if (date) {
                                              field.onChange(
                                                format(date, "yyyy-MM-dd")
                                              );
                                            } else {
                                              field.onChange("");
                                            }
                                          }}
                                          minDate={minDate}
                                        />
                                      );
                                    }}
                                  />
                                  {errors.expire_date && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {errors.expire_date.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </div>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton
              UpdateData={data}
              IsLoading={data ? isSliderUpdating : isSliderPending}
              AddLabel="Add Notice"
              UpdateLabel="Update Notice"
            />
          </Card>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateStoreNoticesForm;
