(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/modules/common/com/com.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCurrencyDropdownListService",
    ()=>useCurrencyDropdownListService,
    "useCurrencyListService",
    ()=>useCurrencyListService,
    "useGeneralListService",
    ()=>useGeneralListService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
const useGeneralListService = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GENERAL);
};
_s(useGeneralListService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useCurrencyListService = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY);
};
_s1(useCurrencyListService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useCurrencyDropdownListService = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY_DROPDOWN_LIST);
};
_s2(useCurrencyDropdownListService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/common/com/com.action.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCurrencyDropdownListQuery",
    ()=>useCurrencyDropdownListQuery,
    "useCurrencyQuery",
    ()=>useCurrencyQuery,
    "useGeneralQuery",
    ()=>useGeneralQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/common/com/com.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
const useGeneralQuery = (options)=>{
    _s();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGeneralListService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GENERAL
        ],
        queryFn: {
            "useGeneralQuery.useQuery": ()=>findAll(options)
        }["useGeneralQuery.useQuery"],
        refetchOnWindowFocus: false,
        ...options
    });
    return {
        general: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s(useGeneralQuery, "JVyzp9dYcPqfkpCwj6IDA7LELow=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGeneralListService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useCurrencyQuery = (options)=>{
    _s1();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrencyListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY
        ],
        queryFn: {
            "useCurrencyQuery.useQuery": ()=>findAll(options)
        }["useCurrencyQuery.useQuery"],
        ...options
    });
    return {
        currency: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s1(useCurrencyQuery, "3EK95S1+7dyYhXE9MRf9SVHdCJo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrencyListService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useCurrencyDropdownListQuery = (options)=>{
    _s2();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrencyDropdownListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY_DROPDOWN_LIST
        ],
        queryFn: {
            "useCurrencyDropdownListQuery.useQuery": ()=>findAll(options)
        }["useCurrencyDropdownListQuery.useQuery"],
        ...options
    });
    return {
        currencyDropdownList: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s2(useCurrencyDropdownListQuery, "9XJeDUQtWSPH2KhSeaFjaWxIyGw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrencyDropdownListService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/admin-section/admin-dashboard/admin-dashboard.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdminDashboardService",
    ()=>useAdminDashboardService,
    "useAdminOrderGrowthService",
    ()=>useAdminOrderGrowthService,
    "useAdminOtherSummaryService",
    ()=>useAdminOtherSummaryService,
    "useAdminSalesService",
    ()=>useAdminSalesService,
    "useStoreTypeListService",
    ()=>useStoreTypeListService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
;
;
const useAdminDashboardService = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_DASHBOARD_LIST);
};
_s(useAdminDashboardService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useAdminSalesService = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_SALES_LIST);
};
_s1(useAdminSalesService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useAdminOrderGrowthService = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_ORDER_GROWTH_LIST);
};
_s2(useAdminOrderGrowthService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useAdminOtherSummaryService = ()=>{
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_OTHER_SUMMARY_LIST);
};
_s3(useAdminOtherSummaryService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useStoreTypeListService = ()=>{
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_TYPE_LIST);
};
_s4(useStoreTypeListService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/admin-section/admin-dashboard/admin-dashboard.action.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdminDashboardQuery",
    ()=>useAdminDashboardQuery,
    "useAdminGrowthOrderQuery",
    ()=>useAdminGrowthOrderQuery,
    "useAdminOtherSummaryQuery",
    ()=>useAdminOtherSummaryQuery,
    "useAdminSalesSummaryQuery",
    ()=>useAdminSalesSummaryQuery,
    "useStoreTypeListQuery",
    ()=>useStoreTypeListQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/admin-section/admin-dashboard/admin-dashboard.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
;
;
;
;
;
const useAdminDashboardQuery = (options)=>{
    _s();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminDashboardService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_DASHBOARD_LIST
        ],
        queryFn: {
            "useAdminDashboardQuery.useQuery": ()=>findAll(options)
        }["useAdminDashboardQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdminDashboardQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useAdminDashboardQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useAdminDashboardQuery.useEffect"]
                });
            }
        }
    }["useAdminDashboardQuery.useEffect"], [
        error
    ]);
    return {
        AdminDashboard: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s(useAdminDashboardQuery, "u0N5rhoqRVmL6YK8xwv0rBX9c7s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminDashboardService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAdminSalesSummaryQuery = (options)=>{
    _s1();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminSalesService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_SALES_LIST
        ],
        queryFn: {
            "useAdminSalesSummaryQuery.useQuery": ()=>findAll(options)
        }["useAdminSalesSummaryQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdminSalesSummaryQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useAdminSalesSummaryQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useAdminSalesSummaryQuery.useEffect"]
                });
            }
        }
    }["useAdminSalesSummaryQuery.useEffect"], [
        error
    ]);
    return {
        AdminSalesSummary: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s1(useAdminSalesSummaryQuery, "2ATQE4CciIZFuXB/uKLn2HPYYxg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminSalesService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAdminGrowthOrderQuery = (options)=>{
    _s2();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminOrderGrowthService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_ORDER_GROWTH_LIST
        ],
        queryFn: {
            "useAdminGrowthOrderQuery.useQuery": ()=>findAll(options)
        }["useAdminGrowthOrderQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdminGrowthOrderQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useAdminGrowthOrderQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useAdminGrowthOrderQuery.useEffect"]
                });
            }
        }
    }["useAdminGrowthOrderQuery.useEffect"], [
        error
    ]);
    return {
        AdminOrderGrowth: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s2(useAdminGrowthOrderQuery, "Ace7SG+gRXjeQFk0LG8RW13YmvM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminOrderGrowthService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useAdminOtherSummaryQuery = (options)=>{
    _s3();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminOtherSummaryService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_OTHER_SUMMARY_LIST
        ],
        queryFn: {
            "useAdminOtherSummaryQuery.useQuery": ()=>findAll(options)
        }["useAdminOtherSummaryQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdminOtherSummaryQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useAdminOtherSummaryQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useAdminOtherSummaryQuery.useEffect"]
                });
            }
        }
    }["useAdminOtherSummaryQuery.useEffect"], [
        error
    ]);
    return {
        AdminOtherSummary: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s3(useAdminOtherSummaryQuery, "qrOcRFUiz0yX/tUB07hDrmBxK2A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminOtherSummaryService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useStoreTypeListQuery = (options)=>{
    _s4();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreTypeListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_TYPE_LIST
        ],
        queryFn: {
            "useStoreTypeListQuery.useQuery": ()=>findAll(options)
        }["useStoreTypeListQuery.useQuery"],
        ...options
    });
    return {
        Stype: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s4(useStoreTypeListQuery, "qGvkBM0M8OL9ndoB2uhY9sdMjdc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreTypeListService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/imageLoader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const GlobalImageLoader = ({ src, width, quality })=>{
    // Add ?w=...&q=... only if not already present
    const hasQuery = src.includes("?");
    const separator = hasQuery ? "&" : "?";
    return `${src}${separator}w=${width}&q=${quality || 75}`;
};
_c = GlobalImageLoader;
const __TURBOPACK__default__export__ = GlobalImageLoader;
var _c;
__turbopack_context__.k.register(_c, "GlobalImageLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0wcjkk-._.js.map