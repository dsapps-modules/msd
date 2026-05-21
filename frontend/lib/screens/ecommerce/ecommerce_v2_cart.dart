import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../controller/provider/cart_controler.dart';
import 'ecommerce_v2_data.dart';
import 'ecommerce_v2_widgets.dart';
import 'ecommerce_v2_models.dart';

class EcommerceCartPage extends StatefulWidget {
  const EcommerceCartPage({super.key});

  @override
  State<EcommerceCartPage> createState() => _EcommerceCartPageState();
}

class _EcommerceCartPageState extends State<EcommerceCartPage> {
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<CartProvider>().loadCartItems();
      if (mounted) setState(() => _loaded = true);
    });
  }

  double get _subtotal {
    final items = context.read<CartProvider>().cartItems;
    return items.fold(0, (sum, item) => sum + (double.tryParse(item.price) ?? 0) * item.quantity);
  }

  double get _shipping => _subtotal >= 300 ? 0 : 19.9;

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>().cartItems;
    final wide = MediaQuery.of(context).size.width >= 1100;

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: cart.length,
              currentSection: 'produtos',
              onSectionSelected: (_) => context.go('/'),
              onMenuTap: () => context.go('/'),
              onUserTap: () {
                if (kIsWeb) {
                  context.goNamed(RouteNames.webLogin);
                } else {
                  context.goNamed(RouteNames.loginScreen);
                }
              },
              onCartTap: () {},
              onSearchChanged: (_) {},
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Carrinho',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontSize: 24,
                          fontWeight: FontWeight.w900,
                          color: const Color(0xFF0F172A),
                        ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Revise os itens selecionados e siga para o checkout com um resumo claro.',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: const Color(0xFF64748B),
                        ),
                  ),
                  const SizedBox(height: 18),
                  if (!_loaded)
                    const LoadingStateCard(label: 'Carregando carrinho...')
                  else if (cart.isEmpty)
                    EmptyStateCard(
                      title: 'Seu carrinho esta vazio.',
                      subtitle: 'Adicione produtos na vitrine para seguir para o checkout.',
                      actionLabel: 'Voltar para vitrine',
                      onAction: () => context.go('/'),
                    )
                  else
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final wideLayout = constraints.maxWidth >= 1100;
                        final content = [
                          Expanded(
                            flex: wideLayout ? 3 : 1,
                            child: Column(
                              children: cart.map((item) {
                                final product = EcommerceData.productById(item.productId) ??
                                    EcommerceProduct(
                                      id: item.productId,
                                      slug: item.productId.toString(),
                                      title: item.productName,
                                      campaignSlug: '',
                                      campaignTitle: item.storeName,
                                      supplier: item.storeName,
                                      category: item.variant,
                                      description: item.productName,
                                      price: double.tryParse(item.price) ?? 0,
                                      discountPercent: 0,
                                      rating: 0,
                                      reviews: 0,
                                      stock: item.stock,
                                      maxQuantity: item.cartMaxQuantity,
                                      bannerImage: item.image.isNotEmpty ? item.image : 'assets/images/noImage.png',
                                      galleryImages: [item.image.isNotEmpty ? item.image : 'assets/images/noImage.png'],
                                      gradient: const [Color(0xFF0F172A), Color(0xFF1D4ED8)],
                                      accentColor: const Color(0xFF1D4ED8),
                                      highlights: const [],
                                    );
                                return Padding(
                                  padding: const EdgeInsets.only(bottom: 14),
                                  child: CartItemCard(
                                    product: product,
                                    quantity: item.quantity,
                                    onIncrease: () async {
                                      await context.read<CartProvider>().updateQuantity(item.productId, item.quantity + 1);
                                      if (mounted) setState(() {});
                                    },
                                    onDecrease: () async {
                                      await context.read<CartProvider>().updateQuantity(
                                            item.productId,
                                            item.quantity > 1 ? item.quantity - 1 : 1,
                                          );
                                      if (mounted) setState(() {});
                                    },
                                    onRemove: () async {
                                      await context.read<CartProvider>().deleteItem(item.productId);
                                      if (mounted) setState(() {});
                                    },
                                  ),
                                );
                              }).toList(),
                            ),
                          ),
                          const SizedBox(width: 18),
                          SizedBox(
                            width: 360,
                            child: SummaryCard(
                              items: cart.length,
                              subtotal: _subtotal,
                              shipping: _shipping,
                              total: _subtotal + _shipping,
                              primaryLabel: 'Ir para checkout',
                              paymentLabel: 'Resumo pronto',
                              onPrimaryTap: () => context.go('/checkout'),
                            ),
                          ),
                        ];

                        if (wideLayout) {
                          return Row(crossAxisAlignment: CrossAxisAlignment.start, children: content);
                        }

                        return Column(
                          children: [
                            content.first,
                            const SizedBox(height: 16),
                            SummaryCard(
                              items: cart.length,
                              subtotal: _subtotal,
                              shipping: _shipping,
                              total: _subtotal + _shipping,
                              primaryLabel: 'Ir para checkout',
                              paymentLabel: 'Resumo pronto',
                              onPrimaryTap: () => context.go('/checkout'),
                            ),
                          ],
                        );
                      },
                    ),
                  const SizedBox(height: 22),
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
