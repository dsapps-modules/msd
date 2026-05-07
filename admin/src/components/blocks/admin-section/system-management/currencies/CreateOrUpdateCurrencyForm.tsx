"use client";
import { SubmitButton } from "@/components/blocks/shared";
import multiLang from "@/components/molecules/multiLang.json";
import {
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";

import {
  useCurrencyStoreMutation,
  useCurrencyUpdateMutation,
} from "@/modules/admin-section/system-management/currency/currency.action";
import {
  CurrencyFormData,
  currencySchema,
} from "@/modules/admin-section/system-management/currency/currency.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type ToggleState = {
  is_default: boolean;
  status: boolean;
};
type LangKeys = keyof IntlMessages["lang"];
export default function CreateOrUpdateCurrencyForm({ data }: any) {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const editData = data?.data;

  const [toggles, setToggles] = useState<ToggleState>({
    is_default: false,
    status: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CurrencyFormData>({
    resolver: zodResolver(currencySchema),
  });

  useEffect(() => {
    if (editData) {
      setValue("name_df", editData.name ?? "");
      setValue("code", editData.code ?? "");
      setValue("symbol", editData.symbol ?? "");
      setValue("exchange_rate", String(editData.exchange_rate) ?? "");
      setToggles({
        status: editData.status,
        is_default: editData.is_default,
      });
      Object.keys(editData?.translations).forEach((language) => {
        const translation = editData.translations[language];
        setValue(
          `name_${language}` as keyof CurrencyFormData,
          translation?.name ?? ""
        );
      });
    }
  }, [editData, setValue]);

  const handleToggle = (field: keyof ToggleState) => {
    setToggles((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const { mutate: currencyStore, isPending } = useCurrencyStoreMutation();
  const { mutate: currencyUpdate, isPending: isUpdating } =
    useCurrencyUpdateMutation();
  const onSubmit = async (values: CurrencyFormData) => {
    const defaultData = {
      name: values.name_df,
      code: values.code,
      symbol: values.symbol,
      exchange_rate: values.exchange_rate,
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: editData?.id,
      // is_default: toggles?.is_default,
      status: toggles?.status,
      translations: translations,
    };

    return data
      ? currencyUpdate(
          { ...(submissionData as any) },
          {
            onSuccess: () => {
              dispatch(setRefetch(true));
              reset();
            },
          }
        )
      : currencyStore(
          { ...(submissionData as any) },
          {
            onSuccess: () => {
              dispatch(setRefetch(true));
              reset();
            },
          }
        );
  };

  return (
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
                  <TabsContent
                    key={lang.id}
                    value={lang.id}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-sm font-medium mb-1 flex items-center gap-2">
                        <span>
                          {t("label.name")} (
                          {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                        </span>
                      </p>
                      <Input
                        id={`name_${lang.id}`}
                        {...register(
                          `name_${lang.id}` as keyof CurrencyFormData
                        )}
                        className="app-input"
                        placeholder={t("place_holder.enter_name")}
                      />
                      {errors[`name_${lang.id}` as keyof CurrencyFormData] && (
                        <p className="text-red-500 text-sm mt-1">
                          {(errors as any)[`name_${lang.id}`]?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Currency Code</p>
                      <Input
                        id={`code`}
                        {...register(`code` as keyof CurrencyFormData)}
                        className="app-input"
                        placeholder="Enter code"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Symbol</p>
                      <Input
                        id={`symbol`}
                        {...register(`symbol` as keyof CurrencyFormData)}
                        className="app-input"
                        placeholder="Enter symbol"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Exchange Rate</p>
                      <Input
                        type="number"
                        min={0}
                        id="exchange_rate"
                        {...register("exchange_rate" as keyof CurrencyFormData)}
                        className="app-input"
                        placeholder="Enter exchange rate"
                      />
                    </div>

                    <div className="grid grid-cols-7 w-full ">
                      <h2 className="col-span-2 text-sm font-medium">Status</h2>
                      <div className="flex flex-col items-start">
                        <Switch
                          dir="ltr"
                          checked={toggles.status}
                          onCheckedChange={() => handleToggle("status")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>

        <div className="col-span-2 mt-10">
          <SubmitButton
            UpdateData={data}
            IsLoading={isPending || isUpdating}
            AddLabel="Create Currency"
            UpdateLabel="Update Currency"
          />
        </div>
      </form>
    </div>
  );
}
