import { DIVULGADOR_API_ENDPOINTS } from "@/endpoints/DivulgadorApiEndPoints";
import { useBaseService } from "@/modules/core/base.service";
import {
  DivulgadorDashboardResponse,
  DivulgadorFinancialResponse,
  DivulgadorBuyersResponse,
  DivulgadorLinksResponse,
  DivulgadorProductsResponse,
} from "./divulgador.type";

export const useDivulgadorDashboardService = () => {
  return useBaseService<DivulgadorDashboardResponse>(
    DIVULGADOR_API_ENDPOINTS.DASHBOARD
  );
};

export const useDivulgadorProductsService = () => {
  return useBaseService<DivulgadorProductsResponse>(
    DIVULGADOR_API_ENDPOINTS.PRODUCTS
  );
};

export const useDivulgadorBuyersService = () => {
  return useBaseService<DivulgadorBuyersResponse>(DIVULGADOR_API_ENDPOINTS.BUYERS);
};

export const useDivulgadorLinksService = () => {
  return useBaseService<DivulgadorLinksResponse>(DIVULGADOR_API_ENDPOINTS.LINKS);
};

export const useDivulgadorFinancialService = () => {
  return useBaseService<DivulgadorFinancialResponse>(
    DIVULGADOR_API_ENDPOINTS.FINANCIAL
  );
};
