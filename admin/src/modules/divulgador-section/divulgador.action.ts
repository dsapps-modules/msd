"use client";

import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import { DIVULGADOR_API_ENDPOINTS } from "@/endpoints/DivulgadorApiEndPoints";
import { AUTH_CRED, AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { authorizationAtom } from "@/lib/authorization-atom";
import { useToken } from "@/lib/use-token";
import { useBaseService } from "@/modules/core/base.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { toast } from "react-toastify";
import {
  useDivulgadorDashboardService,
  useDivulgadorCampaignService,
  useDivulgadorProductsService,
  useDivulgadorBuyersService,
  useDivulgadorLinksService,
  useDivulgadorFinancialService,
} from "./divulgador.service";
import type {
  DivulgadorBuyersResponse,
  DivulgadorCampaignResponse,
  DivulgadorDashboardResponse,
  DivulgadorFinancialResponse,
  DivulgadorLinksResponse,
  DivulgadorProductsResponse,
} from "./divulgador.type";

export const useDivulgadorDashboardQuery = (options?: any) => {
  const { findAll } = useDivulgadorDashboardService();
  const [isAuthorized] = useAtom(authorizationAtom);
  const query = useQuery<AxiosResponse<DivulgadorDashboardResponse>>({
    queryKey: [DIVULGADOR_API_ENDPOINTS.DASHBOARD, options],
    queryFn: () => findAll(options),
    retry: false,
    enabled: isAuthorized,
    ...options,
  });

  return {
    divulgadorDashboard: query.data?.data,
    isPending: isAuthorized ? query.isPending : false,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useDivulgadorProductsQuery = (options?: any) => {
  const { findAll } = useDivulgadorProductsService();
  const [isAuthorized] = useAtom(authorizationAtom);
  const query = useQuery<AxiosResponse<DivulgadorProductsResponse>>({
    queryKey: [DIVULGADOR_API_ENDPOINTS.PRODUCTS, options],
    queryFn: () => findAll(options),
    retry: false,
    enabled: isAuthorized,
    ...options,
  });

  return {
    divulgadorProducts: query.data?.data,
    isPending: isAuthorized ? query.isPending : false,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useDivulgadorBuyersQuery = (options?: any) => {
  const { findAll } = useDivulgadorBuyersService();
  const [isAuthorized] = useAtom(authorizationAtom);
  const query = useQuery<AxiosResponse<DivulgadorBuyersResponse>>({
    queryKey: [DIVULGADOR_API_ENDPOINTS.BUYERS, options],
    queryFn: () => findAll(options),
    retry: false,
    enabled: isAuthorized,
    ...options,
  });

  return {
    divulgadorBuyers: query.data?.data,
    isPending: isAuthorized ? query.isPending : false,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useDivulgadorLinksQuery = (options?: any) => {
  const { findAll } = useDivulgadorLinksService();
  const [isAuthorized] = useAtom(authorizationAtom);
  const query = useQuery<AxiosResponse<DivulgadorLinksResponse>>({
    queryKey: [DIVULGADOR_API_ENDPOINTS.LINKS, options],
    queryFn: () => findAll(options),
    retry: false,
    enabled: isAuthorized,
    ...options,
  });

  return {
    divulgadorLinks: query.data?.data,
    isPending: isAuthorized ? query.isPending : false,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useDivulgadorFinancialQuery = (options?: any) => {
  const { findAll } = useDivulgadorFinancialService();
  const [isAuthorized] = useAtom(authorizationAtom);
  const query = useQuery<AxiosResponse<DivulgadorFinancialResponse>>({
    queryKey: [DIVULGADOR_API_ENDPOINTS.FINANCIAL, options],
    queryFn: () => findAll(options),
    retry: false,
    enabled: isAuthorized,
    ...options,
  });

  return {
    divulgadorFinancial: query.data?.data,
    isPending: isAuthorized ? query.isPending : false,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useDivulgadorCampaignQuery = (id?: string) => {
  const { find } = useDivulgadorCampaignService();
  const [isAuthorized] = useAtom(authorizationAtom);
  const query = useQuery<AxiosResponse<DivulgadorCampaignResponse>>({
    queryKey: [DIVULGADOR_API_ENDPOINTS.CAMPAIGNS, id],
    queryFn: () => find(String(id)),
    retry: false,
    enabled: isAuthorized && Boolean(id),
  });

  return {
    divulgadorCampaign: query.data?.data?.campaign,
    isPending: isAuthorized ? query.isPending : false,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useDivulgadorLogoutMutation = () => {
  const router = useRouter();
  const locale = useLocale();
  const queryClient = useQueryClient();
  const { postEmpty } = useBaseService<any>("/logout");
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);

  return useMutation({
    mutationFn: () => postEmpty(),
    mutationKey: [DIVULGADOR_API_ENDPOINTS.FINANCIAL, "logout"],
    onSuccess: async () => {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
      Cookies.remove(AUTH_CRED);
      setToken("");
      setAuthorized(false);
      queryClient.clear();
      router.push(`/${locale}${DivulgadorRoutes.signin}`);
      toast.success("User Logout Successfully");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
};

export const useDivulgadorCampaignStoreMutation = () => {
  const { create } = useDivulgadorCampaignService();
  const router = useRouter();
  const locale = useLocale();

  return useMutation({
    mutationFn: (values: FormData) => {
      (values as FormData & { multipart?: boolean }).multipart = true;
      return create(values as any);
    },
    mutationKey: [DIVULGADOR_API_ENDPOINTS.CAMPAIGNS, "store"],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message ?? "Campanha criada com sucesso.");
        router.push(`/${locale}${DivulgadorRoutes.dashboard}`);
      } else {
        toast.error(data?.data?.message ?? "Falha ao criar campanha.");
      }
    },
    onError: async (error) => {
      const errorText = (error as any)?.response?.data;
      if (errorText && typeof errorText === "object") {
        Object.entries(errorText).forEach(([, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          } else if (typeof messages === "string") {
            toast.error(messages);
          }
        });
      } else {
        toast.error(errorText?.message ?? "Falha ao criar campanha.");
      }
    },
  });
};

export const useDivulgadorCampaignUpdateMutation = () => {
  const { getAxiosInstance } = useDivulgadorCampaignService();
  const router = useRouter();
  const locale = useLocale();

  return useMutation({
    mutationFn: async (values: FormData) => {
      const payload = values as FormData & { multipart?: boolean };
      payload.multipart = true;

      const id = payload.get("id");
      if (!id) {
        throw new Error("Campaign id is required.");
      }

      payload.delete("id");
      payload.set("_method", "PUT");

      return getAxiosInstance().post(
        `${DIVULGADOR_API_ENDPOINTS.CAMPAIGNS}/${String(id)}`,
        payload as any
      );
    },
    mutationKey: [DIVULGADOR_API_ENDPOINTS.CAMPAIGNS, "update"],
    onSuccess: async (data) => {
      if (Boolean(data?.data)) {
        toast.success(data?.data?.message ?? "Campanha atualizada com sucesso.");
        router.push(`/${locale}${DivulgadorRoutes.dashboard}`);
      } else {
        toast.error(data?.data?.message ?? "Falha ao atualizar campanha.");
      }
    },
    onError: async (error) => {
      const errorText = (error as any)?.response?.data;
      if (errorText && typeof errorText === "object") {
        Object.entries(errorText).forEach(([, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          } else if (typeof messages === "string") {
            toast.error(messages);
          }
        });
      } else {
        toast.error(errorText?.message ?? "Falha ao atualizar campanha.");
      }
    },
  });
};
