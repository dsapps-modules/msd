module.exports = [
"[project]/src/modules/common/com/com.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCurrencyDropdownListService",
    ()=>useCurrencyDropdownListService,
    "useCurrencyListService",
    ()=>useCurrencyListService,
    "useGeneralListService",
    ()=>useGeneralListService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)");
;
;
const useGeneralListService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GENERAL);
};
const useCurrencyListService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY);
};
const useCurrencyDropdownListService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY_DROPDOWN_LIST);
};
}),
"[project]/src/modules/common/com/com.action.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCurrencyDropdownListQuery",
    ()=>useCurrencyDropdownListQuery,
    "useCurrencyQuery",
    ()=>useCurrencyQuery,
    "useGeneralQuery",
    ()=>useGeneralQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/common/com/com.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
;
const useGeneralQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGeneralListService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GENERAL
        ],
        queryFn: ()=>findAll(options),
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
const useCurrencyQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrencyListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY
        ],
        queryFn: ()=>findAll(options),
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
const useCurrencyDropdownListQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$common$2f$com$2f$com$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCurrencyDropdownListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CURRENCY_DROPDOWN_LIST
        ],
        queryFn: ()=>findAll(options),
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
}),
"[project]/src/modules/admin-section/admin-dashboard/admin-dashboard.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
;
;
const useAdminDashboardService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_DASHBOARD_LIST);
};
const useAdminSalesService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_SALES_LIST);
};
const useAdminOrderGrowthService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_ORDER_GROWTH_LIST);
};
const useAdminOtherSummaryService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_OTHER_SUMMARY_LIST);
};
const useStoreTypeListService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_TYPE_LIST);
};
}),
"[project]/src/modules/admin-section/admin-dashboard/admin-dashboard.action.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/admin-section/admin-dashboard/admin-dashboard.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const useAdminDashboardQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminDashboardService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_DASHBOARD_LIST
        ],
        queryFn: ()=>findAll(options),
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        //@ts-ignore
        const errorToast = error?.response?.data?.message;
        if (error && errorToast !== errorToastRef.current) {
            errorToastRef.current = errorToast;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                onClose: ()=>{
                    errorToastRef.current = null;
                }
            });
        }
    }, [
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
const useAdminSalesSummaryQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminSalesService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_SALES_LIST
        ],
        queryFn: ()=>findAll(options),
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        //@ts-ignore
        const errorToast = error?.response?.data?.message;
        if (error && errorToast !== errorToastRef.current) {
            errorToastRef.current = errorToast;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                onClose: ()=>{
                    errorToastRef.current = null;
                }
            });
        }
    }, [
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
const useAdminGrowthOrderQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminOrderGrowthService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_ORDER_GROWTH_LIST
        ],
        queryFn: ()=>findAll(options),
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        //@ts-ignore
        const errorToast = error?.response?.data?.message;
        if (error && errorToast !== errorToastRef.current) {
            errorToastRef.current = errorToast;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                onClose: ()=>{
                    errorToastRef.current = null;
                }
            });
        }
    }, [
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
const useAdminOtherSummaryQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminOtherSummaryService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_OTHER_SUMMARY_LIST
        ],
        queryFn: ()=>findAll(options),
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        //@ts-ignore
        const errorToast = error?.response?.data?.message;
        if (error && errorToast !== errorToastRef.current) {
            errorToastRef.current = errorToast;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                onClose: ()=>{
                    errorToastRef.current = null;
                }
            });
        }
    }, [
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
const useStoreTypeListQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$admin$2d$dashboard$2f$admin$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStoreTypeListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_TYPE_LIST
        ],
        queryFn: ()=>findAll(options),
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
}),
"[project]/src/lib/imageLoader.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const __TURBOPACK__default__export__ = GlobalImageLoader;
}),
];

//# sourceMappingURL=src_0wqezu6._.js.map