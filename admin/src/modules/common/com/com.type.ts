import { type QueryOptions } from "@/types";


export interface GeneralQueryOptions extends QueryOptions {
    filter?: any;
    enabled?: boolean;
}

export interface CurrencyQueryOptions extends QueryOptions {
    enabled?: boolean;
}


export interface KeywordSuggestionQueryOptions extends QueryOptions {
    query: string;
}
