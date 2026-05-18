export interface DivulgadorSummary {
  products_available: number;
  buyers_captured: number;
  active_links: number;
  commission_estimated: number | null;
  role_label: "Admin" | "Colaborador";
  can_view_financials: boolean;
}

export interface DivulgadorProduct {
  id: number;
  name: string;
  supplier_name: string;
  price: number;
  stock: number;
  status: string;
  action_label?: string;
}

export interface DivulgadorBuyer {
  id: number;
  name: string;
  email: string;
  phone: string;
  product_interest: string | null;
  created_at: string | null;
}

export interface DivulgadorLink {
  id: number;
  product_name: string | null;
  code: string;
  url: string;
  status: string;
  commission_value: number;
}

export interface DivulgadorDashboardResponse {
  summary: DivulgadorSummary;
  products: DivulgadorProduct[];
  buyers: DivulgadorBuyer[];
  links: DivulgadorLink[];
  role: string | null;
}

export interface DivulgadorProductsResponse {
  summary: DivulgadorSummary;
  products: DivulgadorProduct[];
}

export interface DivulgadorBuyersResponse {
  summary: DivulgadorSummary;
  buyers: DivulgadorBuyer[];
}

export interface DivulgadorLinksResponse {
  summary: DivulgadorSummary;
  links: DivulgadorLink[];
}

export interface DivulgadorFinancialResponse {
  summary: DivulgadorSummary;
  financial: {
    estimated_commissions: number;
    active_links: number;
  };
}
