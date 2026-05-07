import { Routes } from "@/config/routes";
import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { DynamicFieldFormData, statusUpdateData } from "./dynamic-fields.schema";
import {
  useDynamicFieldDeleteService,
  useDynamicFieldEditService,
  useDynamicFieldOptionDeleteService,
  useDynamicFieldOptionEditService,
  useDynamicFieldOptionQueryService,
  useDynamicFieldOptionStoreService,
  useDynamicFieldOptionUpdateService,
  useDynamicFieldQueryService,
  useDynamicFieldStatusUpdateService,
  useDynamicFieldStoreService,
  useDynamicFieldUpdateService,
  useDynamicRequiredFieldUpdateService
} from "./dynamic-fields.service";
import { DynamicFieldQueryOptions } from "./dynamic-fields.type";


export const useDynamicFieldsQuery = (options: Partial<DynamicFieldQueryOptions>) => {
  const { findAll } = useDynamicFieldQueryService();

  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.DYNAMIC_FIELD_LIST],
    queryFn: () => findAll(options),
    ...options,
  });

  return {
    DynamicFields: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};

export const useDynamicFieldQueryById = (id: string) => {
  const { find } = useDynamicFieldEditService();
  const errorToastRef = useRef<string | null>(null);
  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.DYNAMIC_FIELD_BY_ID, id],
    queryFn: () => find(id),
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
    DynamicFieldByID: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};

export const useDynamicFieldStoreMutation = () => {
  const router = useRouter();
  const { create } = useDynamicFieldStoreService();
  return useMutation({
    mutationFn: (values: DynamicFieldFormData) => create(values),
    mutationKey: [API_ENDPOINTS.DYNAMIC_FIELD_CREATE],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
        router.push(Routes.DynamicField);
      } else {
        toast.error(data?.data?.message);
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
export const useDynamicFieldUpdateMutation = () => {
  const router = useRouter();
  const { create } = useDynamicFieldUpdateService();
  return useMutation({
    mutationFn: (values: DynamicFieldFormData) => create(values),
    mutationKey: [API_ENDPOINTS.DYNAMIC_FIELD_UPDATE],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
        router.push(Routes.DynamicField);
      } else {
        toast.error(data?.data?.message);
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

 export const useDynamicFieldStatusUpdate = () => {
  const { patchItem } = useDynamicFieldStatusUpdateService();

  return useMutation({
    mutationFn: (values: statusUpdateData) => patchItem(values),
    mutationKey: [API_ENDPOINTS.DYNAMIC_FIELD_STATUS_UPDATE],
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
 export const useDynamicRequiredFieldUpdate = () => {
  const { patchItem } = useDynamicRequiredFieldUpdateService();

  return useMutation({
    mutationFn: (values: statusUpdateData) => patchItem(values),
    mutationKey: [API_ENDPOINTS.DYNAMIC_REQUIRED_FIELD_UPDATE],
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



export const useDynamicFieldDelete = () => {
  const { delete: deleteItem } = useDynamicFieldDeleteService();
  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    mutationKey: [API_ENDPOINTS.DYNAMIC_FIELD_DELETE],
        onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
      } else {
        toast.error(data?.data?.message);
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

//option section 
export const useDynamicFieldOptionQuery = (options: Partial<DynamicFieldQueryOptions>) => {
  const { findAll } = useDynamicFieldOptionQueryService();

  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.DYNAMIC_FIELD_OPTION_LIST, options?.dynamic_field_id],
    queryFn: () => findAll(options),
    refetchOnWindowFocus: false,
    enabled: !!options?.dynamic_field_id,
    ...options,
  });

  return {
    DynamicFieldOption: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};

export const useDynamicFieldOptionStoreMutation = () => {
  const router = useRouter();
  const { create } = useDynamicFieldOptionStoreService();
  return useMutation({
    mutationFn: (values: DynamicFieldFormData) => create(values),
    mutationKey: [API_ENDPOINTS.DYNAMIC_FIELD_OPTION_CREATE],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
        // router.push(Routes.DynamicField);
      } else {
        toast.error(data?.data?.message);
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

export const useDynamicFieldOptionQueryById = (editRowId: any) => {
  const { find } = useDynamicFieldOptionEditService();
  const errorToastRef = useRef<string | null>(null);
  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.DYNAMIC_FIELD_OPTION_BY_ID, editRowId],
    queryFn: () => find(editRowId),
    refetchOnWindowFocus: false,
    enabled: !!editRowId,
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
    DynamicFieldOptionByID: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};
export const useDynamicFieldOptionUpdateMutation = () => {
  const router = useRouter();
  const { create } = useDynamicFieldOptionUpdateService();
  return useMutation({
    mutationFn: (values: DynamicFieldFormData) => create(values),
    mutationKey: [API_ENDPOINTS.DYNAMIC_FIELD_OPTION_UPDATE],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
        // router.push(Routes.DynamicField);
      } else {
        toast.error(data?.data?.message);
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

export const useDynamicFieldOptionDelete = () => {
  const { delete: deleteItem } = useDynamicFieldOptionDeleteService();
  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    mutationKey: [API_ENDPOINTS.DYNAMIC_FIELD_OPTION_DELETE],
        onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message);
      } else {
        toast.error(data?.data?.message);
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