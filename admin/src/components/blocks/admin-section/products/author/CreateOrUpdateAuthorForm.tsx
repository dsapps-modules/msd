"use client";
import CloudIcon from "@/assets/icons/CloudIcon";
import multiLang from "@/components/molecules/multiLang.json";
import { SubmitButton } from "@/components/blocks/shared";
import CustomSingleDatePicker from "@/components/blocks/common/CustomSingleDatePicker";
import Cancel from "@/components/blocks/custom-icons/Cancel";
import PhotoUploadModal from "@/components/blocks/shared/PhotoUploadModal";
import TiptapEditor from "@/components/blocks/common/TiptapField";
import {
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui";
import GlobalImageLoader from "@/lib/imageLoader";
import {
  useAuthorStoreMutation,
  useAuthorUpdateMutation,
} from "@/modules/admin-section/author/author.action";
import {
  AuthorFormData,
  authorSchema,
} from "@/modules/admin-section/author/author.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
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
const CreateOrUpdateAuthorForm = ({ data }: any) => {
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
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
  });
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");

  useEffect(() => {
    if (data) {
      setValue("name_df", data?.name);
      setValue("bio", data?.bio);
      setValue("born_date", data?.born_date);
      setValue("death_date", data?.death_date);
      Object.keys(data.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(`name_${language}` as keyof AuthorFormData, translation?.name);
      });
      if (data?.profile_image) {
        setLastSelectedLogo({
          image_id: data?.profile_image ? data?.profile_image : "",
          img_url: data?.profile_image ? data?.profile_image_url : "/images/no-image.png",
          name: "profile image",
        });
      }
    }
  }, [data, setValue, data?.translations]);

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

  const { mutate: authorStore, isPending: isAuthorStorePending } =
    useAuthorStoreMutation();
  const { mutate: authorUpdate, isPending: isAuthorUpdatePending } =
    useAuthorUpdateMutation();

  const onSubmit = async (values: AuthorFormData) => {
    const defaultData = {
      name: values.name_df,
      bio: values.bio,
      born_date: values.born_date,
      death_date: values.death_date,
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: !data ? 0 : data.id,
      profile_image: lastSelectedLogo ? lastSelectedLogo?.image_id : "",
      translations: translations,
    };

    if (data) {
      return authorUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
            dispatch(setRefetch(true));
          },
        }
      );
    } else {
      return authorStore(
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
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <div
                dir={dir}
                className="grid lg:grid-cols-2 md:grid-cols-1 gap-4"
              >
                {multiLangData.map((lang) => {
                  return (
                    <TabsContent key={lang.id} value={lang.id}>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>
                            {t("label.name")} (
                            {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                          </span>
                        </p>
                        <Input
                          id={`name_${lang.id}`}
                          {...register(
                            `name_${lang.id}` as keyof AuthorFormData
                          )}
                          className="app-input"
                          placeholder={t("place_holder.enter_name")}
                        />
                        {errors[`name_${lang.id}` as keyof AuthorFormData] && (
                          <p className="text-red-500 text-sm mt-1">
                            {
                              //@ts-ignore
                              errors[`name_${lang.id}`]?.message
                            }
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.born_date")}
                        </p>
                        <Controller
                          name="born_date"
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
                              maxDate={new Date()}
                            />
                          )}
                        />
                        {errors.born_date && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.born_date.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.death_date")}
                        </p>

                        <Controller
                          name="death_date"
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
                              maxDate={new Date()}
                            />
                          )}
                        />
                        {errors.death_date && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.death_date.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.bio")}
                        </p>
                        <Controller
                          control={control}
                          name={`bio` as keyof AuthorFormData}
                          render={({ field }) => (
                            <TiptapEditor
                              //@ts-ignore
                              value={field.value || ""}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </TabsContent>
                  );
                })}
                <div className="flex 2xl:flex-row xl:flex-col lg:flex-row md:flex-col gap-2">
                  <div className="mt-2">
                    <div className="text-sm font-medium mb-1 flex items-center gap-2">
                      <span>{t("label.profile_image")}</span>
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
                          usageType="author"
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
          </div>

          <div className="col-span-2 mt-10">
            <SubmitButton
              UpdateData={data}
              IsLoading={data ? isAuthorUpdatePending : isAuthorStorePending}
              AddLabel={t("button.add_author")}
              UpdateLabel={t("button.update_author")}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateAuthorForm;
