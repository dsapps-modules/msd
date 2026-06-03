import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../controller/provider/cart_controler.dart';
import '../../controller/provider/cliente_ecommerce_controller.dart';
import 'cliente_ecommerce_widgets.dart';

class EcommerceCartPage extends StatefulWidget {
  const EcommerceCartPage({super.key});

  @override
  State<EcommerceCartPage> createState() => _EcommerceCartPageState();
}

class _EcommerceCartPageState extends State<EcommerceCartPage> {
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<CartProvider>().loadCartItems();
      await context.read<ClienteEcommerceController>().ensureInitialized();
      if (mounted) {
        setState(() => _loaded = true);
      }
    });
  }

  double get _subtotal {
    final items = context.read<CartProvider>().cartItems;
    return items.fold(0, (sum, item) => sum + (double.tryParse(item.price) ?? 0) * item.quantity);
  }

  double get _total => _subtotal;

  Future<void> _increase(CartProvider cartProvider, item) async {
    await cartProvider.updateQuantity(item.productId, item.quantity + 1);
    if (mounted) setState(() {});
  }

  Future<void> _decrease(CartProvider cartProvider, item) async {
    await cartProvider.updateQuantity(item.productId, item.quantity > 1 ? item.quantity - 1 : 1);
    if (mounted) setState(() {});
  }

  Future<void> _remove(CartProvider cartProvider, item) async {
    await cartProvider.deleteItem(item.productId);
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final cartProvider = context.watch<CartProvider>();
    final cart = cartProvider.cartItems;
    final cliente = context.watch<ClienteEcommerceController>();
    final selectedCampaign = cliente.selectedCampaign;

    return ClientePageShell(
      title: 'Carrinho',
      subtitle: 'Revise os itens, escolha a campanha e siga para o pagamento simulado.',
      trailing: FilledButton.tonal(
        onPressed: () => context.go('/produtos'),
        child: const Text('Continuar comprando'),
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(18),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1240),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClienteSectionTitle(
                  title: 'Seu carrinho',
                  subtitle: 'Ajuste quantidades, remova itens e selecione a campanha de comissão.',
                ),
                const SizedBox(height: 16),
                if (!_loaded)
                  const _LoadingCard()
                else if (cart.isEmpty)
                  _EmptyCart(onBack: () => context.go('/produtos'))
                else
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final wide = constraints.maxWidth >= 1050;

                      final itemsColumn = Column(
                        children: cart.map((item) {
                          final image = item.image.isNotEmpty ? item.image : 'assets/images/noImage.png';
                          final unitPrice = double.tryParse(item.price) ?? 0;
                          final subtotal = unitPrice * item.quantity;

                          return Container(
                            margin: const EdgeInsets.only(bottom: 14),
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(22),
                              border: Border.all(color: const Color(0xFFE2E8F0)),
                            ),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(18),
                                  child: SizedBox(
                                    width: 92,
                                    height: 92,
                                    child: _CartImage(url: image),
                                  ),
                                ),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        item.productName,
                                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                              fontWeight: FontWeight.w900,
                                              color: const Color(0xFF0F172A),
                                            ),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        item.storeName,
                                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                              color: const Color(0xFF64748B),
                                            ),
                                      ),
                                      const SizedBox(height: 10),
                                      Wrap(
                                        spacing: 12,
                                        runSpacing: 8,
                                        children: [
                                          _TinyInfo(text: 'Unitário: ${clienteMoney(unitPrice)}'),
                                          _TinyInfo(text: 'Subtotal: ${clienteMoney(subtotal)}'),
                                          _TinyInfo(text: 'Qtd: ${item.quantity}'),
                                        ],
                                      ),
                                      const SizedBox(height: 12),
                                      Wrap(
                                        spacing: 8,
                                        runSpacing: 8,
                                        children: [
                                          OutlinedButton(
                                            onPressed: () => _decrease(cartProvider, item),
                                            child: const Icon(Icons.remove_rounded),
                                          ),
                                          OutlinedButton(
                                            onPressed: () => _increase(cartProvider, item),
                                            child: const Icon(Icons.add_rounded),
                                          ),
                                          TextButton(
                                            onPressed: () => _remove(cartProvider, item),
                                            child: const Text('Remover'),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      );

                      final campaignBlock = Container(
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
                              'Escolha a campanha que receberá a comissão da sua compra',
                              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.w900,
                                    color: const Color(0xFF0F172A),
                                  ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Parte da sua compra será vinculada à campanha selecionada.',
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: const Color(0xFF64748B),
                                  ),
                            ),
                            const SizedBox(height: 16),
                            ...cliente.activeCampaigns.map(
                              (campaign) => Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: ClienteCampaignCard(
                                  campaign: campaign,
                                  selected: selectedCampaign?.slug == campaign.slug,
                                  onTap: () => cliente.selectCampaign(campaign.slug),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );

                      final summary = ClienteSummaryCard(
                        itemsCount: cart.length,
                        subtotal: _subtotal,
                        total: _total,
                        selectedCampaign: selectedCampaign,
                        primaryLabel: 'Ir para pagamento',
                        onPrimaryTap: () => context.go('/checkout'),
                        secondaryLabel: 'Continuar comprando',
                        onSecondaryTap: () => context.go('/produtos'),
                        errorMessage: cliente.checkoutErrorMessage,
                      );

                      if (wide) {
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              flex: 3,
                              child: Column(
                                children: [
                                  itemsColumn,
                                  const SizedBox(height: 14),
                                  campaignBlock,
                                ],
                              ),
                            ),
                            const SizedBox(width: 18),
                            SizedBox(width: 360, child: summary),
                          ],
                        );
                      }

                      return Column(
                        children: [
                          itemsColumn,
                          campaignBlock,
                          const SizedBox(height: 14),
                          summary,
                        ],
                      );
                    },
                  ),
              ],
            ),
          ),
        ),
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

class _EmptyCart extends StatelessWidget {
  const _EmptyCart({required this.onBack});

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
            'Volte para a vitrine e adicione produtos para continuar.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                ),
          ),
          const SizedBox(height: 14),
          ElevatedButton(
            onPressed: onBack,
            child: const Text('Voltar para vitrine'),
          ),
        ],
      ),
    );
  }
}

class _TinyInfo extends StatelessWidget {
  const _TinyInfo({required this.text});
  final String text;
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: const Color(0xFF334155),
              fontWeight: FontWeight.w600,
            ),
      ),
    );
  }
}

class _CartImage extends StatelessWidget {
  const _CartImage({required this.url});
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
