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
  useDivulgadorProductsService,
  useDivulgadorBuyersService,
  useDivulgadorLinksService,
  useDivulgadorFinancialService,
} from "./divulgador.service";
import type {
  DivulgadorBuyersResponse,
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
