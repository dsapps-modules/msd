"use client";
import multiLang from "@/components/molecules/multiLang.json";
import { SubmitButton } from "@/components/blocks/shared";
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
import { useEmailTemplateUpdateMutation } from "@/modules/admin-section/email-settings/email-template/email-template.action";
import {
  EmailTemplateFormData,
  emailTemplateSchema,
} from "@/modules/admin-section/email-settings/email-template/email-template.schema";
import { useAppDispatch } from "@/redux/hooks";
import { setRefetch } from "@/redux/slices/refetchSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
type LangKeys = keyof IntlMessages["lang"];
const CreateOrUpdateEmailTemplateForm = ({ data }: any) => {
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
    reset,
  } = useForm<EmailTemplateFormData>({
    resolver: zodResolver(emailTemplateSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("name_df", data.name ?? "");
      setValue("subject_df", data.subject ?? "");
      setValue("body_df", data?.body ?? "");
      Object.keys(data.translations).forEach((language) => {
        const translation = data.translations[language];
        setValue(
          `name_${language}` as keyof EmailTemplateFormData,
          translation?.name ?? ""
        );
        setValue(
          `subject_${language}` as keyof EmailTemplateFormData,
          translation?.subject ?? ""
        );
        setValue(
          `body_${language}` as keyof EmailTemplateFormData,
          translation?.body ?? ""
        );
      });
    }
  }, [data, setValue, data?.translations]);

  const { mutate: TemplateUpdate, isPending: isUpdating } =
    useEmailTemplateUpdateMutation();
  const onSubmit = async (values: EmailTemplateFormData) => {
    const defaultData = {
      name: values.name_df,
      body: values.body_df,
      subject: values.subject_df,
      type: values.type,
    };
    const translations = multiLangData
      .filter((lang) => (values as any)[`name_${lang.id}`])
      .map((lang) => ({
        language_code: lang.id,
        name: (values as any)[`name_${lang.id}`],
        body: (values as any)[`body_${lang.id}`],
        subject: (values as any)[`subject_${lang.id}`],
      }));
    const submissionData = {
      ...defaultData,
      id: data?.id,
      translations: translations,
    };
    return TemplateUpdate(
      { ...(submissionData as any) },
      {
        onSuccess: () => {
          reset();
          dispatch(setRefetch(true));
        },
      }
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-2 md:p-6">
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
                      className="lg:col-span-2"
                    >
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>
                            {t("label.name")} (
                            {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                          </span>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-custom-dark-blue">
                                  <p className="p-1 text-sm font-medium">
                                    Please provide name{" "}
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
                          id={`name_${lang.id}`}
                          {...register(
                            `name_${lang.id}` as keyof EmailTemplateFormData
                          )}
                          className="app-input"
                          placeholder="Enter value"
                        />
                        {errors[
                          `name_${lang.id}` as keyof EmailTemplateFormData
                        ] && (
                          <p className="text-red-500 text-sm mt-1">
                            {(errors as any)[`name_${lang.id}`]?.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-1 flex items-center gap-2">
                          <span>
                            {t("label.subject")} (
                            {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                          </span>
                          <div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 text-custom-dark-blue cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-custom-dark-blue">
                                  <p className="p-1 text-sm font-medium">
                                    Please provide subject{" "}
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
                          id={`subject_${lang.id}`}
                          {...register(
                            `subject_${lang.id}` as keyof EmailTemplateFormData
                          )}
                          className="app-input"
                          placeholder="Enter value"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1 flex items-center gap-2">
                          {t("label.type")}
                        </p>
                        <Input
                          disabled
                          id={`name`}
                          defaultValue={data?.type || ""}
                          {...register(`name` as keyof EmailTemplateFormData)}
                          className="app-input"
                          placeholder="Enter value"
                        />
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1">
                          {t("label.body")} (
                          {t(`lang.${lang.id}` as `lang.${LangKeys}`)})
                        </p>
                        <Textarea
                          id={`body_${lang.id}`}
                          {...register(
                            `body_${lang.id}` as keyof EmailTemplateFormData
                          )}
                          className="app-input"
                          placeholder="Enter value"
                        />
                      </div>
                    </TabsContent>
                  );
                })}
              </div>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="mt-4 sticky bottom-0 w-full p-4">
          <SubmitButton
            UpdateData={data}
            IsLoading={isUpdating}
            UpdateLabel={t("button.update_template")}
          />
        </Card>
      </form>
    </div>
  );
};
export default CreateOrUpdateEmailTemplateForm;
