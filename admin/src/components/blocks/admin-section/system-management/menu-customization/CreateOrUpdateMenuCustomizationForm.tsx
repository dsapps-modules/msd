"use client";
import NoDataFoundIcon from "@/assets/icons/NoDataFoundIcon";
import multiLang from "@/components/molecules/multiLang.json";
import { SubmitButton } from "@/components/blocks/shared";
import {
  Card,
  CardContent,
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { useAllPagesQuery } from "@/modules/admin-section/pages/pages.action";
import {
  useMenuCustomizationStoreMutation,
  useMenuCustomizationUpdateMutation,
} from "@/modules/admin-section/system-management/menu-customization/menu-customization.action";
import {
  manuCustomizationSchema,
  MenuCustomizationFormData,
} from "@/modules/admin-section/system-management/menu-customization/menu-customization.schema";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DefaultPagesSelector from "./component/DefaultPagesSelector";
import LinkAdder from "./component/LinkAdder";
import NestedDndMenu from "./component/NestedDndMenu";
import PagesSelector from "./component/PagesSelector";

type ToggleState = {
  is_visible: boolean;
};
type LangKeys = keyof IntlMessages["lang"];

interface MenuItem {
  id: string;
  label: string;
  url: string;
  children?: MenuItem[];
  translations?: {
    [key: string]: {
      label: string;
    };
  };
}

const CreateOrUpdateMenuCustomizationForm = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const multiLangData = React.useMemo(() => multiLang, []);
  const localeLang = useLocale();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const MenuCustomizationData = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MenuCustomizationFormData>({
    resolver: zodResolver(manuCustomizationSchema),
    defaultValues: {
      pages: MenuCustomizationData?.page_id ?? "",
    },
  });

  const [toggles, setToggles] = useState<ToggleState>({
    is_visible: false,
  });

  const [activeLanguage, setActiveLanguage] = useState("df");
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({});
  useEffect(() => {
    if (Object.keys(menuItems).length === 0) {
      const initial = multiLangData.reduce((acc, lang) => {
        acc[lang.id] = [];
        return acc;
      }, {} as Record<string, MenuItem[]>);
      setMenuItems(initial);
    }
  }, [menuItems, multiLangData]);

  useEffect(() => {
    if (MenuCustomizationData?.menu_content) {
      const initializedItems: Record<string, MenuItem[]> = {};

      multiLangData.forEach((lang) => {
        if (MenuCustomizationData.translations[lang.id]?.menu_content) {
          initializedItems[lang.id] =
            MenuCustomizationData.translations[lang.id].menu_content;
        } else {
          initializedItems[lang.id] = MenuCustomizationData.menu_content.map(
            (item: { label: any }) => ({
              ...item,
              label: item.label, 
            })
          );
        }
      });

      setMenuItems(initializedItems);
    }
  }, [MenuCustomizationData, multiLangData]);

  const handleItemsChange = (newItems: any[]) => {
    setMenuItems((prev) => {
      const updated: Record<string, MenuItem[]> = {};

      for (const lang of Object.keys(prev)) {
        updated[lang] = cloneTreeWithPreservedLabels(newItems, prev[lang]);
      }

      return updated;
    });
  };
  function cloneTreeWithPreservedLabels(
    newItems: MenuItem[],
    oldLangItems: MenuItem[]
  ): MenuItem[] {
    const labelMap = new Map<string, string>();

    const collectLabels = (items: MenuItem[]) => {
      for (const item of items) {
        labelMap.set(item.id, item.label);
        if (item.children) collectLabels(item.children);
      }
    };

    collectLabels(oldLangItems); 

    const cloneItems = (items: MenuItem[]): MenuItem[] =>
      items.map((item) => ({
        ...item,
        label: labelMap.get(item.id) || item.label,
        children: item.children ? cloneItems(item.children) : [],
      }));

    return cloneItems(newItems);
  }

  const handleLabelChange = (id: string, newLabel: string, lang: string) => {
    setMenuItems((prev) => {
      const updatedItems = { ...prev };
      if (!updatedItems[lang]) return prev;

      const updateItem = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, label: newLabel };
          }
          if (item.children) {
            return { ...item, children: updateItem(item.children) };
          }
          return item;
        });
      };

      updatedItems[lang] = updateItem(updatedItems[lang]);
      return updatedItems;
    });
  };

    const additionalPages = [
    { id: 1, label: "Home", value: 1, slug: "/" },
    { id: 2, label: "Product", value: 2, slug: "products" },
    { id: 3, label: "Category", value: 3, slug: "product-categories" },
    { id: 4, label: "Store", value: 4, slug: "stores" },
    { id: 5, label: "Blog", value: 5, slug: "blogs" },
    { id: 6, label: "Coupon", value: 6, slug: "coupon" },
  ];
  const handleAddDefaultPagesToMenu = (selectedPages: any[]) => {
    const newMenuItems = selectedPages.map((page) => ({
      id: `new-${Date.now()}-${page.value}`,
      label: page.label,
      url: page.slug || `/${page.value}`,
      children: [],
    }));

    setMenuItems((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((lang) => {
        updated[lang] = [...(updated[lang] || []), ...newMenuItems];
      });
      return updated;
    });
  };


  const { AllPagesData, isPending: isPagePending } = useAllPagesQuery({
    language: localeLang,
  });
  let AllPages = (AllPagesData as any)?.all_pages || [];


  const handleAddPagesToMenu = (selectedPages: any[]) => {
    const newMenuItems = selectedPages.map((page) => ({
      id: `new-${Date.now()}-${page.value}`,
      label: page.label,
      url: page.slug || `/${page.value}`,
      children: [],
    }));

    setMenuItems((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((lang) => {
        updated[lang] = [...(updated[lang] || []), ...newMenuItems];
      });
      return updated;
    });
  };

  const handleAddCustomLink = (title: string, url: string) => {
    const newItem = {
      id: `custom-${Date.now()}`,
      label: title,
      url: url.startsWith("http") ? url : `/${url}`,
      children: [],
    };

    setMenuItems((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((lang) => {
        updated[lang] = [...(updated[lang] || []), newItem];
      });
      return updated;
    });
  };

  useEffect(() => {
    if (MenuCustomizationData) {
      setValue("name_df", MenuCustomizationData?.name ?? "");
      setValue("url", MenuCustomizationData?.url ?? "");
      setValue("pages", MenuCustomizationData?.page_id ?? "");
      setToggles({
        is_visible: MenuCustomizationData.is_visible == 1 ? true : false,
      });

      Object.keys(MenuCustomizationData?.translations).forEach((language) => {
        const translation = MenuCustomizationData.translations[language];
        setValue(
          `name_${language}` as keyof MenuCustomizationFormData,
          translation?.name ?? ""
        );
      });
    }
  }, [MenuCustomizationData, setValue, MenuCustomizationData?.translations]);

  const handleToggle = (field: keyof ToggleState) => {
    setToggles((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const { mutate: MenuStore, isPending: isSliderPending } =
    useMenuCustomizationStoreMutation();
  const { mutate: MenuUpdate, isPending: isSliderUpdating } =
    useMenuCustomizationUpdateMutation();

  const onSubmit = async (values: MenuCustomizationFormData) => {
    try {
     

      const defaultData = {
        name: values.name_df,
        url: values.url,
        page_id: values.pages,
        is_visible: toggles.is_visible,
        menu_content: JSON.stringify(menuItems["df"] || []),
      };

      const translations = multiLangData
        .filter((lang) => lang.id !== "df")
        .map((lang) => ({
          language_code: lang.id,
          name: (values as any)[`name_${lang.id}`],
          menu_content: JSON.stringify(menuItems[lang.id] || []),
        }));

      const submissionData = {
        ...defaultData,
        id: MenuCustomizationData ? MenuCustomizationData.id : 0,
        translations,
      };

      if (data) {
        MenuUpdate(submissionData as any, {
          onSuccess: () => {},
          onError: () => {},
        });
      } else {
        MenuStore(submissionData as any, {
          onSuccess: () => {},
          onError: () => {},
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Tabs defaultValue="df" className="col-span-2">
              <Card className="mt-4">
                <CardContent className="p-2 md:p-4">
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
              <div dir={dir}>
                {multiLangData.map((lang) => {
                  return (
                    <TabsContent key={lang.id} value={lang.id}>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="">
                          <Card className="">
                            <CardContent className="space-y-4  p-2 md:p-4">
                              <div className="">
                                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                                  <span>
                                    {t("label.name")} (
                                    {t(`lang.${lang.id}` as `lang.${LangKeys}`)}
                                    )
                                  </span>
                                </p>
                                <Input
                                  id={`name_${lang.id}`}
                                  {...register(
                                    `name_${lang.id}` as keyof MenuCustomizationFormData
                                  )}
                                  className="app-input"
                                  placeholder="Entry title"
                                />
                                {errors[
                                  `name_${lang.id}` as keyof MenuCustomizationFormData
                                ] && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {
                                      
                                      (errors as any)[`name_${lang.id}`]?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <div className="grid grid-cols-7 items-center justify-between w-full">
                                <h2 className="col-span-2 font-medium flex items-center gap-1">
                                  {t("label.visibility")}
                                </h2>
                                <div className="col-span-3 flex flex-col items-start">
                                  <Switch
                                    dir="ltr"
                                    checked={toggles.is_visible}
                                    onCheckedChange={() =>
                                      handleToggle("is_visible")
                                    }
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>{" "}
                          <DefaultPagesSelector
                            pages={additionalPages}
                            isPagePending={false}
                            onAddSelected={handleAddDefaultPagesToMenu}
                          />
                          <PagesSelector
                            pages={AllPages}
                            isPagePending={isPagePending}
                            onAddSelected={handleAddPagesToMenu}
                          />
                          <LinkAdder onAddLink={handleAddCustomLink} />
                          <Card className="mt-4 sticky bottom-0 w-full p-4">
                            <SubmitButton
                              UpdateData={data}
                              IsLoading={
                                data ? isSliderUpdating : isSliderPending
                              }
                              AddLabel={t("button.add_menu")}
                              UpdateLabel={t("button.update_menu")}
                            />
                          </Card>
                        </div>
                        <div>
                          <Card className="h-auto w-full ">
                            <h3 className="font-medium p-4 shadow-custom">
                              Menu Stracture{" "}
                            </h3>
                            <CardContent className="p-4">
                              {menuItems?.[lang.id]?.length > 0 ? (
                                <NestedDndMenu
                                  itemsList={menuItems[lang.id] || []}
                                  onItemsChange={handleItemsChange}
                                  onLabelChange={(id, newLabel) =>
                                    handleLabelChange(id, newLabel, lang.id)
                                  }
                                  language={lang.id}
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center text-gray-500 py-10">
                                  <NoDataFoundIcon />
                                  <p className="mt-2 text-sm text-gray-500 dark:text-white font-bold">
                                    {t("common.not_data_found")}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </div>
            </Tabs>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateOrUpdateMenuCustomizationForm;
