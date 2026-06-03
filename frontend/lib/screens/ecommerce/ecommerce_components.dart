import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:quick_ecommerce/config/colors.dart';

import '../../data/data_model/cart_model.dart';
import 'ecommerce_mock_data.dart';
import 'ecommerce_models.dart';

String formatEcommerceMoney(double value) {
  return NumberFormat.currency(
    locale: 'pt_BR',
    symbol: 'R\$',
  ).format(value);
}

class EcommerceSectionHeader extends StatelessWidget {
  const EcommerceSectionHeader({
    super.key,
    required this.title,
    required this.subtitle,
    this.actionLabel,
    this.onActionTap,
  });

  final String title;
  final String subtitle;
  final String? actionLabel;
  final VoidCallback? onActionTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontSize: kIsWeb ? 20 : 20.sp,
                      fontWeight: FontWeight.w800,
                      color: const Color(0xFF0F172A),
                    ),
              ),
              const SizedBox(height: 6),
              Text(
                subtitle,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      fontSize: kIsWeb ? 13 : 13.sp,
                      height: 1.35,
                      color: const Color(0xFF64748B),
                    ),
              ),
            ],
          ),
        ),
        if (actionLabel != null && onActionTap != null) ...[
          const SizedBox(width: 12),
          TextButton(
            onPressed: onActionTap,
            style: TextButton.styleFrom(
              foregroundColor: CustomColors.baseColor,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            ),
            child: Text(
              actionLabel!,
              style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    color: CustomColors.baseColor,
                    fontWeight: FontWeight.w800,
                  ),
            ),
          ),
        ],
      ],
    );
  }
}

class EcommerceHeader extends StatelessWidget {
  const EcommerceHeader({
    super.key,
    required this.cartCount,
    required this.selectedMenu,
    required this.onMenuSelected,
    required this.onCartTap,
    required this.onUserTap,
    this.showSearchField = true,
    this.onSearchChanged,
  });

  final int cartCount;
  final String selectedMenu;
  final ValueChanged<String> onMenuSelected;
  final VoidCallback onCartTap;
  final VoidCallback onUserTap;
  final bool showSearchField;
  final ValueChanged<String>? onSearchChanged;

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 1024;

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(
            color: const Color(0xFFE2E8F0),
            width: 1,
          ),
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0D0F172A),
            blurRadius: 18,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: isDesktop ? 24 : 16,
            vertical: 14,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                children: [
                  InkWell(
                    onTap: () => onMenuSelected('inicio'),
                    borderRadius: BorderRadius.circular(14),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF8FAFC),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Image.asset(
                            'assets/images/darkLogo.png',
                            height: 28,
                            width: 66,
                            fit: BoxFit.contain,
                          ),
                          const SizedBox(width: 10),
                          Container(
                            width: 1,
                            height: 18,
                            color: const Color(0xFFE2E8F0),
                          ),
                          const SizedBox(width: 10),
                          Text(
                            'Ecommerce',
                            style: Theme.of(context)
                                .textTheme
                                .labelLarge
                                ?.copyWith(
                                  color: const Color(0xFF0F172A),
                                  fontWeight: FontWeight.w800,
                                ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  if (isDesktop) ...[
                    const SizedBox(width: 28),
                    _HeaderMenuItem(
                      label: 'Início',
                      active: selectedMenu == 'inicio',
                      onTap: () => onMenuSelected('inicio'),
                    ),
                    const SizedBox(width: 20),
                    _HeaderMenuItem(
                      label: 'Produtos',
                      active: selectedMenu == 'produtos',
                      onTap: () => onMenuSelected('produtos'),
                    ),
                    const SizedBox(width: 20),
                    _HeaderMenuItem(
                      label: 'Campanhas',
                      active: selectedMenu == 'campanhas',
                      onTap: () => onMenuSelected('campanhas'),
                    ),
                    const SizedBox(width: 20),
                    _HeaderMenuItem(
                      label: 'Ofertas',
                      active: selectedMenu == 'ofertas',
                      onTap: () => onMenuSelected('ofertas'),
                    ),
                    const SizedBox(width: 20),
                    Expanded(
                      child: showSearchField
                          ? Padding(
                              padding: const EdgeInsets.only(right: 18),
                              child: EcommerceSearchBar(
                                hint:
                                    'Buscar produtos, campanhas ou fornecedores',
                                onChanged: onSearchChanged ?? (_) {},
                              ),
                            )
                          : const SizedBox.shrink(),
                    ),
                  ] else ...[
                    const Spacer(),
                  ],
                  _HeaderActionButton(
                    icon: Icons.person_outline_rounded,
                    onTap: onUserTap,
                  ),
                  const SizedBox(width: 10),
                  _HeaderActionButton(
                    icon: Icons.shopping_cart_outlined,
                    badge: cartCount,
                    onTap: onCartTap,
                  ),
                  if (!isDesktop) ...[
                    const SizedBox(width: 10),
                    PopupMenuButton<String>(
                      onSelected: onMenuSelected,
                      icon: const Icon(Icons.menu_rounded),
                      itemBuilder: (context) => const [
                        PopupMenuItem(value: 'inicio', child: Text('Início')),
                        PopupMenuItem(
                          value: 'produtos',
                          child: Text('Produtos'),
                        ),
                        PopupMenuItem(
                          value: 'campanhas',
                          child: Text('Campanhas'),
                        ),
                        PopupMenuItem(
                          value: 'ofertas',
                          child: Text('Ofertas'),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
              if (!isDesktop && showSearchField) ...[
                const SizedBox(height: 12),
                EcommerceSearchBar(
                  hint: 'Buscar produtos, campanhas ou fornecedores',
                  onChanged: onSearchChanged ?? (_) {},
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class EcommerceSearchBar extends StatelessWidget {
  const EcommerceSearchBar({
    super.key,
    required this.hint,
    required this.onChanged,
    this.controller,
  });

  final String hint;
  final ValueChanged<String> onChanged;
  final TextEditingController? controller;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: TextField(
        controller: controller,
        onChanged: onChanged,
        decoration: InputDecoration(
          border: InputBorder.none,
          prefixIcon: const Icon(Icons.search_rounded, color: Color(0xFF94A3B8)),
          hintText: hint,
          hintStyle: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: const Color(0xFF94A3B8),
              ),
        ),
      ),
    );
  }
}

class EcommerceFilterSidebar extends StatelessWidget {
  const EcommerceFilterSidebar({
    super.key,
    required this.category,
    required this.supplier,
    required this.status,
    required this.minPrice,
    required this.maxPrice,
    required this.sortMode,
    required this.onCategoryChanged,
    required this.onSupplierChanged,
    required this.onStatusChanged,
    required this.onMinPriceChanged,
    required this.onMaxPriceChanged,
    required this.onSortModeChanged,
    required this.onClear,
    this.compact = false,
  });

  final String category;
  final String supplier;
  final String status;
  final double minPrice;
  final double maxPrice;
  final String sortMode;
  final ValueChanged<String> onCategoryChanged;
  final ValueChanged<String> onSupplierChanged;
  final ValueChanged<String> onStatusChanged;
  final ValueChanged<double> onMinPriceChanged;
  final ValueChanged<double> onMaxPriceChanged;
  final ValueChanged<String> onSortModeChanged;
  final VoidCallback onClear;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              'Filtros',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: const Color(0xFF0F172A),
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const Spacer(),
            TextButton(
              onPressed: onClear,
              child: const Text('Limpar'),
            ),
          ],
        ),
        const SizedBox(height: 12),
        _FilterField(
          label: 'Categoria',
          child: DropdownButtonFormField<String>(
            value: category,
            decoration: _filterDecoration(),
            items: EcommerceMockData.categories
                .map(
                  (value) => DropdownMenuItem(
                    value: value,
                    child: Text(value),
                  ),
                )
                .toList(),
            onChanged: (value) => onCategoryChanged(value ?? 'Todos'),
          ),
        ),
        const SizedBox(height: 12),
        _FilterField(
          label: 'Fornecedor',
          child: DropdownButtonFormField<String>(
            value: supplier,
            decoration: _filterDecoration(),
            items: EcommerceMockData.suppliers
                .map(
                  (value) => DropdownMenuItem(
                    value: value,
                    child: Text(value),
                  ),
                )
                .toList(),
            onChanged: (value) => onSupplierChanged(value ?? 'Todos'),
          ),
        ),
        const SizedBox(height: 12),
        _FilterField(
          label: 'Status',
          child: DropdownButtonFormField<String>(
            value: status,
            decoration: _filterDecoration(),
            items: EcommerceMockData.statuses
                .map(
                  (value) => DropdownMenuItem(
                    value: value,
                    child: Text(value),
                  ),
                )
                .toList(),
            onChanged: (value) => onStatusChanged(value ?? 'Todos'),
          ),
        ),
        const SizedBox(height: 12),
        _FilterField(
          label: 'Ordenação',
          child: DropdownButtonFormField<String>(
            value: sortMode,
            decoration: _filterDecoration(),
            items: const [
              DropdownMenuItem(value: 'relevancia', child: Text('Relevância')),
              DropdownMenuItem(value: 'menor-preco', child: Text('Menor preço')),
              DropdownMenuItem(value: 'maior-preco', child: Text('Maior preço')),
              DropdownMenuItem(value: 'melhor-avaliacao', child: Text('Melhor avaliação')),
            ],
            onChanged: (value) => onSortModeChanged(value ?? 'relevancia'),
          ),
        ),
        const SizedBox(height: 16),
        _FilterField(
          label: 'Faixa de preço',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              RangeSlider(
                values: RangeValues(minPrice, maxPrice),
                min: 0,
                max: 300,
                divisions: 30,
                activeColor: CustomColors.baseColor,
                labels: RangeLabels(
                  formatEcommerceMoney(minPrice),
                  formatEcommerceMoney(maxPrice),
                ),
                onChanged: (value) {
                  onMinPriceChanged(value.start);
                  onMaxPriceChanged(value.end);
                },
              ),
              Row(
                children: [
                  Expanded(
                    child: _PillInfo(
                      label: 'De',
                      value: formatEcommerceMoney(minPrice),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _PillInfo(
                      label: 'Até',
                      value: formatEcommerceMoney(maxPrice),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );

    if (!compact) {
      return Container(
        padding: const EdgeInsets.all(18),
        decoration: _panelDecoration(),
        child: content,
      );
    }

    return Container(
      decoration: _panelDecoration(),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: content,
      ),
    );
  }

  InputDecoration _filterDecoration() {
    return InputDecoration(
      filled: true,
      fillColor: const Color(0xFFF8FAFC),
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
        borderSide: const BorderSide(color: CustomColors.baseColor),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
    );
  }

  BoxDecoration _panelDecoration() {
    return BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(22),
      border: Border.all(color: const Color(0xFFE2E8F0)),
      boxShadow: const [
        BoxShadow(
          color: Color(0x0F0F172A),
          blurRadius: 18,
          offset: Offset(0, 12),
        ),
      ],
    );
  }
}

class _FilterField extends StatelessWidget {
  const _FilterField({
    required this.label,
    required this.child,
  });

  final String label;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: const Color(0xFF0F172A),
                fontWeight: FontWeight.w800,
              ),
        ),
        const SizedBox(height: 8),
        child,
      ],
    );
  }
}

class _PillInfo extends StatelessWidget {
  const _PillInfo({
    required this.label,
    required this.value,
  });

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: const Color(0xFF64748B),
                ),
          ),
          const SizedBox(height: 3),
          Text(
            value,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
        ],
      ),
    );
  }
}

class EcommerceProductCard extends StatefulWidget {
  const EcommerceProductCard({
    super.key,
    required this.product,
    required this.onTap,
    required this.onAddToCart,
    required this.priceFormatter,
  });

  final EcommerceProduct product;
  final VoidCallback onTap;
  final VoidCallback onAddToCart;
  final String Function(double) priceFormatter;

  @override
  State<EcommerceProductCard> createState() => _EcommerceProductCardState();
}

class _EcommerceProductCardState extends State<EcommerceProductCard> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final product = widget.product;
    final discounted = product.discountedPrice;

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedScale(
        scale: _hovered ? 1.01 : 1.0,
        duration: const Duration(milliseconds: 180),
        curve: Curves.easeOut,
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: widget.onTap,
            borderRadius: BorderRadius.circular(24),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: _hovered ? 0.09 : 0.04),
                    blurRadius: _hovered ? 24 : 16,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 174,
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(24),
                      ),
                      gradient: LinearGradient(
                        colors: product.bannerGradient,
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                    ),
                    child: Stack(
                      children: [
                        Positioned(
                          top: 16,
                          right: 16,
                          child: _Badge(label: product.status),
                        ),
                        Positioned(
                          left: 18,
                          right: 18,
                          bottom: 18,
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
                                      style: Theme.of(context)
                                          .textTheme
                                          .labelSmall
                                          ?.copyWith(
                                            color: Colors.white70,
                                            fontWeight: FontWeight.w700,
                                          ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      product.title,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: Theme.of(context)
                                          .textTheme
                                          .titleMedium
                                          ?.copyWith(
                                            color: Colors.white,
                                            fontSize: 18,
                                            height: 1.1,
                                            fontWeight: FontWeight.w800,
                                          ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 12),
                              ClipRRect(
                                borderRadius: BorderRadius.circular(18),
                                child: Image.asset(
                                  product.bannerImage,
                                  width: 82,
                                  height: 82,
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
                    padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          product.campaignTitle,
                          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                color: CustomColors.baseColor,
                                fontWeight: FontWeight.w800,
                              ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          product.supplier,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                color: const Color(0xFF64748B),
                              ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Text(
                              widget.priceFormatter(discounted),
                              style: Theme.of(context)
                                  .textTheme
                                  .headlineSmall
                                  ?.copyWith(
                                    color: const Color(0xFF0F172A),
                                    fontWeight: FontWeight.w900,
                                  ),
                            ),
                            if (product.discountPercent > 0) ...[
                              const SizedBox(width: 10),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8,
                                  vertical: 5,
                                ),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFFDE68A).withValues(alpha: 0.45),
                                  borderRadius: BorderRadius.circular(999),
                                ),
                                child: Text(
                                  '-${product.discountPercent.toStringAsFixed(0)}%',
                                  style: Theme.of(context)
                                      .textTheme
                                      .labelSmall
                                      ?.copyWith(
                                        color: const Color(0xFF92400E),
                                        fontWeight: FontWeight.w800,
                                      ),
                                ),
                              ),
                            ],
                          ],
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            Icon(
                              Icons.star_rounded,
                              size: 18,
                              color: Colors.amber.shade700,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              product.rating.toStringAsFixed(1),
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: const Color(0xFF0F172A),
                                    fontWeight: FontWeight.w700,
                                  ),
                            ),
                            const SizedBox(width: 10),
                            Text(
                              '${product.reviews} avaliações',
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: const Color(0xFF64748B),
                                  ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: OutlinedButton(
                                onPressed: widget.onTap,
                                style: OutlinedButton.styleFrom(
                                  side: const BorderSide(color: Color(0xFFE2E8F0)),
                                  foregroundColor: const Color(0xFF0F172A),
                                  padding: const EdgeInsets.symmetric(vertical: 14),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                ),
                                child: const Text('Ver detalhes'),
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
                                  padding: const EdgeInsets.symmetric(vertical: 14),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
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

class EcommerceCampaignCard extends StatefulWidget {
  const EcommerceCampaignCard({
    super.key,
    required this.campaign,
    required this.onTap,
  });

  final EcommerceCampaign campaign;
  final VoidCallback onTap;

  @override
  State<EcommerceCampaignCard> createState() => _EcommerceCampaignCardState();
}

class _EcommerceCampaignCardState extends State<EcommerceCampaignCard> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    final campaign = widget.campaign;
    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedScale(
        scale: _hovered ? 1.01 : 1.0,
        duration: const Duration(milliseconds: 180),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: widget.onTap,
            borderRadius: BorderRadius.circular(24),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                gradient: LinearGradient(
                  colors: campaign.bannerGradient,
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: _hovered ? 0.12 : 0.08),
                    blurRadius: _hovered ? 24 : 18,
                    offset: const Offset(0, 12),
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _Badge(label: campaign.status, light: true),
                          const SizedBox(height: 14),
                          Text(
                            campaign.title,
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w900,
                                ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            campaign.subtitle,
                            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                  color: Colors.white70,
                                  height: 1.35,
                                ),
                          ),
                          const SizedBox(height: 14),
                          Text(
                            'Meta ${formatEcommerceMoney(campaign.financialGoal)}',
                            style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w800,
                                ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(20),
                      child: Image.asset(
                        campaign.bannerImage,
                        height: 112,
                        width: 112,
                        fit: BoxFit.cover,
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

class EcommerceQuantitySelector extends StatelessWidget {
  const EcommerceQuantitySelector({
    super.key,
    required this.quantity,
    required this.onIncrease,
    required this.onDecrease,
    this.compact = false,
  });

  final int quantity;
  final VoidCallback onIncrease;
  final VoidCallback onDecrease;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final height = compact ? 40.0 : 46.0;
    return Container(
      height: height,
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
            iconSize: compact ? 18 : 20,
            constraints: const BoxConstraints.tightFor(width: 40, height: 40),
            padding: EdgeInsets.zero,
            icon: const Icon(Icons.remove_rounded),
          ),
          Text(
            quantity.toString(),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          IconButton(
            onPressed: onIncrease,
            iconSize: compact ? 18 : 20,
            constraints: const BoxConstraints.tightFor(width: 40, height: 40),
            padding: EdgeInsets.zero,
            icon: const Icon(Icons.add_rounded),
          ),
        ],
      ),
    );
  }
}

class EcommerceCartItemCard extends StatelessWidget {
  const EcommerceCartItemCard({
    super.key,
    required this.item,
    required this.quantity,
    required this.onIncrease,
    required this.onDecrease,
    required this.onRemove,
  });

  final EcommerceProduct item;
  final int quantity;
  final VoidCallback onIncrease;
  final VoidCallback onDecrease;
  final VoidCallback onRemove;

  @override
  Widget build(BuildContext context) {
    final subtotal = item.discountedPrice * quantity;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
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
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(18),
                child: Image.asset(
                  item.bannerImage,
                  height: 88,
                  width: 88,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.title,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: const Color(0xFF0F172A),
                            fontWeight: FontWeight.w800,
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      item.supplier,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF64748B),
                          ),
                    ),
                    const SizedBox(height: 10),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: item.features
                          .take(2)
                          .map(
                            (feature) => _Badge(
                              label: feature,
                              accent: item.accentColor,
                            ),
                          )
                          .toList(),
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
          const SizedBox(height: 16),
          Row(
            children: [
              EcommerceQuantitySelector(
                quantity: quantity,
                onIncrease: onIncrease,
                onDecrease: onDecrease,
                compact: true,
              ),
              const Spacer(),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    formatEcommerceMoney(subtotal),
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: const Color(0xFF0F172A),
                          fontWeight: FontWeight.w900,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${formatEcommerceMoney(item.discountedPrice)} cada',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: const Color(0xFF64748B),
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

class EcommerceCheckoutSummary extends StatelessWidget {
  const EcommerceCheckoutSummary({
    super.key,
    required this.itemsCount,
    required this.subtotal,
    required this.shipping,
    required this.total,
    required this.onPrimaryAction,
    required this.primaryLabel,
    this.paymentMethod = 'PIX',
  });

  final int itemsCount;
  final double subtotal;
  final double shipping;
  final double total;
  final VoidCallback onPrimaryAction;
  final String primaryLabel;
  final String paymentMethod;

  @override
  Widget build(BuildContext context) {
    return Container(
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
            'Resumo do pedido',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 14),
          _SummaryLine(
            label: 'Itens',
            value: '$itemsCount',
          ),
          _SummaryLine(
            label: 'Subtotal',
            value: formatEcommerceMoney(subtotal),
          ),
          _SummaryLine(
            label: 'Frete',
            value: formatEcommerceMoney(shipping),
          ),
          const Divider(height: 24),
          _SummaryLine(
            label: 'Pagamento',
            value: paymentMethod,
            strong: true,
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Text(
                'Total',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: const Color(0xFF0F172A),
                      fontWeight: FontWeight.w800,
                    ),
              ),
              const Spacer(),
              Text(
                formatEcommerceMoney(total),
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: const Color(0xFF0F172A),
                      fontWeight: FontWeight.w900,
                    ),
              ),
            ],
          ),
          const SizedBox(height: 18),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: onPrimaryAction,
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomColors.baseColor,
                foregroundColor: Colors.white,
                elevation: 0,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: Text(
                primaryLabel,
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class EcommerceEmptyState extends StatelessWidget {
  const EcommerceEmptyState({
    super.key,
    required this.title,
    required this.subtitle,
    this.actionLabel,
    this.onActionTap,
  });

  final String title;
  final String subtitle;
  final String? actionLabel;
  final VoidCallback? onActionTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 84,
            height: 84,
            decoration: BoxDecoration(
              color: const Color(0xFFEFF6FF),
              borderRadius: BorderRadius.circular(24),
            ),
            child: const Icon(
              Icons.inbox_rounded,
              size: 40,
              color: CustomColors.baseColor,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            subtitle,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                  height: 1.35,
                ),
          ),
          if (actionLabel != null && onActionTap != null) ...[
            const SizedBox(height: 18),
            ElevatedButton(
              onPressed: onActionTap,
              style: ElevatedButton.styleFrom(
                backgroundColor: CustomColors.baseColor,
                foregroundColor: Colors.white,
                elevation: 0,
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
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

class EcommerceLoadingState extends StatelessWidget {
  const EcommerceLoadingState({super.key, this.message = 'Carregando vitrine...'});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const SizedBox(
            width: 32,
            height: 32,
            child: CircularProgressIndicator.adaptive(),
          ),
          const SizedBox(height: 14),
          Text(
            message,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF334155),
                  fontWeight: FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }
}

class EcommerceFooter extends StatelessWidget {
  const EcommerceFooter({super.key});

  @override
  Widget build(BuildContext context) {
    final isDesktop = MediaQuery.of(context).size.width >= 900;

    return Container(
      margin: const EdgeInsets.only(top: 28),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 28),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
        boxShadow: const [
          BoxShadow(
            color: Color(0x200F172A),
            blurRadius: 18,
            offset: Offset(0, -8),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.asset(
                      'assets/images/lightLogo.png',
                      height: 32,
                      fit: BoxFit.contain,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Uma vitrine criada para parecer parte natural do ecossistema do sistema.',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFFCBD5E1),
                            height: 1.45,
                          ),
                    ),
                  ],
                ),
              ),
              if (isDesktop) ...[
                const SizedBox(width: 24),
                _FooterColumn(
                  title: 'Vitrine',
                  links: const ['Início', 'Produtos', 'Campanhas', 'Ofertas'],
                ),
                const SizedBox(width: 24),
                _FooterColumn(
                  title: 'Suporte',
                  links: const ['Carrinho', 'Checkout', 'Pedido', 'Contato'],
                ),
              ],
            ],
          ),
          const SizedBox(height: 22),
          const Divider(color: Color(0xFF1E293B)),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: Text(
                  '© 2026 Kilocao. Ecommerce, dashboard e operação no mesmo padrão visual.',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: const Color(0xFF94A3B8),
                      ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class EcommerceMiniCartDrawer extends StatelessWidget {
  const EcommerceMiniCartDrawer({
    super.key,
    required this.items,
    required this.onIncrease,
    required this.onDecrease,
    required this.onRemove,
    required this.onCheckout,
    required this.onOpenCart,
  });

  final List<CartItem> items;
  final void Function(CartItem item) onIncrease;
  final void Function(CartItem item) onDecrease;
  final void Function(CartItem item) onRemove;
  final VoidCallback onCheckout;
  final VoidCallback onOpenCart;

  @override
  Widget build(BuildContext context) {
    final subtotal = items.fold<double>(
      0,
      (sum, item) => sum + (double.tryParse(item.price) ?? 0) * item.quantity,
    );

    return Drawer(
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.horizontal(left: Radius.circular(28)),
      ),
      child: SafeArea(
        child: Container(
          width: 380,
          padding: const EdgeInsets.all(18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    'Mini carrinho',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: const Color(0xFF0F172A),
                          fontWeight: FontWeight.w800,
                        ),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: onOpenCart,
                    icon: const Icon(Icons.open_in_new_rounded),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Expanded(
                child: items.isEmpty
                    ? const EcommerceEmptyState(
                        title: 'Carrinho vazio',
                        subtitle: 'Adicione produtos para ver o resumo rápido.',
                      )
                    : ListView.separated(
                        itemCount: items.length,
                        separatorBuilder: (_, __) => const SizedBox(height: 12),
                        itemBuilder: (context, index) {
                          final item = items[index];
                            final product = EcommerceMockData
                                    .productByCartProductId(item.productId) ??
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
                          return Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF8FAFC),
                              borderRadius: BorderRadius.circular(18),
                              border: Border.all(color: const Color(0xFFE2E8F0)),
                            ),
                            child: Row(
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(14),
                                  child: Image.asset(
                                    product.bannerImage,
                                    width: 64,
                                    height: 64,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        product.title,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodyMedium
                                            ?.copyWith(
                                              color: const Color(0xFF0F172A),
                                              fontWeight: FontWeight.w800,
                                            ),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        formatEcommerceMoney(
                                          (double.tryParse(item.price) ?? 0) *
                                              item.quantity,
                                        ),
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodySmall
                                            ?.copyWith(
                                              color: const Color(0xFF64748B),
                                            ),
                                      ),
                                    ],
                                  ),
                                ),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.end,
                                  children: [
                                    EcommerceQuantitySelector(
                                      quantity: item.quantity,
                                      compact: true,
                                      onIncrease: () => onIncrease(item),
                                      onDecrease: () => onDecrease(item),
                                    ),
                                    IconButton(
                                      onPressed: () => onRemove(item),
                                      icon: const Icon(Icons.close_rounded),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          );
                        },
                      ),
              ),
              const SizedBox(height: 14),
              _SummaryLine(
                label: 'Subtotal',
                value: formatEcommerceMoney(subtotal),
                strong: true,
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: onCheckout,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: CustomColors.baseColor,
                    foregroundColor: Colors.white,
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: const Text('Ir para checkout'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SummaryLine extends StatelessWidget {
  const _SummaryLine({
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
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: strong ? const Color(0xFF0F172A) : const Color(0xFF64748B),
                  fontWeight: strong ? FontWeight.w800 : FontWeight.w600,
                ),
          ),
          const Spacer(),
          Text(
            value,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: strong ? FontWeight.w800 : FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }
}

class _HeaderMenuItem extends StatelessWidget {
  const _HeaderMenuItem({
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
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: const Color(0xFF0F172A),
                fontWeight: active ? FontWeight.w800 : FontWeight.w600,
                decoration: active ? TextDecoration.underline : null,
                decorationColor: CustomColors.baseColor,
                decorationThickness: 1.8,
              ),
        ),
      ),
    );
  }
}

class _HeaderActionButton extends StatelessWidget {
  const _HeaderActionButton({
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
          radius: 24,
          child: Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Icon(icon, size: 22, color: const Color(0xFF0F172A)),
          ),
        ),
        if (badge != null && badge! > 0)
          Positioned(
            right: -1,
            top: -1,
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
    required this.label,
    this.light = false,
    this.accent,
  });

  final String label;
  final bool light;
  final Color? accent;

  @override
  Widget build(BuildContext context) {
    final background = light
        ? Colors.white.withValues(alpha: 0.16)
        : (accent ?? CustomColors.baseColor).withValues(alpha: 0.1);
    final foreground = light
        ? Colors.white
        : accent ?? CustomColors.baseColor;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(
          color: light
              ? Colors.white.withValues(alpha: 0.18)
              : (accent ?? CustomColors.baseColor).withValues(alpha: 0.18),
        ),
      ),
      child: Text(
        label,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: foreground,
              fontWeight: FontWeight.w800,
            ),
      ),
    );
  }
}

class _FooterColumn extends StatelessWidget {
  const _FooterColumn({
    required this.title,
    required this.links,
  });

  final String title;
  final List<String> links;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w800,
              ),
        ),
        const SizedBox(height: 12),
        ...links.map(
          (link) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Text(
              link,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: const Color(0xFFCBD5E1),
                  ),
            ),
          ),
        ),
      ],
    );
  }
}
