import 'dart:async';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:quick_ecommerce/router/route_name.dart';

import '../../controller/provider/cart_controler.dart';
import '../../data/data_model/cart_model.dart';
import 'ecommerce_components.dart';
import 'ecommerce_mock_data.dart';
import 'ecommerce_models.dart';

class EcommerceCheckoutScreen extends StatefulWidget {
  const EcommerceCheckoutScreen({super.key});

  @override
  State<EcommerceCheckoutScreen> createState() =>
      _EcommerceCheckoutScreenState();
}

class _EcommerceCheckoutScreenState extends State<EcommerceCheckoutScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _cpfController = TextEditingController();
  final _cepController = TextEditingController();
  final _streetController = TextEditingController();
  final _numberController = TextEditingController();
  final _complementController = TextEditingController();
  final _districtController = TextEditingController();
  final _cityController = TextEditingController();
  final _stateController = TextEditingController();
  final _addressFocus = FocusNode();
  Timer? _cepDebounce;
  bool _booted = false;
  String _paymentMethod = 'PIX';
  bool _submitting = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await context.read<CartProvider>().loadCartItems();
      if (!mounted) {
        return;
      }
      setState(() {
        _booted = true;
      });
    });
  }

  @override
  void dispose() {
    _cepDebounce?.cancel();
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _cpfController.dispose();
    _cepController.dispose();
    _streetController.dispose();
    _numberController.dispose();
    _complementController.dispose();
    _districtController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    _addressFocus.dispose();
    super.dispose();
  }

  double get _subtotal {
    final cart = context.read<CartProvider>().cartItems;
    return cart.fold<double>(
      0,
      (sum, item) => sum + (double.tryParse(item.price) ?? 0) * item.quantity,
    );
  }

  double get _shipping => _subtotal >= 300 ? 0 : 19.9;

  double get _total => _subtotal + _shipping;

  String get _paymentLabel {
    return switch (_paymentMethod) {
      'Cartão' => 'Cartão',
      'Boleto' => 'Boleto',
      _ => 'PIX',
    };
  }

  Future<void> _lookupCep(String cep) async {
    final cleanCep = cep.replaceAll(RegExp(r'\D'), '');
    if (cleanCep.length != 8) {
      return;
    }

    try {
      final response = await Dio().get(
        'https://viacep.com.br/ws/$cleanCep/json/',
      );
      final data = response.data;
      if (data is Map<String, dynamic> && data['erro'] != true) {
        if (!mounted) {
          return;
        }
        setState(() {
          _streetController.text = data['logradouro']?.toString() ?? '';
          _districtController.text = data['bairro']?.toString() ?? '';
          _cityController.text = data['localidade']?.toString() ?? '';
          _stateController.text = data['uf']?.toString() ?? '';
        });
      }
    } catch (_) {
      // Fallback manual. CEP lookup is optional.
    }
  }

  Future<void> _finishOrder() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    final cart = context.read<CartProvider>().cartItems;
    if (cart.isEmpty) {
      return;
    }

    setState(() {
      _submitting = true;
    });

    final orderNumber =
        'KC-${DateTime.now().millisecondsSinceEpoch.toRadixString(36).toUpperCase()}';
    final summary = EcommerceOrderSummary(
      orderNumber: orderNumber,
      customerName: _nameController.text.trim(),
      email: _emailController.text.trim(),
      paymentMethod: _paymentLabel,
      subtotal: _subtotal,
      shipping: _shipping,
      total: _total,
      itemsCount: cart.length,
      addressLabel:
          '${_streetController.text.trim()}, ${_numberController.text.trim()} - ${_cityController.text.trim()}/${_stateController.text.trim()}',
    );

    await context.read<CartProvider>().clearCart();
    if (!mounted) {
      return;
    }

    setState(() {
      _submitting = false;
    });

    context.go(
      Uri(
        path: '/sucesso',
        queryParameters: {
          'order': orderNumber,
          'payment': _paymentLabel,
          'total': _total.toStringAsFixed(2),
          'items': cart.length.toString(),
        },
      ).toString(),
      extra: summary,
    );
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>().cartItems;
    final isDesktop = MediaQuery.of(context).size.width >= 1100;

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FB),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: EcommerceHeader(
              cartCount: cart.length,
              selectedMenu: 'produtos',
              onMenuSelected: (value) {
                if (value == 'inicio') {
                  context.go('/');
                } else {
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
              padding: const EdgeInsets.fromLTRB(16, 18, 16, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  EcommerceSectionHeader(
                    title: 'Checkout',
                    subtitle:
                        'Complete seus dados, escolha o pagamento e finalize sem sair do fluxo visual do ecommerce.',
                    actionLabel: 'Voltar ao carrinho',
                    onActionTap: () => context.go('/cart'),
                  ),
                  const SizedBox(height: 16),
                  if (!_booted)
                    const EcommerceLoadingState(message: 'Carregando checkout...')
                  else if (cart.isEmpty)
                    EcommerceEmptyState(
                      title: 'Nenhum item para finalizar.',
                      subtitle:
                          'Adicione produtos ao carrinho antes de continuar o checkout.',
                      actionLabel: 'Voltar para vitrine',
                      onActionTap: () => context.go('/'),
                    )
                  else
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final wide = constraints.maxWidth >= 1100;
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              flex: wide ? 3 : 1,
                              child: Form(
                                key: _formKey,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    _CheckoutCard(
                                      title: 'Dados pessoais',
                                      child: _FormGrid(
                                        children: [
                                          _CheckoutField(
                                            controller: _nameController,
                                            label: 'Nome',
                                            validator: _requiredValidator,
                                          ),
                                          _CheckoutField(
                                            controller: _emailController,
                                            label: 'E-mail',
                                            keyboardType: TextInputType.emailAddress,
                                            validator: _requiredValidator,
                                          ),
                                          _CheckoutField(
                                            controller: _phoneController,
                                            label: 'Telefone',
                                            keyboardType: TextInputType.phone,
                                            validator: _requiredValidator,
                                          ),
                                          _CheckoutField(
                                            controller: _cpfController,
                                            label: 'CPF',
                                            keyboardType: TextInputType.number,
                                            validator: _requiredValidator,
                                          ),
                                        ],
                                      ),
                                    ),
                                    const SizedBox(height: 16),
                                    _CheckoutCard(
                                      title: 'Endereço',
                                      child: Column(
                                        children: [
                                          Row(
                                            children: [
                                              Expanded(
                                                child: _CheckoutField(
                                                  controller: _cepController,
                                                  label: 'CEP',
                                                  keyboardType:
                                                      TextInputType.number,
                                                  validator: _requiredValidator,
                                                  onChanged: (value) {
                                                    _cepDebounce?.cancel();
                                                    _cepDebounce = Timer(
                                                      const Duration(
                                                          milliseconds: 500),
                                                      () => _lookupCep(value),
                                                    );
                                                  },
                                                ),
                                              ),
                                              const SizedBox(width: 12),
                                              ElevatedButton(
                                                onPressed: () =>
                                                    _lookupCep(_cepController.text),
                                                style: ElevatedButton.styleFrom(
                                                  backgroundColor:
                                                      const Color(0xFFF8FAFC),
                                                  foregroundColor:
                                                      const Color(0xFF0F172A),
                                                  elevation: 0,
                                                  padding: const EdgeInsets
                                                      .symmetric(
                                                    horizontal: 16,
                                                    vertical: 17,
                                                  ),
                                                  shape: RoundedRectangleBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                      16,
                                                    ),
                                                  ),
                                                ),
                                                child: const Text('Buscar CEP'),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 12),
                                          _FormGrid(
                                            children: [
                                              _CheckoutField(
                                                controller: _streetController,
                                                label: 'Rua',
                                                validator: _requiredValidator,
                                              ),
                                              _CheckoutField(
                                                controller: _numberController,
                                                label: 'Número',
                                                validator: _requiredValidator,
                                              ),
                                              _CheckoutField(
                                                controller: _complementController,
                                                label: 'Complemento',
                                              ),
                                              _CheckoutField(
                                                controller: _districtController,
                                                label: 'Bairro',
                                                validator: _requiredValidator,
                                              ),
                                              _CheckoutField(
                                                controller: _cityController,
                                                label: 'Cidade',
                                                validator: _requiredValidator,
                                              ),
                                              _CheckoutField(
                                                controller: _stateController,
                                                label: 'Estado',
                                                validator: _requiredValidator,
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    const SizedBox(height: 16),
                                    _CheckoutCard(
                                      title: 'Pagamento',
                                      child: Wrap(
                                        spacing: 12,
                                        runSpacing: 12,
                                        children: [
                                          _PaymentOptionCard(
                                            title: 'PIX',
                                            subtitle: 'Confirmação imediata',
                                            active: _paymentMethod == 'PIX',
                                            onTap: () {
                                              setState(() {
                                                _paymentMethod = 'PIX';
                                              });
                                            },
                                          ),
                                          _PaymentOptionCard(
                                            title: 'Cartão',
                                            subtitle: 'Crédito ou débito',
                                            active: _paymentMethod == 'Cartão',
                                            onTap: () {
                                              setState(() {
                                                _paymentMethod = 'Cartão';
                                              });
                                            },
                                          ),
                                          _PaymentOptionCard(
                                            title: 'Boleto',
                                            subtitle: 'Visual mock temporário',
                                            active: _paymentMethod == 'Boleto',
                                            onTap: () {
                                              setState(() {
                                                _paymentMethod = 'Boleto';
                                              });
                                            },
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            if (wide) ...[
                              const SizedBox(width: 18),
                              SizedBox(
                                width: 360,
                                child: Column(
                                  children: [
                                    EcommerceCheckoutSummary(
                                      itemsCount: cart.length,
                                      subtotal: _subtotal,
                                      shipping: _shipping,
                                      total: _total,
                                      paymentMethod: _paymentLabel,
                                      primaryLabel: _submitting
                                          ? 'Finalizando...'
                                          : 'Finalizar compra',
                                      onPrimaryAction:
                                          _submitting ? () {} : _finishOrder,
                                    ),
                                    const SizedBox(height: 16),
                                    _CheckoutCard(
                                      title: 'Resumo dos itens',
                                      child: _CartPreviewList(
                                        cartItems: cart,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ],
                        );
                      },
                    ),
                  if (!_booted || cart.isEmpty) const SizedBox.shrink(),
                  if (_booted && cart.isNotEmpty && !isDesktop) ...[
                    const SizedBox(height: 16),
                    _CheckoutCard(
                      title: 'Resumo dos itens',
                      child: _CartPreviewList(
                        cartItems: cart,
                      ),
                    ),
                    const SizedBox(height: 16),
                    EcommerceCheckoutSummary(
                      itemsCount: cart.length,
                      subtotal: _subtotal,
                      shipping: _shipping,
                      total: _total,
                      paymentMethod: _paymentLabel,
                      primaryLabel:
                          _submitting ? 'Finalizando...' : 'Finalizar compra',
                      onPrimaryAction:
                          _submitting ? () {} : _finishOrder,
                    ),
                  ],
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

  String? _requiredValidator(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Campo obrigatório';
    }
    return null;
  }
}

class _CheckoutCard extends StatelessWidget {
  const _CheckoutCard({
    required this.title,
    required this.child,
  });

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
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: const Color(0xFF0F172A),
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 14),
          child,
        ],
      ),
    );
  }
}

class _FormGrid extends StatelessWidget {
  const _FormGrid({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width >= 800;
    if (!isWide) {
      return Column(
        children: children
            .map(
              (child) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: child,
              ),
            )
            .toList(),
      );
    }

    final width = MediaQuery.of(context).size.width > 1100 ? 220.0 : 240.0;
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: children
          .map(
            (child) => SizedBox(
              width: width,
              child: child,
            ),
          )
          .toList(),
    );
  }
}

class _CheckoutField extends StatelessWidget {
  const _CheckoutField({
    required this.controller,
    required this.label,
    this.keyboardType,
    this.validator,
    this.onChanged,
  });

  final TextEditingController controller;
  final String label;
  final TextInputType? keyboardType;
  final String? Function(String?)? validator;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
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
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: Color(0xFF1D4ED8)),
        ),
      ),
    );
  }
}

class _PaymentOptionCard extends StatelessWidget {
  const _PaymentOptionCard({
    required this.title,
    required this.subtitle,
    required this.active,
    required this.onTap,
  });

  final String title;
  final String subtitle;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        width: MediaQuery.of(context).size.width >= 800 ? 200 : 160,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: active ? const Color(0xFFEFF6FF) : const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(18),
          border: Border.all(
            color: active ? const Color(0xFF1D4ED8) : const Color(0xFFE2E8F0),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: active ? const Color(0xFF1D4ED8) : Colors.white,
                shape: BoxShape.circle,
              ),
              child: Icon(
                active ? Icons.check_rounded : Icons.circle_outlined,
                color: active ? Colors.white : const Color(0xFF64748B),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: const Color(0xFF0F172A),
                          fontWeight: FontWeight.w800,
                        ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: const Color(0xFF64748B),
                        ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CartPreviewList extends StatelessWidget {
  const _CartPreviewList({required this.cartItems});

  final List<CartItem> cartItems;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: cartItems.map((item) {
        final product = EcommerceMockData.productByCartProductId(item.productId);
        return Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.asset(
                  product?.bannerImage ??
                      (item.image.isNotEmpty
                          ? item.image
                          : 'assets/images/noImage.png'),
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
                    Text(
                      product?.title ?? item.productName,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: const Color(0xFF0F172A),
                            fontWeight: FontWeight.w700,
                          ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${item.quantity} x ${formatEcommerceMoney(double.tryParse(item.price) ?? 0)}',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF64748B),
                          ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}
