(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/modules/core/base.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseService",
    ()=>useBaseService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/sellerRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localized-path.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)"); // Import useRouter
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
let isRefreshing = false;
let queue = [];
const subscribe = (cb)=>queue.push(cb);
const notifySubscribers = (token)=>{
    queue.forEach((cb)=>cb(token));
    queue = [];
};
;
const useBaseService = (route)=>{
    _s();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])(); // Get current path
    const pathnameWithoutLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useBaseService.useMemo[pathnameWithoutLocale]": ()=>pathname?.replace(/^\/[^/]+/, "") || ""
    }["useBaseService.useMemo[pathnameWithoutLocale]"], [
        pathname
    ]);
    const getSignInRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBaseService.useCallback[getSignInRoute]": ()=>{
            if (pathnameWithoutLocale.startsWith("/seller")) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SellerRoutes"].signin);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Routes"].signin);
        }
    }["useBaseService.useCallback[getSignInRoute]"], [
        locale,
        pathnameWithoutLocale
    ]);
    const axiosInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useBaseService.useMemo[axiosInstance]": ()=>{
            const instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
                baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_REST_API_ENDPOINT,
                timeout: 5000000,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            instance.interceptors.request.use({
                "useBaseService.useMemo[axiosInstance]": (config)=>{
                    const hasFile = config.data && config.data.multipart === true;
                    const cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                    const token = cookies || "";
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${token}`,
                        "X-localization": locale,
                        "Content-Type": hasFile ? "multipart/form-data" : "application/json"
                    };
                    return config;
                }
            }["useBaseService.useMemo[axiosInstance]"]);
            instance.interceptors.response.use({
                "useBaseService.useMemo[axiosInstance]": (response)=>response
            }["useBaseService.useMemo[axiosInstance]"], {
                "useBaseService.useMemo[axiosInstance]": async (error)=>{
                    const originalRequest = error.config || {};
                    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.endsWith("/refresh-token")) {
                        originalRequest._retry = true;
                        const oldToken = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]) || "";
                        if (!oldToken) {
                            router.push(getSignInRoute());
                            return Promise.reject(error);
                        }
                        if (isRefreshing) {
                            return new Promise({
                                "useBaseService.useMemo[axiosInstance]": (resolve, reject)=>{
                                    subscribe({
                                        "useBaseService.useMemo[axiosInstance]": (newToken)=>{
                                            if (!newToken) return reject(error);
                                            originalRequest.headers = {
                                                ...originalRequest.headers,
                                                Authorization: `Bearer ${newToken}`
                                            };
                                            resolve(instance(originalRequest));
                                        }
                                    }["useBaseService.useMemo[axiosInstance]"]);
                                }
                            }["useBaseService.useMemo[axiosInstance]"]);
                        }
                        isRefreshing = true;
                        try {
                            const refreshResp = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_REST_API_ENDPOINT}/refresh-token`, null, {
                                headers: {
                                    Authorization: `Bearer ${oldToken}`
                                }
                            });
                            const { token: newToken, new_expires_at } = refreshResp.data ?? {};
                            if (!newToken) throw new Error("No new token returned");
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], newToken);
                            if (new_expires_at) localStorage.setItem("expires_at", new_expires_at);
                            instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                            notifySubscribers(newToken);
                            originalRequest.headers = {
                                ...originalRequest.headers,
                                Authorization: `Bearer ${newToken}`
                            };
                            return instance(originalRequest);
                        } catch (refreshError) {
                            notifySubscribers("");
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_USER"]);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Session expired, please sign in again.");
                            // Redirect again here as fallback.
                            router.push(getSignInRoute());
                            return Promise.reject(refreshError);
                        } finally{
                            isRefreshing = false;
                        }
                    }
                    return Promise.reject(error);
                }
            }["useBaseService.useMemo[axiosInstance]"]);
            return instance;
        }
    }["useBaseService.useMemo[axiosInstance]"], [
        locale,
        pathname,
        router
    ]);
    const findAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBaseService.useCallback[findAll]": (params)=>{
            return axiosInstance.get(route, {
                params
            });
        }
    }["useBaseService.useCallback[findAll]"], [
        axiosInstance,
        route
    ]);
    const findAllByPost = (data)=>{
        return axiosInstance.post(route, data);
    };
    const find = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBaseService.useCallback[find]": (id, store_id)=>axiosInstance.get(`${route}/${id}`, {
                params: {
                    store_id
                }
            })
    }["useBaseService.useCallback[find]"], [
        axiosInstance,
        route
    ]);
    const findPageBySlug = (slug, params)=>axiosInstance.get(`${route}/${slug}`, {
            params
        });
    const findByStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBaseService.useCallback[findByStore]": (id, store_id)=>{
            return axiosInstance.get(`${route}/${id}`, {
                params: store_id ? {
                    store_id
                } : undefined
            });
        }
    }["useBaseService.useCallback[findByStore]"], [
        axiosInstance,
        route
    ]);
    const create = (data)=>{
        return axiosInstance.post(route, data);
    };
    const update = (data)=>{
        return axiosInstance.put(route, data);
    };
    const patchItem = (data)=>{
        return axiosInstance.patch(route, data);
    };
    const postEmpty = ()=>{
        return axiosInstance.post(route);
    };
    const deleteItem = (id)=>{
        return axiosInstance.delete(`${route}/${id}`);
    };
    const postItem = (id)=>{
        return axiosInstance.post(`${route}/${id}`);
    };
    const putItem = (id)=>{
        return axiosInstance.put(`${route}/${id}`);
    };
    const formatData = (data)=>{
        const response = data;
        const responseData = response;
        const items = responseData?.data;
        return items;
    };
    const formatSearchParams = (params)=>{
        return Object.entries(params).filter(([, value])=>Boolean(value)).map(([k, v])=>[
                "type",
                "categories",
                "tags",
                "author",
                "manufacturer",
                "shops"
            ].includes(k) ? `${k}.slug:${v}` : `${k}:${v}`).join(";");
    };
    return {
        findAll,
        findAllByPost,
        find,
        findPageBySlug,
        findByStore,
        create,
        postEmpty,
        update,
        patchItem,
        postItem,
        putItem,
        delete: deleteItem,
        formatData,
        formatSearchParams,
        getAxiosInstance: ()=>axiosInstance
    };
};
_s(useBaseService, "YdCIRHWtq5TZwG7kKxXn6AvEdU8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/users/users.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChangePasswordService",
    ()=>useChangePasswordService,
    "useForgotPasswordService",
    ()=>useForgotPasswordService,
    "useGetPermissionsService",
    ()=>useGetPermissionsService,
    "useLoginService",
    ()=>useLoginService,
    "useMeService",
    ()=>useMeService,
    "useOTPService",
    ()=>useOTPService,
    "useResendVerificationEmailService",
    ()=>useResendVerificationEmailService,
    "useResetChangePasswordService",
    ()=>useResetChangePasswordService,
    "useResetPasswordService",
    ()=>useResetPasswordService,
    "useSendVerificationEmailService",
    ()=>useSendVerificationEmailService,
    "useStoreOwnerLoginService",
    ()=>useStoreOwnerLoginService,
    "useUpdateUserService",
    ()=>useUpdateUserService,
    "useUserService",
    ()=>useUserService,
    "useVerifyEmailService",
    ()=>useVerifyEmailService,
    "useVerifyResetPasswordService",
    ()=>useVerifyResetPasswordService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature();
;
;
;
;
const useUserService = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_OWNER_REGISTER);
};
_s(useUserService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useLoginService = ()=>{
    _s1();
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].USERS_LOGIN);
    const logout = async ()=>{
        try {
            await service.getAxiosInstance().post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT, {});
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? `Error refetching data: ${error.message}` : "An unknown error occurred while refetching data");
        }
    };
    return {
        ...service,
        logout
    };
};
_s1(useLoginService, "y20/pFL+e2xcVU/vB/1XH2bH5+4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useStoreOwnerLoginService = ()=>{
    _s2();
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].SHOP_OWNER_LOGIN);
    const logout = async ()=>{
        try {
            await service.getAxiosInstance().post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT, {});
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? `Error refetching data: ${error.message}` : "An unknown error occurred while refetching data");
        }
    };
    return {
        ...service,
        logout
    };
};
_s2(useStoreOwnerLoginService, "y20/pFL+e2xcVU/vB/1XH2bH5+4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useMeService = ()=>{
    _s3();
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME);
    const me = ()=>{
        return service.findAll(); // Assuming this route just retrieves user info
    };
    return {
        ...service,
        me
    };
};
_s3(useMeService, "y20/pFL+e2xcVU/vB/1XH2bH5+4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useGetPermissionsService = ()=>{
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GET_PERMISSIONS);
};
_s4(useGetPermissionsService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useVerifyResetPasswordService = ()=>{
    _s5();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].VERIFY_FORGET_PASSWORD_TOKEN);
};
_s5(useVerifyResetPasswordService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useResetChangePasswordService = ()=>{
    _s6();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RESET_PASSWORD);
};
_s6(useResetChangePasswordService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useChangePasswordService = ()=>{
    _s7();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CHANGE_PASSWORD);
};
_s7(useChangePasswordService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useUpdateUserService = ()=>{
    _s8();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].USERS);
};
_s8(useUpdateUserService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useForgotPasswordService = ()=>{
    _s9();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_FORGOT_PASSWORD);
};
_s9(useForgotPasswordService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useOTPService = ()=>{
    _s10();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_VERIFY_TOKEN);
};
_s10(useOTPService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useResetPasswordService = ()=>{
    _s11();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_RESET_PASSWORD);
};
_s11(useResetPasswordService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useSendVerificationEmailService = ()=>{
    _s12();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SEND_VERIFICATION_EMAIL);
};
_s12(useSendVerificationEmailService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useResendVerificationEmailService = ()=>{
    _s13();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].RESEND_VERIFICATION_EMAIL);
};
_s13(useResendVerificationEmailService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useVerifyEmailService = ()=>{
    _s14();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].VERIFY_TOKEN_BY_EMAIL);
};
_s14(useVerifyEmailService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/users/users.action.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChangePasswordMutation",
    ()=>useChangePasswordMutation,
    "useForgetPasswordMutation",
    ()=>useForgetPasswordMutation,
    "useForgotPassword",
    ()=>useForgotPassword,
    "useGetPermissionsQuery",
    ()=>useGetPermissionsQuery,
    "useLogin",
    ()=>useLogin,
    "useLogoutMutation",
    ()=>useLogoutMutation,
    "useMeQuery",
    ()=>useMeQuery,
    "useOTP",
    ()=>useOTP,
    "useRegisterMutation",
    ()=>useRegisterMutation,
    "useResendVerificationEmailMutation",
    ()=>useResendVerificationEmailMutation,
    "useResetPassword",
    ()=>useResetPassword,
    "useResetPasswordMutation",
    ()=>useResetPasswordMutation,
    "useSendVerificationEmailMutation",
    ()=>useSendVerificationEmailMutation,
    "useShopOwnerLogin",
    ()=>useShopOwnerLogin,
    "useStoreOwnerLogoutMutation",
    ()=>useStoreOwnerLogoutMutation,
    "useVerifyForgetPasswordTokenMutation",
    ()=>useVerifyForgetPasswordTokenMutation,
    "useVerifyTokenByEmailMutation",
    ()=>useVerifyTokenByEmailMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/sellerRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-utils.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authorization-atom.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/use-token.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/users/users.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/hooks/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$refetchSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/slices/refetchSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/slices/storeSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jotai/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localized-path.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature(), _s14 = __turbopack_context__.k.signature(), _s15 = __turbopack_context__.k.signature(), _s16 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const useRegisterMutation = ({ isRedirect = true })=>{
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { setToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const userService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserService"])(); // Use the hook
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useRegisterMutation.useMutation": (values)=>userService.create(values)
        }["useRegisterMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_OWNER_REGISTER
        ],
        onSuccess: {
            "useRegisterMutation.useMutation": async (data)=>{
                if (!data.data?.token) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Wrong Credentials!");
                    return;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("User Register Successfully");
                setToken(data?.data?.token);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthCredentials"])(data?.data?.token, data?.data?.permissions);
                setAuthorized(true);
                localStorage.setItem("email_verification_settings", data?.data?.email_verification_settings.toString());
                localStorage.setItem("email_verified", data?.data?.email_verified.toString());
                localStorage.setItem("user_email", data?.data?.email);
            }
        }["useRegisterMutation.useMutation"],
        onError: {
            "useRegisterMutation.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useRegisterMutation.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useRegisterMutation.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useRegisterMutation.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useRegisterMutation.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useRegisterMutation.useMutation"],
        onSettled: {
            "useRegisterMutation.useMutation": async ()=>{
                await queryClient.invalidateQueries({
                    queryKey: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"]?.STORE_OWNER_REGISTER
                    ]
                });
            }
        }["useRegisterMutation.useMutation"]
    });
};
_s(useRegisterMutation, "C8qXqi1cXCEG05EK41Ums22LTS4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useLogin = ({ isRedirect = true })=>{
    _s1();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { setToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginService"])();
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLogin.useMutation": (values)=>loginService.create(values)
        }["useLogin.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].USERS_LOGIN
        ],
        onSuccess: {
            "useLogin.useMutation": async (data)=>{
                if (!data.data?.token) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Wrong Credentials!");
                    return;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                const { token, expires_at, permissions } = data.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], token);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_USER"], "system_level");
                localStorage.setItem("expires_at", expires_at);
                setToken(data?.data?.token);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthCredentials"])(data?.data?.token, data?.data?.permissions);
                setAuthorized(true);
                if (isRedirect) {
                    router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Routes"].dashboard));
                    localStorage.setItem("selectedStore", JSON.stringify({
                        id: "",
                        slug: ""
                    }));
                }
            }
        }["useLogin.useMutation"],
        onError: {
            "useLogin.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }["useLogin.useMutation"],
        onSettled: {
            "useLogin.useMutation": async ()=>{
                await queryClient.invalidateQueries({
                    queryKey: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"]?.USERS_LOGIN
                    ]
                });
            }
        }["useLogin.useMutation"]
    });
};
_s1(useLogin, "BT1WTrZV55fzmLnnXte1BKDsX68=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useLogoutMutation = (p0)=>{
    _s2();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginService"])();
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useLogoutMutation.useMutation": ()=>loginService.logout()
        }["useLogoutMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT
        ],
        onSuccess: {
            "useLogoutMutation.useMutation": async ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_USER"]);
                setAuthorized(false);
                queryClient.removeQueries({
                    queryKey: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME
                    ]
                });
                router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Routes"].signin));
                localStorage.clear();
                localStorage.setItem("selectedStore", JSON.stringify({
                    id: "",
                    slug: ""
                }));
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSelectedStore"])({
                    id: "",
                    type: "",
                    slug: ""
                }));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("User Logout Successfully");
            }
        }["useLogoutMutation.useMutation"],
        onError: {
            "useLogoutMutation.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Logout failed");
            }
        }["useLogoutMutation.useMutation"]
    });
};
_s2(useLogoutMutation, "GlCvuoTpIzGFgFpFbS0dIFD+jYA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useShopOwnerLogin = ({ isRedirect = true })=>{
    _s3();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { setToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreOwnerLoginService"])(); // Use the hook
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useShopOwnerLogin.useMutation": (values)=>loginService.create(values)
        }["useShopOwnerLogin.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SHOP_OWNER_LOGIN
        ],
        onSuccess: {
            "useShopOwnerLogin.useMutation": async (data)=>{
                if (!data.data?.token) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Wrong Credentials!");
                    return;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                const { token, expires_at, permissions, email_verified, email_verification_settings, email } = data.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], token);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_USER"], "store_level");
                localStorage.setItem("expires_at", expires_at);
                setToken(token);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthCredentials"])(token, permissions);
                setAuthorized(true);
                localStorage.setItem("email_verified", data?.data?.email_verified.toString());
                localStorage.setItem("email_verification_settings", data?.data?.email_verification_settings.toString());
                localStorage.setItem("user_email", data?.data?.email);
                if (isRedirect) {
                    if (email_verified === false && email_verification_settings === "on") {
                        router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SellerRoutes"].emailVerification));
                    } else {
                        router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SellerRoutes"].dashboard));
                        localStorage.setItem("selectedStore", JSON.stringify({
                            id: "",
                            slug: ""
                        }));
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSelectedStore"])({
                            id: "",
                            type: "",
                            slug: ""
                        }));
                    }
                }
            }
        }["useShopOwnerLogin.useMutation"],
        onError: {
            "useShopOwnerLogin.useMutation": async (data)=>{
                const ErrorText = data?.response?.data?.message;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(ErrorText);
            }
        }["useShopOwnerLogin.useMutation"],
        onSettled: {
            "useShopOwnerLogin.useMutation": async ()=>{
                await queryClient.invalidateQueries({
                    queryKey: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"]?.SHOP_OWNER_LOGIN
                    ]
                });
            }
        }["useShopOwnerLogin.useMutation"]
    });
};
_s3(useShopOwnerLogin, "7LH0IoHsxU1cfjwyID/TOH9/C6c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToken"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreOwnerLoginService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useStoreOwnerLogoutMutation = (p0)=>{
    _s4();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginService"])();
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useStoreOwnerLogoutMutation.useMutation": ()=>loginService.logout()
        }["useStoreOwnerLogoutMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT
        ],
        onSuccess: {
            "useStoreOwnerLogoutMutation.useMutation": async ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_USER"]);
                setAuthorized(false);
                queryClient.removeQueries({
                    queryKey: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME
                    ]
                });
                router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SellerRoutes"].signin));
                localStorage.clear();
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSelectedStore"])({
                    id: "",
                    type: "",
                    slug: ""
                }));
                localStorage.setItem("selectedStore", JSON.stringify({
                    id: "",
                    slug: ""
                }));
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$refetchSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRefetch"])(true));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("User Logout Successfully");
            }
        }["useStoreOwnerLogoutMutation.useMutation"],
        onError: {
            "useStoreOwnerLogoutMutation.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Logout failed");
            }
        }["useStoreOwnerLogoutMutation.useMutation"]
    });
};
_s4(useStoreOwnerLogoutMutation, "GlCvuoTpIzGFgFpFbS0dIFD+jYA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLoginService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useMeQuery = (options)=>{
    _s5();
    const [isAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    const meService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMeService"])();
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME
        ],
        queryFn: {
            "useMeQuery.useQuery[query]": ()=>meService.me()
        }["useMeQuery.useQuery[query]"],
        retry: false,
        enabled: isAuthorized,
        ...options
    });
    return {
        me: query.data?.data,
        isPending: isAuthorized ? query.isPending : false,
        error: query.error,
        isAuthorized,
        isFetchedAfterMount: query.isFetchedAfterMount,
        refetch: query.refetch
    };
};
_s5(useMeQuery, "Njuz9GDEAJdQzVUclURzk5G5pfc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMeService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useGetPermissionsQuery = (options, queryOptions)=>{
    _s6();
    const [isAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPermissionsService"])(); // Use the hook
    const enabled = queryOptions?.skip ? false : queryOptions?.enabled ?? isAuthorized;
    const { data, isPending, error, isFetchedAfterMount, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GET_PERMISSIONS
        ],
        queryFn: {
            "useGetPermissionsQuery.useQuery": ()=>findAll(options)
        }["useGetPermissionsQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false,
        enabled,
        staleTime: queryOptions?.staleTime,
        ...options
    });
    return {
        getPermissions: data?.data,
        isPending: enabled ? isPending : false,
        isFetching,
        error,
        isAuthorized,
        isFetchedAfterMount,
        refetch
    };
};
_s6(useGetPermissionsQuery, "n6YRbLj2a4DyuT1o5wnv8jHxbSI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAtom"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetPermissionsService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useForgetPasswordMutation = ()=>{
    _s7();
    const resetPasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResetPasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useForgetPasswordMutation.useMutation": (values)=>resetPasswordService.create(values)
        }["useForgetPasswordMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].FORGET_PASSWORD
        ],
        onSuccess: {
            "useForgetPasswordMutation.useMutation": async ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Check Your Email Inbox");
            }
        }["useForgetPasswordMutation.useMutation"]
    });
};
_s7(useForgetPasswordMutation, "2+bm+sx4zhJA70JqT1h4dvGcn+o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResetPasswordService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useVerifyForgetPasswordTokenMutation = ()=>{
    _s8();
    const verifyResetPasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVerifyResetPasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useVerifyForgetPasswordTokenMutation.useMutation": (values)=>verifyResetPasswordService.create(values)
        }["useVerifyForgetPasswordTokenMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].VERIFY_FORGET_PASSWORD_TOKEN
        ]
    });
};
_s8(useVerifyForgetPasswordTokenMutation, "UfV3DouLgmdqfCDSi8ifnRzwlbc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVerifyResetPasswordService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useResetPasswordMutation = ()=>{
    _s9();
    const resetChangePasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResetChangePasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useResetPasswordMutation.useMutation": (values)=>resetChangePasswordService.create(values)
        }["useResetPasswordMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RESET_PASSWORD
        ]
    });
};
_s9(useResetPasswordMutation, "9c8eXj5QWOKtRoV5XcU/BXcUBdw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResetChangePasswordService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useChangePasswordMutation = ()=>{
    _s10();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const changePasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChangePasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useChangePasswordMutation.useMutation": (values)=>changePasswordService.create(values)
        }["useChangePasswordMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CHANGE_PASSWORD
        ],
        onSuccess: {
            "useChangePasswordMutation.useMutation": async ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Change Password Successfully");
                router?.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Routes"].signin));
            }
        }["useChangePasswordMutation.useMutation"]
    });
};
_s10(useChangePasswordMutation, "wzZaxvXlzVWMCDD+qpsY/1ni69E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChangePasswordService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useForgotPassword = ()=>{
    _s11();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForgotPasswordService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useForgotPassword.useMutation": (values)=>create(values)
        }["useForgotPassword.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_FORGOT_PASSWORD
        ],
        onSuccess: {
            "useForgotPassword.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
                }
            }
        }["useForgotPassword.useMutation"],
        onError: {
            "useForgotPassword.useMutation": async (data)=>{
                const errorText = data?.response?.data?.message;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useForgotPassword.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useForgotPassword.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useForgotPassword.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useForgotPassword.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText);
                }
            }
        }["useForgotPassword.useMutation"]
    });
};
_s11(useForgotPassword, "dkngjmsabkgWYYr35+PMsEJozyE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForgotPasswordService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useOTP = ()=>{
    _s12();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOTPService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useOTP.useMutation": (values)=>create(values)
        }["useOTP.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_VERIFY_TOKEN
        ],
        onSuccess: {
            "useOTP.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
                }
            }
        }["useOTP.useMutation"],
        onError: {
            "useOTP.useMutation": async (data)=>{
                const errorText = data?.response?.data?.message;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useOTP.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useOTP.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useOTP.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useOTP.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText);
                }
            }
        }["useOTP.useMutation"]
    });
};
_s12(useOTP, "GS73AH274X+/gYliWNpCw/Pjnvo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOTPService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useResetPassword = ()=>{
    _s13();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResetPasswordService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useResetPassword.useMutation": (values)=>create(values)
        }["useResetPassword.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_RESET_PASSWORD
        ],
        onSuccess: {
            "useResetPassword.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
                }
            }
        }["useResetPassword.useMutation"],
        onError: {
            "useResetPassword.useMutation": async (data)=>{
                const errorText = data?.response?.data?.message;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useResetPassword.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useResetPassword.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useResetPassword.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useResetPassword.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText);
                }
            }
        }["useResetPassword.useMutation"]
    });
};
_s13(useResetPassword, "5HqpGlbkp/pbZOTD2ABucJe45KY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResetPasswordService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useSendVerificationEmailMutation = ()=>{
    _s14();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendVerificationEmailService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSendVerificationEmailMutation.useMutation": (values)=>create(values)
        }["useSendVerificationEmailMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SEND_VERIFICATION_EMAIL
        ],
        onSuccess: {
            "useSendVerificationEmailMutation.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Verification email sent successfully!");
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to send verification email. Please try again.");
                }
            }
        }["useSendVerificationEmailMutation.useMutation"],
        onError: {
            "useSendVerificationEmailMutation.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.response?.data?.message);
            }
        }["useSendVerificationEmailMutation.useMutation"]
    });
};
_s14(useSendVerificationEmailMutation, "cNcDe1QH9C5sl9m5gsaj/eAPyi4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendVerificationEmailService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useResendVerificationEmailMutation = ()=>{
    _s15();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResendVerificationEmailService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useResendVerificationEmailMutation.useMutation": (values)=>create(values)
        }["useResendVerificationEmailMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].RESEND_VERIFICATION_EMAIL
        ],
        onSuccess: {
            "useResendVerificationEmailMutation.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Verification email sent successfully!");
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to send verification email. Please try again.");
                }
            }
        }["useResendVerificationEmailMutation.useMutation"],
        onError: {
            "useResendVerificationEmailMutation.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.response?.data?.message);
            }
        }["useResendVerificationEmailMutation.useMutation"]
    });
};
_s15(useResendVerificationEmailMutation, "F+Emv72MmxjURNLcjWpHtiAaOCM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResendVerificationEmailService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useVerifyTokenByEmailMutation = ()=>{
    _s16();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVerifyEmailService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useVerifyTokenByEmailMutation.useMutation": (values)=>create(values)
        }["useVerifyTokenByEmailMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].VERIFY_TOKEN_BY_EMAIL
        ],
        onSuccess: {
            "useVerifyTokenByEmailMutation.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Token verification successful!");
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Token does not match. Please try again.");
                }
            }
        }["useVerifyTokenByEmailMutation.useMutation"],
        onError: {
            "useVerifyTokenByEmailMutation.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.response?.data?.message);
            }
        }["useVerifyTokenByEmailMutation.useMutation"]
    });
};
_s16(useVerifyTokenByEmailMutation, "nMakM0YfSOli9cMvfye4CdMXa6k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVerifyEmailService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/admin-section/notifications/notifications.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotificationsDeleteService",
    ()=>useNotificationsDeleteService,
    "useNotificationsEditService",
    ()=>useNotificationsEditService,
    "useNotificationsQueryService",
    ()=>useNotificationsQueryService,
    "useNotificationsReadService",
    ()=>useNotificationsReadService,
    "useNotificationsStoreService",
    ()=>useNotificationsStoreService,
    "useNotificationsUpdateService",
    ()=>useNotificationsUpdateService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
;
;
const useNotificationsQueryService = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_ADD);
};
_s(useNotificationsQueryService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useNotificationsStoreService = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_ADD);
};
_s1(useNotificationsStoreService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useNotificationsEditService = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_EDIT);
};
_s2(useNotificationsEditService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useNotificationsUpdateService = ()=>{
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_UPDATE);
};
_s3(useNotificationsUpdateService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useNotificationsReadService = ()=>{
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_READ);
};
_s4(useNotificationsReadService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useNotificationsDeleteService = ()=>{
    _s5();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_REMOVE);
};
_s5(useNotificationsDeleteService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/admin-section/notifications/notifications.action.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotificationsDelete",
    ()=>useNotificationsDelete,
    "useNotificationsQuery",
    ()=>useNotificationsQuery,
    "useNotificationsQueryById",
    ()=>useNotificationsQueryById,
    "useNotificationsRead",
    ()=>useNotificationsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/admin-section/notifications/notifications.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
;
;
const useNotificationsQuery = (options, config)=>{
    _s();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsQueryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_ADD
        ],
        queryFn: {
            "useNotificationsQuery.useQuery": ()=>findAll(options)
        }["useNotificationsQuery.useQuery"],
        enabled: !config?.skip,
        ...options
    });
    return {
        NotificationsAdminList: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s(useNotificationsQuery, "8FS1ePQpIxbR6ON5VeKmHpWeMmw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsQueryService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useNotificationsQueryById = (id)=>{
    _s1();
    const { find } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsEditService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_EDIT,
            id
        ],
        queryFn: {
            "useNotificationsQueryById.useQuery": ()=>find(id)
        }["useNotificationsQueryById.useQuery"],
        refetchOnWindowFocus: false,
        enabled: !!id
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNotificationsQueryById.useEffect": ()=>{
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useNotificationsQueryById.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useNotificationsQueryById.useEffect"]
                });
            }
        }
    }["useNotificationsQueryById.useEffect"], [
        error
    ]);
    return {
        NotificationsByID: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s1(useNotificationsQueryById, "bT1X5HoBWjajFfR0Vs1qLZMXCjM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsEditService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useNotificationsRead = ()=>{
    _s2();
    const { patchItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsReadService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useNotificationsRead.useMutation": (values)=>patchItem(values)
        }["useNotificationsRead.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_READ
        ],
        onSuccess: {
            "useNotificationsRead.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useNotificationsRead.useMutation"],
        onError: {
            "useNotificationsRead.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }["useNotificationsRead.useMutation"]
    });
};
_s2(useNotificationsRead, "awvWNnWmLVIhfqRfyLxKDU/2FmE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsReadService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useNotificationsDelete = ()=>{
    _s3();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useNotificationsDelete.useMutation": (values)=>create(values)
        }["useNotificationsDelete.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_REMOVE
        ],
        onSuccess: {
            "useNotificationsDelete.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
                }
            }
        }["useNotificationsDelete.useMutation"],
        onError: {
            "useNotificationsDelete.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useNotificationsDelete.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useNotificationsDelete.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useNotificationsDelete.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useNotificationsDelete.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useNotificationsDelete.useMutation"]
    });
};
_s3(useNotificationsDelete, "AYHMoFvU8PhZMYMzRbz3vEYLTys=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsDeleteService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/seller-section/notifications/notifications.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotificationsDeleteService",
    ()=>useNotificationsDeleteService,
    "useNotificationsQueryService",
    ()=>useNotificationsQueryService,
    "useNotificationsReadService",
    ()=>useNotificationsReadService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
const useNotificationsQueryService = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_ADD);
};
_s(useNotificationsQueryService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useNotificationsReadService = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_READ);
};
_s1(useNotificationsReadService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useNotificationsDeleteService = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_REMOVE);
};
_s2(useNotificationsDeleteService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/seller-section/notifications/notifications.action.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotificationsDelete",
    ()=>useNotificationsDelete,
    "useNotificationsQuery",
    ()=>useNotificationsQuery,
    "useNotificationsRead",
    ()=>useNotificationsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/seller-section/notifications/notifications.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
const useNotificationsQuery = (options, config)=>{
    _s();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsQueryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_ADD
        ],
        queryFn: {
            "useNotificationsQuery.useQuery": ()=>findAll(options)
        }["useNotificationsQuery.useQuery"],
        enabled: !config?.skip,
        ...options
    });
    return {
        NotificationsList: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s(useNotificationsQuery, "8FS1ePQpIxbR6ON5VeKmHpWeMmw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsQueryService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useNotificationsRead = ()=>{
    _s1();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsReadService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useNotificationsRead.useMutation": (values)=>create(values)
        }["useNotificationsRead.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_READ
        ],
        onSuccess: {
            "useNotificationsRead.useMutation": async (data)=>{
                //@ts-ignore
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useNotificationsRead.useMutation"],
        onError: {
            "useNotificationsRead.useMutation": async (data)=>{
                // @ts-ignore
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useNotificationsRead.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useNotificationsRead.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useNotificationsRead.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useNotificationsRead.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useNotificationsRead.useMutation"]
    });
};
_s1(useNotificationsRead, "e71v6fqQfhfcSxepVgVgfdBTdeY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsReadService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useNotificationsDelete = ()=>{
    _s2();
    const { delete: deleteItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useNotificationsDelete.useMutation": (id)=>deleteItem(id)
        }["useNotificationsDelete.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_REMOVE
        ],
        onSuccess: {
            "useNotificationsDelete.useMutation": async (data)=>{
                //@ts-ignore
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useNotificationsDelete.useMutation"],
        onError: {
            "useNotificationsDelete.useMutation": async (data)=>{
                // @ts-ignore
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useNotificationsDelete.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useNotificationsDelete.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useNotificationsDelete.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useNotificationsDelete.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useNotificationsDelete.useMutation"]
    });
};
_s2(useNotificationsDelete, "nA5DfLSGdhsWyCe3nAvax9wwgM4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotificationsDeleteService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/seller-section/product/product.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAltChangeService",
    ()=>useAltChangeService,
    "useCouponLineDeleteService",
    ()=>useCouponLineDeleteService,
    "useDynamicFieldService",
    ()=>useDynamicFieldService,
    "useMakeFeatureService",
    ()=>useMakeFeatureService,
    "useMediaDeleteService",
    ()=>useMediaDeleteService,
    "useMediaLibraryService",
    ()=>useMediaLibraryService,
    "useProductDescriptionGenerateService",
    ()=>useProductDescriptionGenerateService,
    "useProductEditService",
    ()=>useProductEditService,
    "useProductQueryService",
    ()=>useProductQueryService,
    "useProductStoreService",
    ()=>useProductStoreService,
    "useProductUpdateService",
    ()=>useProductUpdateService,
    "useStoreListService",
    ()=>useStoreListService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/hooks/index.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature();
;
;
;
;
const useStoreListService = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].STORE_DROPDOWN_LIST);
};
_s(useStoreListService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useProductStoreService = ()=>{
    _s1();
    const selectedStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "useProductStoreService.useAppSelector[selectedStore]": (state)=>state.store.selectedStore
    }["useProductStoreService.useAppSelector[selectedStore]"]);
    const slug = selectedStore?.slug;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_ADD);
};
_s1(useProductStoreService, "M05lWM4XZLYcA29lK/CPZDvn3lU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useProductQueryService = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_LIST);
};
_s2(useProductQueryService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useProductEditService = ()=>{
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_EDIT);
};
_s3(useProductEditService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useProductUpdateService = ()=>{
    _s4();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_UPDATE);
};
_s4(useProductUpdateService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useCouponLineDeleteService = ()=>{
    _s5();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_REMOVE);
};
_s5(useCouponLineDeleteService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useMakeFeatureService = ()=>{
    _s6();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_FEATURE_MAKE);
};
_s6(useMakeFeatureService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useProductDescriptionGenerateService = ()=>{
    _s7();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DESCRIPTION_GENERATE);
};
_s7(useProductDescriptionGenerateService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useMediaLibraryService = ()=>{
    _s8();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_LIBRARY);
};
_s8(useMediaLibraryService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useMediaDeleteService = ()=>{
    _s9();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_DELETE);
};
_s9(useMediaDeleteService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useAltChangeService = ()=>{
    _s10();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_ALT_CHANGE);
};
_s10(useAltChangeService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useDynamicFieldService = ()=>{
    _s11();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DYNAMIC_FIELD);
};
_s11(useDynamicFieldService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/seller-section/product/product.action.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAltChange",
    ()=>useAltChange,
    "useDynamicFieldQuery",
    ()=>useDynamicFieldQuery,
    "useFileUploadService",
    ()=>useFileUploadService,
    "useMakeFeature",
    ()=>useMakeFeature,
    "useMediaDelete",
    ()=>useMediaDelete,
    "useMediaLibraryQuery",
    ()=>useMediaLibraryQuery,
    "useProductDelete",
    ()=>useProductDelete,
    "useProductDescriptionGenerate",
    ()=>useProductDescriptionGenerate,
    "useProductQuery",
    ()=>useProductQuery,
    "useProductQueryById",
    ()=>useProductQueryById,
    "useProductStoreMutation",
    ()=>useProductStoreMutation,
    "useProductUpdateMutation",
    ()=>useProductUpdateMutation,
    "useStoreListQuery",
    ()=>useStoreListQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/sellerRoutes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/seller-section/product/product.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
const useStoreListQuery = (options, config)=>{
    _s();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].STORE_DROPDOWN_LIST,
            options
        ],
        queryFn: {
            "useStoreListQuery.useQuery": ()=>findAll(options)
        }["useStoreListQuery.useQuery"],
        enabled: !config?.skip,
        ...options
    });
    return {
        stores: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s(useStoreListQuery, "bWOpaT7hoGShYy+tSuEXpY1Of5A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStoreListService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useProductQuery = (options)=>{
    _s1();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductQueryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_LIST
        ],
        queryFn: {
            "useProductQuery.useQuery": ()=>findAll(options)
        }["useProductQuery.useQuery"],
        ...options
    });
    return {
        productList: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s1(useProductQuery, "h80jHIlQOoQNPozvIiT0MG2Aq3c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductQueryService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useProductQueryById = (id)=>{
    _s2();
    const { find } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductEditService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_EDIT,
            id
        ],
        queryFn: {
            "useProductQueryById.useQuery": ()=>find(id)
        }["useProductQueryById.useQuery"],
        enabled: !!id
    });
    return {
        product: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s2(useProductQueryById, "o+9TM899ZJv9eYKr/Zy9t45wpi8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductEditService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useProductStoreMutation = ()=>{
    _s3();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductStoreService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useProductStoreMutation.useMutation": (values)=>create(values)
        }["useProductStoreMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_ADD
        ],
        onSuccess: {
            "useProductStoreMutation.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                    router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SellerRoutes"].productList);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
                }
            }
        }["useProductStoreMutation.useMutation"],
        onError: {
            "useProductStoreMutation.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useProductStoreMutation.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useProductStoreMutation.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useProductStoreMutation.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useProductStoreMutation.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("An unknown error occurred.");
                }
            }
        }["useProductStoreMutation.useMutation"]
    });
};
_s3(useProductStoreMutation, "lMEK9SMTgoPQnmcVh+3EoHwo9PM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductStoreService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useProductUpdateMutation = ()=>{
    _s4();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { update } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductUpdateService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useProductUpdateMutation.useMutation": (values)=>update(values)
        }["useProductUpdateMutation.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_UPDATE
        ],
        onSuccess: {
            "useProductUpdateMutation.useMutation": async (data)=>{
                if (Boolean(data?.data)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                    router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SellerRoutes"].productList);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
                }
            }
        }["useProductUpdateMutation.useMutation"],
        onError: {
            "useProductUpdateMutation.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useProductUpdateMutation.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useProductUpdateMutation.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useProductUpdateMutation.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useProductUpdateMutation.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useProductUpdateMutation.useMutation"]
    });
};
_s4(useProductUpdateMutation, "ZoClbp93+BKOCmKgiS1eZV+Q0H0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductUpdateService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useProductDelete = ()=>{
    _s5();
    const { delete: deleteItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCouponLineDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useProductDelete.useMutation": (id)=>deleteItem(id)
        }["useProductDelete.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_REMOVE
        ],
        onSuccess: {
            "useProductDelete.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useProductDelete.useMutation"],
        onError: {
            "useProductDelete.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useProductDelete.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useProductDelete.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useProductDelete.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useProductDelete.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useProductDelete.useMutation"]
    });
};
_s5(useProductDelete, "E6jc/DutGEdIrUZ1GENqF8Nl52k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCouponLineDeleteService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useMakeFeature = ()=>{
    _s6();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMakeFeatureService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useMakeFeature.useMutation": (values)=>create(values)
        }["useMakeFeature.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_FEATURE_MAKE
        ],
        onSuccess: {
            "useMakeFeature.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useMakeFeature.useMutation"],
        onError: {
            "useMakeFeature.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useMakeFeature.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useMakeFeature.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useMakeFeature.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useMakeFeature.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useMakeFeature.useMutation"]
    });
};
_s6(useMakeFeature, "JgO1n5VDRjTLaU23wNTwnhcshE8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMakeFeatureService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useFileUploadService = ()=>{
    _s7();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const axiosInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useFileUploadService.useMemo[axiosInstance]": ()=>{
            const instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
                baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_REST_API_ENDPOINT,
                timeout: 5000000,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            instance.interceptors.request.use({
                "useFileUploadService.useMemo[axiosInstance]": (config)=>{
                    const cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                    let token = cookies || "";
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${token}`,
                        "X-localization": locale
                    };
                    return config;
                }
            }["useFileUploadService.useMemo[axiosInstance]"]);
            return instance;
        }
    }["useFileUploadService.useMemo[axiosInstance]"], [
        locale
    ]);
    const uploadFile = async (file, route)=>{
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axiosInstance.post(route, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    return {
        uploadFile
    };
};
_s7(useFileUploadService, "rdndbHm0bJPKcf1/cT5qxWH8okA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
const useMediaLibraryQuery = (options)=>{
    _s8();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaLibraryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_LIBRARY
        ],
        queryFn: {
            "useMediaLibraryQuery.useQuery": ()=>findAll(options)
        }["useMediaLibraryQuery.useQuery"],
        ...options
    });
    return {
        mediaLibrary: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s8(useMediaLibraryQuery, "xQyzC1xlje3xBCGYvMmWIiqEEhk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaLibraryService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useMediaDelete = ()=>{
    _s9();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useMediaDelete.useMutation": (values)=>create(values)
        }["useMediaDelete.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_DELETE
        ],
        onSuccess: {
            "useMediaDelete.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useMediaDelete.useMutation"],
        onError: {
            "useMediaDelete.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useMediaDelete.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useMediaDelete.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useMediaDelete.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useMediaDelete.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useMediaDelete.useMutation"]
    });
};
_s9(useMediaDelete, "OTOoUXEHya3u++dkBG9q8WGdOSc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaDeleteService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useAltChange = ()=>{
    _s10();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAltChangeService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useAltChange.useMutation": (values)=>create(values)
        }["useAltChange.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_ALT_CHANGE
        ],
        onSuccess: {
            "useAltChange.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useAltChange.useMutation"],
        onError: {
            "useAltChange.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useAltChange.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useAltChange.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useAltChange.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useAltChange.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useAltChange.useMutation"]
    });
};
_s10(useAltChange, "jUhBtxQge4DwqK/sEsmsMtd4zuo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAltChangeService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
const useDynamicFieldQuery = (options)=>{
    _s11();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDynamicFieldService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DYNAMIC_FIELD,
            options?.store_type
        ],
        queryFn: {
            "useDynamicFieldQuery.useQuery": ()=>findAll(options)
        }["useDynamicFieldQuery.useQuery"],
        enabled: !!options?.store_type
    });
    return {
        DynamicFieldList: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s11(useDynamicFieldQuery, "H2DRpD3dwXq+9ZU8RWnXW1VE9Ac=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDynamicFieldService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useProductDescriptionGenerate = ()=>{
    _s12();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductDescriptionGenerateService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useProductDescriptionGenerate.useMutation": (values)=>create(values)
        }["useProductDescriptionGenerate.useMutation"],
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DESCRIPTION_GENERATE
        ],
        onSuccess: {
            "useProductDescriptionGenerate.useMutation": async (data)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            }
        }["useProductDescriptionGenerate.useMutation"],
        onError: {
            "useProductDescriptionGenerate.useMutation": async (data)=>{
                const errorText = data?.response?.data;
                if (errorText && typeof errorText === "object") {
                    Object.entries(errorText).forEach({
                        "useProductDescriptionGenerate.useMutation": ([key, messages])=>{
                            if (Array.isArray(messages)) {
                                messages.forEach({
                                    "useProductDescriptionGenerate.useMutation": (msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg)
                                }["useProductDescriptionGenerate.useMutation"]);
                            } else if (typeof messages === "string") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(messages);
                            }
                        }
                    }["useProductDescriptionGenerate.useMutation"]);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
                }
            }
        }["useProductDescriptionGenerate.useMutation"]
    });
};
_s12(useProductDescriptionGenerate, "6wTmxnHnrA6C+/w/b53MGShAUsg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductDescriptionGenerateService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/src/modules/seller-section/seller-dashboard/seller-dashboard.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSellerDashboardService",
    ()=>useSellerDashboardService,
    "useSellerOrderGrowthService",
    ()=>useSellerOrderGrowthService,
    "useSellerOtherSummaryService",
    ()=>useSellerOtherSummaryService,
    "useSellerSalesService",
    ()=>useSellerSalesService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
const useSellerDashboardService = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_DASHBOARD_LIST);
};
_s(useSellerDashboardService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useSellerSalesService = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_SALES_LIST);
};
_s1(useSellerSalesService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useSellerOrderGrowthService = ()=>{
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_ORDER_GROWTH_LIST);
};
_s2(useSellerOrderGrowthService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
const useSellerOtherSummaryService = ()=>{
    _s3();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_OTHER_SUMMARY_LIST);
};
_s3(useSellerOtherSummaryService, "KR2T+pa+QZNhxvOYYvu7ThAdwKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBaseService"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/seller-section/seller-dashboard/seller-dashboard.action.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSellerDashboardQuery",
    ()=>useSellerDashboardQuery,
    "useSellerGrowthOrderQuery",
    ()=>useSellerGrowthOrderQuery,
    "useSellerOtherSummaryQuery",
    ()=>useSellerOtherSummaryQuery,
    "useSellerSalesSummaryQuery",
    ()=>useSellerSalesSummaryQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/seller-section/seller-dashboard/seller-dashboard.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
;
;
const useSellerDashboardQuery = (options)=>{
    _s();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerDashboardService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_DASHBOARD_LIST
        ],
        queryFn: {
            "useSellerDashboardQuery.useQuery": ()=>findAll(options)
        }["useSellerDashboardQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSellerDashboardQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useSellerDashboardQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useSellerDashboardQuery.useEffect"]
                });
            }
        }
    }["useSellerDashboardQuery.useEffect"], [
        error
    ]);
    return {
        SellerDashboard: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s(useSellerDashboardQuery, "9p6Gzkf3lZ5kMhW0hd1aOD4Sr7Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerDashboardService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useSellerSalesSummaryQuery = (options)=>{
    _s1();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerSalesService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_SALES_LIST
        ],
        queryFn: {
            "useSellerSalesSummaryQuery.useQuery": ()=>findAll(options)
        }["useSellerSalesSummaryQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSellerSalesSummaryQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useSellerSalesSummaryQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useSellerSalesSummaryQuery.useEffect"]
                });
            }
        }
    }["useSellerSalesSummaryQuery.useEffect"], [
        error
    ]);
    return {
        SellerSalesSummary: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s1(useSellerSalesSummaryQuery, "DOPALmvOGVWBDpmLVkEZZUnAgA4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerSalesService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useSellerGrowthOrderQuery = (options)=>{
    _s2();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerOrderGrowthService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_ORDER_GROWTH_LIST
        ],
        queryFn: {
            "useSellerGrowthOrderQuery.useQuery": ()=>findAll(options)
        }["useSellerGrowthOrderQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSellerGrowthOrderQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useSellerGrowthOrderQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useSellerGrowthOrderQuery.useEffect"]
                });
            }
        }
    }["useSellerGrowthOrderQuery.useEffect"], [
        error
    ]);
    return {
        SellerOrderGrowth: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s2(useSellerGrowthOrderQuery, "urgRUVTGX0KYoxKb13Oi2fzGTo0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerOrderGrowthService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
const useSellerOtherSummaryQuery = (options)=>{
    _s3();
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerOtherSummaryService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_OTHER_SUMMARY_LIST
        ],
        queryFn: {
            "useSellerOtherSummaryQuery.useQuery": ()=>findAll(options)
        }["useSellerOtherSummaryQuery.useQuery"],
        retry: false,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSellerOtherSummaryQuery.useEffect": ()=>{
            //@ts-ignore
            const errorToast = error?.response?.data?.message;
            if (error && errorToast !== errorToastRef.current) {
                errorToastRef.current = errorToast;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"]?.error(`${errorToast}`, {
                    onClose: {
                        "useSellerOtherSummaryQuery.useEffect": ()=>{
                            errorToastRef.current = null;
                        }
                    }["useSellerOtherSummaryQuery.useEffect"]
                });
            }
        }
    }["useSellerOtherSummaryQuery.useEffect"], [
        error
    ]);
    return {
        SellerOtherSummary: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
_s3(useSellerOtherSummaryQuery, "Op+70YCUq3oMwkQvf3SiFM5+YfM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSellerOtherSummaryService"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_modules_0pk-tb-._.js.map