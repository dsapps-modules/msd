"use client";
import { AppSelect } from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
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
import Cancel from "@/components/blocks/custom-icons/Cancel";
import PhotoUploadModal from "@/components/blocks/shared/PhotoUploadModal";
import { TagsInput } from "@/components/ui/tags-input";
import GlobalImageLoader from "@/lib/imageLoader";
import { useAboutPageUpdateMutation } from "@/modules/admin-section/system-management/page-settings/about-settings/about-settings.action";
import {
  AboutSettingsFormData,
  aboutSettingsSchema,
} from "@/modules/admin-section/system-management/page-settings/about-settings/about-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
type LangKeys = keyof IntlMessages["lang"];
const AboutSettingsForm = ({ data }: any) => {
  const t = useTranslations();
  const multiLangData = useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutSettingsFormData>({
    resolver: zodResolver(aboutSettingsSchema),
    defaultValues: {
      status: data?.data?.status ?? "",
      theme_name: data?.data?.theme_name ?? "",
    },
  });
  const statuslist = [
    { label: t("label.draft"), value: "draft" },
    { label: t("label.publish"), value: "publish" },
  ];
  const Themelist = [
    { label: "Default", value: "default" },
    { label: "Theme One", value: "theme_one" },
    { label: "Theme Two", value: "theme_two" },
  ];

  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");
  const QueryAboutPageData = useMemo(() => (data as any)?.data || {}, [data]);
  const AboutSectionData = QueryAboutPageData?.content?.about_section;
  const StorySectionData = QueryAboutPageData?.content?.story_section;
  const MissionSectionData =
    QueryAboutPageData?.content?.mission_and_vision_section;
  const TestimonialSectionData =
    QueryAboutPageData?.content?.testimonial_and_success_section;

  useEffect(() => {
    if (QueryAboutPageData) {
      setValue("title_df", QueryAboutPageData?.title ?? "");
      setValue("meta_title_df", QueryAboutPageData?.meta_title ?? "");
      setValue(
        "meta_description_df",
        QueryAboutPageData?.meta_description ?? ""
      );
      const metaTagsArray = QueryAboutPageData?.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim());
      setValue("meta_keywords_df", metaTagsArray);
      setValue("status", QueryAboutPageData?.status ?? "");
      setValue("theme_name", QueryAboutPageData?.theme_name ?? "");

      if (AboutSectionData) {
        setValue("about_title_df", AboutSectionData?.title ?? "");
        setValue("about_subtitle_df", AboutSectionData?.subtitle ?? "");
        setValue("about_description_df", AboutSectionData?.description ?? "");
        setLastSelectedLogo({
          image_id: AboutSectionData?.image ?? "",
          img_url: AboutSectionData?.image_url ?? "/images/no-image.png",
          name: " image",
        });
      }

      if (StorySectionData) {
        setValue("story_title_df", StorySectionData.title ?? "");
        setValue("story_subtitle_df", StorySectionData.subtitle ?? "");
      }

      if (MissionSectionData) {
        setValue("mission_title_df", MissionSectionData?.title ?? "");
        setValue("mission_subtitle_df", MissionSectionData?.subtitle ?? "");
      }

      if (TestimonialSectionData) {
        setValue("testimonial_title_df", TestimonialSectionData?.title ?? "");
        setValue(
          "testimonial_subtitle_df",
          TestimonialSectionData?.subtitle ?? ""
        );
      }

      if (QueryAboutPageData?.translations) {
        const TestimonialSteps: Array<{
          titles: Record<string, string>;
          subtitles: Record<string, string>;
          descriptions: Record<string, string>;
          image: Record<string, string>;
        }> = [];
        const aggregatedSteps: Array<{
          titles: Record<string, string>;
          subtitles: Record<string, string>;
          image: Record<string, string>;
        }> = [];
        const joinBenefitsSteps: Array<{
          titles: Record<string, string>;
          subtitles: Record<string, string>;
          descriptions: Record<string, string>;
          image: Record<string, string>;
        }> = [];
        const faqSteps: Array<{
          titles: Record<string, string>;
          subtitles: Record<string, string>;
          image: string;
        }> = [];

        Object.keys(QueryAboutPageData?.translations).forEach((language) => {
          const translation = QueryAboutPageData?.translations[language];

          const tagsArray = translation?.meta_keywords
            ? translation.meta_keywords
                .split(",")
                .map((tag: string) => tag.trim())
            : [];

          setValue(
            `meta_keywords_${language}` as keyof AboutSettingsFormData,
            tagsArray
          );
          setValue(
            `title_${language}` as keyof AboutSettingsFormData,
            translation.title ?? ""
          );
          setValue(
            `meta_title_${language}` as keyof AboutSettingsFormData,
            translation.meta_title ?? ""
          );
          setValue(
            `meta_description_${language}` as keyof AboutSettingsFormData,
            translation.meta_description ?? ""
          );

          const LoginSectionDataT =
            translation?.content?.login_register_section;
          const TestimonialSectionDataT =
            translation?.content?.testimonial_and_success_section;
          const MissionSectionDataT =
            translation?.content?.mission_and_vision_section;

          const StorySectionDataT = translation?.content?.story_section;

          const AboutSectionDataT = translation?.content?.about_section;

          if (AboutSectionDataT) {
            setValue(
              `about_title_${language}` as keyof AboutSettingsFormData,
              AboutSectionDataT?.title ?? ""
            );
            setValue(
              `about_subtitle_${language}` as keyof AboutSettingsFormData,
              AboutSectionDataT?.subtitle ?? ""
            );
            setValue(
              `about_description_${language}` as keyof AboutSettingsFormData,
              AboutSectionDataT?.description ?? ""
            );
          }

          if (StorySectionDataT) {
            setValue(
              `story_title_${language}` as keyof AboutSettingsFormData,
              StorySectionDataT?.title ?? ""
            );
            setValue(
              `story_subtitle_${language}` as keyof AboutSettingsFormData,
              StorySectionDataT?.subtitle ?? ""
            );
            StorySectionDataT?.steps?.forEach((step: any, index: any) => {
              if (!aggregatedSteps[index]) {
                aggregatedSteps[index] = {
                  titles: {},
                  subtitles: {},
                  image: {},
                };
              }
              aggregatedSteps[index].titles[language] = step.title || "";
              aggregatedSteps[index].subtitles[language] = step.subtitle || "";
              aggregatedSteps[index].image = {
                id: step?.image || "",
                url: step?.image_url || "",
              };
            });
          }

          if (TestimonialSectionDataT) {
            setValue(
              `testimonial_title_${language}` as keyof AboutSettingsFormData,
              TestimonialSectionDataT?.title ?? ""
            );
            setValue(
              `testimonial_subtitle_${language}` as keyof AboutSettingsFormData,
              TestimonialSectionDataT?.subtitle ?? ""
            );

            TestimonialSectionDataT?.steps?.forEach((step: any, index: any) => {
              if (!TestimonialSteps[index]) {
                TestimonialSteps[index] = {
                  titles: {},
                  subtitles: {},
                  descriptions: {},
                  image: {},
                };
              }
              TestimonialSteps[index].titles[language] = step.title || "";
              TestimonialSteps[index].subtitles[language] = step.subtitle || "";
              TestimonialSteps[index].descriptions[language] =
                step.description || "";
              TestimonialSteps[index].image = {
                id: step?.image || "",
                url: step?.image_url || "",
              };
            });
          }
          if (MissionSectionDataT) {
            setValue(
              `mission_title_${language}` as keyof AboutSettingsFormData,
              MissionSectionDataT?.title ?? ""
            );
            setValue(
              `mission_subtitle_${language}` as keyof AboutSettingsFormData,
              MissionSectionDataT?.subtitle ?? ""
            );

            MissionSectionDataT?.steps?.forEach((step: any, index: any) => {
              if (!joinBenefitsSteps[index]) {
                joinBenefitsSteps[index] = {
                  titles: {},
                  subtitles: {},
                  descriptions: {},
                  image: {},
                };
              }
              joinBenefitsSteps[index].titles[language] = step.title || "";
              joinBenefitsSteps[index].subtitles[language] =
                step.subtitle || "";
              joinBenefitsSteps[index].descriptions[language] =
                step.description || "";
              joinBenefitsSteps[index].image = {
                id: step?.image || "",
                url: step?.image_url || "",
              };
            });
          }
        });

        setOnBoardSteps(aggregatedSteps as any);
        setTestimonialSteps(TestimonialSteps as any);
        setAttributeValues(joinBenefitsSteps as any);
      }
    }
  }, [
    setValue,
    QueryAboutPageData?.translations,
    QueryAboutPageData,
    MissionSectionData,
    TestimonialSectionData,
    StorySectionData,
    AboutSectionData,
  ]);

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

  const [attributeValues, setAttributeValues] = useState<
    {
      [x: string]: any;
      titles: { [langId: string]: string };
      subtitles: { [langId: string]: string };
      descriptions: { [langId: string]: string };
      charge_amount: string;
      image: string;
    }[]
  >(
    data?.charges?.length > 0
      ? data?.charges.map((item: any) =>
          typeof item === "object"
            ? {
                titles: item.titles || {},
                subtitles: item.subtitles || {},
                descriptions: item.descriptions || {},
                charge_amount: item.charge_amount || "",
                image: item.image || "",
              }
            : {
                titles: {},
                subtitles: {},
                descriptions: {},
                charge_amount: "",
                image: "",
              }
        )
      : [
          {
            titles: {},
            subtitles: {},
            descriptions: {},
            charge_amount: "",
            image: "",
          },
        ]
  );

  const handleAddAttributeValue = () => {
    setAttributeValues([
      ...attributeValues,
      {
        titles: {},
        subtitles: {},
        descriptions: {},
        charge_amount: "",
        image: "",
      },
    ]);
  };

  const handleDeleteAttributeValue = (index: number) => {
    setAttributeValues(attributeValues.filter((_, i) => i !== index));
  };

  const handleChangeAttributeValue = (
    index: number,
    field: "titles" | "subtitles" | "descriptions" | "charge_amount" | "image",
    langId: string,
    value: any
  ) => {
    const updatedValues = [...attributeValues];

    if (field === "image" && Array.isArray(value) && value.length > 0) {
      //@ts-ignore
      updatedValues[index][field] = {
        id: value[0].image_id,
        url: value[0].img_url,
      };
    } else if (
      field === "titles" ||
      field === "subtitles" ||
      field === "descriptions"
    ) {
      updatedValues[index][field] = {
        ...updatedValues[index][field],
        [langId]: value,
      };
    } else {
      updatedValues[index][field] = value;
    }

    setAttributeValues(updatedValues);
  };

  const [testimonialSteps, setTestimonialSteps] = useState<
    {
      [x: string]: any;
      titles: { [langId: string]: string };
      subtitles: { [langId: string]: string };
      descriptions: { [langId: string]: string };
      charge_amount: string;
      image: string;
    }[]
  >([]);

  const handleAddTestimonialStep = () => {
    setTestimonialSteps([
      ...testimonialSteps,
      {
        titles: {},
        subtitles: {},
        descriptions: {},
        charge_amount: "",
        image: "",
      },
    ]);
  };

  const handleDeleteTestimonialStep = (index: number) => {
    setTestimonialSteps(testimonialSteps.filter((_, i) => i !== index));
  };

  const handleChangeTestimonialStep = (
    index: number,
    field: "titles" | "subtitles" | "descriptions" | "charge_amount" | "image",
    langId: string,
    value: any
  ) => {
    const updatedValues = [...testimonialSteps];

    if (field === "image" && Array.isArray(value) && value.length > 0) {
      //@ts-ignore
      updatedValues[index][field] = {
        id: value[0].image_id,
        url: value[0].img_url,
      };
    } else if (
      field === "titles" ||
      field === "subtitles" ||
      field === "descriptions"
    ) {
      updatedValues[index][field] = {
        ...updatedValues[index][field],
        [langId]: value,
      };
    } else {
      updatedValues[index][field] = value;
    }

    setTestimonialSteps(updatedValues);
  };

  const [onBoardSteps, setOnBoardSteps] = useState<
    {
      [x: string]: any;
      titles: { [langId: string]: string };
      subtitles: { [langId: string]: string };
      charge_amount: string;
      image: string;
    }[]
  >([]);

  const handleAddOnBoardStep = () => {
    setOnBoardSteps([
      ...onBoardSteps,
      {
        titles: {},
        subtitles: {},
        charge_amount: "",
        image: "",
      },
    ]);
  };

  const handleDeleteOnBoardStep = (index: number) => {
    setOnBoardSteps(onBoardSteps.filter((_, i) => i !== index));
  };

  const handleChangeOnBoardStep = (
    index: number,
    field: "titles" | "subtitles" | "charge_amount" | "image",
    langId: string,
    value: any
  ) => {
    const updatedValues = [...onBoardSteps];

    if (field === "image" && Array.isArray(value) && value.length > 0) {
      //@ts-ignore
      updatedValues[index][field] = {
        id: value[0].image_id,
        url: value[0].img_url,
      };
    } else if (field === "titles" || field === "subtitles") {
      updatedValues[index][field] = {
        ...updatedValues[index][field],
        [langId]: value,
      };
    } else {
      updatedValues[index][field] = value;
    }

    setOnBoardSteps(updatedValues);
  };

  const { mutate: BecomeSellerStore, isPending: isUpdating } =
    useAboutPageUpdateMutation();

  const onSubmit = async (values: AboutSettingsFormData) => {
    const defaultData: any = {
      title: values.title_df,
      meta_title: values.meta_title_df,
      meta_description: values.meta_description_df,
      meta_keywords: (values.meta_keywords_df || []).join(", "),
    };
    if (values?.status !== "") {
      defaultData.status = values.status;
    }
    const about_section = {
      title: values.about_title_df,
      subtitle: values.about_subtitle_df,
      description: values.about_description_df,
      image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      image_url: "",
    };

    const story_section = {
      title: values.story_title_df,
      subtitle: values.story_subtitle_df,
      steps: onBoardSteps.map(({ titles, subtitles, image }) => ({
        title: titles.df,
        subtitle: subtitles.df,
        image: (image as any)?.id || null,
      })),
    };
    const mission_and_vision_section = {
      title: values.mission_title_df,
      subtitle: values.mission_subtitle_df,
      steps: attributeValues.map(
        ({ titles, subtitles, descriptions, image }) => ({
          title: titles.df,
          subtitle: subtitles.df,
          description: descriptions.df,
          image: (image as any)?.id || null,
        })
      ),
    };
    const testimonial_and_success_section = {
      title: values.testimonial_title_df,
      subtitle: values.testimonial_subtitle_df,
      steps: testimonialSteps.map(
        ({ titles, subtitles, descriptions, image }) => ({
          title: titles.df,
          subtitle: subtitles.df,
          description: descriptions.df,
          image: (image as any)?.id || null,
        })
      ),
    };

    const translations = multiLangData.map((lang) => ({
      language_code: lang.id,
      title: (values as any)[`title_${lang.id}`],
      meta_title: (values as any)[`meta_title_${lang.id}`],
      meta_description: (values as any)[`meta_description_${lang.id}`],
      meta_keywords: ((values as any)[`meta_keywords_${lang.id}`] || []).join(
        ", "
      ),
      content: {
        about_section: {
          title: (values as any)[`about_title_${lang.id}`],
          subtitle: (values as any)[`about_subtitle_${lang.id}`],
          description: (values as any)[`about_description_${lang.id}`],
          image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
          image_url: "",
        },
        story_section: {
          title: (values as any)[`story_title_${lang.id}`] || "",
          subtitle: (values as any)[`story_subtitle_${lang.id}`] || "",
          steps: onBoardSteps.map(({ titles, subtitles, image }) => ({
            title: titles[lang.id] || titles.df,
            subtitle: subtitles[lang.id] || subtitles.df,
            image: (image as any)?.id || null,
          })),
        },

        mission_and_vision_section: {
          title: (values as any)[`mission_title_${lang.id}`] || "",
          subtitle: (values as any)[`mission_subtitle_${lang.id}`] || "",
          steps: attributeValues.map(
            ({ titles, subtitles, descriptions, image }) => ({
              title: titles[lang.id] || titles.df,
              subtitle: subtitles[lang.id] || subtitles.df,
              description: descriptions[lang.id] || subtitles.df,
              image: (image as any)?.id || null,
            })
          ),
        },
        testimonial_and_success_section: {
          title: (values as any)[`testimonial_title_${lang.id}`] || "",
          subtitle: (values as any)[`testimonial_subtitle_${lang.id}`] || "",
          steps: testimonialSteps.map(
            ({ titles, subtitles, descriptions, image }) => ({
              title: titles[lang.id] || titles.df,
              subtitle: subtitles[lang.id] || subtitles.df,
              description: descriptions[lang.id] || subtitles.df,
              image: (image as any)?.id || null,
            })
          ),
        },
      },
    }));

    const content = {
      about_section,
      story_section,
      mission_and_vision_section,
      testimonial_and_success_section,
    };

    const submissionData = {
      id: QueryAboutPageData?.id ? QueryAboutPageData?.id : 0,
      ...defaultData,
      theme_name: values.theme_name,
      content,
      translations,
    };

    return BecomeSellerStore(
      { ...(submissionData as any) },
      {
        onSuccess: () => {
          setLogoErrorMessage("");
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FFFFFFE5] h-20 border-l border-r border-b w-full rounded-b opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center justify-center">
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
        <div>
          <Tabs defaultValue="df" className="">
            <Card className="mt-4 sticky top-14 z-20">
              <CardContent className=" px-0 md:px-6 py-2">
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
              </CardContent>
            </Card>

            <Card dir={dir}>
              <CardContent className="mt-4 p-4">
                {multiLangData.map((lang) => {
                  return (
                    <TabsContent key={lang.id} value={lang.id}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
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
                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>
                                {t("label.title")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                            </p>
                            <Input
                              id={`title_${lang.id}`}
                              {...register(
                                `title_${lang.id}` as keyof AboutSettingsFormData
                              )}
                              className="app-input"
                              placeholder={t("place_holder.enter_title")}
                            />
                            {errors[
                              `title_${lang.id}` as keyof AboutSettingsFormData
                            ] && (
                              <p className="text-red-500 text-sm mt-1">
                                {(errors as any)[`title_${lang.id}`]?.message}
                              </p>
                            )}
                          </div>
                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>{t("label.status")} </span>
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
                                    }}
                                    groups={statuslist}
                                    hideNone
                                  />
                                </>
                              )}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>
                                {t("label.meta_title")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                            </p>
                            <Input
                              id={`meta_title_${lang.id}`}
                              {...register(
                                `meta_title_${lang.id}` as keyof AboutSettingsFormData
                              )}
                              className="app-input"
                              placeholder={t("place_holder.enter_meta_title")}
                            />
                            {errors[
                              `meta_title_${lang.id}` as keyof AboutSettingsFormData
                            ] && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  (errors as any)[`meta_title_${lang.id}`]
                                    ?.message
                                }
                              </p>
                            )}
                          </div>

                          <div className="">
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>
                                {t("label.meta_description")} (
                                {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                              </span>
                            </p>
                            <Input
                              id={`meta_description_${lang.id}`}
                              {...register(
                                `meta_description_${lang.id}` as keyof AboutSettingsFormData
                              )}
                              className="app-input"
                              placeholder={t(
                                "place_holder.enter_meta_description"
                              )}
                            />
                            {errors[
                              `meta_description_${lang.id}` as keyof AboutSettingsFormData
                            ] && (
                              <p className="text-red-500 text-sm mt-1">
                                {
                                  (errors as any)[`meta_description_${lang.id}`]
                                    ?.message
                                }
                              </p>
                            )}
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
                                    <TooltipContent className="bg-custom-dark-blue w-68">
                                      <p className="p-1 text-sm font-medium">
                                        {t("tooltip.enter_meta_key")}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Controller
                              name={
                                `meta_keywords_${lang.id}` as keyof AboutSettingsFormData
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
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-2 md:p-6">
                <div dir={dir} className="">
                  <h1 className="text-lg md:text-2xl font-medium mb-4">
                    About Section
                  </h1>
                  <div>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            <div>
                              <div className="mb-4">
                                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>Title ({lang.label})</span>
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-custom-dark-blue">
                                          <p className="p-1 text-sm font-medium">
                                            Please provide title{" "}
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
                                  id={`about_title_${lang.id}`}
                                  {...register(
                                    `about_title_${lang.id}` as keyof AboutSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>
                              <div className="mb-4">
                                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>Subtitle ({lang.label})</span>
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-custom-dark-blue">
                                          <p className="p-1 text-sm font-medium">
                                            Please subtitle{" "}
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
                                  id={`about_subtitle_${lang.id}`}
                                  {...register(
                                    `about_subtitle_${lang.id}` as keyof AboutSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>

                              <div className="mb-4">
                                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>Description ({lang.label})</span>
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-custom-dark-blue">
                                          <p className="p-1 text-sm font-medium">
                                            Please provide description_{" "}
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
                                  id={`about_description_${lang.id}`}
                                  {...register(
                                    `about_description_${lang.id}` as keyof AboutSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="mt-0 md:mt-4">
                                <p className="text-sm font-medium flex items-center gap-2 mb-1">
                                  <span> Image</span>
                                </p>
                                <div className="relative flex align-start gap-4">
                                  <div className="relative w-32">
                                    <PhotoUploadModal
                                      trigger={triggerLogo}
                                      isMultiple={false}
                                      onSave={handleSaveLogo}
                                      usageType="about_settings"
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
                                </div>
                                <div>
                                  {errorLogoMessage && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {errorLogoMessage}
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
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-2 md:p-6">
                <div dir={dir} className="">
                  <h1 className="text-lg md:text-2xl font-medium mb-4">
                    Story Section
                  </h1>
                  <div>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div className="">
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span> Title ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide title{" "}
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
                                id={`story_title_${lang.id}`}
                                {...register(
                                  `story_title_${lang.id}` as keyof AboutSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span> Subtitle ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide subtitle{" "}
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
                                id={`story_subtitle_${lang.id}`}
                                {...register(
                                  `story_subtitle_${lang.id}` as keyof AboutSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="mt-8 w-full text-sm font-semibold flex items-center justify-between ">
                              <span>Story Steps</span>
                              <span
                                onClick={handleAddOnBoardStep}
                                className="flex items-center cursor-pointer bg-blue-50 border border-blue-500 text-blue-500 text-sm font-bold shadow-2xl px-2 py-2 rounded hover:bg-blue-500 hover:text-white"
                              >
                                Add more
                              </span>
                            </div>
                            <div className="max-h-[300px] overflow-x-auto custom-scrollbar">
                              {onBoardSteps.map((value, index) => (
                                <div
                                  key={index}
                                  className="my-4 flex items-end w-full gap-4 border-t md:border-0"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 mr-6 ">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 ">
                                      <div className="flex  flex-col items-center">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Image
                                        </p>

                                        {
                                          //@ts-ignore
                                          value?.image?.url ? (
                                            <div className="relative w-10 h-10">
                                              <Image
                                                loader={GlobalImageLoader}
                                                //@ts-ignore
                                                src={value?.image?.url}
                                                alt="Uploaded"
                                                layout="fill"
                                                className="object-cover border rounded"
                                              />
                                              <button
                                                onClick={() =>
                                                  handleChangeOnBoardStep(
                                                    index,
                                                    "image",
                                                    "",
                                                    null
                                                  )
                                                }
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center"
                                              >
                                                X
                                              </button>
                                            </div>
                                          ) : (
                                            <PhotoUploadModal
                                              trigger={
                                                <div className="w-10 h-10 rounded border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-50">
                                                  <CloudIcon />
                                                </div>
                                              }
                                              isMultiple={false}
                                              onSave={(uploadedImage) =>
                                                handleChangeOnBoardStep(
                                                  index,
                                                  "image",
                                                  "",
                                                  uploadedImage
                                                )
                                              }
                                              usageType="about_settings"
                                            />
                                          )
                                        }
                                      </div>

                                      <div className="w-full">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Title
                                        </p>
                                        <Input
                                          type="text"
                                          value={value?.titles[lang.id] || ""}
                                          onChange={(e) =>
                                            handleChangeOnBoardStep(
                                              index,
                                              "titles",
                                              lang.id,
                                              e.target.value
                                            )
                                          }
                                          className="app-input flex-grow py-2"
                                          placeholder="Enter value"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-span-2">
                                      <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                        Sub Title
                                      </p>
                                      <Input
                                        type="text"
                                        value={value?.subtitles[lang.id] || ""}
                                        onChange={(e) =>
                                          handleChangeOnBoardStep(
                                            index,
                                            "subtitles",
                                            lang.id,
                                            e.target.value
                                          )
                                        }
                                        className="app-input flex-grow py-2"
                                        placeholder="Enter value"
                                      />
                                    </div>
                                  </div>
                                  {index === 0 ? (
                                    <span className="flex items-center cursor-not-allowed bg-slate-500 text-slate-300 text-sm font-bold shadow-2xl px-2 py-2.5 rounded">
                                      Default
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleDeleteOnBoardStep(index)
                                      }
                                      className="cursor-pointer bg-red-500 text-white shadow-2xl px-3 py-2 rounded"
                                    >
                                      Close
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-2 md:p-6">
                <div dir={dir} className="">
                  <h1 className="text-lg md:text-2xl font-medium mb-4">
                    Mission & Vision Section
                  </h1>
                  <div>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div className="">
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span> Title ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide title{" "}
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
                                id={`mission_title_${lang.id}`}
                                {...register(
                                  `mission_title_${lang.id}` as keyof AboutSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span> Subtitle ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide subtitle{" "}
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
                                id={`mission_subtitle_${lang.id}`}
                                {...register(
                                  `mission_subtitle_${lang.id}` as keyof AboutSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="mt-8 text-sm font-semibold flex items-center justify-between ">
                              <span>Mission & Vision Steps</span>
                              <span
                                onClick={handleAddAttributeValue}
                                className="flex items-center cursor-pointer bg-blue-50 border border-blue-500 text-blue-500 text-sm font-bold shadow-2xl px-2 py-2 rounded hover:bg-blue-500 hover:text-white"
                              >
                                Add more
                              </span>
                            </div>
                            <div className="max-h-[300px] overflow-x-auto custom-scrollbar">
                              {attributeValues.map((value, index) => (
                                <div
                                  key={index}
                                  className="my-4 flex items-end w-full gap-4 border-t md:border-0"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 mr-6 ">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 ">
                                      <div className="flex flex-col items-center ">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Image
                                        </p>

                                        {
                                          //@ts-ignore
                                          value?.image?.url ? (
                                            <div className="relative w-10 h-10">
                                              <Image
                                                loader={GlobalImageLoader}
                                                //@ts-ignore
                                                src={value?.image.url}
                                                alt="Uploaded"
                                                layout="fill"
                                                className="object-cover border rounded"
                                              />
                                              <button
                                                onClick={() =>
                                                  handleChangeAttributeValue(
                                                    index,
                                                    "image",
                                                    "",
                                                    null
                                                  )
                                                }
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center"
                                              >
                                                X
                                              </button>
                                            </div>
                                          ) : (
                                            <PhotoUploadModal
                                              trigger={
                                                <div className="w-10 h-10 rounded border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-50">
                                                  <CloudIcon />
                                                </div>
                                              }
                                              isMultiple={false}
                                              onSave={(uploadedImage) =>
                                                handleChangeAttributeValue(
                                                  index,
                                                  "image",
                                                  "",
                                                  uploadedImage
                                                )
                                              }
                                              usageType="about_settings"
                                            />
                                          )
                                        }
                                      </div>
                                      <div className=" w-full">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Title
                                        </p>
                                        <Input
                                          type="text"
                                          value={value?.titles[lang.id] || ""}
                                          onChange={(e) =>
                                            handleChangeAttributeValue(
                                              index,
                                              "titles",
                                              lang.id,
                                              e.target.value
                                            )
                                          }
                                          className="app-input flex-grow py-2"
                                          placeholder="Enter value"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className=" w-full">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Sub Title
                                        </p>
                                        <Input
                                          type="text"
                                          value={
                                            value?.subtitles[lang.id] || ""
                                          }
                                          onChange={(e) =>
                                            handleChangeAttributeValue(
                                              index,
                                              "subtitles",
                                              lang.id,
                                              e.target.value
                                            )
                                          }
                                          className="app-input flex-grow py-2"
                                          placeholder="Enter value"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className=" w-full">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Descriptions
                                        </p>
                                        <Input
                                          type="text"
                                          value={
                                            value?.descriptions[lang.id] || ""
                                          }
                                          onChange={(e) =>
                                            handleChangeAttributeValue(
                                              index,
                                              "descriptions",
                                              lang.id,
                                              e.target.value
                                            )
                                          }
                                          className="app-input flex-grow py-2"
                                          placeholder="Enter value"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {index === 0 ? (
                                    <span className="flex items-center cursor-not-allowed bg-slate-500 text-slate-300 text-sm font-bold shadow-2xl px-2 py-2.5 rounded">
                                      Default
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleDeleteAttributeValue(index)
                                      }
                                      className="cursor-pointer bg-red-500 text-white shadow-2xl px-3 py-2 rounded"
                                    >
                                      Close
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-2 md:p-6">
                <div dir={dir} className="">
                  <h1 className="text-lg md:text-2xl font-medium mb-4">
                    Testimonial & Success Section
                  </h1>
                  <div>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div className="">
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span> Title ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide title{" "}
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
                                id={`testimonial_title_${lang.id}`}
                                {...register(
                                  `testimonial_title_${lang.id}` as keyof AboutSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="mb-4">
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span> Subtitle ({lang.label})</span>
                                <div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-custom-dark-blue">
                                        <p className="p-1 text-sm font-medium">
                                          Please provide subtitle{" "}
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
                                id={`testimonial_subtitle_${lang.id}`}
                                {...register(
                                  `testimonial_subtitle_${lang.id}` as keyof AboutSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="mt-8 text-sm font-semibold flex items-center justify-between ">
                              <span>Testimonial & Success Steps</span>
                              <span
                                onClick={handleAddTestimonialStep}
                                className="flex items-center cursor-pointer bg-blue-50 border border-blue-500 text-blue-500 text-sm font-bold shadow-2xl px-2 py-2 rounded hover:bg-blue-500 hover:text-white"
                              >
                                Add more
                              </span>
                            </div>
                            <div className="max-h-[300px] overflow-x-auto custom-scrollbar">
                              {testimonialSteps.map((value, index) => (
                                <div
                                  key={index}
                                  className="my-4 flex items-end w-full gap-4 border-t md:border-0"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 mr-6 ">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 ">
                                      <div className="flex flex-col items-center ">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Image
                                        </p>

                                        {
                                          //@ts-ignore
                                          value?.image?.url ? (
                                            <div className="relative w-10 h-10">
                                              <Image
                                                loader={GlobalImageLoader}
                                                //@ts-ignore
                                                src={value?.image.url}
                                                alt="Uploaded"
                                                layout="fill"
                                                className="object-cover border rounded"
                                              />
                                              <button
                                                onClick={() =>
                                                  handleChangeTestimonialStep(
                                                    index,
                                                    "image",
                                                    "",
                                                    null
                                                  )
                                                }
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center"
                                              >
                                                X
                                              </button>
                                            </div>
                                          ) : (
                                            <PhotoUploadModal
                                              trigger={
                                                <div className="w-10 h-10 rounded border-2 border-dashed border-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-50">
                                                  <CloudIcon />
                                                </div>
                                              }
                                              isMultiple={false}
                                              onSave={(uploadedImage) =>
                                                handleChangeTestimonialStep(
                                                  index,
                                                  "image",
                                                  "",
                                                  uploadedImage
                                                )
                                              }
                                              usageType="about_settings"
                                            />
                                          )
                                        }
                                      </div>
                                      <div className=" w-full">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Title
                                        </p>
                                        <Input
                                          type="text"
                                          value={value?.titles[lang.id] || ""}
                                          onChange={(e) =>
                                            handleChangeTestimonialStep(
                                              index,
                                              "titles",
                                              lang.id,
                                              e.target.value
                                            )
                                          }
                                          className="app-input flex-grow py-2"
                                          placeholder="Enter value"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className=" w-full">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Sub Title
                                        </p>
                                        <Input
                                          type="text"
                                          value={
                                            value?.subtitles[lang.id] || ""
                                          }
                                          onChange={(e) =>
                                            handleChangeTestimonialStep(
                                              index,
                                              "subtitles",
                                              lang.id,
                                              e.target.value
                                            )
                                          }
                                          className="app-input flex-grow py-2"
                                          placeholder="Enter value"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div className=" w-full">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Description
                                        </p>
                                        <Input
                                          type="text"
                                          value={
                                            value?.descriptions[lang.id] || ""
                                          }
                                          onChange={(e) =>
                                            handleChangeTestimonialStep(
                                              index,
                                              "descriptions",
                                              lang.id,
                                              e.target.value
                                            )
                                          }
                                          className="app-input flex-grow py-2"
                                          placeholder="Enter value"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {index === 0 ? (
                                    <span className="flex items-center cursor-not-allowed bg-slate-500 text-slate-300 text-sm font-bold shadow-2xl px-2 py-2.5 rounded">
                                      Default
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleDeleteTestimonialStep(index)
                                      }
                                      className="cursor-pointer bg-red-500 text-white shadow-2xl px-3 py-2 rounded"
                                    >
                                      Close
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </div>

        <Card className="mt-4 sticky bottom-0 w-full p-4">
          <SubmitButton IsLoading={isUpdating} AddLabel="Save Changes" />
        </Card>
      </form>
    </div>
  );
};

export default AboutSettingsForm;
