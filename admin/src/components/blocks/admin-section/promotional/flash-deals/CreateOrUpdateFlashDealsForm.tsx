"use client";
import multiLang from "@/components/molecules/multiLang.json";
import { AppSelect } from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
import PhotoUploadModal from "@/components/blocks/shared/PhotoUploadModal";
import {
  Button,
  Card,
  CardContent,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import {
  useFlashDealsStoreMutation,
  useFlashDealsUpdateMutation,
  useTypeWiseStoreQuery,
} from "@/modules/admin-section/promotional/flash-deals/flash-deals.action";
import {
  FlashDealsFormData,
  flashDealsSchema,
} from "@/modules/admin-section/promotional/flash-deals/flash-deals.schema";
import Select from "react-select";

import CloudIcon from "@/assets/icons/CloudIcon";
import CustomSingleDatePicker from "@/components/blocks/common/CustomSingleDatePicker";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import GlobalImageLoader from "@/lib/imageLoader";
import { useStoreTypeQuery } from "@/modules/common/store-type/store-type.action";
import { useStoreWiseProductQuery } from "@/modules/common/store-wise-product/store-wise-product.action";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse, startOfDay } from "date-fns";
import { Check, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import StoreTypeCard from "../../business-operations/area/settings/components/StoreTypeCard";
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

const DiscountTypeList = [
  { label: "Percent (%)", value: "percentage" },
  { label: "Fixed ($)", value: "amount" },
];
const ProductFilterList = [
  { id: "1", label: "Handpicked products", value: "handpicked_products" },
  {
    id: "2",
    label: "Filter products by store",
    value: "filter_products_by_store",
  },
];
type LangKeys = keyof IntlMessages["lang"];
const CreateOrUpdateFlashDealsForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    control,
  } = useForm<FlashDealsFormData>({
    resolver: zodResolver(flashDealsSchema),
    defaultValues: {
      store_id: "",
      title_color: "#ff6133",
      description_color: "#ffe933",
      button_text_color: "#1beb11",
      button_bg_color: "#ffff",
      button_hover_color: "#1153eb",
      background_color: "#0a3eb5",
      timer_bg_color: "#0a3eb5",
      timer_text_color: "#0a3eb5",
    },
  });
  const checkedValue = watch();

  const [lastSelectedImages, setLastSelectedImages] = useState<any>(null);
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");
  const [errorImagesMessage, setImagesErrorMessage] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    string | null
  >("1");
  const { storeType } = useStoreTypeQuery({});
  const { TypeWiseStoreList } = useTypeWiseStoreQuery({
    store_type: checkedValue.store_type,
  });
  const { StoreWiseProductList, refetch } = useStoreWiseProductQuery({
    store_id: checkedValue.store_id,
  });
  let StoreTypeData = (storeType as any) || [];
  let TypeWiseStoreData = (TypeWiseStoreList as any)?.data || [];
  let StoreWiseProductData = (StoreWiseProductList as any)?.data || [];

  const handleCardClick = (optionId: string) => {
    setSelectedPaymentOption(
      optionId === selectedPaymentOption ? null : optionId
    );

    if (optionId == "1") {
      setValue("store_id", "");
      checkedValue.store_id = "";
      refetch();
    }
  };

  const onChangeMultiSelect = (value: Option[]) => {
    setSelectedProducts(value);
  };

  useEffect(() => {
    if (data) {
      setSelectedProducts(data?.products);
      if (data?.start_time) {
        const [start_date, start_time] = data.start_time.split(" ");
        setValue("start_date", start_date ?? "");
        setValue("start_time", start_time ?? "");
      } else {
        setValue("start_date", "");
        setValue("start_time", "");
      }
      if (data?.end_time) {
        const [end_date, end_time] = data.end_time.split(" ");
        setValue("end_date", end_date ?? "");
        setValue("end_time", end_time ?? "");
      } else {
        setValue("end_date", "");
        setValue("end_time", "");
      }
      setValue("title_df", data?.title ?? "");
      setValue("description_df", data?.description ?? "");
      setValue("button_text_df", data?.button_text ?? "");
      setValue("discount_type", data.discount_type ?? "");
      setValue("discount_amount", Number(data.discount_amount) ?? 0);

      setValue("title_color", data?.title_color ?? "");
      setValue("description_color", data?.description_color ?? "");
      setValue("background_color", data?.background_color ?? "");
      setValue("button_text_color", data?.button_text_color ?? "");
      setValue("button_bg_color", data?.button_bg_color ?? "");
      setValue("button_hover_color", data?.button_hover_color ?? "");
      setValue("timer_bg_color", data?.timer_bg_color ?? "");
      setValue("timer_text_color", data?.timer_text_color ?? "");

      Object.keys(data.related_translations).forEach((language) => {
        const translation = data.related_translations[language];
        setValue(
          `title_${language}` as keyof FlashDealsFormData,
          translation?.title ?? ""
        );
        setValue(
          `description_${language}` as keyof FlashDealsFormData,
          translation?.description ?? ""
        );
        setValue(
          `button_text_${language}` as keyof FlashDealsFormData,
          translation?.button_text ?? ""
        );
      });
      if (data?.cover_image) {
        setLastSelectedImages({
          image_id: data?.cover_image ? data?.cover_image : "",
          img_url: data?.cover_image
            ? data?.cover_image_url
            : "/images/no-image.png",
          name: "cover image",
        });
      }
      if (data?.image) {
        setLastSelectedLogo({
          image_id: data?.image ? data?.image : "",
          img_url: data?.image_url ? data?.image_url : "/images/no-image.png",
          name: "flash deals image",
        });
      }
    }
  }, [data, setValue, data?.translations]);

  const titleColor = watch("title_color");
  const descriptionColor = watch("description_color");
  const backgroundColor = watch("background_color");
  const buttonTextColor = watch("button_text_color");
  const buttonBGColor = watch("button_bg_color");
  const buttonHoverColor = watch("button_hover_color");
  const timeBGColor = watch("timer_bg_color");
  const timeTextColor = watch("timer_text_color");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--title-color", titleColor || "#000000");
      root.style.setProperty(
        "--description-color",
        descriptionColor || "#000000"
      );
      root.style.setProperty(
        "--button-text-color",
        buttonTextColor || "#ffffff"
      );
      root.style.setProperty("--button-color", buttonBGColor || "#1153eb");
      root.style.setProperty(
        "--button-hover-color",
        buttonHoverColor || "#0d47a1"
      );
      root.style.setProperty(
        "--background-color",
        backgroundColor || "#0a3eb5"
      );
      root.style.setProperty("--timer-bg-color", timeBGColor || "#0a3eb5");
      root.style.setProperty("--timer-text-color", timeTextColor || "#0a3eb5");
    }
  }, [
    titleColor,
    descriptionColor,
    buttonTextColor,
    buttonBGColor,
    buttonHoverColor,
    backgroundColor,
    timeBGColor,
    timeTextColor,
  ]);

  const handleColorChange = (color: string, colorField: string) => {
    //@ts-ignore
    setValue(colorField, color, { shouldValidate: true });
  };

  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
    setValue("discount_amount", 0);
  };

  const handleSaveImages = (images: UploadedImage[]) => {
    setLastSelectedImages(images[0]);
    const dimensions = images[0].dimensions;
    //@ts-ignore
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

  const handleSaveLogo = (images: UploadedImage[]) => {
    setLastSelectedLogo(images[0]);
    const dimensions = images[0].dimensions;
    //@ts-ignore
    const [width, height] = dimensions
      .split(" x ")
      .map((dim) => parseInt(dim.trim(), 10));
    const aspectRatio = width / height;

    if (Math.abs(aspectRatio - 1 / 1) < 0.01) {
      setLogoErrorMessage("");
      return true;
    } else {
      setLogoErrorMessage("Image must have a 1:1 aspect ratio.");
      return false;
    }
  };

  const removeLogo = () => {
    setLastSelectedLogo(null);
    setLogoErrorMessage("");
  };

  const { mutate: FlashDealsStore, isPending: isFlashDealsStorePending } =
    useFlashDealsStoreMutation();
  const { mutate: FlashDealsUpdate, isPending: isFlashDealsUpdatePending } =
    useFlashDealsUpdateMutation();

  const onSubmit = async (values: FlashDealsFormData) => {
    const openingTime = `${values.start_date} ${
      values.start_time || "00:00:00"
    }`;

    const closingTime = `${values.end_date} ${values.end_time || "00:00:00"}`;
    const idsArray = selectedProducts.map((item) => item.value);

    if (idsArray.length < 1) {
      toast.error("At least one product must be selected!");
      return;
    }
    if (!values.start_time || !values.end_time) {
      toast.error("Both start time and end time are required!");
      return;
    }

    const startDate = new Date(openingTime);
    const endDate = new Date(closingTime);

    if (startDate > endDate) {
      toast.error("Start time cannot be greater than end time!");
      return;
    }
    const defaultData = {
      title: values.title_df,
      description: values.description_df,
      button_text: values.button_text_df,
      discount_type: values.discount_type,
      discount_amount: values.discount_amount,
      purchase_limit: values.purchase_limit,
      start_time: values.start_date === "" ? "" : openingTime,
      end_time: values.end_date === "" ? "" : closingTime,
      product_ids: idsArray,

      title_color: values.title_color,
      description_color: values.description_color,
      background_color: values.background_color,
      button_text_color: values.button_text_color,
      button_bg_color: values.button_bg_color,
      button_hover_color: values.button_hover_color,
      timer_bg_color: values.timer_bg_color,
      timer_text_color: values.timer_text_color,
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`title_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        title: (values as any)[`title_${lang.id}`],
        description: (values as any)[`description_${lang.id}`],
        button_text: (values as any)[`button_text_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: !data ? 0 : data.id,
      cover_image: lastSelectedImages ? lastSelectedImages?.image_id : "",
      image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations: translations,
    };

    if (data) {
      return FlashDealsUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
            dispatch(setRefetch(true));
          },
        }
      );
    } else {
      return FlashDealsStore(
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

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#e5e7eb"
        : state.isFocused
        ? "#f3f4f6"
        : "",
      color: "#000",
      padding: "10px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const trigger = (
    <div className="hover:cursor-pointer">
      {lastSelectedImages?.img_url ? (
        <div className="relative w-48 h-32 group">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedImages?.img_url}
            alt={lastSelectedImages?.name as string}
            fill
            sizes="192px"
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
        <div className="border-2 w-48 h-32 border-dashed border-blue-500 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <CloudIcon />
            <p className="mt-4 text-blue-500 text-sm font-medium p-1">
              {t("common.drag_and_drop")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
  const triggerLogo = (
    <div className="hover:cursor-pointer">
      {lastSelectedLogo?.img_url ? (
        <div className="relative w-32 h-32 group">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedLogo?.img_url}
            alt={lastSelectedLogo?.name as string}
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
        <div className="w-32 h-32 border-2 border-dashed border-blue-500 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <CloudIcon />
            <p className="mt-4 text-blue-500 text-sm font-medium p-1">
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 xl:gap-4">
            <Card className="col-span-2">
              <CardContent className="p-2 md:p-6">
                <h1 className="text-lg md:text-2xl font-medium mb-4">
                  {t("label.basic_information")}
                </h1>
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
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span>
                                      {t("label.title")} (
                                      {t(
                                        `lang.${lang.id}` as `lang.${LangKeys}`
                                      )}
                                      )
                                    </span>
                                  </p>
                                  <Input
                                    id={`title_${lang.id}`}
                                    {...register(
                                      `title_${lang.id}` as keyof FlashDealsFormData
                                    )}
                                    className="app-input"
                                    placeholder={t("place_holder.enter_title")}
                                  />
                                  {errors[
                                    `title_${lang.id}` as keyof FlashDealsFormData
                                  ] && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {
                                        //@ts-ignore
                                        errors[`title_${lang.id}`]?.message
                                      }
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    {/* <span>Description ({lang.label}) </span> */}
                                    <span>
                                      {t("label.description")} (
                                      {t(
                                        `lang.${lang.id}` as `lang.${LangKeys}`
                                      )}
                                      ){" "}
                                    </span>
                                  </p>
                                  <Textarea
                                    id={`description_${lang.id}`}
                                    {...register(
                                      `description_${lang.id}` as keyof FlashDealsFormData
                                    )}
                                    className="app-input"
                                    placeholder={t(
                                      "place_holder.enter_description"
                                    )}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span>
                                      {t("label.button_title")} (
                                      {t(
                                        `lang.${lang.id}` as `lang.${LangKeys}`
                                      )}
                                      )
                                    </span>
                                  </p>
                                  <Input
                                    id={`button_text_${lang.id}`}
                                    {...register(
                                      `button_text_${lang.id}` as keyof FlashDealsFormData
                                    )}
                                    className="app-input"
                                    placeholder={t(
                                      "place_holder.enter_button_text"
                                    )}
                                  />
                                  {errors[
                                    `button_text_${lang.id}` as keyof FlashDealsFormData
                                  ] && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {
                                        //@ts-ignore
                                        errors[`button_text_${lang.id}`]
                                          ?.message
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-start gap-4">
                                <div className="xl:col-span-2 col-span-4">
                                  <div className="text-sm font-medium flex items-center gap-2 mb-1">
                                    <span>{t("label.bg_image")}</span>
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
                                  <div className="relative flex align-start gap-4 w-full">
                                    <div className="relative w-48">
                                      <PhotoUploadModal
                                        trigger={trigger}
                                        isMultiple={false}
                                        onSave={handleSaveImages}
                                        usageType="flash_deals"
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
                                      {errorImagesMessage && (
                                        <p className="text-red-500 text-sm mt-1">
                                          {errorImagesMessage}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="xl:col-span-1 col-span-2">
                                  <div className="text-sm font-medium flex items-center gap-2 mb-1">
                                    <span>{t("label.thumbnail")}</span>
                                    <div>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                          </TooltipTrigger>
                                          <TooltipContent className="bg-custom-dark-blue w-96">
                                            <p className="p-1 text-sm font-medium">
                                              {t("tooltip.aspect_ratio_1_1")}
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </div>
                                  <div className="relative flex align-start gap-4">
                                    <div className="relative w-32">
                                      <PhotoUploadModal
                                        trigger={triggerLogo}
                                        isMultiple={false}
                                        onSave={handleSaveLogo}
                                        usageType="flash_deals"
                                        selectedImage={lastSelectedLogo}
                                      />
                                      {lastSelectedLogo?.image_id && (
                                        <Cancel
                                          customClass="absolute top-0 right-0 m-1"
                                          onClick={(event: {
                                            stopPropagation: () => void;
                                          }) => {
                                            event.stopPropagation();
                                            removeLogo();
                                          }}
                                        />
                                      )}
                                      {errorLogoMessage && (
                                        <p className="text-red-500 text-sm mt-1">
                                          {errorLogoMessage}
                                        </p>
                                      )}
                                    </div>
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
            <div className="col-span-1 grid grid-cols-1">
              <Card className="">
                <CardContent className="p-2 md:p-6">
                  <div dir={dir}>
                    <h1 className="text-lg md:text-2xl font-medium mb-4">
                      {t("label.product_validity")}
                    </h1>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium mb-1">
                          {t("label.opening_date")}
                        </p>
                        <div className="grid grid-cols-3 items-center gap-2">
                          <div className="col-span-2">
                            <Controller
                              name="start_date"
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
                          <Input
                            type="time"
                            id="start_time"
                            {...register("start_time")}
                            className="app-input flex flex-col "
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-1">
                          {" "}
                          {t("label.expire_date")}
                        </p>
                        <div className="grid grid-cols-3  items-center gap-2">
                          <div className="col-span-2">
                            <Controller
                              name="end_date"
                              control={control}
                              render={({ field }) => {
                                const startDateValue = watch("start_date");
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
                          </div>
                          <Input
                            type="time"
                            id="end_time"
                            {...register("end_time")}
                            className="app-input flex flex-col"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardContent className="p-2 md:p-6">
                  <div dir={dir}>
                    <h1 className="text-lg md:text-2xl font-medium mb-4">
                      {t("label.setup_discount")}
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium mb-1">
                          {t("label.discount_type")}
                        </p>
                        <Controller
                          control={control}
                          name="discount_type"
                          defaultValue={data?.discount_type || ""}
                          render={({ field }) => (
                            <AppSelect
                              value={field.value}
                              onSelect={(value) => {
                                field.onChange(value);
                                handleSelectItem(value, "discount_type");
                              }}
                              groups={DiscountTypeList}
                              hideNone
                            />
                          )}
                        />
                        {errors[
                          "discount_type" as keyof FlashDealsFormData
                        ] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors["discount_type"]?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">
                          {t("label.discount")}{" "}
                          {checkedValue.discount_type
                            ? `( ${
                                checkedValue.discount_type === "percentage"
                                  ? "%"
                                  : "$"
                              } )`
                            : ""}
                        </p>
                        <Input
                          type="number"
                          id="discount_amount"
                          disabled={checkedValue.discount_type === ""}
                          {...register(
                            "discount_amount" as keyof FlashDealsFormData,
                            {
                              required: "Discount is required",
                              valueAsNumber: true,
                              validate: (value) => {
                                const numericValue = Number(value);
                                if (
                                  checkedValue.discount_type === "percentage" &&
                                  numericValue > 100
                                ) {
                                  return "Percent discount cannot exceed 100";
                                }
                                return true;
                              },
                            }
                          )}
                          className="app-input"
                          placeholder={t("place_holder.enter_discount")}
                          onFocus={(e) => {
                            // Clear the value when the input gains focus
                            if (e.target.value === "0") {
                              e.target.value = "";
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericValue = Number(value);
                            if (
                              checkedValue.discount_type === "percentage" &&
                              numericValue > 100
                            ) {
                              e.target.value = "100";
                            }
                            register(
                              "discount_amount" as keyof FlashDealsFormData
                            ).onChange(e);
                          }}
                        />
                        {errors[
                          "discount_amount" as keyof FlashDealsFormData
                        ] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors["discount_amount"]?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">
                          {t("label.purchase_limit")}
                        </p>
                        <Input
                          type="number"
                          id="purchase_limit"
                          defaultValue={
                            data?.purchase_limit
                              ? String(data?.purchase_limit)
                              : ""
                          }
                          {...register(
                            "purchase_limit" as keyof FlashDealsFormData
                          )}
                          className="app-input"
                          placeholder={t("place_holder.enter_purchase_limit")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
              <h1 className="text-lg md:text-2xl font-medium mb-4">
                {t("label.flash_deals_color")}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.title_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-title-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("title_color")}
                        onChange={(color) =>
                          handleColorChange(color, "title_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("title_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "title_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.description_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-description-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("description_color")}
                        onChange={(color) =>
                          handleColorChange(color, "description_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("description_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "description_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.button_text_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-button-text-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("button_text_color")}
                        onChange={(color) =>
                          handleColorChange(color, "button_text_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("button_text_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "button_text_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.button_bg_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-button-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("button_bg_color")}
                        onChange={(color) =>
                          handleColorChange(color, "button_bg_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("button_bg_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "button_bg_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.button_hover_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-button-hover-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("button_hover_color")}
                        onChange={(color) =>
                          handleColorChange(color, "button_hover_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("button_hover_color")}
                        onChange={(e) =>
                          handleColorChange(
                            e.target.value,
                            "button_hover_color"
                          )
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.bg_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-background-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("background_color")}
                        onChange={(color) =>
                          handleColorChange(color, "background_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("background_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "background_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.timer_bg_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-timer-bg-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("timer_bg_color")}
                        onChange={(color) =>
                          handleColorChange(color, "timer_bg_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("timer_bg_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "timer_bg_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-5 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.timer_text_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-timer-text-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("timer_text_color")}
                        onChange={(color) =>
                          handleColorChange(color, "timer_text_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("timer_text_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "timer_text_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
              <div dir={dir}>
                <h1 className="text-lg md:text-2xl font-medium mb-4">
                  {t("label.choose_products")}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 mb-4">
                  {ProductFilterList?.map((option: any) => (
                    <StoreTypeCard
                      key={option.id}
                      isSelected={selectedPaymentOption === option.id}
                      onClick={() => handleCardClick(option.id)}
                      imageSrc={option?.image_url}
                      title={option.label}
                    />
                  ))}
                </div>
                {selectedPaymentOption == "2" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">
                        {t("label.store_type")}
                      </p>
                      <Controller
                        control={control}
                        name="store_type"
                        defaultValue={String(data?.seller?.id) || ""}
                        render={({ field }) => (
                          <AppSelect
                            value={field.value || ""}
                            onSelect={(value) => {
                              field.onChange(value);
                              handleSelectItem(value, "store_type");
                            }}
                            groups={StoreTypeData}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">
                        {t("label.store")}
                      </p>
                      <Controller
                        control={control}
                        name="store_id"
                        defaultValue={String(data?.store?.id) || ""}
                        render={({ field }) => (
                          <AppSelect
                            value={field.value || ""}
                            onSelect={(value) => {
                              field.onChange(value);
                              handleSelectItem(value, "store_id");
                            }}
                            groups={TypeWiseStoreData}
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                    <span>{t("label.products")}</span>
                  </p>

                  <div>
                    <Select
                      isMulti
                      options={StoreWiseProductData}
                      styles={customStyles}
                      classNamePrefix="select"
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      value={selectedProducts}
                      //@ts-ignore
                      onChange={onChangeMultiSelect}
                      getOptionLabel={(option) =>
                        option?.label ? option.label.split(" | ")[0] : ""
                      }
                      formatOptionLabel={(option, { context }) => (
                        <div className="flex items-center justify-between">
                          <span>
                            {context === "menu"
                              ? option?.label ?? ""
                              : option?.label?.split(" | ")[0] ?? ""}
                          </span>
                          {context === "menu" &&
                            selectedProducts.some(
                              (attr) => attr.value === option.value
                            ) && (
                              <span>
                                <Check className="w-4 h-4 text-blue-500" />
                              </span>
                            )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton
              UpdateData={data}
              IsLoading={
                data ? isFlashDealsUpdatePending : isFlashDealsStorePending
              }
              AddLabel={t("button.add_flash_deals")}
              UpdateLabel={t("button.update_flash_deals")}
            />
          </Card>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateFlashDealsForm;
