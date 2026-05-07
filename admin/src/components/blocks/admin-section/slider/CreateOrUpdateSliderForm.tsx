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
} from "@/components/ui";

import CloudIcon from "@/assets/icons/CloudIcon";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import {
  useSliderStoreMutation,
  useSliderUpdateMutation,
} from "@/modules/admin-section/slider/slider.action";
import {
  SliderFormData,
  sliderSchema,
} from "@/modules/admin-section/slider/slider.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import GlobalImageLoader from "@/lib/imageLoader";
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

const StatusList = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" },
];
const PlatformList = [
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
];

type LangKeys = keyof IntlMessages["lang"];
const CreateOrUpdateSliderForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const updatedStatus = data?.status ? String(data?.status) : "1";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    control,
  } = useForm<SliderFormData>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      title_color: "#1E3A8A",
      sub_title_color: "#2563EB",
      description_color: "#3B82F6",
      button_text_color: "#ffff",
      button_bg_color: "#1153eb",
      button_hover_color: "#2563EB",
      bg_color: "#E0F7FA",
      status: updatedStatus,
    },
  });
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");
  const [lastSelectedBG, setLastSelectedBG] = useState<any>(null);
  const [errorBGMessage, setBGErrorMessage] = useState<string>("");

  useEffect(() => {
    if (data) {
      setValue("title_df", data?.title ?? "");
      setValue("sub_title_df", data?.sub_title ?? "");
      setValue("button_text_df", data?.button_text ?? "");
      setValue("description_df", data?.description ?? "");
      setValue("order", String(data.order) ?? "");
      setValue("platform", String(data.platform) ?? "");
      setValue("status", String(data.status) ?? "");
      setValue("button_url", data.button_url ?? "");
      setValue("redirect_url", data.redirect_url ?? "");

      setValue("title_color", data?.title_color);
      setValue("sub_title_color", data?.sub_title_color);
      setValue("description_color", data?.description_color);
      setValue("button_text_color", data?.button_text_color);
      setValue("button_bg_color", data?.button_bg_color);
      setValue("button_hover_color", data?.button_hover_color);
      setValue("bg_color", data?.bg_color ? data?.bg_color : "#E0F7FA");

      Object.keys(data.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(
          `title_${language}` as keyof SliderFormData,
          translation?.title ?? ""
        );
        setValue(
          `sub_title_${language}` as keyof SliderFormData,
          translation?.sub_title ?? ""
        );
        setValue(
          `button_text_${language}` as keyof SliderFormData,
          translation?.button_text ?? ""
        );
        setValue(
          `description_${language}` as keyof SliderFormData,
          translation?.description ?? ""
        );
      });

      setLastSelectedLogo({
        image_id: data?.image ? data?.image : "",
        img_url: data?.image_url ? data?.image_url : "",
        name: "image ",
      });

      setLastSelectedBG({
        image_id: data?.bg_image ? data?.bg_image : "",
        img_url: data?.bg_image_url ? data?.bg_image_url : "",
        name: "bg_image ",
      });
    }
  }, [data, setValue, data?.translations]);

  const titleColor = watch("title_color");
  const subTitleColor = watch("sub_title_color");
  const descriptionColor = watch("description_color");
  const buttonTextColor = watch("button_text_color");
  const buttonColor = watch("button_bg_color");
  const buttonHoverColor = watch("button_hover_color");
  const backgroundColor = watch("bg_color");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--title-color", titleColor || "#000000");
      root.style.setProperty("--sub-title-color", subTitleColor || "#000000");
      root.style.setProperty(
        "--description-color",
        descriptionColor || "#000000"
      );
      root.style.setProperty(
        "--button-text-color",
        buttonTextColor || "#ffffff"
      );
      root.style.setProperty("--button-color", buttonColor || "#1153eb");
      root.style.setProperty(
        "--button-hover-color",
        buttonHoverColor || "#0d47a1"
      );
      root.style.setProperty(
        "--background-color",
        backgroundColor || "#0a3eb5"
      );
    }
  }, [
    titleColor,
    subTitleColor,
    descriptionColor,
    buttonTextColor,
    buttonColor,
    buttonHoverColor,
    backgroundColor,
  ]);

  const handleColorChange = (color: string, colorField: string) => {
    //@ts-ignore
    setValue(colorField, color, { shouldValidate: true });
  };

  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
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
  const handleSaveBG = (images: UploadedImage[]) => {
    setLastSelectedBG(images[0]);
    const dimensions = images[0].dimensions;
    //@ts-ignore
    const [width, height] = dimensions
      .split(" x ")
      .map((dim) => parseInt(dim.trim(), 10));
    const aspectRatio = width / height;

    if (Math.abs(aspectRatio - 4 / 1) < 0.01) {
      setBGErrorMessage("");
      return true;
    } else {
      setBGErrorMessage("Image must have a 4:1 aspect ratio.");
      return false;
    }
  };

  const removeBG = () => {
    setLastSelectedBG(null);
    setBGErrorMessage("");
  };

  const { mutate: SliderStore, isPending: isSliderPending } =
    useSliderStoreMutation();
  const { mutate: SliderUpdate, isPending: isSliderUpdating } =
    useSliderUpdateMutation();

  const onSubmit = async (values: SliderFormData) => {
    if (values.order == "") {
      return toast.error(t("toast.order_is_required"));
    }
    const defaultData = {
      title: values.title_df,
      button_text: values.button_text_df,
      sub_title: values.sub_title_df,
      description: values.description_df,
      button_url: values.button_url,
      redirect_url: values.redirect_url,
      platform: values.platform,
      order: Number(values.order),
      status: values.status,
      title_color: values.title_color,
      sub_title_color: values.sub_title_color,
      button_text_color: values.button_text_color,
      description_color: values.description_color,
      button_bg_color: values.button_bg_color,
      button_hover_color: values.button_hover_color,
      bg_color: values.bg_color,
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`title_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        title: (values as any)[`title_${lang.id}`],
        sub_title: (values as any)[`sub_title_${lang.id}`],
        button_text: (values as any)[`button_text_${lang.id}`],
        description: (values as any)[`description_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: !data ? 0 : data.id,
      image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      bg_image: lastSelectedBG ? lastSelectedBG?.image_id : "",
      translations: translations,
    };

    if (data) {
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
          <div className="py-2 absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FFFFFFE5] border-l border-r border-b w-full rounded-b opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center justify-center">
            <CloudIcon />
            <p className="text-sm font-bold text-red-500 p-1">
              {t("common.change_image")}
            </p>
          </div>
        </div>
      ) : (
        <div className=" w-32 h-32 border-2 border-dashed border-blue-500 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <CloudIcon />
            <p className="mt-2 text-blue-500 text-xs font-medium">
              {t("common.drag_and_drop")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
  const triggerBG = (
    <div className="hover:cursor-pointer">
      {lastSelectedBG?.img_url ? (
        <div className="relative w-48 h-32 group">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedBG?.img_url}
            alt={lastSelectedBG?.name as string}
            fill
            sizes="192px"
            className="w-full h-full border dark:border-gray-500 rounded"
          />
          <div className="py-2 absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FFFFFFE5] border-l border-r border-b w-full rounded-b opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center justify-center">
            <CloudIcon />
            <p className="text-sm font-bold text-red-500 p-1">
              {t("common.change_image")}
            </p>
          </div>
        </div>
      ) : (
        <div className=" w-48 h-32 border-2 border-dashed border-blue-500 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <CloudIcon />
            <p className="mt-2 text-blue-500 text-xs font-medium">
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
          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
              <h1 className="text-lg md:text-2xl font-medium mb-4">
                {t("common.basic_information")}
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
                          <div className="">
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="col-span-3">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span>{t("label.platform")}</span>
                                  </p>
                                  <Controller
                                    control={control}
                                    name="platform"
                                    defaultValue={data?.platform ?? ""}
                                    render={({ field }) => (
                                      <AppSelect
                                        value={field.value}
                                        onSelect={(value) => {
                                          field.onChange(value);
                                          handleSelectItem(value, "platform");
                                        }}
                                        groups={PlatformList}
                                        hideNone
                                      />
                                    )}
                                  />
                                  {errors[
                                    `platform` as keyof SliderFormData
                                  ] && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {
                                        //@ts-ignore
                                        errors[`platform`]?.message
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="col-span-3">
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
                                      `title_${lang.id}` as keyof SliderFormData
                                    )}
                                    className="app-input"
                                    placeholder={t("place_holder.enter_title")}
                                  />
                                  {errors[
                                    `title_${lang.id}` as keyof SliderFormData
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
                                  <p className="text-sm font-medium mb-1">
                                    Title Color
                                  </p>

                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button className="w-12 h-10 rounded-md border dynamic-title-color" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                                      <HexColorPicker
                                        color={watch("title_color")}
                                        onChange={(color) =>
                                          handleColorChange(
                                            color,
                                            "title_color"
                                          )
                                        }
                                      />
                                      <Input
                                        type="text"
                                        value={watch("title_color")}
                                        onChange={(e) =>
                                          handleColorChange(
                                            e.target.value,
                                            "title_color"
                                          )
                                        }
                                        className="app-input w-full"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="col-span-3">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span>
                                      {t("label.sub_title")} (
                                      {t(
                                        `lang.${lang.id}` as `lang.${LangKeys}`
                                      )}
                                      )
                                    </span>
                                  </p>
                                  <Input
                                    id={`sub_title_${lang.id}`}
                                    {...register(
                                      `sub_title_${lang.id}` as keyof SliderFormData
                                    )}
                                    className="app-input"
                                    placeholder={t(
                                      "place_holder.enter_sub_title"
                                    )}
                                  />
                                  {errors[
                                    `sub_title_${lang.id}` as keyof SliderFormData
                                  ] && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {
                                        //@ts-ignore
                                        errors[`sub_title_${lang.id}`]?.message
                                      }
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    Sub Title Color
                                  </p>

                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button className="w-12 h-10 rounded-md border dynamic-sub-title-color" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                                      <HexColorPicker
                                        color={watch("sub_title_color")}
                                        onChange={(color) =>
                                          handleColorChange(
                                            color,
                                            "sub_title_color"
                                          )
                                        }
                                      />
                                      <Input
                                        type="text"
                                        value={watch("sub_title_color")}
                                        onChange={(e) =>
                                          handleColorChange(
                                            e.target.value,
                                            "sub_title_color"
                                          )
                                        }
                                        className="app-input w-full"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="col-span-3">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
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
                                      `description_${lang.id}` as keyof SliderFormData
                                    )}
                                    className="app-input"
                                    placeholder={t(
                                      "place_holder.enter_description"
                                    )}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">
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
                                          handleColorChange(
                                            color,
                                            "description_color"
                                          )
                                        }
                                      />
                                      <Input
                                        type="text"
                                        value={watch("description_color")}
                                        onChange={(e) =>
                                          handleColorChange(
                                            e.target.value,
                                            "description_color"
                                          )
                                        }
                                        className="app-input w-full"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="col-span-3">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span>
                                      {t("label.button_text")} (
                                      {t(
                                        `lang.${lang.id}` as `lang.${LangKeys}`
                                      )}
                                      )
                                    </span>
                                  </p>
                                  <Input
                                    id={`button_text_${lang.id}`}
                                    {...register(
                                      `button_text_${lang.id}` as keyof SliderFormData
                                    )}
                                    className="app-input"
                                    placeholder={t(
                                      "place_holder.enter_button_text"
                                    )}
                                  />
                                  {errors[
                                    `button_text_${lang.id}` as keyof SliderFormData
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
                                <div className="col-span-2 flex items-center gap-4">
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      {t("label.text_color")}
                                    </p>

                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button className="w-12 h-10 rounded-md border dynamic-button-text-color" />
                                      </PopoverTrigger>
                                      <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                                        <HexColorPicker
                                          color={watch("button_text_color")}
                                          onChange={(color) =>
                                            handleColorChange(
                                              color,
                                              "button_text_color"
                                            )
                                          }
                                        />
                                        <Input
                                          type="text"
                                          value={watch("button_text_color")}
                                          onChange={(e) =>
                                            handleColorChange(
                                              e.target.value,
                                              "button_text_color"
                                            )
                                          }
                                          className="app-input w-full"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      {t("label.bg_color")}
                                    </p>

                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button className="w-12 h-10 rounded-md border dynamic-button-color" />
                                      </PopoverTrigger>
                                      <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                                        <HexColorPicker
                                          color={watch("button_bg_color")}
                                          onChange={(color) =>
                                            handleColorChange(
                                              color,
                                              "button_bg_color"
                                            )
                                          }
                                        />
                                        <Input
                                          type="text"
                                          value={watch("button_bg_color")}
                                          onChange={(e) =>
                                            handleColorChange(
                                              e.target.value,
                                              "button_bg_color"
                                            )
                                          }
                                          className="app-input w-full"
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      {t("label.hover_color")}
                                    </p>

                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button className="w-12 h-10 rounded-md border dynamic-button-hover-color" />
                                      </PopoverTrigger>
                                      <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                                        <HexColorPicker
                                          color={watch("button_hover_color")}
                                          onChange={(color) =>
                                            handleColorChange(
                                              color,
                                              "button_hover_color"
                                            )
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
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                              <div className="flex items-start gap-4 col-span-3">
                                <div>
                                  <p className="text-sm font-medium flex items-center gap-2 mb-1">
                                    <span>{t("label.slider_image")}</span>
                                  </p>
                                  <div className="flex align-start gap-4">
                                    <div className="w-32 relative">
                                      <PhotoUploadModal
                                        trigger={triggerLogo}
                                        isMultiple={false}
                                        onSave={handleSaveLogo}
                                        usageType="slider"
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
                                <div>
                                  <p className="text-sm font-medium flex items-center gap-2 mb-1">
                                    <span>{t("label.slider_bg_image")}</span>
                                  </p>
                                  <div className="flex align-start gap-4">
                                    <div className="w-48 relative">
                                      <PhotoUploadModal
                                        trigger={triggerBG}
                                        isMultiple={false}
                                        onSave={handleSaveBG}
                                        usageType="slider"
                                        selectedImage={lastSelectedBG}
                                      />
                                      {lastSelectedBG?.image_id && (
                                        <Cancel
                                          customClass="absolute top-0 right-0 m-1"
                                          onClick={(event: {
                                            stopPropagation: () => void;
                                          }) => {
                                            event.stopPropagation();
                                            removeBG();
                                          }}
                                        />
                                      )}
                                      {errorBGMessage && (
                                        <p className="text-red-500 text-sm mt-1">
                                          {errorBGMessage}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">
                                  {t("label.bg_color")}
                                </p>

                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button className="w-12 h-10 rounded-md border dynamic-background-color" />
                                  </PopoverTrigger>
                                  <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                                    <HexColorPicker
                                      color={watch("bg_color")}
                                      onChange={(color) =>
                                        handleColorChange(color, "bg_color")
                                      }
                                    />
                                    <Input
                                      type="text"
                                      value={watch("bg_color")}
                                      onChange={(e) =>
                                        handleColorChange(
                                          e.target.value,
                                          "bg_color"
                                        )
                                      }
                                      className="app-input w-full"
                                    />
                                  </PopoverContent>
                                </Popover>
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

          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
              <div dir={dir}>
                <h1 className="text-lg md:text-2xl font-medium mb-4">
                  {t("common.order_url")}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                      <span>{t("label.button_url")}</span>
                    </p>
                    <Input
                      id={`button_url`}
                      {...register(`button_url` as keyof SliderFormData)}
                      className="app-input"
                      placeholder={t("place_holder.enter_button_url")}
                    />
                    {errors[`button_url` as keyof SliderFormData] && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          //@ts-ignore
                          errors[`button_url`]?.message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                      <span>{t("label.redirect_url")}</span>
                    </p>
                    <Input
                      id={`redirect_url`}
                      {...register(`redirect_url` as keyof SliderFormData)}
                      className="app-input"
                      placeholder={t("place_holder.enter_redirect_url")}
                    />
                    {errors[`redirect_url` as keyof SliderFormData] && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          //@ts-ignore
                          errors[`redirect_url`]?.message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                      <span>{t("label.order")}</span>
                    </p>
                    <Input
                      id={`order`}
                      type="number"
                      min={0}
                      {...register(`order` as keyof SliderFormData)}
                      className="app-input"
                      placeholder={t("place_holder.enter_display_order")}
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
                          value={field.value}
                          onSelect={(value) => {
                            field.onChange(value);
                            handleSelectItem(value, "status");
                          }}
                          groups={StatusList}
                          hideNone
                        />
                      )}
                    />
                    {errors["status" as keyof SliderFormData] && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          //@ts-ignore
                          errors["status"]?.message
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton
              UpdateData={data}
              IsLoading={data ? isSliderUpdating : isSliderPending}
              AddLabel={t("button.add_slider")}
              UpdateLabel={t("button.update_slider")}
            />
          </Card>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateSliderForm;
