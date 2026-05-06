module.exports = [
"[project]/src/config/routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Routes",
    ()=>Routes
]);
const Routes = {
    signup: "/signup",
    signin: "/admin/signin",
    admin: "/admin",
    dashboard: "/admin/dashboard",
    password: "/admin/reset-password",
    permissions: "/admin/permissions",
    roles: "/admin/roles/list",
    addRole: "/admin/roles/add",
    editRole: "/admin/roles/edit",
    users: "/admin/users",
    addUser: "/admin/users/add-user",
    editUser: "/admin/users/edit-user",
    brand: "/admin/brand/list",
    addBrand: "/admin/brand/add",
    editBrand: "/admin/brand/update",
    categories: "/admin/categories",
    addCategory: "/admin/categories/add-category",
    editCategory: "/admin/categories/edit-category",
    shops: "/admin/shops",
    addShop: "/admin/shops/add-shop",
    editShop: "/admin/shops/edit-shop",
    profile: "/admin/profile",
    listings: "/admin/profile/listings",
    addListing: "/admin/profile/listings/add-listing",
    privacyPolicy: "/admin/privacy-policy",
    termsAndConditions: "/admin/terms",
    cart: "/admin/cart",
    checkout: "/admin/checkout",
    draftProducts: "/admin/products/draft",
    outOfStockOrLowProducts: "/admin/products/product-stock",
    productInventory: "/admin/products/inventory",
    transaction: "/admin/orders/transaction",
    adminList: "/admin/users/admins",
    vendorList: "/admin/users/vendors",
    pendingVendorList: "/admin/users/vendors/pending",
    customerList: "/admin/users/customer",
    myStaffs: "/admin/users/my-staffs",
    vendorStaffs: "/admin/users/vendor-staffs",
    ownerDashboardMyShop: "/admin/my-shop",
    blogCategories: "/admin/blog/category",
    addBlogCategory: "/admin/blog/category/add",
    editBlogCategory: "/admin/blog/category/edit",
    blogPost: "/admin/blog/posts",
    addBlogPost: "/admin/blog/posts/add",
    editBlogPost: "/admin/blog/posts/edit",
    tags: "/admin/tag/list",
    addTag: "/admin/tag/add",
    editTag: "/admin/tag/edit",
    pages: "/admin/pages/list",
    addPage: "/admin/pages/add",
    editPage: "/admin/pages/edit",
    editAboutSettings: "/admin/system-management/page-settings/about",
    editContactSettings: "/admin/system-management/page-settings/contact",
    editBecomeSellerSettings: "/admin/system-management/page-settings/become-seller",
    couponList: "/admin/coupon/list",
    addCoupon: "/admin/coupon/add",
    editCoupon: "/admin/coupon/edit",
    couponLineList: "/admin/coupon-line/list",
    addCouponLine: "/admin/coupon-line/add",
    editCouponLine: "/admin/coupon-line/edit",
    productList: "/admin/product/list",
    addProduct: "/admin/product/add",
    EditProduct: "/admin/product/edit",
    approvedProductDetails: "/admin/product/product-details",
    DetailsProduct: "/admin/product/request/product-details",
    authorList: "/admin/product/author/list",
    addAuthor: "/admin/product/author/add",
    editAuthor: "/admin/product/author/edit",
    unitList: "/admin/unit/list",
    addUnit: "/admin/unit/add",
    editUnit: "/admin/unit/edit",
    packageList: "/admin/business-operations/subscription/package/list",
    addPackage: "/admin/business-operations/subscription/package/add",
    editPackage: "/admin/business-operations/subscription/package/edit",
    StoreSubscriptionList: "/admin/business-operations/subscription/store/list",
    subscriptionHistory: "/admin/business-operations/subscription/store/history",
    areaList: "/admin/business-operations/area/list",
    addArea: "/admin/business-operations/area/add",
    editArea: "/admin/business-operations/area/edit",
    editAreaSettings: "/admin/business-operations/area/settings/update",
    storeTypeList: "/admin/business-operations/store-type",
    addStoreType: "/admin/business-operations/store-type/add",
    editStoreType: "/admin/business-operations/store-type/update",
    attributeList: "/admin/attribute/list",
    addAttribute: "/admin/attribute/add",
    editAttribute: "/admin/attribute/edit",
    flashDealsList: "/admin/promotional/flash-deals/list",
    addFlashDeals: "/admin/promotional/flash-deals/add",
    editFlashDeals: "/admin/promotional/flash-deals/edit",
    flashDealDetails: "/admin/promotional/flash-deals/details",
    deliverymanList: "/admin/deliveryman/list",
    addDeliveryman: "/admin/deliveryman/add",
    editDeliveryman: "/admin/deliveryman/edit",
    DeliverymanDashboard: "/admin/deliveryman/details",
    CustomerList: "/admin/customer/list",
    addCustomer: "/admin/customer/add",
    editCustomer: "/admin/customer/edit",
    AdminCustomerDetails: "/admin/customer/details",
    vehicleTypeList: "/admin/deliveryman/vehicle-types/list",
    addVehicleType: "/admin/deliveryman/vehicle-types/add",
    editVehicleType: "/admin/deliveryman/vehicle-types/edit",
    storeList: "/admin/store/list",
    addStore: "/admin/store/add",
    editStore: "/admin/store/edit",
    viewStore: "/admin/store/view",
    ordersList: "/admin/orders",
    orderDetails: "/admin/orders/details",
    addOrder: "/admin/orders/add",
    editOrder: "/admin/orders/edit",
    supportTicketList: "/admin/support-ticket/list",
    addSupportTicket: "/admin/support-ticket/add",
    editSupportTicket: "/admin/support-ticket/edit",
    supportTicketDetails: "/admin/support-ticket/details",
    MethodList: "/admin/financial/withdraw/method/list",
    addMethod: "/admin/financial/withdraw/method/add",
    editMethod: "/admin/financial/withdraw/method/edit",
    EmailTemplateList: "/admin/system-management/email-settings/email-template/list",
    addEmailTemplate: "/admin/system-management/email-settings/email-template/add",
    editEmailTemplate: "/admin/system-management/email-settings/email-template/edit",
    RefundReasonList: "/admin/orders/refund-reason/list",
    addRefundReason: "/admin/orders/refund-reason/add",
    editRefundReason: "/admin/orders/refund-reason/edit",
    withdrawList: "/admin/financial/withdraw/history",
    withdrawDetails: "/admin/financial/withdraw/details",
    SliderList: "/admin/slider/list",
    addSlider: "/admin/slider/add",
    editSlider: "/admin/slider/edit",
    BannerList: "/admin/promotional/banner/list",
    addBanner: "/admin/promotional/banner/add",
    editBanner: "/admin/promotional/banner/edit",
    MenuCustomizationList: "/admin/system-management/menu-customization",
    AddMenuCustomization: "/admin/system-management/menu-customization/add",
    EditMenuCustomization: "/admin/system-management/menu-customization/edit",
    CashCollectList: "/admin/financial/cash-collect",
    addCashCollect: "/admin/financial/cash-collect/add",
    editCashCollect: "/admin/financial/cash-collect/edit",
    NoticeList: "/admin/store-notices",
    AddNotice: "/admin/store-notices/add",
    EditNotice: "/admin/store-notices/edit",
    DepartmentList: "/admin/ticket/department",
    addDepartment: "/admin/ticket/department/add",
    editDepartment: "/admin/ticket/department/edit",
    StaffList: "/admin/staff/list",
    addStaff: "/admin/staff/add",
    editStaff: "/admin/staff/edit",
    SellerList: "/admin/seller/list",
    addSeller: "/admin/seller/registration",
    editSeller: "/admin/seller/update",
    SellerDetails: "/admin/seller/details",
    adminNotifications: "/admin/notifications",
    adminChatManage: "/admin/chat/manage",
    posOrderDetails: "/admin/pos/orders/details",
    ManageCurrency: "/admin/system-management/currencies/manage",
    addCurrency: "/admin/system-management/currencies/create",
    editCurrency: "/admin/system-management/currencies/update",
    ThemeDetails: "/admin/system-management/themes",
    ThemeCustomize: "/admin/system-management/themes/customize",
    DynamicField: "/admin/dynamic-fields",
    AddDynamicField: "/admin/dynamic-fields/add",
    EditDynamicField: "/admin/dynamic-fields/edit",
    DynamicFieldOptions: "/admin/dynamic-fields/options"
};
}),
"[project]/src/config/sellerRoutes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SellerRoutes",
    ()=>SellerRoutes
]);
const SellerRoutes = {
    signin: "/seller/signin",
    becomeASeller: "/become-a-seller",
    seller: "/seller",
    dashboard: "/seller/dashboard",
    emailVerification: "/seller/email-verification",
    profile: "/seller/profile",
    store: "/seller/store/list",
    addStore: "/seller/store/add",
    editStore: "/seller/store/edit",
    product: "/seller/product/list",
    addProduct: "/seller/product/add",
    editProduct: "/seller/product/edit",
    staff: "/seller/store/staff/list",
    addStaff: "/seller/store/staff/add",
    editStaff: "/seller/store/staff/edit",
    storeDashboard: "/seller/store",
    productList: "/seller/store/product/list",
    productAdd: "/seller/store/product/add",
    productEdit: "/seller/store/product/edit",
    businessPlan: "/seller/store/settings/business-plan",
    sellerWallet: "/seller/store/financial/wallet",
    authorList: "/seller/store/product/author/list",
    addAuthor: "/seller/store/product/author/add",
    editAuthor: "/seller/store/product/author/edit",
    AttributeList: "/seller/store/attribute/list",
    addAttribute: "/seller/store/attribute/add",
    editAttribute: "/seller/store/attribute/edit",
    supportTicketList: "/seller/store/support-ticket/list",
    addSupportTicket: "/seller/store/support-ticket/add",
    editSupportTicket: "/seller/store/support-ticket/edit",
    supportTicketDetails: "/seller/store/support-ticket/details",
    withdrawRequestList: "/seller/store/financial/withdraw",
    addWithdrawRequest: "/seller/store/financial/withdraw/withdraw-request",
    editWithdrawRequest: "/seller/store/support-ticket/edit",
    withdrawRequestDetails: "/seller/store/financial/withdraw/details",
    ordersList: "/seller/store/orders",
    orderDetails: "/seller/store/orders/details",
    ActiveDealsList: "/seller/store/promotional/flash-deals/active-deals",
    MyDealsList: "/seller/store/promotional/flash-deals/my-deals",
    JoinDealsAdd: "/seller/store/promotional/flash-deals/join-deals",
    sellerNotifications: "/seller/store/notifications",
    sellerChatManage: "/seller/store/chat/list",
    posOrderDetails: "/seller/store/pos/orders/details"
};
}),
"[project]/src/endpoints/AdminApiEndPoints.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS
]);
const API_ENDPOINTS = {
    // routes for admin
    PERMISSIONS: "v1/admin/permissions",
    MODULE_WISE_PERMISSIONS: "v1/admin/module-wise-permissions",
    FOOTER: "v1/footer",
    SUBSCRIBE: "v1/subscribe",
    UNSUBSCRIBE: "v1/unsubscribe",
    ROLES: "v1/admin/roles/list",
    ROLES_ADD: "v1/admin/roles/add",
    ROLES_UPDATE: "v1/admin/roles/update",
    ROLES_EDIT: "v1/admin/roles/details",
    ROLES_STATUS_CHANGE: "v1/admin/roles/change-status",
    ROLES_REMOVE: "v1/admin/roles/remove",
    // brand
    ADMIN_BRAND_ADD: "v1/admin/brand/add",
    ADMIN_BRAND_EDIT: "v1/admin/brand/details",
    ADMIN_BRAND_LIST: "v1/admin/brand/list",
    ADMIN_BRAND_UPDATE: "v1/admin/brand/update",
    ADMIN_BRAND_STATUS: "v1/admin/brand/change-status",
    ADMIN_BRAND_REMOVE: "v1/admin/brand/remove",
    //Author
    PRODUCT_AUTHOR_LIST: "v1/admin/product/author/list",
    PRODUCT_AUTHOR_REQUEST: "v1/admin/product/author/author-request",
    PRODUCT_AUTHOR_APPROVED: "v1/admin/product/author/approve",
    PRODUCT_AUTHOR_STORE: "v1/admin/product/author/add",
    PRODUCT_AUTHOR_UPDATE: "v1/admin/product/author/update",
    PRODUCT_AUTHOR_DETAILS: "v1/admin/product/author/details",
    PRODUCT_AUTHOR_REMOVE: "v1/admin/product/author/remove",
    PRODUCT_AUTHOR_STATUS_CHANGE: "v1/admin/product/author/change-status",
    // Category
    CATEGORY: "v1/admin/product-categories/list",
    CATEGORY_EDIT: "v1/admin/product-categories/details",
    CATEGORY_ADD: "v1/admin/product-categories/add",
    CATEGORY_UPDATE: "v1/admin/product-categories/update",
    CATEGORY_STATUS: "v1/admin/product-categories/change-status",
    CATEGORY_REMOVE: "v1/admin/product-categories/remove",
    // product attribute
    PRODUCT_ATTRIBUTE: "v1/admin/attribute/list",
    PRODUCT_ATTRIBUTE_ADD: "v1/admin/attribute/add",
    PRODUCT_ATTRIBUTE_EDIT: "v1/admin/attribute",
    PRODUCT_ATTRIBUTE_REMOVE: "v1/admin/attribute/remove",
    PRODUCT_ATTRIBUTE_STATUS_CHANGE: "v1/admin/attribute/status",
    // themes  settings option
    THEMES_LIST: "v1/admin/system-management/themes/list",
    THEMES_DETAILS: "v1/admin/system-management/themes/details",
    THEMES_ADD: "v1/admin/system-management/themes/store",
    THEME_STATUS: "v1/admin/system-management/themes/active",
    // business operation
    //Area Setup
    BUSINESS_OPERATION_AREA_LIST: "v1/admin/business-operation/area/list",
    // Subscriptions
    BUSINESS_OPERATION_SUBSCRIPTION_PACKAGE_LIST: "v1/admin/business-operation/subscriptions/package/list",
    // commission
    BUSINESS_OPERATION_COMMISSION_SETTINGS: "v1/admin/business-operations/commission/settings",
    BUSINESS_OPERATION_COMMISSION_HISTORY: "v1/admin/business-operation/commission/history",
    // System Management Settings
    GENERAL_SETTINGS: "v1/admin/system-management/general-settings",
    PAYMENT_GETWAY: "v1/admin/payment-gateways",
    PAYMENT_GETWAY_CURRENCY: "v1/admin/payment-gateways/settings/currency",
    SEO_SETTINGS: "v1/admin/system-management/seo-settings",
    MAINTENANCE_SETTINGS: "v1/admin/system-management/maintenance-settings",
    SOCIAL_SETTINGS: "v1/admin/system-management/social-login-settings",
    FOOTER_CUSTOMIZATION: "v1/admin/system-management/footer-customization",
    SMTP_SETTINGS: "v1/admin/system-management/email-settings/smtp",
    TEST_EMAIL: "v1/admin/system-management/email-settings/test-mail-send",
    CASHE_MANAGEMENT: "v1/admin/system-management/cache-management",
    DATABASE_UPDATE_CONTROL: "v1/admin/system-management/database-update-controls",
    FIREBASE_SETTINGS: "v1/admin/system-management/firebase-settings",
    GOOGLE_MAP_SETTINGS: "v1/admin/system-management/google-map-settings",
    RECAPTCHA_SETTINGS: "v1/admin/system-management/recaptcha-settings",
    REGISTER_SETTINGS: "v1/admin/system-management/page-settings/register",
    LOGIN_SETTINGS: "v1/admin/system-management/page-settings/login",
    ADMIN_SIGN_IN_SETTINGS: "v1/login-page-settings",
    ABOUT_SETTINGS: "v1/admin/system-management/page-settings/about",
    CONTACT_SETTINGS: "v1/admin/system-management/page-settings/contact",
    PRODUCT_DETAILS_SETTINGS: "v1/admin/system-management/page-settings/product-details",
    BLOG_DETAILS_SETTINGS: "v1/admin/system-management/page-settings/blog-details",
    HOME_SETTINGS: "v1/admin/system-management/page-settings/home",
    TAG: "v1/admin/tag/list",
    GET_TAG: "v1/admin/tag/details",
    TAG_ADD: "v1/admin/tag/add",
    TAG_UPDATE: "v1/admin/tag/update",
    TAG_REMOVE: "v1/admin/tag/remove",
    PAGES: "v1/admin/pages/list",
    ALL_PAGES: "v1/all/pages",
    PAGES_GET: "v1/admin/pages/details",
    PAGES_ADD: "v1/admin/pages/store",
    PAGES_UPDATE: "v1/admin/pages/update",
    PAGES_REMOVE: "v1/admin/pages/remove",
    BLOG_CATEGORY: "v1/admin/blog/category/list",
    BLOG_CATEGORY_FETCH: "v1/admin/blog/category/fetch/list",
    BLOG_CATEGORY_EDIT: "v1/admin/blog/category/details",
    BLOG_CATEGORY_ADD: "v1/admin/blog/category/add",
    BLOG_CATEGORY_UPDATE: "v1/admin/blog/category/update",
    BLOG_CATEGORY_STATUS_UPDATE: "v1/admin/blog/category/change-status",
    BLOG_CATEGORY_REMOVE: "v1/admin/blog/category/remove",
    BLOG_POST: "v1/admin/blog/list",
    BLOG_POST_ADD: "v1/admin/blog/add",
    BLOG_POST_EDIT: "v1/admin/blog/details",
    BLOG_POST_UPDATE: "v1/admin/blog/update",
    BLOG_POST_STATUS_UPDATE: "v1/admin/blog/change-status",
    BLOG_POST_DELETE: "v1/admin/blog/remove",
    COUPON_LIST: "v1/admin/coupon/list",
    COUPON_ADD: "v1/admin/coupon/add",
    COUPON_EDIT: "v1/admin/coupon/details",
    COUPON_UPDATE: "v1/admin/coupon/update",
    COUPON_STATUS_CHANGE: "v1/admin/coupon/status-change",
    COUPON_DELETE: "v1/admin/coupon/remove",
    PACKAGE_LIST: "v1/admin/business-operations/subscription/package/list",
    PACKAGE_ADD: "v1/admin/business-operations/subscription/package/store",
    PACKAGE_EDIT: "v1/admin/business-operations/subscription/package/details",
    PACKAGE_UPDATE: "v1/admin/business-operations/subscription/package/update",
    PACKAGE_STATUS_CHANGE: "v1/admin/business-operations/subscription/package/change-status",
    PACKAGE_DELETE: "v1/admin/business-operations/subscription/package/delete",
    SUBSCRIPTION_STORE_LIST: "v1/admin/business-operations/subscription/store/list",
    SUBSCRIPTION_STORE_STATUS_CHANGE: "v1/admin/business-operations/subscription/store/change-status",
    SUBSCRIPTION_STORE_HISTORY: "v1/admin/business-operations/subscription/store/history",
    AREA_LIST: "v1/admin/business-operations/area/list",
    AREA_ADD: "v1/admin/business-operations/area/add",
    AREA_EDIT: "v1/admin/business-operations/area/details",
    AREA_UPDATE: "v1/admin/business-operations/area/update",
    AREA_STATUS_CHANGE: "v1/admin/business-operations/area/change-status",
    AREA_DELETE: "v1/admin/business-operations/area/remove",
    AREA_SETTINGS_UPDATE: "v1/admin/business-operations/area/settings/update",
    AREA_SETTINGS_EDIT: "v1/admin/business-operations/area/settings/details",
    ADMIN_STORE_TYPE_LIST: "v1/admin/business-operations/store-type/list",
    STORE_TYPE_ADD: "v1/admin/business-operations/store-type/add",
    STORE_TYPE_EDIT: "v1/admin/business-operations/store-type/details",
    STORE_TYPE_UPDATE: "v1/admin/business-operations/store-type/update",
    STORE_TYPE_STATUS_CHANGE: "v1/admin/business-operations/store-type/change-status",
    STORE_TYPE_DELETE: "v1/admin/business-operations/store-type/remove",
    COUPON_LINE_LIST: "v1/admin/coupon-line/list",
    COUPON_LINE_ADD: "v1/admin/coupon-line/add",
    COUPON_LINE_EDIT: "v1/admin/coupon-line/details",
    COUPON_LINE_UPDATE: "v1/admin/coupon-line/update",
    COUPON_LINE_DELETE: "v1/admin/coupon-line/remove",
    SELLER_LIST: "v1/admin/seller/active",
    SELLER_STORE__LIST: "v1/admin/store/seller-stores",
    STORE_DROPDOWN_LIST: "v1/admin/store-fetch-list",
    PRODUCT_ADD: "v1/admin/product/add",
    PRODUCT_LIST: "v1/admin/product/list",
    PRODUCT_EDIT: "v1/admin/product/details",
    PRODUCT_DETAILS: "v1/admin/product",
    PRODUCT_UPDATE: "v1/admin/product/update",
    PRODUCT_REMOVE: "v1/admin/product/remove",
    PRODUCT_FEATURE_MAKE: "v1/admin/product/add-to-featured",
    PRODUCT_STATUS_UPDATE: "v1/admin/product/change-status",
    TRASH_PRODUCT_LIST: "v1/admin/product/trash-list",
    TRASH_PRODUCT_RESTORE: "v1/admin/product/trash-restore",
    TRASH_PRODUCT_DELETE: "v1/admin/product/trash-delete",
    STOCK_REPORT_LIST: "v1/admin/product/stock-report",
    INVENTORY_LIST: "v1/admin/product/inventory",
    INVENTORY_DELETE: "v1/admin/product/inventory/remove",
    REQUEST_LIST: "v1/admin/product/request",
    REQUEST_APPROVE: "v1/admin/product/approve",
    EXPORT: "v1/admin/product/export",
    IMPORT: "v1/admin/product/import",
    //author
    AUTHOR_REQUEST_LIST: "v1/admin/product/author/author-request",
    AUTHOR_REQUEST_APPROVE: "v1/admin/product/author/approve",
    AUTHOR_LIST: "v1/admin/product/author/list",
    AUTHOR_ADD: "v1/admin/product/author/add",
    AUTHOR_EDIT: "v1/admin/product/author/details",
    AUTHOR_UPDATE: "v1/admin/product/author/update",
    AUTHOR_STATUS: "v1/admin/product/author/change-status",
    AUTHOR_REMOVE: "v1/admin/product/author/remove",
    //unit
    ADMIN_UNIT_LIST: "v1/admin/unit/list",
    UNIT_SAVE: "v1/admin/unit/add",
    UNIT_UPDATE: "v1/admin/unit/update",
    UNIT_EDIT: "v1/admin/unit/details",
    UNIT_DELETE: "v1/admin/unit/remove",
    // product attribute
    ATTRIBUTE_LIST: "v1/admin/attribute/list",
    ATTRIBUTE_ADD: "v1/admin/attribute/add",
    ATTRIBUTE_UPDATE: "v1/admin/attribute/update",
    ATTRIBUTE_EDIT: "v1/admin/attribute/details",
    ATTRIBUTE_REMOVE: "v1/admin/attribute/remove",
    ATTRIBUTE_STATUS_CHANGE: "v1/admin/attribute/status",
    // admin wallet
    WALLET_LIST: "v1/admin/financial/wallet/list",
    WALLET_AMOUNT_DEPOSIT: "v1/admin/financial/wallet/deposit",
    WALLET_STATUS_UPDATE: "v1/admin/financial/wallet/status",
    WALLET_TRANSACTIONS: "v1/admin/financial/wallet/transactions",
    TRANSACTIONS_STATUS_UPDATE: "v1/admin/financial/wallet/transactions-status",
    TRANSACTIONS_PAYMENT_STATUS_UPDATE: "v1/admin/financial/wallet/transactions-payment-status-change",
    WALLET_SETTINGS: "v1/admin/financial/wallet/settings",
    // admin flash deals
    FLASH_DEALS_LIST: "v1/admin/promotional/flash-deals/list",
    FLASH_DEALS_DROPDOWN_LIST: "v1/admin/promotional/flash-deals/list-dropdown",
    FLASH_DEALS_ALL_PRODUCTS_LIST: "v1/admin/promotional/flash-deals/all-products",
    FLASH_DEALS_ADD: "v1/admin/promotional/flash-deals/add",
    FLASH_DEALS_EDIT: "v1/admin/promotional/flash-deals/details",
    FLASH_DEALS_UPDATE: "v1/admin/promotional/flash-deals/update",
    FLASH_DEALS_STATUS_UPDATE: "v1/admin/promotional/flash-deals/change-status",
    FLASH_DEALS_DELETE: "v1/admin/promotional/flash-deals/remove",
    DEACTIVATE_EXPIRED_FLASH_SALE: "v1/admin/promotional/flash-deals/deactivate",
    JOIN_REQUEST_LIST: "v1/admin/promotional/flash-deals/join-request",
    JOIN_REQUEST_APPROVE: "v1/admin/promotional/flash-deals/join-request/approve",
    JOIN_REQUEST_REJECT: "v1/admin/promotional/flash-deals/join-request/reject",
    DELIVERYMAN_LIST: "v1/admin/deliveryman/list",
    DELIVERYMAN_REQUEST_LIST: "v1/admin/deliveryman/request",
    DELIVERYMAN_APPROVE: "v1/admin/deliveryman/handle-request",
    DELIVERYMAN_ADD: "v1/admin/deliveryman/add",
    DELIVERYMAN_EDIT: "v1/admin/deliveryman/details",
    DELIVERYMAN_DETAILS: "v1/admin/deliveryman/history",
    DELIVERYMAN_UPDATE: "v1/admin/deliveryman/update",
    DELIVERYMAN_STATUS_UPDATE: "v1/admin/deliveryman/change-status",
    DELIVERYMAN_STATUS_VERIFY: "v1/admin/deliveryman/verification",
    DELIVERYMAN_REMOVE: "v1/admin/deliveryman/remove",
    DELIVERYMAN_PASSWORD_CHANGE: "v1/admin/deliveryman/change-password",
    TRASH_DELIVERYMAN_LIST: "v1/admin/deliveryman/trash-list",
    TRASH_DELIVERYMAN_RESTORE: "v1/admin/deliveryman/trash-restore",
    TRASH_DELIVERYMAN_DELETE: "v1/admin/deliveryman/trash-delete",
    VEHICLE_TYPE_LIST: "v1/admin/deliveryman/vehicle-types/list",
    VEHICLE_TYPE_DROPDOWN_LIST: "v1/admin/deliveryman/vehicle-types/list-dropdown",
    VEHICLE_TYPE_ADD: "v1/admin/deliveryman/vehicle-types/add",
    VEHICLE_TYPE_EDIT: "v1/admin/deliveryman/vehicle-types/details",
    VEHICLE_TYPE_UPDATE: "v1/admin/deliveryman/vehicle-types/update",
    VEHICLE_TYPE_STATUS_UPDATE: "v1/admin/deliveryman/vehicle-types/change-status",
    VEHICLE_TYPE_REMOVE: "v1/admin/deliveryman/vehicle-types/remove",
    REVIEWS_LIST: "v1/admin/feedback-control/review",
    REVIEWS_APPROVE: "v1/admin/feedback-control/review/approve",
    REVIEWS_REJECT: "v1/admin/feedback-control/review/reject",
    REVIEWS_DELETE: "v1/admin/feedback-control/review/remove",
    QUESTIONS_LIST: "v1/admin/feedback-control/questions",
    QUESTIONS_APPROVE: "v1/admin/feedback-control/questions/approve",
    QUESTIONS_REJECT: "v1/admin/feedback-control/questions/reject",
    QUESTIONS_STATUS_CHANGE: "v1/admin/feedback-control/questions/change-status",
    QUESTIONS_DELETE: "v1/admin/feedback-control/questions/remove",
    // store
    ADMIN_STORE_LIST: "v1/admin/store/list",
    ADMIN_STORE_ADD: "v1/admin/store/add",
    ADMIN_STORE_EDIT: "v1/admin/store/details",
    ADMIN_STORE_UPDATE: "v1/admin/store/update",
    ADMIN_STORE_STATUS_UPDATE: "v1/admin/store/change-status",
    ADMIN_STORE_DELETE: "v1/admin/store/remove",
    STORE_DASHBOARD: "v1/seller/store/dashboard",
    STORE_REQUEST_APPROVAL_LIST: "v1/admin/store/request",
    STORE_REQUEST_APPROVE: "v1/admin/store/approve",
    TRASH_STORE_LIST: "v1/admin/store/trash-list",
    TRASH_STORE_RESTORE: "v1/admin/store/trash-restore",
    TRASH_STORE_DELETE: "v1/admin/store/trash-delete",
    // order
    ADMIN_ORDER_LIST: "v1/admin/orders",
    ADMIN_ORDER_ADD: "v1/admin/store/add",
    ADMIN_ORDER_EDIT: "v1/admin/store/details",
    ADMIN_ORDER_UPDATE: "v1/admin/store/update",
    ADMIN_ORDER_STATUS_UPDATE: "v1/admin/orders/change-order-status",
    ADMIN_PAYMENT_STATUS_UPDATE: "v1/admin/orders/change-payment-status",
    ADMIN_ORDER_DELETE: "v1/admin/store/remove",
    ADMIN_ORDER_INVOICE: "v1/admin/orders/invoice",
    ADMIN_ORDER_CANCEL: "v1/admin/orders/cancel-order",
    ADMIN_DELIVERY_ASSIGN: "v1/admin/orders/assign-deliveryman",
    ADMIN_DELIVERY_DROPDOWN_LIST: "v1/admin/deliveryman/list-dropdown",
    SUPPORT_TICKET_LIST: "v1/admin/support-ticket/list",
    SUPPORT_TICKET_EDIT: "v1/admin/support-ticket/details",
    SUPPORT_TICKET_DETAILS: "v1/admin/support-ticket/get-ticket-messages",
    SUPPORT_TICKET_ADD: "v1/admin/support-ticket/add",
    SUPPORT_TICKET_UPDATE: "v1/admin/support-ticket/update",
    SUPPORT_TICKET_ADD_MESSAGE: "v1/admin/support-ticket/message/add",
    SUPPORT_TICKET_REPLY_MESSAGE: "v1/admin/support-ticket/message/reply",
    SUPPORT_TICKET_RESOLVE: "v1/admin/support-ticket/resolve",
    SUPPORT_TICKET_REMOVE: "v1/admin/support-ticket/remove",
    SUPPORT_TICKET_PRIORITY_CHANGE: "v1/admin/support-ticket/change-priority-status",
    WITHDRAW_SETTINGS: "v1/admin/financial/withdraw/settings",
    WITHDRAW_METHOD_LIST: "v1/admin/financial/withdraw/gateway-list",
    WITHDRAW_METHOD_ADD: "v1/admin/financial/withdraw/gateway-add",
    WITHDRAW_METHOD_EDIT: "v1/admin/financial/withdraw/gateway-details",
    WITHDRAW_METHOD_UPDATE: "v1/admin/financial/withdraw/gateway-update",
    WITHDRAW_METHOD_DELETE: "v1/admin/financial/withdraw/gateway-delete",
    WITHDRAW_METHOD_STATUS_CHANGE: "v1/admin/financial/withdraw/gateway-change-status",
    WITHDRAW_LIST: "v1/admin/financial/withdraw",
    WITHDRAW_DETAILS: "v1/admin/financial/withdraw/details",
    WITHDRAW_REQUEST_LIST: "v1/admin/financial/withdraw/request-list",
    WITHDRAW_REQUEST_ADD: "v1/admin/financial/withdraw/withdraw-request",
    WITHDRAW_REQUEST_DETAILS: "v1/admin/financial/withdraw/details",
    WITHDRAW_METHOD_DROPDOWN: "v1/withdraw/gateway-method-list",
    WITHDRAW_REQUEST_REJECT: "v1/admin/financial/withdraw/request-reject",
    WITHDRAW_REQUEST_APPROVE: "v1/admin/financial/withdraw/request-approve",
    REFUND_REASON_LIST: "v1/admin/orders/refund-reason/list",
    REFUND_REASON_ADD: "v1/admin/orders/refund-reason/add",
    REFUND_REASON_EDIT: "v1/admin/orders/refund-reason/details",
    REFUND_REASON_UPDATE: "v1/admin/orders/refund-reason/update",
    REFUND_REASON_DELETE: "v1/admin/orders/refund-reason/remove",
    REFUND_REASON_STATUS_CHANGE: "v1/admin/financial/withdraw/gateway-change-status",
    REFUND_REQUEST_LIST: "v1/admin/orders/refund-request",
    REFUND_REQUEST_STATUS_CHANGE: "v1/admin/orders/refund-request/handle",
    UPDATE_LIVE_LOCATION: "v1/track-order-location",
    EMAIL_TEMPLATE_LIST: "v1/admin/system-management/email-settings/email-template/list",
    EMAIL_TEMPLATE_ADD: "v1/admin/system-management/email-settings/email-template/add",
    EMAIL_TEMPLATE_EDIT: "v1/admin/system-management/email-settings/email-template/details",
    EMAIL_TEMPLATE_UPDATE: "v1/admin/system-management/email-settings/email-template/edit",
    EMAIL_TEMPLATE_DELETE: "v1/admin/system-management/email-settings/email-template/remove",
    EMAIL_TEMPLATE_STATUS_CHANGE: "v1/admin/system-management/email-settings/email-template/change-status",
    SLIDER_LIST: "v1/admin/slider/list",
    SLIDER_ADD: "v1/admin/slider/add",
    SLIDER_EDIT: "v1/admin/slider/details",
    SLIDER_UPDATE: "v1/admin/slider/update",
    SLIDER_DELETE: "v1/admin/slider/remove",
    SLIDER_STATUS_CHANGE: "v1/admin/slider/change-status",
    BANNER_LIST: "v1/admin/promotional/banner/list",
    BANNER_ADD: "v1/admin/promotional/banner/add",
    BANNER_EDIT: "v1/admin/promotional/banner/details",
    BANNER_UPDATE: "v1/admin/promotional/banner/update",
    BANNER_DELETE: "v1/admin/promotional/banner/remove",
    BANNER_STATUS_CHANGE: "v1/admin/promotional/banner/change-status",
    BECOME_SELLER_LIST: "v1/admin/system-management/page-settings/become-seller",
    BECOME_SELLER_ADD: "v1/admin/system-management/page-settings/become-seller",
    CONTACT_MESSAGES_LIST: "v1/admin/contact-messages/list",
    CONTACT_MESSAGES_REPLY: "v1/admin/contact-messages/reply",
    CONTACT_MESSAGES_STATUS_CHANGE: "v1/admin/contact-messages/change-status",
    CONTACT_MESSAGES_DELETE: "v1/admin/contact-messages/remove",
    SUBSCRIBER_LIST: "v1/admin/customer/newsletter/list",
    SUBSCRIBER_LIST_STATUS_CHANGE: "v1/admin/customer/newsletter/bulk-status-change",
    SUBSCRIBER_LIST_DELETE: "v1/admin/customer/newsletter/remove",
    ADMIN_CUSTOMER_LIST: "v1/admin/customer/list",
    ADMIN_CUSTOMER_ADD: "v1/admin/customer/register",
    ADMIN_CUSTOMER_UPDATE: "v1/admin/customer/update-profile",
    ADMIN_CUSTOMER_DETAILS: "v1/admin/customer/details",
    ADMIN_CUSTOMER_LIST_STATUS_CHANGE: "v1/admin/customer/change-status",
    CUSTOMER_SUSPEND: "v1/admin/customer/suspend",
    CUSTOMER_EMAIL_VERIFY: "v1/admin/customer/email-verify",
    CUSTOMER_LIST_DELETE: "v1/admin/customer/remove",
    CUSTOMER_PASSWORD_CHANGE: "v1/admin/customer/change-password",
    TRASH_CUSTOMER_LIST: "v1/admin/customer/trash-list",
    TRASH_CUSTOMER_RESTORE: "v1/admin/customer/trash-restore",
    TRASH_CUSTOMER_DELETE: "v1/admin/customer/trash-delete",
    MENU_CUSTOMIZATION_LIST: "v1/admin/system-management/menu-customization/list",
    MENU_CUSTOMIZATION_ADD: "v1/admin/system-management/menu-customization/store",
    MENU_CUSTOMIZATION_EDIT: "v1/admin/system-management/menu-customization/details",
    MENU_CUSTOMIZATION_UPDATE: "v1/admin/system-management/menu-customization/update",
    MENU_CUSTOMIZATION_DELETE: "v1/admin/system-management/menu-customization/remove",
    MENU_CUSTOMIZATION_POSITION_CHANGE: "v1/admin/system-management/menu-customization/update-position",
    CASH_COLLECT_LIST: "v1/admin/financial/cash-collection",
    NOTICE_LIST: "v1/admin/store-notices/list",
    NOTICE_ADD: "v1/admin/store-notices/add",
    NOTICE_EDIT: "v1/admin/store-notices/details",
    NOTICE_UPDATE: "v1/admin/store-notices/update",
    NOTICE_DELETE: "v1/admin/store-notices/remove",
    NOTICE_STATUS_CHANGE: "v1/admin/store-notices/change-status",
    REPORT_ANALYTICS_LIST: "v1/admin/report-analytics/order",
    TRANSACTION_REPORT_LIST: "v1/admin/report-analytics/transaction",
    CHAT_SETTINGS: "v1/admin/chat/settings",
    LIVE_CHAT_LIST: "v1/admin/chat/manage/list",
    CHAT_DETAILS: "v1/admin/chat/manage/messages-details",
    REPLY_MESSAGE: "v1/admin/chat/manage/send",
    ADMIN_DASHBOARD_LIST: "v1/admin/dashboard",
    ADMIN_SALES_LIST: "v1/admin/dashboard/sales-summary",
    ADMIN_ORDER_GROWTH_LIST: "v1/admin/dashboard/order-growth-summary",
    ADMIN_OTHER_SUMMARY_LIST: "v1/admin/dashboard/other-summary",
    DEPARTMENT: "v1/admin/department/list",
    GET_DEPARTMENT: "v1/admin/department/details",
    DEPARTMENT_ADD: "v1/admin/department/add",
    DEPARTMENT_UPDATE: "v1/admin/department/update",
    DEPARTMENT_REMOVE: "v1/admin/department/remove",
    // Admin Staff
    ADMIN_STAFF_LIST: "v1/admin/staff/list",
    ADMIN_STAFF_ADD: "v1/admin/staff/add",
    ADMIN_STAFF_EDIT: "v1/admin/staff/details",
    ADMIN_STAFF_UPDATE: "v1/admin/staff/update",
    ADMIN_STAFF_STATUS: "v1/admin/staff/change-status",
    ADMIN_STAFF_REMOVE: "v1/admin/staff/remove",
    ADMIN_STAFF_PASSWORD_CHANGE: "v1/admin/staff/change-password",
    ADMIN_NOTIFICATIONS_ADD: "v1/admin/notifications",
    ADMIN_NOTIFICATIONS_READ: "v1/admin/notifications/read",
    ADMIN_NOTIFICATIONS_REMOVE: "v1/admin/notifications/remove",
    ADMIN_SELLER_LIST: "v1/admin/seller/list",
    ADMIN_ACTIVE_SELLER_LIST: "v1/admin/seller/active",
    ADMIN_PENDING_SELLER_LIST: "v1/admin/seller/list/pending",
    ADMIN_SELLER_STATUS_UPDATE: "v1/admin/seller/change-status",
    ADMIN_SELLER_ADD: "v1/admin/seller/registration",
    TRASH_SELLER_LIST: "v1/admin/seller/trash-list",
    TRASH_SELLER_RESTORE: "v1/admin/seller/trash-restore",
    TRASH_SELLER_DELETE: "v1/admin/seller/trash-delete",
    ADMIN_SELLER_EDIT: "v1/admin/seller/details",
    ADMIN_SELLER_UPDATE: "v1/admin/seller/update",
    ADMIN_SELLER_REMOVE: "v1/admin/seller/remove",
    ADMIN_SELLER_PASSWORD_CHANGE: "v1/admin/seller/change-password",
    ADMIN_SELLER_DETAILS: "v1/admin/seller/history",
    ADMIN_MEDIA_MANAGE_LIST: "v1/admin/media-manage",
    ADMIN_MEDIA_MANAGE_REMOVE: "v1/admin/media-manage/delete",
    GDPR_COOKIE_LIST: "v1/admin/system-management/gdpr-cookie-settings",
    GDPR_COOKIE_ADD: "v1/admin/system-management/gdpr-cookie-settings",
    ADMIN_SMS_PROVIDER_SETTINGS: "v1/admin/sms-provider/settings/update",
    ADMIN_OTP_LOGIN_STATUS_UPDATE: "v1/admin/sms-provider/settings/otp-login-status",
    ADMIN_SMS_PROVIDER_STATUS_UPDATE: "v1/admin/sms-provider/settings/status-update",
    ADMIN_SMS_PROVIDER_SETTINGS_UPDATE: "v1/admin/sms-provider/settings/update",
    ADMIN_SITEMAP_SETTINGS: "v1/admin/system-management/sitemap-settings",
    POS_PRODUCT_LIST: "v1/admin/pos/products",
    POS_PRODUCT_DETAILS: "v1/admin/pos/products",
    POS_CUSTOMER_STORE: "v1/admin/pos/add-customer",
    POS_CUSTOMER_LIST: "v1/admin/pos/customers",
    COUPON_CHECK: "v1/check-coupon",
    POS_PLACE_ORDER: "v1/admin/pos/checkout",
    POS_INVOICE: "v1/admin/pos/invoice",
    POS_CATEGORY: "v1/product-category/list",
    POS_ORDER_LIST: "v1/admin/pos/orders",
    POS_ORDER_DETAILS: "v1/admin/pos/orders",
    POS_SETTINGS: "v1/admin/pos/settings",
    CURRENCY_LIST: "v1/admin/currency",
    CURRENCY_CREATE: "v1/admin/currency/add",
    CURRENCY_BY_ID: "v1/admin/currency/details",
    CURRENCY_UPDATE: "v1/admin/currency/update",
    CURRENCY_DELETE: "v1/admin/currency/remove",
    CURRENCY_SETTINGS: "v1/admin/currency/settings",
    CURRENCY_SETTINGS_UPDATE: "v1/admin/currency/settings/update",
    DYNAMIC_FIELD_LIST: "v1/admin/dynamic-fields/list",
    DYNAMIC_FIELD_CREATE: "v1/admin/dynamic-fields/add",
    DYNAMIC_FIELD_BY_ID: "v1/admin/dynamic-fields/details",
    DYNAMIC_FIELD_UPDATE: "v1/admin/dynamic-fields/update",
    DYNAMIC_REQUIRED_FIELD_UPDATE: "v1/admin/dynamic-fields/change-status",
    DYNAMIC_FIELD_STATUS_UPDATE: "v1/admin/dynamic-fields/change-status",
    DYNAMIC_FIELD_DELETE: "v1/admin/dynamic-fields/remove",
    DYNAMIC_FIELD_OPTION_LIST: "v1/admin/dynamic-fields/options/list",
    DYNAMIC_FIELD_OPTION_CREATE: "v1/admin/dynamic-fields/options/add",
    DYNAMIC_FIELD_OPTION_BY_ID: "v1/admin/dynamic-fields/options/details",
    DYNAMIC_FIELD_OPTION_UPDATE: "v1/admin/dynamic-fields/options/update",
    DYNAMIC_FIELD_OPTION_DELETE: "v1/admin/dynamic-fields/options/remove",
    OPEN_AI_SETTINGS: "v1/admin/system-management/openai-settings",
    //common routes  for users
    YOUTUBE_SEARCH_API: "https://www.googleapis.com/youtube/v3/search",
    REGISTER: "/register",
    USERS_LOGIN: "/token",
    STORE_OWNER_REGISTER: "v1/seller/registration",
    SHOP_OWNER_LOGIN: "/v1/seller/login",
    USERS: "users",
    STAFF: "staff",
    STAFF_UPDATE: "staff/update",
    STAFF_STATUS: "staff/change-status",
    FORGET_PASSWORD: "v1/auth/forget-password",
    VERIFY_FORGET_PASSWORD_TOKEN: "/verify-forget-password-token",
    RESET_PASSWORD: "/reset-password",
    CHANGE_PASSWORD: "change-password",
    LOGOUT: "/logout",
    ME: "/user/me",
    GET_PERMISSIONS: "/permissions",
    PROFILE_SETTINGS: "user/profile",
    PROFILE_SETTINGS_EDIT: "user/profile-edit",
    PROFILE_SETTINGS_PASSWORD_CHANGE: "user/change-password",
    PRODUCT_AREA_LIST: "v1/com/area/list",
    PRODUCT_AREA_ADD: "v1/com/area/add",
    PRODUCT_AREA_EDIT: "v1/com/area",
    PRODUCT_AREA_UPDATE: "v1/com/area/update",
    PRODUCT_AREA_STATUS_UPDATE: "v1/com/area/status",
    PRODUCT_AREA_REMOVE: "v1/com/area/remove",
    PRODUCT_MEDIA_ADD: "v1/media-upload/store",
    PRODUCT_MEDIA_LIBRARY: "v1/media-upload/load-more",
    PRODUCT_MEDIA_DELETE: "v1/media-upload/delete",
    PRODUCT_ALT_CHANGE: "v1/media-upload/alt",
    PRODUCT_DYNAMIC_FIELD: "v1/admin/dynamic-fields",
    PRODUCT_DESCRIPTION_GENERATE: "v1/admin/generate/content",
    CATEGORY_LIST: "v1/product-category/list",
    BRAND_LIST: "v1/brand-list",
    AREA_DROPDOWN_LIST: "v1/area-list",
    PAYMENT_GATEWAY_LIST: "v1/payment-gateways",
    DEPARTMENT_LIST: "v1/department-list",
    UNIT_LIST: "v1/unit-list",
    STORE_TYPE_LIST: "v1/store-types",
    TYPE_WISE_STORE_LIST: "v1/store-list-dropdown",
    STORE_WISE_PRODUCT_LIST: "v1/store-wise-products",
    CUSTOMER_LIST: "v1/customer-list",
    SUBSCRIPTION_PACKAGE_LIST: "v1/subscription/packages",
    BECOME_A_SELLER: "v1/become-a-seller",
    GENERAL: "v1/site-general-info",
    CURRENCY: "v1/currency-info",
    CURRENCY_DROPDOWN_LIST: "v1/currency-list",
    ADMIN_FORGOT_PASSWORD: "v1/auth/forget-password",
    ADMIN_VERIFY_TOKEN: "v1/auth/verify-token",
    ADMIN_RESET_PASSWORD: "v1/auth/reset-password",
    GOOGLE_MAP_FOR_ALL: "v1/google-map-settings"
};
}),
"[project]/src/endpoints/SellerApiEndPoints.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SELLER_API_ENDPOINTS",
    ()=>SELLER_API_ENDPOINTS
]);
const SELLER_API_ENDPOINTS = {
    SHOP_OWNER_LOGIN: "/v1/seller/login",
    SELLER_ROLES: "roles",
    ROLES_FOR_STORE_OWNER: "v1/roles-status-update",
    PERMISSIONS_FOR_STORE_OWNER: "v1/seller/permissions-for-store-owner",
    SEND_VERIFICATION_EMAIL: "v1/seller/send-verification-email",
    RESEND_VERIFICATION_EMAIL: "v1/seller/resend-verification-email",
    VERIFY_TOKEN_BY_EMAIL: "v1/seller/verify-email",
    // product attribute
    ATTRIBUTE_LIST: "v1/seller/store/attribute/list",
    ATTRIBUTE_ADD: "v1/seller/store/attribute/add",
    ATTRIBUTE_UPDATE: "v1/seller/store/attribute/update",
    ATTRIBUTE_EDIT: "v1/seller/store/attribute/details",
    ATTRIBUTE_REMOVE: "v1/seller/store/attribute/remove",
    ATTRIBUTE_STATUS_CHANGE: "v1/seller/store/attribute/status",
    // Product Author
    AUTHOR_LIST: "v1/seller/store/product/author/list",
    AUTHOR_STATUS: "v1/seller/store/product/author/status",
    AUTHOR_SAVE: "v1/seller/store/product/author/add",
    AUTHOR_UPDATE: "v1/seller/store/product/author/update",
    AUTHOR_EDIT: "v1/seller/store/product/author/details",
    AUTHOR_REMOVE: "v1/seller/store/product/author/remove",
    COUPON_LIST: "v1/seller/product/coupon/list",
    COUPON_SAVE: "v1/seller/product/coupon/add",
    COUPON_UPDATE: "v1/seller/product/coupon/update",
    COUPON_EDIT: "v1/seller/product/coupon/details",
    COUPON_DELETE: "v1/seller/product/coupon/remove",
    // seller store
    SELLER_STORE_LIST: "v1/seller/store/list",
    SELLER_STORE_ADD: "v1/seller/store/add",
    SELLER_STORE_EDIT: "v1/seller/store/details",
    SELLER_STORE_UPDATE: "v1/seller/store/update",
    STORE_DROPDOWN_LIST: "v1/seller/store-fetch-list",
    STORE_DASHBOARD: "v1/seller/store/dashboard",
    // seller business plan
    BUSINESS_PLAN_DETAILS_LIST: "v1/seller/store/settings/business-plan",
    COMMISSION_SETTINGS: "v1/seller/store/get-commission-settings",
    BUSINESS_PLAN_HISTORY_LIST: "v1/seller/store/subscription/package/history",
    PAYMENT_STATUS_UPDATE: "v1/subscription/package/payment-status-update",
    PACKAGE_RENEW: "v1/subscription/package/renew",
    BUY_PACKAGE: "v1/subscription/package/buy",
    BUSINESS_PLAN_CHANGE: "v1/seller/store/settings/business-plan-change",
    GENERATE_BUSINESS_PLAN_HMAC: "v1/subscription/package/generate-hmac",
    // seller wallet
    WALLET_LIST: "v1/seller/store/financial/wallet",
    WALLET_AMOUNT_DEPOSIT: "v1/seller/store/financial/wallet/deposit",
    WALLET_TRANSACTIONS: "v1/seller/store/financial/wallet/transactions",
    WALLET_STATUS_UPDATE: "v1/wallet/payment-status-update",
    GENERATE_WALLET_HMAC: "v1/wallet/generate-hmac",
    // Seller Staff
    STAFF_ADD: "v1/seller/store/staff/add",
    STAFF_LIST: "v1/seller/store/staff/list",
    STAFF_EDIT: "v1/seller/store/staff/details",
    STAFF_UPDATE: "v1/seller/store/staff/update",
    STAFF_STATUS: "v1/seller/store/staff/change-status",
    STAFF_REMOVE: "v1/seller/store/staff/remove",
    STAFF_PASSWORD_CHANGE: "v1/seller/store/staff/change-password",
    // seller product manage
    PRODUCT_ADD: "v1/seller/store/product/add",
    PRODUCT_LIST: "v1/seller/store/product/list",
    PRODUCT_EDIT: "v1/seller/store/product/details",
    PRODUCT_UPDATE: "v1/seller/store/product/update",
    PRODUCT_REMOVE: "v1/seller/store/product/remove",
    PRODUCT_FEATURE_MAKE: "v1/seller/store/product/add-to-featured",
    PRODUCT_DESCRIPTION_GENERATE: "v1/seller/generate/content",
    PRODUCT_DYNAMIC_FIELD: "v1/seller/store/dynamic-fields",
    STOCK_REPORT_LIST: "v1/seller/store/product/stock-report",
    PRODUCT_ATTRIBUTE: "v1/seller/attributes/type-wise",
    INVENTORY_LIST: "v1/seller/store/product/inventory",
    EXPORT: "v1/seller/store/product/export",
    IMPORT: "v1/seller/store/product/import",
    // order
    SELLER_ORDER_LIST: "v1/seller/store/orders",
    SELLER_ORDER_STATUS_UPDATE: "v1/seller/store/orders/change-order-status",
    SELLER_ORDER_INVOICE: "v1/seller/store/orders/invoice",
    SELLER_ORDER_CANCEL: "v1/seller/store/orders/cancel-order",
    REVIEWS_LIST: "v1/seller/store/feedback-control/review",
    REVIEWS_APPROVE: "v1/seller/store/feedback-control/review/approve",
    REVIEWS_REJECT: "v1/seller/store/feedback-control/review/reject",
    REVIEWS_DELETE: "v1/seller/store/feedback-control/review/remove",
    QUESTIONS_LIST: "v1/seller/store/feedback-control/questions",
    QUESTIONS_APPROVE: "v1/seller/store/feedback-control/questions/approve",
    QUESTIONS_REJECT: "v1/seller/store/feedback-control/questions/reject",
    QUESTIONS_STATUS_CHANGE: "v1/seller/store/feedback-control/questions/change-status",
    QUESTIONS_DELETE: "v1/seller/store/feedback-control/questions/remove",
    QUESTIONS_REPLY: "v1/seller/store/feedback-control/questions/reply",
    SUPPORT_TICKET_LIST: "v1/seller/store/support-ticket/list",
    SUPPORT_TICKET_EDIT: "v1/seller/store/support-ticket/details",
    SUPPORT_TICKET_DETAILS: "v1/seller/store/support-ticket/get-ticket-messages",
    SUPPORT_TICKET_ADD: "v1/seller/store/support-ticket/add",
    SUPPORT_TICKET_UPDATE: "v1/seller/store/support-ticket/update",
    SUPPORT_TICKET_ADD_MESSAGE: "v1/seller/store/support-ticket/message/add",
    SUPPORT_TICKET_REPLY_MESSAGE: "v1/seller/store/support-ticket/message/add",
    SUPPORT_TICKET_RESOLVE: "v1/seller/store/support-ticket/resolve",
    SUPPORT_TICKET_PRIORITY_CHANGE: "v1/seller/store/support-ticket/change-priority-status",
    WITHDRAW_REQUEST_LIST: "v1/seller/store/financial/withdraw",
    WITHDRAW_REQUEST_ADD: "v1/seller/store/financial/withdraw/withdraw-request",
    WITHDRAW_REQUEST_DETAILS: "v1/seller/store/financial/withdraw/details",
    WITHDRAW_METHOD_DROPDOWN: "v1/withdraw/gateway-method-list",
    WITHDRAW_SETTINGS: "v1/seller/store/financial/withdraw/settings",
    WITHDRAW_METHOD_LIST: "v1/seller/store/financial/withdraw/gateway-list",
    WITHDRAW_METHOD_ADD: "v1/seller/store/financial/withdraw/gateway-add",
    WITHDRAW_METHOD_EDIT: "v1/seller/store/financial/withdraw/gateway-details",
    WITHDRAW_METHOD_UPDATE: "v1/seller/store/financial/withdraw/gateway-update",
    WITHDRAW_METHOD_DELETE: "v1/seller/store/financial/withdraw/gateway-delete",
    WITHDRAW_METHOD_STATUS_CHANGE: "v1/seller/store/financial/withdraw/gateway-change-status",
    REFUND_REQUEST_LIST: "v1/seller/store/orders/refund-request",
    REFUND_REQUEST_STATUS_CHANGE: "v1/seller/store/orders/refund-request/handle",
    REFUND_REASON_LIST: "v1/orders/refund-reason-list",
    FLASH_DEALS_ACTIVE_LIST: "v1/seller/store/promotional/flash-deals/active-deals",
    FLASH_DEALS_MY_LIST: "v1/seller/store/promotional/flash-deals/my-deals",
    FLASH_DEALS_JOIN_STORE: "v1/seller/store/promotional/flash-deals/join-deals",
    SELLER_DASHBOARD_LIST: "v1/seller/dashboard",
    SELLER_SALES_LIST: "v1/seller/dashboard/sales-summary",
    SELLER_ORDER_GROWTH_LIST: "v1/seller/dashboard/order-growth-summary",
    SELLER_OTHER_SUMMARY_LIST: "v1/seller/dashboard/other-summary",
    CONTACT_US: "contact-us",
    NOTICES_LIST: "v1/seller/store-notices/list",
    NOTICES_DETAILS: "v1/seller/store-notices/details",
    SELLER_NOTIFICATIONS_ADD: "v1/seller/store/notifications",
    SELLER_NOTIFICATIONS_READ: "v1/seller/store/notifications/read",
    SELLER_NOTIFICATIONS_REMOVE: "v1/admin/notifications/remove",
    CHAT_SETTINGS: "v1/admin/chat/settings",
    LIVE_CHAT_LIST: "v1/seller/store/chat/list",
    CHAT_DETAILS: "v1/seller/store/chat/messages-details",
    REPLY_MESSAGE: "v1/seller/store/chat/send",
    POS_PRODUCT_LIST: "v1/seller/store/pos/products",
    POS_PRODUCT_DETAILS: "v1/seller/store/pos/products",
    POS_CUSTOMER_STORE: "v1/seller/store/pos/add-customer",
    POS_CUSTOMER_LIST: "v1/seller/store/pos/customers",
    COUPON_CHECK: "v1/check-coupon",
    POS_PLACE_ORDER: "v1/seller/store/pos/checkout",
    POS_INVOICE: "v1/seller/store/pos/invoice",
    POS_CATEGORY: "v1/product-category/list",
    POS_SETTINGS: "v1/seller/store/pos/settings",
    POS_ORDER_LIST: "v1/seller/store/pos/orders",
    POS_ORDER_DETAILS: "v1/seller/store/pos/orders"
};
}),
"[project]/src/lib/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_COOKIE_OPTIONS",
    ()=>AUTH_COOKIE_OPTIONS,
    "AUTH_CRED",
    ()=>AUTH_CRED,
    "AUTH_TOKEN_KEY",
    ()=>AUTH_TOKEN_KEY,
    "AUTH_USER",
    ()=>AUTH_USER,
    "PERMISSIONS",
    ()=>PERMISSIONS,
    "STAFF",
    ()=>STAFF,
    "STORE_OWNER",
    ()=>STORE_OWNER,
    "SUPER_ADMIN",
    ()=>SUPER_ADMIN,
    "TOKEN",
    ()=>TOKEN
]);
const isSecureContext = ("TURBOPACK compile-time value", "undefined") !== "undefined" && window.location.protocol === "https:";
const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER = "auth_user";
const AUTH_CRED = "AUTH_CRED_SHOP";
const SUPER_ADMIN = "super_admin";
const STORE_OWNER = "store_owner";
const STAFF = "staff";
const TOKEN = "token";
const PERMISSIONS = "permissions";
const AUTH_COOKIE_OPTIONS = {
    sameSite: "strict",
    secure: isSecureContext,
    path: "/"
};
}),
"[project]/src/lib/auth-utils.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminAndOwnerOnly",
    ()=>adminAndOwnerOnly,
    "adminOnly",
    ()=>adminOnly,
    "adminOwnerAndStaffOnly",
    ()=>adminOwnerAndStaffOnly,
    "allowedRoles",
    ()=>allowedRoles,
    "getAuthCredentials",
    ()=>getAuthCredentials,
    "hasAccess",
    ()=>hasAccess,
    "isAuthenticated",
    ()=>isAuthenticated,
    "ownerAndStaffOnly",
    ()=>ownerAndStaffOnly,
    "ownerOnly",
    ()=>ownerOnly,
    "parseSSRCookie",
    ()=>parseSSRCookie,
    "setAuthCredentials",
    ()=>setAuthCredentials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/cookie/dist/index.js [app-ssr] (ecmascript)");
;
;
;
const allowedRoles = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPER_ADMIN"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORE_OWNER"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STAFF"]
];
const adminAndOwnerOnly = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPER_ADMIN"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORE_OWNER"]
];
const adminOwnerAndStaffOnly = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPER_ADMIN"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORE_OWNER"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STAFF"]
];
const adminOnly = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUPER_ADMIN"]
];
const ownerOnly = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORE_OWNER"]
];
const ownerAndStaffOnly = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORE_OWNER"],
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STAFF"]
];
function setAuthCredentials(token, permissions) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CRED"], JSON.stringify({
        token,
        permissions
    }));
}
function getAuthCredentials(context) {
    let authCred;
    if (context) {
        // Use parseSSRCookie to extract cookies in SSR
        authCred = parseSSRCookie(context)[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CRED"]];
    } else {
        // Use js-cookie to get cookies in client-side
        authCred = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_CRED"]);
    }
    // Ensure authCred is a string before parsing it
    if (typeof authCred === "string") {
        return JSON.parse(authCred);
    }
    // Default return when authCred is not valid
    return {
        token: null,
        permissions: null,
        role: null
    };
}
function parseSSRCookie(context) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cookie$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parse"])(context.req.headers.cookie ?? '');
}
function hasAccess(_allowedRoles, _userPermissions) {
    if (_userPermissions) {
        return Boolean(_allowedRoles?.find((aRole)=>_userPermissions.includes(aRole)));
    }
    return false;
}
function isAuthenticated(_cookies) {
    return !!_cookies[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOKEN"]] && Array.isArray(_cookies[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PERMISSIONS"]]) && !!_cookies[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PERMISSIONS"]].length;
}
}),
"[project]/src/lib/authorization-atom.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorizationAtom",
    ()=>authorizationAtom,
    "checkIsLoggedIn",
    ()=>checkIsLoggedIn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jotai/esm/vanilla.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
;
;
;
function checkIsLoggedIn() {
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
    if (!token) return false;
    return true;
}
const authorizationAtom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(checkIsLoggedIn());
}),
"[project]/src/lib/use-token.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useToken",
    ()=>useToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-ssr] (ecmascript)");
;
;
function useToken() {
    return {
        setToken: (token)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"], token, {
                expires: 1
            });
        },
        getToken: ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
        },
        removeToken: ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
        },
        hasToken: ()=>{
            const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AUTH_TOKEN_KEY"]);
            return !!token;
        }
    };
}
}),
"[project]/src/lib/localized-path.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withLocale",
    ()=>withLocale
]);
function withLocale(locale, path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${normalizedPath}`;
}
}),
"[project]/src/lib/language.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 *
 * IMPORTANT:
 * - For each locale listed here, a corresponding JSON translation file
 *   must exist in the `/public/locales` directory (e.g., `en.json`, `ar.json`, `bn.json`).
 * - If a locale is added here without a corresponding JSON file,
 *   fallback behavior should be handled to avoid runtime issues.
 *
 * Example:
 *   Adding "de" to this list requires creating `/public/locales/de.json`.
 *
 **/ __turbopack_context__.s([
    "availableLocales",
    ()=>availableLocales,
    "getLanguageName",
    ()=>getLanguageName
]);
const availableLocales = [
    "pt-BR",
    "en",
    "ar",
    "es"
];
function getLanguageName(locale) {
    switch(locale){
        case "en":
            return "English";
        case "ar":
            return "Arabic";
        case "es":
            return "Spanish";
        case "pt-BR":
            return "Portuguese (Brazil)";
        default:
            return locale.toUpperCase();
    }
}
}),
"[project]/src/lib/firebase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClientMessaging",
    ()=>getClientMessaging
]);
// lib/firebase.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$messaging$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/messaging/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", ""),
    authDomain: ("TURBOPACK compile-time value", ""),
    projectId: ("TURBOPACK compile-time value", ""),
    storageBucket: ("TURBOPACK compile-time value", ""),
    messagingSenderId: ("TURBOPACK compile-time value", ""),
    appId: ("TURBOPACK compile-time value", "")
};
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])()[0] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
const getClientMessaging = ()=>{
    if (("TURBOPACK compile-time value", "undefined") !== "undefined" && "serviceWorker" in navigator) //TURBOPACK unreachable
    ;
    return null;
};
}),
"[project]/src/lib/hooks/useFirebaseNotifications.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFirebaseNotifications",
    ()=>useFirebaseNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$messaging$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/messaging/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$messaging$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/messaging/dist/esm/index.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
// hooks/useFirebaseNotifications.ts
"use client";
;
;
;
;
const useFirebaseNotifications = (onNewNotification)=>{
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initFCM = async ()=>{
            try {
                const permission = await Notification.requestPermission();
                if (permission !== "granted") {
                    return;
                }
                const messaging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientMessaging"])();
                if (!messaging) return;
                const swRegistration = await navigator.serviceWorker.ready;
                const fcmToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$messaging$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])(messaging, {
                    vapidKey: ("TURBOPACK compile-time value", ""),
                    serviceWorkerRegistration: swRegistration
                });
                if (fcmToken) {
                    setToken(fcmToken);
                } else {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to retrieve FCM token.");
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$messaging$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onMessage"])(messaging, (payload)=>{
                    const title = payload.notification?.title ?? "New Notification";
                    const body = payload.notification?.body ?? "";
                    const data = payload.data ?? {};
                    setNotifications((prev)=>[
                            ...prev,
                            {
                                title,
                                body,
                                data
                            }
                        ]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`${title}: ${body}`);
                    if (onNewNotification) onNewNotification();
                });
            } catch (error) {} finally{
                setLoading(false);
            }
        };
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        onNewNotification
    ]);
    return {
        token,
        notifications,
        loading
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
"[project]/src/env.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@t3-oss/env-nextjs/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
;
;
const env = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEnv"])({
    server: {
        NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "development",
            "test",
            "production"
        ]).default("development")
    },
    client: {
        NEXT_PUBLIC_REST_API_ENDPOINT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url(),
        NEXT_PUBLIC_ADMIN_FRONT_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()
    },
    runtimeEnv: {
        NODE_ENV: ("TURBOPACK compile-time value", "development"),
        NEXT_PUBLIC_REST_API_ENDPOINT: ("TURBOPACK compile-time value", "http://127.0.0.1:8000/api"),
        NEXT_PUBLIC_ADMIN_FRONT_URL: ("TURBOPACK compile-time value", "http://127.0.0.1:3000")
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true
});
}),
"[project]/src/redux/hooks/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppDispatch",
    ()=>useAppDispatch,
    "useAppSelector",
    ()=>useAppSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
;
const useAppDispatch = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"];
const useAppSelector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"];
}),
"[project]/src/routing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link,
    "getPathname",
    ()=>getPathname,
    "redirect",
    ()=>redirect,
    "routing",
    ()=>routing,
    "usePathname",
    ()=>usePathname,
    "useRouter",
    ()=>useRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$client$2f$createNavigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/navigation/react-client/createNavigation.js [app-ssr] (ecmascript) <export default as createNavigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [app-ssr] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$language$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/language.ts [app-ssr] (ecmascript)");
;
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$language$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["availableLocales"],
    defaultLocale: "pt-BR",
    localePrefix: "always",
    pathnames: {
        "/": "/",
        "/client": "/client",
        "/about": "/about",
        "/client/redirect": "/client/redirect",
        "/nested": {
            en: "/nested",
            ar: "/verschachtelt"
        },
        "/redirect": "/redirect",
        "/news/[articleId]": {
            en: "/news/[articleId]",
            ar: "/neuigkeiten/[articleId]"
        },
        "/news/just-in": {
            en: "/news/just-in",
            ar: "/neuigkeiten/aktuell"
        }
    }
});
const { Link, getPathname, redirect, usePathname, useRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$client$2f$createNavigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
}),
"[project]/src/hooks/use-sidebar-toggle.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSidebarToggle",
    ()=>useSidebarToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useSidebarToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        isOpen: true,
        setIsOpen: ()=>{
            set({
                isOpen: !get().isOpen
            });
        }
    }), {
    name: 'sidebarOpen',
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return undefined;
        }
        //TURBOPACK unreachable
        ;
    })
}));
}),
"[project]/src/hooks/use-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
'use client';
const useStore = (store, callback)=>{
    const slice = store(callback);
    if (slice !== undefined) {
        return slice;
    }
    const storeApi = store;
    if (typeof storeApi.getState === "function") {
        return callback(storeApi.getState());
    }
    return slice;
};
}),
"[project]/src/app/[locale]/seller/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SellerLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$action$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/users/users.action.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-toastify/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$LoaderOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/LoaderOverlay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$MaintenancePage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/molecules/MaintenancePage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/sellerRoutes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-utils.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/authorization-atom.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localized-path.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/use-token.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jotai/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blocks$2f$shared$2f$navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/blocks/shared/navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blocks$2f$shared$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/blocks/shared/sidebar.tsx [app-ssr] (ecmascript)");
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
async function fetchSiteInfo() {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://127.0.0.1:8000/api")}/v1/site-general-info`, {
        cache: "no-store"
    });
    const data = await res.json();
    return data.site_settings;
}
async function fetchMaintenanceInfo() {
    const res = await fetch(`${("TURBOPACK compile-time value", "http://127.0.0.1:8000/api")}/v1/maintenance-page-settings`, {
        cache: "no-store"
    });
    const data = await res.json();
    return data.maintenance_settings;
}
function SellerLayout({ children }) {
    const { me, isPending, error, isAuthorized, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$users$2f$users$2e$action$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMeQuery"])();
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocale"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const dir = locale === "ar" ? "rtl" : "ltr";
    const MeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>me?.data || {}, [
        me?.data
    ]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMaintenance, setShowMaintenance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [maintenanceData, setMaintenanceData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [siteLogo, setSiteLogo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { setToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$use$2d$token$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToken"])();
    const [_, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jotai$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAtom"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$authorization$2d$atom$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorizationAtom"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const token = searchParams.get("token");
        const permissions = searchParams.get("permissions");
        const message = searchParams.get("message");
        const toastKey = "toast_shown";
        if (token && !localStorage.getItem(toastKey)) {
            localStorage.setItem(toastKey, "true");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(message || "User Login Successfully");
            setToken(token);
            setAuthorized(true);
            const parsedPermissions = permissions ? JSON.parse(decodeURIComponent(permissions)) : [];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setAuthCredentials"])(token, parsedPermissions);
            refetch().then(({ data })=>{
                if (data?.full_name && data?.image_url) {
                    localStorage.setItem("user_name", data.full_name);
                    localStorage.setItem("user_image", data.image_url);
                }
                localStorage.setItem("selectedStore", JSON.stringify({
                    id: "",
                    slug: ""
                }));
                router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].dashboard), {
                    scroll: false
                });
            });
        }
    }, [
        searchParams,
        setToken,
        setAuthorized,
        refetch,
        router,
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isPending && !isAuthorized) {
            router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].signin));
            return;
        }
        if (!isPending && isAuthorized && me?.data?.activity_scope !== "store_level") {
            router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].signin));
            return;
        }
        if (MeData?.full_name && MeData?.image_url) {
            localStorage.setItem("user_name", MeData?.full_name);
            localStorage.setItem("user_image", MeData?.image_url);
        }
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(error);
        }
    }, [
        locale,
        isAuthorized,
        me?.data,
        error,
        router,
        isPending,
        MeData?.full_name,
        MeData?.image_url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timeout = setTimeout(()=>{
            if (isPending && !isAuthorized) {
                router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2d$path$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withLocale"])(locale, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$sellerRoutes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SellerRoutes"].signin));
            }
        }, 5000);
        return ()=>clearTimeout(timeout);
    }, [
        isPending,
        isAuthorized,
        router,
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsLoading(false);
    }, [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.body.style.overflow = isLoading ? "hidden" : "auto";
        return ()=>{
            document.body.style.overflow = "auto";
        };
    }, [
        isLoading
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkMaintenance = async ()=>{
            try {
                const siteInfo = await fetchSiteInfo();
                setSiteLogo(siteInfo.com_site_logo);
                if (siteInfo.com_maintenance_mode === "on") {
                    const maintenance = await fetchMaintenanceInfo();
                    const now = new Date();
                    const maintenanceEnd = new Date(maintenance.com_maintenance_end_date);
                    maintenanceEnd.setHours(23, 59, 59, 999);
                    if (maintenanceEnd > now) {
                        setMaintenanceData(maintenance);
                        setShowMaintenance(true);
                    }
                }
            } catch (err) {
                return error;
            }
        };
        checkMaintenance();
    }, [
        error
    ]);
    // if (isPending) {
    //   return <Loader customClass="mt-64" size="large" />;
    // }
    if (showMaintenance && maintenanceData) {
        let EndDate = new Date(maintenanceData.com_maintenance_end_date).setHours(23, 59, 59, 999);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$MaintenancePage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            logo: siteLogo,
            title: maintenanceData.com_maintenance_title,
            description: maintenanceData.com_maintenance_description,
            endDate: EndDate,
            image: maintenanceData.com_maintenance_image
        }, void 0, false, {
            fileName: "[project]/src/app/[locale]/seller/layout.tsx",
            lineNumber: 197,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        dir: dir,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$molecules$2f$LoaderOverlay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isLoading: isLoading
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/seller/layout.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blocks$2f$shared$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sidebar"], {
                setIsLoading: setIsLoading
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/seller/layout.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$blocks$2f$shared$2f$navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {
                setIsLoading: setIsLoading,
                MeData: MeData
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/seller/layout.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col justify-between w-full mx-auto",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/seller/layout.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/[locale]/seller/layout.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_01jf1ji._.js.map