"use client";
import CloudIcon from "@/assets/icons/CloudIcon";
import { AppSelect } from "@/components/blocks/common";
import CustomSingleDatePicker from "@/components/blocks/common/CustomSingleDatePicker";
import TiptapEditor from "@/components/blocks/common/TiptapField";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import { SubmitButton } from "@/components/blocks/shared";
import PhotoUploadModal from "@/components/blocks/shared/PhotoUploadModal";
import multiLang from "@/components/molecules/multiLang.json";
import {
  Card,
  CardContent,
  Input,
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
import { TagsInput } from "@/components/ui/tags-input";
import GlobalImageLoader from "@/lib/imageLoader";
import { useBlogCategoriesFetchQuery } from "@/modules/admin-section/blog/blog-category/blog-category.action";
import {
  useBlogPostStoreMutation,
  useBlogPostUpdateMutation,
} from "@/modules/admin-section/blog/post/blog-post.action";
import {
  BlogPostFormData,
  blogPostSchema,
} from "@/modules/admin-section/blog/post/blog-post.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Info } from "lucide-react";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
const BlogPostForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const StatusList = [
    { label: t("label.draft"), value: 0 },
    { label: t("label.publish"), value: 1 },
  ];
  const VisibilityList = [
    { label: t("label.private"), value: "private" },
    { label: t("label.public"), value: "public" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      status: String(data?.status) ?? "",
      category_id: String(data?.category_id) ?? "",
      visibility: String(data?.visibility) ?? "",
    },
  });

  const { blogcategories } = useBlogCategoriesFetchQuery({
    pagination: false,
    status: 1,
  });
  const originalData = useMemo(() => {
    const data = (blogcategories as any) || [];
    return data;
  }, [blogcategories]);

  useEffect(() => {
    if (data) {
      const tagsArray = data?.tag_name
        ?.split(",")
        .map((tag: string) => tag.trim());
      setValue("tag_name", tagsArray);
      const metaTagsArray = data?.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim());
      setValue("meta_keywords_df", metaTagsArray);
      setValue("title_df", data?.title ?? "");
      setValue("description_df", data?.description ?? "");
      setValue("meta_title_df", data?.meta_title ?? "");
      setValue("meta_description_df", data?.meta_description ?? "");
      setValue("category_id", String(data?.category_id) ?? "");
      setValue("visibility", String(data?.visibility) ?? "");
      setValue("status", String(data?.status) ?? "");
      setValue("start_date", data?.start_date ?? "");

      Object?.keys(data?.translations).forEach((language) => {
        const translation = data.translations[language];

        const tagsArray = translation?.meta_keywords
          ? translation.meta_keywords
              .split(",")
              .map((tag: string) => tag.trim())
          : [];

        setValue(
          `meta_keywords_${translation.language}` as keyof BlogPostFormData,
          tagsArray
        );

        setValue(
          `meta_title_${language}` as keyof BlogPostFormData,
          translation?.meta_title ?? ""
        );

        setValue(
          `meta_description_${language}` as keyof BlogPostFormData,
          translation?.meta_description ?? ""
        );

        setValue(
          `title_${language}` as keyof BlogPostFormData,
          translation?.title ?? ""
        );

        setValue(
          `description_${language}` as keyof BlogPostFormData,
          translation?.description ?? ""
        );
      });

      if (data?.schedule_date) {
        const formattedDate = data.schedule_date.split("T")[0];
        setValue("start_date", formattedDate);
      }
      if (data?.meta_image) {
        setLastSelectedImages({
          image_id: data?.meta_image ? data?.meta_image : "",
          img_url: data?.meta_image_url
            ? data?.meta_image_url
            : "/images/no-image.png",
          name: "cover image",
        });
      }
      if (data?.image) {
        setLastSelectedLogo({
          image_id: data?.image ? data?.image : "",
          img_url: data?.image_url ? data?.image_url : "/images/no-image.png",
          name: "thumbnail image",
        });
      }
    }
  }, [data, setValue, data?.schedule_date, data?.translations]);

  const handleSelectItem = (value: any, inputType: string) => {
    setValue(inputType as any, value);
  };

  const [lastSelectedImages, setLastSelectedImages] = useState<any>(null);
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");
  const [errorImagesMessage, setImagesErrorMessage] = useState<string>("");
  const handleSaveImages = (images: UploadedImage[]) => {
    setLastSelectedImages(images[0]);
    const dimensions = images[0].dimensions ?? "";
    const [width, height] = dimensions
      .split(" x ")
      .map((dim) => parseInt(dim.trim(), 10));
    const aspectRatio = width / height;

    if (Math.abs(aspectRatio - 1 / 1) < 0.01) {
      setImagesErrorMessage("");
      return true;
    } else {
      setImagesErrorMessage("Image must have a 1:1 aspect ratio.");
      return false;
    }
  };

  const removePreview = () => {
    setLastSelectedImages(null);
    setImagesErrorMessage("");
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

  const { mutate: blogStore, isPending } = useBlogPostStoreMutation();
  const { mutate: blogUpdate, isPending: isUpdating } =
    useBlogPostUpdateMutation();
  const onSubmit = async (values: BlogPostFormData) => {
    if (values?.status === "none" || values?.status === "undefined") {
      return toast.error("Please Select Status !");
    }
    if (
      values?.category_id === "none" ||
      values?.category_id === "" ||
      values?.category_id === "null"
    ) {
      return toast.error(t("toast.select_item", { type: "a category" }));
    }
    if (values?.visibility === "none" || values?.visibility === "") {
      return toast.error(t("toast.select_item", { type: "visibility" }));
    }
    const defaultData = {
      tag_name: (values.tag_name || []).join(", "),
      meta_keywords: (values.meta_keywords_df || []).join(", "),
      meta_title: values.meta_title_df,
      meta_description: values.meta_description_df,
      title: values.title_df,
      description: values.description_df,
      category_id: values.category_id,
      author: values.author,
      visibility: values.visibility,
      status: values.status,
      schedule_date: values.start_date
        ? moment(values.start_date).format("YYYY-MM-DD")
        : "",
    };
    const translations = multiLangData.slice(1).map((lang) => ({
      language_code: lang.id,
      title: (values as any)[`title_${lang.id}`],
      description: (values as any)[`description_${lang.id}`],
      meta_title: (values as any)[`meta_title_${lang.id}`],
      meta_keywords: ((values as any)[`meta_keywords_${lang.id}`] || []).join(
        ", "
      ),
      meta_description: (values as any)[`meta_description_${lang.id}`],
    }));
    const submissionData = {
      ...defaultData,
      id: data?.id,
      meta_image: lastSelectedImages ? lastSelectedImages?.image_id : "",
      image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations: translations,
    };
    if (data) {
      return blogUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            dispatch(setRefetch(true));
            reset();
          },
        }
      );
    } else {
      return blogStore(
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
        <div className="border-2 w-32 h-32 border-dashed border-blue-500 text-center rounded-lg cursor-pointer hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <Card className="2xl:col-span-8 xl:col-span-6 lg:col-span-6 md:col-span-12 col-span-12">
            <CardContent className="p-2 md:p-6">
              <h1 className="text-lg md:text-2xl font-medium mb-4">
                {t("common.basic_information")}
              </h1>
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
                      <TabsContent
                        key={lang.id}
                        value={lang.id}
                        className="space-y-2"
                      >
                        <div className="">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span>
                                  {t("label.title")} (
                                  {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                                </span>
                              </p>
                              <Input
                                id={`title_${lang.id}`}
                                {...register(
                                  `title_${lang.id}` as keyof BlogPostFormData
                                )}
                                className="app-input"
                                placeholder={t("place_holder.enter_title")}
                              />
                              {errors[
                                `title_${lang.id}` as keyof BlogPostFormData
                              ] && (
                                <p className="text-red-500 text-sm mt-1">
                                  {(errors as any)[`title_${lang.id}`]?.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">
                                {t("label.description")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </p>

                              <Controller
                                control={control}
                                name={
                                  `description_${lang.id}` as keyof BlogPostFormData
                                }
                                render={({ field }) => (
                                  <TiptapEditor
                                    value={
                                      typeof field.value === "string"
                                        ? field.value
                                        : ""
                                    }
                                    onChange={field.onChange}
                                  />
                                )}
                              />
                              {errors[
                                `description_${lang.id}` as keyof BlogPostFormData
                              ] && (
                                <p className="text-red-500 text-sm mt-1">
                                  {
                                    (errors as any)[`description_${lang.id}`]
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">
                                {t("label.meta_title")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </p>
                              <Input
                                id={`meta_title_${lang.id}`}
                                {...register(
                                  `meta_title_${lang.id}` as keyof BlogPostFormData
                                )}
                                className="app-input"
                                placeholder={t("place_holder.enter_meta_title")}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1">
                                {t("label.meta_description")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </p>
                              <Textarea
                                id={`meta_description_${lang.id}`}
                                {...register(
                                  `meta_description_${lang.id}` as keyof BlogPostFormData
                                )}
                                className="app-input"
                                placeholder={t(
                                  "place_holder.enter_meta_description"
                                )}
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium flex items-center gap-2">
                                <span>
                                  {t("label.meta_keywords")} (
                                  {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
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
                                        sideOffset={4}
                                        avoidCollisions={false}
                                        className="bg-custom-dark-blue w-68"
                                      >
                                        <p className="p-1 text-sm font-medium">
                                          {t("place_holder.enter_meta_key")}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                              <Controller
                                name={
                                  `meta_keywords_${lang.id}` as keyof BlogPostFormData
                                }
                                control={control}
                                render={({ field }) => (
                                  <TagsInput
                                    {...field}
                                    value={
                                      Array.isArray(field.value)
                                        ? field.value
                                        : []
                                    }
                                    onChange={(newValue: string[]) =>
                                      field.onChange(newValue)
                                    }
                                    placeholder={`${t(
                                      "place_holder.enter_meta_key"
                                    )} ${t(
                                      `lang.${lang.id}` as `lang.${LangKeys}`
                                    )}`}
                                    className="app-input"
                                  />
                                )}
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium flex items-center gap-2">
                                <span>{t("label.tag_name")}</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent
                                        side="right"
                                        align="center"
                                        sideOffset={4}
                                        avoidCollisions={false}
                                        className="bg-custom-dark-blue w-68"
                                      >
                                        <p className="p-1 text-sm font-medium">
                                          {t("place_holder.enter_tag_name")}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                              <Controller
                                name={`tag_name` as keyof BlogPostFormData}
                                control={control}
                                render={({ field }) => (
                                  <TagsInput
                                    {...field}
                                    value={
                                      Array.isArray(field.value)
                                        ? field.value
                                        : []
                                    }
                                    onChange={(newValue: string[]) =>
                                      field.onChange(newValue)
                                    }
                                    placeholder={t(
                                      "place_holder.enter_tag_name"
                                    )}
                                    className="app-input"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    );
                  })}
                </div>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="2xl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-12 col-span-12">
            <CardContent className="p-2 md:p-6">
              <h1 className="text-lg md:text-2xl font-medium mb-4">
                {t("common.category_visibility")}
              </h1>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                    <span>{t("label.category")}</span>
                  </p>
                  <Controller
                    control={control}
                    name="category_id"
                    render={({ field }) => (
                      <>
                        <AppSelect
                          key={field.value}
                          value={field.value}
                          onSelect={(value) => {
                            field.onChange(value);
                            handleSelectItem(value, "category_id");
                          }}
                          groups={originalData}
                          hideNone
                        />
                      </>
                    )}
                  />
                  {errors.category_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category_id.message}
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
                    render={({ field }) => (
                      <>
                        <AppSelect
                          value={field.value}
                          onSelect={(value) => {
                            field.onChange(value);
                            handleSelectItem(value, "status");
                          }}
                          groups={StatusList}
                          hideNone
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
                <div>
                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                    <span>{t("label.visibility")}</span>
                  </p>
                  <Controller
                    control={control}
                    name="visibility"
                    render={({ field }) => (
                      <>
                        <AppSelect
                          value={field.value}
                          onSelect={(value) => {
                            field.onChange(value);
                            handleSelectItem(value, "visibility");
                          }}
                          groups={VisibilityList}
                          hideNone
                        />
                      </>
                    )}
                  />
                </div>

                <div className="">
                  <p className="text-sm font-medium mb-1">
                    {t("label.schedule_date")}
                  </p>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <CustomSingleDatePicker
                        label=""
                        selectedDate={
                          field.value
                            ? parse(field.value, "yyyy-MM-dd", new Date())
                            : null
                        }
                        onChange={(date) => {
                          if (date) {
                            field.onChange(format(date, "yyyy-MM-dd"));
                          } else {
                            field.onChange("");
                          }
                        }}
                      />
                    )}
                  />
                  {errors.start_date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.start_date.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-start gap-4">
                <div className="">
                  <p className="text-sm font-medium mb-1">
                    <span>{t("label.thumbnail")}</span>
                  </p>
                  <div className="relative flex align-start gap-4">
                    <div className="relative w-32">
                      <PhotoUploadModal
                        trigger={triggerLogo}
                        isMultiple={false}
                        onSave={handleSaveLogo}
                        usageType="blog"
                        selectedImage={lastSelectedLogo}
                      />
                      {lastSelectedLogo?.image_id && (
                        <Cancel
                          customClass="absolute top-0 right-0 m-1"
                          onClick={(event: { stopPropagation: () => void }) => {
                            event.stopPropagation();
                            removeLogo();
                          }}
                        />
                      )}
                      {errorLogoMessage && (
                        <p className="absolute text-red-500 text-sm mt-1">
                          {errorLogoMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="">
                  <p className="text-sm font-medium mb-1">
                    <span>{t("label.meta_image")}</span>
                  </p>
                  <div className="relative flex align-start gap-4">
                    <div className="relative w-32">
                      <PhotoUploadModal
                        trigger={trigger}
                        isMultiple={false}
                        onSave={handleSaveImages}
                        usageType="blog"
                        selectedImage={lastSelectedImages}
                      />
                      {lastSelectedImages?.image_id && (
                        <Cancel
                          customClass="absolute top-0 right-0 m-1"
                          onClick={(event: { stopPropagation: () => void }) => {
                            event.stopPropagation();
                            removePreview();
                          }}
                        />
                      )}
                      {errorImagesMessage && (
                        <p className="absolute text-red-500 text-sm mt-1">
                          {errorImagesMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4 sticky bottom-0 w-full p-4">
          <SubmitButton
            UpdateData={data}
            IsLoading={isPending || isUpdating}
            AddLabel={t("button.add_blog")}
            UpdateLabel={t("button.update_blog")}
          />
        </Card>
      </form>
    </div>
  );
};
export default BlogPostForm;
