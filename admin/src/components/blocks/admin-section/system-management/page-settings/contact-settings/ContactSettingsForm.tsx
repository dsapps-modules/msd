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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";

import CloudIcon from "@/assets/icons/CloudIcon";
import Facebook from "@/assets/icons/Facebook";
import Instagram from "@/assets/icons/Instagram";
import Linkedin from "@/assets/icons/Linkedin";
import Twitter from "@/assets/icons/Twitter";
import AppPhoneNumberInput from "@/components/blocks/common/AppPhoneNumberInput";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import PhotoUploadModal from "@/components/blocks/shared/PhotoUploadModal";
import { TagsInput } from "@/components/ui/tags-input";
import GlobalImageLoader from "@/lib/imageLoader";
import { useGoogleMapForAllQuery } from "@/modules/admin-section/google-map-settings/google-map-settings.action";
import { useAboutPageUpdateMutation } from "@/modules/admin-section/system-management/page-settings/contact-settings/contact-settings.action";
import {
  ContactSettingsFormData,
  contactSettingsSchema,
} from "@/modules/admin-section/system-management/page-settings/contact-settings/contact-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  DrawingManager,
  GoogleMap,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { Info, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

const ContactSettingsForm = ({ data }: any) => {
  const t = useTranslations();
  const multiLangData = useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const mapContainerStyle = {
    width: "100%",
    height: "350px",
  };
  const { GoogleMapData } = useGoogleMapForAllQuery({});
  const GoogleMapSettingsMessage = (GoogleMapData as any)?.message;
  const [googleMapKey, setGoogleMapKey] = useState("");

  useEffect(() => {
    if (GoogleMapSettingsMessage?.com_google_map_enable_disable == "on") {
      setGoogleMapKey(GoogleMapSettingsMessage?.com_google_map_api_key);
    }
  }, [
    GoogleMapSettingsMessage?.com_google_map_enable_disable,
    GoogleMapSettingsMessage?.com_google_map_api_key,
  ]);

  const [markerPosition, setMarkerPosition] = useState({
    lat: 23.8103,
    lng: 90.4125,
  });
  const defaultCenter = { lat: 23.8103, lng: 90.4125 };
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(12);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [polygonCoords, setPolygonCoords] = useState<any>([]);
  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
        setZoom(12);

        setErrorMessage("");
      }
    }
  };

  const handlePolygonComplete = async (polygon: any) => {
    const path = polygon.getPath();
    const coordinates: { lat: number; lng: number }[] = [];

    for (let i = 0; i < path.getLength(); i++) {
      const coord = path.getAt(i).toJSON();
      coordinates.push(coord);
    }

    setPolygonCoords(coordinates);

    if (coordinates.length > 0) {
      const firstCoord = coordinates[0];
      setMarkerPosition({ lat: firstCoord.lat, lng: firstCoord.lng });
      const stateName = await fetchAddress(firstCoord.lat, firstCoord.lng);
      setValue("state_df", stateName);
    }
  };

  const handleMarkerDrag: any = async (event: {
    latLng: { lat: () => any; lng: () => any };
  }) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setErrorMessage("");
    const address = await fetchAddress(newLat, newLng);
    setMarkerPosition({ lat: newLat, lng: newLng });
    setValue("latitude", newLat);
    setValue("longitude", newLng);
    setValue("address", address);
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return "Address not found";
    } catch (error) {
      return "Error fetching address";
    }
  };

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSettingsFormData>({
    resolver: zodResolver(contactSettingsSchema),
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const QueryBecomeSellersData = useMemo(
    () => (data as any)?.data || [],
    [data]
  );

  const AboutSectionData =
    QueryBecomeSellersData?.content?.contact_form_section;

  const StorySectionData =
    QueryBecomeSellersData?.content?.contact_details_section;

  const MissionSectionData = QueryBecomeSellersData?.content?.map_section;

  useEffect(() => {
    if (QueryBecomeSellersData) {
      setValue("page_title_df", QueryBecomeSellersData?.title ?? "");
      setValue("meta_title_df", QueryBecomeSellersData?.meta_title ?? "");
      setValue(
        "meta_description_df",
        QueryBecomeSellersData?.meta_description ?? ""
      );
      const metaTagsArray = QueryBecomeSellersData?.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim());
      setValue("meta_keywords_df", metaTagsArray);
      setValue("status", QueryBecomeSellersData?.status ?? "");
      setValue("theme_name", QueryBecomeSellersData?.theme_name ?? "");

      if (AboutSectionData) {
        setValue("title_df", AboutSectionData?.title ?? "");
        setValue("subtitle_df", AboutSectionData?.subtitle ?? "");
      }
      if (StorySectionData) {
        setValue("address", StorySectionData.address ?? "");
        setValue("email", StorySectionData.email ?? "");
        setPhoneNumber(StorySectionData.phone ?? "");
        setValue("phone", StorySectionData.phone ?? "");
        setValue("website", StorySectionData.website ?? "");
        if (StorySectionData?.image !== null) {
          setLastSelectedLogo({
            image_id: StorySectionData?.image ? StorySectionData?.image : "",
            img_url: StorySectionData?.image_url
              ? StorySectionData?.image_url
              : "/images/no-image.png",
            name: " image",
          });
        }
      }

      if (MissionSectionData) {
        setMarkerPosition(MissionSectionData?.coordinates);
        setCenter(MissionSectionData?.coordinates);
      }

      if (QueryBecomeSellersData?.translations) {
        const aggregatedSteps: Array<{
          titles: Record<string, string>;
          subtitles: Record<string, string>;
          image: Record<string, string>;
        }> = [];

        Object.keys(QueryBecomeSellersData?.translations).forEach(
          (language) => {
            const translation = QueryBecomeSellersData?.translations[language];

            const tagsArray = translation?.meta_keywords
              ? translation.meta_keywords
                  .split(",")
                  .map((tag: string) => tag.trim())
              : [];

            setValue(
              `meta_keywords_${language}` as keyof ContactSettingsFormData,
              tagsArray
            );
            setValue(
              `page_title_${language}` as keyof ContactSettingsFormData,
              translation.title ?? ""
            );
            setValue(
              `meta_title_${language}` as keyof ContactSettingsFormData,
              translation.meta_title ?? ""
            );
            setValue(
              `meta_description_${language}` as keyof ContactSettingsFormData,
              translation.meta_description ?? ""
            );

            const AboutSectionDataT =
              translation?.content?.contact_form_section;
            if (AboutSectionDataT) {
              setValue(
                `title_${language}` as keyof ContactSettingsFormData,
                AboutSectionDataT?.title ?? ""
              );
              setValue(
                `subtitle_${language}` as keyof ContactSettingsFormData,
                AboutSectionDataT?.subtitle ?? ""
              );
            }

            const StorySectionDataT =
              QueryBecomeSellersData?.content?.contact_details_section;
            if (StorySectionDataT) {
              setValue(
                `story_title_${language}` as keyof ContactSettingsFormData,
                StorySectionDataT?.title ?? ""
              );
              setValue(
                `story_subtitle_${language}` as keyof ContactSettingsFormData,
                StorySectionDataT?.subtitle ?? ""
              );
              StorySectionDataT?.social?.forEach((step: any, index: any) => {
                if (!aggregatedSteps[index]) {
                  aggregatedSteps[index] = {
                    titles: {},
                    subtitles: {},
                    image: {},
                  };
                }
                aggregatedSteps[index].titles[language] = step.title || "";
                aggregatedSteps[index].subtitles["df"] = step.url || "";
                aggregatedSteps[index].image = step.icon || "";
              });
            }
          }
        );
        setOnBoardSteps(aggregatedSteps as any);
      }
    }
  }, [
    setValue,
    QueryBecomeSellersData?.translations,
    QueryBecomeSellersData,
    MissionSectionData,
    StorySectionData,
    AboutSectionData,
  ]);

  const handlePolygonEdit = (e: any) => {
    const newCoords = e
      .getPath()
      .getArray()
      .map((coord: any) => coord.toJSON());

    setPolygonCoords(newCoords);
    if (newCoords.length > 0) {
      const firstCoord = newCoords[0];
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: firstCoord }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const addressComponents = results[0].address_components;
          const stateComponent = addressComponents.find((comp) =>
            comp.types.includes("administrative_area_level_1")
          );

          if (stateComponent) {
            const stateName = stateComponent.long_name;
            setValue("state_df", stateName);
          }
        } else {
        }
      });
    }
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
    setLastSelectedLogo({
      image_id: "",
      img_url: "",
    });
    setLogoErrorMessage("");
  };

  const availableIcons = [
    {
      value: "Facebook",
      label: (
        <div className="flex items-center gap-2">
          <Facebook />
          <span>Facebook</span>
        </div>
      ),
    },
    {
      value: "Instagram",
      label: (
        <div className="flex items-center gap-2">
          <Instagram />
          <span>Instagram</span>
        </div>
      ),
    },
    {
      value: "Twitter",
      label: (
        <div className="flex items-center gap-2">
          <Twitter />
          <span>Twitter</span>
        </div>
      ),
    },
    {
      value: "Linkedin",
      label: (
        <div className="flex items-center gap-2">
          <Linkedin />
          <span>LinkedIn</span>
        </div>
      ),
    },
  ];

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

  const onSubmit = async (values: ContactSettingsFormData) => {
    const defaultData: any = {
      title: values.page_title_df,
      meta_title: values.meta_title_df,
      meta_description: values.meta_description_df,
      meta_keywords: (values.meta_keywords_df || []).join(", "),
    };
    if (values?.status !== "") {
      defaultData.status = values.status;
    }

    const contact_form_section = {
      title: values.title_df,
      subtitle: values.subtitle_df,
    };
    const contact_details_section = {
      address: values.address,
      phone: values.phone,
      email: values.email,
      website: values.website,
      image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      image_url: "",
      social: onBoardSteps.map(({ subtitles, image }) => ({
        url: subtitles.df,
        icon: image || "",
      })),
    };
    const map_section = {
      coordinates: markerPosition,
    };

    const translations = multiLangData.map((lang) => ({
      language_code: lang.id,
      title: (values as any)[`page_title_${lang.id}`],
      meta_title: (values as any)[`meta_title_${lang.id}`],
      meta_description: (values as any)[`meta_description_${lang.id}`],
      meta_keywords: ((values as any)[`meta_keywords_${lang.id}`] || []).join(
        ", "
      ),
      content: {
        contact_form_section: {
          title: (values as any)[`title_${lang.id}`],
          subtitle: (values as any)[`subtitle_${lang.id}`],
        },
        contact_details_section,
        map_section,
      },
    }));

    const content = {
      contact_form_section,
      contact_details_section,
      map_section,
    };

    const submissionData = {
      id: QueryBecomeSellersData?.id ? QueryBecomeSellersData?.id : 0,
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
    <div dir={dir}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Tabs defaultValue="df" className="">
            <div className="mt-4">
              <Card dir={dir}>
                <CardContent className="mt-4 p-4">
                  <TabsList
                    dir={dir}
                    className="flex justify-start bg-transparent"
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
                                id={`page_title_${lang.id}`}
                                {...register(
                                  `page_title_${lang.id}` as keyof ContactSettingsFormData
                                )}
                                className="app-input"
                                placeholder={t("place_holder.enter_title")}
                              />
                              {errors[
                                `page_title_${lang.id}` as keyof ContactSettingsFormData
                              ] && (
                                <p className="text-red-500 text-sm mt-1">
                                  {
                                    (errors as any)[`page_title_${lang.id}`]
                                      ?.message
                                  }
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
                                  `meta_title_${lang.id}` as keyof ContactSettingsFormData
                                )}
                                className="app-input"
                                placeholder={t("place_holder.enter_meta_title")}
                              />
                              {errors[
                                `meta_title_${lang.id}` as keyof ContactSettingsFormData
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
                                  `meta_description_${lang.id}` as keyof ContactSettingsFormData
                                )}
                                className="app-input"
                                placeholder={t(
                                  "place_holder.enter_meta_description"
                                )}
                              />
                              {errors[
                                `meta_description_${lang.id}` as keyof ContactSettingsFormData
                              ] && (
                                <p className="text-red-500 text-sm mt-1">
                                  {
                                    (errors as any)[
                                      `meta_description_${lang.id}`
                                    ]?.message
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
                                  `meta_keywords_${lang.id}` as keyof ContactSettingsFormData
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

              <Card dir={dir}>
                <CardContent className="mt-4 p-4">
                  <h1 className="text-lg md:text-2xl font-medium mb-4">
                    Contact Form Section
                  </h1>
                  <div>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div className="">
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
                                  id={`title_${lang.id}`}
                                  {...register(
                                    `title_${lang.id}` as keyof ContactSettingsFormData
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
                                  id={`subtitle_${lang.id}`}
                                  {...register(
                                    `subtitle_${lang.id}` as keyof ContactSettingsFormData
                                  )}
                                  className="app-input"
                                  placeholder="Enter value"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardContent className="p-2 md:p-6">
                <div dir={dir} className="">
                  <h1 className="text-lg md:text-2xl font-medium mb-4">
                    Contact Details Section
                  </h1>
                  <div>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                              <div>
                                <div className="mb-4">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span> Address</span>
                                  </p>
                                  <Input
                                    id={`address`}
                                    {...register(
                                      `address` as keyof ContactSettingsFormData
                                    )}
                                    className="app-input"
                                    placeholder="Enter value"
                                  />
                                </div>
                                <div className="mb-4">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span> Email</span>
                                  </p>
                                  <Input
                                    id={`email`}
                                    {...register(
                                      `email` as keyof ContactSettingsFormData
                                    )}
                                    className="app-input"
                                    placeholder="Enter value"
                                  />
                                </div>
                                <div className="mb-4">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span> Phone </span>
                                  </p>
                                  <AppPhoneNumberInput
                                    value={phoneNumber}
                                    onChange={(value) => {
                                      setPhoneNumber(value);
                                      setValue("phone", value);
                                    }}
                                  />
                                  {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {errors.phone?.message}
                                    </p>
                                  )}
                                </div>
                                <div className="mb-4">
                                  <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                    <span> Website</span>
                                  </p>
                                  <Input
                                    id={`website`}
                                    {...register(
                                      `website` as keyof ContactSettingsFormData
                                    )}
                                    className="app-input"
                                    placeholder="Enter value"
                                  />
                                </div>
                              </div>
                              <div className="">
                                <div className="">
                                  <p className="text-sm font-medium flex items-center gap-2 mb-2">
                                    <span> Contact Details Image</span>
                                  </p>
                                  <div className="relative flex align-start gap-4">
                                    <div className="relative w-32">
                                      <PhotoUploadModal
                                        trigger={triggerLogo}
                                        isMultiple={false}
                                        onSave={handleSaveLogo}
                                        usageType="contact_settings"
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
                            <div className="mt-8 w-full text-sm font-semibold flex items-center justify-between ">
                              <p className="text-lx font-semibold">Social</p>
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
                                  className="my-4 flex items-end w-full gap-2 md:gap-4"
                                >
                                  <div className="flex flex-col md:flex-row items-center w-full gap-4 mr-0 md:mr-6">
                                    <div className="flex items-center gap-8">
                                      <div className="flex flex-col items-start">
                                        <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                          Select Icon
                                        </p>

                                        <AppSelect
                                          value={value?.image || ""}
                                          onSelect={(selectedIcon) =>
                                            handleChangeOnBoardStep(
                                              index,
                                              "image",
                                              "",
                                              selectedIcon
                                            )
                                          }
                                          groups={availableIcons}
                                          customClass="w-[200px]"
                                          placeholder="Select an Icon"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full mb-2">
                                      <p className="text-sm font-medium mb-1 text-gray-500 dark:text-white">
                                        URL
                                      </p>
                                      <Input
                                        type="text"
                                        value={value?.subtitles["df"] || ""}
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
                                    <span className="mb-2 flex items-center cursor-not-allowed bg-slate-500 text-slate-300 text-xs md:text-sm font-semibold shadow-2xl px-1 md:px-2 py-2.5 rounded">
                                      Default
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleDeleteOnBoardStep(index)
                                      }
                                      className="mb-2 cursor-pointer bg-red-500 text-white shadow-2xl px-2 md:px-3 py-2 rounded"
                                    >
                                      <X />
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
                  <h1 className="text-lg md:text-2xl font-medium mb-4">Map</h1>
                  <div className="grid grid-cols-1 gap-8">
                    <div className="">
                      {errorMessage && (
                        <p className="text-red-500 text-sm my-2">
                          {errorMessage}
                        </p>
                      )}
                      <div className="relative">
                        {googleMapKey ? (
                          <div className="relative">
                            <Autocomplete
                              onLoad={(autocomplete) =>
                                (autocompleteRef.current = autocomplete)
                              }
                              onPlaceChanged={handlePlaceSelect}
                              className=" absolute z-10 right-[30%] w-[40%]"
                            >
                              <Input
                                type="text"
                                placeholder="Search for a location"
                                className="w-full app-input mb-2"
                              />
                            </Autocomplete>

                            <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              center={center}
                              zoom={zoom}
                              //@ts-ignore
                              onLoad={(map) => (mapRef.current = map)}
                            >
                              <Polygon
                                path={polygonCoords}
                                options={{
                                  fillColor: "#2196F3",
                                  strokeColor: "#2196F3",
                                  editable: true,
                                  draggable: false,
                                }}
                                onEdit={handlePolygonEdit}
                              />
                              <Marker
                                position={markerPosition}
                                draggable={true}
                                onDragEnd={handleMarkerDrag}
                              />
                              <DrawingManager
                                onPolygonComplete={handlePolygonComplete}
                                options={{
                                  drawingControl: true,
                                  drawingControlOptions: {
                                    drawingModes: [
                                      "polygon" as google.maps.drawing.OverlayType,
                                    ],
                                  },
                                  polygonOptions: {
                                    fillColor: "#2196F3",
                                    strokeColor: "#2196F3",
                                    editable: true,
                                  },
                                }}
                              />
                            </GoogleMap>
                          </div>
                        ) : (
                          <div className="mt-4">
                            <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              center={center}
                              zoom={zoom}
                            >
                              <>
                                <Marker
                                  position={markerPosition}
                                  draggable={true}
                                  onDragEnd={handleMarkerDrag}
                                />
                              </>
                            </GoogleMap>
                          </div>
                        )}
                      </div>
                    </div>
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

export default ContactSettingsForm;
