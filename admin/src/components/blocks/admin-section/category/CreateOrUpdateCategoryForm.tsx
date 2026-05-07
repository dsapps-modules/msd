"use client";
import multiLang from "@/components/molecules/multiLang.json";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import PhotoUploadModal from "@/components/blocks/shared/PhotoUploadModal";
import {
  Card,
  CardContent,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import CloudIcon from "@/assets/icons/CloudIcon";
import {
  AppNestedDropdown,
  AppSelect,
} from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
import {
  useCategoriesQuery,
  useCategoryStoreMutation,
  useCategoryUpdateMutation,
} from "@/modules/admin-section/category/category.action";
import {
  CategoryFormData,
  categorySchema,
} from "@/modules/admin-section/category/category.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useStoreTypeQuery } from "@/modules/common/store-type/store-type.action";
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

type LangKeys = keyof IntlMessages["lang"];
export default function CreateOrUpdateCategoryForm({ data }: any) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
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
    setError,
    reset,
    control,
    watch,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_banner: "#fff",
      type: data?.type ?? "",
    },
  });
  const checkedValue = watch();
  const [isFeature, setIsFeature] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
  const [finalSelectedID, setfinalSelectedID] = useState<any[] | "">("");
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");
  const { storeType } = useStoreTypeQuery({});
  const { categories, refetch } = useCategoriesQuery({
    pagination: false,
    type: checkedValue?.type,
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  let optionsData = (categories as any)?.data || [];
  let typeData = (storeType as any) || [];
  useEffect(() => {
    if (editData) {
      setValue("category_name_df", editData.category_name ?? "");
      setValue("meta_title_df", editData?.meta_title ?? "");
      setValue("meta_description_df", editData?.meta_description ?? "");
      setValue("display_order", String(editData?.display_order) ?? "");
      setfinalSelectedID(editData?.parent_id);
      setIsFeature(editData?.is_featured);
      const pathName = editData.category_name_paths;
      const pathNameArray = pathName === null ? [] : pathName?.split("/");
      setSelectedItems(pathNameArray);
      const pathIds = editData?.parent_path;
      const pathIDsArray = pathIds === null ? [] : pathIds?.split("/");
      setSelectedIDs(pathIDsArray);
      setValue(
        "category_banner",
        editData?.category_banner ? editData?.category_banner : "#fff"
      );

      Object.keys(editData.translations).forEach((language) => {
        const translation = editData.translations[language];
        setValue(
          `category_name_${language}` as keyof CategoryFormData,
          translation?.category_name ?? ""
        );
        setValue(
          `meta_title_${language}` as keyof CategoryFormData,
          translation?.meta_title ?? ""
        );
        setValue(
          `meta_description_${language}` as keyof CategoryFormData,
          translation?.meta_description ?? ""
        );
      });
      if (editData.category_thumb) {
        setLastSelectedLogo({
          image_id: editData.category_thumb ? editData.category_thumb : "",
          img_url: editData.category_thumb_url
            ? editData.category_thumb_url
            : {},
          name: "thumbnail image",
        });
      }
    }
  }, [editData, setValue, editData?.translations]);

  const categoryColor = watch("category_banner");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty(
        "--category-banner-color",
        categoryColor || "#000000"
      );
    }
  }, [categoryColor]);

  type ColorField = "category_banner";
  const handleColorChange = (color: string, colorField: ColorField) => {
    setValue(colorField, color, { shouldValidate: true });
  };

  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
    setSelectedItems([]);
    refetch();
  };

  const handleSaveLogo = (images: UploadedImage[]) => {
    setLastSelectedLogo(images[0]);
    const dimensions = images[0].dimensions ?? "";
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

  const handleToggleStatus = () => {
    setIsFeature(!isFeature);
  };

  const { mutate: categoryStore, isPending } = useCategoryStoreMutation();
  const { mutate: categoryUpdate, isPending: isUpdating } =
    useCategoryUpdateMutation();
  const onSubmit = async (values: CategoryFormData) => {
    const pathName = selectedItems.join("/");
    const pathIds = selectedIDs.join("/");
    if (values?.type === "") {
      return toast.error("The type field is required.");
    }
    const defaultData = {
      category_name: values.category_name_df,
      type: values.type,
      meta_title: values.meta_title_df,
      meta_description: values.meta_description_df,
      display_order: values.display_order,
      is_featured: isFeature,
      category_name_paths: pathName,
      parent_path: pathIds,
      parent_id: finalSelectedID ? finalSelectedID : "",
      category_banner: values.category_banner,
    };
    const translations = multiLangData
      ?.filter((lang) => (values as any)[`category_name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        category_name: (values as any)[`category_name_${lang.id}`],
        meta_title: (values as any)[`meta_title_${lang.id}`],
        meta_description: (values as any)[`meta_description_${lang.id}`],
      }));

    if (selectedItems.includes(values.category_name_df)) {
      setError("category_name_df", {
        type: "manual",
        message: "Category name cannot be part of the selected path.",
      });
      return toast.error("Category name cannot be part of the selected path!");
    }

    for (const translation of translations) {
      if (selectedItems.includes(translation.category_name)) {
        setError(
          `category_name_${translation.language_code}` as keyof CategoryFormData,
          {
            type: "manual",
            message: `Category name in ${translation.language_code} cannot be part of the selected path.`,
          }
        );
        return toast.error(
          `Category name in ${translation.language_code} cannot be part of the selected path!`
        );
      }
    }

    const submissionData = {
      ...defaultData,
      id: !editData ? 0 : editData?.id,
      category_thumb: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations: translations,
    };

    if (data) {
      return categoryUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
            dispatch(setRefetch(true));
          },
        }
      );
    } else {
      return categoryStore(
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
            <p className="text-sm font-semibold text-red-500">
              {t("common.change_image")}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-2 w-32 h-32 border-2 border-dashed border-blue-500 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full flex items-center justify-center mt-4">
          <CardContent className="p-2 md:p-6 w-full">
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
              <div dir={dir} className="grid 2xl:grid-cols-2 gap-4 lg:gap-8">
                <div className="mt-2">
                  <div className="mb-2">
                    <p className="text-sm font-medium mb-1">
                      {t("label.type")}{" "}
                      <span className="text-red-500 mx-0.5">*</span>
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
                          groups={typeData}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1 flex items-center gap-2">
                      <span>{t("label.parent_category")}</span>
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild className="relative">
                              <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-custom-dark-blue w-96 -top-20 -left-36 absolute">
                              <p className="p-1 text-sm font-medium">
                                {t("tooltip.select_parent_category")}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <AppNestedDropdown
                      selectedItems={selectedItems}
                      selectedIDs={selectedIDs}
                      finalSelectedID={finalSelectedID}
                      setfinalSelectedID={setfinalSelectedID}
                      setSelectedItems={setSelectedItems}
                      setSelectedIDs={setSelectedIDs}
                      groups={optionsData}
                    />
                  </div>

                  {multiLangData.map((lang) => {
                    return (
                      <TabsContent key={lang.id} value={lang.id}>
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-1 flex items-center gap-2">
                            <span>
                              {t("label.category_name")} (
                              {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              <span className="text-red-500 mx-0.5">*</span>
                            </span>
                            <div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="right"
                                    align="center"
                                    sideOffset={8}
                                    avoidCollisions={false}
                                    className="bg-custom-dark-blue w-96"
                                  >
                                    <p className="p-1 text-sm font-medium">
                                      {t("tooltip.select_category_name")}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <Input
                            id={`category_name_${lang.id}`}
                            {...register(
                              `category_name_${lang.id}` as keyof CategoryFormData
                            )}
                            className="app-input"
                            placeholder={t("place_holder.enter_name")}
                          />
                          {errors[
                            `category_name_${lang.id}` as keyof CategoryFormData
                          ] && (
                            <p className="text-red-500 text-sm mt-1">
                              {
                                (errors as any)[`category_name_${lang.id}`]
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">
                            {t("label.meta_title")} (
                            {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                          </p>
                          <Input
                            id={`meta_title_${lang.id}`}
                            {...register(
                              `meta_title_${lang.id}` as keyof CategoryFormData
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
                              `meta_description_${lang.id}` as keyof CategoryFormData
                            )}
                            className="app-input"
                            placeholder={t(
                              "place_holder.enter_meta_description"
                            )}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">
                            {t("label.display_order")}
                          </p>
                          <Input
                            type="number"
                            id="display_order"
                            {...register(
                              "display_order" as keyof CategoryFormData
                            )}
                            className="app-input"
                            placeholder={t("place_holder.enter_value")}
                          />
                        </div>
                        <div className="my-4 grid grid-cols-4 md:grid-cols-8 items-center">
                          <p className="col-span-3 text-sm font-medium mb-1">
                            {t("label.is_featured")}
                          </p>
                          <Switch
                            dir="ltr"
                            checked={isFeature}
                            onCheckedChange={() => handleToggleStatus()}
                          />
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-8 items-center">
                          <p className="col-span-3 text-sm font-medium mb-1">
                            {t("label.category_bg_color")}
                          </p>

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button className="w-12 h-10 rounded-md border dynamic-category-banner-color" />
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-4 flex flex-col items-center gap-2">
                              <HexColorPicker
                                color={watch("category_banner")}
                                onChange={(color) =>
                                  handleColorChange(color, "category_banner")
                                }
                              />
                              <Input
                                type="text"
                                value={watch("category_banner")}
                                onChange={(e) =>
                                  handleColorChange(
                                    e.target.value,
                                    "category_banner"
                                  )
                                }
                                className="app-input w-full"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TabsContent>
                    );
                  })}
                </div>

                <div className="flex flex-col md:flex-row items-start gap-4 mt-2 mb-4 lg:mb-0">
                  <div className="">
                    <div className="text-sm font-medium flex items-center gap-2">
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
                          usageType="category"
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
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-4 sticky bottom-0 w-full p-4">
          <SubmitButton
            UpdateData={data}
            IsLoading={isPending || isUpdating}
            AddLabel={t("button.add_category")}
            UpdateLabel={t("button.update_category")}
          />
        </Card>
      </form>
    </div>
  );
}
