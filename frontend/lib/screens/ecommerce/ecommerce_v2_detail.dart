import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../controller/provider/cart_controler.dart';
import '../../controller/provider/cliente_ecommerce_controller.dart';
import 'cliente_ecommerce_models.dart';
import 'cliente_ecommerce_widgets.dart';

class EcommerceDetailPage extends StatefulWidget {
  const EcommerceDetailPage({
    super.key,
    required this.slug,
    required this.kind,
  });

  final String slug;
  final String kind;

  @override
  State<EcommerceDetailPage> createState() => _EcommerceDetailPageState();
}

class _EcommerceDetailPageState extends State<EcommerceDetailPage> {
  int _quantity = 1;
  int _selectedImageIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      context.read<ClienteEcommerceController>().ensureInitialized();
      context.read<CartProvider>().loadCartItems();
    });
  }

  Future<void> _addToCart(ClienteProduct product) async {
    await context.read<CartProvider>().addToCart(
          context.read<ClienteEcommerceController>().buildCartItem(product, quantity: _quantity),
          context,
        );
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<ClienteEcommerceController>();
    final cartCount = context.watch<CartProvider>().cartItems.length;
    final product = controller.productBySlug(widget.slug);

    if (controller.loading && product == null) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator.adaptive()),
      );
    }

    if (product == null) {
      return ClientePageShell(
        title: 'Detalhes do produto',
        subtitle: 'Produto não localizado ou indisponível.',
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 680),
            child: Container(
              margin: const EdgeInsets.all(18),
              padding: const EdgeInsets.all(22),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.search_off_rounded, size: 64, color: Color(0xFF1D4ED8)),
                  const SizedBox(height: 12),
                  Text(
                    'Não encontramos este produto.',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w900,
                          color: const Color(0xFF0F172A),
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'A URL pode estar desatualizada ou o item pode ter sido removido da vitrine.',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: const Color(0xFF64748B),
                          height: 1.4,
                        ),
                  ),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    alignment: WrapAlignment.center,
                    children: [
                      ElevatedButton(
                        onPressed: () => context.go('/produtos'),
                        child: const Text('Voltar para produtos'),
                      ),
                      OutlinedButton(
                        onPressed: () => context.go('/carrinho'),
                        child: const Text('Ir para carrinho'),
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

    final mainImage = product.galleryImages.isNotEmpty
        ? product.galleryImages[_selectedImageIndex.clamp(0, product.galleryImages.length - 1).toInt()]
        : product.displayImage;

    return ClientePageShell(
      title: product.name,
      subtitle: product.supplierName,
      trailing: IconButton(
        onPressed: () => context.go('/carrinho'),
        icon: Badge(
          isLabelVisible: cartCount > 0,
          label: Text('$cartCount'),
          child: const Icon(Icons.shopping_cart_outlined),
        ),
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(18),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1240),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: [
                    _InfoPill(text: product.supplierName),
                    _InfoPill(text: product.packaging),
                    _InfoPill(text: product.categoryName),
                    _InfoPill(text: product.availableStock > 0 ? 'Estoque ${product.availableStock}' : 'Sem estoque'),
                  ],
                ),
                const SizedBox(height: 18),
                LayoutBuilder(
                  builder: (context, constraints) {
                    final wide = constraints.maxWidth >= 980;
                    final gallery = Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(28),
                          child: AspectRatio(
                            aspectRatio: 1.05,
                            child: _ProductImage(url: mainImage),
                          ),
                        ),
                        const SizedBox(height: 12),
                        SizedBox(
                          height: 82,
                          child: ListView.separated(
                            scrollDirection: Axis.horizontal,
                            itemCount: product.galleryImages.length,
                            separatorBuilder: (_, __) => const SizedBox(width: 10),
                            itemBuilder: (context, index) {
                              final image = product.galleryImages[index];
                              final selected = index == _selectedImageIndex;
                              return GestureDetector(
                                onTap: () => setState(() => _selectedImageIndex = index),
                                child: Container(
                                  width: 82,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(18),
                                    border: Border.all(
                                      color: selected ? const Color(0xFF1D4ED8) : const Color(0xFFE2E8F0),
                                      width: selected ? 2 : 1,
                                    ),
                                  ),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(17),
                                    child: _ProductImage(url: image),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    );

                    final details = Container(
                      padding: const EdgeInsets.all(22),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(28),
                        border: Border.all(color: const Color(0xFFE2E8F0)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            product.name,
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.w900,
                                  color: const Color(0xFF0F172A),
                                ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            product.description.isEmpty ? 'Descrição não informada.' : product.description,
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                  color: const Color(0xFF475569),
                                  height: 1.5,
                                ),
                          ),
                          const SizedBox(height: 18),
                          Text(
                            clienteMoney(product.price),
                            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                  fontWeight: FontWeight.w900,
                                  color: const Color(0xFF1D4ED8),
                                ),
                          ),
                          const SizedBox(height: 18),
                          Wrap(
                            spacing: 10,
                            runSpacing: 10,
                            children: [
                              _Metric(label: 'Altura', value: _dimensionText(product.height)),
                              _Metric(label: 'Largura', value: _dimensionText(product.width)),
                              _Metric(label: 'Comprimento', value: _dimensionText(product.length)),
                              _Metric(label: 'Peso', value: _dimensionText(product.weight)),
                              _Metric(label: 'Embalagem', value: product.packaging),
                              _Metric(label: 'Reservado', value: '${product.reservedStock}'),
                              _Metric(label: 'Disponível', value: '${product.availableStock}'),
                            ],
                          ),
                          const SizedBox(height: 18),
                          Row(
                            children: [
                              Expanded(
                                child: _QuantityPicker(
                                  quantity: _quantity,
                                  maxQuantity: product.cartLimit,
                                  onChanged: (value) => setState(() => _quantity = value),
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: ElevatedButton(
                                  onPressed: () => _addToCart(product),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF1D4ED8),
                                    foregroundColor: Colors.white,
                                    padding: const EdgeInsets.symmetric(vertical: 16),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                  ),
                                  child: const Text('Adicionar ao carrinho'),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          SizedBox(
                            width: double.infinity,
                            child: OutlinedButton(
                              onPressed: () => context.go('/produtos'),
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                              ),
                              child: const Text('Voltar para produtos'),
                            ),
                          ),
                        ],
                      ),
                    );

                    if (wide) {
                      return Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(flex: 5, child: gallery),
                          const SizedBox(width: 18),
                          Expanded(flex: 5, child: details),
                        ],
                      );
                    }

                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        gallery,
                        const SizedBox(height: 18),
                        details,
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

  String _dimensionText(double? value) {
    if (value == null || value == 0) {
      return 'Não informado';
    }
    return value % 1 == 0 ? value.toStringAsFixed(0) : value.toStringAsFixed(2);
  }
}

class _QuantityPicker extends StatelessWidget {
  const _QuantityPicker({
    required this.quantity,
    required this.maxQuantity,
    required this.onChanged,
  });

  final int quantity;
  final int maxQuantity;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          IconButton(
            onPressed: quantity > 1 ? () => onChanged(quantity - 1) : null,
            icon: const Icon(Icons.remove_circle_outline_rounded),
          ),
          Expanded(
            child: Center(
              child: Text(
                '$quantity',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w900,
                    ),
              ),
            ),
          ),
          IconButton(
            onPressed: quantity < maxQuantity ? () => onChanged(quantity + 1) : null,
            icon: const Icon(Icons.add_circle_outline_rounded),
          ),
        ],
      ),
    );
  }
}

class _Metric extends StatelessWidget {
  const _Metric({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 160,
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
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF64748B),
                  fontWeight: FontWeight.w600,
                ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
        ],
      ),
    );
  }
}

class _InfoPill extends StatelessWidget {
  const _InfoPill({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(text),
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
