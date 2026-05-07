import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";
import { Routes } from "@/config/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CategoryFormData, statusUpdateData } from "./category.schema";
import {
  useCategoryDeleteService,
  useCategoryEditService,
  useCategoryService,
  useCategoryStatusUpdateService,
  useCategoryStoreService,
  useCategoryUpdateService,
} from "./category.service";
import { CategoryQueryOptions } from "./category.type";
import { useEffect, useRef } from "react";

export const useCategoriesQuery = (options: Partial<CategoryQueryOptions>) => {
  const { findAll } = useCategoryService();
  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.CATEGORY, options?.type],
    queryFn: () => findAll(options),
    ...options,
  });
  return {
    categories: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};
export const useCategoryQueryById = (id: string) => {
  const { find } = useCategoryEditService();
  const errorToastRef = useRef<string | null>(null);
  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.CATEGORY_EDIT, id],
    queryFn: () => find(id),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  useEffect(() => {
    //@ts-ignore
    const errorToast = error?.response?.data?.message;
    if (error && errorToast !== errorToastRef.current) {
      errorToastRef.current = errorToast;
      toast?.error(`${errorToast}`, {
        onClose: () => {
          errorToastRef.current = null;
        },
      });
    }
  }, [error]);
  return {
    SingleCategory: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};

export const useCategoryStoreMutation = () => {
  const { create } = useCategoryStoreService();
  const router = useRouter();
  return useMutation({
    mutationFn: (values: CategoryFormData) => create(values),
    mutationKey: [API_ENDPOINTS.CATEGORY_ADD],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
        router.push(Routes.categories);
      } else {
        toast.error(data?.data?.message);
      }
    },
    onError: async (data) => {
      // @ts-ignore
      const errorText = data?.response?.data;
      if (errorText && typeof errorText === "object") {
        Object.entries(errorText).forEach(([key, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          } else if (typeof messages === "string") {
            toast.error(messages);
          }
        });
      } else {
        toast.error(errorText?.message);
      }
    },
  });
};
export const useCategoryUpdateMutation = () => {
  const { create } = useCategoryUpdateService();
  const router = useRouter();
  return useMutation({
    mutationFn: (values: CategoryFormData) => create(values),
    mutationKey: [API_ENDPOINTS.CATEGORY_UPDATE],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
        router.push(Routes.categories);
      }
    },
    onError: async (data) => {
      const errorText = (data as any)?.response?.data;
      if (errorText && typeof errorText === "object") {
        Object.entries(errorText).forEach(([key, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          } else if (typeof messages === "string") {
            toast.error(messages);
          }
        });
      } else {
        toast.error(errorText?.message);
      }
    },
  });
};
export const useCategoryStatusUpdate = () => {
  const { patchItem } = useCategoryStatusUpdateService();
  return useMutation({
    mutationFn: (values: statusUpdateData) => patchItem(values),
    mutationKey: [API_ENDPOINTS.CATEGORY_STATUS],
    onSuccess: async (data) => {
      toast.success((data as any)?.data?.message);
    },
    onError: async (data) => {
      const errorText = (data as any)?.response?.data;
      if (errorText && typeof errorText === "object") {
        Object.entries(errorText).forEach(([key, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          } else if (typeof messages === "string") {
            toast.error(messages);
          }
        });
      } else {
        toast.error(errorText?.message);
      }
    },
  });
};

export const useCategoryDelete = () => {
  const { create } = useCategoryDeleteService();
  return useMutation({
    mutationFn: (values: any) => create(values),
    mutationKey: [API_ENDPOINTS.CATEGORY_REMOVE],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
      } else {
        toast.error(data?.data?.message);
      }
    },
     onError: async (data) => {
          // @ts-ignore
          const errorText = data?.response?.data;
          if (errorText && typeof errorText === "object") {
            Object.entries(errorText).forEach(([key, messages]) => {
              if (Array.isArray(messages)) {
                messages.forEach((msg) => toast.error(msg));
              } else if (typeof messages === "string") {
                toast.error(messages);
              }
            });
          } else {
            toast.error(errorText?.message);
          }
        },
  });
};