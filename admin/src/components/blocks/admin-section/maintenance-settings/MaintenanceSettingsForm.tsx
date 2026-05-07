"use client";
import Loader from "@/components/molecules/Loader";
import multiLang from "@/components/molecules/multiLang.json";
import { SubmitButton } from "@/components/blocks/shared";
import CustomSingleDatePicker from "@/components/blocks/common/CustomSingleDatePicker";
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
import GlobalImageLoader from "@/lib/imageLoader";
import {
  useMaintenanceSettingsQuery,
  useMaintenanceSettingsStoreMutation,
} from "@/modules/admin-section/maintenance-settings/maintenance-settings.action";
import {
  MaintenanceSettingsFormData,
  maintenanceSettingsSchema,
} from "@/modules/admin-section/maintenance-settings/maintenance-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValid } from "date-fns";
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

const MaintenanceSettingsForm = () => {
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
    formState: { errors },
  } = useForm<MaintenanceSettingsFormData>({
    resolver: zodResolver(maintenanceSettingsSchema),
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");

  const { maintenanceSettingsData, refetch } =
    useMaintenanceSettingsQuery({});
  const QueryMaintenanceSettingsData = useMemo(
    () => (maintenanceSettingsData as any) || [],
    [maintenanceSettingsData]
  );
  let MaintenanceSettingsMessage = QueryMaintenanceSettingsData?.message;

  useEffect(() => {
    if (MaintenanceSettingsMessage) {
      setValue("title_df", MaintenanceSettingsMessage?.com_maintenance_title);
      setValue(
        "description_df",
        MaintenanceSettingsMessage?.com_maintenance_description
      );
      MaintenanceSettingsMessage?.translations?.forEach((translation: any) => {
        setValue(
          `title_${translation.language}` as keyof MaintenanceSettingsFormData,
          translation.com_maintenance_title
        );
        setValue(
          `description_${translation.language}` as keyof MaintenanceSettingsFormData,
          translation.com_maintenance_description
        );
      });

      if (MaintenanceSettingsMessage?.com_maintenance_image) {
        setLastSelectedLogo({
          image_id: MaintenanceSettingsMessage?.com_maintenance_image
            ? MaintenanceSettingsMessage?.com_maintenance_image
            : "",
          img_url: MaintenanceSettingsMessage?.com_maintenance_image_url
            ? MaintenanceSettingsMessage?.com_maintenance_image_url
            : "/images/no-image.png",
          name: "logo",
        });
      }
    }
  }, [QueryMaintenanceSettingsData, setValue, MaintenanceSettingsMessage]);

  const handleSaveLogo = (images: UploadedImage[]) => {
    setLastSelectedLogo(images[0]);
    const dimensions = images[0].dimensions ?? ""
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

  const { mutate: MaintenanceSettingsStore, isPending } =
    useMaintenanceSettingsStoreMutation();
  const onSubmit = async (values: MaintenanceSettingsFormData) => {
    const defaultData = {
      com_maintenance_title: values.title_df,
      com_maintenance_description: values.description_df,
      com_maintenance_start_date: values.start_date,
      com_maintenance_end_date: values.end_date,
    };

    const translations = multiLangData
      .filter((lang) => (values as any)[`title_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        title: (values as any)[`title_${lang.id}`],
        description: (values as any)[`description_${lang.id}`],
      }));

    const submissionData = {
      ...defaultData,
      id: QueryMaintenanceSettingsData?.id
        ? QueryMaintenanceSettingsData?.id
        : 0,
      com_maintenance_image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations,
      multipart: true,
    };
    return MaintenanceSettingsStore(
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
        <div className="relative w-48 h-32 group">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedLogo?.img_url}
            alt={lastSelectedLogo?.name as string}
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
                                id={`title_${lang.id}`}
                                {...register(
                                  `title_${lang.id}` as keyof MaintenanceSettingsFormData
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
                                id={`description_${lang.id}`}
                                {...register(
                                  `description_${lang.id}` as keyof MaintenanceSettingsFormData
                                )}
                                className="app-input"
                                placeholder="Enter value"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mb-4">
                              <div className="mb-4">
                                <p className="text-sm font-medium mb-1">
                                  Maintenance Start Time
                                </p>
                                <Controller
                                  name="start_date"
                                  control={control}
                                  defaultValue={
                                    QueryMaintenanceSettingsData?.message
                                      ?.com_maintenance_start_date
                                      ? new Date(
                                          QueryMaintenanceSettingsData.message.com_maintenance_start_date
                                        )
                                      : null
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
                                          field.onChange(date); // ✅ Don't format to string
                                        }}
                                      />
                                    );
                                  }}
                                />

                                {errors.start_date && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.start_date.message}
                                  </p>
                                )}
                              </div>
                              <div className="mb-4">
                                <p className="text-sm font-medium mb-1">
                                  Maintenance End Time
                                </p>
                                <Controller
                                  name="end_date"
                                  control={control}
                                  defaultValue={
                                    QueryMaintenanceSettingsData?.message
                                      ?.com_maintenance_end_date
                                      ? new Date(
                                          QueryMaintenanceSettingsData.message.com_maintenance_end_date
                                        )
                                      : null
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
                                          field.onChange(date); // ✅ Don't format to string
                                        }}
                                      />
                                    );
                                  }}
                                />
                                {errors.end_date && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.end_date.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium mb-1 flex items-center gap-2">
                                <span>{t("label.logo")}</span>
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
                                <div className="relative w-48">
                                  <PhotoUploadModal
                                    trigger={triggerLogo}
                                    isMultiple={false}
                                    onSave={handleSaveLogo}
                                    usageType="maintenance_settings"
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
                                    <p className=" text-red-500 text-sm mt-1">
                                      {errorLogoMessage}
                                    </p>
                                  )}
                                </div>
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

export default MaintenanceSettingsForm;
