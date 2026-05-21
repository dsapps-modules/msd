import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/router/route_name.dart';
import 'package:quick_ecommerce/config/colors.dart';

import '../../controller/provider/cart_controler.dart';
import 'ecommerce_v2_data.dart';
import 'ecommerce_v2_models.dart';
import 'ecommerce_v2_widgets.dart';

class EcommerceDetailPage extends StatefulWidget {
  const EcommerceDetailPage({
    super.key,
    required this.slug,
    required this.kind,
  });

  final String slug;
  final String kind;

  @override
  State<EcommerceDetailPage> createState() => _EcommerceDetailPageState();
}

class _EcommerceDetailPageState extends State<EcommerceDetailPage> {
  int _quantity = 1;

  bool get _isCampaign => widget.kind == 'campaign';

  EcommerceProduct? get _product => EcommerceData.productBySlug(widget.slug);

  EcommerceCampaign? get _campaign => EcommerceData.campaignBySlug(widget.slug);

  Future<void> _addToCart(EcommerceProduct product) async {
    await context.read<CartProvider>().addToCart(
          EcommerceData.buildCartItem(product, quantity: _quantity),
          context,
        );
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final cartCount = context.watch<CartProvider>().cartItems.length;
    final product = _product;
    final campaign = _campaign;

    if (product == null && campaign == null) {
      return Scaffold(
        backgroundColor: const Color(0xFFF4F7FB),
        body: Center(
          child: EmptyStateCard(
            title: 'Detalhe indisponivel.',
            subtitle: 'Nao foi possivel localizar este item mockado.',
            actionLabel: 'Voltar para vitrine',
            onAction: () => context.go('/'),
          ),
        ),
      );
    }

    final title = campaign?.title ?? product!.title;
    final subtitle = campaign?.subtitle ?? product!.campaignTitle;
    final heroImage = campaign?.bannerImage ?? product!.bannerImage;
    final gradient = campaign?.gradient ?? product!.gradient;
    final campaignProducts = _isCampaign
        ? EcommerceData.productsForCampaign(campaign!)
        : <EcommerceProduct>[];
    final productList = _isCampaign ? campaignProducts : EcommerceData.relatedProducts(product!);
    final campaigns = _isCampaign
        ? (campaignProducts.isNotEmpty
            ? EcommerceData.relatedCampaigns(campaignProducts.first)
            : EcommerceData.campaigns.where((item) => item.slug != campaign!.slug).toList())
        : EcommerceData.relatedCampaigns(product!);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: cartCount,
              currentSection: _isCampaign ? 'campanhas' : 'produtos',
              onSectionSelected: (section) {
                if (section == 'inicio') {
                  context.go('/');
                } else {
                  context.go('/');
                }
              },
              onMenuTap: () => context.go('/'),
              onUserTap: () {
                if (kIsWeb) {
                  context.goNamed(RouteNames.webLogin);
                } else {
                  context.goNamed(RouteNames.loginScreen);
                }
              },
              onCartTap: () => context.go('/cart'),
              onSearchChanged: (_) {},
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 18, 16, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(30),
                      gradient: LinearGradient(colors: gradient, begin: Alignment.topLeft, end: Alignment.bottomRight),
                    ),
                    child: LayoutBuilder(
                      builder: (context, constraints) {
                        final wide = constraints.maxWidth >= 900;
                        final body = [
                          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                                _StatusBadge(text: _isCampaign ? 'Campanha' : 'Produto'),
                                const SizedBox(height: 14),
                                Text(
                                  title,
                                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                        color: Colors.white,
                                        fontWeight: FontWeight.w900,
                                        fontSize: 32,
                                        height: 1.05,
                                      ),
                                ),
                                const SizedBox(height: 10),
                                Text(
                                  subtitle,
                                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                        color: Colors.white70,
                                        height: 1.4,
                                      ),
                                ),
                                const SizedBox(height: 14),
                                Wrap(
                                  spacing: 10,
                                  runSpacing: 10,
                                  children: [
                                    _TinyPill(text: _isCampaign ? campaign!.supplier : product!.supplier),
                                    _TinyPill(text: _isCampaign ? money(campaign!.goal) : money(product!.finalPrice)),
                                    _TinyPill(text: _isCampaign ? campaign!.period : product!.category),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 18),
                          Expanded(
                            child: Column(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(24),
                                  child: Image.asset(heroImage, height: 270, width: double.infinity, fit: BoxFit.cover),
                                ),
                                const SizedBox(height: 12),
                                SizedBox(
                                  height: 80,
                                  child: ListView.separated(
                                    scrollDirection: Axis.horizontal,
                                    itemCount: _isCampaign ? productList.length : product!.galleryImages.length,
                                    separatorBuilder: (_, __) => const SizedBox(width: 10),
                                    itemBuilder: (_, index) {
                                      final image = _isCampaign
                                          ? productList[index].bannerImage
                                          : product!.galleryImages[index];
                                      return ClipRRect(
                                        borderRadius: BorderRadius.circular(18),
                                        child: Image.asset(image, width: 80, height: 80, fit: BoxFit.cover),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ];

                        return wide
                            ? Row(crossAxisAlignment: CrossAxisAlignment.start, children: body)
                            : Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  body.first,
                                  const SizedBox(height: 18),
                                  body.last,
                                ],
                              );
                      },
                    ),
                  ),
                  const SizedBox(height: 18),
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final wide = constraints.maxWidth >= 1100;
                      final main = Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _DetailCard(
                            title: _isCampaign ? 'Sobre a campanha' : 'Descricao do produto',
                            child: Text(
                              campaign?.description ?? product!.description,
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                    color: const Color(0xFF334155),
                                    height: 1.5,
                                  ),
                            ),
                          ),
                          const SizedBox(height: 14),
                          _DetailCard(
                            title: _isCampaign ? 'Produtos da campanha' : 'Destaques',
                            child: Wrap(
                              spacing: 10,
                              runSpacing: 10,
                              children: _isCampaign
                                  ? (productList.isEmpty
                                      ? const [_TinyPill(text: 'Nenhum produto vinculado')]
                                      : productList
                                          .map((item) => _TinyPill(text: item.title))
                                          .toList())
                                  : product!.highlights
                                      .map((item) => _TinyPill(text: item.toString()))
                                      .toList(),
                            ),
                          ),
                          const SizedBox(height: 14),
                          _DetailCard(
                            title: 'Relacionados',
                            child: _isCampaign
                                ? Wrap(
                                    spacing: 10,
                                    runSpacing: 10,
                                    children: campaigns
                                        .map(
                                          (item) => ActionChip(
                                            label: Text(item.title),
                                            onPressed: () => context.go('/produto/${item.slug}?kind=campaign'),
                                          ),
                                        )
                                        .toList(),
                                  )
                                : Wrap(
                                    spacing: 10,
                                    runSpacing: 10,
                                    children: campaigns
                                        .map(
                                          (item) => ActionChip(
                                            label: Text(item.title),
                                            onPressed: () => context.go('/produto/${item.slug}?kind=campaign'),
                                          ),
                                        )
                                        .toList(),
                                  ),
                          ),
                        ],
                      );

                      final side = _PurchasePanel(
                        label: _isCampaign ? 'Comprar item principal' : 'Adicionar ao carrinho',
                        price: _isCampaign ? campaign!.goal : product!.finalPrice,
                        quantity: _quantity,
                        onIncrease: () => setState(() => _quantity += 1),
                        onDecrease: () {
                          if (_quantity > 1) setState(() => _quantity -= 1);
                        },
                        onTap: () {
                          final target = _isCampaign
                              ? (campaignProducts.isNotEmpty ? campaignProducts.first : null)
                              : product;
                          if (target == null) {
                            return;
                          }
                          _addToCart(target);
                        },
                      );

                      if (wide) {
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(flex: 3, child: main),
                            const SizedBox(width: 18),
                            SizedBox(width: 360, child: side),
                          ],
                        );
                      }

                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          main,
                          const SizedBox(height: 14),
                          side,
                        ],
                      );
                    },
                  ),
                  const SizedBox(height: 24),
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

class _DetailCard extends StatelessWidget {
  const _DetailCard({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _PurchasePanel extends StatelessWidget {
  const _PurchasePanel({
    required this.label,
    required this.price,
    required this.quantity,
    required this.onIncrease,
    required this.onDecrease,
    required this.onTap,
  });

  final String label;
  final double price;
  final int quantity;
  final VoidCallback onIncrease;
  final VoidCallback onDecrease;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 10),
          Text(
            money(price),
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w900,
                ),
          ),
          const SizedBox(height: 14),
          QuantitySelector(quantity: quantity, onIncrease: onIncrease, onDecrease: onDecrease),
          const SizedBox(height: 14),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: onTap,
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomColors.baseColor,
                foregroundColor: Colors.white,
                elevation: 0,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: const Text('Adicionar ao carrinho'),
            ),
          ),
        ],
      ),
    );
  }
}

class _TinyPill extends StatelessWidget {
  const _TinyPill({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Text(text, style: Theme.of(context).textTheme.labelSmall?.copyWith(fontWeight: FontWeight.w700)),
    );
  }
}

class _StatusBadge extends StatelessWidget {
  const _StatusBadge({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.16),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withOpacity(0.18)),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.labelLarge?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w800,
            ),
      ),
    );
  }
}
