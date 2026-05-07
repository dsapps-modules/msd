"use client";
import Loader from "@/components/molecules/Loader";
import multiLang from "@/components/molecules/multiLang.json";
import {
  AppSelect,
} from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
import CustomSingleDatePicker from "@/components/blocks/common/CustomSingleDatePicker";
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
} from "@/components/ui";

import {
  useGDPRCookieSettingsQuery,
  useGDPRCookieSettingsStoreMutation,
} from "@/modules/admin-section/system-management/page-settings/gdpr-cookie-settings/gdpr-cookie-settings.action";
import { GDPRCookieSettingsSchema } from "@/modules/admin-section/system-management/page-settings/gdpr-cookie-settings/gdpr-cookie-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid } from "date-fns";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CardSkletonLoader from "@/components/molecules/CardSkletonLoader";

type ToggleState = {
  com_gdpr_enable_disable: string;
  com_gdpr_can_reject_all: string;
};


const GDPRCookieSettingsForm = ({ data }: any) => {
  const t = useTranslations();
  const multiLangData = useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const StatusList = [
    { label: "Required", value: "required" },
    { label: "Optional", value: "optional" },
  ];
  const [toggles, setToggles] = useState<ToggleState>({
    com_gdpr_enable_disable: "",
    com_gdpr_can_reject_all: "",
  });
  const {
    control,
    register,
    setValue,
    handleSubmit,
  } = useForm<GDPRCookieSettingsFormData>({
    resolver: zodResolver(GDPRCookieSettingsSchema),
  });
  const { GDPRCookieSettings, refetch, isFetching, isPending } =
    useGDPRCookieSettingsQuery({});
  const QueryGDPRCookieData = useMemo(
    () => (GDPRCookieSettings as any)?.data || [],
    [GDPRCookieSettings]
  );

  const GDPRBasicSectionData = QueryGDPRCookieData?.content?.gdpr_basic_section;
  const GDPRMoreInfoSectionData =
    QueryGDPRCookieData?.content?.gdpr_more_info_section;

  useEffect(() => {
    if (GDPRBasicSectionData) {
      setValue("com_gdpr_title_df", GDPRBasicSectionData?.com_gdpr_title ?? "");
      setValue(
        "com_gdpr_message_df",
        GDPRBasicSectionData?.com_gdpr_message ?? ""
      );
      setValue(
        "com_gdpr_more_info_label_df",
        GDPRBasicSectionData?.com_gdpr_more_info_label ?? ""
      );
      setValue(
        "com_gdpr_more_info_link",
        GDPRBasicSectionData?.com_gdpr_more_info_link ?? ""
      );
      setValue(
        "com_gdpr_accept_label_df",
        GDPRBasicSectionData?.com_gdpr_accept_label ?? ""
      );
      setValue(
        "com_gdpr_decline_label_df",
        GDPRBasicSectionData?.com_gdpr_decline_label ?? ""
      );
      setValue(
        "com_gdpr_manage_label_df",
        GDPRBasicSectionData?.com_gdpr_manage_label ?? ""
      );
      setValue(
        "com_gdpr_manage_title_df",
        GDPRBasicSectionData?.com_gdpr_manage_title ?? ""
      );
      setValue(
        "com_gdpr_expire_date",
        GDPRBasicSectionData?.com_gdpr_expire_date ?? ""
      );
      setValue(
        "com_gdpr_show_delay",
        GDPRBasicSectionData?.com_gdpr_show_delay ?? ""
      );
      setToggles({
        com_gdpr_enable_disable:
          GDPRBasicSectionData?.com_gdpr_enable_disable || "",
        com_gdpr_can_reject_all:
          GDPRBasicSectionData?.com_gdpr_can_reject_all || "",
      });
    }

    if (GDPRMoreInfoSectionData) {
      setValue("section_title_df", GDPRMoreInfoSectionData.section_title ?? "");
      setValue(
        "section_details_df",
        GDPRMoreInfoSectionData.section_details ?? ""
      );
    }

    if (QueryGDPRCookieData?.translations) {
      const aggregatedSteps: Array<{
        titles: Record<string, string>;
        subtitles: Record<string, string>;
        req_status: Record<string, string>;
      }> = [];

      Object.keys(QueryGDPRCookieData?.translations).forEach((language) => {
        const translation = QueryGDPRCookieData?.translations[language];

        const GDPRBasicSectionDataT = translation?.content?.gdpr_basic_section;
        const GDPRMoreInfoSectionDataT =
          translation?.content?.gdpr_more_info_section;

        if (GDPRBasicSectionDataT) {
          setValue(
            `com_gdpr_title_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRBasicSectionDataT?.com_gdpr_title ?? ""
          );
          setValue(
            `com_gdpr_message_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRBasicSectionDataT?.com_gdpr_message ?? ""
          );
          setValue(
            `com_gdpr_more_info_label_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRBasicSectionDataT?.com_gdpr_more_info_label ?? ""
          );

          setValue(
            `com_gdpr_accept_label_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRBasicSectionDataT?.com_gdpr_accept_label ?? ""
          );
          setValue(
            `com_gdpr_decline_label_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRBasicSectionDataT?.com_gdpr_decline_label ?? ""
          );
          setValue(
            `com_gdpr_manage_label_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRBasicSectionDataT?.com_gdpr_manage_label ?? ""
          );
          setValue(
            `com_gdpr_manage_title_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRBasicSectionDataT?.com_gdpr_manage_title ?? ""
          );
        }

        if (GDPRMoreInfoSectionDataT) {
          setValue(
            `section_title_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRMoreInfoSectionDataT?.section_title ?? ""
          );
          setValue(
            `section_details_${language}` as keyof GDPRCookieSettingsFormData,
            GDPRMoreInfoSectionDataT?.section_details ?? ""
          );
          // Aggregate steps for each language
          GDPRMoreInfoSectionDataT?.steps?.forEach((step: any, index: any) => {
            if (!aggregatedSteps[index]) {
              aggregatedSteps[index] = {
                titles: {},
                subtitles: {},
                req_status: {},
              };
            }
            aggregatedSteps[index].titles[language] = step.title || "";
            aggregatedSteps[index].subtitles[language] =
              step.descriptions || "";
            aggregatedSteps[index].req_status[language] = step.req_status || "";
          });
        }
      });

      //@ts-ignore
      setOnBoardSteps(aggregatedSteps);
    }
  }, [
    setValue,
    QueryGDPRCookieData?.translations,
    QueryGDPRCookieData,
    GDPRBasicSectionData,
    GDPRMoreInfoSectionData,
  ]);

  const handleToggle = (property: keyof ToggleState) => {
    setToggles((prev) => ({
      ...prev,
      [property]: prev[property] === "on" ? "" : "on",
    }));
  };

  const [onBoardSteps, setOnBoardSteps] = useState<
    {
      [x: string]: any;
      titles: { [langId: string]: string };
      subtitles: { [langId: string]: string };
      req_status: { [langId: string]: string };
      image: string;
    }[]
  >([]);

  const handleAddOnBoardStep = () => {
    setOnBoardSteps([
      ...onBoardSteps,
      {
        titles: {},
        subtitles: {},
        req_status: {},
        image: "",
      },
    ]);
  };

  const handleDeleteOnBoardStep = (index: number) => {
    setOnBoardSteps(onBoardSteps.filter((_, i) => i !== index));
  };

  const handleChangeOnBoardStep = (
    index: number,
    field: "titles" | "subtitles" | "req_status" | "image",
    langId: string,
    value: any
  ) => {
    const updatedValues = [...onBoardSteps];

    if (field === "titles" || field === "subtitles" || field === "req_status") {
      updatedValues[index][field] = {
        ...updatedValues[index][field],
        [langId]: value,
      };
    } else {
      updatedValues[index][field] = value;
    }

    setOnBoardSteps(updatedValues);
  };
  const handleSelectItem = (value: any, inputType: string) => {
    setValue(inputType as any, value);
  };

  const { mutate: BecomeSellerStore, isPending: isUpdating } =
    useGDPRCookieSettingsStoreMutation();
  type GDPRCookieSettingsFormData = Record<string, string | undefined>;

  const onSubmit = async (values: GDPRCookieSettingsFormData) => {
    const gdpr_basic_section = {
      com_gdpr_title: values.com_gdpr_title_df,
      com_gdpr_message: values.com_gdpr_message_df,
      com_gdpr_more_info_label: values.com_gdpr_more_info_label_df,
      com_gdpr_more_info_link: values.com_gdpr_more_info_link,
      com_gdpr_accept_label: values.com_gdpr_accept_label_df,
      com_gdpr_decline_label: values.com_gdpr_decline_label_df,
      com_gdpr_manage_label: values.com_gdpr_manage_label_df,
      com_gdpr_manage_title: values.com_gdpr_manage_title_df,
      com_gdpr_expire_date: values.com_gdpr_expire_date,
      com_gdpr_show_delay: values.com_gdpr_show_delay,
      com_gdpr_enable_disable: toggles.com_gdpr_enable_disable,
      com_gdpr_can_reject_all: toggles.com_gdpr_can_reject_all,
    };

    const gdpr_more_info_section = {
      section_title: values.section_title_df,
      section_details: values.section_details_df,
      steps: onBoardSteps.map(({ titles, subtitles, req_status }) => ({
        title: titles.df,
        descriptions: subtitles.df,
        req_status: req_status.df,
      })),
    };

    const translations = multiLangData.map((lang) => ({
      language_code: lang.id,
      content: {
        gdpr_basic_section: {
          com_gdpr_title: values[`com_gdpr_title_${lang.id}`],
          com_gdpr_message: values[`com_gdpr_message_${lang.id}`],
          com_gdpr_more_info_label:
            values[`com_gdpr_more_info_label_${lang.id}`],
          com_gdpr_more_info_link: values[`com_gdpr_more_info_link_${lang.id}`],
          com_gdpr_accept_label: values[`com_gdpr_accept_label_${lang.id}`],
          com_gdpr_decline_label: values[`com_gdpr_decline_label_${lang.id}`],
          com_gdpr_manage_label: values[`com_gdpr_manage_label_${lang.id}`],
          com_gdpr_manage_title: values[`com_gdpr_manage_title_${lang.id}`],
          com_gdpr_expire_date: values[`com_gdpr_expire_date_${lang.id}`],
          com_gdpr_show_delay: values[`com_gdpr_show_delay_${lang.id}`],
          agree_button_title: values[`agree_button_title_${lang.id}`],
        },
        gdpr_more_info_section: {
          section_title: values[`section_title_${lang.id}`],
          section_details: values[`section_details_${lang.id}`],
          steps: onBoardSteps.map(({ titles, subtitles, req_status }) => ({
            title: titles[lang.id] || titles.df,
            descriptions: subtitles[lang.id] || subtitles.df,
            req_status: req_status[lang.id] || req_status.df,
          })),
        },
      },
    }));

    const content = {
      gdpr_basic_section,
      gdpr_more_info_section,
    };

    const submissionData = {
      id: QueryGDPRCookieData?.id ? QueryGDPRCookieData?.id : 0,
      content,
      translations,
    };
    return BecomeSellerStore(
      { ...(submissionData as any) },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div>
      {isPending ? (
        <CardSkletonLoader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Tabs defaultValue="df" className="">
              <Card className="mt-4 ">
                <CardContent className="p-0 md:p-4">
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
              <Card className="mt-4">
                <CardContent className="p-2 md:p-6">
                  <div dir={dir} className="">
                    <h1 className="text-lg font-medium mb-4">
                      GDPR Compliance Settings
                    </h1>
                    <div>
                      {multiLangData.map((lang) => {
                        return (
                          <TabsContent key={lang.id} value={lang.id}>
                            <div className="">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                                <div className="space-y-4">
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span> Title ({lang.label})</span>
                                    </p>
                                    <Input
                                      id={`com_gdpr_title_${lang.id}`}
                                      {...register(
                                        `com_gdpr_title_${lang.id}` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>Message ({lang.label})</span>
                                    </p>
                                    <Textarea
                                      id={`com_gdpr_message_${lang.id}`}
                                      {...register(
                                        `com_gdpr_message_${lang.id}` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input min-h-[200px]"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>Expire Date</span>
                                    </p>

                                    <Controller
                                      name="com_gdpr_expire_date"
                                      control={control}
                                      defaultValue={
                                        GDPRBasicSectionData?.com_gdpr_expire_date ??
                                        ""
                                      }
                                      render={({ field }) => {
                                        let selectedDate: Date | null = null;

                                        if (field.value) {
                                          const parsed = new Date(field.value);
                                          selectedDate = isValid(parsed)
                                            ? parsed
                                            : null;
                                        }

                                        return (
                                          <CustomSingleDatePicker
                                            label=""
                                            selectedDate={selectedDate}
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
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>Show Delay</span>
                                    </p>
                                    <Input
                                      type="number"
                                      id={`com_gdpr_show_delay`}
                                      {...register(
                                        `com_gdpr_show_delay` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      min={0}
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="grid grid-cols-3 gap-4 pb-4 md:pb-0">
                                    <p className="col-span-2 text-sm font-medium mb-1">
                                      GDPR Enable/Disable
                                    </p>
                                    <Switch
                                      dir="ltr"
                                      checked={
                                        toggles.com_gdpr_enable_disable === "on"
                                      }
                                      onCheckedChange={() =>
                                        handleToggle("com_gdpr_enable_disable")
                                      }
                                    />
                                  </div>
                                  
                                </div>

                                <div className="space-y-4">
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>
                                        More Info Label ({lang.label})
                                      </span>
                                    </p>
                                    <Input
                                      id={`com_gdpr_more_info_label_${lang.id}`}
                                      {...register(
                                        `com_gdpr_more_info_label_${lang.id}` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>More Info Link</span>
                                    </p>
                                    <Input
                                      id={`com_gdpr_more_info_link`}
                                      {...register(
                                        `com_gdpr_more_info_link` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>Accept Label ({lang.label})</span>
                                    </p>
                                    <Input
                                      id={`com_gdpr_accept_label_${lang.id}`}
                                      {...register(
                                        `com_gdpr_accept_label_${lang.id}` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>Decline Label ({lang.label})</span>
                                    </p>
                                    <Input
                                      id={`com_gdpr_decline_label_${lang.id}`}
                                      {...register(
                                        `com_gdpr_decline_label_${lang.id}` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>Manage Label ({lang.label})</span>
                                    </p>
                                    <Input
                                      id={`com_gdpr_manage_label_${lang.id}`}
                                      {...register(
                                        `com_gdpr_manage_label_${lang.id}` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                      <span>Manage Title ({lang.label})</span>
                                    </p>
                                    <Input
                                      id={`com_gdpr_manage_title_${lang.id}`}
                                      {...register(
                                        `com_gdpr_manage_title_${lang.id}` as keyof GDPRCookieSettingsFormData
                                      )}
                                      className="app-input"
                                      placeholder="Enter value"
                                    />
                                  </div>
                                  <div className="grid grid-cols-3 gap-4 pb-4 md:pb-0">
                                    <p className="col-span-2 text-sm font-medium mb-1">
                                      GDPR Can Reject All
                                    </p>
                                    <Switch
                                      dir="ltr"
                                      checked={
                                        toggles.com_gdpr_can_reject_all === "on"
                                      }
                                      onCheckedChange={() =>
                                        handleToggle("com_gdpr_can_reject_all")
                                      }
                                    />
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
                      GDPR Data Protection Section
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
                                  id={`section_title_${lang.id}`}
                                  {...register(
                                    `section_title_${lang.id}` as keyof GDPRCookieSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>
                              <div className="mb-4">
                                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span> Description ({lang.label})</span>
                                  <div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-custom-dark-blue">
                                          <p className="p-1 text-sm font-medium">
                                            Please provide description{" "}
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
                                  id={`section_details_${lang.id}`}
                                  {...register(
                                    `section_details_${lang.id}` as keyof GDPRCookieSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>

                              <div className="w-full text-sm font-semibold flex items-center justify-between ">
                                <h1 className="text-lg font-medium mb-0 md:mb-4">
                                  Data Protection Steps
                                </h1>
                                <span
                                  onClick={handleAddOnBoardStep}
                                  className="flex items-center cursor-pointer bg-blue-50 border border-blue-500 text-blue-500 text-sm font-bold shadow-2xl px-2 py-2 rounded hover:bg-blue-500 hover:text-white"
                                >
                                  Add more
                                </span>
                              </div>
                              <div className="">
                                {onBoardSteps.map((value, index) => (
                                  <div
                                    key={index}
                                    className="my-4 flex items-end w-full gap-4 border-t md:border-0"
                                  >
                                    <div className="grid grid-cols-1 w-full gap-2 mr-0 md:mr-6 ">
                                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 ">
                                        <div className="w-full">
                                          <p className="text-sm font-medium mb-1 ">
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
                                        <p className="text-sm font-medium mb-1 ">
                                          Message
                                        </p>
                                        <Textarea
                                          value={
                                            value?.subtitles[lang.id] || ""
                                          }
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
                                      <div className="col-span-2">
                                        <p className="text-sm font-medium mb-1 ">
                                          Status
                                        </p>
                                        <Controller
                                          control={control}
                                          name={`req_status_${index}_${lang.id}`}
                                          render={({ field }) => (
                                            <>
                                              <AppSelect
                                                value={value?.req_status?.[lang.id] || ""}
                                                onSelect={(value) => {
                                                  field.onChange(value);
                                                  handleChangeOnBoardStep(
                                                    index,
                                                    "req_status",
                                                    lang.id,
                                                    value
                                                  );
                                                }}
                                                groups={StatusList}
                                                hideNone
                                              />
                                            </>
                                          )}
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
            </Tabs>
          </div>

          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton IsLoading={isUpdating} AddLabel="Save Changes" />
          </Card>
        </form>
      )}
    </div>
  );
};

export default GDPRCookieSettingsForm;
