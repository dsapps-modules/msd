import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../controller/provider/cart_controler.dart';
import '../../controller/provider/cliente_ecommerce_controller.dart';
import 'cliente_ecommerce_widgets.dart';

class EcommerceCheckoutPage extends StatefulWidget {
  const EcommerceCheckoutPage({super.key});

  @override
  State<EcommerceCheckoutPage> createState() => _EcommerceCheckoutPageState();
}

class _EcommerceCheckoutPageState extends State<EcommerceCheckoutPage> {
  bool _loading = true;
  bool _submitting = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<CartProvider>().loadCartItems();
      await context.read<ClienteEcommerceController>().ensureInitialized();
      if (mounted) {
        setState(() => _loading = false);
      }
    });
  }

  Future<void> _submit() async {
    final cartProvider = context.read<CartProvider>();
    final controller = context.read<ClienteEcommerceController>();

    setState(() => _submitting = true);
    controller.clearCheckoutError();
    final order = await controller.finalizeOrder(cartProvider.cartItems);
    if (!mounted) return;

    if (order == null) {
      setState(() => _submitting = false);
      final message = controller.checkoutErrorMessage ?? 'Nao foi possivel finalizar o pedido.';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message)),
      );
      return;
    }

    await cartProvider.clearCart();
    setState(() => _submitting = false);
    context.go('/pedido/recebido/${order.id}');
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>().cartItems;
    final controller = context.watch<ClienteEcommerceController>();
    final selectedCampaign = controller.selectedCampaign;
    final subtotal = cart.fold<double>(
      0,
      (sum, item) => sum + ((double.tryParse(item.price) ?? 0) * item.quantity),
    );

    return ClientePageShell(
      title: 'Checkout',
      subtitle: 'Finalização simulada, sem cartão, sem gateway e sem formulário de pagamento.',
      trailing: FilledButton.tonal(
        onPressed: () => context.go('/carrinho'),
        child: const Text('Voltar ao carrinho'),
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(18),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 960),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClienteSectionTitle(
                  title: 'Pagamento simulado',
                  subtitle: 'Clique em finalizar para criar o pedido e ir direto para a confirmação.',
                ),
                const SizedBox(height: 16),
                if (_loading)
                  const _LoadingCard()
                else if (cart.isEmpty)
                  _EmptyCheckout(onBack: () => context.go('/produtos'))
                else
                  Column(
                    children: [
                      _CheckoutInfoCard(
                        title: 'Campanha vinculada',
                        child: selectedCampaign == null
                            ? Text(
                                'Selecione uma campanha no carrinho para continuar.',
                                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                      color: const Color(0xFFB91C1C),
                                      fontWeight: FontWeight.w600,
                                    ),
                              )
                            : Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    selectedCampaign.title,
                                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                          fontWeight: FontWeight.w900,
                                        ),
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    selectedCampaign.objective,
                                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                          color: const Color(0xFF64748B),
                                          height: 1.4,
                                        ),
                                  ),
                                ],
                              ),
                      ),
                      const SizedBox(height: 14),
                      _CheckoutInfoCard(
                        title: 'Resumo do pedido',
                        child: Column(
                          children: [
                            _CheckoutLine(label: 'Itens', value: cart.length.toString()),
                            _CheckoutLine(label: 'Subtotal', value: clienteMoney(subtotal)),
                            _CheckoutLine(label: 'Total', value: clienteMoney(subtotal), strong: true),
                          ],
                        ),
                      ),
                      const SizedBox(height: 14),
                      _CheckoutInfoCard(
                        title: 'Itens do carrinho',
                        child: Column(
                          children: cart.map((item) {
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 10),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      item.productName,
                                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                            fontWeight: FontWeight.w700,
                                          ),
                                    ),
                                  ),
                                  Text(
                                    '${item.quantity} x ${clienteMoney(double.tryParse(item.price) ?? 0)}',
                                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                          color: const Color(0xFF64748B),
                                        ),
                                  ),
                                ],
                              ),
                            );
                          }).toList(),
                        ),
                      ),
                      const SizedBox(height: 14),
                      ClienteSummaryCard(
                        itemsCount: cart.length,
                        subtotal: subtotal,
                        total: subtotal,
                        selectedCampaign: selectedCampaign,
                        primaryLabel: _submitting ? 'Finalizando...' : 'Ir para pagamento',
                        onPrimaryTap: _submitting ? () {} : _submit,
                        errorMessage: controller.checkoutErrorMessage,
                        secondaryLabel: 'Voltar para o carrinho',
                        onSecondaryTap: () => context.go('/carrinho'),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CheckoutInfoCard extends StatelessWidget {
  const _CheckoutInfoCard({required this.title, required this.child});

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
                  fontWeight: FontWeight.w900,
                ),
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _CheckoutLine extends StatelessWidget {
  const _CheckoutLine({required this.label, required this.value, this.strong = false});

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
                  fontWeight: strong ? FontWeight.w700 : FontWeight.w600,
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

class _LoadingCard extends StatelessWidget {
  const _LoadingCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
      ),
      child: const LinearProgressIndicator(minHeight: 10),
    );
  }
}

class _EmptyCheckout extends StatelessWidget {
  const _EmptyCheckout({required this.onBack});
  final VoidCallback onBack;

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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Seu carrinho está vazio.',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w900,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            'Adicione produtos antes de prosseguir para a finalização.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                ),
          ),
          const SizedBox(height: 14),
          ElevatedButton(
            onPressed: onBack,
            child: const Text('Voltar para produtos'),
          ),
        ],
      ),
    );
  }
}
