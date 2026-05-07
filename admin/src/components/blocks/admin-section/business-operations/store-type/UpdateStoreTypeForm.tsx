"use client";
import CloudIcon from "@/assets/icons/CloudIcon";
import multiLang from "@/components/molecules/multiLang.json";
import {
  AppSelect,
} from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import PhotoUploadModal from "@/components/blocks/shared/PhotoUploadModal";
import {
  Card,
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import GlobalImageLoader from "@/lib/imageLoader";
import { useStoreTypeUpdateMutation } from "@/modules/admin-section/business-operations/store-type/store-type.action";
import {
  StoreTypeFormData,
  storeTypeSchema,
} from "@/modules/admin-section/business-operations/store-type/store-type.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
interface UploadedImage {
  id?: string;
  image_id?: string;
  file: File;
  url: string;
  img_url?: string;
  name?: string;
  size?: string;
  upload_at?: string;
  dimensions?: string;
  alt?: string;
}
interface Option {
  id: number;
  value: number;
  label: string;
}

const UpdateStoreTypeForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<StoreTypeFormData>({
    resolver: zodResolver(storeTypeSchema),
  });
  const checkedValue = watch();
  const [lastSelectedImages, setLastSelectedImages] = useState<any>(null);
  const [errorImagesMessage, setImagesErrorMessage] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);
  const [isFeature, setIsFeature] = useState(false);
  const DiscountTypeList = [
    { label: "Percent (%)", value: "percentage" },
    { label: "Fixed ($)", value: "fixed" },
  ];

  useEffect(() => {
    if (data) {
      setSelectedProducts(data?.products);
      let UpdateFeature =
        data?.additional_charge_enable_disable == 1 ? true : false;
      setIsFeature(UpdateFeature);
      setValue("name_df", data?.name ?? "");
      setValue("description_df", data?.description ?? "");
      setValue("additional_charge_name_df", data?.additional_charge_name ?? "");
      setValue(
        "additional_charge_amount",
        data?.additional_charge_amount ?? ""
      );
      setValue("additional_charge_type", data?.additional_charge_type ?? "");
      setValue(
        "additional_charge_commission",
        data?.additional_charge_commission ?? ""
      );

      Object?.keys(data.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(
          `name_${language}` as keyof StoreTypeFormData,
          translation?.name ?? ""
        );
        setValue(
          `description_${language}` as keyof StoreTypeFormData,
          translation?.description ?? ""
        );
        setValue(
          `additional_charge_name_${language}` as keyof StoreTypeFormData,
          translation?.additional_charge_name ?? ""
        );
      });
      if (data?.image) {
        setLastSelectedImages({
          image_id: data?.image ? data?.image : "",
          img_url: data?.image ? data?.image_url : "/images/no-image.png",
          name: "cover image",
        });
      }
    }
  }, [data, setValue, data?.translations]);

  const handleSaveImages = (images: UploadedImage[]) => {
    setLastSelectedImages(images[0]);
    const dimensions = images[0].dimensions ?? "";
    const [width, height] = dimensions
      .split(" x ")
      .map((dim) => parseInt(dim.trim(), 10));
    const aspectRatio = width / height;

    if (Math.abs(aspectRatio - 4 / 1) < 0.01) {
      setImagesErrorMessage("");
      return true;
    } else {
      setImagesErrorMessage("Image must have a 4:1 aspect ratio.");
      return false;
    }
  };

  const removePreview = () => {
    setLastSelectedImages(null);
    setImagesErrorMessage("");
  };
  const handleToggleStatus = () => {
    setIsFeature(!isFeature);
  };
  const handleSelectItem = (value: any, inputType: any) => {
    setValue(inputType as any, value);

    setValue("additional_charge_amount", "");
  };

  const { mutate: StoreTypeUpdate, isPending: isStoreTypeUpdatePending } =
    useStoreTypeUpdateMutation();

  const onSubmit = async (values: StoreTypeFormData) => {
    const defaultData = {
      name: values.name_df,
      description: values.description_df,
      additional_charge_name: values.additional_charge_name_df,
      additional_charge_amount: Number(values.additional_charge_amount),
      additional_charge_type: values.additional_charge_type,
      additional_charge_commission: Number(values.additional_charge_commission),
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
        description: (values as any)[`description_${lang.id}`],
        additional_charge_name: (values as any)[
          `additional_charge_name_${lang.id}`
        ],
      }));
    const submissionData = {
      ...defaultData,
      id: !data ? 0 : data.id,
      image: lastSelectedImages ? lastSelectedImages?.image_id : "",
      additional_charge_enable_disable: isFeature == true ? 1 : 0,
      translations: translations,
    };

    if (data) {
      return StoreTypeUpdate(
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

  const trigger = (
    <div className="hover:cursor-pointer">
      {lastSelectedImages?.img_url ? (
        <div className="relative w-32 h-32 group">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedImages?.img_url}
            alt={lastSelectedImages?.name as string}
            fill
            sizes="128px"
            className="w-full h-full border dark:border-gray-500 rounded"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FFFFFFE5] border-l border-r border-b w-full rounded-b opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center justify-center">
            <CloudIcon />
            <p className="text-sm font-bold text-red-500 p-1">
              {t("common.change_image")}
            </p>
          </div>
        </div>
      ) : (
        <div className="border-2 h-32 w-32 border-dashed border-blue-500 p-2 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
          <div className="flex flex-col items-center justify-center mt-2">
            <CloudIcon />
            <p className="mt-2 text-blue-500 text-sm font-medium">
              {t("common.drag_and_drop")}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
              <Tabs defaultValue="df">
                <TabsList dir={dir} className="flex justify-start bg-white p-2">
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
                        <div className="mt-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Card className="p-2 md:p-6 space-y-2">
                              <div>
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>
                                    {t("common.store_type_name")} ({lang.label})
                                  </span>
                                </p>
                                <Input
                                  id={`name_${lang.id}`}
                                  {...register(
                                    `name_${lang.id}` as keyof StoreTypeFormData
                                  )}
                                  className="app-input"
                                  placeholder={t("place_holder.enter_name")}
                                />
                                {errors[
                                  `name_${lang.id}` as keyof StoreTypeFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      (errors as any)[`name_${lang.id}`]
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>
                                    {t("common.description")} ({lang.label})
                                  </span>
                                </p>
                                <Textarea
                                  id={`description_${lang.id}`}
                                  {...register(
                                    `description_${lang.id}` as keyof StoreTypeFormData
                                  )}
                                  className="app-input"
                                  placeholder={t(
                                    "place_holder.enter_description"
                                  )}
                                />
                              </div>
                              <div className="flex  gap-4">
                                <div>
                                  <div className="text-sm font-medium flex items-center gap-2 mb-2">
                                    <span> {t("common.store_type_logo")}</span>
                                    <div>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                          </TooltipTrigger>
                                          <TooltipContent className="bg-custom-dark-blue w-96">
                                            <p className="p-1 text-sm font-medium">
                                              {t("tooltip.aspect_ratio_4_1")}
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </div>
                                  <div className="relative w-32">
                                    <PhotoUploadModal
                                      trigger={trigger}
                                      isMultiple={false}
                                      onSave={handleSaveImages}
                                      usageType="store"
                                      selectedImage={lastSelectedImages}
                                    />
                                    {lastSelectedImages?.image_id && (
                                      <Cancel
                                        customClass="absolute top-0 right-0 m-1"
                                        onClick={(event: {
                                          stopPropagation: () => void;
                                        }) => {
                                          event.stopPropagation();
                                          removePreview();
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-2 md:p-6 space-y-2">
                              <div className="my-4 grid grid-cols-4 md:grid-cols-8 items-center">
                                <p className="col-span-3 text-sm font-medium mb-1">
                                  {t("common.additional_charge_enable")}
                                </p>
                                <Switch
                                  dir="ltr"
                                  checked={isFeature}
                                  onCheckedChange={() => handleToggleStatus()}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>
                                    {t("common.additional_charge_name")} (
                                    {lang.label})
                                  </span>
                                </p>
                                <Input
                                  id={`additional_charge_name_${lang.id}`}
                                  {...register(
                                    `additional_charge_name_${lang.id}` as keyof StoreTypeFormData
                                  )}
                                  className="app-input"
                                  placeholder={t("place_holder.enter_name")}
                                />
                                {errors[
                                  `additional_charge_name_${lang.id}` as keyof StoreTypeFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      (errors as any)[
                                        `additional_charge_name_${lang.id}`
                                      ]?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">
                                  {t("common.additional_charge_type")}
                                </p>
                                <Controller
                                  control={control}
                                  name="additional_charge_type"
                                  defaultValue={
                                    data?.additional_charge_type ?? ""
                                  }
                                  render={({ field }) => (
                                    <AppSelect
                                      value={field.value || ""}
                                      onSelect={(value) => {
                                        field.onChange(value);
                                        handleSelectItem(
                                          value,
                                          "additional_charge_type"
                                        );
                                      }}
                                      groups={DiscountTypeList}
                                      hideNone
                                    />
                                  )}
                                />
                                {errors[
                                  "additional_charge_type" as keyof StoreTypeFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      (errors as any)["additional_charge_type"]
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <div className="">
                                <p className="text-sm font-medium mb-1">
                                  {t("common.additional_charge_amount")}
                                  {checkedValue.additional_charge_type
                                    ? `( ${
                                        checkedValue.additional_charge_type ===
                                        "percentage"
                                          ? "%"
                                          : "$"
                                      } )`
                                    : ""}
                                </p>
                                <Input
                                  type="number"
                                  min={0}
                                  id="additional_charge_amount"
                                  disabled={
                                    checkedValue.additional_charge_type === ""
                                  }
                                  {...register(
                                    "additional_charge_amount" as keyof StoreTypeFormData,
                                    {
                                      required: "Discount is required",

                                      validate: (value) => {
                                        const numericValue = Number(value);
                                        if (
                                          checkedValue.additional_charge_type ===
                                            "percentage" &&
                                          numericValue > 100
                                        ) {
                                          return "Percent additional_charge_amount cannot exceed 100";
                                        }
                                        return true;
                                      },
                                    }
                                  )}
                                  className="app-input"
                                  placeholder={t("place_holder.enter_discount")}
                                  onFocus={(e) => {
                                    if (e.target.value === "0") {
                                      e.target.value = "";
                                    }
                                  }}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const numericValue = Number(value);
                                    if (
                                      checkedValue.additional_charge_type ===
                                        "percentage" &&
                                      numericValue > 100
                                    ) {
                                      e.target.value = "100";
                                    }
                                    register(
                                      "additional_charge_amount" as keyof StoreTypeFormData
                                    ).onChange(e);
                                  }}
                                />
                                {errors[
                                  "additional_charge_amount" as keyof StoreTypeFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      (errors as any)[
                                        "additional_charge_amount"
                                      ]?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <div className="">
                                <p className="text-sm font-medium mb-1">
                                  {t("common.admin_additional_charge")} (%)
                                </p>
                                <Input
                                  type="number"
                                  min={0}
                                  id="additional_charge_commission"
                                  {...register(
                                    "additional_charge_commission" as keyof StoreTypeFormData,
                                    {
                                      required: "Discount is required",

                                      validate: (value) => {
                                        const numericValue = Number(value);
                                        if (numericValue > 100) {
                                          return "Percent admin additional charge commission cannot exceed 100";
                                        }
                                        return true;
                                      },
                                    }
                                  )}
                                  className="app-input"
                                  placeholder={t("place_holder.enter_discount")}
                                  onFocus={(e) => {
                                    if (e.target.value === "0") {
                                      e.target.value = "";
                                    }
                                  }}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const numericValue = Number(value);
                                    if (numericValue > 100) {
                                      e.target.value = "100";
                                    }
                                    register(
                                      "additional_charge_commission" as keyof StoreTypeFormData
                                    ).onChange(e);
                                  }}
                                />
                                {errors[
                                  "additional_charge_commission" as keyof StoreTypeFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      (errors as any)[
                                        "additional_charge_commission"
                                      ]?.message
                                    }
                                  </p>
                                )}
                              </div>
                            </Card>
                          </div>
                        </div>
                      </TabsContent>
                    );
                  })}
                </div>
              </Tabs>
            </div>
          </div>

          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton
              UpdateData={data}
              IsLoading={isStoreTypeUpdatePending}
              UpdateLabel={t("button.update")}
            />
          </Card>
        </form>
      </div>
    </>
  );
};

export default UpdateStoreTypeForm;
