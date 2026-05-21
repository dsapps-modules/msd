import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../config/colors.dart';
import '../../controller/provider/cart_controler.dart';
import 'ecommerce_components.dart';
import 'ecommerce_mock_data.dart';
import 'ecommerce_models.dart';

class EcommerceCartScreen extends StatefulWidget {
  const EcommerceCartScreen({super.key});

  @override
  State<EcommerceCartScreen> createState() => _EcommerceCartScreenState();
}

class _EcommerceCartScreenState extends State<EcommerceCartScreen> {
  bool _booted = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<CartProvider>().loadCartItems();
      if (!mounted) {
        return;
      }
      setState(() {
        _booted = true;
      });
    });
  }

  double get _shipping {
    final subtotal = _subtotal;
    if (subtotal >= 300) {
      return 0;
    }
    return 19.9;
  }

  double get _subtotal {
    final cart = context.read<CartProvider>().cartItems;
    return cart.fold<double>(
      0,
      (sum, item) => sum + (double.tryParse(item.price) ?? 0) * item.quantity,
    );
  }

  double get _total => _subtotal + _shipping;

  @override
  Widget build(BuildContext context) {
    final cartProvider = context.watch<CartProvider>();
    final cart = cartProvider.cartItems;
    final isDesktop = MediaQuery.of(context).size.width >= 1100;

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: cart.length,
              selectedMenu: 'produtos',
              onMenuSelected: (value) {
                if (value == 'inicio') {
                  context.go('/');
                } else {
                  context.go('/');
                }
              },
              onCartTap: () {},
              onUserTap: () {
                if (kIsWeb) {
                  context.goNamed(RouteNames.webLogin);
                } else {
                  context.goNamed(RouteNames.loginScreen);
                }
              },
              showSearchField: false,
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 18, 16, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  EcommerceSectionHeader(
                    title: 'Carrinho',
                    subtitle:
                        'Ajuste quantidades, remova itens e siga para o checkout sem perder o contexto visual.',
                    actionLabel: 'Continuar comprando',
                    onActionTap: () => context.go('/'),
                  ),
                  const SizedBox(height: 16),
                  if (!_booted)
                    const EcommerceLoadingState(message: 'Carregando carrinho...')
                  else if (cart.isEmpty)
                    EcommerceEmptyState(
                      title: 'Seu carrinho está vazio.',
                      subtitle:
                          'Volte para a vitrine e adicione produtos ou campanhas para continuar.',
                      actionLabel: 'Voltar para vitrine',
                      onActionTap: () => context.go('/'),
                    )
                  else
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final wide = constraints.maxWidth >= 1100;
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              flex: wide ? 3 : 1,
                              child: Column(
                                children: [
                                  ...cart.map((item) {
                                    final product = EcommerceMockData
                                            .productByCartProductId(
                                              item.productId,
                                            ) ??
                                        EcommerceProduct(
                                          id: item.productId,
                                          slug: item.productId.toString(),
                                          campaignSlug: '',
                                          campaignTitle: item.storeName,
                                          supplier: item.storeName,
                                          category: item.variant,
                                          description: item.productName,
                                          price:
                                              double.tryParse(item.price) ?? 0,
                                          financialGoal: 0,
                                          status: 'Item',
                                          discountPercent: 0,
                                          rating: 0,
                                          reviews: 0,
                                          stock: item.stock,
                                          maxQuantity: item.cartMaxQuantity,
                                          bannerImage: item.image.isNotEmpty
                                              ? item.image
                                              : 'assets/images/noImage.png',
                                          galleryImages: [
                                            item.image.isNotEmpty
                                                ? item.image
                                                : 'assets/images/noImage.png',
                                          ],
                                          bannerGradient: const [
                                            Color(0xFF0F172A),
                                            Color(0xFF1D4ED8),
                                          ],
                                          accentColor: CustomColors.baseColor,
                                          features: const [],
                                        );
                                    return Padding(
                                      padding: const EdgeInsets.only(bottom: 14),
                                      child: EcommerceCartItemCard(
                                        item: product,
                                        quantity: item.quantity,
                                        onIncrease: () async {
                                          await context
                                              .read<CartProvider>()
                                              .updateQuantity(
                                                item.productId,
                                                item.quantity + 1,
                                              );
                                          if (!mounted) {
                                            return;
                                          }
                                          setState(() {});
                                        },
                                        onDecrease: () async {
                                          await context
                                              .read<CartProvider>()
                                              .updateQuantity(
                                                item.productId,
                                                item.quantity > 1
                                                    ? item.quantity - 1
                                                    : 1,
                                              );
                                          if (!mounted) {
                                            return;
                                          }
                                          setState(() {});
                                        },
                                        onRemove: () async {
                                          await context
                                              .read<CartProvider>()
                                              .deleteItem(item.productId);
                                          if (!mounted) {
                                            return;
                                          }
                                          setState(() {});
                                        },
                                      ),
                                    );
                                  }),
                                ],
                              ),
                            ),
                            if (wide) ...[
                              const SizedBox(width: 18),
                              SizedBox(
                                width: 360,
                                child: EcommerceCheckoutSummary(
                                  itemsCount: cart.length,
                                  subtotal: _subtotal,
                                  shipping: _shipping,
                                  total: _total,
                                  paymentMethod: 'Resumo pronto',
                                  primaryLabel: 'Ir para checkout',
                                  onPrimaryAction: () => context.go('/checkout'),
                                ),
                              ),
                            ],
                          ],
                        );
                      },
                    ),
                  if (!_booted || cart.isEmpty) const SizedBox.shrink(),
                  if (_booted && cart.isNotEmpty && !isDesktop) ...[
                    const SizedBox(height: 16),
                    EcommerceCheckoutSummary(
                      itemsCount: cart.length,
                      subtotal: _subtotal,
                      shipping: _shipping,
                      total: _total,
                      paymentMethod: 'Resumo pronto',
                      primaryLabel: 'Ir para checkout',
                      onPrimaryAction: () => context.go('/checkout'),
                    ),
                  ],
                  const SizedBox(height: 26),
                  const EcommerceFooter(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
