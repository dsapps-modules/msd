import 'dart:convert';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:carousel_slider/carousel_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/config/strings.dart';
import '../../config/shared_preference_helper.dart';
import '../../config/user_shared_preference.dart';
import '../../controller/bloc/favorite_add_bloc/favorite_add_bloc.dart';
import '../../controller/bloc/favorite_add_bloc/favorite_add_event.dart';
import '../../controller/bloc/favorite_add_bloc/favorite_add_state.dart';
import '../../controller/bloc/popular_product_bloc/popular_product_bloc.dart';
import '../../controller/bloc/popular_product_bloc/popular_product_event.dart';
import '../../controller/bloc/popular_product_bloc/popular_product_state.dart';
import '../../controller/provider/cart_controler.dart';
import '../../controller/provider/common_provider.dart';
import '../../controller/provider/home_screen_provider.dart';
import '../../controller/provider/filter_controller.dart';
import '../../data/data_model/all_product_model.dart';
import '../../data/data_model/cart_model.dart';
import '../../l10n/app_localizations.dart';
import '../../router/route_name.dart';
import '../auth_screens/login_confirmation_dailog.dart';
import '../common_widgets/common_funcktion.dart';
import '../common_widgets/item_title.dart';
import 'item_card.dart';
import 'product_grid.dart';

class DesktopPopularProducts extends StatefulWidget {
  const DesktopPopularProducts({super.key, required this.title});
  final String title;
  @override
  State<DesktopPopularProducts> createState() => _DesktopPopularProductsState();
}

class _DesktopPopularProductsState extends State<DesktopPopularProducts> {
  late final PopularProductBloc _popularProductBloc;
  late final FavoriteAddBloc _favoriteAddBloc;
  late final CarouselSliderController _carouselController;
  String _token = '', _language = '', _userLat = '', _userLong = '';
  int _activeIndex = 0;
  getUserRout() async {
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
    _popularProductBloc.add(PopularProduct(
        id: '',
        categoryId: '',
        brandId: "",
        perPage: '10',
        language: _language,
        userLat: _userLat,
        userLong: _userLong,
        token: _token));
  }

  @override
  void initState() {
    _popularProductBloc = context.read<PopularProductBloc>();
    _favoriteAddBloc = context.read<FavoriteAddBloc>();
    _carouselController = CarouselSliderController();
    getUserRout();
    super.initState();
  }

  bool _isInitialLoad = true;
  List<ProductData> productData = [];
  @override
  Widget build(BuildContext context) {
    var commonProvider = Provider.of<CommonProvider>(context);
    var homeCon = Provider.of<HomeScreenProvider>(context);
    var filterCon = Provider.of<FilterController>(context);
    return BlocConsumer<PopularProductBloc, PopularProductState>(
      builder: (_, state) {
        if (state is PopularProductLoading) {
          return _buildPopularCarousel(
            context: context,
            title: widget.title,
            cards: productData,
            isLoading: true,
            onFavoriteToggle: (wishlist, id) {
              _handleFavoriteToggle(wishlist!, id);
            },
          );
        }

        if (state is PopularProductLoaded) {
          if (_isInitialLoad && state.hasConnectionError) {
            CommonFunctions.showCustomSnackBar(
                context, AppLocalizations.of(context)!.noInternet);
          }
          _isInitialLoad = false;
          productData = state.popularProductsModel.data;
          return state.popularProductsModel.data.isEmpty
              ? const SizedBox()
              : _buildPopularCarousel(
                  context: context,
                  title: widget.title,
                  cards: productData,
                  isLoading: false,
                  onFavoriteToggle: (wishlist, id) {
                    _handleFavoriteToggle(wishlist!, id);
                  },
                );
        }
        return Container();
      },
      listener: (context, state) {
        if (state is PopularProductConnectionError) {
          CommonFunctions.showUpSnack(
            message: AppLocalizations.of(context)!.noInternet,
            context: context,
          );
        }
        if (state is PopularProductFailure) {
          CommonFunctions.showUpSnack(
            message: state.popularProductsModel.message.isNotEmpty == true
                ? state.popularProductsModel.message
                : "An error occurred",
            context: context,
          );
        }
      },
    );
  }

  Widget _buildPopularCarousel({
    required BuildContext context,
    required String title,
    required List<ProductData> cards,
    required bool isLoading,
    required void Function(bool? wishlist, String id) onFavoriteToggle,
  }) {
    var commonProvider = Provider.of<CommonProvider>(context);
    var homeCon = Provider.of<HomeScreenProvider>(context);
    var filterCon = Provider.of<FilterController>(context);
    if (cards.isEmpty) {
      return const SizedBox();
    }

    return Column(
      children: [
        ItemTitle(
          title: title.isEmpty
              ? AppLocalizations.of(context)!.popular
              : title,
          subTitle: "",
          onTap: () {
            filterCon.updateSelectedValue("Popular Products");
            filterCon.setProductType("Popular Products");
            homeCon.setTabType("Products");
          },
        ),
        commonProvider.isLoading
            ? BlocListener<FavoriteAddBloc, FavoriteAddState>(
                listener: (context, state) {
                  if (state is FavoriteAddConnectionError) {
                    commonProvider.setLoading(false);
                    CommonFunctions.showCustomSnackBar(
                      context,
                      AppLocalizations.of(context)!.noInternet,
                    );
                  } else if (state is FavoriteAddFailure) {
                    commonProvider.setLoading(false);
                    CommonFunctions.showCustomSnackBar(
                      context,
                      state.authModel.message,
                    );
                  } else if (state is FavoriteAddLoaded) {
                    CommonFunctions.showCustomSnackBar(
                      color: Colors.green,
                      context,
                      state.authModel.message,
                    );
                    _popularProductBloc.add(PopularProduct(
                      id: '',
                      categoryId: '',
                      brandId: "",
                      perPage: '10',
                      language: _language,
                      userLat: _userLat,
                      userLong: _userLong,
                      token: _token,
                    ));
                    commonProvider.setLoading(false);
                  }
                },
                child: const SizedBox(),
              )
            : const SizedBox(),
        const SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, constraints) {
            final width = constraints.maxWidth;
            final viewportFraction = width > 1600
                ? 0.19
                : width > 1300
                    ? 0.24
                    : width > 1050
                        ? 0.30
                        : 0.48;

            return Column(
              children: [
                CarouselSlider.builder(
                  carouselController: _carouselController,
                  itemCount: cards.length,
                  options: CarouselOptions(
                    height: 430,
                    viewportFraction: viewportFraction,
                    enableInfiniteScroll: cards.length > 1,
                    enlargeCenterPage: false,
                    padEnds: false,
                    onPageChanged: (index, reason) {
                      if (!mounted) return;
                      setState(() {
                        _activeIndex = index;
                      });
                    },
                  ),
                  itemBuilder: (context, index, realIndex) {
                    final product = cards[index];
                    return Padding(
                      padding: const EdgeInsets.only(right: 18),
                      child: DesktopItemCart(
                        details: () {
                          final slug = (product.slug ?? '').toString();
                          if (slug.isNotEmpty) {
                            context.pushNamed(
                              RouteNames.desktopProductDisplay,
                              extra: {"slug": slug},
                            );
                          }
                        },
                        addToCart: () {
                          final cartCon = Provider.of<CartProvider>(
                            context,
                            listen: false,
                          );
                          if (product.singleVariant?.isNotEmpty == true) {
                            final variant = product.singleVariant!.first;
                            final attributesMap =
                                jsonDecode(variant.attributes ?? '{}');
                            final finalPrice = (product.flashSale != null &&
                                    product.specialPrice != null &&
                                    product.specialPrice.toString().isNotEmpty)
                                ? product.specialPrice.toString()
                                : product.specialPrice != null &&
                                        product.specialPrice.toString().isNotEmpty
                                    ? product.specialPrice.toString()
                                    : product.price.toString();

                            cartCon.addToCart(
                              CartItem(
                                storeId: Utils.formatInt(product.storeId),
                                areaId: Utils.formatInt(product.store?.areaId),
                                flashSaleId: Utils.formatInt(
                                  product.flashSale?.flashSaleId,
                                ),
                                storeName: Utils.formatString(product.store?.name),
                                storeTaxP: Utils.formatString(product.store?.tax),
                                chargeAmount: Utils.formatString(
                                  product.store?.additionalChargeAmount,
                                ),
                                chargeType: Utils.formatString(
                                  product.store?.additionalChargeType,
                                ),
                                productId: Utils.formatInt(product.id),
                                stock: Utils.formatInt(variant.stockQuantity),
                                variantId: variant.id,
                                productName: Utils.formatString(product.name),
                                variant: attributesMap.entries
                                    .map((e) => '${e.key}: ${e.value}')
                                    .join(','),
                                price: finalPrice,
                                quantity: 1,
                                cartMaxQuantity: Utils.formatInt(
                                  product.maxCartQty,
                                ),
                                image: Utils.formatString(product.imageUrl),
                              ),
                              context,
                            );
                            cartCon.loadCartItems();
                          } else if ((product.slug ?? '').toString().isNotEmpty) {
                            context.pushNamed(
                              RouteNames.desktopProductDisplay,
                              extra: {"slug": product.slug},
                            );
                          }
                        },
                        favorite: () {
                          onFavoriteToggle(product.wishlist, product.id.toString());
                        },
                        compare: () {},
                        imageUrl: (product.imageUrl ?? '').toString(),
                        title: (product.name ?? '').toString(),
                        originalPrice: (product.price ?? '').toString(),
                        discountedPrice: (product.specialPrice ?? '').toString(),
                        rating: (product.rating ?? '').toString(),
                        reviewsCount: int.tryParse((product.reviewCount ?? 0).toString()) ?? 0,
                        stockCount: int.tryParse((product.stock ?? 0).toString()) ?? 0,
                        itemId: int.tryParse((product.id ?? 0).toString()) ?? 0,
                        isWishList: product.wishlist ?? false,
                        isFeatured: product.isFeatured ?? false,
                        isFlashSale: product.flashSale != null,
                        discountPercent: product.discountPercentage,
                      ),
                    );
                  },
                ),
                const SizedBox(height: 18),
                Row(
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(999),
                        child: LinearProgressIndicator(
                          minHeight: 2.5,
                          value: cards.length <= 1
                              ? 1
                              : (_activeIndex + 1) / cards.length,
                          backgroundColor: const Color(0xFFE4E4E4),
                          valueColor: AlwaysStoppedAnimation<Color>(
                            const Color(0xFF1091D3),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 18),
                    Row(
                      children: [
                        _CarouselArrowButton(
                          icon: Icons.chevron_left_rounded,
                          onTap: () => _carouselController.previousPage(
                            duration: const Duration(milliseconds: 320),
                            curve: Curves.easeOutCubic,
                          ),
                        ),
                        const SizedBox(width: 12),
                        _CarouselArrowButton(
                          icon: Icons.chevron_right_rounded,
                          onTap: () => _carouselController.nextPage(
                            duration: const Duration(milliseconds: 320),
                            curve: Curves.easeOutCubic,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            );
          },
        ),
      ],
    );
  }

  void _handleFavoriteToggle(bool isWishlist, String id) {
    var commonProvider = Provider.of<CommonProvider>(context, listen: false);
    if (_token.isEmpty) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return const ConfirmationDialog();
        },
      );
      return;
    }

    if (isWishlist) {
      commonProvider.setLoading(true);
      _favoriteAddBloc.add(DeleteFavorites(productId: id, token: _token));
    } else {
      commonProvider.setLoading(true);
      _favoriteAddBloc.add(AddFavorites(productId: id, token: _token));
    }
  }
}

class _CarouselArrowButton extends StatelessWidget {
  const _CarouselArrowButton({
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
        width: 48,
        height: 48,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: const Color(0xFFE2E2E2)),
          color: Colors.white,
        ),
        child: Icon(
          icon,
          size: 26,
          color: Colors.black,
        ),
      ),
    );
  }
}


