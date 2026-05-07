"use client";
import multiLang from "@/components/molecules/multiLang.json";
import { SubmitButton } from "@/components/blocks/shared";
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
import {
  useUnitStoreMutation,
  useUnitUpdateMutation,
} from "@/modules/admin-section/unit/unit.action";
import {
  UnitFormData,
  unitSchema,
} from "@/modules/admin-section/unit/unit.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type LangKeys = keyof IntlMessages["lang"];
const CreateOrUpdateUnitForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const FromData = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
  });

  useEffect(() => {
    if (FromData) {
      setValue("name_df", FromData.name);
      setValue("order", String(FromData.order));
      if (FromData.translations) {
        Object.keys(FromData?.translations).forEach((language) => {
          const translation = FromData.translations[language];
          setValue(`name_${language}` as keyof UnitFormData, translation?.name);
        });
      }
    }
  }, [FromData, setValue, FromData?.translations]);

  const { mutate: tagStore, isPending: isUnitStorePending } =
    useUnitStoreMutation();
  const { mutate: tagUpdate, isPending: isUnitUpdatePending } =
    useUnitUpdateMutation();

  const onSubmit = async (values: UnitFormData) => {
    let orderValue = values.order == "" ? values.order : Number(values.order);
    const defaultData = {
      name: values.name_df,
      order: orderValue,
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: !FromData ? 0 : FromData.id,
      translations: translations,
    };
    if (FromData) {
      return tagUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
            dispatch(setRefetch(true));
          },
        }
      );
    } else {
      return tagStore(
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
              <div dir={dir} className="">
                {multiLangData.map((lang) => {
                  return (
                    <TabsContent key={lang.id} value={lang.id} className="">
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>
                            {t("label.name")} ({lang.label})
                          </span>
                        </div>
                        <Input
                          id={`name_${lang.id}`}
                          {...register(`name_${lang.id}` as keyof UnitFormData)}
                          className="app-input"
                          placeholder={t("place_holder.enter_name")}
                        />
                        {errors[`name_${lang.id}` as keyof UnitFormData] && (
                          <p className="text-red-500 text-sm mt-1">
                            {(errors as any)[`name_${lang.id}`]?.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.display_order")}
                        </p>
                        <Input
                          id="order"
                          type="number"
                          min={0}
                          {...register("order" as keyof UnitFormData)}
                          className="app-input"
                          placeholder="Entry display order"
                        />
                        {errors["order" as keyof UnitFormData] && (
                          <p className="text-red-500 text-sm mt-1">
                            {(errors as any)["order"]?.message}
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  );
                })}
              </div>
            </Tabs>
          </div>

          <div className="mt-4 py-4">
            <SubmitButton
              UpdateData={data}
              IsLoading={data ? isUnitUpdatePending : isUnitStorePending}
              AddLabel={t("button.add")}
              UpdateLabel={t("button.update")}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateUnitForm;
