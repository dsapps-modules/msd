import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/config/colors.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../controller/provider/cart_controler.dart';
import 'ecommerce_v2_data.dart';
import 'ecommerce_v2_models.dart';

String formatMoney(double value) {
  return 'R\$ ${value.toStringAsFixed(2).replaceAll('.', ',')}';
}

class EcommerceHomePage extends StatefulWidget {
  const EcommerceHomePage({super.key});

  @override
  State<EcommerceHomePage> createState() => _EcommerceHomePageState();
}

class _EcommerceHomePageState extends State<EcommerceHomePage> {
  final ScrollController _scrollController = ScrollController();
  final GlobalKey _campaignsKey = GlobalKey();
  final GlobalKey _productsKey = GlobalKey();

  String _searchQuery = '';
  String _selectedCategory = 'Todos';
  String _selectedOrdering = 'Relevancia';
  String _activeSection = 'inicio';

  List<EcommerceProduct> get _visibleProducts {
    final query = _searchQuery.trim().toLowerCase();
    final filtered = EcommerceData.products.where((product) {
      final matchesQuery = query.isEmpty ||
          product.title.toLowerCase().contains(query) ||
          product.campaignTitle.toLowerCase().contains(query) ||
          product.supplier.toLowerCase().contains(query);
      final matchesCategory =
          _selectedCategory == 'Todos' || product.category == _selectedCategory;
      return matchesQuery && matchesCategory;
    }).toList();

    filtered.sort((a, b) {
      switch (_selectedOrdering) {
        case 'Menor preco':
          return a.finalPrice.compareTo(b.finalPrice);
        case 'Maior preco':
          return b.finalPrice.compareTo(a.finalPrice);
        case 'Melhor avaliacao':
          return b.rating.compareTo(a.rating);
        default:
          return 0;
      }
    });
    return filtered;
  }

  Future<void> _addToCart(EcommerceProduct product) async {
    await context.read<CartProvider>().addToCart(
          EcommerceData.buildCartItem(product),
          context,
        );
    if (mounted) setState(() {});
  }

  void _clearFilters() {
    setState(() {
      _searchQuery = '';
      _selectedCategory = 'Todos';
      _selectedOrdering = 'Relevancia';
    });
  }

  void _goDetail(EcommerceProduct product) {
    context.go('/produto/${product.slug}');
  }

  void _goCampaign(EcommerceCampaign campaign) {
    context.go('/produto/${campaign.slug}?kind=campaign');
  }

  void _goCart() => context.go('/cart');

  void _goLogin() {
    if (kIsWeb) {
      context.goNamed(RouteNames.webLogin);
    } else {
      context.goNamed(RouteNames.loginScreen);
    }
  }

  Future<void> _scrollTo(GlobalKey key) async {
    final target = key.currentContext;
    if (target != null) {
      await Scrollable.ensureVisible(
        target,
        duration: const Duration(milliseconds: 380),
        curve: Curves.easeInOut,
        alignment: 0.08,
      );
    }
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    try {
      final cartCount = context.watch<CartProvider>().cartItems.length;
      final featuredCampaigns = EcommerceData.campaigns.take(3).toList();
      final products = _visibleProducts;

      return Scaffold(
        backgroundColor: const Color(0xFFF3F6FB),
        body: SingleChildScrollView(
          controller: _scrollController,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              EcommerceHomeHeader(
                activeSection: _activeSection,
                cartCount: cartCount,
                onSectionSelected: (section) {
                  setState(() => _activeSection = section);
                  if (section == 'inicio') {
                    _scrollController.animateTo(
                      0,
                      duration: const Duration(milliseconds: 380),
                      curve: Curves.easeInOut,
                    );
                  } else if (section == 'campanhas') {
                    _scrollTo(_campaignsKey);
                  } else if (section == 'produtos' || section == 'ofertas') {
                    _scrollTo(_productsKey);
                  }
                },
                onUserTap: _goLogin,
                onCartTap: _goCart,
              ),
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 1180),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(24, 24, 24, 36),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        EcommerceHomeHero(
                          campaign: EcommerceData.campaigns.first,
                          onPrimaryTap: () {
                            setState(() => _activeSection = 'produtos');
                            _scrollTo(_productsKey);
                          },
                          onSecondaryTap: () {
                            setState(() => _activeSection = 'campanhas');
                            _scrollTo(_campaignsKey);
                          },
                        ),
                        const SizedBox(height: 20),
                        EcommerceFiltersBar(
                          query: _searchQuery,
                          selectedCategory: _selectedCategory,
                          selectedOrdering: _selectedOrdering,
                          onQueryChanged: (value) =>
                              setState(() => _searchQuery = value),
                          onCategoryChanged: (value) =>
                              setState(() => _selectedCategory = value),
                          onOrderingChanged: (value) =>
                              setState(() => _selectedOrdering = value),
                          onClear: _clearFilters,
                        ),
                        const SizedBox(height: 28),
                        Container(
                          key: _campaignsKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const EcommerceSectionTitle(
                                title: 'Campanhas em destaque',
                                subtitle:
                                    'Seleções com foco visual limpo e leitura rápida.',
                              ),
                              const SizedBox(height: 14),
                              EcommerceCampaignsGrid(
                                campaigns: featuredCampaigns,
                                onTap: _goCampaign,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 30),
                        Container(
                          key: _productsKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const EcommerceSectionTitle(
                                title: 'Produtos disponíveis',
                                subtitle:
                                    'Cards proporcionais, ação direta e visual consistente.',
                              ),
                              const SizedBox(height: 14),
                              products.isEmpty
                                  ? EcommerceEmptyStateCard(
                                      title: 'Nenhum produto encontrado.',
                                      subtitle:
                                          'Tente outro termo de busca, ajuste a categoria ou limpe os filtros.',
                                      actionLabel: 'Limpar filtros',
                                      onAction: _clearFilters,
                                    )
                                  : EcommerceProductGrid(
                                      products: products,
                                      onTap: _goDetail,
                                      onAddToCart: _addToCart,
                                    ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 30),
                        const EcommerceSectionTitle(
                          title: 'Benefícios',
                          subtitle:
                              'Uma vitrine leve, coerente e pronta para mobile.',
                        ),
                        const SizedBox(height: 14),
                        const EcommerceBenefitsGrid(),
                        const SizedBox(height: 30),
                        const EcommerceHomeFooter(),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    } catch (error, stack) {
      debugPrint('EcommerceHomePage build failed: $error');
      debugPrintStack(stackTrace: stack);
      return const _FallbackHome();
    }
  }
}

class _FallbackHome extends StatelessWidget {
  const _FallbackHome();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF3F6FB),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 760),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const _SmallBadge(text: 'Home ecommerce', light: false),
                    const SizedBox(height: 14),
                    Text(
                      'Produtos e campanhas para divulgar',
                      style:
                          Theme.of(context).textTheme.headlineSmall?.copyWith(
                                color: const Color(0xFF0F172A),
                                fontSize: 28,
                                fontWeight: FontWeight.w900,
                              ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'A página principal encontrou um erro interno e foi carregado um fallback seguro para manter a vitrine visível.',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: const Color(0xFF475569),
                            fontSize: 15,
                            height: 1.45,
                          ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class EcommerceHomeHeader extends StatelessWidget {
  const EcommerceHomeHeader({
    super.key,
    required this.activeSection,
    required this.cartCount,
    required this.onSectionSelected,
    required this.onUserTap,
    required this.onCartTap,
  });

  final String activeSection;
  final int cartCount;
  final ValueChanged<String> onSectionSelected;
  final VoidCallback onUserTap;
  final VoidCallback onCartTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 76,
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(bottom: BorderSide(color: Color(0xFFE2E8F0))),
        boxShadow: [
          BoxShadow(
            color: Color(0x0A0F172A),
            blurRadius: 18,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: SafeArea(
        bottom: false,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1200),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final wide = constraints.maxWidth >= 900;
                  return Row(
                    children: [
                      const _LogoText(),
                      const SizedBox(width: 20),
                      if (wide) ...[
                        _HeaderNav(
                          activeSection: activeSection,
                          onSectionSelected: onSectionSelected,
                        ),
                        const Spacer(),
                      ] else
                        const Spacer(),
                      _HeaderIconButton(
                        icon: Icons.person_outline_rounded,
                        onTap: onUserTap,
                      ),
                      const SizedBox(width: 10),
                      _HeaderIconButton(
                        icon: Icons.shopping_cart_outlined,
                        badge: cartCount,
                        onTap: onCartTap,
                      ),
                      if (!wide) ...[
                        const SizedBox(width: 8),
                        PopupMenuButton<String>(
                          icon: const Icon(Icons.menu_rounded,
                              color: Color(0xFF0F172A)),
                          onSelected: onSectionSelected,
                          itemBuilder: (_) => const [
                            PopupMenuItem(
                                value: 'inicio', child: Text('Início')),
                            PopupMenuItem(
                                value: 'produtos', child: Text('Produtos')),
                            PopupMenuItem(
                                value: 'campanhas', child: Text('Campanhas')),
                            PopupMenuItem(
                                value: 'ofertas', child: Text('Ofertas')),
                          ],
                        ),
                      ],
                    ],
                  );
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _LogoText extends StatelessWidget {
  const _LogoText();

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(maxWidth: 140),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 26,
            height: 26,
            decoration: BoxDecoration(
              color: CustomColors.baseColor,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.shopping_bag_outlined,
                size: 16, color: Colors.white),
          ),
          const SizedBox(width: 8),
          Text(
            'Quick',
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontSize: 15,
                  fontWeight: FontWeight.w800,
                ),
          ),
        ],
      ),
    );
  }
}

class _HeaderNav extends StatelessWidget {
  const _HeaderNav({
    required this.activeSection,
    required this.onSectionSelected,
  });

  final String activeSection;
  final ValueChanged<String> onSectionSelected;

  @override
  Widget build(BuildContext context) {
    final items = [
      ('inicio', 'Início'),
      ('produtos', 'Produtos'),
      ('campanhas', 'Campanhas'),
      ('ofertas', 'Ofertas'),
    ];
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (final item in items) ...[
          _HeaderNavLink(
            label: item.$2,
            active: activeSection == item.$1,
            onTap: () => onSectionSelected(item.$1),
          ),
          if (item != items.last) const SizedBox(width: 14),
        ],
      ],
    );
  }
}

class _HeaderNavLink extends StatelessWidget {
  const _HeaderNavLink({
    required this.label,
    required this.active,
    required this.onTap,
  });

  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(999),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: active ? const Color(0xFFEFF6FF) : Colors.transparent,
          borderRadius: BorderRadius.circular(999),
        ),
        child: Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color:
                    active ? CustomColors.baseColor : const Color(0xFF475569),
                fontSize: 15,
                fontWeight: active ? FontWeight.w800 : FontWeight.w600,
              ),
        ),
      ),
    );
  }
}

class _HeaderIconButton extends StatelessWidget {
  const _HeaderIconButton({
    required this.icon,
    required this.onTap,
    this.badge,
  });

  final IconData icon;
  final VoidCallback onTap;
  final int? badge;

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Material(
          color: const Color(0xFFF8FAFC),
          shape: const CircleBorder(),
          child: InkWell(
            onTap: onTap,
            customBorder: const CircleBorder(),
            child: SizedBox(
              width: 40,
              height: 40,
              child: Icon(icon, size: 20, color: const Color(0xFF0F172A)),
            ),
          ),
        ),
        if (badge != null && badge! > 0)
          Positioned(
            right: -1,
            top: -1,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
              decoration: BoxDecoration(
                color: CustomColors.baseColor,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                badge! > 99 ? '99+' : '$badge',
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                      fontSize: 10,
                    ),
              ),
            ),
          ),
      ],
    );
  }
}

class EcommerceHomeHero extends StatelessWidget {
  const EcommerceHomeHero({
    super.key,
    required this.campaign,
    required this.onPrimaryTap,
    required this.onSecondaryTap,
  });

  final EcommerceCampaign campaign;
  final VoidCallback onPrimaryTap;
  final VoidCallback onSecondaryTap;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 1180),
      child: Container(
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(28),
          gradient: const LinearGradient(
            colors: [Color(0xFF0B1530), Color(0xFF15356A)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          boxShadow: const [
            BoxShadow(
              color: Color(0x1E0F172A),
              blurRadius: 26,
              offset: Offset(0, 16),
            ),
          ],
        ),
        clipBehavior: Clip.antiAlias,
        child: LayoutBuilder(
          builder: (context, constraints) {
            final wide = constraints.maxWidth >= 900;
            final titleSize = wide ? 46.0 : 32.0;
            final subtitleSize = wide ? 18.0 : 16.0;

            final leftColumn = Column(
              crossAxisAlignment:
                  wide ? CrossAxisAlignment.start : CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                const _SmallBadge(text: '3 campanhas ativas', light: true),
                const SizedBox(height: 14),
                Text(
                  'Produtos e campanhas para divulgar',
                  textAlign: wide ? TextAlign.left : TextAlign.center,
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                        color: Colors.white,
                        fontSize: titleSize,
                        height: 1.05,
                        fontWeight: FontWeight.w900,
                      ),
                ),
                const SizedBox(height: 12),
                Text(
                  'Escolha produtos, acompanhe campanhas e gere links de divulgação em poucos cliques.',
                  textAlign: wide ? TextAlign.left : TextAlign.center,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Colors.white.withOpacity(0.82),
                        fontSize: subtitleSize,
                        height: 1.45,
                      ),
                ),
                const SizedBox(height: 18),
                Wrap(
                  alignment: wide ? WrapAlignment.start : WrapAlignment.center,
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    ElevatedButton(
                      onPressed: onPrimaryTap,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFF0B1530),
                        elevation: 0,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 18, vertical: 13),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                        textStyle: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      child: const Text('Ver produtos'),
                    ),
                    OutlinedButton(
                      onPressed: onSecondaryTap,
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.white,
                        side: const BorderSide(color: Colors.white24),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 18, vertical: 13),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                        textStyle: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      child: const Text('Ver campanhas'),
                    ),
                  ],
                ),
                const SizedBox(height: 18),
                Wrap(
                  alignment: wide ? WrapAlignment.start : WrapAlignment.center,
                  spacing: 10,
                  runSpacing: 10,
                  children: const [
                    _InfoPill(
                        icon: Icons.shopping_bag_outlined, label: '4 produtos'),
                    _InfoPill(
                        icon: Icons.campaign_outlined, label: '3 campanhas'),
                    _InfoPill(
                        icon: Icons.grid_view_rounded, label: 'SaaS moderno'),
                  ],
                ),
              ],
            );

            final rightColumn = ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: _CampaignSpotlight(
                title: campaign.title,
                subtitle: campaign.subtitle,
                meta: 'Meta: ${formatMoney(5000)}',
                onTap: onSecondaryTap,
              ),
            );

            if (wide) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Expanded(child: leftColumn),
                  const SizedBox(width: 32),
                  rightColumn,
                ],
              );
            }

            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                leftColumn,
                const SizedBox(height: 18),
                rightColumn,
              ],
            );
          },
        ),
      ),
    );
  }
}

class _CampaignSpotlight extends StatelessWidget {
  const _CampaignSpotlight({
    required this.title,
    required this.subtitle,
    required this.meta,
    required this.onTap,
  });

  final String title;
  final String subtitle;
  final String meta;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(maxHeight: 300),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FBFF),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFD9E7FF)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x1A0F172A),
            blurRadius: 18,
            offset: Offset(0, 12),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 108,
            decoration: BoxDecoration(
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(24)),
              gradient: LinearGradient(
                colors: [
                  const Color(0xFF0EA5E9).withOpacity(0.18),
                  const Color(0xFFDBEAFE)
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Stack(
              children: [
                Positioned(
                  left: 16,
                  top: 16,
                  child: _SmallBadge(text: 'Em destaque', light: false),
                ),
                const Positioned(
                  right: 16,
                  bottom: 12,
                  child: Icon(Icons.campaign_outlined,
                      size: 42, color: Color(0xFF1D4ED8)),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: const Color(0xFF0F172A),
                        fontSize: 22,
                        fontWeight: FontWeight.w800,
                        height: 1.2,
                      ),
                ),
                const SizedBox(height: 8),
                Text(
                  subtitle,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF475569),
                        fontSize: 15,
                        height: 1.4,
                      ),
                ),
                const SizedBox(height: 12),
                _MiniRow(label: 'Meta', value: meta),
                const SizedBox(height: 14),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: onTap,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: CustomColors.baseColor,
                      foregroundColor: Colors.white,
                      elevation: 0,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                      textStyle: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    child: const Text('Ver detalhes'),
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

class EcommerceFiltersBar extends StatelessWidget {
  const EcommerceFiltersBar({
    super.key,
    required this.query,
    required this.selectedCategory,
    required this.selectedOrdering,
    required this.onQueryChanged,
    required this.onCategoryChanged,
    required this.onOrderingChanged,
    required this.onClear,
  });

  final String query;
  final String selectedCategory;
  final String selectedOrdering;
  final ValueChanged<String> onQueryChanged;
  final ValueChanged<String> onCategoryChanged;
  final ValueChanged<String> onOrderingChanged;
  final VoidCallback onClear;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0E0F172A),
            blurRadius: 18,
            offset: Offset(0, 10),
          ),
        ],
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final wide = constraints.maxWidth >= 860;
          if (wide) {
            return Wrap(
              spacing: 12,
              runSpacing: 12,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                SizedBox(
                  width: 340,
                  child: _SearchField(
                    hint: 'Buscar produtos, campanhas ou fornecedores',
                    initialValue: query,
                    onChanged: onQueryChanged,
                  ),
                ),
                SizedBox(
                  width: 180,
                  child: _FilterDropdown(
                    value: selectedCategory,
                    items: EcommerceData.categories,
                    onChanged: onCategoryChanged,
                  ),
                ),
                SizedBox(
                  width: 180,
                  child: _FilterDropdown(
                    value: selectedOrdering,
                    items: EcommerceData.orderings,
                    onChanged: onOrderingChanged,
                  ),
                ),
                TextButton.icon(
                  onPressed: onClear,
                  icon: const Icon(Icons.filter_alt_off_rounded, size: 18),
                  label: const Text('Limpar'),
                  style: TextButton.styleFrom(
                    foregroundColor: const Color(0xFF0F172A),
                    backgroundColor: const Color(0xFFF8FAFC),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                      side: const BorderSide(color: Color(0xFFE2E8F0)),
                    ),
                    textStyle: const TextStyle(
                        fontSize: 15, fontWeight: FontWeight.w600),
                  ),
                ),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: EcommerceData.categories
                      .where((item) => item != 'Todos')
                      .map(
                        (item) => _CategoryChip(
                          label: item,
                          selected: selectedCategory == item,
                          onTap: () => onCategoryChanged(item),
                        ),
                      )
                      .toList(),
                ),
              ],
            );
          }

          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _SearchField(
                hint: 'Buscar produtos, campanhas ou fornecedores',
                initialValue: query,
                onChanged: onQueryChanged,
              ),
              const SizedBox(height: 12),
              _FilterDropdown(
                value: selectedCategory,
                items: EcommerceData.categories,
                onChanged: onCategoryChanged,
              ),
              const SizedBox(height: 12),
              _FilterDropdown(
                value: selectedOrdering,
                items: EcommerceData.orderings,
                onChanged: onOrderingChanged,
              ),
              const SizedBox(height: 12),
              TextButton.icon(
                onPressed: onClear,
                icon: const Icon(Icons.filter_alt_off_rounded, size: 18),
                label: const Text('Limpar'),
                style: TextButton.styleFrom(
                  foregroundColor: const Color(0xFF0F172A),
                  backgroundColor: const Color(0xFFF8FAFC),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                    side: const BorderSide(color: Color(0xFFE2E8F0)),
                  ),
                  textStyle: const TextStyle(
                      fontSize: 15, fontWeight: FontWeight.w600),
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: EcommerceData.categories
                    .where((item) => item != 'Todos')
                    .map(
                      (item) => _CategoryChip(
                        label: item,
                        selected: selectedCategory == item,
                        onTap: () => onCategoryChanged(item),
                      ),
                    )
                    .toList(),
              ),
            ],
          );
        },
      ),
    );
  }
}

class _SearchField extends StatefulWidget {
  const _SearchField({
    required this.hint,
    required this.initialValue,
    required this.onChanged,
  });

  final String hint;
  final String initialValue;
  final ValueChanged<String> onChanged;

  @override
  State<_SearchField> createState() => _SearchFieldState();
}

class _SearchFieldState extends State<_SearchField> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialValue);
  }

  @override
  void didUpdateWidget(covariant _SearchField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.initialValue != widget.initialValue &&
        _controller.text != widget.initialValue) {
      _controller.text = widget.initialValue;
      _controller.selection = TextSelection.fromPosition(
        TextPosition(offset: _controller.text.length),
      );
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      onChanged: widget.onChanged,
      decoration: InputDecoration(
        hintText: widget.hint,
        prefixIcon: const Icon(Icons.search_rounded, size: 20),
        filled: true,
        fillColor: const Color(0xFFF8FAFC),
        isDense: true,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFF1D4ED8)),
        ),
      ),
    );
  }
}

class _FilterDropdown extends StatelessWidget {
  const _FilterDropdown({
    required this.value,
    required this.items,
    required this.onChanged,
  });

  final String value;
  final List<String> items;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      value: value,
      isDense: true,
      icon: const Icon(Icons.expand_more_rounded),
      decoration: InputDecoration(
        filled: true,
        fillColor: const Color(0xFFF8FAFC),
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
      ),
      items: items
          .map(
            (item) => DropdownMenuItem<String>(
              value: item,
              child: Text(item, overflow: TextOverflow.ellipsis),
            ),
          )
          .toList(),
      onChanged: (value) {
        if (value != null) onChanged(value);
      },
    );
  }
}

class _CategoryChip extends StatelessWidget {
  const _CategoryChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ChoiceChip(
      label: Text(
        label,
        style: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: selected ? CustomColors.baseColor : const Color(0xFF334155),
        ),
      ),
      selected: selected,
      selectedColor: const Color(0xFFEFF6FF),
      backgroundColor: const Color(0xFFF8FAFC),
      side: const BorderSide(color: Color(0xFFE2E8F0)),
      onSelected: (_) => onTap(),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
    );
  }
}

class EcommerceCampaignsGrid extends StatelessWidget {
  const EcommerceCampaignsGrid({
    super.key,
    required this.campaigns,
    required this.onTap,
  });

  final List<EcommerceCampaign> campaigns;
  final ValueChanged<EcommerceCampaign> onTap;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final crossAxisCount = width >= 1080
            ? 3
            : width >= 720
                ? 2
                : 1;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: campaigns.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: crossAxisCount,
            mainAxisExtent: 248,
            crossAxisSpacing: 14,
            mainAxisSpacing: 14,
          ),
          itemBuilder: (context, index) {
            return EcommerceCampaignCard(
              campaign: campaigns[index],
              onTap: () => onTap(campaigns[index]),
            );
          },
        );
      },
    );
  }
}

class EcommerceCampaignCard extends StatelessWidget {
  const EcommerceCampaignCard({
    super.key,
    required this.campaign,
    required this.onTap,
  });

  final EcommerceCampaign campaign;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(22),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(22),
            border: Border.all(color: const Color(0xFFE2E8F0)),
            boxShadow: const [
              BoxShadow(
                color: Color(0x0E0F172A),
                blurRadius: 18,
                offset: Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 92,
                decoration: BoxDecoration(
                  borderRadius:
                      const BorderRadius.vertical(top: Radius.circular(22)),
                  gradient: LinearGradient(
                    colors: campaign.gradient,
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      left: 16,
                      top: 16,
                      child: _SmallBadge(text: campaign.status, light: true),
                    ),
                    const Positioned(
                      right: 16,
                      bottom: 10,
                      child: Icon(Icons.campaign_outlined,
                          size: 36, color: Colors.white),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 14, 16, 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      campaign.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: const Color(0xFF0F172A),
                            fontSize: 20,
                            fontWeight: FontWeight.w800,
                            height: 1.15,
                          ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      campaign.subtitle,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF475569),
                            fontSize: 14,
                            height: 1.35,
                          ),
                    ),
                    const SizedBox(height: 10),
                    _MiniRow(label: 'Meta', value: formatMoney(campaign.goal)),
                    const SizedBox(height: 8),
                    _MiniRow(label: 'Período', value: campaign.period),
                    const SizedBox(height: 14),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton(
                        onPressed: onTap,
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFF0F172A),
                          side: const BorderSide(color: Color(0xFFE2E8F0)),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                          textStyle: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        child: const Text('Ver campanha'),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class EcommerceProductGrid extends StatelessWidget {
  const EcommerceProductGrid({
    super.key,
    required this.products,
    required this.onTap,
    required this.onAddToCart,
  });

  final List<EcommerceProduct> products;
  final ValueChanged<EcommerceProduct> onTap;
  final ValueChanged<EcommerceProduct> onAddToCart;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final crossAxisCount = width >= 1120
            ? 3
            : width >= 720
                ? 2
                : 1;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: products.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: crossAxisCount,
            mainAxisExtent: 388,
            crossAxisSpacing: 14,
            mainAxisSpacing: 14,
          ),
          itemBuilder: (context, index) {
            return EcommerceProductCard(
              product: products[index],
              onTap: () => onTap(products[index]),
              onAddToCart: () => onAddToCart(products[index]),
            );
          },
        );
      },
    );
  }
}

class EcommerceProductCard extends StatefulWidget {
  const EcommerceProductCard({
    super.key,
    required this.product,
    required this.onTap,
    required this.onAddToCart,
  });

  final EcommerceProduct product;
  final VoidCallback onTap;
  final VoidCallback onAddToCart;

  @override
  State<EcommerceProductCard> createState() => _EcommerceProductCardState();
}

class _EcommerceProductCardState extends State<EcommerceProductCard> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final product = widget.product;
    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: AnimatedScale(
        scale: _hover ? 1.01 : 1,
        duration: const Duration(milliseconds: 160),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: widget.onTap,
            borderRadius: BorderRadius.circular(22),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(22),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(_hover ? 0.08 : 0.045),
                    blurRadius: _hover ? 24 : 16,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 160,
                    decoration: BoxDecoration(
                      borderRadius:
                          const BorderRadius.vertical(top: Radius.circular(22)),
                      gradient: LinearGradient(
                        colors: product.gradient,
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                    ),
                    child: Stack(
                      children: [
                        Positioned(
                          left: 16,
                          top: 16,
                          child: _SmallBadge(
                            text: product.onOffer ? 'Oferta' : 'Disponível',
                            light: true,
                          ),
                        ),
                        Positioned(
                          right: 14,
                          bottom: 14,
                          child: Container(
                            width: 56,
                            height: 56,
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.14),
                              borderRadius: BorderRadius.circular(18),
                            ),
                            child: Icon(
                              _categoryIcon(product.category),
                              color: Colors.white,
                              size: 28,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(16, 14, 16, 16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            product.title,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: Theme.of(context)
                                .textTheme
                                .titleMedium
                                ?.copyWith(
                                  color: const Color(0xFF0F172A),
                                  fontSize: 18,
                                  fontWeight: FontWeight.w800,
                                  height: 1.2,
                                ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            product.supplier,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style:
                                Theme.of(context).textTheme.bodySmall?.copyWith(
                                      color: const Color(0xFF64748B),
                                      fontSize: 14,
                                    ),
                          ),
                          const SizedBox(height: 10),
                          _MiniRow(
                            label: 'Campanha',
                            value: product.campaignTitle,
                          ),
                          const Spacer(),
                          Text(
                            formatMoney(product.finalPrice),
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(
                                  color: const Color(0xFF0F172A),
                                  fontSize: 24,
                                  fontWeight: FontWeight.w900,
                                  height: 1.0,
                                ),
                          ),
                          const SizedBox(height: 12),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: widget.onAddToCart,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: CustomColors.baseColor,
                                foregroundColor: Colors.white,
                                elevation: 0,
                                padding:
                                    const EdgeInsets.symmetric(vertical: 12),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                textStyle: const TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              child: const Text('Adicionar ao carrinho'),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  IconData _categoryIcon(String category) {
    switch (category) {
      case 'Tecnologia':
        return Icons.auto_awesome_rounded;
      case 'Higiene':
        return Icons.cleaning_services_rounded;
      case 'Sensibilidade':
        return Icons.favorite_border_rounded;
      case 'Clareamento':
      default:
        return Icons.brightness_7_rounded;
    }
  }
}

class EcommerceBenefitsGrid extends StatelessWidget {
  const EcommerceBenefitsGrid({super.key});

  @override
  Widget build(BuildContext context) {
    const cards = [
      _BenefitData(
        icon: Icons.layers_rounded,
        title: 'Visual coeso',
        text:
            'A vitrine conversa com o painel interno sem parecer outro produto.',
      ),
      _BenefitData(
        icon: Icons.auto_graph_rounded,
        title: 'Conversão limpa',
        text: 'Menos ruído, mais hierarquia e chamadas de ação diretas.',
      ),
      _BenefitData(
        icon: Icons.phone_iphone_rounded,
        title: 'Mobile first',
        text:
            'Escala segura, leitura rápida e componentes que respeitam telas pequenas.',
      ),
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final crossAxisCount = width >= 980
            ? 3
            : width >= 640
                ? 2
                : 1;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: cards.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: crossAxisCount,
            mainAxisExtent: 168,
            crossAxisSpacing: 14,
            mainAxisSpacing: 14,
          ),
          itemBuilder: (context, index) =>
              EcommerceBenefitCard(data: cards[index]),
        );
      },
    );
  }
}

class EcommerceBenefitCard extends StatelessWidget {
  const EcommerceBenefitCard({super.key, required this.data});

  final _BenefitData data;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0E0F172A),
            blurRadius: 16,
            offset: Offset(0, 10),
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
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(data.icon, color: CustomColors.baseColor, size: 22),
          ),
          const SizedBox(height: 14),
          Text(
            data.title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  height: 1.2,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            data.text,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                  fontSize: 14,
                  height: 1.45,
                ),
          ),
        ],
      ),
    );
  }
}

class EcommerceHomeFooter extends StatelessWidget {
  const EcommerceHomeFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(22),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const _SmallBadge(text: 'Quick Ecommerce', light: true),
          const SizedBox(height: 10),
          Text(
            'Uma vitrine moderna para campanhas, produtos e divulgadores.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFFCBD5E1),
                  fontSize: 13,
                  height: 1.45,
                ),
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 16,
            runSpacing: 8,
            children: const [
              _FooterLink('Início'),
              _FooterLink('Produtos'),
              _FooterLink('Campanhas'),
              _FooterLink('Checkout'),
            ],
          ),
        ],
      ),
    );
  }
}

class EcommerceEmptyStateCard extends StatelessWidget {
  const EcommerceEmptyStateCard({
    super.key,
    required this.title,
    required this.subtitle,
    this.actionLabel,
    this.onAction,
  });

  final String title;
  final String subtitle;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        children: [
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Icon(
              Icons.inventory_2_outlined,
              color: CustomColors.baseColor,
              size: 34,
            ),
          ),
          const SizedBox(height: 14),
          Text(
            title,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            subtitle,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                  fontSize: 14,
                  height: 1.4,
                ),
          ),
          if (actionLabel != null && onAction != null) ...[
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: onAction,
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomColors.baseColor,
                foregroundColor: Colors.white,
                elevation: 0,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
                textStyle: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                ),
              ),
              child: Text(actionLabel!),
            ),
          ],
        ],
      ),
    );
  }
}

class EcommerceSectionTitle extends StatelessWidget {
  const EcommerceSectionTitle({
    super.key,
    required this.title,
    required this.subtitle,
  });

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: const Color(0xFF0F172A),
                fontSize: 22,
                fontWeight: FontWeight.w800,
                height: 1.2,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          subtitle,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: const Color(0xFF64748B),
                fontSize: 14,
                height: 1.4,
              ),
        ),
      ],
    );
  }
}

class _SmallBadge extends StatelessWidget {
  const _SmallBadge({
    required this.text,
    required this.light,
  });

  final String text;
  final bool light;

  @override
  Widget build(BuildContext context) {
    final background =
        light ? Colors.white.withOpacity(0.14) : const Color(0xFFEFF6FF);
    final foreground = light ? Colors.white : CustomColors.baseColor;
    final borderColor =
        light ? Colors.white.withOpacity(0.16) : const Color(0xFFD8E6FF);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: borderColor),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: foreground,
              fontWeight: FontWeight.w800,
              fontSize: 12,
            ),
      ),
    );
  }
}

class _InfoPill extends StatelessWidget {
  const _InfoPill({
    required this.icon,
    required this.label,
  });

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withOpacity(0.12)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: Colors.white.withOpacity(0.88)),
          const SizedBox(width: 6),
          Text(
            label,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: Colors.white,
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                ),
          ),
        ],
      ),
    );
  }
}

class _MiniRow extends StatelessWidget {
  const _MiniRow({
    required this.label,
    required this.value,
  });

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          '$label: ',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: const Color(0xFF64748B),
                fontSize: 13,
                fontWeight: FontWeight.w600,
              ),
        ),
        Expanded(
          child: Text(
            value,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                ),
          ),
        ),
      ],
    );
  }
}

class _FooterLink extends StatelessWidget {
  const _FooterLink(this.label);

  final String label;

  @override
  Widget build(BuildContext context) {
    return Text(
      label,
      style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: const Color(0xFFCBD5E1),
            fontSize: 14,
          ),
    );
  }
}

class _BenefitData {
  const _BenefitData({
    required this.icon,
    required this.title,
    required this.text,
  });

  final IconData icon;
  final String title;
  final String text;
}
