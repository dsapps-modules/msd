import 'dart:async';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../data/data_model/cart_model.dart';
import '../../screens/ecommerce/cliente_ecommerce_models.dart';
import '../../screens/ecommerce/cliente_ecommerce_repository.dart';

class ClienteEcommerceController extends ChangeNotifier {
  ClienteEcommerceController({
    ClienteEcommerceRepository? repository,
    SharedPreferences? preferences,
  })  : _repository = repository ?? ClienteEcommerceRepository(),
        _preferences = preferences;

  static const _selectedCampaignKey = 'cliente_selected_campaign_slug';
  static const _ordersKey = 'cliente_orders_v1';

  final ClienteEcommerceRepository _repository;
  SharedPreferences? _preferences;

  bool _initialized = false;
  bool _loading = false;
  String? _errorMessage;
  String? _checkoutErrorMessage;
  List<ClienteProduct> _products = [];
  final List<ClienteCampaign> _campaigns = defaultClienteCampaigns();
  String? _selectedCampaignSlug;
  List<ClienteOrder> _orders = [];

  bool get initialized => _initialized;
  bool get loading => _loading;
  String? get errorMessage => _errorMessage;
  String? get checkoutErrorMessage => _checkoutErrorMessage;
  List<ClienteProduct> get products => List.unmodifiable(_products);
  List<ClienteCampaign> get campaigns => List.unmodifiable(_campaigns);
  List<ClienteCampaign> get activeCampaigns =>
      _campaigns.where((campaign) => campaign.isActive).toList(growable: false);
  List<ClienteOrder> get orders => List.unmodifiable(_orders);

  ClienteCampaign? get selectedCampaign {
    if (_selectedCampaignSlug == null) {
      return null;
    }
    for (final campaign in _campaigns) {
      if (campaign.slug == _selectedCampaignSlug) {
        return campaign;
      }
    }
    return null;
  }

  Future<void> ensureInitialized() async {
    if (_initialized) {
      return;
    }
    _loading = true;
    notifyListeners();

    _preferences ??= await SharedPreferences.getInstance();
    final storedCampaign = _preferences?.getString(_selectedCampaignKey);
    _selectedCampaignSlug = storedCampaign == null || storedCampaign.trim().isEmpty
        ? null
        : storedCampaign;
    _orders = decodeClienteOrders(_preferences?.getString(_ordersKey) ?? '');

    try {
      _products = await _repository.fetchProducts();
      _errorMessage = null;
    } catch (error) {
      _errorMessage = 'Nao foi possivel carregar os produtos do momento.';
      debugPrint('ClienteEcommerceController.fetchProducts failed: $error');
      _products = <ClienteProduct>[];
    } finally {
      _loading = false;
      _initialized = true;
      notifyListeners();
    }
  }

  Future<void> refreshProducts() async {
    _repository.clearCache();
    _loading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      _products = await _repository.fetchProducts();
    } catch (error) {
      _errorMessage = 'Nao foi possivel atualizar a vitrine.';
      debugPrint('ClienteEcommerceController.refreshProducts failed: $error');
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  ClienteProduct? productBySlug(String slug) {
    for (final product in _products) {
      if (product.slug == slug) {
        return product;
      }
    }
    return null;
  }

  ClienteOrder? orderById(String id) {
    for (final order in _orders) {
      if (order.id == id) {
        return order;
      }
    }
    return null;
  }

  Future<void> selectCampaign(String? slug) async {
    _selectedCampaignSlug = slug;
    if (slug == null || slug.trim().isEmpty) {
      await _preferences?.remove(_selectedCampaignKey);
    } else {
      await _preferences?.setString(_selectedCampaignKey, slug);
    }
    _checkoutErrorMessage = null;
    notifyListeners();
  }

  CartItem buildCartItem(ClienteProduct product, {int quantity = 1}) {
    return CartItem(
      id: product.id,
      storeId: product.id,
      areaId: 0,
      flashSaleId: 0,
      storeName: product.supplierName,
      storeTaxP: '0',
      chargeAmount: '0',
      chargeType: 'flat',
      productId: product.id,
      stock: product.stock,
      variantId: 0,
      productName: product.name,
      variant: product.packaging,
      price: product.price.toStringAsFixed(2),
      quantity: quantity,
      cartMaxQuantity: product.cartLimit,
      image: product.displayImage,
    );
  }

  Future<ClienteOrder?> finalizeOrder(List<CartItem> cartItems) async {
    if (cartItems.isEmpty) {
      _checkoutErrorMessage = 'Adicione produtos ao carrinho.';
      notifyListeners();
      return null;
    }

    final campaign = selectedCampaign;
    if (campaign == null) {
      _checkoutErrorMessage = 'Selecione uma campanha para continuar.';
      notifyListeners();
      return null;
    }

    final items = cartItems.map((item) {
      final unitPrice = double.tryParse(item.price) ?? 0;
      return ClienteOrderItem(
        productId: item.productId,
        productSlug: item.productId.toString(),
        productName: item.productName,
        supplierName: item.storeName,
        quantity: item.quantity,
        unitPrice: unitPrice,
        subtotal: unitPrice * item.quantity,
        imageUrl: item.image.isNotEmpty ? item.image : 'assets/images/noImage.png',
      );
    }).toList();

    final order = ClienteOrder(
      id: _buildOrderId(),
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      status: 'pedido_recebido',
      totalAmount: items.fold(0, (sum, item) => sum + item.subtotal),
      createdAt: DateTime.now(),
      items: items,
    );

    _orders = [order, ..._orders.where((item) => item.id != order.id)];
    await _preferences?.setString(_ordersKey, encodeClienteOrders(_orders));
    _checkoutErrorMessage = null;
    notifyListeners();
    return order;
  }

  Future<void> clearCheckoutError() async {
    _checkoutErrorMessage = null;
    notifyListeners();
  }

  String _buildOrderId() {
    return 'PED-${DateTime.now().millisecondsSinceEpoch.toRadixString(36).toUpperCase()}';
  }
}
