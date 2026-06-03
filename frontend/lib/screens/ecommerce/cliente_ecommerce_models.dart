import 'dart:convert';

class ClienteProduct {
  const ClienteProduct({
    required this.id,
    required this.slug,
    required this.name,
    required this.description,
    required this.supplierName,
    required this.supplierSlug,
    required this.imageUrl,
    required this.galleryImages,
    required this.price,
    required this.listPrice,
    required this.stock,
    required this.reservedStock,
    required this.maxCartQty,
    required this.height,
    required this.width,
    required this.length,
    required this.weight,
    required this.packaging,
    required this.categoryName,
    required this.unitName,
    required this.status,
    required this.featured,
  });

  final int id;
  final String slug;
  final String name;
  final String description;
  final String supplierName;
  final String supplierSlug;
  final String imageUrl;
  final List<String> galleryImages;
  final double price;
  final double listPrice;
  final int stock;
  final int reservedStock;
  final int maxCartQty;
  final double? height;
  final double? width;
  final double? length;
  final double? weight;
  final String packaging;
  final String categoryName;
  final String unitName;
  final String status;
  final bool featured;

  bool get isActive => status.isEmpty || status.toLowerCase() == 'approved' || status.toLowerCase() == 'active';

  int get availableStock {
    final effectiveReserved = reservedStock > 0 ? reservedStock : 0;
    return (stock - effectiveReserved).clamp(0, 1 << 30);
  }

  int get cartLimit => maxCartQty > 0 ? maxCartQty : 9999;

  String get displayImage => imageUrl.isNotEmpty ? imageUrl : 'assets/images/noImage.png';

  factory ClienteProduct.fromJson(Map<String, dynamic> json) {
    final store = (json['store'] as Map?)?.cast<String, dynamic>() ?? const <String, dynamic>{};
    final gallery = <String>[
      _string(json['image_url']),
      ..._listOfStrings(json['gallery_images_urls']),
    ].where((item) => item.trim().isNotEmpty).toList();
    if (gallery.isEmpty) {
      gallery.add('assets/images/noImage.png');
    }

    return ClienteProduct(
      id: _int(json['id']),
      slug: _string(json['slug'], fallback: 'produto-${_int(json['id'])}'),
      name: _string(json['name'], fallback: 'Produto sem nome'),
      description: _string(json['description']),
      supplierName: _string(json['store_name'], fallback: _string(store['name'], fallback: 'Fornecedor')),
      supplierSlug: _string(json['store_slug'], fallback: _string(store['slug'])),
      imageUrl: _string(json['image_url']),
      galleryImages: gallery,
      price: _double(json['effective_price'], fallback: _double(json['valor_venda'], fallback: _double(json['special_price'], fallback: _double(json['price'])))),
      listPrice: _double(json['price'], fallback: _double(json['valor_venda'])),
      stock: _int(json['stock'], fallback: _int(json['estoque_total'], fallback: _int(json['stock_quantity']))),
      reservedStock: _int(json['estoque_reservado']),
      maxCartQty: _int(json['max_cart_qty'], fallback: _int(json['max_cart_quantity'])),
      height: _nullableDouble(json['altura'], fallback: _nullableDouble(json['height'])),
      width: _nullableDouble(json['largura'], fallback: _nullableDouble(json['width'])),
      length: _nullableDouble(json['comprimento'], fallback: _nullableDouble(json['length'])),
      weight: _nullableDouble(json['peso'], fallback: _nullableDouble(json['weight'])),
      packaging: _string(json['embalagem'], fallback: _string(json['unit'], fallback: 'Unidade')),
      categoryName: _string(json['category_name'] is Map ? (json['category_name'] as Map)['category_name'] : json['category_name'], fallback: 'Sem categoria'),
      unitName: _string(json['unit']),
      status: _string(json['status'], fallback: _string(json['product_status'], fallback: 'approved')),
      featured: _bool(json['is_featured'], fallback: false),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'slug': slug,
        'name': name,
        'description': description,
        'supplierName': supplierName,
        'supplierSlug': supplierSlug,
        'imageUrl': imageUrl,
        'galleryImages': galleryImages,
        'price': price,
        'listPrice': listPrice,
        'stock': stock,
        'reservedStock': reservedStock,
        'maxCartQty': maxCartQty,
        'height': height,
        'width': width,
        'length': length,
        'weight': weight,
        'packaging': packaging,
        'categoryName': categoryName,
        'unitName': unitName,
        'status': status,
        'featured': featured,
      };

  factory ClienteProduct.fromStoredJson(Map<String, dynamic> json) {
    return ClienteProduct(
      id: _int(json['id']),
      slug: _string(json['slug']),
      name: _string(json['name']),
      description: _string(json['description']),
      supplierName: _string(json['supplierName']),
      supplierSlug: _string(json['supplierSlug']),
      imageUrl: _string(json['imageUrl']),
      galleryImages: _listOfStrings(json['galleryImages']),
      price: _double(json['price']),
      listPrice: _double(json['listPrice'], fallback: _double(json['price'])),
      stock: _int(json['stock']),
      reservedStock: _int(json['reservedStock']),
      maxCartQty: _int(json['maxCartQty']),
      height: _nullableDouble(json['height']),
      width: _nullableDouble(json['width']),
      length: _nullableDouble(json['length']),
      weight: _nullableDouble(json['weight']),
      packaging: _string(json['packaging']),
      categoryName: _string(json['categoryName']),
      unitName: _string(json['unitName']),
      status: _string(json['status']),
      featured: _bool(json['featured']),
    );
  }
}

class ClienteCampaign {
  const ClienteCampaign({
    required this.id,
    required this.slug,
    required this.title,
    required this.objective,
    required this.responsibleName,
    required this.goalAmount,
    required this.progressAmount,
    required this.status,
    required this.isActive,
  });

  final int id;
  final String slug;
  final String title;
  final String objective;
  final String responsibleName;
  final double goalAmount;
  final double progressAmount;
  final String status;
  final bool isActive;

  double get progressPercent {
    if (goalAmount <= 0) return 0;
    return ((progressAmount / goalAmount) * 100).clamp(0, 100);
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'slug': slug,
        'title': title,
        'objective': objective,
        'responsibleName': responsibleName,
        'goalAmount': goalAmount,
        'progressAmount': progressAmount,
        'status': status,
        'isActive': isActive,
      };

  factory ClienteCampaign.fromJson(Map<String, dynamic> json) => ClienteCampaign(
        id: _int(json['id']),
        slug: _string(json['slug']),
        title: _string(json['title']),
        objective: _string(json['objective']),
        responsibleName: _string(json['responsibleName']),
        goalAmount: _double(json['goalAmount']),
        progressAmount: _double(json['progressAmount']),
        status: _string(json['status'], fallback: 'ativa'),
        isActive: _bool(json['isActive'], fallback: true),
      );
}

class ClienteOrderItem {
  const ClienteOrderItem({
    required this.productId,
    required this.productSlug,
    required this.productName,
    required this.supplierName,
    required this.quantity,
    required this.unitPrice,
    required this.subtotal,
    required this.imageUrl,
  });

  final int productId;
  final String productSlug;
  final String productName;
  final String supplierName;
  final int quantity;
  final double unitPrice;
  final double subtotal;
  final String imageUrl;

  Map<String, dynamic> toJson() => {
        'productId': productId,
        'productSlug': productSlug,
        'productName': productName,
        'supplierName': supplierName,
        'quantity': quantity,
        'unitPrice': unitPrice,
        'subtotal': subtotal,
        'imageUrl': imageUrl,
      };

  factory ClienteOrderItem.fromJson(Map<String, dynamic> json) => ClienteOrderItem(
        productId: _int(json['productId']),
        productSlug: _string(json['productSlug']),
        productName: _string(json['productName']),
        supplierName: _string(json['supplierName']),
        quantity: _int(json['quantity']),
        unitPrice: _double(json['unitPrice']),
        subtotal: _double(json['subtotal']),
        imageUrl: _string(json['imageUrl']),
      );
}

class ClienteOrder {
  const ClienteOrder({
    required this.id,
    required this.campaignId,
    required this.campaignTitle,
    required this.status,
    required this.totalAmount,
    required this.createdAt,
    required this.items,
  });

  final String id;
  final int campaignId;
  final String campaignTitle;
  final String status;
  final double totalAmount;
  final DateTime createdAt;
  final List<ClienteOrderItem> items;

  Map<String, dynamic> toJson() => {
        'id': id,
        'campaignId': campaignId,
        'campaignTitle': campaignTitle,
        'status': status,
        'totalAmount': totalAmount,
        'createdAt': createdAt.toIso8601String(),
        'items': items.map((item) => item.toJson()).toList(),
      };

  factory ClienteOrder.fromJson(Map<String, dynamic> json) => ClienteOrder(
        id: _string(json['id']),
        campaignId: _int(json['campaignId']),
        campaignTitle: _string(json['campaignTitle']),
        status: _string(json['status']),
        totalAmount: _double(json['totalAmount']),
        createdAt: DateTime.tryParse(_string(json['createdAt'])) ?? DateTime.now(),
        items: _listFromJson(json['items']).map(ClienteOrderItem.fromJson).toList(),
      );
}

String encodeClienteOrders(List<ClienteOrder> orders) =>
    jsonEncode(orders.map((order) => order.toJson()).toList());

List<ClienteOrder> decodeClienteOrders(String raw) {
  if (raw.trim().isEmpty) {
    return [];
  }

  final decoded = jsonDecode(raw);
  if (decoded is! List) {
    return [];
  }

  return decoded
      .whereType<Map>()
      .map((item) => ClienteOrder.fromJson(item.cast<String, dynamic>()))
      .toList();
}

List<ClienteCampaign> defaultClienteCampaigns() => const [
      ClienteCampaign(
        id: 1,
        slug: 'clareamento-solidario-2026',
        title: 'Clareamento Solidário 2026',
        objective: 'Apoiar ações solidárias por meio da venda de produtos odontológicos.',
        responsibleName: 'Divulgador Parceiro',
        goalAmount: 5000,
        progressAmount: 1600,
        status: 'ativa',
        isActive: true,
      ),
      ClienteCampaign(
        id: 2,
        slug: 'sorriso-tech',
        title: 'Sorriso Tech',
        objective: 'Incentivar o acesso a produtos de higiene e tecnologia odontológica.',
        responsibleName: 'Divulgador Parceiro',
        goalAmount: 8000,
        progressAmount: 2450,
        status: 'ativa',
        isActive: true,
      ),
    ];

double _double(dynamic value, {double fallback = 0}) {
  if (value is double) return value;
  if (value is int) return value.toDouble();
  if (value == null) return fallback;
  return double.tryParse(value.toString()) ?? fallback;
}

double? _nullableDouble(dynamic value, {double? fallback}) {
  if (value == null || value.toString().trim().isEmpty) {
    return fallback;
  }
  return _double(value, fallback: fallback ?? 0);
}

int _int(dynamic value, {int fallback = 0}) {
  if (value is int) return value;
  if (value is double) return value.toInt();
  if (value == null) return fallback;
  return int.tryParse(value.toString()) ?? fallback;
}

bool _bool(dynamic value, {bool fallback = false}) {
  if (value is bool) return value;
  if (value == null) return fallback;
  return value.toString().toLowerCase() == 'true' || value.toString() == '1';
}

String _string(dynamic value, {String fallback = ''}) {
  if (value == null) return fallback;
  final text = value.toString();
  return text.isEmpty ? fallback : text;
}

List<String> _listOfStrings(dynamic value) {
  if (value == null) return <String>[];
  if (value is List) {
    return value.map((item) => item.toString()).toList();
  }
  if (value is String && value.trim().isNotEmpty) {
    return [value];
  }
  return <String>[];
}

List<Map<String, dynamic>> _listFromJson(dynamic value) {
  if (value is List) {
    return value
        .whereType<Map>()
        .map((item) => item.cast<String, dynamic>())
        .toList();
  }
  return <Map<String, dynamic>>[];
}
