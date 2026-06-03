import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/config/colors.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../controller/provider/cart_controler.dart';
import 'ecommerce_components.dart';
import 'ecommerce_mock_data.dart';
import 'ecommerce_models.dart';

class EcommerceProductDetailScreen extends StatefulWidget {
  const EcommerceProductDetailScreen({
    super.key,
    required this.slug,
    required this.type,
  });

  final String slug;
  final String type;

  @override
  State<EcommerceProductDetailScreen> createState() =>
      _EcommerceProductDetailScreenState();
}

class _EcommerceProductDetailScreenState
    extends State<EcommerceProductDetailScreen> {
  int _quantity = 1;
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

  bool get _isCampaignDetail =>
      widget.type == 'campaign' ||
      EcommerceMockData.campaignBySlug(widget.slug) != null;

  EcommerceProduct? get _product => EcommerceMockData.productBySlug(widget.slug);
  EcommerceCampaign? get _campaign =>
      EcommerceMockData.campaignBySlug(widget.slug);

  Future<void> _addToCart(EcommerceProduct product) async {
    await context.read<CartProvider>().addToCart(
          EcommerceMockData.buildCartItem(product, quantity: _quantity),
          context,
        );
    if (!mounted) {
      return;
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final cartCount = context.watch<CartProvider>().cartItems.length;
    final product = _product;
    final campaign = _campaign;
    final isDesktop = MediaQuery.of(context).size.width >= 1100;
    final title = campaign?.title ?? product?.title ?? '';

    if (product == null && campaign == null) {
      return Scaffold(
        backgroundColor: const Color(0xFFF4F7FB),
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                EcommerceHeader(
                  cartCount: cartCount,
                  selectedMenu: 'produtos',
                  onMenuSelected: (value) {
                    if (value == 'inicio') {
                      context.go('/');
                    }
                  },
                  onCartTap: () => context.go('/cart'),
                  onUserTap: () {
                    if (kIsWeb) {
                      context.goNamed(RouteNames.webLogin);
                    } else {
                      context.goNamed(RouteNames.loginScreen);
                    }
                  },
                ),
                const SizedBox(height: 24),
                EcommerceEmptyState(
                    title: 'Detalhe indisponível.',
                    subtitle:
                        'Não conseguimos localizar este produto ou campanha mockada.',
                    actionLabel: 'Voltar para vitrine',
                    onActionTap: () => context.go('/'),
                  ),
              ],
            ),
          ),
        ),
      );
    }

    final heroGradient = campaign?.bannerGradient ?? product!.bannerGradient;
    final heroImage = campaign?.bannerImage ?? product!.bannerImage;
    final relatedProducts = _isCampaignDetail
        ? EcommerceMockData.products
            .where((item) => item.campaignSlug == campaign!.slug)
            .toList()
        : EcommerceMockData.relatedProductsFor(product!);
    final relatedCampaigns = _isCampaignDetail
        ? EcommerceMockData.campaigns
            .where((item) => item.slug != campaign!.slug)
            .toList()
        : EcommerceMockData.relatedCampaignsFor(product!);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: cartCount,
              selectedMenu: _isCampaignDetail ? 'campanhas' : 'produtos',
              onMenuSelected: (value) {
                if (value == 'inicio') {
                  context.go('/');
                } else if (value == 'campanhas') {
                  context.go('/');
                } else if (value == 'produtos') {
                  context.go('/');
                } else if (value == 'ofertas') {
                  context.go('/');
                }
              },
              onCartTap: () => context.go('/cart'),
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
                  _Breadcrumb(
                    title: _isCampaignDetail ? 'Campanha' : 'Produto',
                    current: title,
                  ),
                  const SizedBox(height: 16),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(28),
                      gradient: LinearGradient(
                        colors: heroGradient,
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      boxShadow: const [
                        BoxShadow(
                          color: Color(0x260F172A),
                          blurRadius: 24,
                          offset: Offset(0, 18),
                        ),
                      ],
                    ),
                    child: LayoutBuilder(
                      builder: (context, constraints) {
                        final wide = constraints.maxWidth >= 900;
                        final hero = wide
                            ? Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Expanded(child: _heroText(context, product, campaign)),
                                  const SizedBox(width: 18),
                                  Expanded(
                                    child: _heroGallery(
                                      context,
                                      heroImage,
                                      product,
                                      campaign,
                                    ),
                                  ),
                                ],
                              )
                            : Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  _heroText(context, product, campaign),
                                  const SizedBox(height: 18),
                                  _heroGallery(
                                    context,
                                    heroImage,
                                    product,
                                    campaign,
                                  ),
                                ],
                              );
                        return hero;
                      },
                    ),
                  ),
                  const SizedBox(height: 18),
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final wide = constraints.maxWidth >= 1100;
                      return Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: wide ? 3 : 1,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                _InfoCard(
                                  title: _isCampaignDetail
                                      ? 'Sobre a campanha'
                                      : 'Descrição do produto',
                                  child: Text(
                                    campaign?.description ?? product!.description,
                                    style: Theme.of(context)
                                        .textTheme
                                        .bodyMedium
                                        ?.copyWith(
                                          color: const Color(0xFF334155),
                                          height: 1.55,
                                        ),
                                  ),
                                ),
                                const SizedBox(height: 16),
                                _InfoCard(
                                  title: _isCampaignDetail
                                      ? 'Objetivo financeiro'
                                      : 'Especificações',
                                  child: _isCampaignDetail
                                      ? _GoalList(
                                          campaign: campaign!,
                                        )
                                      : Wrap(
                                          spacing: 10,
                                          runSpacing: 10,
                                          children: product!.features
                                              .map(
                                                (feature) => _MiniChip(
                                                  text: feature,
                                                ),
                                              )
                                              .toList(),
                                        ),
                                ),
                                const SizedBox(height: 16),
                                _InfoCard(
                                  title: 'Conteúdo relacionado',
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'Campanhas e produtos relacionados à mesma narrativa.',
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodySmall
                                            ?.copyWith(
                                              color: const Color(0xFF64748B),
                                            ),
                                      ),
                                      const SizedBox(height: 14),
                                      if (relatedProducts.isEmpty)
                                        const EcommerceEmptyState(
                                          title: 'Sem produtos relacionados.',
                                          subtitle:
                                              'A campanha não possui itens relacionados neste mock.',
                                        )
                                      else
                                        _RelatedProductsGrid(
                                          products: relatedProducts,
                                          onTap: (item) => context.go(
                                            '/produto/${item.slug}',
                                          ),
                                          onAddToCart: _addToCart,
                                        ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          if (wide) ...[
                            const SizedBox(width: 18),
                            SizedBox(
                              width: 360,
                              child: Column(
                                children: [
                                  _PurchaseCard(
                                    title: _isCampaignDetail
                                        ? 'Adicionar destaque'
                                        : 'Quantidade e compra',
                                    price: _isCampaignDetail
                                        ? campaign!.financialGoal
                                        : product!.discountedPrice,
                                    description: _isCampaignDetail
                                        ? 'Adicione o produto principal da campanha ao carrinho.'
                                        : 'Selecione a quantidade e envie o item para o carrinho.',
                                    quantity: _quantity,
                                    onDecrease: () {
                                      if (_quantity == 1) {
                                        return;
                                      }
                                      setState(() {
                                        _quantity -= 1;
                                      });
                                    },
                                    onIncrease: () {
                                      setState(() {
                                        _quantity += 1;
                                      });
                                    },
                                    onAdd: () {
                                      final target = _isCampaignDetail
                                          ? EcommerceMockData.productBySlug(
                                              campaign!.productSlugs.first,
                                            )
                                          : product;
                                      if (target == null) {
                                        return;
                                      }
                                      _addToCart(target);
                                    },
                                    booted: _booted,
                                  ),
                                  const SizedBox(height: 16),
                                  _InfoCard(
                                    title: 'Campanhas relacionadas',
                                    child: relatedCampaigns.isEmpty
                                        ? const Text(
                                            'Nenhuma campanha relacionada encontrada.',
                                          )
                                        : Wrap(
                                            spacing: 8,
                                            runSpacing: 8,
                                            children: relatedCampaigns
                                                .map(
                                                  (item) => ActionChip(
                                                    label: Text(item.title),
                                                    onPressed: () => context.go(
                                                      '/produto/${item.slug}?type=campaign',
                                                    ),
                                                  ),
                                                )
                                                .toList(),
                                          ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ],
                      );
                    },
                  ),
                  if (!isDesktop) ...[
                    const SizedBox(height: 16),
                    _PurchaseCard(
                      title: _isCampaignDetail
                          ? 'Adicionar destaque'
                          : 'Quantidade e compra',
                      price: _isCampaignDetail
                          ? campaign!.financialGoal
                          : product!.discountedPrice,
                      description: _isCampaignDetail
                          ? 'Adicione o produto principal da campanha ao carrinho.'
                          : 'Selecione a quantidade e envie o item para o carrinho.',
                      quantity: _quantity,
                      onDecrease: () {
                        if (_quantity == 1) {
                          return;
                        }
                        setState(() {
                          _quantity -= 1;
                        });
                      },
                      onIncrease: () {
                        setState(() {
                          _quantity += 1;
                        });
                      },
                      onAdd: () {
                        final target = _isCampaignDetail
                            ? EcommerceMockData.productBySlug(
                                campaign!.productSlugs.first,
                              )
                            : product;
                        if (target == null) {
                          return;
                        }
                        _addToCart(target);
                      },
                      booted: _booted,
                    ),
                    const SizedBox(height: 16),
                    _InfoCard(
                      title: 'Campanhas relacionadas',
                      child: relatedCampaigns.isEmpty
                          ? const Text('Nenhuma campanha relacionada encontrada.')
                          : Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: relatedCampaigns
                                  .map(
                                    (item) => ActionChip(
                                      label: Text(item.title),
                                      onPressed: () => context.go(
                                        '/produto/${item.slug}?type=campaign',
                                      ),
                                    ),
                                  )
                                  .toList(),
                            ),
                    ),
                  ],
                  const SizedBox(height: 24),
                  EcommerceSectionHeader(
                    title: 'Relacionados',
                    subtitle: 'Produtos e campanhas que seguem a mesma linha visual.',
                  ),
                  const SizedBox(height: 14),
                  if (relatedProducts.isNotEmpty)
                    _RelatedProductsGrid(
                      products: relatedProducts,
                      onTap: (item) => context.go('/produto/${item.slug}'),
                      onAddToCart: _addToCart,
                    ),
                  const SizedBox(height: 18),
                  if (relatedCampaigns.isNotEmpty)
                    _RelatedCampaignRow(
                      campaigns: relatedCampaigns,
                      onTap: (item) => context.go(
                        '/produto/${item.slug}?type=campaign',
                      ),
                    ),
                  const SizedBox(height: 28),
                  const EcommerceFooter(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _heroText(
    BuildContext context,
    EcommerceProduct? product,
    EcommerceCampaign? campaign,
  ) {
    final isCampaign = _isCampaignDetail;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _MiniBadge(text: isCampaign ? 'Campanha' : 'Produto'),
        const SizedBox(height: 14),
        Text(
          campaign?.title ?? product!.title,
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                color: Colors.white,
                fontSize: 32,
                fontWeight: FontWeight.w900,
                height: 1.06,
              ),
        ),
        const SizedBox(height: 10),
        Text(
          isCampaign ? campaign!.subtitle : product!.campaignTitle,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.white70,
                height: 1.4,
              ),
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            _MiniChip(text: isCampaign ? campaign!.supplier : product!.supplier),
            _MiniChip(
              text: isCampaign
                  ? 'Meta ${formatEcommerceMoney(campaign!.financialGoal)}'
                  : formatEcommerceMoney(product!.discountedPrice),
            ),
            _MiniChip(text: isCampaign ? campaign!.period : product!.status),
          ],
        ),
        const SizedBox(height: 18),
        Text(
          isCampaign
              ? campaign!.objective
              : 'Pronto para detalhar a oferta, o fornecedor e o apelo comercial do produto.',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.white70,
                height: 1.45,
              ),
        ),
      ],
    );
  }

  Widget _heroGallery(
    BuildContext context,
    String heroImage,
    EcommerceProduct? product,
    EcommerceCampaign? campaign,
  ) {
    final images = _isCampaignDetail
        ? (campaign?.productSlugs
                .map(
                  (slug) =>
                      EcommerceMockData.productBySlug(slug)?.bannerImage ??
                      heroImage,
                )
                .toList() ??
            const <String>[])
        : product!.galleryImages;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
      ),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(22),
            child: Image.asset(
              heroImage,
              height: 240,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 78,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: images.length,
              separatorBuilder: (_, __) => const SizedBox(width: 10),
              itemBuilder: (context, index) {
                return ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Image.asset(
                    images[index],
                    width: 78,
                    height: 78,
                    fit: BoxFit.cover,
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _Breadcrumb extends StatelessWidget {
  const _Breadcrumb({
    required this.title,
    required this.current,
  });

  final String title;
  final String current;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: 8,
      children: [
        Text(
          'Início',
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: const Color(0xFF64748B),
              ),
        ),
        const Icon(Icons.chevron_right_rounded, size: 16),
        Text(
          title,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: const Color(0xFF64748B),
              ),
        ),
        const Icon(Icons.chevron_right_rounded, size: 16),
        Text(
          current,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: const Color(0xFF0F172A),
                fontWeight: FontWeight.w800,
              ),
        ),
      ],
    );
  }
}

class _InfoCard extends StatelessWidget {
  const _InfoCard({
    required this.title,
    required this.child,
  });

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
        boxShadow: const [
          BoxShadow(
            color: Color(0x0F0F172A),
            blurRadius: 18,
            offset: Offset(0, 10),
          ),
        ],
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

class _GoalList extends StatelessWidget {
  const _GoalList({required this.campaign});

  final EcommerceCampaign campaign;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        _MiniChip(text: 'Fornecedor ${campaign.supplier}'),
        _MiniChip(text: 'Período ${campaign.period}'),
        _MiniChip(text: 'Meta ${formatEcommerceMoney(campaign.financialGoal)}'),
      ],
    );
  }
}

class _MiniChip extends StatelessWidget {
  const _MiniChip({required this.text});

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
      child: Text(
        text,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: const Color(0xFF334155),
              fontWeight: FontWeight.w700,
            ),
      ),
    );
  }
}

class _MiniBadge extends StatelessWidget {
  const _MiniBadge({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withValues(alpha: 0.16)),
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

class _PurchaseCard extends StatelessWidget {
  const _PurchaseCard({
    required this.title,
    required this.price,
    required this.description,
    required this.quantity,
    required this.onDecrease,
    required this.onIncrease,
    required this.onAdd,
    required this.booted,
  });

  final String title;
  final double price;
  final String description;
  final int quantity;
  final VoidCallback onDecrease;
  final VoidCallback onIncrease;
  final VoidCallback onAdd;
  final bool booted;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0F0F172A),
            blurRadius: 18,
            offset: Offset(0, 10),
          ),
        ],
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
          const SizedBox(height: 10),
          Text(
            description,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                  height: 1.4,
                ),
          ),
          const SizedBox(height: 14),
          Text(
            formatEcommerceMoney(price),
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w900,
                ),
          ),
          const SizedBox(height: 14),
          EcommerceQuantitySelector(
            quantity: quantity,
            onIncrease: onIncrease,
            onDecrease: onDecrease,
          ),
          const SizedBox(height: 14),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: booted ? onAdd : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomColors.baseColor,
                foregroundColor: Colors.white,
                elevation: 0,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text('Adicionar ao carrinho'),
            ),
          ),
        ],
      ),
    );
  }
}

class _RelatedProductsGrid extends StatelessWidget {
  const _RelatedProductsGrid({
    required this.products,
    required this.onTap,
    required this.onAddToCart,
  });

  final List<EcommerceProduct> products;
  final void Function(EcommerceProduct item) onTap;
  final Future<void> Function(EcommerceProduct item) onAddToCart;

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width >= 900;
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: products.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: isWide ? 2 : 1,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: isWide ? 1.72 : 1.18,
      ),
      itemBuilder: (context, index) {
        final product = products[index];
        return EcommerceProductCard(
          product: product,
          priceFormatter: formatEcommerceMoney,
          onTap: () => onTap(product),
          onAddToCart: () => onAddToCart(product),
        );
      },
    );
  }
}

class _RelatedCampaignRow extends StatelessWidget {
  const _RelatedCampaignRow({
    required this.campaigns,
    required this.onTap,
  });

  final List<EcommerceCampaign> campaigns;
  final void Function(EcommerceCampaign item) onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 188,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: campaigns.length,
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (context, index) {
          final campaign = campaigns[index];
          return SizedBox(
            width: 320,
            child: EcommerceCampaignCard(
              campaign: campaign,
              onTap: () => onTap(campaign),
            ),
          );
        },
      ),
    );
  }
}
