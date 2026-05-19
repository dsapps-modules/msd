import { API_ENDPOINTS } from "@/endpoints/AdminApiEndPoints";
import { useQuery } from "@tanstack/react-query";
import { useCurrencyDropdownListService, useCurrencyListService, useGeneralListService } from "./com.service";
import { CurrencyQueryOptions, GeneralQueryOptions } from "./com.type";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const useGeneralQuery = (options: Partial<GeneralQueryOptions>) => {
  const { findAll } = useGeneralListService();
  const errorToastRef = useRef<string | null>(null);
  const isClient = typeof window !== "undefined";

  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.GENERAL],
    queryFn: () => findAll(options),
    refetchOnWindowFocus: false,
    enabled: options.enabled ?? isClient,
    ...options,
  });
  return {
    general: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};

export const useCurrencyQuery = (options: Partial<CurrencyQueryOptions>) => {
  const { findAll } = useCurrencyListService();
  const isClient = typeof window !== "undefined";
  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.CURRENCY],
    queryFn: () => findAll(options),
    enabled: options.enabled ?? isClient,
    ...options,
  });
  return {
    currency: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};
export const useCurrencyDropdownListQuery = (options: Partial<CurrencyQueryOptions>) => {
  const { findAll } = useCurrencyDropdownListService();
  const isClient = typeof window !== "undefined";
  const { data, isPending, error, refetch, isFetching } = useQuery({
    queryKey: [API_ENDPOINTS.CURRENCY_DROPDOWN_LIST],
    queryFn: () => findAll(options),
    enabled: options.enabled ?? isClient,
    ...options,
  });
  return {
    currencyDropdownList: data?.data ?? {},
    error,
    isPending,
    refetch,
    isFetching,
  };
};
