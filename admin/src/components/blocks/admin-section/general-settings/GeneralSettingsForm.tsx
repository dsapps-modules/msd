"use client";
import Loader from "@/components/molecules/Loader";
import multiLang from "@/components/molecules/multiLang.json";
import { SubmitButton } from "@/components/blocks/shared";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import {
  Card,
  CardContent,
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import {
  useGeneralSettingsQuery,
  useGeneralSettingsStoreMutation,
} from "@/modules/admin-section/general-settings/general-settings.action";
import {
  GeneralSettingsFormData,
  generalSettingsSchema,
} from "@/modules/admin-section/general-settings/general-settings.schema";

import CloudIcon from "@/assets/icons/CloudIcon";
import GlobalImageLoader from "@/lib/imageLoader";
import { useGeneralQuery } from "@/modules/common/com/com.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import moment from "moment-timezone";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppSearchSelect } from "../../common/AppSearchSelect";
import PhotoUploadModal from "../../shared/PhotoUploadModal";
import CardSkletonLoader from "@/components/molecules/CardSkletonLoader";

type ToggleState = {
  emailVerification: string;
  loginOTP: string;
  maintenanceMode: string;
};

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
const GeneralSettingsForm = ({ data }: any) => {
  const t = useTranslations();
  const localeMain = useLocale();
  const multiLangData = useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const { watch, control, register, setValue, handleSubmit } =
    useForm<GeneralSettingsFormData>({
      resolver: zodResolver(generalSettingsSchema),
    });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [lastSelectedImages, setLastSelectedImages] = useState<any>(null);
  const [lastSelectedImages2, setLastSelectedImages2] = useState<any>(null);
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");
  const [errorImagesMessage, setImagesErrorMessage] = useState<string>("");
  const [errorImagesMessage2, setImagesErrorMessage2] = useState<string>("");

  const [toggles, setToggles] = useState<ToggleState>({
    emailVerification: "",
    loginOTP: "",
    maintenanceMode: "",
  });

  const timeZoneList = moment.tz.names().map((zone) => ({
    label: zone.replace(/_/g, " "),
    value: zone,
  }));

  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
  };

  const { general, refetch: generalRefetch } = useGeneralQuery({
    language: localeMain,
  });

  const {
    generalSettingsData,
    refetch,
    isFetching,
    isPending: isQuerying,
  } = useGeneralSettingsQuery({});
  const QueryGeneralSettingsData = useMemo(
    () => (generalSettingsData as any) || [],
    [generalSettingsData]
  );
  useEffect(() => {
    let GeneralSettingsMessage = QueryGeneralSettingsData?.message;
    if (GeneralSettingsMessage) {
      setValue("sub_title_df", GeneralSettingsMessage?.com_site_subtitle ?? "");
      setValue(
        "contact_number_df",
        GeneralSettingsMessage?.com_site_contact_number ?? ""
      );
      setValue(
        "street_address_df",
        GeneralSettingsMessage?.com_site_full_address ?? ""
      );
      setValue(
        "footer_copyright_df",
        GeneralSettingsMessage?.com_site_footer_copyright ?? ""
      );
      setValue(
        "website_url",
        GeneralSettingsMessage?.com_site_website_url ?? ""
      );
      setValue("email", GeneralSettingsMessage?.com_site_email ?? "");
      setValue(
        "com_site_time_zone",
        GeneralSettingsMessage?.com_site_time_zone ?? ""
      );

      GeneralSettingsMessage?.translations?.forEach((translation: any) => {
        setValue(
          `title_${translation.language}` as keyof GeneralSettingsFormData,
          translation.com_site_title ?? ""
        );
        setValue(
          `sub_title_${translation.language}` as keyof GeneralSettingsFormData,
          translation.com_site_subtitle ?? ""
        );
        setValue(
          `contact_number_${translation.language}` as keyof GeneralSettingsFormData,
          translation.com_site_contact_number ?? ""
        );
        setValue(
          `street_address_${translation.language}` as keyof GeneralSettingsFormData,
          translation.com_site_full_address ?? ""
        );
        setValue(
          `footer_copyright_${translation.language}` as keyof GeneralSettingsFormData,
          translation.com_site_footer_copyright ?? ""
        );
        setValue(
          `website_url_${translation.language}` as keyof GeneralSettingsFormData,
          translation.com_site_website_url ?? ""
        );
        setValue(
          `email_${translation.language}` as keyof GeneralSettingsFormData,
          translation.com_site_email ?? ""
        );
      });

      if (GeneralSettingsMessage?.com_site_logo) {
        setLastSelectedImages({
          image_id: GeneralSettingsMessage?.com_site_logo
            ? GeneralSettingsMessage?.com_site_logo
            : "",
          img_url: GeneralSettingsMessage?.com_site_logo_image_url
            ? GeneralSettingsMessage?.com_site_logo_image_url
            : "/images/no-image.png",
          name: "com_site_logo",
        });
      }
      if (GeneralSettingsMessage?.com_site_white_logo) {
        setLastSelectedImages2({
          image_id: GeneralSettingsMessage?.com_site_white_logo
            ? GeneralSettingsMessage?.com_site_white_logo
            : "",
          img_url: GeneralSettingsMessage?.com_site_white_logo_image_url
            ? GeneralSettingsMessage?.com_site_white_logo_image_url
            : "/images/no-image.png",
          name: "com_site_white_logo",
        });
      }
      if (GeneralSettingsMessage?.com_site_favicon) {
        setLastSelectedLogo({
          image_id: GeneralSettingsMessage?.com_site_favicon
            ? GeneralSettingsMessage?.com_site_favicon
            : "",
          img_url: GeneralSettingsMessage?.com_site_favicon_image_url
            ? GeneralSettingsMessage?.com_site_favicon_image_url
            : "/images/no-image.png",
          name: "com_site_favicon ",
        });
      }
      setToggles({
        emailVerification:
          GeneralSettingsMessage?.com_user_email_verification || "",
        loginOTP: GeneralSettingsMessage?.com_user_login_otp || "",
        maintenanceMode: GeneralSettingsMessage?.com_maintenance_mode || "",
      });
      setLogoErrorMessage("");
      setErrorMessage("");
    }
  }, [QueryGeneralSettingsData, setValue]);

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
  const handleSaveImages2 = (images: UploadedImage[]) => {
    setLastSelectedImages2(images[0]);
    const dimensions = images[0].dimensions ?? "";
    const [width, height] = dimensions
      .split(" x ")
      .map((dim) => parseInt(dim.trim(), 10));
    const aspectRatio = width / height;

    if (Math.abs(aspectRatio - 1 / 1) < 0.01) {
      setImagesErrorMessage2("");
      return true;
    } else {
      setImagesErrorMessage2("Image must have a 1:1 aspect ratio.");
      return false;
    }
  };

  const removePreview2 = () => {
    setLastSelectedImages2(null);
    setImagesErrorMessage2("");
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

  const handleToggle = (property: keyof ToggleState) => {
    setToggles((prev) => {
      const newState = { ...prev };

      if (property === "emailVerification") {
        newState.emailVerification =
          prev.emailVerification === "on" ? "" : "on";
        if (newState.emailVerification === "on") {
          newState.loginOTP = "";
        }
      } else if (property === "loginOTP") {
        newState.loginOTP = prev.loginOTP === "on" ? "" : "on";
        if (newState.loginOTP === "on") {
          newState.emailVerification = "";
        }
      } else {
        newState[property] = prev[property] === "on" ? "" : "on";
      }

      return newState;
    });
  };

  const { mutate: GeneralSettingsStore, isPending } =
    useGeneralSettingsStoreMutation();
  const onSubmit = async (values: GeneralSettingsFormData) => {
    const defaultData = {
      com_site_title: values.title_df,
      com_site_subtitle: values.sub_title_df,
      com_site_contact_number: values.contact_number_df,
      com_site_full_address: values.street_address_df,
      com_site_footer_copyright: values.footer_copyright_df,
      com_site_website_url: values.website_url,
      com_site_email: values.email,
      com_site_time_zone: values.com_site_time_zone,
      com_user_email_verification: toggles.emailVerification,
      com_user_login_otp: toggles.loginOTP,
      com_maintenance_mode: toggles.maintenanceMode,
    };

    const translations = multiLangData
      .filter((lang) => (values as any)[`title_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        com_site_title: (values as any)[`title_${lang.id}`],
        com_site_subtitle: (values as any)[`sub_title_${lang.id}`],
        com_site_contact_number: (values as any)[`contact_number_${lang.id}`],
        com_site_full_address: (values as any)[`street_address_${lang.id}`],
        com_site_footer_copyright: (values as any)[
          `footer_copyright_${lang.id}`
        ],
        com_site_website_url: (values as any)[`website_url_${lang.id}`],
        com_site_email: (values as any)[`email_${lang.id}`],
      }));

    const submissionData = {
      ...defaultData,
      id: QueryGeneralSettingsData?.id ? QueryGeneralSettingsData?.id : 0,
      com_site_logo: lastSelectedImages ? lastSelectedImages?.image_id : "",
      com_site_white_logo: lastSelectedImages2
        ? lastSelectedImages2?.image_id
        : "",
      com_site_favicon: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations,
      multipart: true,
    };
    return GeneralSettingsStore(
      { ...(submissionData as any) },
      {
        onSuccess: () => {
          refetch();
          generalRefetch();
        },
      }
    );
  };

  const trigger = (
    <div className="hover:cursor-pointer">
      {lastSelectedImages?.img_url ? (
        <div className="relative w-32 h-32 group border dark:border-gray-500 rounded flex items-center justify-center">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedImages?.img_url}
            alt={lastSelectedImages?.name as string}
            width={128}
            height={128}
            className="object-contain max-w-full max-h-full"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FFFFFFE5] h-20 border-l border-r border-b w-full rounded-b opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center justify-center">
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
            <p className="mt-2 text-blue-500 text-xs font-medium">
              {t("common.drag_and_drop")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
  const trigger2 = (
    <div className="hover:cursor-pointer">
      {lastSelectedImages2?.img_url ? (
        <div className="relative w-32 h-32 group border dark:border-gray-500 rounded flex items-center justify-center">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedImages2?.img_url}
            alt={lastSelectedImages2?.name as string}
            width={128}
            height={128}
            className="  object-contain max-w-full max-h-full"
          />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FFFFFFE5] py-2 border-l border-r border-b w-full rounded-b opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center justify-center">
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
            <p className="mt-2 text-blue-500 text-xs font-medium">
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
        <div className="relative w-32 h-32 group border dark:border-gray-500 rounded flex items-center justify-center">
          <Image
            loader={GlobalImageLoader}
            src={lastSelectedLogo?.img_url}
            alt={lastSelectedLogo?.name as string}
            width={128}
            height={128}
            className="object-contain max-w-full max-h-full"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FFFFFFE5] py-2 border-l border-r border-b w-full rounded-b opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center justify-center">
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
    if (!isQuerying) refetch();
  }, [isQuerying, refetch]);

  return (
    <div>
      {isQuerying ? (
        <CardSkletonLoader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mt-4">
            <CardContent className="p-2 md:p-4 lg:p-4">
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
                <div
                  dir={dir}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 "
                >
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
                                    <TooltipContent
                                      side="right"
                                      align="center"
                                      sideOffset={4}
                                      avoidCollisions={false}
                                      className="bg-custom-dark-blue dark:bg-white max-w-sm"
                                    >
                                      <p className="p-1 text-sm">
                                        The main title of your website that
                                        appears in browser tabs and search
                                        results.
                                        {lang.label !== "Default" && (
                                          <span className="block mt-1 text-xs">
                                            Provide the localized version in{" "}
                                            {lang.label}
                                          </span>
                                        )}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Input
                              id={`title_${lang.id}`}
                              {...register(
                                `title_${lang.id}` as keyof GeneralSettingsFormData
                              )}
                              className="app-input"
                              placeholder="Enter value"
                            />
                          </div>

                          <div className="mb-4">
                            <div className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>Sub Title ({lang.label})</span>
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
                                      className="bg-custom-dark-blue dark:bg-white max-w-sm"
                                    >
                                      <p className="p-1 text-sm">
                                        A brief description that appears under
                                        your main title in search results.
                                        {lang.label !== "Default" && (
                                          <span className="block mt-1 text-xs">
                                            Localize this for {lang.label}{" "}
                                            language
                                          </span>
                                        )}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Input
                              id={`sub_title_${lang.id}`}
                              {...register(
                                `sub_title_${lang.id}` as keyof GeneralSettingsFormData
                              )}
                              className="app-input"
                              placeholder="Enter value"
                            />
                          </div>
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>Contact Number ({lang.label})</span>
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
                                      className="bg-custom-dark-blue dark:bg-white max-w-sm"
                                    >
                                      <p className="p-1 text-sm">
                                        The primary phone number displayed to
                                        visitors.
                                        {lang.label !== "Default" && (
                                          <span className="block mt-1 text-xs">
                                            Include country code for
                                            international accessibility
                                          </span>
                                        )}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Input
                              id={`contact_number_${lang.id}`}
                              {...register(
                                `contact_number_${lang.id}` as keyof GeneralSettingsFormData
                              )}
                              className="app-input"
                              placeholder="Enter value"
                            />
                          </div>
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>Address ({lang.label})</span>
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
                                      className="bg-custom-dark-blue dark:bg-white max-w-sm"
                                    >
                                      <p className="p-1 text-sm">
                                        Your physical business address for
                                        location verification.
                                        {lang.label !== "Default" && (
                                          <span className="block mt-1 text-xs">
                                            Use local address format for{" "}
                                            {lang.label} region
                                          </span>
                                        )}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Input
                              id={`street_address_${lang.id}`}
                              {...register(
                                `street_address_${lang.id}` as keyof GeneralSettingsFormData
                              )}
                              className="app-input"
                              placeholder="Enter value"
                            />
                          </div>

                          <div className="mb-4">
                            <div className="text-sm font-medium mb-1 flex items-center gap-2">
                              <span>Footer Copyright ({lang.label})</span>
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
                                      className="bg-custom-dark-blue dark:bg-white max-w-sm"
                                    >
                                      <p className="p-1 text-sm">
                                        Copyright text displayed in the website
                                        footer (include © and year).
                                        {lang.label !== "Default" && (
                                          <span className="block mt-1 text-xs">
                                            Localize the copyright statement for{" "}
                                            {lang.label}
                                          </span>
                                        )}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <Input
                              id={`footer_copyright_${lang.id}`}
                              {...register(
                                `footer_copyright_${lang.id}` as keyof GeneralSettingsFormData
                              )}
                              className="app-input"
                              placeholder="Enter value"
                            />
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium mb-1">
                              Website URL
                            </p>
                            <Input
                              id="website_url"
                              {...register(
                                "website_url" as keyof GeneralSettingsFormData
                              )}
                              className="app-input"
                              placeholder="Enter value"
                            />
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium mb-1">Email</p>
                            <Input
                              id="email"
                              {...register(
                                "email" as keyof GeneralSettingsFormData
                              )}
                              className="app-input"
                              placeholder="Enter value"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">
                              {t("label.com_site_time_zone")}
                            </p>
                            <Controller
                              control={control}
                              name="com_site_time_zone"
                              defaultValue={
                                QueryGeneralSettingsData?.message
                                  ?.com_site_time_zone ?? ""
                              }
                              render={({ field }) => (
                                <AppSearchSelect
                                  value={field.value}
                                  onSelect={(value) => {
                                    field.onChange(value);
                                    handleSelectItem(
                                      value,
                                      "com_site_time_zone"
                                    );
                                  }}
                                  groups={timeZoneList}
                                  hideNone
                                />
                              )}
                            />
                          </div>
                        </TabsContent>
                      );
                    })}
                  </div>

                  <div className="mt-2">
                    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
                      <div className="">
                        <div className="text-sm font-medium flex items-center gap-2 mb-1">
                          <span>Primary Logo</span>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-custom-dark-blue w-96">
                                  <p className="p-1 text-sm">
                                    {t("tooltip.primary_brand_logo")}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="relative flex align-start gap-4 w-full">
                          <div className="relative w-32">
                            <PhotoUploadModal
                              trigger={trigger}
                              isMultiple={false}
                              onSave={handleSaveImages}
                              usageType="general_settings"
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
                      <div className="">
                        <div className="text-sm font-medium flex items-center gap-2 mb-1">
                          <span>Light Mode Logo</span>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-custom-dark-blue w-96">
                                  <p className="p-1 text-sm">
                                    {t("tooltip.light_mode_logo")}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="relative flex align-start gap-4 w-full">
                          <div className="relative w-32">
                            <PhotoUploadModal
                              trigger={trigger2}
                              isMultiple={false}
                              onSave={handleSaveImages2}
                              usageType="general_settings"
                              selectedImage={lastSelectedImages2}
                            />
                            {lastSelectedImages2?.image_id && (
                              <Cancel
                                customClass="absolute top-0 right-0 m-1"
                                onClick={(event: {
                                  stopPropagation: () => void;
                                }) => {
                                  event.stopPropagation();
                                  removePreview2();
                                }}
                              />
                            )}
                            {errorImagesMessage2 && (
                              <p className="text-red-500 text-sm mt-1">
                                {errorImagesMessage2}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-sm font-medium flex items-center gap-2 mb-1">
                          <span>Favicon</span>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-custom-dark-blue w-96">
                                  <p className="p-1 text-sm">
                                    {t("tooltip.browser_tab_icon")}
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
                              usageType="general_settings"
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
                    <div className="mt-6">
                      <div className="grid grid-cols-2 lg:grid-cols-4">
                        <p className="text-sm font-medium mb-1">
                          Email verification
                        </p>
                        <Switch
                          dir="ltr"
                          checked={toggles.emailVerification === "on"}
                          onCheckedChange={() =>
                            handleToggle("emailVerification")
                          }
                        />
                      </div>
                      <div className="my-4 grid grid-cols-2 lg:grid-cols-4">
                        <p className="text-sm font-medium mb-1">Login OTP</p>
                        <Switch
                          dir="ltr"
                          checked={toggles.loginOTP === "on"}
                          onCheckedChange={() => handleToggle("loginOTP")}
                        />
                      </div>
                      <div className=" grid grid-cols-2 lg:grid-cols-4">
                        <p className="text-sm font-medium mb-1">
                          Maintenance Mode
                        </p>
                        <Switch
                          dir="ltr"
                          checked={toggles.maintenanceMode === "on"}
                          onCheckedChange={() =>
                            handleToggle("maintenanceMode")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
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

export default GeneralSettingsForm;
