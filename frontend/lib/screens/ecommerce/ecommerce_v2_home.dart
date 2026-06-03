import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../controller/provider/cart_controler.dart';
import '../../controller/provider/cliente_ecommerce_controller.dart';
import 'cliente_ecommerce_models.dart';
import 'cliente_ecommerce_widgets.dart';

class EcommerceHomePage extends StatefulWidget {
  const EcommerceHomePage({super.key});

  @override
  State<EcommerceHomePage> createState() => _EcommerceHomePageState();
}

class _EcommerceHomePageState extends State<EcommerceHomePage> {
  final TextEditingController _searchController = TextEditingController();
  String _query = '';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      context.read<ClienteEcommerceController>().ensureInitialized();
      context.read<CartProvider>().loadCartItems();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _addToCart(ClienteProduct product) async {
    final controller = context.read<ClienteEcommerceController>();
    await context.read<CartProvider>().addToCart(
          controller.buildCartItem(product),
          context,
        );
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    final cartCount = context.watch<CartProvider>().cartItems.length;
    final controller = context.watch<ClienteEcommerceController>();
    final products = controller.products.where((product) {
      if (_query.trim().isEmpty) {
        return true;
      }
      final search = _query.trim().toLowerCase();
      return product.name.toLowerCase().contains(search) ||
          product.description.toLowerCase().contains(search) ||
          product.supplierName.toLowerCase().contains(search) ||
          product.packaging.toLowerCase().contains(search);
    }).toList();

    return ClientePageShell(
      title: 'MERCADO SOLIDÁRIO',
      subtitle: 'Vitrine de produtos dos fornecedores e acesso rápido ao carrinho.',
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            onPressed: () => context.go('/carrinho'),
            icon: Badge(
              isLabelVisible: cartCount > 0,
              label: Text('$cartCount'),
              child: const Icon(Icons.shopping_cart_outlined),
            ),
          ),
          const SizedBox(width: 8),
          FilledButton.tonal(
            onPressed: () => context.go('/carrinho'),
            child: const Text('Carrinho'),
          ),
        ],
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(18),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1240),
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
                        color: Color(0x220F172A),
                        blurRadius: 24,
                        offset: Offset(0, 14),
                      ),
                    ],
                  ),
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      final wide = constraints.maxWidth >= 820;
                      final left = Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const _HeroPill(text: 'Produtos ativos'),
                          const SizedBox(height: 16),
                          Text(
                            'Compre com comissão vinculada à campanha escolhida',
                            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                  color: Colors.white,
                                  fontSize: 32,
                                  height: 1.05,
                                  fontWeight: FontWeight.w900,
                                ),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'A vitrine mostra os produtos cadastrados pelos fornecedores, com leitura simples, mobile first e fluxo de compra sem fricção.',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  color: Colors.white.withValues(alpha: 0.78),
                                  height: 1.45,
                                ),
                          ),
                          const SizedBox(height: 18),
                          Wrap(
                            spacing: 10,
                            runSpacing: 10,
                            children: [
                              _MiniStat(label: '${controller.products.length}', value: 'produtos'),
                              _MiniStat(label: '${controller.activeCampaigns.length}', value: 'campanhas ativas'),
                              _MiniStat(label: '${cartCount}', value: 'itens no carrinho'),
                            ],
                          ),
                        ],
                      );

                      final right = Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          TextField(
                            controller: _searchController,
                            onChanged: (value) => setState(() => _query = value),
                            decoration: InputDecoration(
                              hintText: 'Buscar produto, fornecedor ou embalagem',
                              prefixIcon: const Icon(Icons.search_rounded),
                              filled: true,
                              fillColor: Colors.white,
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(18),
                                borderSide: BorderSide.none,
                              ),
                            ),
                          ),
                          const SizedBox(height: 12),
                          Row(
                            children: [
                              Expanded(
                                child: OutlinedButton(
                                  onPressed: controller.loading
                                      ? null
                                      : () async {
                                          await controller.refreshProducts();
                                        },
                                  child: const Text('Atualizar vitrine'),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Expanded(
                                child: ElevatedButton(
                                  onPressed: () => context.go('/carrinho'),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.white,
                                    foregroundColor: const Color(0xFF0F172A),
                                  ),
                                  child: const Text('Ir para carrinho'),
                                ),
                              ),
                            ],
                          ),
                        ],
                      );

                      if (wide) {
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(flex: 3, child: left),
                            const SizedBox(width: 24),
                            Expanded(flex: 2, child: right),
                          ],
                        );
                      }

                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          left,
                          const SizedBox(height: 18),
                          right,
                        ],
                      );
                    },
                  ),
                ),
                const SizedBox(height: 22),
                ClienteSectionTitle(
                  title: 'Produtos disponíveis',
                  subtitle: 'Cards objetivos com fornecedor, preço, embalagem e estoque.',
                ),
                const SizedBox(height: 16),
                if (controller.loading)
                  const _LoadingGrid()
                else if (controller.errorMessage != null && controller.products.isEmpty)
                  _EmptyMessage(
                    title: 'Não foi possível carregar os produtos.',
                    subtitle: controller.errorMessage!,
                    actionLabel: 'Tentar novamente',
                    onAction: () async => controller.refreshProducts(),
                  )
                else if (products.isEmpty)
                  _EmptyMessage(
                    title: 'Nenhum produto encontrado.',
                    subtitle: 'Ajuste a busca ou limpe o texto digitado.',
                    actionLabel: 'Limpar busca',
                    onAction: () {
                      _searchController.clear();
                      setState(() => _query = '');
                    },
                  )
                else
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final width = constraints.maxWidth;
                      final columns = width >= 1180
                          ? 3
                          : width >= 780
                              ? 2
                              : 1;
                      return GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: products.length,
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: columns,
                          childAspectRatio: columns == 1 ? 0.82 : 0.76,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                        ),
                        itemBuilder: (context, index) {
                          final product = products[index];
                          return ClienteProductCard(
                            product: product,
                            onTap: () => context.go('/produtos/${product.slug}'),
                            onAddToCart: () => _addToCart(product),
                          );
                        },
                      );
                    },
                  ),
                const SizedBox(height: 28),
                const _FooterNote(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _HeroPill extends StatelessWidget {
  const _HeroPill({required this.text});
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

class _MiniStat extends StatelessWidget {
  const _MiniStat({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.white.withValues(alpha: 0.12)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                ),
          ),
          const SizedBox(height: 2),
          Text(
            value,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.white70,
                ),
          ),
        ],
      ),
    );
  }
}

class _EmptyMessage extends StatelessWidget {
  const _EmptyMessage({
    required this.title,
    required this.subtitle,
    required this.actionLabel,
    required this.onAction,
  });

  final String title;
  final String subtitle;
  final String actionLabel;
  final VoidCallback onAction;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
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
          const SizedBox(height: 8),
          Text(
            subtitle,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                ),
          ),
          const SizedBox(height: 14),
          ElevatedButton(
            onPressed: onAction,
            child: Text(actionLabel),
          ),
        ],
      ),
    );
  }
}

class _LoadingGrid extends StatelessWidget {
  const _LoadingGrid();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final columns = width >= 1180 ? 3 : width >= 780 ? 2 : 1;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: columns * 2,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: columns,
            childAspectRatio: columns == 1 ? 0.82 : 0.76,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
          ),
          itemBuilder: (_, __) => Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
            ),
          ),
        );
      },
    );
  }
}

class _FooterNote extends StatelessWidget {
  const _FooterNote();

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
      child: Text(
        'Fluxo do cliente: vitrine, detalhes, carrinho, campanha, checkout simulado e acompanhamento.',
        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: const Color(0xFF475569),
            ),
      ),
    );
  }
}
