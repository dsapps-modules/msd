import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../config/colors.dart';
import '../../config/images.dart';
import 'ecommerce_components.dart';
import 'ecommerce_models.dart';

class EcommerceSuccessScreen extends StatelessWidget {
  const EcommerceSuccessScreen({
    super.key,
    this.orderSummary,
    this.orderNumber,
    this.total,
    this.paymentMethod,
    this.itemsCount,
  });

  final EcommerceOrderSummary? orderSummary;
  final String? orderNumber;
  final double? total;
  final String? paymentMethod;
  final int? itemsCount;

  @override
  Widget build(BuildContext context) {
    final summary = orderSummary ??
        EcommerceOrderSummary(
          orderNumber: orderNumber ?? 'KC-DEMO-2026',
          customerName: 'Cliente',
          email: 'cliente@exemplo.com',
          paymentMethod: paymentMethod ?? 'PIX',
          subtotal: total ?? 0,
          shipping: 0,
          total: total ?? 0,
          itemsCount: itemsCount ?? 0,
          addressLabel: 'Endereço informado no checkout',
        );

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: 0,
              selectedMenu: 'inicio',
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
              showSearchField: false,
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
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
                        final wide = constraints.maxWidth >= 900;
                        final body = wide
                            ? Row(
                                children: [
                                  Expanded(child: _buildMessage(context, summary)),
                                  const SizedBox(width: 18),
                                  Expanded(child: _buildVisual(context, summary)),
                                ],
                              )
                            : Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  _buildMessage(context, summary),
                                  const SizedBox(height: 18),
                                  _buildVisual(context, summary),
                                ],
                              );
                        return body;
                      },
                    ),
                  ),
                  const SizedBox(height: 18),
                  _SummaryDetails(summary: summary),
                  const SizedBox(height: 18),
                  _Actions(
                    onBack: () => context.go('/'),
                    onOrders: () => context.go('/'),
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

  Widget _buildMessage(BuildContext context, EcommerceOrderSummary summary) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SuccessPill(text: 'Pedido concluído'),
        const SizedBox(height: 16),
        Text(
          'Compra finalizada com sucesso',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w900,
                fontSize: 32,
                height: 1.06,
              ),
        ),
        const SizedBox(height: 12),
        Text(
          'Seu pedido ${summary.orderNumber} foi registrado. O resumo abaixo já deixa o usuário pronto para seguir para a próxima ação.',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Colors.white70,
                height: 1.45,
              ),
        ),
        const SizedBox(height: 18),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            _SuccessChip(text: summary.paymentMethod),
            _SuccessChip(text: '${summary.itemsCount} itens'),
            _SuccessChip(text: formatEcommerceMoney(summary.total)),
          ],
        ),
      ],
    );
  }

  Widget _buildVisual(BuildContext context, EcommerceOrderSummary summary) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
      ),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Image.asset(
              Images.successful,
              height: 200,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 14),
          _SuccessReceipt(summary: summary),
        ],
      ),
    );
  }
}

class _SummaryDetails extends StatelessWidget {
  const _SummaryDetails({required this.summary});

  final EcommerceOrderSummary summary;

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
      child: LayoutBuilder(
        builder: (context, constraints) {
          final wide = constraints.maxWidth >= 900;
          final children = [
            _DetailTile(label: 'Pedido', value: summary.orderNumber),
            _DetailTile(label: 'Cliente', value: summary.customerName),
            _DetailTile(label: 'E-mail', value: summary.email),
            _DetailTile(label: 'Pagamento', value: summary.paymentMethod),
            _DetailTile(label: 'Subtotal', value: formatEcommerceMoney(summary.subtotal)),
            _DetailTile(label: 'Frete', value: formatEcommerceMoney(summary.shipping)),
            _DetailTile(label: 'Total', value: formatEcommerceMoney(summary.total)),
            _DetailTile(label: 'Entrega', value: summary.addressLabel),
          ];

          if (wide) {
            return Wrap(
              spacing: 16,
              runSpacing: 16,
              children: children
                  .map(
                    (item) => SizedBox(
                      width: 260,
                      child: item,
                    ),
                  )
                  .toList(),
            );
          }

          return Column(
            children: children
                .map(
                  (item) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: item,
                  ),
                )
                .toList(),
          );
        },
      ),
    );
  }
}

class _Actions extends StatelessWidget {
  const _Actions({
    required this.onBack,
    required this.onOrders,
  });

  final VoidCallback onBack;
  final VoidCallback onOrders;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        ElevatedButton(
          onPressed: onBack,
          style: ElevatedButton.styleFrom(
            backgroundColor: CustomColors.baseColor,
            foregroundColor: Colors.white,
            elevation: 0,
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: const Text('Voltar para vitrine'),
        ),
        OutlinedButton(
          onPressed: onOrders,
          style: OutlinedButton.styleFrom(
            foregroundColor: const Color(0xFF0F172A),
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: const Text('Explorar mais produtos'),
        ),
      ],
    );
  }
}

class _DetailTile extends StatelessWidget {
  const _DetailTile({
    required this.label,
    required this.value,
  });

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(18),
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
          const SizedBox(height: 6),
          Text(
            value,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                  height: 1.25,
                ),
          ),
        ],
      ),
    );
  }
}

class _SuccessPill extends StatelessWidget {
  const _SuccessPill({required this.text});

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

class _SuccessChip extends StatelessWidget {
  const _SuccessChip({required this.text});

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
        style: Theme.of(context).textTheme.labelLarge?.copyWith(
              color: const Color(0xFF334155),
              fontWeight: FontWeight.w700,
            ),
      ),
    );
  }
}

class _SuccessReceipt extends StatelessWidget {
  const _SuccessReceipt({required this.summary});

  final EcommerceOrderSummary summary;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Resumo rápido',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 10),
          _SummaryLine(label: 'Pedido', value: summary.orderNumber),
          _SummaryLine(label: 'Pagamento', value: summary.paymentMethod),
          _SummaryLine(label: 'Total', value: formatEcommerceMoney(summary.total), strong: true),
        ],
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
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: strong ? const Color(0xFF0F172A) : const Color(0xFF64748B),
                  fontWeight: strong ? FontWeight.w800 : FontWeight.w600,
                ),
          ),
          const Spacer(),
          Text(
            value,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: strong ? FontWeight.w900 : FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }
}
