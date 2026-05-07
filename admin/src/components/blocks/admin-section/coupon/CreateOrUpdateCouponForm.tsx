"use client";
import CloudIcon from "@/assets/icons/CloudIcon";
import multiLang from "@/components/molecules/multiLang.json";
import { SubmitButton } from "@/components/blocks/shared";
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
  TooltipTrigger,
} from "@/components/ui";
import GlobalImageLoader from "@/lib/imageLoader";
import {
  useCouponStoreMutation,
  useCouponUpdateMutation,
} from "@/modules/admin-section/coupon/coupon.action";
import {
  CouponFormData,
  couponSchema,
} from "@/modules/admin-section/coupon/coupon.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
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
const CreateOrUpdateCouponForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
  });

  const [lastSelectedImages, setLastSelectedImages] = useState<any>(null);
  const [lastSelectedLogo, setLastSelectedLogo] = useState<any>(null);
  const [errorLogoMessage, setLogoErrorMessage] = useState<string>("");

  useEffect(() => {
    if (data) {
      setValue("title_df", data.title ?? "");
      setValue("description_df", data.description ?? "");
      Object.keys(data.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(
          `title_${language}` as keyof CouponFormData,
          translation?.title ?? ""
        );
        setValue(
          `description_${language}` as keyof CouponFormData,
          translation?.description ?? ""
        );
      });
      if (data?.background_image) {
        setLastSelectedImages({
          image_id: data?.background_image,
          img_url: data?.background_image_url ?? "/images/no-image.png",
          name: "background_image",
        });
      }
      if (data?.image) {
        setLastSelectedLogo({
          image_id: data?.image,
          img_url: data?.image_url ?? "/images/no-image.png",
          name: "image",
        });
      }
    }
  }, [data, setValue]);

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

  const { mutate: couponStore, isPending } = useCouponStoreMutation();
  const { mutate: couponUpdate, isPending: isUpdating } =
    useCouponUpdateMutation();

  const onSubmit = async (values: CouponFormData) => {
    const defaultData = {
      title: values.title_df,
      description: values.description_df,
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
      id: data?.id,
      translations,
      background_image: lastSelectedImages?.image_id ?? "",
      image: lastSelectedLogo?.image_id ?? "",
    };
    return data
      ? couponUpdate(
          { ...(submissionData as any) },
          {
            onSuccess: () => {
              reset();
              dispatch(setRefetch(true));
            },
          }
        )
      : couponStore(
          { ...(submissionData as any) },
          {
            onSuccess: () => {
              reset();
              dispatch(setRefetch(true));
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
          <CloudIcon />
          <p className="mt-4 text-blue-500 text-sm font-medium p-1">
            {t("common.drag_and_drop")}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {multiLangData.map((lang) => (
              <TabsContent key={lang.id} value={lang.id}>
                <div className="mb-4">
                  <div className="text-sm font-medium mb-1 flex items-center gap-2">
                    <span>
                      {t("label.title")} (
                      {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                    </span>
                  </div>
                  <Input
                    {...register(`title_${lang.id}` as keyof CouponFormData)}
                    className="app-input"
                    placeholder="Enter value"
                  />
                  {errors[`title_${lang.id}` as keyof CouponFormData] && (
                    <p className="text-red-500 text-sm mt-1">
                      {(errors as any)[`title_${lang.id}`]?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">
                    {t("label.description")} (
                    {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                  </p>
                  <Controller
                    control={control}
                    name={`description_${lang.id}` as keyof CouponFormData}
                    render={({ field }) => (
                      <TiptapEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="flex items-start gap-4">
                  <div>
                    <div className="text-sm font-medium flex items-center gap-2 mb-1">
                      <span>{t("label.thumbnail")}</span>
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
                    <div className="relative w-32">
                      <PhotoUploadModal
                        trigger={triggerLogo}
                        isMultiple={false}
                        onSave={handleSaveLogo}
                        usageType="coupon"
                        selectedImage={lastSelectedLogo}
                      />
                      {lastSelectedLogo?.image_id && (
                        <Cancel
                          customClass="absolute top-0 right-0 m-1"
                          onClick={(e: { stopPropagation: () => void }) => {
                            e.stopPropagation();
                            removeLogo();
                          }}
                        />
                      )}
                    </div>
                    {errorLogoMessage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorLogoMessage}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="col-span-2 mt-10">
          <SubmitButton
            UpdateData={data}
            IsLoading={isPending || isUpdating}
            AddLabel={t("button.add_coupon")}
            UpdateLabel={t("button.update_coupon")}
          />
        </div>
      </form>
    </div>
  );
};
export default CreateOrUpdateCouponForm;
