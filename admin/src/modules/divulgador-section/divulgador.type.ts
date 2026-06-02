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

export interface DivulgadorCampaign {
  id: number;
  titulo: string;
  objetivo: string;
  meta_financeira: number;
  banner: string | null;
  banner_url: string | null;
  data_inicio: string | null;
  data_inicio_formatada?: string | null;
  data_fim: string | null;
  data_fim_formatada?: string | null;
  status: string;
  link_divulgacao: string | null;
  meta_total: number;
  progresso_atual: number;
  nome_campanha?: string;
  produto_nome?: string;
  fornecedor_nome?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface DivulgadorCampaignMutationResponse {
  success: boolean;
  message: string;
  campaign: DivulgadorCampaign;
}

export interface DivulgadorCampaignResponse {
  campaign: DivulgadorCampaign;
}

export interface DivulgadorDashboardResponse {
  summary: DivulgadorSummary;
  campaigns: DivulgadorCampaign[];
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
    received_total: number;
    pending_total: number;
    donations_count: number;
    purchase_total: number;
  };
  donations: DivulgadorDonation[];
}

export interface DivulgadorDonation {
  id: number;
  donor_name: string;
  purchase_value: number;
  donation_value: number;
  donation_date: string;
  status: "Pendente" | "Recebido" | string;
}
