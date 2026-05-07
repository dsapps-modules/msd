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

import CloudIcon from "@/assets/icons/CloudIcon";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import {
  useBannerStoreMutation,
  useBannerUpdateMutation,
} from "@/modules/admin-section/promotional/banner/banner.action";

import GlobalImageLoader from "@/lib/imageLoader";
import {
  BannerFormData,
  bannerSchema,
} from "@/modules/admin-section/promotional/banner/banner.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
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

const DiscountTypeList = [
  { label: "Banner Section One", value: "banner_one" },
  { label: "Banner Section Two", value: "banner_two" },
  { label: "Banner Section Three", value: "banner_three" },
];

type LangKeys = keyof IntlMessages["lang"];
const CreateOrUpdateBannerForm = ({ data }: any) => {
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
  } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title_color: "#ff6133",
      sub_title_color: "#ffe933",
      description_color: "#1beb11",
      button_text_color: "#ffff",
      button_color: "#1153eb",
      button_hover_color: "#0a3eb5",
      background_color: "#0a3eb5",
      theme_name: data?.theme_name ?? "",
    },
  });

  const Themelist = [
    { label: "Default", value: "default" },
    { label: "Theme One", value: "theme_one" },
    { label: "Theme Two", value: "theme_two" },
  ];
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");

  useEffect(() => {
    if (data) {
      setValue("title_df", data?.title ?? "");
      setValue("sub_title_df", data?.sub_title ?? "");
      setValue("button_text_df", data?.button_text ?? "");
      setValue("description_df", data?.description ?? "");
      setValue("redirect_url", data?.redirect_url ?? "");
      setValue("type", data?.type ?? "");

      const titleColor = data?.title_color || "#000000";
      const subTitleColor = data?.sub_title_color || "#000000";
      const descriptionColor = data?.description_color || "#000000";
      const buttonTextColor = data?.button_text_color || "#ffffff";
      const buttonColor = data?.button_color || "#1153eb";
      const buttonHoverColor = data?.button_hover_color || "#0d47a1";
      const backgroundColor = data?.background_color || "#0a3eb5";

      setValue("title_color", titleColor);
      setValue("sub_title_color", subTitleColor);
      setValue("description_color", descriptionColor);
      setValue("button_text_color", buttonTextColor);
      setValue("button_color", buttonColor);
      setValue("button_hover_color", buttonHoverColor);
      setValue("background_color", backgroundColor);
      Object.keys(data.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(
          `title_${language}` as keyof BannerFormData,
          translation?.title ?? ""
        );
        setValue(
          `sub_title_${language}` as keyof BannerFormData,
          translation?.sub_title ?? ""
        );
        setValue(
          `button_text_${language}` as keyof BannerFormData,
          translation?.button_text ?? ""
        );
        setValue(
          `description_${language}` as keyof BannerFormData,
          translation?.description ?? ""
        );
      });
      if (data?.thumbnail_image) {
        setLastSelectedLogo({
          image_id: data?.thumbnail_image ? data?.thumbnail_image : "",
          img_url: data?.thumbnail_image_url
            ? data?.thumbnail_image_url
            : "/images/no-image.png",
          name: "thumbnail_image ",
        });
      }
    }
  }, [data, setValue, data?.translations]);

  const titleColor = watch("title_color");
  const subTitleColor = watch("sub_title_color");
  const descriptionColor = watch("description_color");
  const buttonTextColor = watch("button_text_color");
  const buttonColor = watch("button_color");
  const buttonHoverColor = watch("button_hover_color");
  const backgroundColor = watch("background_color");

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

  const { mutate: SliderStore, isPending: isSliderPending } =
    useBannerStoreMutation();
  const { mutate: SliderUpdate, isPending: isSliderUpdating } =
    useBannerUpdateMutation();

  const onSubmit = async (values: BannerFormData) => {
    const defaultData = {
      title: values.title_df,
      button_text: values.button_text_df,
      description: values.description_df,
      redirect_url: values.redirect_url,
      type: values.type,
      title_color: values.title_color,
      sub_title_color: values.sub_title_color,
      button_text_color: values.button_text_color,
      description_color: values.description_color,
      button_color: values.button_color,
      button_hover_color: values.button_hover_color,
      background_color: values.background_color,
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
      theme_name: values.theme_name,
      thumbnail_image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations: translations,
    };

    if (data) {
      return SliderUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4 mt-1">
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
                              <div>
                                <p className="text-sm font-medium mb-1">
                                  {t("label.type")}
                                </p>
                                <Controller
                                  control={control}
                                  name="type"
                                  defaultValue={String(data?.type) ?? ""}
                                  render={({ field }) => (
                                    <AppSelect
                                      value={field.value}
                                      onSelect={(value) => {
                                        field.onChange(value);
                                        handleSelectItem(value, "type");
                                      }}
                                      groups={DiscountTypeList}
                                    />
                                  )}
                                />
                              </div>

                              <div className="">
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>
                                    {t("label.title")} (
                                    {t(`lang.${lang.id}` as `lang.${LangKeys}`)}
                                    )
                                  </span>
                                </p>
                                <Input
                                  id={`title_${lang.id}`}
                                  {...register(
                                    `title_${lang.id}` as keyof BannerFormData
                                  )}
                                  className="app-input"
                                  placeholder={t("place_holder.enter_title")}
                                />
                                {errors[
                                  `title_${lang.id}` as keyof BannerFormData
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
                                  <span>
                                    {t("label.description")} (
                                    {t(`lang.${lang.id}` as `lang.${LangKeys}`)}
                                    ){" "}
                                  </span>
                                </p>
                                <Textarea
                                  id={`description_${lang.id}`}
                                  {...register(
                                    `description_${lang.id}` as keyof BannerFormData
                                  )}
                                  className="app-input"
                                  placeholder={t(
                                    "place_holder.enter_description"
                                  )}
                                />
                              </div>

                              <div className="">
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>
                                    {t("label.button_text")} (
                                    {t(`lang.${lang.id}` as `lang.${LangKeys}`)}
                                    )
                                  </span>
                                </p>
                                <Input
                                  id={`button_text_${lang.id}`}
                                  {...register(
                                    `button_text_${lang.id}` as keyof BannerFormData
                                  )}
                                  className="app-input"
                                  placeholder={t(
                                    "place_holder.enter_button_text"
                                  )}
                                />
                                {errors[
                                  `button_text_${lang.id}` as keyof BannerFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      //@ts-ignore
                                      errors[`button_text_${lang.id}`]?.message
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
                                  {...register(
                                    `redirect_url` as keyof BannerFormData
                                  )}
                                  className="app-input"
                                  placeholder={t(
                                    "place_holder.enter_redirect_url"
                                  )}
                                />
                                {errors[
                                  `redirect_url` as keyof BannerFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      //@ts-ignore
                                      errors[`redirect_url`]?.message
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="">
                              <div className="flex flex-col md:flex-row items-start gap-4">
                                <div className="">
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
                                        usageType="banner"
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
              <h1 className="text-lg md:text-2xl font-medium mb-4">
                {t("label.banner_color")}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid grid-cols-4 md:grid-cols-8 items-center">
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

                <div className="grid grid-cols-4 md:grid-cols-8 items-center">
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

                <div className="grid grid-cols-4 md:grid-cols-8 items-center">
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
                <div className="grid grid-cols-4 md:grid-cols-8 items-center">
                  <p className="col-span-3 text-sm font-medium mb-1">
                    {t("label.button_color")}
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="w-12 h-10 rounded-md border dynamic-button-color" />
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                      <HexColorPicker
                        color={watch("button_color")}
                        onChange={(color) =>
                          handleColorChange(color, "button_color")
                        }
                      />
                      <Input
                        type="text"
                        value={watch("button_color")}
                        onChange={(e) =>
                          handleColorChange(e.target.value, "button_color")
                        }
                        className="app-input w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-8 items-center">
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
                <div className="grid grid-cols-4 md:grid-cols-8 items-center">
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
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton
              UpdateData={data}
              IsLoading={data ? isSliderUpdating : isSliderPending}
              AddLabel={t("button.add_banner")}
              UpdateLabel={t("button.update_banner")}
            />
          </Card>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateBannerForm;
