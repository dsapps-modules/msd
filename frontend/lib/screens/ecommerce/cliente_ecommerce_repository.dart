import 'package:dio/dio.dart';

import '../../config/api_urls.dart';
import 'cliente_ecommerce_models.dart';

class ClienteEcommerceRepository {
  ClienteEcommerceRepository({Dio? dio}) : _dio = dio ?? Dio();

  final Dio _dio;
  List<ClienteProduct>? _cachedProducts;

  Future<List<ClienteProduct>> fetchProducts({int perPage = 200}) async {
    if (_cachedProducts != null && _cachedProducts!.isNotEmpty) {
      return _cachedProducts!;
    }

    final response = await _dio.post(
      ApiUrls.allProductUrl(),
      data: {
        'language': 'pt',
        'category_id': <int>[],
        'search': '',
        'per_page': perPage.toString(),
        'page': 1,
        'min_price': '',
        'max_price': '',
        'brand_id': <int>[],
        'availability': '',
        'sort': '',
        'type': <int>[],
        'min_rating': '',
        'is_featured': false,
        'best_selling': false,
        'popular_products': false,
        'flash_sale': false,
        'flash_sale_id': 0,
        'radius': 100,
      },
      options: Options(
        headers: const {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    final data = response.data;
    final rawProducts = data is Map<String, dynamic> ? data['data'] : null;
    final products = rawProducts is List
        ? rawProducts
            .whereType<Map>()
            .map((item) => ClienteProduct.fromJson(item.cast<String, dynamic>()))
            .where((item) => item.isActive)
            .toList()
        : <ClienteProduct>[];

    _cachedProducts = products;
    return products;
  }

  Future<ClienteProduct?> findProductBySlug(String slug) async {
    final products = await fetchProducts();
    for (final product in products) {
      if (product.slug == slug) {
        return product;
      }
    }
    return null;
  }

  void clearCache() {
    _cachedProducts = null;
  }
}
