"use client";
import Loader from "@/components/molecules/Loader";
import LoaderOverlay from "@/components/molecules/LoaderOverlay";
import BlogCategoryForm from "@/components/blocks/admin-section/blog/category/BlogCategoryForm";
import { Card, CardContent } from "@/components/ui";
import { Routes } from "@/config/routes";
import { useBlogCategoryQueryById } from "@/modules/admin-section/blog/blog-category/blog-category.action";
import { useAppSelector } from "@/redux/hooks";
import { Layers3 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CardSkletonLoader from "@/components/molecules/CardSkletonLoader";

const EditBlogCategory = ({ ID }: any) => {
  const t = useTranslations();
  const isRefetch = useAppSelector((state) => state.refetchValue.isRefetch);
  const { BlogCategory, refetch, isPending } = useBlogCategoryQueryById(ID);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isRefetch) {
      refetch();
    }
  }, [isRefetch, refetch]);
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);
  if (!ID) {
    return (
      <div className="mt-10">
        <h1 className="text-xl text-red-500">{t("common.invalid_id")}</h1>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <LoaderOverlay isLoading={isLoading} />
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-4  justify-between p-2 md:p-4">
          <div className="flex items-center justify-start md:justify-center gap-2">
            <Layers3 />
            <h1 className="text-lg md:text-2xl font-semibold text-black dark:text-white flex items-center gap-2">
              {t("common.edit_blog_category")}
            </h1>
          </div>
          <div className="flex">
            <p className="text-sm font-semibold text-blue-500 hover:text-white dark:text-[#93c5fd] dark:hover:text-white  bg-blue-100 hover:bg-blue-500 py-2 px-4 rounded flex items-center gap-2">
              <Link
                className=""
                href={Routes.blogCategories}
                onClick={(e) => {
                  const isNewTab = e.metaKey || e.ctrlKey || e.button === 1;

                  if (!isNewTab) {
                    setIsLoading(true);
                  }
                }}
              >
                {t("link.all_blog_category")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      {isPending || !BlogCategory ? (
        <CardSkletonLoader />
      ) : (
        <>
          <BlogCategoryForm data={BlogCategory} />
        </>
      )}
    </div>
  );
};

export default EditBlogCategory;
