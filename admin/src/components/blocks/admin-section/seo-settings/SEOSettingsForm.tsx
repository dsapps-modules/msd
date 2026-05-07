"use client";
import { SubmitButton } from "@/components/blocks/shared";
import Loader from "@/components/molecules/Loader";
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

import CloudIcon from "@/assets/icons/CloudIcon";
import { TagsInput } from "@/components/ui/tags-input";
import GlobalImageLoader from "@/lib/imageLoader";
import {
  useSEOSettingsQuery,
  useSEOSettingsStoreMutation,
} from "@/modules/admin-section/seo-settings/seo-settings.action";
import {
  SEOSettingsFormData,
  seoSettingsSchema,
} from "@/modules/admin-section/seo-settings/seo-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Cancel from "../../custom-icons/Cancel";
import PhotoUploadModal from "../../shared/PhotoUploadModal";
import CardSkletonLoader from "@/components/molecules/CardSkletonLoader";
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

const fileTypes = ["JPG", "PNG", "GIF"] as const;
const SEOSettingsForm = () => {
  const t = useTranslations();
  const multiLangData = useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const { watch, control, register, setValue, handleSubmit } =
    useForm<SEOSettingsFormData>({
      resolver: zodResolver(seoSettingsSchema),
    });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");

  const { seoSettingsData, refetch } = useSEOSettingsQuery({});
  const QuerySEOSettingsData = useMemo(
    () => (seoSettingsData as any) || [],
    [seoSettingsData]
  );

  useEffect(() => {
    let SEOSettingsMessage = QuerySEOSettingsData?.message;
    if (SEOSettingsMessage) {
      setValue("meta_title_df", SEOSettingsMessage?.com_meta_title ?? "");
      setValue(
        "meta_description_df",
        SEOSettingsMessage?.com_meta_description ?? ""
      );
      setValue("canonical_url", SEOSettingsMessage?.com_canonical_url ?? "");
      setValue("og_title_df", SEOSettingsMessage?.com_og_title ?? "");
      setValue(
        "og_description_df",
        SEOSettingsMessage?.com_og_description ?? ""
      );
      const tagsArray =
        SEOSettingsMessage?.com_meta_tags == ""
          ? []
          : SEOSettingsMessage?.com_meta_tags
              ?.split(",")
              .map((tag: string) => tag.trim());

      setValue("meta_tag_df", tagsArray ?? []);

      SEOSettingsMessage?.translations?.forEach((translation: any) => {
        setValue(
          `meta_title_${translation.language}` as keyof SEOSettingsFormData,
          translation.com_meta_title ?? ""
        );
        setValue(
          `meta_description_${translation.language}` as keyof SEOSettingsFormData,
          translation.com_meta_description ?? ""
        );
        setValue(
          `og_title_${translation.language}` as keyof SEOSettingsFormData,
          translation.com_og_title ?? ""
        );
        setValue(
          `og_description_${translation.language}` as keyof SEOSettingsFormData,
          translation.com_og_description ?? ""
        );
        const TranslateTagsArray =
          translation?.com_meta_tags == ""
            ? []
            : translation?.com_meta_tags
                ?.split(",")
                .map((tag: string) => tag.trim());

        setValue(
          `meta_tag_${translation.language}` as keyof SEOSettingsFormData,
          TranslateTagsArray
        );
      });
      if (SEOSettingsMessage?.com_og_image) {
        setLastSelectedLogo({
          image_id: SEOSettingsMessage?.com_og_image
            ? SEOSettingsMessage?.com_og_image
            : "",
          img_url: SEOSettingsMessage?.com_og_image_url
            ? SEOSettingsMessage?.com_og_image_url
            : "/images/no-image.png",
          name: "logo",
        });
      }
      setLogoErrorMessage("");
    }
  }, [QuerySEOSettingsData, setValue]);

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

  const { mutate: SEOSettingsStore, isPending } = useSEOSettingsStoreMutation();
  const onSubmit = async (values: SEOSettingsFormData) => {
    const defaultData = {
      com_meta_title: values.meta_title_df,
      com_meta_description: values.meta_description_df,
      com_canonical_url: values.canonical_url,
      com_og_title: values.og_title_df,
      com_og_description: values.og_description_df,
      com_meta_tags: (values.meta_tag_df || []).join(", "),
    };

    const translations = multiLangData
      .filter((lang) => (values as any)[`meta_title_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        com_meta_title: (values as any)[`meta_title_${lang.id}`],
        com_meta_description: (values as any)[`meta_description_${lang.id}`],
        com_og_title: (values as any)[`og_title_${lang.id}`],
        com_og_description: (values as any)[`og_description_${lang.id}`],
        com_meta_tags: ((values as any)[`meta_tag_${lang.id}`] || []).join(
          ", "
        ),
      }));

    const submissionData = {
      ...defaultData,
      id: QuerySEOSettingsData?.id ? QuerySEOSettingsData?.id : 0,
      com_og_image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations,
      multipart: true,
    };

    return SEOSettingsStore(
      { ...(submissionData as any) },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
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

  useEffect(() => {
    if (isInitialLoading) {
      refetch().finally(() => {
        setIsInitialLoading(false);
      });
    } else {
      setIsFetchingData(true);
      refetch().finally(() => {
        setIsFetchingData(false);
      });
    }
  }, [isInitialLoading, refetch]);

  return (
    <div>
      {isInitialLoading ? (
        <CardSkletonLoader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
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
                  <div dir={dir} className="">
                    <div>
                      {multiLangData.map((lang) => {
                        return (
                          <TabsContent key={lang.id} value={lang.id}>
                            <div>
                              <div className="mb-4">
                                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>Meta Tags ({lang.label})</span>
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-custom-dark-blue">
                                          <p className="p-1 text-sm font-medium">
                                            Please provide meta tags{" "}
                                            <span>
                                              {" "}
                                              {lang.label !== "Default" &&
                                                `in ${lang.label}`}
                                            </span>
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                                <Controller
                                  name={
                                    `meta_tag_${lang.id}` as keyof SEOSettingsFormData
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
                                      placeholder={`Enter meta tags for ${lang.label}`}
                                      className="app-input "
                                    />
                                  )}
                                />
                              </div>
                              <div className="mb-4">
                                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>Meta Title ({lang.label})</span>
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-custom-dark-blue">
                                          <p className="p-1 text-sm font-medium">
                                            Please provide meta title{" "}
                                            <span>
                                              {" "}
                                              {lang.label !== "Default" &&
                                                `in ${lang.label}`}
                                            </span>
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                                <Input
                                  id={`meta_title_${lang.id}`}
                                  {...register(
                                    `meta_title_${lang.id}` as keyof SEOSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>
                              <div className="mb-4">
                                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>Meta Description ({lang.label})</span>
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-custom-dark-blue">
                                          <p className="p-1 text-sm font-medium">
                                            Please provide meta description{" "}
                                            <span>
                                              {" "}
                                              {lang.label !== "Default" &&
                                                `in ${lang.label}`}
                                            </span>
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                                <Textarea
                                  id={`meta_description_${lang.id}`}
                                  {...register(
                                    `meta_description_${lang.id}` as keyof SEOSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span>OG Title ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide OG title{" "}
                                          <span>
                                            {" "}
                                            {lang.label !== "Default" &&
                                              `in ${lang.label}`}
                                          </span>
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                              <Input
                                id={`og_title_${lang.id}`}
                                {...register(
                                  `og_title_${lang.id}` as keyof SEOSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span>OG Description ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide OG description{" "}
                                          <span>
                                            {" "}
                                            {lang.label !== "Default" &&
                                              `in ${lang.label}`}
                                          </span>
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                              <Textarea
                                id={`og_description_${lang.id}`}
                                {...register(
                                  `og_description_${lang.id}` as keyof SEOSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span>Canonical URL</span>
                              </p>
                              <Input
                                id="canonical_url"
                                {...register(
                                  "canonical_url" as keyof SEOSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>

                            <div>
                              <p className="text-sm font-medium my-2">
                                OG Image
                              </p>
                              <div className="relative">
                                <div className="relative w-32">
                                  <PhotoUploadModal
                                    trigger={triggerLogo}
                                    isMultiple={false}
                                    onSave={handleSaveLogo}
                                    usageType="seo_settings"
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
                                </div>
                                {errorLogoMessage && (
                                  <p className=" text-red-500 text-sm mt-1">
                                    {errorLogoMessage}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                        );
                      })}
                    </div>
                  </div>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton IsLoading={isPending} AddLabel="Save Changes" />
          </Card>
        </form>
      )}
    </div>
  );
};

export default SEOSettingsForm;
