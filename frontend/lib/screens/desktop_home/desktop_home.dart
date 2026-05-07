import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/config/strings.dart';
import '../../config/colors.dart';
import '../../config/images.dart';
import 'package:quick_ecommerce/controller/bloc/new_arrivals_bloc/new_arrival_bloc.dart';
import 'package:quick_ecommerce/controller/bloc/new_arrivals_bloc/new_arrival_event.dart';
import 'package:quick_ecommerce/controller/bloc/new_arrivals_bloc/new_arrival_state.dart';
import 'package:quick_ecommerce/controller/bloc/categories_bloc/categories_bloc.dart';
import 'package:quick_ecommerce/controller/bloc/categories_bloc/categories_event.dart';
import 'package:quick_ecommerce/controller/bloc/categories_bloc/categories_state.dart';
import 'package:quick_ecommerce/controller/bloc/currency_list_bloc/currency_list_bloc.dart';
import 'package:quick_ecommerce/controller/bloc/currency_list_bloc/currency_list_event.dart';
import 'package:quick_ecommerce/controller/bloc/home_title_bloc/home_title_event.dart';
import 'package:quick_ecommerce/controller/bloc/payment_gateways_bloc/payment_gateways_bloc.dart';
import 'package:quick_ecommerce/controller/bloc/payment_gateways_bloc/payment_gateways_event.dart';
import 'package:quick_ecommerce/controller/bloc/payment_gateways_bloc/payment_gateways_state.dart';
import 'package:quick_ecommerce/controller/bloc/slider_list_bloc/slider_list_event.dart';
import 'package:quick_ecommerce/controller/bloc/slider_list_bloc/slider_list_state.dart';
import 'package:quick_ecommerce/controller/provider/currencie_controler.dart';
import 'package:quick_ecommerce/controller/provider/payment_option_controller.dart';
import 'package:quick_ecommerce/screens/common_widgets/common_card.dart';

import '../../config/shared_preference_helper.dart';

import '../../config/user_shared_preference.dart';
import '../../controller/bloc/currency_bloc/currency_bloc.dart';
import '../../controller/bloc/currency_bloc/currency_event.dart';
import '../../controller/bloc/currency_bloc/currency_state.dart';
import '../../controller/bloc/home_title_bloc/home_title_bloc.dart';
import '../../controller/bloc/profile_bloc/profile_bloc.dart';
import '../../controller/bloc/profile_bloc/profile_event.dart';
import '../../controller/bloc/slider_list_bloc/slider_list_bloc.dart';
import '../../controller/provider/all_product_controller.dart';
import '../../controller/provider/filter_controller.dart';
import '../../controller/provider/common_provider.dart';
import '../../controller/provider/delivery_address_controller.dart';
import '../../controller/provider/home_screen_provider.dart';
import '../../data/data_model/all_product_model.dart';
import '../../router/route_name.dart';
import '../../l10n/app_localizations.dart';
import '../common_widgets/common_funcktion.dart';
import '../home/item_card.dart';
import 'best_selling_widget.dart';
import 'item_card.dart';
import 'popular_products.dart';

class DesktopHome extends StatefulWidget {
  const DesktopHome({super.key});

  @override
  State<DesktopHome> createState() => _DesktopHomeState();
}

class _DesktopHomeState extends State<DesktopHome> {
  final TextEditingController searchCon = TextEditingController();

  late final PaymentGatewaysBloc _paymentGatewaysBloc;
  late final CurrencyBloc _currencyBloc;
  late final CurrencyListBloc _currencyListBloc;
  late final ProfileBloc _profileBloc;
  late final HomeTitleBloc _homeTitleBloc;
  late final CategoriesBloc _categoriesBloc;
  String _token = '', _emailSettingsOn = "";
  bool _emailVerified = false;
  String _language = '';
  final FocusNode focusNode = FocusNode();
  @override
  void initState() {
    _paymentGatewaysBloc = context.read<PaymentGatewaysBloc>();
    _currencyBloc = context.read<CurrencyBloc>();
    _currencyListBloc = context.read<CurrencyListBloc>();
    _profileBloc = context.read<ProfileBloc>();
    _homeTitleBloc = context.read<HomeTitleBloc>();
    _categoriesBloc = context.read<CategoriesBloc>();
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
    var emailVeSettings = await UserSharedPreference.getValue(
      SharedPreferenceHelper.emailVerificationSettings,
    );
    var language = await UserSharedPreference.getValue(
      SharedPreferenceHelper.languageCode,
    );
    var emailVerified = await UserSharedPreference.getBool(
      SharedPreferenceHelper.emailVerified,
    );
    address = await UserSharedPreference.getValue(
            SharedPreferenceHelper.customerAddress) ??
        "";
    getCustomerAddress(address);
    _token = token ?? "";
    _emailSettingsOn = emailVeSettings ?? "";
    _emailVerified = emailVerified ?? false;
    _language = language ?? "";
    checkLogin();
    _currencyBloc.add(Currency(token: _token));
    _homeTitleBloc.add(HomeTitleDataEvent());
    _paymentGatewaysBloc.add(PaymentGateways());
    _currencyListBloc.add(CurrencyList(token: _token));
    _categoriesBloc.add(
      Categories(
        limit: "20",
        language: _language,
        searchKey: "",
        sortField: "",
        sort: "",
        all: false,
      ),
    );
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

  String flashSel = '';
  String category = '';
  String popular = '';

  bool isFirstLoad = true;
  bool isCurrencyLoad = true;
  @override
  Widget build(BuildContext context) {
    final currencyCon = Provider.of<CurrencyController>(context);
    final paymentCon = Provider.of<PaymentOptionCon>(context);
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Column(
              children: [
                const _KilocaoChromeHero(),
                const _KilocaoStatementStrip(),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Column(
                    children: [
                      const SizedBox(height: 18),
                      BlocConsumer<CurrencyBloc, CurrencyState>(
                        builder: (context, state) {
                          if (state is CurrencyLoading) {
                            return const SizedBox();
                          } else if (state is CurrencyLoaded) {
                            final currenciesInfo =
                                state.currenciesModel.currenciesInfo;
                            final position =
                                currenciesInfo.comSiteCurrencySymbolPosition ??
                                    "";
                            final decimalPoint = currenciesInfo
                                    .comSiteEnableDisableDecimalPoint ??
                                "NO";
                            final commaAdjustment = currenciesInfo
                                    .comSiteCommaFormAdjustmentAmount ??
                                "NO";
                            WidgetsBinding.instance.addPostFrameCallback((_) {
                              currencyCon.setCurrencySymbol(
                                position,
                                decimalPoint,
                                commaAdjustment,
                              );
                            });
                          }
                          return const SizedBox();
                        },
                        listener: (context, state) {
                          if (state is CurrencyConnectionError) {
                            CommonFunctions.showUpSnack(
                              message: AppLocalizations.of(context)!.noInternet,
                              context: context,
                            );
                          }
                        },
                      ),
                      if (paymentCon.paymentGateways.isEmpty)
                        BlocConsumer<PaymentGatewaysBloc, PaymentGatewaysState>(
                          listener: (context, state) {
                            if (state is PaymentGatewaysConnectionError) {
                              CommonFunctions.showUpSnack(
                                context: context,
                                message: AppLocalizations.of(context)!.noInternet,
                              );
                            } else if (state is PaymentGatewaysLoaded) {
                              if (state.hasConnectionError) {
                                CommonFunctions.showCustomSnackBar(
                                  context,
                                  AppLocalizations.of(context)!.noInternet,
                                );
                              }
                              final data =
                                  state.paymentGatewaysModel.paymentGateways;
                              paymentCon.addPaymentGateway(data);
                            }
                          },
                          builder: (context, state) {
                            if (state is PaymentGatewaysLoading) {
                              return const SizedBox();
                            }
                            return const SizedBox();
                          },
                        ),
                      const SizedBox(height: 10),
                      _KilocaoCategoryGridSection(
                        title: category,
                      ),
                      const SizedBox(height: 16),
                      const _KilocaoProductShowcaseSection(),
                      const SizedBox(height: 16),
                      DesktopPopularProducts(
                        title: popular,
                      ),
                      const SizedBox(height: 20),
                      const _KilocaoFooter(),
                      const SizedBox(height: 90),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PromoRibbon extends StatelessWidget {
  const _PromoRibbon();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: CustomColors.baseColor.withValues(alpha: 0.12)),
        boxShadow: [
          BoxShadow(
            color: CustomColors.baseColor.withValues(alpha: 0.08),
            blurRadius: 18,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: Color(0xFFEAF7FF),
            ),
            child: Icon(
              Icons.pets,
              color: CustomColors.baseColor,
              size: 22,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  "KilocÃ£o para cÃ£es e gatos",
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: CustomColors.deepNavy,
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                      ),
                ),
                const SizedBox(height: 4),
                Text(
                  "Tudo para o dia a dia do seu pet em uma experiÃªncia leve, colorida e rÃ¡pida.",
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF51617B),
                        fontSize: 12.5,
                        height: 1.35,
                        fontWeight: FontWeight.w500,
                      ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: const [
              _TinyPill(label: "Novo"),
              _TinyPill(label: "Promo"),
            ],
          ),
        ],
      ),
    );
  }
}

class _TinyPill extends StatelessWidget {
  const _TinyPill({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: CustomColors.accentPink.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: CustomColors.accentPink,
              fontWeight: FontWeight.w800,
            ),
      ),
    );
  }
}

class _KilocaoHeroBanner extends StatelessWidget {
  const _KilocaoHeroBanner();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 28),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            CustomColors.baseColor.withValues(alpha: 0.96),
            const Color(0xFF1489CB),
            CustomColors.primaryGreen.withValues(alpha: 0.94),
          ],
        ),
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(
            color: CustomColors.baseColor.withValues(alpha: 0.16),
            blurRadius: 36,
            offset: const Offset(0, 16),
          ),
        ],
      ),
      child: Stack(
        children: [
          Positioned(
            right: -26,
            top: -18,
            child: _HeroBubble(
              color: CustomColors.accentGold.withValues(alpha: 0.18),
              size: 132,
            ),
          ),
          Positioned(
            left: -20,
            bottom: -26,
            child: _HeroBubble(
              color: CustomColors.accentPink.withValues(alpha: 0.16),
              size: 112,
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 10),
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 10,
                runSpacing: 10,
                children: const [
                  _HeroChip(
                    label: "Ofertas quentinhas",
                    background: Color(0x22FFFFFF),
                  ),
                  _HeroChip(
                    label: "Pet feliz hoje",
                    background: Color(0x2239C095),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 860),
                child: Text(
                  "Tudo que seu pet ama, com a energia colorida do KilocÃ£o.",
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.displayMedium?.copyWith(
                        color: Colors.white,
                        fontSize: 30,
                        fontWeight: FontWeight.w800,
                        height: 1.08,
                      ),
                ),
              ),
              const SizedBox(height: 10),
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 760),
                child: Text(
                  "Explore categorias, ofertas e novidades para deixar a rotina do seu pet mais leve e divertida.",
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.white.withValues(alpha: 0.96),
                        fontSize: 15,
                        height: 1.5,
                        fontWeight: FontWeight.w500,
                      ),
                ),
              ),
              const SizedBox(height: 24),
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 16,
                runSpacing: 16,
                children: [
                  _HeroActionButton(
                    label: "Explorar produtos",
                    color: CustomColors.accentPink,
                    onTap: () {},
                  ),
                  _HeroActionButton(
                    label: "Falar com a loja",
                    color: CustomColors.accentGold,
                    textColor: CustomColors.deepNavy,
                    onTap: () {},
                  ),
                ],
              ),
              const SizedBox(height: 10),
            ],
          ),
        ],
      ),
    );
  }
}

class _BrandStoryStrip extends StatelessWidget {
  const _BrandStoryStrip();

  @override
  Widget build(BuildContext context) {
    final cards = [
      (
        title: "RaÃ§Ãµes",
        subtitle: "Marcas, sabores e tamanhos para cada fase",
        color: CustomColors.baseColor,
      ),
      (
        title: "Banho e higiene",
        subtitle: "Produtos prÃ¡ticos para a rotina ficar fÃ¡cil",
        color: CustomColors.primaryGreen,
      ),
      (
        title: "SaÃºde",
        subtitle: "Itens pensados para bem-estar e cuidado",
        color: CustomColors.accentPink,
      ),
      (
        title: "AcessÃ³rios",
        subtitle: "Brinquedos, coleiras e detalhes cheios de estilo",
        color: CustomColors.accentGold,
      ),
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final itemWidth = constraints.maxWidth > 1000 ? 230.0 : 220.0;
        return Wrap(
          spacing: 14,
          runSpacing: 14,
          children: cards
              .map(
                (card) => Container(
                  width: itemWidth,
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: card.color.withValues(alpha: 0.12),
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: card.color.withValues(alpha: 0.08),
                        blurRadius: 16,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: card.color.withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: Icon(
                          Icons.pets,
                          color: card.color,
                          size: 24,
                        ),
                      ),
                      const SizedBox(height: 14),
                      Text(
                        card.title,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              color: CustomColors.deepNavy,
                              fontSize: 15,
                              fontWeight: FontWeight.w800,
                            ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        card.subtitle,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: const Color(0xFF5B6B7F),
                              fontSize: 12.5,
                              height: 1.35,
                            ),
                      ),
                    ],
                  ),
                ),
              )
              .toList(),
        );
      },
    );
  }
}

class _HeroActionButton extends StatelessWidget {
  const _HeroActionButton({
    required this.label,
    required this.color,
    required this.onTap,
    this.textColor = Colors.white,
  });

  final String label;
  final Color color;
  final Color textColor;
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
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(999),
            boxShadow: [
              BoxShadow(
                color: color.withValues(alpha: 0.28),
                blurRadius: 18,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Text(
            label,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: textColor,
                  fontSize: 14,
                  fontWeight: FontWeight.w800,
                ),
          ),
        ),
      ),
    );
  }
}

class _HeroChip extends StatelessWidget {
  const _HeroChip({
    required this.label,
    required this.background,
  });

  final String label;
  final Color background;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withValues(alpha: 0.2)),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelLarge?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w700,
            ),
      ),
    );
  }
}

class _HeroBubble extends StatelessWidget {
  const _HeroBubble({
    required this.color,
    required this.size,
  });

  final Color color;
  final double size;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
    );
  }
}

class _KilocaoFooter extends StatelessWidget {
  const _KilocaoFooter();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Colors.white,
      padding: EdgeInsets.fromLTRB(28.w, 40.h, 28.w, 30.h),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final isCompact = constraints.maxWidth < 1050;

          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (isCompact)
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _FooterNewsletter(),
                    SizedBox(height: 44),
                    _FooterLinkColumnsStack(),
                  ],
                )
              else
                const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 13, child: _FooterNewsletter()),
                    SizedBox(width: 88),
                    Expanded(flex: 18, child: _FooterLinkColumns()),
                  ],
                ),
              SizedBox(height: isCompact ? 44 : 94),
              if (isCompact)
                const _FooterBottomStack()
              else
                const Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Expanded(child: _FooterBottomLeft()),
                    _FooterBottomRight(),
                  ],
                ),
            ],
          );
        },
      ),
    );
  }
}

class _FooterNewsletter extends StatelessWidget {
  const _FooterNewsletter();

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 520),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'JOIN THE KILOCÃO CREW',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontSize: 19,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.5,
                  color: Colors.black,
                ),
          ),
          const SizedBox(height: 14),
          Text(
            'Receba novidades, ofertas e lançamentos para cuidar do seu pet com mais estilo, carinho e praticidade.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontSize: 14,
                  height: 1.8,
                  color: Colors.black87,
                ),
          ),
          const SizedBox(height: 20),
          TextField(
            decoration: InputDecoration(
              hintText: 'Email Address...',
              hintStyle: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    fontSize: 14,
                    color: Colors.black45,
                  ),
              filled: true,
              fillColor: Colors.white,
              contentPadding: EdgeInsets.symmetric(
                horizontal: 18.w,
                vertical: 18.h,
              ),
              border: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.black.withValues(alpha: 0.26)),
                borderRadius: BorderRadius.circular(4),
              ),
              enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.black.withValues(alpha: 0.26)),
                borderRadius: BorderRadius.circular(4),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: const BorderSide(color: CustomColors.baseColor),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          ),
          const SizedBox(height: 26),
          SizedBox(
            width: double.infinity,
            height: 60,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomColors.accentGold,
                foregroundColor: Colors.black,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              child: Text(
                'SIGN ME UP',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 0.6,
                      color: Colors.black,
                    ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _FooterLinkColumns extends StatelessWidget {
  const _FooterLinkColumns();

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: _FooterLinkColumn(
            title: 'SUPPORT',
            items: [
              'Log In for Order Status',
              'Shipping',
              'Returns',
              'Warranty',
              'FAQs',
              'Contact Us',
            ],
          ),
        ),
        SizedBox(width: 40),
        Expanded(
          child: _FooterLinkColumn(
            title: 'COMPANY',
            items: [
              'Our Story',
              'Blog Stories',
              'Move Your Way',
              'Drop Shop PDX',
              'Retailers',
              'Pro Program',
              'Corporate Sales',
              'Careers',
            ],
          ),
        ),
        SizedBox(width: 40),
        Expanded(
          child: _FooterLinkColumn(
            title: 'RESOURCES',
            items: [
              'Reviews',
              'Promotion & Contest Rules',
              'Data Collection Policy',
              'Privacy Statement',
              'Your Privacy Choices',
              'Terms of Use',
              'Intellectual Property',
              'Accessibility Policy',
              'Sitemap',
            ],
          ),
        ),
      ],
    );
  }
}

class _FooterLinkColumnsStack extends StatelessWidget {
  const _FooterLinkColumnsStack();

  @override
  Widget build(BuildContext context) {
    return const Wrap(
      runSpacing: 28,
      spacing: 28,
      children: [
        SizedBox(
          width: 220,
          child: _FooterLinkColumn(
            title: 'SUPPORT',
            items: [
              'Log In for Order Status',
              'Shipping',
              'Returns',
              'Warranty',
              'FAQs',
              'Contact Us',
            ],
          ),
        ),
        SizedBox(
          width: 220,
          child: _FooterLinkColumn(
            title: 'COMPANY',
            items: [
              'Our Story',
              'Blog Stories',
              'Move Your Way',
              'Drop Shop PDX',
              'Retailers',
              'Pro Program',
              'Corporate Sales',
              'Careers',
            ],
          ),
        ),
        SizedBox(
          width: 220,
          child: _FooterLinkColumn(
            title: 'RESOURCES',
            items: [
              'Reviews',
              'Promotion & Contest Rules',
              'Data Collection Policy',
              'Privacy Statement',
              'Your Privacy Choices',
              'Terms of Use',
              'Intellectual Property',
              'Accessibility Policy',
              'Sitemap',
            ],
          ),
        ),
      ],
    );
  }
}

class _FooterLinkColumn extends StatelessWidget {
  const _FooterLinkColumn({
    required this.title,
    required this.items,
  });

  final String title;
  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontSize: 15,
                fontWeight: FontWeight.w800,
                color: Colors.black,
                letterSpacing: 0.3,
              ),
        ),
        const SizedBox(height: 22),
        ...items.map(
          (item) => Padding(
            padding: const EdgeInsets.only(bottom: 20),
            child: Text(
              item,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontSize: 13,
                    height: 1.35,
                    color: Colors.black.withValues(alpha: 0.64),
                    letterSpacing: 0.2,
                  ),
            ),
          ),
        ),
      ],
    );
  }
}

class _FooterBottomLeft extends StatelessWidget {
  const _FooterBottomLeft();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _FooterSocialRow(),
        SizedBox(height: 34),
        _FooterCopyright(),
      ],
    );
  }
}

class _FooterBottomRight extends StatelessWidget {
  const _FooterBottomRight();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: const [
        _FooterCountrySelector(),
        SizedBox(height: 34),
        _FooterPaymentRow(),
      ],
    );
  }
}

class _FooterBottomStack extends StatelessWidget {
  const _FooterBottomStack();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _FooterSocialRow(),
        SizedBox(height: 30),
        _FooterCopyright(),
        SizedBox(height: 28),
        _FooterCountrySelector(),
        SizedBox(height: 28),
        _FooterPaymentRow(),
      ],
    );
  }
}

class _FooterCopyright extends StatelessWidget {
  const _FooterCopyright();

  @override
  Widget build(BuildContext context) {
    return Text(
      '© 2026, Kilocão.',
      style: Theme.of(context).textTheme.bodySmall?.copyWith(
            fontSize: 11,
            color: Colors.black.withValues(alpha: 0.72),
            letterSpacing: 0.5,
          ),
    );
  }
}

class _FooterCountrySelector extends StatelessWidget {
  const _FooterCountrySelector();

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 28,
          height: 28,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: Colors.black.withValues(alpha: 0.14)),
            gradient: const LinearGradient(
              colors: [
                Color(0xFFFFD84D),
                Color(0xFF39C095),
              ],
            ),
          ),
          alignment: Alignment.center,
          child: Text(
            'BR',
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  fontSize: 8,
                  fontWeight: FontWeight.w800,
                  color: Colors.black,
                ),
          ),
        ),
        const SizedBox(width: 10),
        Text(
          'BRAZIL  (BRL  R\$)',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: Colors.black,
                letterSpacing: 0.5,
              ),
        ),
        const SizedBox(width: 8),
        Icon(
          Icons.keyboard_arrow_down_rounded,
          size: 22,
          color: Colors.black.withValues(alpha: 0.8),
        ),
      ],
    );
  }
}

class _FooterPaymentRow extends StatelessWidget {
  const _FooterPaymentRow();

  @override
  Widget build(BuildContext context) {
    const items = <_PaymentBadge>[
      _PaymentBadge(label: 'AMEX', bg: Color(0xFF1B75BC), fg: Colors.white),
      _PaymentBadge(label: 'Apple Pay', bg: Colors.white, fg: Colors.black, border: true),
      _PaymentBadge(label: 'D', bg: Color(0xFF1F75FE), fg: Colors.white),
      _PaymentBadge(label: 'DISC', bg: Colors.white, fg: Colors.black, border: true),
      _PaymentBadge(label: 'G Pay', bg: Colors.white, fg: Colors.black, border: true),
      _PaymentBadge(label: 'JCB', bg: Colors.white, fg: Colors.black, border: true),
      _PaymentBadge(label: 'MC', bg: Color(0xFFFF5F00), fg: Colors.white),
      _PaymentBadge(label: 'shop', bg: Color(0xFF6C3BFF), fg: Colors.white),
      _PaymentBadge(label: 'VISA', bg: Colors.white, fg: Colors.black, border: true),
    ];

    return Wrap(
      spacing: 10,
      runSpacing: 10,
      alignment: WrapAlignment.end,
      children: items,
    );
  }
}

class _PaymentBadge extends StatelessWidget {
  const _PaymentBadge({
    required this.label,
    required this.bg,
    required this.fg,
    this.border = false,
  });

  final String label;
  final Color bg;
  final Color fg;
  final bool border;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 30,
      padding: const EdgeInsets.symmetric(horizontal: 10),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(4),
        border: border ? Border.all(color: Colors.black.withValues(alpha: 0.12)) : null,
      ),
      alignment: Alignment.center,
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              fontSize: 10,
              fontWeight: FontWeight.w800,
              color: fg,
              letterSpacing: 0.2,
            ),
      ),
    );
  }
}

class _FooterSocialRow extends StatelessWidget {
  const _FooterSocialRow();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: const [
        _SocialIcon(asset: 'assets/icons/facebook.png'),
        SizedBox(width: 26),
        _SocialIcon(asset: 'assets/icons/instagram.png'),
        SizedBox(width: 26),
        _SocialIcon(asset: 'assets/icons/twitter.png'),
        SizedBox(width: 26),
        _SocialIcon(asset: 'assets/icons/linkedin.png'),
      ],
    );
  }
}

class _SocialIcon extends StatelessWidget {
  const _SocialIcon({
    required this.asset,
  });

  final String asset;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      asset,
      width: 20,
      height: 20,
      color: Colors.black,
      colorBlendMode: BlendMode.srcIn,
    );
  }
}

class _KilocaoChromeHero extends StatelessWidget {
  const _KilocaoChromeHero();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final height = width > 1500
            ? 710.0
            : width > 1180
                ? 650.0
                : width > 900
                    ? 590.0
                    : 620.0;

        return Container(
          width: double.infinity,
          height: height,
          color: Colors.white,
          child: Stack(
            fit: StackFit.expand,
            children: [
              Image.network(
                'https://images.unsplash.com/photo-1662261728536-910777a82ce4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
                fit: BoxFit.cover,
                alignment: Alignment.center,
                filterQuality: FilterQuality.high,
                errorBuilder: (context, error, stackTrace) => Image.asset(
                  Images.spOne,
                  fit: BoxFit.cover,
                  alignment: Alignment.center,
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.black.withValues(alpha: 0.30),
                      Colors.black.withValues(alpha: 0.16),
                      Colors.black.withValues(alpha: 0.38),
                    ],
                  ),
                ),
              ),
              Center(
                child: Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: width > 900 ? 44 : 28,
                    vertical: 20,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        "EVERYDAY PET ESSENTIALS",
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                              color: Colors.white.withValues(alpha: 0.94),
                              fontSize: 14,
                              letterSpacing: 2.4,
                              fontWeight: FontWeight.w700,
                            ),
                      ),
                      const SizedBox(height: 18),
                      ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 720),
                        child: Text(
                          "PASSEIE, GUARDE, REPITA.",
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.displayMedium?.copyWith(
                                color: Colors.white,
                                fontSize: 44,
                                height: 1.02,
                                fontWeight: FontWeight.w800,
                                letterSpacing: 0.3,
                              ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Container(
                        width: 260,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 22,
                          vertical: 15,
                        ),
                        decoration: BoxDecoration(
                          color: CustomColors.accentPink,
                          borderRadius: BorderRadius.circular(2),
                        ),
                        child: Text(
                          "ESCOLHA O KIT",
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                color: Colors.white,
                                fontSize: 14,
                                fontWeight: FontWeight.w800,
                                letterSpacing: 1.1,
                              ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _KilocaoHeroPanel extends StatelessWidget {
  const _KilocaoHeroPanel({
    required this.image,
    required this.overlayColor,
    required this.align,
  });

  final String image;
  final Color overlayColor;
  final Alignment align;

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        Image.asset(
          image,
          fit: BoxFit.cover,
          alignment: align,
        ),
        Container(color: overlayColor),
      ],
    );
  }
}

class _KilocaoStatementStrip extends StatelessWidget {
  const _KilocaoStatementStrip();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 58),
      child: Column(
        children: [
          Text(
            "KILOCÃƒO",
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: CustomColors.baseColor,
                  fontSize: 14,
                  letterSpacing: 3.6,
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 14),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1080),
            child: Text(
              "FEITO PARA O DIA A DIA DO SEU PET. DESDE 2018.",
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.displayMedium?.copyWith(
                    color: const Color(0xFF111111),
                    fontSize: 42,
                    height: 1.02,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 0.2,
                  ),
            ),
          ),
          const SizedBox(height: 10),
          Text(
            "Cores vivas, produtos prÃ¡ticos e tudo o que o seu pet precisa em um sÃ³ lugar.",
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: const Color(0xFF555555),
                  fontSize: 15,
                  height: 1.45,
                  fontWeight: FontWeight.w500,
                ),
          ),
        ],
      ),
    );
  }
}

class _KilocaoCategoryGridSection extends StatelessWidget {
  const _KilocaoCategoryGridSection({
    required this.title,
  });

  final String title;

  @override
  Widget build(BuildContext context) {
    final filterCon = Provider.of<FilterController>(context);
    final homeCon = Provider.of<HomeScreenProvider>(context);
    final allProduct = Provider.of<AllProductController>(context);

    final fallbackCards = [
      _CategoryShowcaseCardData(
        title: "Cães",
        subtitle: "Companheiros felizes",
        image: 'assets/images/categoria_cachorro.jpg',
        fallbackImage: 'assets/images/categoria_cachorro.jpg',
        accent: CustomColors.baseColor,
      ),
      _CategoryShowcaseCardData(
        title: "Gatos",
        subtitle: "Mimos e conforto",
        image: 'assets/images/categoria_gato.jpg',
        fallbackImage: 'assets/images/categoria_gato.jpg',
        accent: CustomColors.primaryGreen,
      ),
      _CategoryShowcaseCardData(
        title: "Pássaros",
        subtitle: "Cores e leveza",
        image: 'assets/images/categoria_passaro.jpg',
        fallbackImage: 'assets/images/categoria_passaro.jpg',
        accent: CustomColors.accentPink,
      ),
      _CategoryShowcaseCardData(
        title: "Peixes",
        subtitle: "Vida em movimento",
        image: 'assets/images/categoria_peixe.jpg',
        fallbackImage: 'assets/images/categoria_peixe.jpg',
        accent: CustomColors.accentGold,
      ),
    ];

    return BlocConsumer<CategoriesBloc, CategoriesState>(
      listener: (context, state) {
        if (state is CategoriesConnectionError) {
          CommonFunctions.showUpSnack(
            message: AppLocalizations.of(context)!.noInternet,
            context: context,
          );
        } else if (state is CategoriesFailure) {
          CommonFunctions.showUpSnack(
            message: state.categoryModel.message.isNotEmpty == true
                ? state.categoryModel.message
                : "An error occurred",
            context: context,
          );
        }
      },
      builder: (context, state) {
        final cards = <_CategoryShowcaseCardData>[];
        if (state is CategoriesLoaded && state.categoryModel.data?.isNotEmpty == true) {
          final loaded = state.categoryModel.data!.take(4).toList();
          for (var i = 0; i < loaded.length; i++) {
            final item = loaded[i];
            final colorSeed = [
              CustomColors.baseColor,
              CustomColors.primaryGreen,
              CustomColors.accentPink,
              CustomColors.accentGold,
            ][i % 4];
            final themedCard = fallbackCards[i % fallbackCards.length];
            cards.add(
              _CategoryShowcaseCardData(
                title: themedCard.title,
                subtitle: themedCard.subtitle,
                image: _categoryImageUrl(item) ??
                    themedCard.image,
                fallbackImage: themedCard.fallbackImage,
                accent: colorSeed,
                categoryName: item.categoryName,
                categoryId: item.id.toString(),
              ),
            );
          }
        } else if (state is CategoriesLoading) {
          return _KilocaoCategoryGridSkeleton(title: title);
        } else {
          cards.addAll(fallbackCards);
        }

        if (cards.isEmpty) {
          cards.addAll(fallbackCards);
        }

        return Container(
          width: double.infinity,
          color: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    title.isEmpty ? "Categorias" : title,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          color: const Color(0xFF111111),
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.2,
                        ),
                  ),
                  const Spacer(),
                  Text(
                    "Ver tudo",
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: CustomColors.baseColor,
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                        ),
                  ),
                ],
              ),
              const SizedBox(height: 18),
              LayoutBuilder(
                builder: (context, constraints) {
                  final crossAxisCount = constraints.maxWidth > 1260
                      ? 4
                      : constraints.maxWidth > 820
                          ? 2
                          : 1;
                  final childAspectRatio = crossAxisCount == 4
                      ? 0.92
                      : crossAxisCount == 2
                          ? 1.2
                          : 1.8;
                  return GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: cards.length,
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: crossAxisCount,
                      crossAxisSpacing: 18,
                      mainAxisSpacing: 18,
                      childAspectRatio: childAspectRatio,
                    ),
                    itemBuilder: (context, index) {
                      final card = cards[index];
                      return _KilocaoCategoryCard(
                        data: card,
                        onTap: () {
                          if (card.categoryName.isNotEmpty) {
                            allProduct.allProductClear();
                            filterCon.toggleCategory(
                              card.categoryName,
                              card.categoryId.isEmpty ? index.toString() : card.categoryId,
                            );
                            homeCon.setCurrentIndexHomePage(1);
                          }
                        },
                      );
                    },
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }
}

String? _categoryImageUrl(dynamic item) {
  final candidates = [
    item.categoryBannerUrl,
    item.categoryThumbUrl,
  ];
  for (final value in candidates) {
    if (value is String && value.isNotEmpty) {
      if (value.startsWith('http')) return value;
      if (value.startsWith('/storage/')) {
        return 'http://127.0.0.1:8000$value';
      }
      return value;
    }
  }
  return null;
}

class _KilocaoCategoryCard extends StatelessWidget {
  const _KilocaoCategoryCard({
    required this.data,
    required this.onTap,
  });

  final _CategoryShowcaseCardData data;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(26),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Container(color: data.accent.withValues(alpha: 0.15)),
              data.image.startsWith('http')
                  ? Image.network(
                      data.image,
                      fit: BoxFit.cover,
                      alignment: Alignment.center,
                      errorBuilder: (_, __, ___) {
                        return Image.asset(
                          data.fallbackImage,
                          fit: BoxFit.cover,
                          alignment: Alignment.center,
                        );
                      },
                    )
                  : Image.asset(
                      data.image,
                      fit: BoxFit.cover,
                      alignment: Alignment.center,
                    ),
              Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                child: Container(
                  height: 130,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.black.withValues(alpha: 0.1),
                        Colors.black.withValues(alpha: 0.65),
                      ],
                    ),
                  ),
                ),
              ),
              Positioned(
                left: 18,
                bottom: 18,
                right: 18,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      data.title.toUpperCase(),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            color: Colors.white,
                            fontSize: 23,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 0.3,
                          ),
                    ),
                    const SizedBox(height: 4),
                  ],
                ),
              ),
              Positioned(
                right: 18,
                top: 18,
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.arrow_forward_ios_rounded,
                    size: 18,
                    color: Colors.black,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _KilocaoCategoryGridSkeleton extends StatelessWidget {
  const _KilocaoCategoryGridSkeleton({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 28),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                title.isEmpty ? "Categorias" : title,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: const Color(0xFF111111),
                      fontSize: 20,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ],
          ),
          const SizedBox(height: 18),
          LayoutBuilder(
            builder: (context, constraints) {
              final crossAxisCount = constraints.maxWidth > 1260
                  ? 4
                  : constraints.maxWidth > 820
                      ? 2
                      : 1;
              final childAspectRatio = crossAxisCount == 4
                  ? 0.92
                  : crossAxisCount == 2
                      ? 1.2
                      : 1.8;
              return GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: 4,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 18,
                  mainAxisSpacing: 18,
                  childAspectRatio: childAspectRatio,
                ),
                itemBuilder: (context, index) {
                  return Container(
                    decoration: BoxDecoration(
                      color: Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(26),
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }
}

class _CategoryShowcaseCardData {
  const _CategoryShowcaseCardData({
    required this.title,
    required this.subtitle,
    required this.image,
    required this.fallbackImage,
    required this.accent,
    this.categoryName = '',
    this.categoryId = '',
  });

  final String title;
  final String subtitle;
  final String image;
  final String fallbackImage;
  final Color accent;
  final String categoryName;
  final String categoryId;
}

class _KilocaoProductShowcaseSection extends StatefulWidget {
  const _KilocaoProductShowcaseSection();

  @override
  State<_KilocaoProductShowcaseSection> createState() =>
      _KilocaoProductShowcaseSectionState();
}

class _KilocaoProductShowcaseSectionState
    extends State<_KilocaoProductShowcaseSection> {
  late final NewArrivalBloc _newArrivalBloc;
  late final ScrollController _scrollController;
  String _token = '';
  String _language = '';
  String _userLat = '';
  String _userLong = '';
  double _scrollProgress = 0;
  bool _isInitialLoad = true;
  List<ProductData> _productData = [];

  @override
  void initState() {
    super.initState();
    _newArrivalBloc = context.read<NewArrivalBloc>();
    _scrollController = ScrollController();
    _scrollController.addListener(_handleScroll);
    _loadUserContext();
  }

  Future<void> _loadUserContext() async {
    var token = await UserSharedPreference.getValue(
      SharedPreferenceHelper.token,
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
    _token = token ?? "";
    _language = language ?? "";
    _userLat = customerLat ?? "";
    _userLong = customerLong ?? "";
    if (!mounted) return;
    _newArrivalBloc.add(
      NewArrival(
        categoryId: '',
        minPrice: '',
        maxPrice: '',
        availability: '',
        perPage: '4',
        language: _language,
        userLat: _userLat,
        userLong: _userLong,
        token: _token,
      ),
    );
  }

  void _handleScroll() {
    if (!_scrollController.hasClients) return;
    final maxScroll = _scrollController.position.maxScrollExtent;
    if (maxScroll <= 0) {
      setState(() => _scrollProgress = 0);
      return;
    }
    setState(() {
      _scrollProgress = (_scrollController.offset / maxScroll).clamp(0, 1);
    });
  }

  @override
  void dispose() {
    _scrollController.removeListener(_handleScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollBy(double offset) {
    if (!_scrollController.hasClients) return;
    final target = (_scrollController.offset + offset).clamp(
      0.0,
      _scrollController.position.maxScrollExtent,
    );
    _scrollController.animateTo(
      target,
      duration: const Duration(milliseconds: 380),
      curve: Curves.easeOutCubic,
    );
  }

  @override
  Widget build(BuildContext context) {
    final currencyCon = Provider.of<CurrencyController>(context);
    final commonProvider = Provider.of<CommonProvider>(context);
    final homeCon = Provider.of<HomeScreenProvider>(context, listen: false);
    final filterCon = Provider.of<FilterController>(context, listen: false);
    final width = MediaQuery.of(context).size.width;
    final cardWidth = width > 1700
        ? 360.0
        : width > 1400
            ? 330.0
            : width > 1200
                ? 310.0
                : 290.0;

    return BlocConsumer<NewArrivalBloc, NewArrivalState>(
      listener: (context, state) {
        if (state is NewArrivalConnectionError) {
          CommonFunctions.showUpSnack(
            message: AppLocalizations.of(context)!.noInternet,
            context: context,
          );
        } else if (state is NewArrivalFailure) {
          CommonFunctions.showUpSnack(
            message: state.newArrivalModel.message.isNotEmpty
                ? state.newArrivalModel.message
                : 'An error occurred',
            context: context,
          );
        }
      },
      builder: (context, state) {
        if (state is NewArrivalLoading) {
          return _KilocaoProductShowcaseShell(
            progress: _scrollProgress,
            onPrevious: () => _scrollBy(-cardWidth),
            onNext: () => _scrollBy(cardWidth),
            title: "THIS IS IT",
            subtitle: "The latest gear, ready to ride.",
            child: _KilocaoProductShowcaseLoadingRow(cardWidth: cardWidth),
          );
        }

        if (state is NewArrivalLoaded) {
          if (_isInitialLoad && state.hasConnectionError) {
            CommonFunctions.showCustomSnackBar(
              context,
              AppLocalizations.of(context)!.noInternet,
            );
          }
          _isInitialLoad = false;
          _productData = state.newArrivalModel.data ?? [];
          if (_productData.isEmpty) {
            return const SizedBox();
          }
          return Column(
            children: [
              _KilocaoProductShowcaseShell(
                progress: _scrollProgress,
                onPrevious: () => _scrollBy(-cardWidth),
                onNext: () => _scrollBy(cardWidth),
                title: "THIS IS IT",
                subtitle: "The latest gear, ready to ride.",
                child: _KilocaoProductShowcaseRow(
                  scrollController: _scrollController,
                  cards: _productData,
                  cardWidth: cardWidth,
                  currencyCon: currencyCon,
                  onTapProduct: (product) {
                    homeCon.setTabType("Products");
                    filterCon.setProductType("Newest");
                    filterCon.updateSelectedValue("Newest");
                  },
                ),
              ),
              if (commonProvider.isLoading) const SizedBox(),
            ],
          );
        }

        return const SizedBox();
      },
    );
  }
}

class _KilocaoProductShowcaseShell extends StatelessWidget {
  const _KilocaoProductShowcaseShell({
    required this.progress,
    required this.onPrevious,
    required this.onNext,
    required this.title,
    required this.subtitle,
    required this.child,
  });

  final double progress;
  final VoidCallback onPrevious;
  final VoidCallback onNext;
  final String title;
  final String subtitle;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 42),
      child: Column(
        children: [
          Text(
            title,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.displayMedium?.copyWith(
                  color: Colors.black,
                  fontSize: 42,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.2,
                ),
          ),
          const SizedBox(height: 16),
          Text(
            subtitle,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: const Color(0xFF1F2937),
                  fontSize: 17,
                  height: 1.45,
                  fontWeight: FontWeight.w400,
                ),
          ),
          const SizedBox(height: 52),
          child,
          const SizedBox(height: 22),
          Row(
            children: [
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(999),
                  child: LinearProgressIndicator(
                    minHeight: 2.5,
                    value: progress,
                    backgroundColor: const Color(0xFFE4E4E4),
                    valueColor:
                        AlwaysStoppedAnimation<Color>(CustomColors.baseColor),
                  ),
                ),
              ),
              const SizedBox(width: 24),
              Row(
                children: [
                  _ArrowCircleButton(
                    icon: Icons.chevron_left_rounded,
                    onTap: onPrevious,
                  ),
                  const SizedBox(width: 14),
                  _ArrowCircleButton(
                    icon: Icons.chevron_right_rounded,
                    onTap: onNext,
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ArrowCircleButton extends StatelessWidget {
  const _ArrowCircleButton({
    required this.icon,
    required this.onTap,
  });

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkResponse(
      onTap: onTap,
      radius: 26,
      child: Container(
        width: 52,
        height: 52,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: const Color(0xFFE2E2E2)),
          color: Colors.white,
        ),
        child: Icon(
          icon,
          color: Colors.black,
          size: 28,
        ),
      ),
    );
  }
}

class _KilocaoProductShowcaseRow extends StatelessWidget {
  const _KilocaoProductShowcaseRow({
    required this.scrollController,
    required this.cards,
    required this.cardWidth,
    required this.currencyCon,
    required this.onTapProduct,
  });

  final ScrollController scrollController;
  final List<ProductData> cards;
  final double cardWidth;
  final CurrencyController currencyCon;
  final void Function(ProductData product) onTapProduct;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 540,
      child: ListView.separated(
        controller: scrollController,
        physics: const BouncingScrollPhysics(),
        scrollDirection: Axis.horizontal,
        itemCount: cards.length,
        separatorBuilder: (_, __) => const SizedBox(width: 22),
        itemBuilder: (context, index) {
          final product = cards[index];
          return _KilocaoProductShowcaseCard(
            product: product,
            width: cardWidth,
            currencyCon: currencyCon,
            onTap: () => onTapProduct(product),
          );
        },
      ),
    );
  }
}

class _KilocaoProductShowcaseLoadingRow extends StatelessWidget {
  const _KilocaoProductShowcaseLoadingRow({required this.cardWidth});

  final double cardWidth;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 540,
      child: ListView.separated(
        physics: const NeverScrollableScrollPhysics(),
        scrollDirection: Axis.horizontal,
        itemCount: 4,
        separatorBuilder: (_, __) => const SizedBox(width: 22),
        itemBuilder: (context, index) {
          return Container(
            width: cardWidth,
            padding: const EdgeInsets.all(6),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: 360,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade200,
                    borderRadius: BorderRadius.circular(18),
                  ),
                ),
                const SizedBox(height: 18),
                Container(height: 18, width: cardWidth * 0.7, color: Colors.grey.shade200),
                const SizedBox(height: 14),
                Container(height: 12, width: 60, color: Colors.grey.shade200),
                const SizedBox(height: 14),
                Container(height: 18, width: 130, color: Colors.grey.shade200),
                const SizedBox(height: 18),
                Row(
                  children: List.generate(
                    3,
                    (dot) => Container(
                      margin: const EdgeInsets.only(right: 8),
                      width: 20,
                      height: 20,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Color(0xFFE5E7EB),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _KilocaoProductShowcaseCard extends StatelessWidget {
  const _KilocaoProductShowcaseCard({
    required this.product,
    required this.width,
    required this.currencyCon,
    required this.onTap,
  });

  final ProductData product;
  final double width;
  final CurrencyController currencyCon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final title = (product.name ?? '').toString().toUpperCase();
    final reviews = (product.reviewCount ?? 0).toString();
    final parsedRating =
        double.tryParse((product.rating ?? '0').toString()) ?? 0;
    final useSpecial = double.tryParse((product.specialPrice ?? '0').toString()) != null &&
        double.tryParse((product.specialPrice ?? '0').toString())! > 0;
    final priceText = useSpecial
        ? currencyCon.formatCurrency((product.specialPrice ?? '').toString())
        : currencyCon.formatCurrency((product.price ?? '').toString());

    final accentDots = [
      CustomColors.baseColor,
      CustomColors.primaryGreen,
      CustomColors.accentPink,
      CustomColors.accentGold,
    ];

    return InkWell(
      onTap: onTap,
      child: SizedBox(
        width: width,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            InkWell(
              onTap: () {
                final slug = (product.slug ?? '').toString();
                if (slug.isNotEmpty) {
                  context.pushNamed(
                    RouteNames.desktopProductDisplay,
                    extra: {"slug": slug},
                  );
                } else {
                  onTap();
                }
              },
              child: Container(
                height: 360,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: const Color(0xFFF8F8F8),
                  borderRadius: BorderRadius.circular(22),
                  border: Border.all(color: const Color(0xFFF0F0F0)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(14),
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFFF1F1F1)),
                    ),
                    padding: const EdgeInsets.all(18),
                    child: CommonImage(
                      imageUrl: (product.imageUrl ?? '').toString(),
                      width: width,
                      height: 300,
                      fit: BoxFit.contain,
                      radius: BorderRadius.circular(6),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 14),
            Text(
              title.isEmpty ? "KILOCÃƒO" : title,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 0.1,
                  ),
            ),
            const SizedBox(height: 6),
            Row(
              children: [
                Icon(
                  Icons.star,
                  size: 14,
                  color: parsedRating > 0
                      ? const Color(0xFFF4C41A)
                      : const Color(0xFFEAEAEA),
                ),
                const SizedBox(width: 4),
                Text(
                  "($reviews)",
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontSize: 14,
                        color: const Color(0xFF222222),
                      ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              priceText,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: Colors.black,
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                    letterSpacing: 0.2,
                  ),
            ),
            const SizedBox(height: 14),
            Row(
              children: List.generate(
                3,
                (index) => Container(
                  margin: const EdgeInsets.only(right: 10),
                  width: 18,
                  height: 18,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: accentDots[index % accentDots.length],
                    border: Border.all(color: index == 0 ? Colors.black : Colors.transparent, width: 2),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class DesktopSlider extends StatefulWidget {
  const DesktopSlider({super.key});

  @override
  State<DesktopSlider> createState() => _DesktopSliderState();
}

class _DesktopSliderState extends State<DesktopSlider> {
  late final SliderListBloc _sliderListBloc;
  @override
  void initState() {
    _sliderListBloc = context.read<SliderListBloc>();
    getUserRout();
    super.initState();
  }

  String _language = '';
  getUserRout() async {
    var language = await UserSharedPreference.getValue(
      SharedPreferenceHelper.languageCode,
    );
    _language = language ?? "";
    if (_sliderListBloc.state is! SliderListLoaded) {
      _sliderListBloc.add(SliderList(language: _language));
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    final homeCon = Provider.of<HomeScreenProvider>(context, listen: false);
    return BlocConsumer<SliderListBloc, SliderListState>(
      builder: (_, state) {
        if (state is SliderListLoading) {
          return const CarouselShimmer();
        } else if (state is SliderListLoaded) {
          if (state.hasConnectionError) {
            CommonFunctions.showCustomSnackBar(
                context, AppLocalizations.of(context)!.noInternet);
          }
          final data = state.sliderModel.sliders!;
          return state.sliderModel.sliders!.isEmpty
              ? const SizedBox()
              : Column(
                  children: [
                    CommonCard(
                      mHorizontal: 0,
                      mVertical: 0,
                      pLeft: 0,
                      pRight: 10,
                      pTop: 0,
                      pBottom: 0,
                      widget: CarouselSlider(
                        options: CarouselOptions(
                          height: 400,
                          autoPlay: true,
                          enlargeCenterPage: true,
                          enableInfiniteScroll: true,
                          aspectRatio: 16 / 9,
                          viewportFraction: 1,
                          autoPlayAnimationDuration: const Duration(seconds: 2),
                          autoPlayInterval: const Duration(seconds: 8),
                          autoPlayCurve: Curves.fastOutSlowIn,
                          onPageChanged: (index, reason) {
                            homeCon.updateIndex(index);
                          },
                        ),
                        items: data.map((url) {
                          return Builder(
                            builder: (BuildContext context) {
                              Color titleColor = Color(int.parse(
                                      url.titleColor.substring(1),
                                      radix: 16) +
                                  0xFF000000);
                              Color descriptionColor = Color(int.parse(
                                      url.subTitleColor.substring(1),
                                      radix: 16) +
                                  0xFF000000);
                              Color buttonColor = Color(int.parse(
                                      url.buttonBgColor.substring(1),
                                      radix: 16) +
                                  0xFF000000);
                              Color buttonTextColor = Colors.white;
                              buttonTextColor = url.buttonTextColor != null &&
                                      url.buttonTextColor.toString().length > 5
                                  ? Color(int.parse(
                                          url.buttonTextColor!.substring(1),
                                          radix: 16) +
                                      0xFF000000)
                                  : Colors.white; // Default fallback to white

                              Color bgColor = Color(int.parse(
                                      url.bgColor.substring(1),
                                      radix: 16) +
                                  0xFF000000);
                              return Container(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 8, horizontal: 8),
                                width: MediaQuery.of(context).size.width,
                                decoration: BoxDecoration(
                                  image: url.bgImageUrl != null
                                      ? DecorationImage(
                                          image: NetworkImage(url.bgImageUrl!),
                                          fit: BoxFit
                                              .cover, // Optional: Adjust as needed
                                        )
                                      : null,
                                  color: url.bgImageUrl == null
                                      ? bgColor
                                      : Colors.white,
                                  borderRadius: BorderRadius.circular(8.0),
                                ),
                                child: Row(
                                  children: [
                                    SizedBox(
                                      width: screenWidth * 0.03,
                                    ),
                                    SizedBox(
                                      width: screenWidth * 0.5,
                                      child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            url.title ?? "",
                                            overflow: TextOverflow.ellipsis,
                                            maxLines: 2,
                                            style: Theme.of(context)
                                                .textTheme
                                                .titleLarge
                                                ?.copyWith(
                                                    fontSize: 32,
                                                    fontWeight: FontWeight.w600,
                                                    color: titleColor),
                                          ),
                                          const SizedBox(
                                            height: 12,
                                          ),
                                          Text(
                                            url.description ?? "",
                                            overflow: TextOverflow.ellipsis,
                                            maxLines: 2,
                                            //AppLocalizations.of(context)!.orderDetails,
                                            style: Theme.of(context)
                                                .textTheme
                                                .titleLarge
                                                ?.copyWith(
                                                    fontSize: 18,
                                                    fontWeight: FontWeight.w400,
                                                    color: descriptionColor),
                                          ),
                                          const SizedBox(
                                            height: 12,
                                          ),
                                          InkWell(
                                            onTap: () {},
                                            child: Container(
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      horizontal: 12,
                                                      vertical: 10),
                                              decoration: BoxDecoration(
                                                borderRadius:
                                                    BorderRadius.circular(5),
                                                color: buttonColor,
                                              ),
                                              child: Text(
                                                url.buttonText ?? "",
                                                style: Theme.of(context)
                                                    .textTheme
                                                    .bodyMedium!
                                                    .copyWith(
                                                        fontSize: 16,
                                                        fontWeight:
                                                            FontWeight.w600,
                                                        color: buttonTextColor),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    if (Utils.formatString(url.imageUrl)
                                        .isNotEmpty)
                                      CommonImage(
                                        imageUrl:
                                            Utils.formatString(url.imageUrl),
                                        width: screenWidth * 0.4,
                                        height: 300.0,
                                        fit: BoxFit.fill,
                                      ),
                                    SizedBox(
                                      width: screenWidth * 0.03,
                                    ),
                                  ],
                                ),
                              );
                            },
                          );
                        }).toList(),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(data.length, (index) {
                        return Selector<HomeScreenProvider, int>(
                          selector: (_, provider) => provider.currentIndex,
                          builder: (_, currentIndex, __) {
                            return Container(
                              width: currentIndex == index ? 24.0 : 9.0,
                              height: 3.0,
                              margin: const EdgeInsets.symmetric(
                                  vertical: 10.0, horizontal: 2.0),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                                color: currentIndex == index
                                    ? Colors.blueAccent
                                    : Colors.grey,
                              ),
                            );
                          },
                        );
                      }),
                    ),
                  ],
                );
        }
        return Container();
      },
      listener: (context, state) {
        if (state is SliderListConnectionError) {
          CommonFunctions.showUpSnack(
            message: AppLocalizations.of(context)!.noInternet,
            context: context,
          );
        } else if (state is SliderListFailure) {
          CommonFunctions.showUpSnack(
            message: state.sliderModel.message ?? "An error occurred",
            context: context,
          );
        }
      },
    );
  }

  Widget commonLoading(ImageChunkEvent? loadingProgress) {
    double? progressValue;

    if (loadingProgress != null && loadingProgress.expectedTotalBytes != null) {
      progressValue = loadingProgress.cumulativeBytesLoaded /
          loadingProgress.expectedTotalBytes!;
    }

    return SizedBox(
      width: 150.w,
      height: 178.0.h,
      child: Center(
        child: CircularProgressIndicator(
          value: progressValue,
        ),
      ),
    );
  }
}

class AutoScrollText extends StatefulWidget {
  final String text;
  final TextStyle? style;

  const AutoScrollText({super.key, required this.text, this.style});

  @override
  AutoScrollTextState createState() => AutoScrollTextState();
}

class AutoScrollTextState extends State<AutoScrollText>
    with SingleTickerProviderStateMixin {
  late ScrollController _scrollController;
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();

    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 20),
    )..addListener(() {
        _scrollController.jumpTo(_animationController.value *
            _scrollController.position.maxScrollExtent);
      });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.position.maxScrollExtent > 0) {
        _animationController.repeat();
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      controller: _scrollController,
      physics: const NeverScrollableScrollPhysics(),
      child: Text(
        widget.text,
        style: widget.style,
      ),
    );
  }
}


