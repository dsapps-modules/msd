import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../controller/provider/cart_controler.dart';
import 'ecommerce_components.dart';
import 'ecommerce_mock_data.dart';
import 'ecommerce_models.dart';

class EcommerceHomeScreen extends StatefulWidget {
  const EcommerceHomeScreen({super.key});

  @override
  State<EcommerceHomeScreen> createState() => _EcommerceHomeScreenState();
}

class _EcommerceHomeScreenState extends State<EcommerceHomeScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final GlobalKey _heroKey = GlobalKey();
  final GlobalKey _campaignsKey = GlobalKey();
  final GlobalKey _productsKey = GlobalKey();

  String _selectedMenu = 'inicio';
  String _search = '';
  String _category = 'Todos';
  String _supplier = 'Todos';
  String _status = 'Todos';
  String _sortMode = 'relevancia';
  double _minPrice = 0;
  double _maxPrice = 300;
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

  List<EcommerceProduct> get _allProducts {
    final items = EcommerceMockData.products.toList();

    items.sort((a, b) {
      switch (_sortMode) {
        case 'menor-preco':
          return a.discountedPrice.compareTo(b.discountedPrice);
        case 'maior-preco':
          return b.discountedPrice.compareTo(a.discountedPrice);
        case 'melhor-avaliacao':
          return b.rating.compareTo(a.rating);
        default:
          return 0;
      }
    });

    return items.where((product) {
      final query = _search.trim().toLowerCase();
      final matchesSearch = query.isEmpty ||
          product.title.toLowerCase().contains(query) ||
          product.campaignTitle.toLowerCase().contains(query) ||
          product.supplier.toLowerCase().contains(query);
      final matchesCategory =
          _category == 'Todos' || product.category == _category;
      final matchesSupplier =
          _supplier == 'Todos' || product.supplier == _supplier;
      final matchesPrice =
          product.discountedPrice >= _minPrice &&
          product.discountedPrice <= _maxPrice;

      final matchesStatus = switch (_status) {
        'Disponível' => product.status == 'Disponível',
        'Em destaque' => product.status == 'Em destaque',
        'Oferta' => product.isOffer,
        'Esgotado' => product.stock <= 0,
        _ => true,
      };

      final menuFilter = switch (_selectedMenu) {
        'produtos' => true,
        'ofertas' => product.isOffer,
        _ => true,
      };

      return matchesSearch &&
          matchesCategory &&
          matchesSupplier &&
          matchesStatus &&
          matchesPrice &&
          menuFilter;
    }).toList();
  }

  List<EcommerceCampaign> get _filteredCampaigns {
    final query = _search.trim().toLowerCase();
    return EcommerceMockData.campaigns.where((campaign) {
      final matchesSearch = query.isEmpty ||
          campaign.title.toLowerCase().contains(query) ||
          campaign.description.toLowerCase().contains(query) ||
          campaign.supplier.toLowerCase().contains(query);
      final matchesSupplier =
          _supplier == 'Todos' || campaign.supplier == _supplier;
      final matchesStatus =
          _status == 'Todos' || campaign.status == _status;
      final matchesMenu = _selectedMenu != 'produtos';
      return matchesSearch && matchesSupplier && matchesStatus && matchesMenu;
    }).toList();
  }

  double get _subtotal {
    final cart = context.read<CartProvider>().cartItems;
    return cart.fold<double>(
      0,
      (sum, item) => sum + (double.tryParse(item.price) ?? 0) * item.quantity,
    );
  }

  int get _cartCount => context.watch<CartProvider>().cartItems.length;

  void _scrollTo(GlobalKey key) {
    final context = key.currentContext;
    if (context == null) {
      return;
    }
    Scrollable.ensureVisible(
      context,
      duration: const Duration(milliseconds: 420),
      curve: Curves.easeInOut,
      alignment: 0.02,
    );
  }

  void _handleMenuSelected(String menu) {
    setState(() => _selectedMenu = menu);
    switch (menu) {
      case 'campanhas':
        _scrollTo(_campaignsKey);
        break;
      case 'produtos':
      case 'ofertas':
        _scrollTo(_productsKey);
        break;
      default:
        _scrollTo(_heroKey);
    }
  }

  Future<void> _addToCart(EcommerceProduct product) async {
    await context.read<CartProvider>().addToCart(
          EcommerceMockData.buildCartItem(product),
          context,
        );
    if (!mounted) {
      return;
    }
    setState(() {});
  }

  void _openCart() {
    _scaffoldKey.currentState?.openEndDrawer();
  }

  void _goToLogin() {
    if (kIsWeb) {
      context.goNamed(RouteNames.webLogin);
    } else {
      context.goNamed(RouteNames.loginScreen);
    }
  }

  void _openMobileFilters() {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return DraggableScrollableSheet(
          initialChildSize: 0.92,
          minChildSize: 0.72,
          maxChildSize: 0.98,
          builder: (_, controller) {
            return Container(
              decoration: const BoxDecoration(
                color: Color(0xFFF4F7FB),
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: SingleChildScrollView(
                controller: controller,
                padding: const EdgeInsets.all(16),
                child: EcommerceFilterSidebar(
                  category: _category,
                  supplier: _supplier,
                  status: _status,
                  minPrice: _minPrice,
                  maxPrice: _maxPrice,
                  sortMode: _sortMode,
                  onCategoryChanged: (value) => setState(() => _category = value),
                  onSupplierChanged: (value) => setState(() => _supplier = value),
                  onStatusChanged: (value) => setState(() => _status = value),
                  onMinPriceChanged: (value) => setState(() => _minPrice = value),
                  onMaxPriceChanged: (value) => setState(() => _maxPrice = value),
                  onSortModeChanged: (value) => setState(() => _sortMode = value),
                  onClear: _clearFilters,
                  compact: true,
                ),
              ),
            );
          },
        );
      },
    );
  }

  void _clearFilters() {
    setState(() {
      _category = 'Todos';
      _supplier = 'Todos';
      _status = 'Todos';
      _sortMode = 'relevancia';
      _minPrice = 0;
      _maxPrice = 300;
    });
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>().cartItems;
    final products = _allProducts;
    final campaigns = _filteredCampaigns;
    final isDesktop = MediaQuery.of(context).size.width >= 1100;
    final isTablet = MediaQuery.of(context).size.width >= 720;
    final crossAxisCount = isDesktop ? 3 : isTablet ? 2 : 1;

    final offerProducts = products.where((product) => product.isOffer).toList();
    final visibleProducts = switch (_selectedMenu) {
      'campanhas' => const <EcommerceProduct>[],
      'ofertas' => offerProducts,
      _ => products,
    };

    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: const Color(0xFFF4F7FB),
      endDrawer: EcommerceMiniCartDrawer(
        items: cart,
        onIncrease: (item) async {
          final product = EcommerceMockData.productByCartProductId(item.productId);
          if (product == null) {
            return;
          }
          await context.read<CartProvider>().updateQuantity(
                item.productId,
                item.quantity + 1,
              );
          if (!mounted) {
            return;
          }
          setState(() {});
        },
        onDecrease: (item) async {
          await context.read<CartProvider>().updateQuantity(
                item.productId,
                item.quantity > 1 ? item.quantity - 1 : 1,
              );
          if (!mounted) {
            return;
          }
          setState(() {});
        },
        onRemove: (item) async {
          await context.read<CartProvider>().deleteItem(item.productId);
          if (!mounted) {
            return;
          }
          setState(() {});
        },
        onCheckout: () => context.go('/checkout'),
        onOpenCart: () {
          Navigator.of(context).pop();
          context.go('/cart');
        },
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: _cartCount,
              selectedMenu: _selectedMenu,
              onMenuSelected: _handleMenuSelected,
              onCartTap: _openCart,
              onUserTap: _goToLogin,
              onSearchChanged: (value) {
                setState(() {
                  _search = value;
                });
              },
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 18, 16, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHero(context),
                  const SizedBox(height: 18),
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final wide = constraints.maxWidth >= 1100;
                      final showSidebar = wide;

                      return Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (showSidebar) ...[
                            SizedBox(
                              width: 320,
                              child: EcommerceFilterSidebar(
                                category: _category,
                                supplier: _supplier,
                                status: _status,
                                minPrice: _minPrice,
                                maxPrice: _maxPrice,
                                sortMode: _sortMode,
                                onCategoryChanged: (value) =>
                                    setState(() => _category = value),
                                onSupplierChanged: (value) =>
                                    setState(() => _supplier = value),
                                onStatusChanged: (value) =>
                                    setState(() => _status = value),
                                onMinPriceChanged: (value) =>
                                    setState(() => _minPrice = value),
                                onMaxPriceChanged: (value) =>
                                    setState(() => _maxPrice = value),
                                onSortModeChanged: (value) =>
                                    setState(() => _sortMode = value),
                                onClear: _clearFilters,
                              ),
                            ),
                            const SizedBox(width: 18),
                          ] else ...[
                            Expanded(
                              child: Row(
                                children: [
                                  Expanded(
                                    child: EcommerceSearchBar(
                                      hint:
                                          'Buscar produtos, campanhas ou fornecedores',
                                      onChanged: (value) {
                                        setState(() {
                                          _search = value;
                                        });
                                      },
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  OutlinedButton.icon(
                                    onPressed: _openMobileFilters,
                                    icon: const Icon(Icons.tune_rounded),
                                    label: const Text('Filtros'),
                                    style: OutlinedButton.styleFrom(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 16,
                                        vertical: 16,
                                      ),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(16),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                if (_selectedMenu != 'campanhas') ...[
                                  _SectionBlock(
                                    key: _productsKey,
                                    title: _selectedMenu == 'ofertas'
                                        ? 'Ofertas disponíveis'
                                        : 'Produtos em destaque',
                                    subtitle: _selectedMenu == 'ofertas'
                                        ? 'Seleção atual filtrada por produtos com desconto.'
                                        : 'Cards modernos com visual coeso para vender sem parecer template.',
                                    actionLabel: 'Limpar filtros',
                                    onActionTap: _clearFilters,
                                    child: _booted
                                        ? _buildProductGrid(
                                            context,
                                            visibleProducts,
                                            crossAxisCount,
                                          )
                                        : const EcommerceLoadingState(),
                                  ),
                                  const SizedBox(height: 22),
                                ],
                                _SectionBlock(
                                  key: _campaignsKey,
                                  title: 'Campanhas em destaque',
                                  subtitle:
                                      'Campanhas e produtos foram pensados para compartilhar a mesma linguagem visual do dashboard.',
                                  actionLabel: 'Ver campanhas',
                                  onActionTap: () => _handleMenuSelected('campanhas'),
                                  child: campaigns.isEmpty
                                      ? EcommerceEmptyState(
                                          title: 'Nenhuma campanha encontrada.',
                                          subtitle:
                                              'Ajuste os filtros para ver campanhas compatíveis com o que você procura.',
                                        )
                                      : _buildCampaignGrid(
                                          context,
                                          campaigns,
                                          isDesktop ? 2 : 1,
                                        ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      );
                    },
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

  Widget _buildHero(BuildContext context) {
    return Container(
      key: _heroKey,
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        gradient: const LinearGradient(
          colors: [Color(0xFF0F172A), Color(0xFF1D4ED8)],
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
          final isWide = constraints.maxWidth >= 900;
          final content = isWide
              ? Row(
                  children: [
                    Expanded(child: _heroCopy(context)),
                    const SizedBox(width: 20),
                    Expanded(child: _heroVisual(context)),
                  ],
                )
              : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _heroCopy(context),
                    const SizedBox(height: 18),
                    _heroVisual(context),
                  ],
                );

          return content;
        },
      ),
    );
  }

  Widget _heroCopy(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _CampaignPill(
          text: '${EcommerceMockData.campaigns.length} campanhas ativas',
          ),
        const SizedBox(height: 16),
        Text(
          'Divulgue campanhas e gere impacto',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                color: Colors.white,
                fontSize: 34,
                height: 1.05,
                fontWeight: FontWeight.w900,
              ),
        ),
        const SizedBox(height: 12),
        Text(
          'Encontre campanhas e produtos disponíveis para divulgação e acompanhe seus resultados em uma experiência moderna, limpa e responsiva.',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.white70,
                height: 1.45,
              ),
        ),
        const SizedBox(height: 20),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            ElevatedButton(
              onPressed: () => _handleMenuSelected('campanhas'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: const Color(0xFF0F172A),
                padding: const EdgeInsets.symmetric(
                  horizontal: 18,
                  vertical: 14,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text('Ver campanhas'),
            ),
            OutlinedButton(
              onPressed: () => _handleMenuSelected('produtos'),
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white,
                side: const BorderSide(color: Colors.white24),
                padding: const EdgeInsets.symmetric(
                  horizontal: 18,
                  vertical: 14,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text('Começar agora'),
            ),
          ],
        ),
        const SizedBox(height: 22),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            _HeroMetric(label: 'Produtos', value: '${EcommerceMockData.products.length}'),
            _HeroMetric(label: 'Campanhas', value: '${EcommerceMockData.campaigns.length}'),
            _HeroMetric(label: 'Carrinho', value: '${context.watch<CartProvider>().cartItems.length} itens'),
          ],
        ),
      ],
    );
  }

  Widget _heroVisual(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: _HeroPreviewCard(
                  title: EcommerceMockData.campaigns.first.title,
                  subtitle: 'Meta ${formatEcommerceMoney(EcommerceMockData.campaigns.first.financialGoal)}',
                  gradient: EcommerceMockData.campaigns.first.bannerGradient,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _HeroPreviewCard(
                  title: EcommerceMockData.products.first.title,
                  subtitle: formatEcommerceMoney(EcommerceMockData.products.first.discountedPrice),
                  gradient: EcommerceMockData.products.first.bannerGradient,
                  imageAsset: EcommerceMockData.products.first.bannerImage,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _HeroPreviewCard(
                  title: 'Checkout moderno',
                  subtitle: 'Fluxo limpo e mobile first',
                  gradient: const [Color(0xFF14532D), Color(0xFF22C55E)],
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _HeroPreviewCard(
                  title: 'Mini carrinho',
                  subtitle: '${_cartCount} itens salvos',
                  gradient: const [Color(0xFF5B21B6), Color(0xFF8B5CF6)],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildProductGrid(
    BuildContext context,
    List<EcommerceProduct> products,
    int crossAxisCount,
  ) {
    if (products.isEmpty) {
      return const EcommerceEmptyState(
        title: 'Nenhum produto encontrado.',
        subtitle:
            'Tente ajustar os filtros, buscar outra campanha ou trocar a ordenação.',
      );
    }

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: products.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: crossAxisCount == 1 ? 0.78 : 0.74,
      ),
      itemBuilder: (context, index) {
        final product = products[index];
        return EcommerceProductCard(
          product: product,
          priceFormatter: formatEcommerceMoney,
          onTap: () => context.go('/produto/${product.slug}'),
          onAddToCart: () => _addToCart(product),
        );
      },
    );
  }

  Widget _buildCampaignGrid(
    BuildContext context,
    List<EcommerceCampaign> campaigns,
    int crossAxisCount,
  ) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: campaigns.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: crossAxisCount == 1 ? 1.05 : 1.7,
      ),
      itemBuilder: (context, index) {
        final campaign = campaigns[index];
        return EcommerceCampaignCard(
          campaign: campaign,
          onTap: () => context.go('/produto/${campaign.slug}?type=campaign'),
        );
      },
    );
  }
}

class _SectionBlock extends StatelessWidget {
  const _SectionBlock({
    super.key,
    required this.title,
    required this.subtitle,
    required this.child,
    this.actionLabel,
    this.onActionTap,
  });

  final String title;
  final String subtitle;
  final Widget child;
  final String? actionLabel;
  final VoidCallback? onActionTap;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        EcommerceSectionHeader(
          title: title,
          subtitle: subtitle,
          actionLabel: actionLabel,
          onActionTap: onActionTap,
        ),
        const SizedBox(height: 14),
        child,
      ],
    );
  }
}

class _CampaignPill extends StatelessWidget {
  const _CampaignPill({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
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

class _HeroMetric extends StatelessWidget {
  const _HeroMetric({
    required this.label,
    required this.value,
  });

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: Colors.white70,
                ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                ),
          ),
        ],
      ),
    );
  }
}

class _HeroPreviewCard extends StatelessWidget {
  const _HeroPreviewCard({
    required this.title,
    required this.subtitle,
    required this.gradient,
    this.imageAsset,
  });

  final String title;
  final String subtitle;
  final List<Color> gradient;
  final String? imageAsset;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 152,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: LinearGradient(
          colors: gradient,
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x220F172A),
            blurRadius: 14,
            offset: Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (imageAsset != null)
            Align(
              alignment: Alignment.topRight,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: Image.asset(
                  imageAsset!,
                  width: 52,
                  height: 52,
                  fit: BoxFit.cover,
                ),
              ),
            )
          else
            const SizedBox(height: 52),
          const Spacer(),
          Text(
            title,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                ),
          ),
          const SizedBox(height: 6),
          Text(
            subtitle,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: Colors.white70,
                ),
          ),
        ],
      ),
    );
  }
}
