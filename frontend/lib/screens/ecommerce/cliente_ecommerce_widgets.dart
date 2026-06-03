import 'package:flutter/material.dart';

import 'cliente_ecommerce_models.dart';

String clienteMoney(double value) =>
    'R\$ ${value.toStringAsFixed(2).replaceAll('.', ',')}';

class ClientePageShell extends StatelessWidget {
  const ClientePageShell({
    super.key,
    required this.title,
    required this.subtitle,
    required this.child,
    this.trailing,
  });

  final String title;
  final String subtitle;
  final Widget child;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF3F6FB),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              decoration: const BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Color(0x0D0F172A),
                    blurRadius: 24,
                    offset: Offset(0, 10),
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
                child: Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                fontWeight: FontWeight.w900,
                                color: const Color(0xFF0F172A),
                              ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          subtitle,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                color: const Color(0xFF64748B),
                              ),
                        ),
                      ],
                    ),
                    const Spacer(),
                    trailing ?? Image.asset('assets/images/darkLogo.png', height: 28),
                  ],
                ),
              ),
            ),
            Expanded(child: child),
          ],
        ),
      ),
    );
  }
}

class ClienteSectionTitle extends StatelessWidget {
  const ClienteSectionTitle({super.key, required this.title, required this.subtitle});

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
                fontSize: 24,
                fontWeight: FontWeight.w900,
                color: const Color(0xFF0F172A),
              ),
        ),
        const SizedBox(height: 6),
        Text(
          subtitle,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: const Color(0xFF64748B),
              ),
        ),
      ],
    );
  }
}

class ClienteProductCard extends StatelessWidget {
  const ClienteProductCard({
    super.key,
    required this.product,
    required this.onTap,
    required this.onAddToCart,
  });

  final ClienteProduct product;
  final VoidCallback onTap;
  final VoidCallback onAddToCart;

  @override
  Widget build(BuildContext context) {
    final stockLabel = product.availableStock > 0
        ? 'Estoque disponível: ${product.availableStock}'
        : 'Sem estoque disponível';

    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(24),
      elevation: 0,
      child: InkWell(
        borderRadius: BorderRadius.circular(24),
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                child: AspectRatio(
                  aspectRatio: 1.2,
                  child: _ProductImage(url: product.displayImage),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _Pill(text: product.supplierName),
                    const SizedBox(height: 10),
                    Text(
                      product.name,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w900,
                            color: const Color(0xFF0F172A),
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      product.packaging,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF475569),
                          ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      clienteMoney(product.price),
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w900,
                            color: const Color(0xFF1D4ED8),
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      stockLabel,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF64748B),
                          ),
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton(
                            onPressed: onTap,
                            child: const Text('Ver detalhes'),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: onAddToCart,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF1D4ED8),
                              foregroundColor: Colors.white,
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
    );
  }
}

class ClienteCampaignCard extends StatelessWidget {
  const ClienteCampaignCard({
    super.key,
    required this.campaign,
    required this.selected,
    required this.onTap,
  });

  final ClienteCampaign campaign;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 180),
      curve: Curves.easeOut,
      decoration: BoxDecoration(
        color: selected ? const Color(0xFFEFF6FF) : Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(
          color: selected ? const Color(0xFF1D4ED8) : const Color(0xFFE2E8F0),
          width: selected ? 1.5 : 1,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x080F172A),
            blurRadius: 18,
            offset: Offset(0, 10),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(22),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        campaign.title,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w900,
                              color: const Color(0xFF0F172A),
                            ),
                      ),
                    ),
                    if (selected)
                      const Icon(Icons.check_circle_rounded, color: Color(0xFF1D4ED8))
                    else
                      const Icon(Icons.radio_button_unchecked_rounded, color: Color(0xFF94A3B8)),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  campaign.objective,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: const Color(0xFF475569),
                        height: 1.4,
                      ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    _Pill(text: campaign.responsibleName),
                    _Pill(text: clienteMoney(campaign.goalAmount)),
                    _Pill(text: campaign.status),
                  ],
                ),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(999),
                  child: LinearProgressIndicator(
                    minHeight: 10,
                    value: campaign.progressPercent / 100,
                    backgroundColor: const Color(0xFFE2E8F0),
                    valueColor: const AlwaysStoppedAnimation(Color(0xFF1D4ED8)),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '${campaign.progressPercent.toStringAsFixed(0)}% concluído',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: const Color(0xFF64748B),
                      ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class ClienteSummaryCard extends StatelessWidget {
  const ClienteSummaryCard({
    super.key,
    required this.itemsCount,
    required this.subtotal,
    required this.total,
    required this.selectedCampaign,
    required this.primaryLabel,
    required this.onPrimaryTap,
    this.secondaryLabel,
    this.onSecondaryTap,
    this.errorMessage,
  });

  final int itemsCount;
  final double subtotal;
  final double total;
  final ClienteCampaign? selectedCampaign;
  final String primaryLabel;
  final VoidCallback onPrimaryTap;
  final String? secondaryLabel;
  final VoidCallback? onSecondaryTap;
  final String? errorMessage;

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
          Text(
            'Resumo',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w900,
                  color: const Color(0xFF0F172A),
                ),
          ),
          const SizedBox(height: 12),
          _Line(label: 'Itens', value: itemsCount.toString()),
          _Line(label: 'Subtotal', value: clienteMoney(subtotal)),
          _Line(label: 'Total', value: clienteMoney(total), strong: true),
          const SizedBox(height: 12),
          _Pill(text: selectedCampaign?.title ?? 'Nenhuma campanha selecionada'),
          if (errorMessage != null && errorMessage!.trim().isNotEmpty) ...[
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF1F2),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFFCA5A5)),
              ),
              child: Text(
                errorMessage!,
                style: const TextStyle(color: Color(0xFFB91C1C), fontWeight: FontWeight.w600),
              ),
            ),
          ],
          const SizedBox(height: 14),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: onPrimaryTap,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF1D4ED8),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: Text(primaryLabel),
            ),
          ),
          if (secondaryLabel != null && onSecondaryTap != null) ...[
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: onSecondaryTap,
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: Text(secondaryLabel!),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class ClienteTimeline extends StatelessWidget {
  const ClienteTimeline({
    super.key,
    required this.currentStatus,
    this.horizontal = false,
  });

  final String currentStatus;
  final bool horizontal;

  static const steps = [
    ('pedido_recebido', 'Pedido recebido'),
    ('em_separacao', 'Pedido em separação'),
    ('enviado', 'Pedido enviado'),
    ('entregue', 'Pedido entregue'),
  ];

  @override
  Widget build(BuildContext context) {
    final activeIndex = steps.indexWhere((step) => step.$1 == currentStatus);
    final normalizedIndex = activeIndex < 0 ? 0 : activeIndex;

    if (horizontal) {
      return Row(
        children: List.generate(steps.length * 2 - 1, (index) {
          if (index.isOdd) {
            return Expanded(
              child: Container(height: 2, color: const Color(0xFFE2E8F0)),
            );
          }
          final stepIndex = index ~/ 2;
          final isActive = stepIndex <= normalizedIndex;
          return Expanded(
            child: Column(
              children: [
                CircleAvatar(
                  radius: 16,
                  backgroundColor: isActive ? const Color(0xFF1D4ED8) : const Color(0xFFE2E8F0),
                  child: Icon(
                    isActive ? Icons.check_rounded : Icons.more_horiz_rounded,
                    size: 16,
                    color: isActive ? Colors.white : const Color(0xFF64748B),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  steps[stepIndex].$2,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: isActive ? const Color(0xFF0F172A) : const Color(0xFF94A3B8),
                        fontWeight: FontWeight.w700,
                      ),
                ),
              ],
            ),
          );
        }),
      );
    }

    return Column(
      children: List.generate(steps.length * 2 - 1, (index) {
        if (index.isOdd) {
          return Container(
            width: 2,
            height: 22,
            color: const Color(0xFFE2E8F0),
          );
        }
        final stepIndex = index ~/ 2;
        final isActive = stepIndex <= normalizedIndex;
        return Row(
          children: [
            CircleAvatar(
              radius: 16,
              backgroundColor: isActive ? const Color(0xFF1D4ED8) : const Color(0xFFE2E8F0),
              child: Icon(
                isActive ? Icons.check_rounded : Icons.more_horiz_rounded,
                size: 16,
                color: isActive ? Colors.white : const Color(0xFF64748B),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                steps[stepIndex].$2,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: isActive ? const Color(0xFF0F172A) : const Color(0xFF94A3B8),
                      fontWeight: FontWeight.w700,
                    ),
              ),
            ),
          ],
        );
      }),
    );
  }
}

class _ProductImage extends StatelessWidget {
  const _ProductImage({required this.url});

  final String url;

  @override
  Widget build(BuildContext context) {
    if (url.startsWith('http')) {
      return Image.network(
        url,
        fit: BoxFit.cover,
        errorBuilder: (_, __, ___) => Image.asset('assets/images/noImage.png', fit: BoxFit.cover),
      );
    }
    if (url.startsWith('assets/')) {
      return Image.asset(url, fit: BoxFit.cover);
    }
    return Image.asset('assets/images/noImage.png', fit: BoxFit.cover);
  }
}

class _Line extends StatelessWidget {
  const _Line({required this.label, required this.value, this.strong = false});

  final String label;
  final String value;
  final bool strong;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
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
                  fontWeight: strong ? FontWeight.w900 : FontWeight.w600,
                ),
          ),
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
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(999),
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
