"use client";
import multiLang from "@/components/molecules/multiLang.json";
import {
  AppSelect,
} from "@/components/blocks/common";
import { SubmitButton } from "@/components/blocks/shared";
import {
  Card,
  CardContent,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea
} from "@/components/ui";
import {
  useVehicleTypeStoreMutation,
  useVehicleTypeUpdateMutation,
} from "@/modules/admin-section/vehicle-type/vehicle-type.action";
import {
  VehicleTypeFormData,
  vehicleTypeSchema,
} from "@/modules/admin-section/vehicle-type/vehicle-type.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
const StatusList = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" },
];
const FuelTypeList = [
  { label: "Electric", value: "electric" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Petrol", value: "petrol" },
  { label: "Diesel", value: "diesel" },
];

type LangKeys = keyof IntlMessages["lang"];
const CreateOrUpdateVehicleTypeForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<VehicleTypeFormData>({
    resolver: zodResolver(vehicleTypeSchema),
    
  });
  useEffect(() => {
    if (data) {
      setValue("name_df", data?.name ?? "");
      setValue("description_df", data?.description ?? "");
      setValue(
        "speed_range",
        data && data.speed_range !== "null" ? data?.speed_range : ""
      );
      Object?.keys(data?.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(
          `name_${language}` as keyof VehicleTypeFormData,
          translation?.name ?? ""
        );
        setValue(
          `description_${language}` as keyof VehicleTypeFormData,
          translation?.description ?? ""
        );
      });
    }
  }, [data, setValue, data?.translations]);

  const handleSelectItem = (value: string, inputType: string) => {
    setValue(inputType as any, value);
  };

  const { mutate: FlashDealsStore, isPending: isFlashDealsStorePending } =
    useVehicleTypeStoreMutation();
  const { mutate: FlashDealsUpdate, isPending: isFlashDealsUpdatePending } =
    useVehicleTypeUpdateMutation();

  const onSubmit = async (values: VehicleTypeFormData) => {
    const defaultData = {
      name: values.name_df,
      description: values.description_df,
      status: values.status,
      capacity: Number(values.capacity),
      speed_range: values.speed_range,
      fuel_type: values.fuel_type,
      max_distance: Number(values.max_distance),
      extra_charge: Number(values.extra_charge),
      average_fuel_cost: Number(values.average_fuel_cost),
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
        description: (values as any)[`description_${lang.id}`],
      }));

    if (values.status === "" || values.status === "undefined") {
      toast.error("The Status field must be Active  or Inactive."); // Show error toast
      return;
    }
    if (values.fuel_type === "" || values.fuel_type === "undefined") {
      toast.error(
        "The Vehicle fuel type must be one of the following: petrol,diesel,electric,hybrid etc."
      );
      return;
    }

    const submissionData = {
      ...defaultData,
      id: !data ? 0 : data.id,
      translations: translations,
    };

    if (data) {
      return FlashDealsUpdate(
        { ...(submissionData as any) },
        {
          onSuccess: () => {
            reset();
            dispatch(setRefetch(true));
          },
        }
      );
    } else {
      return FlashDealsStore(
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
          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
              <h1 className="text-lg md:text-2xl font-medium mb-4">
                {t("label.basic_information")}
              </h1>
              <div>
                <Tabs defaultValue="df" className="col-span-2">
                  <TabsList dir={dir} className="flex justify-start bg-white dark:bg-[#1f2937]">
                    {multiLangData.map((lang) => (
                      <TabsTrigger key={lang.id} value={lang.id}>
                        {lang.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div dir={dir}>
                    {multiLangData.map((lang) => {
                      return (
                        <TabsContent key={lang.id} value={lang.id}>
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>
                                    {t("label.title")} (
                                    {t(`lang.${lang.id}` as `lang.${LangKeys}`)}
                                    )
                                  </span>
                                </p>
                                <Input
                                  id={`name_${lang.id}`}
                                  {...register(
                                    `name_${lang.id}` as keyof VehicleTypeFormData
                                  )}
                                  className="app-input"
                                  placeholder={t("place_holder.enter_name")}
                                />
                                {errors[
                                  `name_${lang.id}` as keyof VehicleTypeFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      (errors as any)[`name_${lang.id}`]?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  
                                  <span>
                                    {t("label.description")} (
                                    {t(`lang.${lang.id}` as `lang.${LangKeys}`)}
                                    ){" "}
                                  </span>
                                </p>
                                <Textarea
                                  id={`description_${lang.id}`}
                                  {...register(
                                    `description_${lang.id}` as keyof VehicleTypeFormData
                                  )}
                                  className="app-input"
                                  placeholder={t(
                                    "place_holder.enter_description"
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      );
                    })}
                  </div>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-2 md:p-6">
              <div dir={dir}>
                <h1 className="text-lg md:text-2xl font-medium mb-4">
                  {t("label.vehicle_specification")}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {t("label.status")}
                    </p>
                    <Controller
                      control={control}
                      name="status"
                      defaultValue={String(data?.status) ?? ""}
                      render={({ field }) => (
                        <AppSelect
                          value={field.value || ""}
                          onSelect={(value) => {
                            field.onChange(value);
                            handleSelectItem(value, "status");
                          }}
                          groups={StatusList}
                          hideNone
                        />
                      )}
                    />
                    {errors["status" as keyof VehicleTypeFormData] && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors["status"]?.message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {t("label.fuel_type")}
                    </p>
                    <Controller
                      control={control}
                      name="fuel_type"
                      defaultValue={String(data?.fuel_type) ?? ""}
                      render={({ field }) => (
                        <AppSelect
                          value={field.value || ""}
                          onSelect={(value) => {
                            field.onChange(value);
                            handleSelectItem(value, "fuel_type");
                          }}
                          groups={FuelTypeList}
                          hideNone
                        />
                      )}
                    />
                    {errors["fuel_type" as keyof VehicleTypeFormData] && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors["fuel_type"]?.message
                        }
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {t("label.speed_range")}
                    </p>

                    <Input
                      id="speed_range"
                      type="text"
                      {...register("speed_range" as keyof VehicleTypeFormData)}
                      className="app-input"
                      placeholder={t("place_holder.enter_speed_range")}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {t("label.max_distance")}
                    </p>
                    <Input
                      id="max_distance"
                      defaultValue={String(data?.max_distance) ?? ""}
                      type="number"
                      {...register("max_distance" as keyof VehicleTypeFormData)}
                      className="app-input flex flex-col"
                      placeholder={t("place_holder.enter_max_distance")}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {t("label.extra_charge")}
                    </p>
                    <Input
                      id="extra_charge"
                      type="number"
                      defaultValue={String(data?.extra_charge) ?? ""}
                      {...register("extra_charge" as keyof VehicleTypeFormData)}
                      className="app-input"
                      placeholder={t("place_holder.enter_extra_charge")}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {t("label.average_fuel_cost")}
                    </p>
                    <Input
                      id="average_fuel_cost"
                      defaultValue={String(data?.average_fuel_cost) ?? ""}
                      type="number"
                      {...register(
                        "average_fuel_cost" as keyof VehicleTypeFormData
                      )}
                      className="app-input"
                      placeholder={t("place_holder.enter_average_fuel_cost")}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {t("label.capacity")}
                    </p>
                    <Input
                      id="capacity"
                      defaultValue={String(data?.capacity) ?? ""}
                      type="number"
                      {...register("capacity" as keyof VehicleTypeFormData)}
                      className="app-input"
                      placeholder={t("place_holder.enter_capacity")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 sticky bottom-0 w-full p-4">
            <SubmitButton
              UpdateData={data}
              IsLoading={
                data ? isFlashDealsUpdatePending : isFlashDealsStorePending
              }
              AddLabel={t("button.add_vehicle_type")}
              UpdateLabel={t("button.update_vehicle_type")}
            />
          </Card>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateVehicleTypeForm;
