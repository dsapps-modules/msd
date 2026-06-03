import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:quick_ecommerce/controller/provider/cliente_ecommerce_controller.dart';
import 'package:quick_ecommerce/screens/ecommerce/cliente_ecommerce_models.dart';
import 'package:quick_ecommerce/screens/ecommerce/cliente_ecommerce_repository.dart';

class FakeClienteEcommerceRepository extends ClienteEcommerceRepository {
  FakeClienteEcommerceRepository(this.products) : super();

  final List<ClienteProduct> products;

  @override
  Future<List<ClienteProduct>> fetchProducts({int perPage = 200}) async {
    return products;
  }

  @override
  void clearCache() {}
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  ClienteProduct buildProduct({
    int id = 1,
    String slug = 'prod-1',
    String name = 'Kit Clareador Dental Premium',
    String supplier = 'Admin Fornecedor',
    double price = 249.90,
    int stock = 15,
  }) {
    return ClienteProduct(
      id: id,
      slug: slug,
      name: name,
      description: 'Descricao do produto',
      supplierName: supplier,
      supplierSlug: 'fornecedor-demo',
      imageUrl: '',
      galleryImages: const ['assets/images/noImage.png'],
      price: price,
      listPrice: price,
      stock: stock,
      reservedStock: 0,
      maxCartQty: 10,
      height: 10,
      width: 20,
      length: 30,
      weight: 0.85,
      packaging: 'Caixa',
      categoryName: 'Odonto',
      unitName: 'Unidade',
      status: 'approved',
      featured: true,
    );
  }

  test('ClienteProduct.fromJson expõe campos principais do fornecedor', () {
    final product = ClienteProduct.fromJson({
      'id': 10,
      'slug': 'kit-1',
      'name': 'Kit Clareador Dental Premium',
      'description': 'Descricao',
      'store_name': 'Admin Fornecedor',
      'store_slug': 'admin-fornecedor',
      'image_url': '',
      'gallery_images_urls': ['https://example.com/a.png'],
      'effective_price': '249.90',
      'price': 299.90,
      'stock': 15,
      'estoque_reservado': 4,
      'max_cart_qty': 8,
      'altura': 10,
      'largura': 20,
      'comprimento': 30,
      'peso': 0.85,
      'embalagem': 'Caixa',
      'unit': 'Unidade',
      'status': 'approved',
      'is_featured': true,
    });

    expect(product.supplierName, 'Admin Fornecedor');
    expect(product.price, 249.90);
    expect(product.reservedStock, 4);
    expect(product.availableStock, 11);
    expect(product.packaging, 'Caixa');
    expect(product.isActive, isTrue);
  });

  test('ClienteEcommerceController bloqueia finalização sem campanha e conclui com campanha', () async {
    final controller = ClienteEcommerceController(
      repository: FakeClienteEcommerceRepository([buildProduct()]),
    );

    await controller.ensureInitialized();
    expect(controller.products, hasLength(1));
    expect(controller.activeCampaigns, hasLength(2));

    final cartItem = controller.buildCartItem(buildProduct(), quantity: 2);

    final withoutCampaign = await controller.finalizeOrder([cartItem]);
    expect(withoutCampaign, isNull);
    expect(controller.checkoutErrorMessage, 'Selecione uma campanha para continuar.');

    await controller.selectCampaign(controller.activeCampaigns.first.slug);
    final order = await controller.finalizeOrder([cartItem]);

    expect(order, isNotNull);
    expect(order!.status, 'pedido_recebido');
    expect(order.totalAmount, 499.80);
    expect(order.items, hasLength(1));
    expect(controller.orderById(order.id), isNotNull);
  });

  test('encode/decode de pedidos preserva os itens', () {
    final order = ClienteOrder(
      id: 'PED-1',
      campaignId: 1,
      campaignTitle: 'Clareamento Solidário 2026',
      status: 'pedido_recebido',
      totalAmount: 249.90,
      createdAt: DateTime.parse('2026-06-03T10:00:00Z'),
      items: [
        const ClienteOrderItem(
          productId: 1,
          productSlug: 'kit-1',
          productName: 'Kit',
          supplierName: 'Fornecedor',
          quantity: 1,
          unitPrice: 249.90,
          subtotal: 249.90,
          imageUrl: '',
        ),
      ],
    );

    final raw = encodeClienteOrders([order]);
    final decoded = decodeClienteOrders(raw);

    expect(decoded, hasLength(1));
    expect(decoded.first.id, 'PED-1');
    expect(decoded.first.items.first.productName, 'Kit');
  });
}
