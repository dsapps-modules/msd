import 'dart:async';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../controller/provider/cart_controler.dart';
import '../../data/data_model/cart_model.dart';
import 'ecommerce_v2_data.dart';
import 'ecommerce_v2_models.dart';
import 'ecommerce_v2_widgets.dart';

class EcommerceCheckoutPage extends StatefulWidget {
  const EcommerceCheckoutPage({super.key});

  @override
  State<EcommerceCheckoutPage> createState() => _EcommerceCheckoutPageState();
}

class _EcommerceCheckoutPageState extends State<EcommerceCheckoutPage> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _cpf = TextEditingController();
  final _cep = TextEditingController();
  final _street = TextEditingController();
  final _number = TextEditingController();
  final _complement = TextEditingController();
  final _district = TextEditingController();
  final _city = TextEditingController();
  final _state = TextEditingController();
  Timer? _timer;
  String _payment = 'PIX';
  bool _loaded = false;
  bool _sending = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<CartProvider>().loadCartItems();
      if (mounted) setState(() => _loaded = true);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _name.dispose();
    _email.dispose();
    _phone.dispose();
    _cpf.dispose();
    _cep.dispose();
    _street.dispose();
    _number.dispose();
    _complement.dispose();
    _district.dispose();
    _city.dispose();
    _state.dispose();
    super.dispose();
  }

  double get _subtotal {
    final items = context.read<CartProvider>().cartItems;
    return items.fold(0, (sum, item) => sum + (double.tryParse(item.price) ?? 0) * item.quantity);
  }

  double get _shipping => _subtotal >= 300 ? 0 : 19.9;

  Future<void> _lookupCep(String cep) async {
    final clean = cep.replaceAll(RegExp(r'\D'), '');
    if (clean.length != 8) return;
    try {
      final response = await Dio().get('https://viacep.com.br/ws/$clean/json/');
      final data = response.data;
      if (data is Map<String, dynamic> && data['erro'] != true && mounted) {
        setState(() {
          _street.text = data['logradouro']?.toString() ?? '';
          _district.text = data['bairro']?.toString() ?? '';
          _city.text = data['localidade']?.toString() ?? '';
          _state.text = data['uf']?.toString() ?? '';
        });
      }
    } catch (_) {}
  }

  Future<void> _finish() async {
    if (!_formKey.currentState!.validate()) return;
    final cart = context.read<CartProvider>().cartItems;
    if (cart.isEmpty) return;
    setState(() => _sending = true);
    final orderNumber = 'KC-${DateTime.now().millisecondsSinceEpoch.toRadixString(36).toUpperCase()}';
    final summary = EcommerceOrderSummary(
      orderNumber: orderNumber,
      customerName: _name.text.trim(),
      email: _email.text.trim(),
      paymentMethod: _payment,
      subtotal: _subtotal,
      shipping: _shipping,
      total: _subtotal + _shipping,
      itemsCount: cart.length,
      address: '${_street.text.trim()}, ${_number.text.trim()} - ${_city.text.trim()}/${_state.text.trim()}',
    );
    await context.read<CartProvider>().clearCart();
    if (!mounted) return;
    setState(() => _sending = false);
    context.go('/checkout/sucesso', extra: summary);
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>().cartItems;

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: cart.length,
              currentSection: 'produtos',
              onSectionSelected: (_) => context.go('/'),
              onMenuTap: () => context.go('/'),
              onUserTap: () {
                if (kIsWeb) {
                  context.goNamed(RouteNames.webLogin);
                } else {
                  context.goNamed(RouteNames.loginScreen);
                }
              },
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
                  Text(
                    'Checkout',
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontSize: 24,
                          color: const Color(0xFF0F172A),
                          fontWeight: FontWeight.w900,
                        ),
                  ),
                  const SizedBox(height: 18),
                  if (!_loaded)
                    const LoadingStateCard(label: 'Carregando checkout...')
                  else if (cart.isEmpty)
                    EmptyStateCard(
                      title: 'Nenhum item para finalizar.',
                      subtitle: 'Adicione um produto ao carrinho antes de seguir.',
                      actionLabel: 'Voltar para vitrine',
                      onAction: () => context.go('/'),
                    )
                  else
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final wide = constraints.maxWidth >= 1100;
                        final form = Column(
                          children: [
                            _Block(
                              title: 'Dados pessoais',
                              child: _Grid(
                                children: [
                                  _Field(controller: _name, label: 'Nome', validator: _required),
                                  _Field(controller: _email, label: 'E-mail', validator: _required),
                                  _Field(controller: _phone, label: 'Telefone', validator: _required),
                                  _Field(controller: _cpf, label: 'CPF', validator: _required),
                                ],
                              ),
                            ),
                            const SizedBox(height: 14),
                            _Block(
                              title: 'Endereco',
                              child: Column(
                                children: [
                                  Row(
                                    children: [
                                      Expanded(
                                        child: _Field(
                                          controller: _cep,
                                          label: 'CEP',
                                          validator: _required,
                                          onChanged: (value) {
                                            _timer?.cancel();
                                            _timer = Timer(const Duration(milliseconds: 500), () => _lookupCep(value));
                                          },
                                        ),
                                      ),
                                      const SizedBox(width: 12),
                                      TextButton(
                                        onPressed: () => _lookupCep(_cep.text),
                                        child: const Text('Buscar CEP'),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  _Grid(
                                    children: [
                                      _Field(controller: _street, label: 'Rua', validator: _required),
                                      _Field(controller: _number, label: 'Numero', validator: _required),
                                      _Field(controller: _complement, label: 'Complemento'),
                                      _Field(controller: _district, label: 'Bairro', validator: _required),
                                      _Field(controller: _city, label: 'Cidade', validator: _required),
                                      _Field(controller: _state, label: 'Estado', validator: _required),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 14),
                            _Block(
                              title: 'Pagamento',
                              child: Wrap(
                                spacing: 12,
                                runSpacing: 12,
                                children: [
                                  _PayChip(label: 'PIX', active: _payment == 'PIX', onTap: () => setState(() => _payment = 'PIX')),
                                  _PayChip(label: 'Cartao', active: _payment == 'Cartao', onTap: () => setState(() => _payment = 'Cartao')),
                                  _PayChip(label: 'Boleto', active: _payment == 'Boleto', onTap: () => setState(() => _payment = 'Boleto')),
                                ],
                              ),
                            ),
                          ],
                        );

                        final summary = Column(
                          children: [
                            SummaryCard(
                              items: cart.length,
                              subtotal: _subtotal,
                              shipping: _shipping,
                              total: _subtotal + _shipping,
                              paymentLabel: _payment,
                              primaryLabel: _sending ? 'Finalizando...' : 'Finalizar compra',
                              onPrimaryTap: _sending ? () {} : _finish,
                            ),
                            const SizedBox(height: 14),
                            _Block(
                              title: 'Itens do pedido',
                              child: Column(
                                children: cart.map((item) {
                                  final product = EcommerceData.productById(item.productId) ??
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
                                        discountPercent: 0,
                                        rating: 0,
                                        reviews: 0,
                                        stock: item.stock,
                                        maxQuantity: item.cartMaxQuantity,
                                        bannerImage: item.image.isNotEmpty ? item.image : 'assets/images/noImage.png',
                                        galleryImages: [item.image.isNotEmpty ? item.image : 'assets/images/noImage.png'],
                                        gradient: const [Color(0xFF0F172A), Color(0xFF1D4ED8)],
                                        accentColor: const Color(0xFF1D4ED8),
                                        highlights: const [],
                                      );
                                  return Padding(
                                    padding: const EdgeInsets.only(bottom: 10),
                                    child: Row(
                                      children: [
                                        ClipRRect(
                                          borderRadius: BorderRadius.circular(12),
                                          child: Image.asset(
                                            product.bannerImage,
                                            width: 48,
                                            height: 48,
                                            fit: BoxFit.cover,
                                          ),
                                        ),
                                        const SizedBox(width: 10),
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            children: [
                                              Text(product.title, maxLines: 1, overflow: TextOverflow.ellipsis),
                                              Text('${item.quantity} x ${money(double.tryParse(item.price) ?? 0)}'),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  );
                                }).toList(),
                              ),
                            ),
                          ],
                        );

                        if (wide) {
                          return Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(flex: 3, child: Form(key: _formKey, child: form)),
                              const SizedBox(width: 18),
                              SizedBox(width: 360, child: summary),
                            ],
                          );
                        }

                        return Column(
                          children: [
                            Form(key: _formKey, child: form),
                            const SizedBox(height: 16),
                            summary,
                          ],
                        );
                      },
                    ),
                  const SizedBox(height: 22),
                  const EcommerceFooter(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  String? _required(String? value) => value == null || value.trim().isEmpty ? 'Campo obrigatorio' : null;
}

class _Block extends StatelessWidget {
  const _Block({required this.title, required this.child});

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
          Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _Grid extends StatelessWidget {
  const _Grid({required this.children});
  final List<Widget> children;
  @override
  Widget build(BuildContext context) {
    final wide = MediaQuery.of(context).size.width >= 800;
    if (!wide) {
      return Column(
        children: children.map((child) => Padding(padding: const EdgeInsets.only(bottom: 12), child: child)).toList(),
      );
    }
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: children.map((child) => SizedBox(width: 240, child: child)).toList(),
    );
  }
}

class _Field extends StatelessWidget {
  const _Field({
    required this.controller,
    required this.label,
    this.validator,
    this.onChanged,
  });

  final TextEditingController controller;
  final String label;
  final String? Function(String?)? validator;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      validator: validator,
      onChanged: onChanged,
      decoration: InputDecoration(
        labelText: label,
        filled: true,
        fillColor: const Color(0xFFF8FAFC),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
      ),
    );
  }
}

class _PayChip extends StatelessWidget {
  const _PayChip({required this.label, required this.active, required this.onTap});
  final String label;
  final bool active;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          color: active ? const Color(0xFFEFF6FF) : const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: active ? const Color(0xFF1D4ED8) : const Color(0xFFE2E8F0)),
        ),
        child: Text(label),
      ),
    );
  }
}
