module.exports = [
"[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBaseService",
    ()=>useBaseService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/sellerRoutes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localized-path.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)"); // Import useRouter
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
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
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])(); // Get current path
    const pathnameWithoutLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>pathname?.replace(/^\/[^/]+/, "") || "", [
        pathname
    ]);
    const getSignInRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (pathnameWithoutLocale.startsWith("/seller")) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].signin);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Routes"].signin);
    }, [
        locale,
        pathnameWithoutLocale
    ]);
    const axiosInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_REST_API_ENDPOINT,
            timeout: 5000000,
            headers: {
                "Content-Type": "application/json"
            }
        });
        instance.interceptors.request.use((config)=>{
            const hasFile = config.data && config.data.multipart === true;
            const cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
            const token = cookies || "";
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
                "X-localization": locale,
                "Content-Type": hasFile ? "multipart/form-data" : "application/json"
            };
            return config;
        });
        instance.interceptors.response.use((response)=>response, async (error)=>{
            const originalRequest = error.config || {};
            if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.endsWith("/refresh-token")) {
                originalRequest._retry = true;
                const oldToken = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]) || "";
                if (!oldToken) {
                    router.push(getSignInRoute());
                    return Promise.reject(error);
                }
                if (isRefreshing) {
                    return new Promise((resolve, reject)=>{
                        subscribe((newToken)=>{
                            if (!newToken) return reject(error);
                            originalRequest.headers = {
                                ...originalRequest.headers,
                                Authorization: `Bearer ${newToken}`
                            };
                            resolve(instance(originalRequest));
                        });
                    });
                }
                isRefreshing = true;
                try {
                    const refreshResp = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_REST_API_ENDPOINT}/refresh-token`, null, {
                        headers: {
                            Authorization: `Bearer ${oldToken}`
                        }
                    });
                    const { token: newToken, new_expires_at } = refreshResp.data ?? {};
                    if (!newToken) throw new Error("No new token returned");
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], newToken);
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_USER"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Session expired, please sign in again.");
                    // Redirect again here as fallback.
                    router.push(getSignInRoute());
                    return Promise.reject(refreshError);
                } finally{
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        });
        return instance;
    }, [
        locale,
        pathname,
        router
    ]);
    const findAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((params)=>{
        return axiosInstance.get(route, {
            params
        });
    }, [
        axiosInstance,
        route
    ]);
    const findAllByPost = (data)=>{
        return axiosInstance.post(route, data);
    };
    const find = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, store_id)=>axiosInstance.get(`${route}/${id}`, {
            params: {
                store_id
            }
        }), [
        axiosInstance,
        route
    ]);
    const findPageBySlug = (slug, params)=>axiosInstance.get(`${route}/${slug}`, {
            params
        });
    const findByStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, store_id)=>{
        return axiosInstance.get(`${route}/${id}`, {
            params: store_id ? {
                store_id
            } : undefined
        });
    }, [
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
}),
"[project]/src/modules/users/users.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
;
;
;
;
const useUserService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_OWNER_REGISTER);
};
const useLoginService = ()=>{
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].USERS_LOGIN);
    const logout = async ()=>{
        try {
            await service.getAxiosInstance().post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT, {});
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? `Error refetching data: ${error.message}` : "An unknown error occurred while refetching data");
        }
    };
    return {
        ...service,
        logout
    };
};
const useStoreOwnerLoginService = ()=>{
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].SHOP_OWNER_LOGIN);
    const logout = async ()=>{
        try {
            await service.getAxiosInstance().post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT, {});
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error instanceof Error ? `Error refetching data: ${error.message}` : "An unknown error occurred while refetching data");
        }
    };
    return {
        ...service,
        logout
    };
};
const useMeService = ()=>{
    const service = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME);
    const me = ()=>{
        return service.findAll(); // Assuming this route just retrieves user info
    };
    return {
        ...service,
        me
    };
};
const useGetPermissionsService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GET_PERMISSIONS);
};
const useVerifyResetPasswordService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].VERIFY_FORGET_PASSWORD_TOKEN);
};
const useResetChangePasswordService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RESET_PASSWORD);
};
const useChangePasswordService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CHANGE_PASSWORD);
};
const useUpdateUserService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].USERS);
};
const useForgotPasswordService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_FORGOT_PASSWORD);
};
const useOTPService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_VERIFY_TOKEN);
};
const useResetPasswordService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_RESET_PASSWORD);
};
const useSendVerificationEmailService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SEND_VERIFICATION_EMAIL);
};
const useResendVerificationEmailService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].RESEND_VERIFICATION_EMAIL);
};
const useVerifyEmailService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].VERIFY_TOKEN_BY_EMAIL);
};
}),
"[project]/src/modules/users/users.action.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/sellerRoutes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-utils.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authorization-atom.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/use-token.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/users/users.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/hooks/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$refetchSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/slices/refetchSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/slices/storeSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jotai/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localized-path.ts [app-ssr] (ecmascript)");
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
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { setToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const userService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserService"])(); // Use the hook
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>userService.create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].STORE_OWNER_REGISTER
        ],
        onSuccess: async (data)=>{
            if (!data.data?.token) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Wrong Credentials!");
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("User Register Successfully");
            setToken(data?.data?.token);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthCredentials"])(data?.data?.token, data?.data?.permissions);
            setAuthorized(true);
            localStorage.setItem("email_verification_settings", data?.data?.email_verification_settings.toString());
            localStorage.setItem("email_verified", data?.data?.email_verified.toString());
            localStorage.setItem("user_email", data?.data?.email);
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        },
        onSettled: async ()=>{
            await queryClient.invalidateQueries({
                queryKey: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"]?.STORE_OWNER_REGISTER
                ]
            });
        }
    });
};
const useLogin = ({ isRedirect = true })=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { setToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLoginService"])();
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>loginService.create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].USERS_LOGIN
        ],
        onSuccess: async (data)=>{
            if (!data.data?.token) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Wrong Credentials!");
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            const { token, expires_at, permissions } = data.data;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], token);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_USER"], "system_level");
            localStorage.setItem("expires_at", expires_at);
            setToken(data?.data?.token);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthCredentials"])(data?.data?.token, data?.data?.permissions);
            setAuthorized(true);
            if (isRedirect) {
                router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Routes"].dashboard));
                localStorage.setItem("selectedStore", JSON.stringify({
                    id: "",
                    slug: ""
                }));
            }
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
        },
        onSettled: async ()=>{
            await queryClient.invalidateQueries({
                queryKey: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"]?.USERS_LOGIN
                ]
            });
        }
    });
};
const useLogoutMutation = (p0)=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLoginService"])();
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ()=>loginService.logout(),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT
        ],
        onSuccess: async ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_USER"]);
            setAuthorized(false);
            queryClient.removeQueries({
                queryKey: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME
                ]
            });
            router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Routes"].signin));
            localStorage.clear();
            localStorage.setItem("selectedStore", JSON.stringify({
                id: "",
                slug: ""
            }));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSelectedStore"])({
                id: "",
                type: "",
                slug: ""
            }));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("User Logout Successfully");
        },
        onError: (error)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Logout failed");
        }
    });
};
const useShopOwnerLogin = ({ isRedirect = true })=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { setToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToken"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStoreOwnerLoginService"])(); // Use the hook
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>loginService.create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SHOP_OWNER_LOGIN
        ],
        onSuccess: async (data)=>{
            if (!data.data?.token) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Wrong Credentials!");
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            const { token, expires_at, permissions, email_verified, email_verification_settings, email } = data.data;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], token);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_USER"], "store_level");
            localStorage.setItem("expires_at", expires_at);
            setToken(token);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthCredentials"])(token, permissions);
            setAuthorized(true);
            localStorage.setItem("email_verified", data?.data?.email_verified.toString());
            localStorage.setItem("email_verification_settings", data?.data?.email_verification_settings.toString());
            localStorage.setItem("user_email", data?.data?.email);
            if (isRedirect) {
                if (email_verified === false && email_verification_settings === "on") {
                    router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].emailVerification));
                } else {
                    router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].dashboard));
                    localStorage.setItem("selectedStore", JSON.stringify({
                        id: "",
                        slug: ""
                    }));
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSelectedStore"])({
                        id: "",
                        type: "",
                        slug: ""
                    }));
                }
            }
        },
        onError: async (data)=>{
            const ErrorText = data?.response?.data?.message;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(ErrorText);
        },
        onSettled: async ()=>{
            await queryClient.invalidateQueries({
                queryKey: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"]?.SHOP_OWNER_LOGIN
                ]
            });
        }
    });
};
const useStoreOwnerLogoutMutation = (p0)=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const loginService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLoginService"])();
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: ()=>loginService.logout(),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].LOGOUT
        ],
        onSuccess: async ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_USER"]);
            setAuthorized(false);
            queryClient.removeQueries({
                queryKey: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME
                ]
            });
            router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].signin));
            localStorage.clear();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$storeSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSelectedStore"])({
                id: "",
                type: "",
                slug: ""
            }));
            localStorage.setItem("selectedStore", JSON.stringify({
                id: "",
                slug: ""
            }));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$refetchSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setRefetch"])(true));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("User Logout Successfully");
        },
        onError: (error)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Logout failed");
        }
    });
};
const useMeQuery = (options)=>{
    const [isAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    const meService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMeService"])();
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ME
        ],
        queryFn: ()=>meService.me(),
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
const useGetPermissionsQuery = (options, queryOptions)=>{
    const [isAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetPermissionsService"])(); // Use the hook
    const enabled = queryOptions?.skip ? false : queryOptions?.enabled ?? isAuthorized;
    const { data, isPending, error, isFetchedAfterMount, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].GET_PERMISSIONS
        ],
        queryFn: ()=>findAll(options),
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
const useForgetPasswordMutation = ()=>{
    const resetPasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResetPasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>resetPasswordService.create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].FORGET_PASSWORD
        ],
        onSuccess: async ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Check Your Email Inbox");
        }
    });
};
const useVerifyForgetPasswordTokenMutation = ()=>{
    const verifyResetPasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVerifyResetPasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>verifyResetPasswordService.create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].VERIFY_FORGET_PASSWORD_TOKEN
        ]
    });
};
const useResetPasswordMutation = ()=>{
    const resetChangePasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResetChangePasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>resetChangePasswordService.create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RESET_PASSWORD
        ]
    });
};
const useChangePasswordMutation = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const changePasswordService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useChangePasswordService"])(); // Use the hook
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>changePasswordService.create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].CHANGE_PASSWORD
        ],
        onSuccess: async ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Change Password Successfully");
            router?.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Routes"].signin));
        }
    });
};
const useForgotPassword = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForgotPasswordService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_FORGOT_PASSWORD
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
            }
        },
        onError: async (data)=>{
            const errorText = data?.response?.data?.message;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText);
            }
        }
    });
};
const useOTP = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOTPService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_VERIFY_TOKEN
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
            }
        },
        onError: async (data)=>{
            const errorText = data?.response?.data?.message;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText);
            }
        }
    });
};
const useResetPassword = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResetPasswordService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_RESET_PASSWORD
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
            }
        },
        onError: async (data)=>{
            const errorText = data?.response?.data?.message;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText);
            }
        }
    });
};
const useSendVerificationEmailMutation = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSendVerificationEmailService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SEND_VERIFICATION_EMAIL
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Verification email sent successfully!");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to send verification email. Please try again.");
            }
        },
        onError: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.response?.data?.message);
        }
    });
};
const useResendVerificationEmailMutation = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResendVerificationEmailService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].RESEND_VERIFICATION_EMAIL
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Verification email sent successfully!");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to send verification email. Please try again.");
            }
        },
        onError: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.response?.data?.message);
        }
    });
};
const useVerifyTokenByEmailMutation = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVerifyEmailService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].VERIFY_TOKEN_BY_EMAIL
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Token verification successful!");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Token does not match. Please try again.");
            }
        },
        onError: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.response?.data?.message);
        }
    });
};
}),
"[project]/src/modules/admin-section/notifications/notifications.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)");
;
;
const useNotificationsQueryService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_ADD);
};
const useNotificationsStoreService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_ADD);
};
const useNotificationsEditService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_EDIT);
};
const useNotificationsUpdateService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_UPDATE);
};
const useNotificationsReadService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_READ);
};
const useNotificationsDeleteService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_REMOVE);
};
}),
"[project]/src/modules/admin-section/notifications/notifications.action.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/admin-section/notifications/notifications.service.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const useNotificationsQuery = (options, config)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationsQueryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_ADD
        ],
        queryFn: ()=>findAll(options),
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
const useNotificationsQueryById = (id)=>{
    const { find } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationsEditService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_BRAND_EDIT,
            id
        ],
        queryFn: ()=>find(id),
        refetchOnWindowFocus: false,
        enabled: !!id
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
        NotificationsByID: data?.data ?? {},
        error,
        isPending,
        refetch,
        isFetching
    };
};
const useNotificationsRead = ()=>{
    const { patchItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationsReadService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>patchItem(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_READ
        ],
        onSuccess: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
        }
    });
};
const useNotificationsDelete = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$admin$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationsDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ADMIN_NOTIFICATIONS_REMOVE
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
            }
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
}),
"[project]/src/modules/seller-section/notifications/notifications.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotificationsDeleteService",
    ()=>useNotificationsDeleteService,
    "useNotificationsQueryService",
    ()=>useNotificationsQueryService,
    "useNotificationsReadService",
    ()=>useNotificationsReadService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
;
;
const useNotificationsQueryService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_ADD);
};
const useNotificationsReadService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_READ);
};
const useNotificationsDeleteService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_REMOVE);
};
}),
"[project]/src/modules/seller-section/notifications/notifications.action.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNotificationsDelete",
    ()=>useNotificationsDelete,
    "useNotificationsQuery",
    ()=>useNotificationsQuery,
    "useNotificationsRead",
    ()=>useNotificationsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/seller-section/notifications/notifications.service.ts [app-ssr] (ecmascript)");
;
;
;
;
const useNotificationsQuery = (options, config)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationsQueryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_ADD
        ],
        queryFn: ()=>findAll(options),
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
const useNotificationsRead = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationsReadService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_READ
        ],
        onSuccess: async (data)=>{
            //@ts-ignore
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            // @ts-ignore
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
const useNotificationsDelete = ()=>{
    const { delete: deleteItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$notifications$2f$notifications$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNotificationsDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (id)=>deleteItem(id),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_NOTIFICATIONS_REMOVE
        ],
        onSuccess: async (data)=>{
            //@ts-ignore
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            // @ts-ignore
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
}),
"[project]/src/modules/seller-section/product/product.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/hooks/index.ts [app-ssr] (ecmascript)");
;
;
;
;
const useStoreListService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].STORE_DROPDOWN_LIST);
};
const useProductStoreService = ()=>{
    const selectedStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$hooks$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.store.selectedStore);
    const slug = selectedStore?.slug;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_ADD);
};
const useProductQueryService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_LIST);
};
const useProductEditService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_EDIT);
};
const useProductUpdateService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_UPDATE);
};
const useCouponLineDeleteService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_REMOVE);
};
const useMakeFeatureService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_FEATURE_MAKE);
};
const useProductDescriptionGenerateService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DESCRIPTION_GENERATE);
};
const useMediaLibraryService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_LIBRARY);
};
const useMediaDeleteService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_DELETE);
};
const useAltChangeService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_ALT_CHANGE);
};
const useDynamicFieldService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DYNAMIC_FIELD);
};
}),
"[project]/src/modules/seller-section/product/product.action.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/sellerRoutes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/env.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/seller-section/product/product.service.ts [app-ssr] (ecmascript)");
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
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStoreListService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].STORE_DROPDOWN_LIST,
            options
        ],
        queryFn: ()=>findAll(options),
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
const useProductQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProductQueryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_LIST
        ],
        queryFn: ()=>findAll(options),
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
const useProductQueryById = (id)=>{
    const { find } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProductEditService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_EDIT,
            id
        ],
        queryFn: ()=>find(id),
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
const useProductStoreMutation = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProductStoreService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_ADD
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].productList);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
            }
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("An unknown error occurred.");
            }
        }
    });
};
const useProductUpdateMutation = ()=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { update } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProductUpdateService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>update(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_UPDATE
        ],
        onSuccess: async (data)=>{
            if (Boolean(data?.data)) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
                router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].productList);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(data?.data?.message);
            }
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
const useProductDelete = ()=>{
    const { delete: deleteItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCouponLineDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (id)=>deleteItem(id),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_REMOVE
        ],
        onSuccess: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
const useMakeFeature = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMakeFeatureService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_FEATURE_MAKE
        ],
        onSuccess: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
const useFileUploadService = ()=>{
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const axiosInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const instance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$env$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_REST_API_ENDPOINT,
            timeout: 5000000,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        instance.interceptors.request.use((config)=>{
            const cookies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
            let token = cookies || "";
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
                "X-localization": locale
            };
            return config;
        });
        return instance;
    }, [
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
const useMediaLibraryQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMediaLibraryService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_LIBRARY
        ],
        queryFn: ()=>findAll(options),
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
const useMediaDelete = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMediaDeleteService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_MEDIA_DELETE
        ],
        onSuccess: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
const useAltChange = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAltChangeService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$AdminApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PRODUCT_ALT_CHANGE
        ],
        onSuccess: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
const useDynamicFieldQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDynamicFieldService"])();
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DYNAMIC_FIELD,
            options?.store_type
        ],
        queryFn: ()=>findAll(options),
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
const useProductDescriptionGenerate = ()=>{
    const { create } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$product$2f$product$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useProductDescriptionGenerateService"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: (values)=>create(values),
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].PRODUCT_DESCRIPTION_GENERATE
        ],
        onSuccess: async (data)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(data?.data?.message);
        },
        onError: async (data)=>{
            const errorText = data?.response?.data;
            if (errorText && typeof errorText === "object") {
                Object.entries(errorText).forEach(([key, messages])=>{
                    if (Array.isArray(messages)) {
                        messages.forEach((msg)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(msg));
                    } else if (typeof messages === "string") {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages);
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorText?.message);
            }
        }
    });
};
}),
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
"[project]/src/modules/seller-section/seller-dashboard/seller-dashboard.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/core/base.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
;
;
const useSellerDashboardService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_DASHBOARD_LIST);
};
const useSellerSalesService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_SALES_LIST);
};
const useSellerOrderGrowthService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_ORDER_GROWTH_LIST);
};
const useSellerOtherSummaryService = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$core$2f$base$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBaseService"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_OTHER_SUMMARY_LIST);
};
}),
"[project]/src/modules/seller-section/seller-dashboard/seller-dashboard.action.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/seller-section/seller-dashboard/seller-dashboard.service.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const useSellerDashboardQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSellerDashboardService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_DASHBOARD_LIST
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
        SellerDashboard: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
const useSellerSalesSummaryQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSellerSalesService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_SALES_LIST
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
        SellerSalesSummary: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
const useSellerGrowthOrderQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSellerOrderGrowthService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_ORDER_GROWTH_LIST
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
        SellerOrderGrowth: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
const useSellerOtherSummaryQuery = (options)=>{
    const { findAll } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$seller$2d$section$2f$seller$2d$dashboard$2f$seller$2d$dashboard$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSellerOtherSummaryService"])();
    const errorToastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { data, isPending, error, refetch, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$endpoints$2f$SellerApiEndPoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SELLER_API_ENDPOINTS"].SELLER_OTHER_SUMMARY_LIST
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
        SellerOtherSummary: data?.data ?? [],
        error,
        isPending,
        refetch,
        isFetching
    };
};
}),
];

//# sourceMappingURL=src_modules_0uld72r._.js.map