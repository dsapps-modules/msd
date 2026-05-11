 "use client";

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import Dashboard from "@/components/screen/seller-section/dashboard";
import { ContentLayout } from "@/components/layout/content-layout";
import { useLocale } from "next-intl";

const DashboardRoot = () => {
  const sidebar =
    useStore(useSidebarToggle, (state) => state) ?? {
      isOpen: true,
      setIsOpen: () => {},
    };
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const sidebarOffset =
    sidebar?.isOpen === false
      ? dir === "rtl"
        ? "lg:pr-[90px]"
        : "lg:pl-[90px]"
      : dir === "rtl"
      ? "lg:pr-72"
      : "lg:pl-72";

  return (
    <div className={sidebarOffset}>
      <ContentLayout>
        <Dashboard />
      </ContentLayout>
    </div>
  );
};

export default DashboardRoot;
