import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../config/colors.dart';
import 'ecommerce_v2_models.dart';
import 'ecommerce_v2_widgets.dart';

class EcommerceSuccessPage extends StatelessWidget {
  const EcommerceSuccessPage({
    super.key,
    this.summary,
    this.orderNumber,
    this.total,
    this.paymentMethod,
    this.itemsCount,
  });

  final EcommerceOrderSummary? summary;
  final String? orderNumber;
  final double? total;
  final String? paymentMethod;
  final int? itemsCount;

  @override
  Widget build(BuildContext context) {
    final data = summary ??
        EcommerceOrderSummary(
          orderNumber: orderNumber ?? 'KC-DEMO-2026',
          customerName: 'Cliente',
          email: 'cliente@exemplo.com',
          paymentMethod: paymentMethod ?? 'PIX',
          subtotal: total ?? 0,
          shipping: 0,
          total: total ?? 0,
          itemsCount: itemsCount ?? 0,
          address: 'Endereco informado no checkout',
        );

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: 0,
              currentSection: 'inicio',
              onSectionSelected: (_) => context.go('/'),
              onMenuTap: () => context.go('/'),
              onUserTap: () => context.go('/'),
              onCartTap: () => context.go('/cart'),
              onSearchChanged: (_) {},
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(30),
                      gradient: const LinearGradient(
                        colors: [Color(0xFF0F172A), Color(0xFF1D4ED8)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const _Pill(text: 'Pedido concluido'),
                        const SizedBox(height: 16),
                        Text(
                          'Compra finalizada com sucesso',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                color: Colors.white,
                                fontSize: 32,
                                fontWeight: FontWeight.w900,
                                height: 1.05,
                              ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          'Seu pedido ${data.orderNumber} foi registrado. O fluxo novo termina aqui com um resumo claro e visual limpo.',
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: Colors.white70,
                                height: 1.45,
                              ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 18),
                  _SummaryPanel(summary: data),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    children: [
                      ElevatedButton(
                        onPressed: () => context.go('/'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: CustomColors.baseColor,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: const Text('Voltar para vitrine'),
                      ),
                      OutlinedButton(
                        onPressed: () => context.go('/cart'),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFF0F172A),
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: const Text('Revisar carrinho'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SummaryPanel extends StatelessWidget {
  const _SummaryPanel({required this.summary});

  final EcommerceOrderSummary summary;

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
        children: [
          _Line(label: 'Pedido', value: summary.orderNumber),
          _Line(label: 'Cliente', value: summary.customerName),
          _Line(label: 'Pagamento', value: summary.paymentMethod),
          _Line(label: 'Itens', value: '${summary.itemsCount}'),
          _Line(label: 'Total', value: money(summary.total), strong: true),
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
