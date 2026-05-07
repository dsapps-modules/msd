import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:quick_ecommerce/controller/bloc/store_dtails_bloc/store_dtails_event.dart';
import 'package:quick_ecommerce/config/images.dart';
import 'package:quick_ecommerce/screens/common_widgets/common_card.dart';
import 'package:quick_ecommerce/screens/common_widgets/no_data_widget.dart';
import 'package:quick_ecommerce/screens/common_widgets/person_avater.dart';
import 'package:quick_ecommerce/screens/home/item_card.dart';
import 'package:quick_ecommerce/screens/store_info/sore_details_screen.dart';
import '../../config/shared_preference_helper.dart';
import '../../config/strings.dart';
import '../../config/user_shared_preference.dart';
import '../../controller/bloc/favorite_add_bloc/favorite_add_bloc.dart';
import '../../controller/bloc/favorite_add_bloc/favorite_add_event.dart';
import '../../controller/bloc/store_dtails_bloc/store_dtails_bloc.dart';
import '../../controller/bloc/store_dtails_bloc/store_dtails_state.dart';
import '../../router/route_name.dart';
import '../auth_screens/login_confirmation_dailog.dart';
import '../common_widgets/common_funcktion.dart';
import '../desktop_home/product_grid.dart';

class StoreDetailWeb extends StatefulWidget {
  const StoreDetailWeb({super.key, required this.slug});
  final String slug;
  @override
  State<StoreDetailWeb> createState() => _StoreDetailWebState();
}

class _StoreDetailWebState extends State<StoreDetailWeb> {
  late final StoreDetailsBloc _storeDetailsBloc;
  late final FavoriteAddBloc _favoriteAddBloc;

  final TextEditingController searchCon = TextEditingController();
  String _token = '';
  @override
  void initState() {
    _storeDetailsBloc = context.read<StoreDetailsBloc>();
    _favoriteAddBloc = context.read<FavoriteAddBloc>();
    getUserRout();
    super.initState();
  }

  getUserRout() async {
    var token = await UserSharedPreference.getValue(
      SharedPreferenceHelper.token,
    );
    _token = token ?? "";
    _storeDetailsBloc.add(StoreDetails(slug: widget.slug, token: _token));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const _StoreDetailNavBar(),
          Expanded(
            child: BlocConsumer<StoreDetailsBloc, StoreDetailsState>(
              listener: (context, state) {
                if (state is StoreDetailsConnectionError) {
                  CommonFunctions.showUpSnack(
                    context: context,
                    message: 'Sem conexao com a internet',
                  );
                } else if (state is StoreDetailsFailure) {
                  CommonFunctions.showUpSnack(
                    context: context,
                    message: state.storeDetailsModel.message,
                  );
                }
              },
              builder: (context, state) {
                if (state is StoreDetailsLoading) {
                  return ListView.builder(
                    itemCount: 10,
                    itemBuilder: (context, index) {
                      return const ShimmerLoadingWidget();
                    },
                  );
                } else if (state is StoreDetailsLoaded) {
                  var data = state.storeDetailsModel.data!;
                  return SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CommonShopInfoCard(
                            storeName: Utils.formatString(data.name),
                            phone: Utils.formatString(data.phone),
                            email: Utils.formatString(data.email),
                            logo: Utils.formatString(data.logoUrl),
                            rating: Utils.formatString(data.rating),
                          ),
                          const SizedBox(height: 16),
                          data.allProducts == null || data.allProducts!.isEmpty
                              ? const Center(child: NoDataWidget())
                              : DesktopProductGrid(
                                  productData: data.allProducts!,
                                  physics: const NeverScrollableScrollPhysics(),
                                  onFavoriteToggle: (wishlist, id) {
                                    _handleFavoriteToggle(wishlist!, id);
                                  },
                                ),
                        ],
                      ),
                    ),
                  );
                }

                return const SizedBox();
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildShopInfoCard(String storeName, String phone, String email,
      String logo, String rating) {
    return CommonCard(
        widget: Row(
      children: [

        AvatarWidget(
            imageUrl: logo,
          radius: 50,
        ),
        const SizedBox(width: 6),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                storeName,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 2),
              Row(
                children: [
                   const Icon(
                    Icons.phone,
                    color: Colors.grey,
                    size: 14,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    phone,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 4),
              Row(
                children: [
                   Icon(
                    Icons.email,
                    color: Colors.grey,
                    size: 14,
                  ),
                  SizedBox(width: 4),
                  Text(
                    email,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 2),
              Row(
                children: [
                  StarRating(rating: rating),
                  SizedBox(width: 4),
                  Text(
                    rating,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    )
    );
  }

  void _handleFavoriteToggle(bool isWishlist, String id) {
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
      _favoriteAddBloc.add(DeleteFavorites(productId: id, token: _token));
    } else {
      _favoriteAddBloc.add(AddFavorites(productId: id, token: _token));
    }
  }
}

class _StoreDetailNavBar extends StatelessWidget {
  const _StoreDetailNavBar();

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(color: Colors.grey.shade200),
        ),
      ),
      padding: EdgeInsets.symmetric(
        horizontal: screenWidth > 1200 ? 32 : 16,
        vertical: 14,
      ),
      child: Row(
        children: [
          InkWell(
            onTap: () => context.goNamed(RouteNames.webHomeScreen),
            child: Image.asset(
              Images.logo,
              height: 38,
              width: 38,
            ),
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Wrap(
              spacing: 20,
              runSpacing: 8,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                _StoreNavItem(
                  label: 'In\u00edcio',
                  onTap: () => context.goNamed(RouteNames.webHomeScreen),
                ),
                _StoreNavItem(
                  label: 'Favoritos',
                  onTap: () => context.goNamed(RouteNames.favoritesListScreen),
                ),
                _StoreNavItem(
                  label: 'Contato',
                  onTap: () => context.goNamed(RouteNames.contactUs),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StoreNavItem extends StatelessWidget {
  const _StoreNavItem({
    required this.label,
    required this.onTap,
  });

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
        child: Text(
          label,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: const Color(0xFF0F172A),
              ),
        ),
      ),
    );
  }
}


