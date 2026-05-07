// ignore_for_file: file_names

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:quick_ecommerce/router/route_name.dart';
import 'package:quick_ecommerce/screens/auth_screens/email_verification.dart';
import 'package:quick_ecommerce/screens/live_chat/user_list.dart';
import 'package:quick_ecommerce/screens/my_wallet/diposit_screen.dart';

import '../data/data_model/order_details_model.dart';
import '../screens/auth_screens/forget_password_screen.dart';
import '../screens/auth_screens/login_screen.dart';
import '../screens/auth_screens/set_password_screen.dart';
import '../screens/auth_screens/sinup_screen.dart';
import '../screens/auth_screens/splash_screen.dart';
import '../screens/auth_screens/successfully.dart';
import '../screens/dev/preview_catalog_screen.dart';
import '../screens/web_ui/desktop_tabs_home.dart';
import '../screens/desktop_item_details/item_details_screen.dart';
import '../screens/favorites/favorites_list.dart';
import '../screens/delivery_address/add_delivery_address.dart';
import '../screens/checkout/checkout_screen.dart';
import '../screens/item_details/item_details_screen.dart';
import '../screens/delivery_address/shipping_address_list.dart';
import '../screens/main_screens/home_screen.dart';
import '../screens/my_orders/track_order_screen.dart';
import '../screens/notification/notification_screen.dart';
import '../screens/profile/change_email.dart';
import '../screens/language/language.dart';
import '../screens/profile/password_change.dart';
import '../screens/profile/profile_edite.dart';
import '../screens/settings/contact_us.dart';
import '../screens/settings/deactivate_account.dart';
import '../screens/my_wallet/my_wallet.dart';
import '../screens/settings/privacy_policy.dart';
import '../screens/settings/settings_screens.dart';
import '../screens/settings/support_ticket_add.dart';
import '../screens/settings/support_ticket_screen.dart';
import '../screens/settings/terms_and_condition.dart';
import '../screens/store_info/sore_details_screen.dart';
import '../screens/store_info/sore_details_web.dart';
import '../screens/web_ui/web_auth/web_login.dart';
import '../screens/web_ui/web_menu_and_page.dart';

class AppRoutes {
  static Map<String, dynamic> _extraMap(GoRouterState state) =>
      state.extra as Map<String, dynamic>? ?? {};

  static Map<String, String> _queryMap(GoRouterState state) =>
      state.uri.queryParameters;

  static String _stringValue(
    Map<String, dynamic> extra,
    Map<String, String> query,
    String key, {
    String defaultValue = '',
  }) {
    final value = extra[key];
    if (value != null) {
      return value.toString();
    }

    return query[key] ?? defaultValue;
  }

  static int _intValue(
    Map<String, dynamic> extra,
    Map<String, String> query,
    String key, {
    int defaultValue = 0,
  }) {
    final value = extra[key];
    if (value is int) {
      return value;
    }

    if (value != null) {
      return int.tryParse(value.toString()) ?? defaultValue;
    }

    return int.tryParse(query[key] ?? '') ?? defaultValue;
  }

  static double _doubleValue(
    Map<String, dynamic> extra,
    Map<String, String> query,
    String key, {
    double defaultValue = 0,
  }) {
    final value = extra[key];
    if (value is double) {
      return value;
    }

    if (value is int) {
      return value.toDouble();
    }

    if (value != null) {
      return double.tryParse(value.toString()) ?? defaultValue;
    }

    return double.tryParse(query[key] ?? '') ?? defaultValue;
  }

  static bool _boolValue(
    Map<String, dynamic> extra,
    Map<String, String> query,
    String key, {
    bool defaultValue = false,
  }) {
    final value = extra[key];
    if (value is bool) {
      return value;
    }

    if (value != null) {
      return value.toString().toLowerCase() == 'true';
    }

    final queryValue = query[key];
    if (queryValue == null) {
      return defaultValue;
    }

    return queryValue.toLowerCase() == 'true';
  }

  static List<int> _intListValue(
    Map<String, dynamic> extra,
    Map<String, String> query,
    String key, {
    List<int> defaultValue = const [],
  }) {
    final value = extra[key];
    if (value is List<int>) {
      return value;
    }

    if (value is List) {
      return value.map((item) => int.tryParse(item.toString()) ?? 0).toList();
    }

    final raw = query[key];
    if (raw == null || raw.trim().isEmpty) {
      return defaultValue;
    }

    return raw
        .split(',')
        .map((item) => int.tryParse(item.trim()) ?? 0)
        .where((item) => item > 0)
        .toList();
  }

  static final router = GoRouter(
    initialLocation: kIsWeb ? '/previewCatalog' : '/',
    routes: [
    //========= initialized all routes here =========
    //-----------------------------------------------

    GoRoute(
      name: 'previewCatalog',
      path: '/previewCatalog',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const PreviewCatalogScreen(),
        );
      },
    ),

    GoRoute(
      name: RouteNames.splashPage,
      path: '/',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const SplashScreen(),
        );
      },
    ),

    GoRoute(
      name: RouteNames.registration,
      path: '/registration',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const SinUpScreen(),
        );
      },
    ),

    GoRoute(
      name: RouteNames.loginScreen,
      path: '/loginPage',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const LoginScreen(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.webLogin,
      path: '/webLogin',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const WebLogin(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.emailVerification,
      path: '/email_verification',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const EmailVerification(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.addDeliveryAddress,
      path: '/addDeliveryAddress',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);

        // Retrieve optional parameters with default values
        final String id = _stringValue(extraParams, queryParams, 'id');
        final String title = _stringValue(extraParams, queryParams, 'title');
        final String type = _stringValue(extraParams, queryParams, 'type');
        final String email = _stringValue(extraParams, queryParams, 'email');
        final String contactNumber = _stringValue(
          extraParams,
          queryParams,
          'contactNumber',
        );
        final String countryCode = _stringValue(
          extraParams,
          queryParams,
          'country_code',
        );
        final String address = _stringValue(extraParams, queryParams, 'address');
        final String lat = _stringValue(extraParams, queryParams, 'lat');
        final String long = _stringValue(extraParams, queryParams, 'long');
        final int area = _intValue(extraParams, queryParams, 'area');
        final String road = _stringValue(extraParams, queryParams, 'road');
        final String house = _stringValue(extraParams, queryParams, 'house');
        final String floor = _stringValue(extraParams, queryParams, 'floor');
        final String postalCode = _stringValue(
          extraParams,
          queryParams,
          'postalCode',
        );
        final bool isDefault = _boolValue(
          extraParams,
          queryParams,
          'isDefault',
        );
        final String status = _stringValue(extraParams, queryParams, 'status');

        // Pass the retrieved values to the `AddDeliveryAddress` widget
        return AddDeliveryAddress(
          id: id,
          title: title,
          type: type,
          email: email,
          contactNumber: contactNumber,
          countryCode: countryCode,
          address: address,
          lat: lat,
          long: long,
          area: area,
          road: road,
          house: house,
          floor: floor,
          postalCode: postalCode,
          isDefault: isDefault,
          status: status,
        );
      },
    ),


    GoRoute(
      name: RouteNames.supportTicketAdd,
      path: '/supportTicketAdd',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final String id = _stringValue(extraParams, queryParams, 'id');
        final String title = _stringValue(extraParams, queryParams, 'title');
        final String subject = _stringValue(
          extraParams,
          queryParams,
          'subject',
        );
        final bool edit = _boolValue(extraParams, queryParams, 'edit');
        return SupportTicketAdd(
          id:id ,
          title: title,
          subject:subject ,
          edit: edit,
        );
      },
    ),
    GoRoute(
      name: RouteNames.changeEmail,
      path: '/changeEmail',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const ChangeEmail(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.chatListPage,
      path: '/chatListPage',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const ChatListPage(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.passwordChange,
      path: '/passwordChange',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const PasswordChange(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.deactivateAccount,
      path: '/deactivateAccount',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const DeactivateAccount(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.supportTicketListScreen,
      path: '/supportTicketListScreen',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const SupportTicketListScreen(),
        );
      },
    ),

    GoRoute(
      name: RouteNames.checkoutScreens,
      path: '/checkoutScreens',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final List<int> productIds = _intListValue(
          extraParams,
          queryParams,
          'product_ids',
          defaultValue: const [1, 2],
        );
        return CheckoutScreens(
          productIds: productIds,

        );
      },
    ),

    GoRoute(
      name: RouteNames.homeScreen,
      path: '/homeScreen',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const HomeScreen(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.webHomeScreen,
      path: '/webHomeScreen',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const DesktopTabsHome(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.menuAndPage,
      path: '/menuAndPage',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const MenuAndPage(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.forgetPassword,
      path: '/forgetPassword',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const ForgetPasswordScreen(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.successfullyScreen,
      path: '/successfullyScreen',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const SuccessfullyScreen(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.favoritesListScreen,
      path: '/favoritesListScreen',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const FavoritesListScreen(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.myWallet,
      path: '/myWallet',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const MyWallet(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.notificationScreen,
      path: '/notificationScreen',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const NotificationScreen(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.settingsScreens,
      path: '/settingsScreens',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const SettingsScreens(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.languageSelectionScreen,
      path: '/languageSelectionScreen',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const LanguageSelectionScreen(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.termsAndCondition,
      path: '/termsAndCondition',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const TermsAndCondition(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.privacyPolicy,
      path: '/privacyPolicy',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const PrivacyPolicy(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.contactUs,
      path: '/contactUs',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const ContactUs(),
        );
      },
    ),


    GoRoute(
      name: RouteNames.storeDetailScreen,
      path: '/storeDetailScreen',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final String slug = _stringValue(
          extraParams,
          queryParams,
          'slug',
          defaultValue: 'preview-store',
        );
        return StoreDetailScreen(
          slug: slug,
        );
      },
    ),
    GoRoute(
      name: RouteNames.storeDetailWeb,
      path: '/storeDetailWeb',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final String slug = _stringValue(
          extraParams,
          queryParams,
          'slug',
          defaultValue: 'preview-store',
        );
        return StoreDetailWeb(
          slug: slug,
        );
      },
    ),
    GoRoute(
      name: RouteNames.shippingAddressList,
      path: '/shippingAddressList',
      pageBuilder: (context, state) {
        return MaterialPage(
          key: state.pageKey,
          child: const ShippingAddressList(),
        );
      },
    ),
    GoRoute(
      name: RouteNames.trackOrderScreen,
      path: '/trackOrderScreen',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final String orderId = _stringValue(
          extraParams,
          queryParams,
          'order_id',
          defaultValue: 'PREVIEW-001',
        );
        final String orderStatus = _stringValue(
          extraParams,
          queryParams,
          'order_status',
          defaultValue: 'processing',
        );
        final double storeLat = _doubleValue(
          extraParams,
          queryParams,
          'store_lat',
          defaultValue: -23.5505,
        );
        final double storeLong = _doubleValue(
          extraParams,
          queryParams,
          'store_long',
          defaultValue: -46.6333,
        );
        final List<OrderTracking> orderTracking =
            extraParams['order_tracking'] as List<OrderTracking>? ??
                [
                  OrderTracking(
                    label: 'Order placed',
                    status: 'completed',
                    createdAt: 'Preview',
                  ),
                  OrderTracking(
                    label: 'Processing',
                    status: 'current',
                    createdAt: 'Preview',
                  ),
                ];
        return TrackOrderScreen(
          orderId: orderId,
          orderStatus: orderStatus,
          storeLat:storeLat ,
          storeLong: storeLong,
          orderTracking:orderTracking,
        );
      },
    ),
    GoRoute(
      name: RouteNames.profileEdite,
      path: '/profileEdite',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final String firstName = _stringValue(
          extraParams,
          queryParams,
          'first_name',
          defaultValue: 'Preview',
        );
        final String lastName = _stringValue(
          extraParams,
          queryParams,
          'last_name',
          defaultValue: 'User',
        );
        final String phone = _stringValue(
          extraParams,
          queryParams,
          'phone',
          defaultValue: '+5511999999999',
        );
        final String countryCode = _stringValue(
          extraParams,
          queryParams,
          'country_code',
          defaultValue: 'BR',
        );
        final String birthday = _stringValue(
          extraParams,
          queryParams,
          'birthday',
          defaultValue: '1995-01-01',
        );
        return ProfileEdite(
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          countryCode: countryCode,
          birthday:birthday,
        );
      },
    ),
    GoRoute(
      name: RouteNames.productDisplay,
      path: '/productDisplay',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final String slug = _stringValue(
          extraParams,
          queryParams,
          'slug',
          defaultValue: 'preview-product',
        );
        return ProductDisplay(
          slug: slug,

        );
      },
    ),
    GoRoute(
      name: RouteNames.desktopProductDisplay,
      path: '/desktopProductDisplay',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final String slug = _stringValue(
          extraParams,
          queryParams,
          'slug',
          defaultValue: 'preview-product',
        );
        return DesktopProductDisplay(
          slug: slug,

        );
      },
    ),
       GoRoute(
          name: RouteNames.depositScreen,
          path: '/depositScreen',
          builder: (context, state) {
                    final extraParams = _extraMap(state);
                    final queryParams = _queryMap(state);
                    final int walletId = _intValue(
                      extraParams,
                      queryParams,
                      'wallet_id',
                      defaultValue: 1,
                    );
                    final String maxDepositAmount = _stringValue(
                      extraParams,
                      queryParams,
                      'max_deposit_amount',
                      defaultValue: '500.00',
                    );
            return DepositScreen(
              walletId: walletId,
              maxDepositAmount: maxDepositAmount,

            );
          },
        ),
    GoRoute(
      name: RouteNames.setPasswordScreen,
      path: '/setPasswordScreen',
      builder: (context, state) {
        final extraParams = _extraMap(state);
        final queryParams = _queryMap(state);
        final email = _stringValue(
          extraParams,
          queryParams,
          'email',
          defaultValue: 'preview@example.com',
        );
        final token = _stringValue(
          extraParams,
          queryParams,
          'token',
          defaultValue: '123456',
        );
        return SetPasswordScreen(
          email: email,
          token: token,
        );
      },
    ),
    ],
  );
}
