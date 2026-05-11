"use client";

import { Input } from "@/components/ui";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { useGeneralQuery } from "@/modules/common/com/com.action";
import {
  useSellerDashboardQuery,
  useSellerGrowthOrderQuery,
  useSellerOtherSummaryQuery,
  useSellerSalesSummaryQuery,
} from "@/modules/seller-section/seller-dashboard/seller-dashboard.action";
import { useGetPermissionsQuery } from "@/modules/users/users.action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index";
import { setDynamicValue, setRefetch } from "@/redux/slices/refetchSlice";
import { setSelectedStore } from "@/redux/slices/storeSlice";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";

export const Sidebar = memo(({ setIsLoading }: any) => {
  const localeMain = useLocale();

  const { isRefetch, dynamicValue } = useAppSelector(
    (state) => state.refetchValue
  );
  const selectedStore = useAppSelector((state) => state.store.selectedStore);
  const storedSlug = selectedStore?.slug ?? "";

  const { getPermissions, refetch, isPending, isFetching } =
    useGetPermissionsQuery({
      store_slug: storedSlug ?? "",
      language: localeMain,
    });

  const { general, refetch: generalRefetch } = useGeneralQuery({
    language: localeMain,
  });

  const QueryGeneralSettingsData = useMemo(
    () => (general as any)?.site_settings || {},
    [general]
  );

  const sidebar =
    useStore(useSidebarToggle, (state) => state) ?? {
      isOpen: true,
      setIsOpen: () => {},
    };
  const pathname = usePathname();
  const localeDir = pathname.split("/")[1];
  const dir = localeDir === "ar" ? "rtl" : "ltr";
  const pathnameWithoutLocale = pathname.replace(`/${localeDir}`, "") || "/";
  const MenuItems = getPermissions?.permissions;
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const shouldLoadDashboardStats = useMemo(
    () =>
      [
        "/admin/dashboard",
        "/seller/dashboard",
        "/seller/store/dashboard",
      ].includes(pathnameWithoutLocale),
    [pathnameWithoutLocale]
  );

  const { refetch: isDashboardRefetch } = useSellerDashboardQuery(
    {
      language: locale,
      slug: storedSlug,
    },
    {
      enabled: shouldLoadDashboardStats,
      staleTime: 1000 * 60 * 10,
    }
  );

  const { refetch: SalesSummaryRefetch } = useSellerSalesSummaryQuery(
    {
      language: locale,
      slug: storedSlug,
    },
    {
      enabled: shouldLoadDashboardStats,
      staleTime: 1000 * 60 * 10,
    }
  );

  const { refetch: SellerGrowthRefetch } = useSellerGrowthOrderQuery(
    {
      language: locale,
      slug: storedSlug,
    },
    {
      enabled: shouldLoadDashboardStats,
      staleTime: 1000 * 60 * 10,
    }
  );

  const { refetch: SellerOtherRefetch } = useSellerOtherSummaryQuery(
    {
      language: locale,
      slug: storedSlug,
    },
    {
      enabled: shouldLoadDashboardStats,
      staleTime: 1000 * 60 * 10,
    }
  );

  const dashboardLink =
    getPermissions?.activity_scope == "store_level"
      ? "/seller/dashboard"
      : "/admin/dashboard";

  const [search, setSearch] = useState("");
  const menuItems: any =
    storedSlug === "" && getPermissions?.activity_scope === "store_level"
      ? [...MenuItems]
      : MenuItems;


  useEffect(() => {
    if (
      (isRefetch && dynamicValue === "store_dashboard") ||
      dynamicValue === "admin_dashboard"
    ) {
      refetch();
      isDashboardRefetch();
      SalesSummaryRefetch();
      SellerGrowthRefetch();
      SellerOtherRefetch();
      dispatch(setDynamicValue(null));
    }
  }, [
    isRefetch,
    dynamicValue,
    dispatch,
    refetch,
    isDashboardRefetch,
    SalesSummaryRefetch,
    SellerGrowthRefetch,
    SellerOtherRefetch,
  ]);
  const handleLogo = () => {
    localStorage.setItem("selectedStore", JSON.stringify({ id: "", slug: "" }));
    isDashboardRefetch();
    SalesSummaryRefetch();
    SellerGrowthRefetch();
    SellerOtherRefetch();
    dispatch(setSelectedStore({ id: "", type: "", slug: "" }));
    router.push(`${dashboardLink}`);
    if (getPermissions?.activity_scope == "store_level") {
      dispatch(setRefetch(true));
      dispatch(setDynamicValue("store_dashboard"));
    }
  };
  return (
    <aside
      className={cn(
        `fixed top-0 ${
          dir == "rtl" ? "" : "left-0"
        }  z-80 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300`,
        sidebar?.isOpen === false ? "w-[90px]" : "lg:w-72 w-6"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div
        className={`relative h-full flex flex-col px-3 py-2 overflow-y-auto border-r border-slate-200 shadow-sm dark:shadow-zinc-800 bg-slate-50 dark:bg-custom-dark-blue text-slate-900 dark:text-white ${
          dir == "rtl" ? "invisible lg:visible" : ""
        } `}
      >
        <div
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
        >
          <div className="cursor-pointer" onClick={handleLogo}>
            <div
              className={cn(
                "flex items-center gap-3 whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 text-slate-900 dark:text-white",
                sidebar?.isOpen === false
                  ? "translate-x-0 opacity-100"
                  : "translate-x-0 opacity-100"
              )}
            >
              <img
                src="/images/logo-kilocao.png"
                alt="loco_kilocao"
                className={cn(
                  "object-contain",
                  sidebar?.isOpen === false
                    ? "w-12 h-12"
                    : "w-24 h-12 rounded"
                )}
              />
            </div>
          </div>
          <div className="flex items-center my-4 lg:my-0"></div>
          <div
            className={
              sidebar?.isOpen === false
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100 relative mt-4"
            }
          >
            <Search
              className={`absolute w-5 h-5 mt-2.5 text-slate-400 dark:text-white ${
                dir == "rtl" ? "left-4" : " right-4"
              }  `}
            />
            <Input
              type="text"
              placeholder="Search...."
              onChange={(e) => setSearch(e.target.value || "")}
              className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-slate-200 ring-offset-0 sidebar-search dark:bg-[#072441] dark:text-white"
            />
          </div>
        </div>
        {isPending || isFetching ? (
          <div>
            <div className="p-4 w-full">
              <div className="space-y-4">
                <div className="h-10 bg-slate-200 rounded-md animate-pulse dark:bg-gray-500"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse dark:bg-gray-500"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse dark:bg-gray-500"></div>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-gray-500">
                  <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse dark:bg-gray-500"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Menu
            isOpen={sidebar.isOpen}
            getPermissions={getPermissions}
            menuItems={menuItems}
            search={search}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
