import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import '../../config/colors.dart';
import '../../config/icons.dart';
import '../../config/images.dart';
import '../../config/shared_preference_helper.dart';
import '../../config/strings.dart';
import '../../config/user_shared_preference.dart';
import '../../controller/bloc/all_product_bloc/all_product_bloc.dart';
import '../../controller/bloc/all_product_bloc/all_product_event.dart';
import '../../controller/bloc/currency_bloc/currency_state.dart';
import '../../controller/bloc/currency_list_bloc/currency_list_bloc.dart';
import '../../controller/bloc/currency_list_bloc/currency_list_event.dart';
import '../../controller/bloc/currency_list_bloc/currency_list_state.dart';
import '../../controller/bloc/profile_bloc/profile_bloc.dart';
import '../../controller/bloc/profile_bloc/profile_event.dart';
import '../../controller/bloc/profile_bloc/profile_state.dart';
import '../../controller/provider/all_product_controller.dart';
import '../../controller/provider/cart_controler.dart';
import '../../controller/provider/common_provider.dart';
import '../../controller/provider/currencie_controler.dart';
import '../../controller/provider/delivery_address_controller.dart';
import '../../controller/provider/filter_controller.dart';
import '../../controller/provider/home_screen_provider.dart';
import '../../controller/provider/notification_controller.dart';
import '../../data/data_model/currency_list_model.dart';
import '../../l10n/app_localizations.dart';
import '../auth_screens/email_verification.dart';
import '../checkout/desktop_checkout.dart';
import '../common_widgets/common_card.dart';
import '../common_widgets/common_dropdown.dart';
import '../common_widgets/common_fonfirmation_dialog.dart';
import '../common_widgets/common_funcktion.dart';
import '../common_widgets/person_avater.dart';
import '../desktop_common_widgets/common_search_widget.dart';
import '../home/find_location.dart';
import '../my_card/my_card_screen.dart';
import 'web_menu_and_page.dart';
import '../desktop_home/all_product_screen.dart';
import '../desktop_home/desktop_categories_screen.dart';
import '../desktop_home/desktop_home.dart';

class DesktopTabsHome extends StatefulWidget {
  const DesktopTabsHome({super.key});

  @override
  State<DesktopTabsHome> createState() => _DesktopTabsHomeState();
}

class _DesktopTabsHomeState extends State<DesktopTabsHome> {
  late final CurrencyListBloc _currencyListBloc;
  late final AllProductBloc _allProductBloc;
  late final ProfileBloc _profileBloc;
  String _token = '',
      _emailSettingsOn = "",
      _currencyCode = '',
      _language = '',
      _userLat = '',
      _userLong = '';
  bool _emailVerified = false;
  final FocusNode focusNode = FocusNode();
  @override
  void initState() {
    _allProductBloc = context.read<AllProductBloc>();
    _currencyListBloc = context.read<CurrencyListBloc>();
    _profileBloc = context.read<ProfileBloc>();
    getUserRout();
    super.initState();
  }

  getUserRout() async {
    var token = await UserSharedPreference.getValue(
      SharedPreferenceHelper.token,
    );
    var address = await UserSharedPreference.getValue(
      SharedPreferenceHelper.customerAddress,
    );
    var currencyCode = await UserSharedPreference.getValue(
      SharedPreferenceHelper.currencyCode,
    );
    var emailVeSettings = await UserSharedPreference.getValue(
      SharedPreferenceHelper.emailVerificationSettings,
    );
    var emailVerified = await UserSharedPreference.getBool(
      SharedPreferenceHelper.emailVerified,
    );
    var language = await UserSharedPreference.getValue(
      SharedPreferenceHelper.languageCode,
    );
    var customerLong = await UserSharedPreference.getValue(
      SharedPreferenceHelper.customerLong,
    );
    var customerLat = await UserSharedPreference.getValue(
      SharedPreferenceHelper.customerLat,
    );
    address = await UserSharedPreference.getValue(
            SharedPreferenceHelper.customerAddress) ??
        "";
    getCustomerAddress(address);
    _token = token ?? "";
    _currencyCode = currencyCode ?? "";
    _emailSettingsOn = emailVeSettings ?? "";
    _emailVerified = emailVerified ?? false;
    _language = language ?? "";
    _userLat = customerLat ?? "";
    _userLong = customerLong ?? "";
    checkLogin();
    _currencyListBloc.add(CurrencyList(token: _token));
  }

  checkLogin() {
    var commonCon = Provider.of<CommonProvider>(context, listen: false);
    if (_token.isNotEmpty) {
      commonCon.setLogin(true);
      if (_emailSettingsOn == "on" && _emailVerified) {
        _profileBloc.add(Profile(token: _token));
      }
    }
  }

  putName(String name) async {
    await UserSharedPreference.putValue(
      SharedPreferenceHelper.customerName,
      name,
    );
  }

  getCustomerAddress(String address) {
    Provider.of<DeliveryAddressController>(context, listen: false)
        .setAddress(address);
  }

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool isFirstLoad = true;
  bool isCurrencyLoad = true;
  @override
  Widget build(BuildContext context) {
    final currencyCon = Provider.of<CurrencyController>(context);
    final commonCon = Provider.of<CommonProvider>(context);
    var filterCon = Provider.of<FilterController>(context);
    var dAddressCon = Provider.of<DeliveryAddressController>(context);
    var cardCon = Provider.of<CartProvider>(context);
    final tabType = context.select<HomeScreenProvider, String>(
      (provider) => provider.tabType,
    );
    final currentIndexHomePage = context.select<HomeScreenProvider, int>(
      (provider) => provider.currentIndexHomePage,
    );
    final homeCon = Provider.of<HomeScreenProvider>(context, listen: false);

    var allProduct = Provider.of<AllProductController>(context, listen: false);
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      key: _scaffoldKey,
      endDrawer: const Drawer(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.zero,
        ),
        child: MyCardScreen(),
      ),
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(screenWidth > 980 ? 72 : 64),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border(
              bottom: BorderSide(
                color: const Color(0xFFEAEAEA),
              ),
            ),
          ),
          child: SafeArea(
            bottom: false,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  Image.asset(
                    Images.darkLogo,
                    height: 38,
                    width: 84,
                    fit: BoxFit.contain,
                  ),
                  if (screenWidth > 980) ...[
                    const SizedBox(width: 28),
                    Expanded(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _ChromeHeaderNavItem(
                            label: "INÍCIO",
                            isActive: tabType == "Home",
                            onTap: () => homeCon.setTabType("Home"),
                          ),
                          const SizedBox(width: 26),
                          _ChromeHeaderNavItem(
                            label: "PRODUTOS",
                            isActive: tabType == "Products",
                            onTap: () => homeCon.setTabType("Products"),
                          ),
                          const SizedBox(width: 26),
                          _ChromeHeaderNavItem(
                            label: "CATEGORIAS",
                            isActive: tabType == "Category",
                            onTap: () => homeCon.setTabType("Category"),
                          ),
                          const SizedBox(width: 26),
                          _ChromeHeaderNavItem(
                            label: "OFERTAS",
                            isActive: false,
                            onTap: () => homeCon.setTabType("Home"),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 16),
                    const _ChromeLocalePill(),
                    const SizedBox(width: 10),
                    _ChromeHeaderIconButton(
                      icon: Icons.search,
                      onTap: () => homeCon.setTabType("Products"),
                    ),
                    const SizedBox(width: 6),
                    _ChromeHeaderIconButton(
                      icon: Icons.person_outline,
                      onTap: () {
                        homeCon.setTabType("Menu");
                        homeCon.setMenuName("Contact");
                      },
                    ),
                    const SizedBox(width: 6),
                    _ChromeHeaderIconButton(
                      icon: Icons.shopping_bag_outlined,
                      onTap: () => _scaffoldKey.currentState?.openEndDrawer(),
                    ),
                  ] else ...[
                    const Spacer(),
                    _ChromeHeaderIconButton(
                      icon: Icons.search,
                      onTap: () => homeCon.setTabType("Products"),
                    ),
                    const SizedBox(width: 6),
                    _ChromeHeaderIconButton(
                      icon: Icons.shopping_bag_outlined,
                      onTap: () => _scaffoldKey.currentState?.openEndDrawer(),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
      body: tabType == 'Home'
          ? const DesktopHome()
          : Column(
              children: [
                const SizedBox(height: 6),
                CommonCard(
                  pBottom: 4,
                  pTop: 4,
                  pLeft: 14,
                  pRight: 20,
                  mHorizontal: 0,
                  mVertical: 0,
                  widget: Row(
                    children: [
                      const SizedBox(width: 12),
                      MenuTab(
                        title: AppLocalizations.of(context)!.home,
                        selectedTab: tabType,
                        tabKey: "Home",
                        onTap: () => homeCon.setTabType("Home"),
                      ),
                      const SizedBox(width: 12),
                      MenuTab(
                        title: AppLocalizations.of(context)!.products,
                        selectedTab: tabType,
                        tabKey: "Products",
                        onTap: () => homeCon.setTabType("Products"),
                      ),
                      const SizedBox(width: 12),
                      MenuTab(
                        title: AppLocalizations.of(context)!.category,
                        selectedTab: tabType,
                        tabKey: "Category",
                        onTap: () => homeCon.setTabType("Category"),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: DesktopSearchWidget(
                          onSearch: (value) {
                            filterCon.setProductType("all");
                            _allProductBloc.add(AllProduct(
                                categoryId: const [],
                                search: value.length < 3 ? "" : value,
                                perPage: "10",
                                page: 1,
                                minPrice: "",
                                maxPrice: "",
                                brandId: const [],
                                availability: "",
                                sort: "",
                                type: const [],
                                minRating: "",
                                language: _language,
                                isFeatured: filterCon.isFeatured,
                                bestSelling: filterCon.bestSelling,
                                popularProducts: filterCon.popularProducts,
                                flashSale: filterCon.flashSale,
                                flashSaleId: 0,
                                userLat: _userLat,
                                userLong: _userLong,
                                token: _token));
                            allProduct.allProductClear();
                          },
                          hint: AppLocalizations.of(context)!.searchProductsHere,
                          type: "Products",
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                    child: tabType == 'Products'
                        ? const DesktopProductScreen()
                        : tabType == 'Category'
                            ? const DesktopCategories()
                            : tabType == 'Checkout'
                                ? const WebCheckoutScreens()
                                : tabType == 'Menu'
                                    ? const MenuAndPage()
                                    : const SizedBox()),
              ],
            ),
    );
  }

  setProfileImage(String image) async {
    await UserSharedPreference.putValue(
      SharedPreferenceHelper.profileImage,
      image,
    );
  }

  void _openLocationSearch(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) {
        return const LocationSelectSheet();
      },
    );
  }
}

class _HeaderActionButton extends StatelessWidget {
  const _HeaderActionButton({
    required this.label,
    required this.color,
    required this.onTap,
  });

  final String label;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: color,
      borderRadius: BorderRadius.circular(999),
      child: InkWell(
        borderRadius: BorderRadius.circular(999),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(999),
            boxShadow: [
              BoxShadow(
                color: color.withValues(alpha: 0.2),
                blurRadius: 16,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Text(
            label,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                ),
          ),
        ),
      ),
    );
  }
}

class _ChromeHeaderNavItem extends StatelessWidget {
  const _ChromeHeaderNavItem({
    required this.label,
    required this.isActive,
    required this.onTap,
  });

  final String label;
  final bool isActive;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: Colors.black,
                fontSize: 14,
                letterSpacing: 0.2,
                fontWeight: isActive ? FontWeight.w800 : FontWeight.w500,
                decoration: isActive ? TextDecoration.underline : null,
                decorationThickness: 1.6,
                decorationColor: CustomColors.baseColor,
              ),
        ),
      ),
    );
  }
}

class _ChromeLocalePill extends StatelessWidget {
  const _ChromeLocalePill();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF6F6F6),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: const Color(0xFFE6E6E6)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.public, size: 16, color: Colors.black),
          const SizedBox(width: 6),
          Text(
            'BRL R\$',
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
                  color: Colors.black,
                  fontWeight: FontWeight.w700,
                ),
          ),
          const SizedBox(width: 4),
          const Icon(Icons.keyboard_arrow_down_rounded, size: 18),
        ],
      ),
    );
  }
}

class _ChromeHeaderIconButton extends StatelessWidget {
  const _ChromeHeaderIconButton({
    required this.icon,
    required this.onTap,
  });

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkResponse(
      onTap: onTap,
      radius: 24,
      child: Container(
        width: 40,
        height: 40,
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.transparent,
        ),
        child: Icon(icon, size: 22, color: Colors.black),
      ),
    );
  }
}

class MenuTab extends StatelessWidget {
  final String title;
  final String selectedTab;
  final String tabKey;
  final VoidCallback onTap;
  final Color activeColor;
  final Color inactiveColor;
  final Duration animationDuration;

  const MenuTab({
    super.key,
    required this.title,
    required this.selectedTab,
    required this.tabKey,
    required this.onTap,
    this.activeColor = Colors.red,
    this.inactiveColor = Colors.black,
    this.animationDuration = const Duration(milliseconds: 300),
  });

  @override
  Widget build(BuildContext context) {
    bool isSelected = selectedTab == tabKey;

    return InkWell(
      onTap: onTap,
      child: AnimatedDefaultTextStyle(
        duration: animationDuration,
        style: Theme.of(context).textTheme.displayLarge!.copyWith(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: isSelected ? activeColor : null,
            ),
        child: Text(title),
      ),
    );
  }
}
