import 'package:flutter/material.dart';
import 'package:quick_ecommerce/config/colors.dart';

import 'ecommerce_v2_data.dart';
import 'ecommerce_v2_models.dart';

String money(double value) =>
    'R\$ ${value.toStringAsFixed(2).replaceAll('.', ',')}';

class EcommerceHeader extends StatelessWidget {
  const EcommerceHeader({
    super.key,
    required this.cartCount,
    required this.onSectionSelected,
    required this.onMenuTap,
    required this.onUserTap,
    required this.onCartTap,
    required this.onSearchChanged,
    required this.currentSection,
  });

  final int cartCount;
  final String currentSection;
  final ValueChanged<String> onSectionSelected;
  final VoidCallback onMenuTap;
  final VoidCallback onUserTap;
  final VoidCallback onCartTap;
  final ValueChanged<String> onSearchChanged;

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width >= 1040;
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Color(0x100F172A),
            blurRadius: 24,
            offset: Offset(0, 10),
          )
        ],
      ),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: isWide ? 24 : 16, vertical: isWide ? 12 : 10),
          child: Column(
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Image.asset('assets/images/darkLogo.png', width: 62, height: 24),
                        const SizedBox(width: 8),
                        Container(width: 1, height: 16, color: const Color(0xFFE2E8F0)),
                        const SizedBox(width: 8),
                        Text(
                          'Ecommerce',
                          style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                color: const Color(0xFF0F172A),
                                fontWeight: FontWeight.w800,
                              ),
                        ),
                      ],
                    ),
                  ),
                  if (isWide) ...[
                    const SizedBox(width: 24),
                    _NavLink(label: 'Inicio', active: currentSection == 'inicio', onTap: () => onSectionSelected('inicio')),
                    const SizedBox(width: 18),
                    _NavLink(label: 'Produtos', active: currentSection == 'produtos', onTap: () => onSectionSelected('produtos')),
                    const SizedBox(width: 18),
                    _NavLink(label: 'Campanhas', active: currentSection == 'campanhas', onTap: () => onSectionSelected('campanhas')),
                    const SizedBox(width: 18),
                    _NavLink(label: 'Ofertas', active: currentSection == 'ofertas', onTap: () => onSectionSelected('ofertas')),
                    const SizedBox(width: 18),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(right: 14),
                        child: EcommerceSearchField(
                          hint: 'Buscar produtos, campanhas ou fornecedores',
                          onChanged: onSearchChanged,
                        ),
                      ),
                    ),
                  ] else
                    const Spacer(),
                  _RoundIcon(
                    icon: Icons.person_outline_rounded,
                    onTap: onUserTap,
                  ),
                  const SizedBox(width: 10),
                  _RoundIcon(
                    icon: Icons.shopping_cart_outlined,
                    badge: cartCount,
                    onTap: onCartTap,
                  ),
                  const SizedBox(width: 10),
                  if (!isWide)
                    IconButton(
                      onPressed: onMenuTap,
                      icon: const Icon(Icons.menu_rounded),
                    ),
                ],
              ),
              if (!isWide) ...[
                const SizedBox(height: 12),
                EcommerceSearchField(
                  hint: 'Buscar produtos, campanhas ou fornecedores',
                  onChanged: onSearchChanged,
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class EcommerceSearchField extends StatelessWidget {
  const EcommerceSearchField({
    super.key,
    required this.hint,
    required this.onChanged,
  });

  final String hint;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return TextField(
      onChanged: onChanged,
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: const Icon(Icons.search_rounded),
        isDense: true,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
        filled: true,
        fillColor: const Color(0xFFF8FAFC),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(18),
          borderSide: const BorderSide(color: Color(0xFF1D4ED8)),
        ),
      ),
    );
  }
}

class EcommerceHeroSection extends StatelessWidget {
  const EcommerceHeroSection({
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
    try {
      return ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 1200),
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(28),
            gradient: const LinearGradient(
              colors: [Color(0xFF0B1220), Color(0xFF17376B)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            boxShadow: const [
              BoxShadow(
                color: Color(0x240F172A),
                blurRadius: 24,
                offset: Offset(0, 14),
              ),
            ],
          ),
          clipBehavior: Clip.antiAlias,
          child: LayoutBuilder(
            builder: (context, constraints) {
              final wide = constraints.maxWidth >= 900;
              final left = Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  _Pill(text: '${EcommerceData.campaigns.length} campanhas ativas'),
                  const SizedBox(height: 14),
                  Text(
                    'Divulgue campanhas e gere impacto',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: Colors.white,
                          fontSize: wide ? 44 : 32,
                          height: 1.08,
                          fontWeight: FontWeight.w900,
                        ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Uma vitrine moderna para produtos e campanhas, com navegação simples e visual integrado ao sistema.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Colors.white.withValues(alpha: 0.78),
                          fontSize: wide ? 17 : 15,
                          height: 1.45,
                        ),
                  ),
                  const SizedBox(height: 18),
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    children: [
                      ElevatedButton(
                        onPressed: onPrimaryTap,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: const Color(0xFF0B1220),
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                          textStyle: const TextStyle(fontSize: 15.5, fontWeight: FontWeight.w700),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: const Text('Ver campanhas'),
                      ),
                      OutlinedButton(
                        onPressed: onSecondaryTap,
                        style: OutlinedButton.styleFrom(
                          foregroundColor: Colors.white,
                          side: const BorderSide(color: Colors.white24),
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                          textStyle: const TextStyle(fontSize: 15.5, fontWeight: FontWeight.w700),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: const Text('Comecar agora'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: const [
                      _StatChip(label: 'Produtos', value: '4'),
                      _StatChip(label: 'Campanhas', value: '3'),
                      _StatChip(label: 'Visual', value: 'SaaS moderno'),
                    ],
                  ),
                ],
              );

              final right = ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 420),
                child: _CampaignSpotlightCard(campaign: campaign),
              );

              return wide
                  ? Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Expanded(child: left),
                        const SizedBox(width: 24),
                        right,
                      ],
                    )
                  : Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        left,
                        const SizedBox(height: 20),
                        right,
                      ],
                    );
            },
          ),
        ),
      );
    } catch (_) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: const Color(0xFF0B1220),
          borderRadius: BorderRadius.circular(28),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const _Pill(text: '3 campanhas ativas'),
            const SizedBox(height: 14),
            Text(
              'Divulgue campanhas e gere impacto',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.w900,
                  ),
            ),
            const SizedBox(height: 10),
            Text(
              'Uma vitrine moderna para produtos e campanhas, com navegação simples e visual integrado ao sistema.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.white70,
                    fontSize: 15,
                  ),
            ),
          ],
        ),
      );
    }
  }
}

class HorizontalFilters extends StatelessWidget {
  const HorizontalFilters({
    super.key,
    required this.query,
    required this.category,
    required this.ordering,
    required this.onQueryChanged,
    required this.onCategoryChanged,
    required this.onOrderingChanged,
    required this.onClear,
  });

  final String query;
  final String category;
  final String ordering;
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
            color: Color(0x0F0F172A),
            blurRadius: 18,
            offset: Offset(0, 10),
          )
        ],
      ),
      child: Wrap(
        spacing: 12,
        runSpacing: 12,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: [
          SizedBox(
            width: 320,
            child: EcommerceSearchField(
              hint: 'Buscar produtos ou campanhas',
              onChanged: onQueryChanged,
            ),
          ),
          _CompactDropdown(
            value: category,
            items: EcommerceData.categories,
            onChanged: onCategoryChanged,
          ),
          _CompactDropdown(
            value: ordering,
            items: EcommerceData.orderings,
            onChanged: onOrderingChanged,
          ),
          TextButton.icon(
            onPressed: onClear,
            icon: const Icon(Icons.filter_alt_off_rounded),
            label: const Text('Limpar filtros'),
          ),
        ],
      ),
    );
  }
}

class FeaturedCampaigns extends StatelessWidget {
  const FeaturedCampaigns({
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
        final wide = constraints.maxWidth >= 980;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: campaigns.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: wide ? 3 : 1,
            crossAxisSpacing: 14,
            mainAxisSpacing: 14,
      childAspectRatio: wide ? 1.78 : 1.5,
          ),
          itemBuilder: (context, index) {
            return CampaignCard(
              campaign: campaigns[index],
              onTap: () => onTap(campaigns[index]),
            );
          },
        );
      },
    );
  }
}

class ProductGrid extends StatelessWidget {
  const ProductGrid({
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
    final width = MediaQuery.of(context).size.width;
    final crossAxisCount = width >= 1200
        ? 3
        : width >= 760
            ? 2
            : 1;
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: products.length,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: crossAxisCount,
        crossAxisSpacing: 14,
        mainAxisSpacing: 14,
        childAspectRatio: crossAxisCount == 1 ? 1.08 : 1.18,
      ),
      itemBuilder: (context, index) {
        final product = products[index];
        return ProductCard(
          product: product,
          onTap: () => onTap(product),
          onAddToCart: () => onAddToCart(product),
        );
      },
    );
  }
}

class ProductCard extends StatefulWidget {
  const ProductCard({
    super.key,
    required this.product,
    required this.onTap,
    required this.onAddToCart,
  });

  final EcommerceProduct product;
  final VoidCallback onTap;
  final VoidCallback onAddToCart;

  @override
  State<ProductCard> createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) {
    final product = widget.product;
    return MouseRegion(
      onEnter: (_) => setState(() => _hover = true),
      onExit: (_) => setState(() => _hover = false),
      child: AnimatedScale(
        scale: _hover ? 1.01 : 1,
        duration: const Duration(milliseconds: 180),
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
                    color: Colors.black.withValues(alpha: _hover ? 0.09 : 0.04),
                    blurRadius: _hover ? 26 : 16,
                    offset: const Offset(0, 12),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 174,
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(22)),
                      gradient: LinearGradient(
                        colors: product.gradient,
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                    ),
                    child: Stack(
                      children: [
                        Positioned(
                          top: 12,
                          right: 12,
                          child: _Badge(text: product.onOffer ? 'Oferta' : 'Disponivel'),
                        ),
                        Positioned(
                          left: 14,
                          right: 14,
                          bottom: 14,
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      product.category,
                                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                            color: Colors.white70,
                                            fontWeight: FontWeight.w700,
                                          ),
                                    ),
                                    const SizedBox(height: 6),
                                    Text(
                                      product.title,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                            color: Colors.white,
                                            fontSize: 20,
                                            height: 1.15,
                                            fontWeight: FontWeight.w900,
                                          ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 10),
                              ClipRRect(
                                borderRadius: BorderRadius.circular(18),
                                child: Image.asset(
                                  product.bannerImage,
                                  width: 76,
                                  height: 76,
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ],
                          ),
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
                          product.campaignTitle,
                          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                color: CustomColors.baseColor,
                                fontWeight: FontWeight.w800,
                                fontSize: 14,
                              ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          product.supplier,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                color: const Color(0xFF64748B),
                                fontSize: 14,
                              ),
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            Text(
                              money(product.finalPrice),
                              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                    color: const Color(0xFF0F172A),
                                    fontWeight: FontWeight.w900,
                                    fontSize: 28,
                                  ),
                            ),
                            if (product.onOffer) ...[
                              const SizedBox(width: 10),
                              _ChipSoft(text: '-${product.discountPercent.toStringAsFixed(0)}%'),
                            ],
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            Icon(Icons.star_rounded, size: 18, color: Colors.amber.shade700),
                            const SizedBox(width: 4),
                            Text(
                              product.rating.toStringAsFixed(1),
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: const Color(0xFF0F172A),
                                    fontWeight: FontWeight.w700,
                                    fontSize: 14,
                                  ),
                            ),
                            const SizedBox(width: 10),
                            Text(
                              '${product.reviews} reviews',
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: const Color(0xFF64748B),
                                    fontSize: 14,
                                  ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 14),
                        Row(
                          children: [
                            Expanded(
                              child: OutlinedButton(
                                onPressed: widget.onTap,
                                style: OutlinedButton.styleFrom(
                                  side: const BorderSide(color: Color(0xFFE2E8F0)),
                                  foregroundColor: const Color(0xFF0F172A),
                                  padding: const EdgeInsets.symmetric(vertical: 12),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                ),
                                child: const Text('Detalhes'),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: ElevatedButton(
                                onPressed: widget.onAddToCart,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: CustomColors.baseColor,
                                  foregroundColor: Colors.white,
                                  elevation: 0,
                                  padding: const EdgeInsets.symmetric(vertical: 12),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                ),
                                child: const Text('Adicionar'),
                              ),
                            ),
                          ],
                        ),
                      ],
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
}

class CampaignCard extends StatelessWidget {
  const CampaignCard({
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
            borderRadius: BorderRadius.circular(22),
            gradient: LinearGradient(
              colors: campaign.gradient,
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            boxShadow: const [
              BoxShadow(
                color: Color(0x240F172A),
                blurRadius: 24,
                offset: Offset(0, 12),
              ),
            ],
          ),
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _Badge(text: campaign.status, light: true),
                    const SizedBox(height: 10),
                    Text(
                      campaign.title,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.w900,
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      campaign.subtitle,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Colors.white70,
                            height: 1.3,
                            fontSize: 15,
                          ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'Meta ${money(campaign.goal)}',
                      style: Theme.of(context).textTheme.labelLarge?.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                            fontSize: 15,
                          ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              ClipRRect(
                borderRadius: BorderRadius.circular(18),
                child: Image.asset(campaign.bannerImage, width: 90, height: 90, fit: BoxFit.cover),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class EcommerceFooter extends StatelessWidget {
  const EcommerceFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset('assets/images/lightLogo.png', height: 28),
          const SizedBox(height: 10),
          Text(
            'Uma nova vitrine de ecommerce, com a mesma linguagem dos dashboards do divulgador.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFFCBD5E1),
                  fontSize: 13,
                  height: 1.45,
                ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 18,
            runSpacing: 10,
            children: const [
              _FooterLink('Inicio'),
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

class EmptyStateCard extends StatelessWidget {
  const EmptyStateCard({
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
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        children: [
          Container(
            width: 84,
            height: 84,
            decoration: BoxDecoration(
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(24),
            ),
            child: const Icon(Icons.inventory_2_outlined, color: CustomColors.baseColor, size: 42),
          ),
          const SizedBox(height: 14),
          Text(
            title,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                  fontSize: 18,
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
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              child: Text(actionLabel!),
            ),
          ],
        ],
      ),
    );
  }
}

class LoadingStateCard extends StatelessWidget {
  const LoadingStateCard({super.key, this.label = 'Carregando...'});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        children: [
          const SizedBox(
            width: 30,
            height: 30,
            child: CircularProgressIndicator.adaptive(),
          ),
          const SizedBox(height: 12),
          Text(label, style: const TextStyle(fontSize: 14)),
        ],
      ),
    );
  }
}

class CartItemCard extends StatelessWidget {
  const CartItemCard({
    super.key,
    required this.product,
    required this.quantity,
    required this.onIncrease,
    required this.onDecrease,
    required this.onRemove,
  });

  final EcommerceProduct product;
  final int quantity;
  final VoidCallback onIncrease;
  final VoidCallback onDecrease;
  final VoidCallback onRemove;

  @override
  Widget build(BuildContext context) {
    final subtotal = product.finalPrice * quantity;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(18),
                child: Image.asset(product.bannerImage, width: 84, height: 84, fit: BoxFit.cover),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      product.title,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: const Color(0xFF0F172A),
                            fontWeight: FontWeight.w800,
                            fontSize: 18,
                          ),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      product.supplier,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF64748B),
                            fontSize: 14,
                          ),
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: onRemove,
                icon: const Icon(Icons.delete_outline_rounded),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              QuantitySelector(
                quantity: quantity,
                onIncrease: onIncrease,
                onDecrease: onDecrease,
              ),
              const Spacer(),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    money(subtotal),
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: const Color(0xFF0F172A),
                          fontWeight: FontWeight.w900,
                          fontSize: 24,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${money(product.finalPrice)} cada',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: const Color(0xFF64748B),
                          fontSize: 13,
                        ),
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

class QuantitySelector extends StatelessWidget {
  const QuantitySelector({
    super.key,
    required this.quantity,
    required this.onIncrease,
    required this.onDecrease,
  });

  final int quantity;
  final VoidCallback onIncrease;
  final VoidCallback onDecrease;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            onPressed: onDecrease,
            icon: const Icon(Icons.remove_rounded),
          ),
          Text(
            '$quantity',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          IconButton(
            onPressed: onIncrease,
            icon: const Icon(Icons.add_rounded),
          ),
        ],
      ),
    );
  }
}

class SummaryCard extends StatelessWidget {
  const SummaryCard({
    super.key,
    required this.items,
    required this.subtotal,
    required this.shipping,
    required this.total,
    required this.primaryLabel,
    required this.onPrimaryTap,
    this.paymentLabel = 'PIX',
  });

  final int items;
  final double subtotal;
  final double shipping;
  final double total;
  final String paymentLabel;
  final String primaryLabel;
  final VoidCallback onPrimaryTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Resumo do pedido',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 14),
          _Line(label: 'Itens', value: '$items'),
          _Line(label: 'Subtotal', value: money(subtotal)),
          _Line(label: 'Frete', value: money(shipping)),
          _Line(label: 'Pagamento', value: paymentLabel),
          const Divider(height: 24),
          _Line(label: 'Total', value: money(total), strong: true),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: onPrimaryTap,
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomColors.baseColor,
                foregroundColor: Colors.white,
                elevation: 0,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: Text(primaryLabel),
            ),
          ),
        ],
      ),
    );
  }
}

class _Line extends StatelessWidget {
  const _Line({
    required this.label,
    required this.value,
    this.strong = false,
  });

  final String label;
  final String value;
  final bool strong;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: strong ? const Color(0xFF0F172A) : const Color(0xFF64748B),
                  fontSize: 14,
                  fontWeight: strong ? FontWeight.w800 : FontWeight.w600,
                ),
          ),
          const Spacer(),
          Text(
            value,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontSize: 14,
                  fontWeight: strong ? FontWeight.w900 : FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }
}

class _NavLink extends StatelessWidget {
  const _NavLink({
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
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelLarge?.copyWith(
              color: const Color(0xFF0F172A),
              fontWeight: active ? FontWeight.w900 : FontWeight.w600,
              decoration: active ? TextDecoration.underline : null,
              decorationColor: CustomColors.baseColor,
            ),
      ),
    );
  }
}

class _RoundIcon extends StatelessWidget {
  const _RoundIcon({
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
        InkResponse(
          onTap: onTap,
          radius: 26,
          child: Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Icon(icon, color: const Color(0xFF0F172A)),
          ),
        ),
        if (badge != null && badge! > 0)
          Positioned(
            right: -2,
            top: -2,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: CustomColors.baseColor,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                badge! > 99 ? '99+' : badge.toString(),
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ),
          ),
      ],
    );
  }
}

class _Badge extends StatelessWidget {
  const _Badge({
    required this.text,
    this.light = false,
  });

  final String text;
  final bool light;

  @override
  Widget build(BuildContext context) {
    final bg = light ? Colors.white.withValues(alpha: 0.14) : const Color(0xFFEFF6FF);
    final fg = light ? Colors.white : CustomColors.baseColor;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(
          color: light ? Colors.white.withValues(alpha: 0.18) : const Color(0xFFD6E4FF),
        ),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: fg,
              fontWeight: FontWeight.w800,
            ),
      ),
    );
  }
}

class _ChipSoft extends StatelessWidget {
  const _ChipSoft({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
      decoration: BoxDecoration(
        color: const Color(0xFFFDE68A).withValues(alpha: 0.35),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: const Color(0xFF92400E),
              fontWeight: FontWeight.w800,
            ),
      ),
    );
  }
}

class _CampaignSpotlightCard extends StatelessWidget {
  const _CampaignSpotlightCard({required this.campaign});

  final EcommerceCampaign campaign;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          colors: campaign.gradient,
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _Badge(text: campaign.status, light: true),
                Text(
                  campaign.title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w900,
                      ),
                ),
                Text(
                  campaign.subtitle,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Colors.white70,
                      ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(18),
            child: Image.asset(campaign.bannerImage, width: 92, height: 92, fit: BoxFit.cover),
          ),
        ],
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: Theme.of(context).textTheme.labelSmall?.copyWith(color: Colors.white70, fontSize: 11)),
          const SizedBox(height: 4),
          Text(value, style: Theme.of(context).textTheme.titleSmall?.copyWith(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 16)),
        ],
      ),
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({required this.text});

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

class _CompactDropdown extends StatelessWidget {
  const _CompactDropdown({
    required this.value,
    required this.items,
    required this.onChanged,
  });

  final String value;
  final List<String> items;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return DropdownButtonHideUnderline(
      child: DropdownButton<String>(
        value: value,
        borderRadius: BorderRadius.circular(18),
        items: items
            .map((item) => DropdownMenuItem(value: item, child: Text(item)))
            .toList(),
        onChanged: (value) {
          if (value != null) onChanged(value);
        },
      ),
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
          ),
    );
  }
}
