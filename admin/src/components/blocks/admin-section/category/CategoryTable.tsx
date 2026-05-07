"use client";
import ExpandedRCTable from "@/components/molecules/ExpandedRCTable";
import Loader from "@/components/molecules/Loader";
import Pagination from "@/components/molecules/Pagination";
import { AppSelect } from "@/components/blocks/common";
import Delete from "@/components/blocks/custom-icons/Delete";
import TableEdit from "@/components/blocks/custom-icons/TableEdit";
import ConfirmationModal from "@/components/blocks/shared/ConfirmationModal";
import { BulkActionBar } from "@/components/blocks/shared";
import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/components/ui";
import { CountItems } from "@/config/helperJson";
import { Routes } from "@/config/routes";
import GlobalImageLoader from "@/lib/imageLoader";
import {
  useCategoriesQuery,
  useCategoryDelete,
  useCategoryStatusUpdate,
} from "@/modules/admin-section/category/category.action";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TableSkeletonLoader from "@/components/molecules/TableSkeletonLoader";

interface RecordType {
  id: string;
  Expand: any;
  serial: string;
  display_order?: number;
  category_name: string;
  meta_title?: string;
  category_banner_url?: string;
  category_thumb_url?: string;
  meta_description?: string;
  actions?: any;
  selectActions?: any;
  status?: boolean;
  key: React.Key;
  children?: RecordType[];
}
interface ColumnType<RecordType> {
  title: string;
  dataIndex?: keyof RecordType;
  key?: string;
  width?: number | string;
  fixed?: "left" | "right" | undefined;
  ellipsis?: boolean;
  children?: ColumnType<RecordType>[];
}
type ColumnsType<RecordType> = ColumnType<RecordType>[];

const CategoryTable = ({ searchValue }: any) => {
  const t = useTranslations();
  const locale = useLocale();
  const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
    return parseInt(localStorage.getItem("itemsPerPage") || "10");
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedInfo, setSortedInfo] = useState<{
    columnKey: string;
    order: string;
  }>({
    columnKey: "",
    order: "",
  });
  const sortField = sortedInfo.order == "ascend" ? "asc" : "desc";
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedAction, setSelectedAction] = useState<string>("");
  const { categories, refetch, isPending, error } = useCategoriesQuery({
    list: true,
    per_page: itemsPerPage,
    language: locale,
    page: currentPage,
    sortField: sortedInfo.columnKey == "" ? "id" : sortedInfo.columnKey,
    sort: sortField,
    search: searchValue,
  });

  let totalDataLength = (categories as any)?.meta?.total;
  const startIndex = (categories as any)?.meta?.from;
  const LastPage = (categories as any)?.meta?.last_page;
  const originalData = useMemo(() => {
    const data = (categories as any)?.data || [];
    return data.map((item: any, index: number) => ({
      ...item,
      serial: startIndex + index,
    }));
  }, [categories, startIndex]);

  useEffect(() => {
    if (Number(currentPage) > Number(LastPage)) {
      setCurrentPage(LastPage);
    } else {
      setCurrentPage(currentPage);
    }
  }, [LastPage, currentPage]);

  const updatePage = (p: any) => {
    setCurrentPage(p);
  };

  const handleSort = (columnKey: string) => {
    setSortedInfo((prev) => {
      const isSameColumn = prev.columnKey === columnKey;
      const newOrder =
        isSameColumn && prev.order === "ascend" ? "descend" : "ascend";
      return { columnKey, order: newOrder };
    });
  };

  const handleSelectItemsPerPage = (value: string) => {
    const newItemsPerPage = parseInt(value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    localStorage.setItem("itemsPerPage", value);
  };
  const [loading, setLoading] = useState(false);
  const { mutate: blogCategoryStatus } = useCategoryStatusUpdate();
  const handleToggleStatus = (id: string) => {
    setLoading(true);
    blogCategoryStatus(
      { id },
      {
        onSuccess: () => {
          refetch();
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const { mutate: CategoryDelete, isPending: isRequesting } =
    useCategoryDelete();

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows(new Set(originalData.map((row: any) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelection = (rowId: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(rowId)) {
        updated.delete(rowId);
      } else {
        updated.add(rowId);
      }
      return updated;
    });
  };
  const handleApplyDelete = () => {
    if (selectedAction === "deleted") {
      handleBulkDelete();
    }
  };

  const handleBulkDelete = () => {
    const Ids = Array.from(selectedRows);
    CategoryDelete(
      { ids: Ids },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
    setSelectedRows(new Set());
  };

  const handleDelete = (id: any) => {
    setLoading(true);
    const Ids = [id];
    CategoryDelete(
      { ids: Ids },
      {
        onSuccess: () => {
          refetch();
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const addMenuLevel = useCallback((items: any[], level = 0): any[] => {
    return items.map((item) => {
      const newItem = {
        ...item,
        menu_level: level,
      };

      if (item.children && item.children.length > 0) {
        newItem.children = addMenuLevel(item.children, level + 1);
      }

      return newItem;
    });
  }, []);

  const dataWithMenuLevels = useMemo(() => {
    return addMenuLevel(originalData);
  }, [originalData, addMenuLevel]);

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    return isMobile;
  };

  const useColumn = (
    fixLeft: boolean,
    fixRight: boolean
  ): ColumnsType<RecordType> => {
    const isMobile = useIsMobile();
    const columns: ColumnsType<RecordType> = React.useMemo(
      () => [
        {
          title: "",
          dataIndex: "selectActions",
          width: "5%",
          fixed: fixLeft ? "left" : undefined,
        },
        {
          title: t("table_header.category"),
          dataIndex: "category_name",
          width: 200,
        },
        {
          title: t("table_header.thumb"),
          dataIndex: "category_thumb_url",
          width: 100,
        },
        {
          title: t("table_header.status"),
          dataIndex: "status",
          width: "20%",
        },
        {
          title: t("table_header.actions"),
          dataIndex: "actions",
          width: "12%",
          fixed: !isMobile && fixRight ? "right" : undefined,
        },
      ],
      [fixLeft, fixRight, isMobile]
    );
    const router = useRouter();
    const [editRowId, setEditRowId] = useState<string | null>(null);

    const handleEdit = (e: React.MouseEvent, id: string) => {
      const url = `${Routes.editCategory}/${id}`;
      if (e.ctrlKey || e.metaKey || e.button === 1) {
        window.open(url, "_blank");
      } else {
        setEditRowId(id);
        router.push(url);
      }
    };
    const renderColumns = columns.map((col) => {
      if (col.dataIndex === "category_thumb_url") {
        return {
          ...col,
          render: (category_thumb_url: any, row: RecordType) => (
            <div className="relative w-12 h-12">
              {category_thumb_url !== null ? (
                <Image
                  loader={GlobalImageLoader}
                  src={category_thumb_url}
                  alt="category_thumb_url"
                  fill
                  sizes="48px"
                  className="w-full h-full"
                />
              ) : (
                <Image
                  src="/images/no-image.png"
                  alt="No Image"
                  fill
                  sizes="48px"
                  className="w-full h-full"
                />
              )}
            </div>
          ),
        };
      }
      if (col.dataIndex === "status") {
        return {
          ...col,
          render: (status: any, row: RecordType) => (
            <div className="flex items-center justify-start gap-2">
              <div className="w-[75px]">
                <Badge
                  className={` ${
                    status == 1
                      ? "bg-green-50 border border-green-500 text-green-500"
                      : "bg-gray-50 border border-gray-500 text-gray-500"
                  } capitalize`}
                >
                  {`${status == 1 ? t("common.active") : t("common.inactive")}`}
                </Badge>
              </div>

              <ConfirmationModal
                trigger={
                  <div dir="ltr">
                    <Switch checked={status == 1} />
                  </div>
                }
                loading={loading}
                onSave={() => handleToggleStatus(row.id)}
                title={t("title.update_status")}
                subTitle={t("sub_title.update_status")}
              />
            </div>
          ),
        };
      }
      if (col.dataIndex === "actions") {
        return {
          ...col,
          render: (o: any, row: RecordType) => (
            <div className="flex items-center gap-2 ">
              <TableEdit
                isLoading={editRowId === row.id}
                onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
                  handleEdit(e, row.id)
                }
              />
              <ConfirmationModal
                trigger={<Delete />}
                onSave={() => handleDelete(row.id)}
                loading={loading}
                title={t("title.delete_category")}
                subTitle={t("sub_title.delete_category")}
              />
            </div>
          ),
        };
      }
      return col;
    });
    return renderColumns;
  };

  useEffect(() => {
    if (!isPending && !error) {
      refetch();
    }
  }, [
    searchValue,
    sortField,
    itemsPerPage,
    currentPage,
    isPending,
    refetch,
    error,
  ]);

  const actions = [
    {
      value: "deleted",
      label: t("common.delete"),
      onClick: handleApplyDelete,
    },
  ];

  return (
    <>
      {isPending ? (
        <TableSkeletonLoader />
      ) : (
        <>
          <div className="relative">
            <BulkActionBar
              selectedAction={selectedAction}
              setSelectedAction={setSelectedAction}
              selectedRows={selectedRows}
              originalDataLength={originalData.length}
              handleSelectAll={handleSelectAll}
              isRequesting={isRequesting}
              actions={actions}
              checkboxCustomClass="ml-[58px]"
            />

            <ExpandedRCTable
              originData={dataWithMenuLevels}
              useColumn={useColumn}
              sortedInfo={sortedInfo}
              handleSort={handleSort}
              selectedRows={selectedRows}
              handleRowSelection={handleRowSelection}
              maxWidth={1000}
            />
          </div>
          <div className="mt-3 flex flex-col md:flex-row justify-between">
            <div>
              <AppSelect
                value={String(itemsPerPage)}
                onSelect={handleSelectItemsPerPage}
                groups={CountItems}
                customClass="w-[80px] h-8 mb-4 md:mb-0"
                hideNone
              />
            </div>
            <Pagination
              pageSize={itemsPerPage}
              outline
              onChange={updatePage}
              current={currentPage}
              total={totalDataLength}
              defaultCurrent={1}
              jumpPrevIcon={<ChevronsLeftIcon className="h-4 w-4" />}
              jumpNextIcon={<ChevronsRightIcon className="h-4 w-4" />}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CategoryTable;
